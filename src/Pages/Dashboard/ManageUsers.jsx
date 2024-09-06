import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: users = [],
        isPending: loading,
        refetch,
      } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const res = await axiosSecure.get("/users");
          return res.data;
        },
      });


      const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res => {
          console.log(res.data)
          if(res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is an Admin now!`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }

      
      const handleMakeSeller = user => {
        axiosSecure.patch(`/users/seller/${user._id}`)
        .then(res => {
          console.log(res.data)
          if(res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is an Seller now!`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }

      const handleMakeUser = user => {
        axiosSecure.patch(`/users/user/${user._id}`)
        .then(res => {
          console.log(res.data)
          if(res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} is an User now!`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }




      if (loading) {
        <progress className="progress w-56"></progress>;
      }

    return (
        <>
      <div className="pt-20 px-10">
        <h2 className="font-bold text-info text-xl py-6 text-center">
          Manage users
        </h2>
        <div className="overflow-x-auto md:mx-10 lg:mx-10 md:p-10 lg:p-10 border-2 rounded-xl">
          <table className="table table-xs ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((data) => (
                <tr key={data._id}>
                  <td className="font-bold">{data?.name}</td>
                  <td>{data?.email}</td>
                  <td>{data?.role === 'admin' ? <span className='font-bold'>Admin</span> : data?.role === 'seller' ? <span className='font-bold'>Seller</span> : 'User'}</td>

                  <td>
                    <button
                      onClick={() => handleMakeAdmin(data)}
                      className="btn btn-xs btn-info"
                    >
                      make admin
                    </button>
                  </td>

                  <td>
                      <button
                        className="btn btn-xs btn-info"
                        onClick={() => handleMakeSeller(data)}
                      >
                        make seller
                      </button>
                  </td>

                  <td>
                    <button
                      onClick={() => handleMakeUser(data)}
                      className="btn btn-xs btn-info"
                    >
                      make user
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

export default ManageUsers;