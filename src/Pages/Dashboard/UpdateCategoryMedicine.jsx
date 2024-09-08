import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMedicine from "../../hooks/useMedicine";

const UpdateCategoryMedicine = () => {

    const [, refetch] = useMedicine();
  const {
    name,
    category,
    quantity,
    price,
    dosage,
    short_description,
    image,
    _id,
  } = useLoaderData();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleUpdateCategoryMedicine = (e) => {
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
    };
    axiosSecure.patch(`/medicine/${_id}`, categoryMedicineItem).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        navigate("/dashboard/manageCategory");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} has been Updated`,
          showConfirmButton: false,
          timer: 1000,
        });
        refetch();
      }
    });
  };

  return (
    <>
      <div className="bg-info rounded flex justify-center items-center p-3 mb-3">
        <div>
          <h2 className="font-bold text-xl text-center">
          Update Category Medicine
          </h2>
        </div>
        
      </div>

      <div className="mt-10 w-full mx-auto md:w-3/4 lg:w-3/4 ">
        <form onSubmit={handleUpdateCategoryMedicine}>

          <input
            className="w-full md:w-3/4 lg:w-3/4 p-2 rounded-md border-2 mb-2"
            type="text"
            name="category"
            defaultValue={category}
            placeholder="Your category"
            required
          />
          <input
            className="w-full md:w-3/4 lg:w-3/4 p-2 rounded-md border-2 mb-2"
            type="text"
            name="name"
            defaultValue={name}
            placeholder="Your name"
            required
          />
          <input
            className="w-full md:w-3/4 lg:w-3/4 p-2 rounded-md border-2 mb-2"
            type="text"
            name="image"
            defaultValue={image}
            placeholder="Your image URL"
            required
          />
          <input
            className="w-full md:w-3/4 lg:w-3/4 p-2 rounded-md border-2 mb-2"
            type="number"
            name="price"
            defaultValue={price}
            placeholder="Your price"
            required
          />
          <input
            className="w-full md:w-3/4 lg:w-3/4   p-2 rounded-md border-2 mb-2"
            type="text"
            name="quantity"
            defaultValue={quantity}
            placeholder="Your quantity"
            required
          />
          <input
            className="w-full md:w-3/4 lg:w-3/4 p-2 rounded-md border-2 mb-2"
            type="text"
            name="short_description"
            defaultValue={short_description}
            placeholder="Your short description"
            required
          />
          <input
            className="w-full md:w-3/4 lg:w-3/4 mb-2  p-2 rounded-md border-2"
            type="text"
            name="dosage"
            defaultValue={dosage}
            placeholder="Your dosage"
            required
          />
          <br></br>
          <button className="btn btn-warning btn-sm">
            <input
              className="p-2 rounded-md border-0"
              type="submit"
              value="Update Category Medicine"
            />
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateCategoryMedicine;
