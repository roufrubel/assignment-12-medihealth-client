import useMedicine from "../../hooks/useMedicine";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManageCategory = () => {
  const [medicine, loading, refetch] = useMedicine();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // handle add category
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


// handle delete category
  const handleDeleteCategoryMedicine = (id) => {
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
        axiosSecure.delete(`/medicine/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire(`Deleted! Your medicine has been deleted. success`);
            refetch();
          }
        });
      }
    });
  };

  if (loading) {
    <progress className="progress w-56"></progress>;
  }

  return (
    <>
      <div className="bg-neutral rounded-lg flex justify-evenly items-center p-3 mb-3">
        <div>
          <h2 className="font-bold text-neutral-content text-xl text-center">
            Manage All categories of medicines
          </h2>
        </div>
        <div>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Add Category Medicine
          </button>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <form onSubmit={handleAddCategoryMedicine} className="modal-box">
          <h3 className="font-bold text-lg text-info mb-3">
            Add Category Medicine
          </h3>
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
                <th>Update</th>
                <th>Delete</th>
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

                  <td>
                    <Link to={`/dashboard/updateCategoryMedicine/${data._id}`}>
                      <button className="btn btn-xs btn-info btn-outline btn-circle font-bold">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>

                  <td>
                    <button
                      onClick={() => handleDeleteCategoryMedicine(data._id)}
                      className="btn btn-xs btn-info btn-outline btn-circle font-bold"
                    >
                      <FaTrash></FaTrash>
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
