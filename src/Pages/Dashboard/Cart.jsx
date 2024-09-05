import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();

  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

// Handle quantity increase
const handleIncrease = (id) => {
    axiosSecure.patch(`/carts/increase/${id}`)
    .then(res=>{
        if(res.data.message === 'Quantity increased successfully'){
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Quantity increased successfully",
                showConfirmButton: false,
                timer: 1500
              });
        }
    });
    
  };

  // Handle quantity decrease
  const handleDecrease = (id) => {
    axiosSecure.patch(`/carts/decrease/${id}`)
    .then((res) => {
        if(res.data.message === "Quantity decreased successfully" || res.data.message === "Item removed from cart"){
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Quantity decreased successfully",
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
  };
  

  return (
    <div className="pt-4">
      <div className="flex justify-evenly mb-2 bg-slate-100 p-2 rounded-lg">
        <div>
          <h2 className="text-2xl text-info">Items: {cart.length}</h2>
        </div>
        <div>
          <h2 className="text-2xl text-info">Total Price: {totalPrice}</h2>
        </div>
        {cart.length?<Link to="/dashboard/payment">
        <button className="btn btn-info btn-sm">Pay</button>
        </Link>: <button disabled className="btn btn-info btn-sm">Pay</button>}
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Remove</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={item._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask rounded-lg h-12 w-12">
                        <img
                          src={item.image}
                          alt="Medicine Image"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{(item.price * item.quantity).toFixed(2)}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-circle btn-outline btn-xs text-lg"
                  >
                    <MdDeleteForever />
                  </button>
                </th>
                <th>
                    <span  className="border border-b-slate-400 border-1 p-2 rounded-xl">
                    ({item.quantity})
                  <button
                    onClick={() => handleIncrease(item._id)}
                    className="btn  btn-xs mx-1 btn-circle bg-white"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => handleDecrease(item._id)}
                    className="btn  btn-xs btn-circle bg-white"
                  >
                    <TiMinus />
                  </button>
                    </span>
                  
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
