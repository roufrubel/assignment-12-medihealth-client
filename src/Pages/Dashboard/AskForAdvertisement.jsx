import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAdvertisement from "../../hooks/useAdvertisement";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const AskForAdvertisement = () => {
    const { user } = useAuth();
    const [advertisement, loading, refetch] = useAdvertisement();
  const axiosSecure = useAxiosSecure();

  const sellerEmail = user?.email;
  const filteredAdvertisement = advertisement?.filter((advert) =>
    advert.sellerEmail.includes(sellerEmail)
  );

  // handle add category
  const handleAddAdvertise = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value;
    const image = form.image.value;    
    const short_description = form.short_description.value;    
    const sellerEmail = form.sellerEmail.value;
    const status = form.status.value
    // console.log(name, photo, email, password);
    const advertiseMedicineItem = {
      name,
      image,      
      short_description,
      status,
      sellerEmail
    };
    axiosSecure.post("/advertisement", advertiseMedicineItem).then((res) => {
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
      <div className="bg-neutral rounded-lg flex justify-evenly items-center p-3 mb-6">
        <div>
          <h2 className="font-bold text-neutral-content text-xl text-center">
            Ask For Advertisement
          </h2>
        </div>
        <div>
          <button
            className="btn btn-warning btn-sm font-bold text-base"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Add Advertise
          </button>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <form onSubmit={handleAddAdvertise} className="modal-box">
          <h3 className="font-bold text-lg text-info mb-3">
            Add Category Medicine
          </h3>
          
          <input
            className="w-full p-2 rounded-md border-2 mb-2"
            type="text"
            name="name"
            placeholder="medicine name"
            required
          />
          <input
            className="w-full p-2 rounded-md border-2 mb-2"
            type="text"
            name="image"
            placeholder="medicine image URL"
            required
          />
          
          <input
            className="w-full p-2 rounded-md border-2 mb-2"
            type="text"
            name="short_description"
            placeholder="medicine description"
            required
          />
        
          <input
            className="w-full p-2 rounded-md border-2"
            type="text"
            name="sellerEmail"
            placeholder="seller  email"
            required
          />
          <input
            className="w-full p-2 rounded-md border-2"
            type="text"
            name="status"
            defaultValue="not used"
            placeholder="status"
            required
          />

          <div className="modal-action">
            <button type="submit" className="btn btn-info btn-sm">
              Add Advertise
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
        <div className="overflow-x-auto md:mx-4 lg:mx-4 md:p-2 lg:p-2 border rounded-xl">
          <table className="table table-xs ">
            <thead>
            <tr className="font-bold text-info text-base">
                <th>SL</th>
                 <th>Medicine Name</th>
                 <th>Status</th>
                 <th>Seller Email</th>
                <th>Image</th>
                 <th>Description</th>
               </tr>
            </thead>
            <tbody>
              {filteredAdvertisement.map((data, idx) => (
                <tr key={data._id}>
                  <td className="font-bold text-info text-base">{idx + 1}</td>
                  <td>{data?.name}</td>
                  <td className="font-bold">
                    {data?.status === "not used" ? ( <button className="btn btn-warning btn-xs">{data?.status}</button>
                    ) : (<button className="btn btn-success btn-outline btn-sm"><IoMdCheckmarkCircleOutline className="text-success text-xl"></IoMdCheckmarkCircleOutline>                         Used</button>)}
                    </td>
                    <td>{data?.sellerEmail}</td>
                    <td><img
                      className="rounded w-20"
                      src={data.image}
                      alt="medicine image"
                    /></td>
                 <td className="w-1/4">{data?.short_description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AskForAdvertisement;

