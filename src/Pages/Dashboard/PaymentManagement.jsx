import React, { useEffect } from 'react';
import usePayment from '../../hooks/usePayment';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const PaymentManagement = () => {
  const [payments, loading, refetch] = usePayment();
  const axiosSecure = useAxiosSecure();

  const handlePaymentStatusUpdate = (id) => {
    axiosSecure.patch(`/payments/${id}`, { status: "paid" })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Payment status has been updated to "Paid"',
            showConfirmButton: false,
            timer: 1000
          });
          refetch(); 
        }
      })
      .catch(err => {
        console.error('Error updating payment status:', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
      });
  };
   
  if (loading) {
    <progress className="progress w-56"></progress>;
  }
    return(
        <div>
          <div className="bg-neutral p-2 text-neutral-content text-center rounded-md my-6">
          <h2 className="font-bold text-lg">Payment Management</h2>
          </div>
          <div className="border-2 p-6 rounded-lg w-full md:w-3/4 lg:w-3/4 mx-auto">
          <table className="table ">
            <thead>
              <tr className="text-info">
                <th>SL</th>
                <th>Transaction Id</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr key={payment._id}>
                  <td>{idx + 1}</td>
                  <td>{payment.transactionId}</td>
                  <td>{payment.price}</td>
                  <td className="uppercase">{payment.status}</td>
                  <td>
                    {payment.status === "pending" ? (
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handlePaymentStatusUpdate(payment._id)}
                      >
                        Accept payment
                      </button>
                    ) : (
                        <button
                          className="btn btn-success btn-outline btn-sm"
                        >
                         <IoMdCheckmarkCircleOutline className="text-success text-xl"></IoMdCheckmarkCircleOutline>
                         Done
                        </button>
                      )
                }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      );
};

export default PaymentManagement;