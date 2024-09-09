import { MdOutlineHealthAndSafety } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Invoice = () => {
  const location = useLocation();
  const { payment } = location.state || {};

  // handle print or download
  const handlePrint = () => {
    window.print();
  };

  if (!payment) {
    return (
      <p className="bg-orange-100 p-4 rounded-lg font-bold text-center mt-20">
        No payment information available.
      </p>
    );
  }

  return (
    <div className="md:px-24 lg:px-24 md:pt-10 lg:pt-10">
        
        <h2 className="flex items-center justify-start text-xl  font-bold uppercase text-info"><MdOutlineHealthAndSafety className="text-info text-2xl mr-1"></MdOutlineHealthAndSafety>
        mediHealth</h2>
        <div className="text-xs mt-2">
        <address>1 Staple Hall Road, Fenny Stratford
        </address>
        <address>Bletchley, Milton Keynes, UK
        </address>
        <address >MK1 1BQ
        </address>
        </div>
        <div className="divider"></div>
      <div className="mb-4 mt-4 space-y-1">
      <h2 className="text-lg font-bold mb-2 uppercase">Invoice</h2>
      <p>
        <strong>Transaction ID:</strong> {payment.transactionId}
      </p>
      <p>
        <strong>Name:</strong> {payment?.userName}
      </p>
      <p>
        <strong>Email:</strong> {payment.buyerEmail}
      </p>
      <p>
        <strong>Medicine Name:</strong>{payment?.medicineName.map((name, idx) => <li key={idx}>{name}</li>)}
      </p>
      <p>
        <strong>Total Price:</strong> ${payment.price}
      </p>
      <p>
        <strong>Date:</strong> {payment.date}
      </p>
      </div>
      <button className="btn btn-info btn-sm"onClick={handlePrint}>Print Invoice</button>
    </div>
  );
};

export default Invoice;
