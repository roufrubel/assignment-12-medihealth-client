import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import usePayment from "../../hooks/usePayment";

const PaymentHistory = () => {
  const { user, loading } = useAuth();
  const [payments, , refetch] = usePayment();

  // Ensure we have the user's email
  const sellerEmail = user?.email;

  // Filter payments for the seller
  const sellerPayments = payments?.filter(payment => 
    payment.sellerEmail.includes(sellerEmail)
  );


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className="pt-10">
      <div className="bg-neutral text-neutral-content p-2 rounded-md mb-10">
      <h2 className="font-bold text-xl text-center">
        Payment History
      </h2>
      </div>
      <div className="overflow-x-auto border-2 rounded-lg p-2">
        <table className="table table-xs ">
          <thead>
            <tr className="font-bold text-info text-base">
              <th>SL</th>
              <th>Users Email</th>
              <th>Payment Status</th>
              <th>Transaction Id</th>
              <th>Medicine Name</th>
              <th>Purchase Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {sellerPayments.map((data, idx) => (
              <tr key={data._id}>
                <td className="font-bold text-info text-base">{idx + 1}</td>
                <td className="">{data?.buyerEmail}</td>
                <td className="font-bold">{data?.status === 'pending' ? <button className="btn btn-warning btn-xs">{data?.status}</button> : <button
                          className="btn btn-success btn-outline btn-xs"
                        >
                         <IoMdCheckmarkCircleOutline className="text-success text-xl"></IoMdCheckmarkCircleOutline>
                         Paid
                        </button>}</td>
                <td>{data?.transactionId}</td>
                <td>{data?.medicineName.map((item, idx) => <li key={idx}>{item}</li>)}</td>
                <td>{data?.date}</td>
                <td>${data?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  );
};

export default PaymentHistory;

