import useMedicine from "../../hooks/useMedicine";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageMedicines = () => {
    const {user} = useAuth();
  const [medicine, loading, refetch] = useMedicine();
  const axiosSecure = useAxiosSecure();

  const sellerEmail = user?.email;
    // Filter medicines for the seller
  const sellerMedicines = medicine?.filter(medi => 
    medi.sellerEmail.includes(sellerEmail)
  );

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
    const sellerEmail = form.sellerEmail.value;
    // console.log(name, photo, email, password);
    const sellerMedicineItem = {
      name,
      image,
      category,
      price,
      quantity,
      short_description,
      dosage,
      sellerEmail
    };
    axiosSecure.post("/medicine", sellerMedicineItem).then((res) => {
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
      <div className="bg-neutral rounded-lg flex justify-evenly items-center p-3 mb-3">
        <div>
          <h2 className="font-bold text-neutral-content text-xl text-center">
          Manage Medicines
          </h2>
        </div>
        <div>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Add Seller Medicine
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
          <input
            className="w-full p-2 rounded-md border-2"
            type="text"
            name="sellerEmail"
            placeholder="Your  email"
            required
          />

          <div className="modal-action">
            <button type="submit" className="btn btn-info btn-sm">
              Add Seller Medicine
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
                <th>Seller Email</th>
              </tr>
            </thead>
            <tbody>
              {sellerMedicines.map((data) => (
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
                  <td>{data?.sellerEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageMedicines;
