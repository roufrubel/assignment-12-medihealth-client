import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaRegCircleCheck } from "react-icons/fa6";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cart,  ,refetch] = useCart();
  const navigate = useNavigate();

  const totalPriceText = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const totalPrice = parseInt(totalPriceText);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          // console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

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
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirmError");
    } else {
      // console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          userName: user.displayName,
          buyerEmail: user.email,
          sellerEmail: cart.map((item) => item.sellerEmail),
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: moment().format("DD-MM-YYYY"), // formatted date using moment.js
          cartIds: cart.map((item) => item._id),
          medicineItemIds: cart.map((item) => item.medicineId),
          medicineName: cart.map((item) => item.name),
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        // console.log("payment saved", res.data);
        
        if (res.data?.paymentResult?.insertedId || res.data?.paymentResult?.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your payment is successful",
            showConfirmButton: false,
            timer: 1500,
          });
          //  redirect or navigate to invoice page
          // Pass payment data via navigate state
          navigate("/dashboard/invoice", { state: { payment } });          
          refetch();
          // Clear the card input field
          card.clear();          
        }
      }
    }
  };

  return (
    <div className="md:mx-20 md:mt-20 lg:px-10 lg:mt-20 md:p-10 lg:p-10 border rounded-md">
      <h2 className="text-xl text-info font-bold mb-10">
        Please pay your total bill: ${totalPrice}
      </h2>
      <form onSubmit={handleSubmit}>
        <p className="mt-6 mb-1 text-gray-500">
          Provide your card details here:
        </p>
        <CardElement
          className="bg-white p-4 border rounded-xl"
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
        {transactionId && (
          <span className="flex items-center justify-start mt-10 p-4 bg-green-100 rounded-xl">
            <FaRegCircleCheck className="text-green-600 text-4xl mr-4"></FaRegCircleCheck>
            <p className=" ">
              <span className="font-bold text-info">Your transaction id:</span>{" "}
              {transactionId}
            </p>
          </span>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
