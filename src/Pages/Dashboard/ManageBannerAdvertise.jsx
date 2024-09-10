import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAdvertisement from "../../hooks/useAdvertisement";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const ManageBannerAdvertise = () => {
  const [advertisement, loading, refetch] = useAdvertisement();
  const axiosSecure = useAxiosSecure();

  // Toggle the status of the advertisement (add to slide/remove from slide)
  const handleToggleSlide = (id, currentStatus) => {
    const newStatus = currentStatus === "not used" ? "used" : "not used";

    axiosSecure
      .patch(`/advertisement/${id}`, { status: newStatus })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Advertise status has been Updated`,
            showConfirmButton: false,
            timer: 1000,
          });
          refetch(); // Refetch to update the table with new status
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
            Manage Banner Advertise
          </h2>
        </div>
      </div>
      <div className="pt-4">
        <div className="overflow-x-auto md:mx-4 lg:mx-4 md:p-2 lg:p-2 border rounded-xl">
          <table className="table table-xs ">
            <thead>
              <tr className="font-bold text-info text-base">
                <th>SL</th>
                <th>Medicine Name</th>
                <th>Status</th>
                <th>Action</th>
                <th>Seller Email</th>
                <th>Image</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {advertisement.map((data, idx) => (
                <tr key={data._id}>
                  <td className="font-bold text-info text-base">{idx + 1}</td>
                  <td>{data?.name}</td>
                  <td className="font-bold">
                    {data?.status === "not used" ? (
                      <button className="btn btn-warning btn-xs">
                        {data?.status}
                      </button>
                    ) : (
                      <button className="btn btn-success btn-outline btn-sm">
                        <IoMdCheckmarkCircleOutline className="text-success text-xl"></IoMdCheckmarkCircleOutline>{" "}
                        Used
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className={`btn font-bold ${
                        data?.status === "not used"
                          ? "btn-info"
                          : "btn-secondary"
                      } btn-xs`}
                      onClick={() => handleToggleSlide(data._id, data.status)}
                    >
                      {data?.status === "not used"
                        ? "Add to Slide"
                        : "Remove from Slide"}
                    </button>
                  </td>
                  <td>{data?.sellerEmail}</td>
                  <td>
                    <img
                      className="rounded w-20"
                      src={data.image}
                      alt="medicine image"
                    />
                  </td>
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

export default ManageBannerAdvertise;
