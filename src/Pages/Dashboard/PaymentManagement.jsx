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
          <h2>Payment Management</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Transaction Id</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment._id}>
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
                         <IoMdCheckmarkCircleOutline className="text-successn text-lg"></IoMdCheckmarkCircleOutline>
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
      );
};

export default PaymentManagement;