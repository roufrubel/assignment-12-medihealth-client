import { GrView } from "react-icons/gr";
import useMedicine from "../../hooks/useMedicine";
import "./Shop.css";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";

const Shop = () => {
  const [medicine, loading] = useMedicine();
  const [viewDetails, setViewDetails] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, , refetch] = useCart();

  const [filteredMedicine, setFilteredMedicine] = useState([]);

  // Extract search term from the URL query params
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  useEffect(() => {
    // show modal
         if(viewDetails){
           document.getElementById("medihealth-modal").showModal();
         }
    // Filter the medicines based on the search term
    if (searchTerm) {
      const filtered = medicine.filter((med) =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMedicine(filtered);
    } else {
      setFilteredMedicine(medicine); // If no search term, show all medicines
    }
  }, [viewDetails, searchTerm, medicine]);

  // closeModal
  const closeModal = () => {
    setViewDetails(null);
    document.getElementById("medihealth-modal").close();
  };

  const handleSelect = (viewDetails) => {
    if (!viewDetails) return;

    if (user && user.email) {
      const { _id, name, image, price, category, sellerEmail } = viewDetails;
      const cartItem = {
        medicineId: _id,
        buyerEmail: user.email,
        name,
        image,
        price,
        category,
        sellerEmail,
        quantity: 1,
      };
      axiosSecure.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId || res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} has been selected`,
            showConfirmButton: false,
            timer: 1000,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged in?",
        text: "Please login to add to the cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  return (
    <>
      <div className="pt-20 px-10">
        <h2 className="font-bold text-info text-xl py-6 text-center">
          All Medicines
        </h2>
        <div className="overflow-x-auto md:mx-52 lg:mx-52 md:p-10 lg:p-10 border-2 rounded-xl">
          <table className="table table-xs ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Category</th>
                <th>Price</th>
                <th>View</th>
                <th>Select</th>
              </tr>
            </thead>

            <tbody>
              {filteredMedicine.map((data) => (
                <tr key={data._id}>
                  <td className="font-bold">{data.name}</td>
                  <td>
                    <img
                      className="rounded w-12"
                      src={data.image}
                      alt="medicine image"
                    />
                  </td>
                  <td>{data.category}</td>
                  <td>${data.price}</td>

                  {/* View button */}
                  <td>
                    <button
                      className="btn btn-circle btn-sm btn-outline font-bold btn-info"
                      onClick={() => setViewDetails(data)}
                    >
                      <GrView />
                    </button>

                    {/* ----------- view modal -------- */}
                    {viewDetails && (
                      <dialog
                        id="medihealth-modal"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <img
                            className="w-1/2"
                            src={viewDetails.image}
                            alt=""
                          />
                          <h3 className="font-bold text-info text-lg py-2">
                            {viewDetails.name}
                          </h3>
                          <div className="flex justify-start gap-4 font-bold mb-3">
                            <p>{viewDetails.category}</p>
                            <p>{viewDetails.quantity}</p>
                            <p>{viewDetails.dosage}</p>
                            <p>${viewDetails.price}</p>
                          </div>
                          <p>{viewDetails.short_description}</p>{" "}
                          <div className="modal-action">
                            <form method="dialog">
                              <button
                                className="btn btn-sm btn-circle btn-info absolute right-2 top-2"
                                onClick={closeModal}
                              >
                                ✕
                              </button>
                            </form>
                          </div>{" "}
                        </div>
                      </dialog>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => handleSelect(data)}
                      className="btn btn-xs btn-info font-bold"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Shop;

