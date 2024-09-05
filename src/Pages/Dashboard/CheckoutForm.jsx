import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("")
  const [transactionId, setTransactionId] = useState("")
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const [cart, refetch] = useCart();
//   const navigate = useNavigate();

  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  useEffect( () => {
    if(totalPrice > 0) {
      axiosSecure.post('/create-payment-intent', {price: totalPrice})
    .then(res => {
      console.log(res.data.clientSecret)
      setClientSecret(res.data.clientSecret)
    })
    }
  }, [axiosSecure, totalPrice])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log("payment error", error);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
    }

    // confirm payment
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        }
      }
    })
     
    if(confirmError) {
      console.log('confirmError')
    } else{
      console.log('payment intent', paymentIntent )
      if(paymentIntent.status === 'succeeded'){
        console.log('transaction id', paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),  // utc date convert. use moment js
          cartIds: cart.map(item => item._id),
          menuItemIds: cart.map(item => item.menuId),
          status: 'pending' 
        }

        const res = await axiosSecure.post('/payments', payment);
        console.log('payment saved', res.data)
        refetch();
        if(res.data?.paymentResult?.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your payment is successful",
            showConfirmButton: false,
            timer: 1500
          });
        //   navigate('/dashboard/paymentHistory')
        }
      }
    }


  };

  return (
    <div className="md:mx-20 md:mt-20 lg:px-10 lg:mt-20 md:p-10 lg:p-10 border rounded">
        <h2 className="text-xl text-info font-bold mb-8">Please pay your total bill: ${totalPrice}</h2>
        <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-info btn-sm mt-8"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600 mt-2">{error}</p>
      {transactionId && <p className="text-info">Your transaction id: {transactionId}</p> }
    </form>
    </div>
  );
};

export default CheckoutForm;
