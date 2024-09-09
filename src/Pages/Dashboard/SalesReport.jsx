import React from 'react';
import usePayment from '../../hooks/usePayment';

const SalesReport = () => {
    const [payments, loading, refetch] = usePayment();
    console.log(payments)

    // handle print or download
  const handlePrint = () => {
    window.print();
  };


    if (loading) {
        <progress className="progress w-56"></progress>;
      }

    return (
        <div>
          <div className="bg-neutral p-2 text-neutral-content text-center rounded-md my-6">
          <h2 className="font-bold text-xl">Sales Report</h2>
          </div>
          <div className="p-6 rounded-lg w-full md:w-3/4 lg:w-3/4 mx-auto">
          <table className="table">
            <thead>
              <tr className="text-info text-base border-2">
                <th className='border-2'>SL</th>
                <th className='border-2'>Medicine Name</th>
                <th className='border-2'>Seller Email</th>
                <th className='border-2'>Buyer Email</th>
                <th className='border-2'>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr key={payment._id}>
                  <td className='text-info font-bold border-2'>{idx + 1}</td>
                  <td className='border-2'>{payment.medicineName.map(md => <li className="text-xs">{md}</li>)}</td>
                  <td className='border-2'>{payment.sellerEmail.map((mail, idx) =><li className="text-xs" key={idx}>{mail}</li>)}</td>
                  <td className='border-2'>{payment.buyerEmail}</td>
                  <td className='border-2'>${payment.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="text-center my-4">
          <button className="btn btn-warning btn-sm" onClick={handlePrint}>Download Sales Report</button>
          </div>
        </div>
    );
};

export default SalesReport;