import { Link } from "react-router-dom";
import useMedicine from "../../hooks/useMedicine";
import Navbar from "../Shared/Navbar";
import { GrView } from "react-icons/gr";


const PainRelief = () => {
    const [medicine, loading] = useMedicine();
    if(loading){
        <progress className="progress w-56"></progress>
    }
    const painRelief = medicine.filter(data => data.category === "Pain Relief")

    return (
        <>
        
        <div className="pt-20 px-10">
            <h2 className="font-bold text-info text-xl py-4">Pain Relief medicines</h2>
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
            {painRelief.map((data) => (
                <tr key={data._id}>
                  <td className="font-bold">{data?.name}</td>
                  <td>{data?.category}</td>
                  <td>${data?.price}</td>
                {/* view */}
                  <td>
                  <Link to={`/medicine/${data._id}`}>
                      <button className="btn btn-circle btn-sm btn-outline font-bold btn-info">
                        <GrView />
                      </button>
                    </Link>
                  </td>
                 
                  <td>
                      <button
                        onClick={() => handleConfirm(data?._id)}
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

export default PainRelief;