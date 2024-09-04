import React, { useEffect, useState } from 'react';
import useMedicine from '../../hooks/useMedicine';
import { GrView } from 'react-icons/gr';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';
import Swal from 'sweetalert2';

const VitaminsSupplements = () => {
  const [medicine, loading] = useMedicine();  

  const [viewDetails, setViewDetails] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const {user} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [ , refetch] = useCart();

  const vitaminsSupplements = medicine.filter(md => md.category === "Vitamins & Supplements")  

  useEffect(() => {
    if(viewDetails){
      document.getElementById("medihealth-modal").showModal();
    }
  }, [viewDetails]);

  const closeModal = () => {
    setViewDetails(null);
    document.getElementById("medihealth-modal").close();
  };

    // handle select
    const handleSelect = (selectedMedicine) => {
      // Check if selectedMedicine is null or undefined
    if (!selectedMedicine) {
      console.error("No medicine selected.");
      return;
    }
  
      if(user && user.email){
         // destructuring from selectedMedicine
         const { _id, name, image, price, category } = selectedMedicine;
        // send selected medicine cart to db
        const cartItem = {
          medicineId: _id,
          email: user.email,
          name,
          image,
          price,
          category
        }
        axiosSecure.post('/carts', cartItem)
        .then(res => {
          console.log(res.data)
          if(res.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} has been selected`,
              showConfirmButton: false,
              timer: 1000
            });
            // refetch the cart data to update cart count
            refetch();
          }
        })
      } else{
        Swal.fire({
          title: "You are not logged in?",
          text: "Please login to add the cart !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, login"
        }).then((result) => {
          if (result.isConfirmed) {
            // send user to the login page
            navigate('/login', {state: {from: location}});
          }
        });
      }
    }
  

    if(loading){
        <progress className="progress w-56"></progress>
    }

    return (
        <>
        
        <div className="pt-20 px-10">
            <h2 className="font-bold text-info text-xl py-4">Vitamins Supplements medicines</h2>
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
            {vitaminsSupplements.map((data) => (
                <tr key={data._id}>
                  <td className="font-bold">{data?.name}</td>
                  <td>{data?.category}</td>
                  <td>${data?.price}</td>
                  {/* view */}
                  <td>
                      <button
                        className="btn btn-circle btn-sm btn-outline font-bold btn-info"
                        onClick={() =>  setViewDetails(data)}
                      >
                        <GrView />
                      </button>

                    {
                      viewDetails && (
                        <dialog
                      id="medihealth-modal"
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                          <img className="w-1/2" src={viewDetails.image} alt="" />
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
                            <button className="btn btn-sm btn-circle btn-info absolute right-2 top-2"
                            onClick={closeModal}
                            >
                              ✕
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                      )
                    }
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

export default VitaminsSupplements;


// import React, { useEffect, useState } from 'react';
// import useMedicine from '../../hooks/useMedicine';
// import { GrView } from 'react-icons/gr';

// const VitaminsSupplements = () => {
//     const [medicine, loading] = useMedicine();
//     const [selectedMedicine, setSelectedMedicine] = useState(null);
//     const vitaminsSupplements = medicine.filter(md => md.category === "Vitamins & Supplements")

//     useEffect(() => {
//       if(selectedMedicine){
//         document.getElementById("medihealth-modal").showModal();
//       }
//     }, [selectedMedicine]);
  
//     const closeModal = () => {
//       setSelectedMedicine(null);
//       document.getElementById("medihealth-modal").close();
//     };

//     if(loading){
//         <progress className="progress w-56"></progress>
//     }

//     return (
//         <>
    
//         <div className="pt-20 px-10">
//             <h2 className="font-bold text-info text-xl py-4">Vitamins & Supplements medicines</h2>
//             <div className="overflow-x-auto">
//             <table className="table table-xs ">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>View</th>
//               <th>Select</th>
//             </tr>
//           </thead>
//           <tbody>
//             {vitaminsSupplements.map((data) => (
//                 <tr key={data._id}>
//                   <td className="font-bold">{data?.name}</td>
//                   <td>{data?.category}</td>
//                   <td>${data?.price}</td>
//               {/* view */}
//               <td>
//                       <button
//                         className="btn btn-circle btn-sm btn-outline font-bold btn-info"
//                         onClick={() => setSelectedMedicine(data)}
//                       >
//                         <GrView />
//                       </button>

//                     {
//                       selectedMedicine && (
//                         <dialog
//                       id="medihealth-modal"
//                       className="modal modal-bottom sm:modal-middle"
//                     >
//                       <div className="modal-box">
//                           <img className="w-1/2" src={selectedMedicine.image} alt="" />
//                           <h3 className="font-bold text-info text-lg py-2">
//                             {selectedMedicine.name}
//                           </h3>
//                           <div className="flex justify-start gap-4 font-bold mb-3">
//                             <p>{selectedMedicine.category}</p>
//                             <p>{selectedMedicine.quantity}</p>
//                             <p>{selectedMedicine.dosage}</p>
//                             <p>${selectedMedicine.price}</p>
//                           </div>
//                           <p>{selectedMedicine.short_description}</p>
//                         <div className="modal-action">
//                           <form method="dialog">
//                             <button className="btn btn-sm btn-circle btn-info absolute right-2 top-2"
//                             onClick={closeModal}
//                             >
//                               ✕
//                             </button>
//                           </form>
//                         </div>
//                       </div>
//                     </dialog>
//                       )
//                     }
//                   </td>
                 
//                   <td>
//                       <button
//                         onClick={() => handleConfirm(data?._id)}
//                         className="btn btn-xs btn-info font-bold"
//                       >
//                         Select
//                       </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//         </div>
//         </>
//     );
// };

// export default VitaminsSupplements;