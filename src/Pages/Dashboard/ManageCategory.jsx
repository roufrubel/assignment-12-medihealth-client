import { GrView } from "react-icons/gr";
import useMedicine from "../../hooks/useMedicine";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";

const ManageCategory = () => {
  const [medicine, loading] = useMedicine();
  const [viewDetails, setViewDetails] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  // const openModal = (data) => {
  //   setViewDetails(data);
  //   document.getElementById("medihealth-modal").showModal();
  // };

  useEffect(() => {
    if (viewDetails) {
      document.getElementById("medihealth-modal").showModal();
    }
  }, [viewDetails]);

  const closeModal = () => {
    setViewDetails(null);
    document.getElementById("medihealth-modal").close();
  };

  // handle select
  const handleSelect = (viewDetails) => {
    // Check if viewDetails is null or undefined
    if (!viewDetails) {
      console.error("No medicine selected.");
      return;
    }

    if (user && user.email) {
      // destructuring from viewDetails
      const { _id, name, image, price, category } = viewDetails;
      // send selected medicine cart to db
      const cartItem = {
        medicineId: _id,
        email: user.email,
        name,
        image,
        price,
        category,
        quantity: 1,
      };
      axiosSecure.post("/carts", cartItem).then((res) => {
        // console.log(res.data)
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} has been selected`,
            showConfirmButton: false,
            timer: 1000,
          });
          // refetch the cart data to update cart count
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged in?",
        text: "Please login to add the cart !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login",
      }).then((result) => {
        if (result.isConfirmed) {
          // send user to the login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  const handleAddCategoryMedicine = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value;
    const image = form.image.value;
    const category = form.category.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const short_description = form.short_description.value;
    const dosage = form.dosage.value;
    // console.log(name, photo, email, password);
    const categoryMedicineItem = {
      name,
      image,
      category,
      price,
      quantity,
      short_description,
      dosage,
      email: user.email,
    };
    axiosSecure.post("/medicine", categoryMedicineItem).then((res) => {
      // console.log(res.data)
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} has been Added`,
          showConfirmButton: false,
          timer: 1000,
        });
        // refetch the cart data to update cart count
        refetch();
        document.getElementById("my_modal_1").close();
      }
    });
  };

  if (loading) {
    <progress className="progress w-56"></progress>;
  }

  return (
    <>
    <div className="bg-slate-100 rounded-lg flex justify-evenly items-center p-3 mb-3">
    <div><h2 className="font-bold text-info text-xl text-center">
          All categories of medicines
        </h2></div>
      <div><button
        className="btn btn-info btn-sm"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Add Category Medicine
      </button></div>
    </div>
      <dialog id="my_modal_1" className="modal">
        <form onSubmit={handleAddCategoryMedicine} className="modal-box">
        <h3 className="font-bold text-lg text-info mb-3">Add Category Medicine</h3>
          <input
            className="w-full p-2 rounded-md border-2 mb-2"
            type="text"
            name="category"
            placeholder="Your category"
            required
          />
          <input
            className="w-full p-2 rounded-md border-2 mb-2"
            type="text"
            name="name"
            placeholder="Your name"
            required
          />
          <input
            className="w-full p-2 rounded-md border-2 mb-2"
            type="text"
            name="image"
            placeholder="Your image URL"
            required
          />
          <input
            className="w-full p-2 rounded-md border-2 mb-2"
            type="number"
            name="price"
            placeholder="Your price"
            required
          />
          <input
            className="w-full p-2 rounded-md border-2 mb-2"
            type="text"
            name="quantity"
            placeholder="Your quantity"
            required
          />
          <input
            className="w-full p-2 rounded-md border-2 mb-2"
            type="text"
            name="short_description"
            placeholder="Your short description"
            required
          />
          <input
            className="w-full p-2 rounded-md border-2"
            type="text"
            name="dosage"
            placeholder="Your dosage"
            required
          />

          <div className="modal-action">
            <button type="submit" className="btn btn-info btn-sm">
              Add Category Medicine
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => document.getElementById("my_modal_1").close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>

      <div className="pt-4">
        <div className="overflow-x-auto md:mx-10 lg:mx-10 md:p-6 lg:p-10 border rounded-xl">
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
              {medicine.map((data) => (
                <tr key={data._id}>
                  <td className="font-bold">{data?.name}</td>
                  <td>
                    <img
                      className="rounded w-12"
                      src={data.image}
                      alt="medicine image"
                    />
                  </td>
                  <td>{data?.category}</td>
                  <td>${data?.price}</td>

                  {/* view */}
                  <td>
                    <button
                      className="btn btn-circle btn-sm btn-outline font-bold btn-info"
                      onClick={() => setViewDetails(data)}
                    >
                      <GrView />
                    </button>
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
                          <p>{viewDetails.short_description}</p>
                          <div className="modal-action">
                            <form method="dialog">
                              <button
                                className="btn btn-sm btn-circle btn-info absolute right-2 top-2"
                                onClick={closeModal}
                              >
                                ✕
                              </button>
                            </form>
                          </div>
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

export default ManageCategory;
