import { GrView } from "react-icons/gr";
import useMedicine from "../../hooks/useMedicine";
import { Link } from "react-router-dom";
import Navbar from "../Shared/Navbar";


const Shop = () => {
    const [medicine, loading] = useMedicine();
    if(loading){
        <progress className="progress w-56"></progress>
    }


    return (
        <>
        <div className="mt-0">
        <Navbar></Navbar>
        </div>
        <div className="pt-20">
            <h2>All category medicine</h2>
            <div className="overflow-x-auto">
        <table className="table table-xs ">
          <thead>
            <tr>
              <th>Name</th>
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
                  <td>{data?.category}</td>
                  <td>${data?.price}</td>
                {/* view */}
                  <td>
                  <Link to={`/medicine/${data._id}`}>
                      <button className="btn btn-circle btn-sm btn-outline font-bold btn-warning">
                        <GrView />
                      </button>
                    </Link>
                  </td>
                 
                  <td>
                      <button
                        onClick={() => handleConfirm(data?._id)}
                        className="btn btn-warning btn-xs"
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