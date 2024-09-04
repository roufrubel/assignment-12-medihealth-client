
import useMedicine from '../../hooks/useMedicine';
import React, { useEffect, useState } from 'react';
import { GrView } from 'react-icons/gr';

const DigestiveHealth = () => {
    const [medicine, loading] = useMedicine();
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const digestiveHealth = medicine.filter(md => md.category === "Digestive Health")

    useEffect(() => {
      if(selectedMedicine){
        document.getElementById("medihealth-modal").showModal();
      }
    }, [selectedMedicine]);
  
    const closeModal = () => {
      setSelectedMedicine(null);
      document.getElementById("medihealth-modal").close();
    };

    if(loading){
        <progress className="progress w-56"></progress>
    }

    return (
        <>
        
        <div className="pt-20 px-10">
            <h2 className="font-bold text-info text-xl py-4">Digestive Health medicines</h2>
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
            {digestiveHealth.map((data) => (
                <tr key={data._id}>
                  <td className="font-bold">{data?.name}</td>
                  <td>{data?.category}</td>
                  <td>${data?.price}</td>
               {/* view */}
               <td>
                      <button
                        className="btn btn-circle btn-sm btn-outline font-bold btn-info"
                        onClick={() => setSelectedMedicine(data)}
                      >
                        <GrView />
                      </button>

                    {
                      selectedMedicine && (
                        <dialog
                      id="medihealth-modal"
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                          <img className="w-1/2" src={selectedMedicine.image} alt="" />
                          <h3 className="font-bold text-info text-lg py-2">
                            {selectedMedicine.name}
                          </h3>
                          <div className="flex justify-start gap-4 font-bold mb-3">
                            <p>{selectedMedicine.category}</p>
                            <p>{selectedMedicine.quantity}</p>
                            <p>{selectedMedicine.dosage}</p>
                            <p>${selectedMedicine.price}</p>
                          </div>
                          <p>{selectedMedicine.short_description}</p>
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

export default DigestiveHealth;