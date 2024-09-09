import useAuth from "../../hooks/useAuth";
import usePayment from "../../hooks/usePayment";

const SellerHome = () => {
  const { user, loading } = useAuth();
  const [payments, , refetch] = usePayment();

  // Ensure we have the user's email
  const sellerEmail = user?.email;

  // Filter payments for the seller
  const sellerPayments = payments?.filter(payment => 
    payment.sellerEmail.includes(sellerEmail)
  );

  // Calculate the total paid amount for the seller
  const paidTotal = parseInt(
    sellerPayments
      ?.filter(payment => payment.status === 'paid')
      ?.reduce((sum, payment) => sum + payment.price, 0)
      ?.toFixed(2)
  );

  // Calculate the total pending amount for the seller
  const pendingTotal = parseInt(
    sellerPayments
      ?.filter(payment => payment.status === 'pending')
      ?.reduce((sum, payment) => sum + payment.price, 0)
      ?.toFixed(2)
  );

  // Calculate the total revenue (paid + pending)
  const totalRevenue = parseInt((paidTotal + pendingTotal)?.toFixed(2));

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="pt-10">
        <h1 className="text-2xl text-info font-bold mb-10">Seller Home</h1>
        <h2 className="text-xl text-info">
          Hi, Welcome {user ? user?.displayName : "to MEDIHEALTH!"}
        </h2>
      </div>

      <div className="stats stats-vertical lg:stats-horizontal shadow mt-8 border border-info p-2">
        <div className="stat">
          <div className="stat-title text-info font-bold">Sales Revenue</div>
          <div className="stat-value text-slate-500">${totalRevenue}</div>
        </div>

        <div className="stat">
          <div className="stat-title text-info font-bold">Paid Total</div>
          <div className="stat-value text-slate-500">${paidTotal}</div>
        </div>

        <div className="stat">
          <div className="stat-title text-info font-bold">Pending Total</div>
          <div className="stat-value text-slate-500">${pendingTotal}</div>
        </div>
      </div>
    </>
  );
};

export default SellerHome;

