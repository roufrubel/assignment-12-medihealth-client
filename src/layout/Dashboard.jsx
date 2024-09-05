import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";
// import Navbar from "../Pages/Shared/Navbar";
import { FaCartPlus, FaHome, FaSearch } from "react-icons/fa";

const Dashboard = () => {
  const [cart] = useCart();
  // get admin value from db
  const [isAdmin] = useAdmin();

  return (
    <>
      {/* <div className="pb-[64px] lg:pb-[72px]">
        <Navbar></Navbar>
      </div> */}

      <div className="flex">
        {/* dashboard sidebar */}
        <div className="md:w-44 lg:w-44 min-h-screen bg-neutral text-neutral-content pt-16">
        <ul className="menu">
          {
            isAdmin ?
            <>
            <li>
            <NavLink to="/dashboard/adminHome">
              <FaHome /> Admin Home
            </NavLink>
          </li>
            </> :
            <>
            <li>
            <NavLink to="/dashboard/userHome">
              <FaHome /> User Home
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/dashboard/cart">
              <FaCartPlus /> My Cart ({cart.length})
            </NavLink>
          </li>
            </>
          }
          {/* shared dashboard menus */}
          <div className="divider my-4 divider-info"></div>
          <li>
            <NavLink to="/">
              <FaHome />Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop">
              <FaSearch />Shop
            </NavLink>
          </li>
        </ul>
        </div>

        {/* dashboard content */}
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

// import { NavLink, Outlet } from "react-router-dom";
// import { FaBook, FaCartPlus, FaEnvelope, FaHome, FaList, FaSearch, FaUsers, FaUtensils } from "react-icons/fa";
// import { FaCalendar } from "react-icons/fa6";
// import {  MdOutlineReviews } from "react-icons/md";
// import { TbBrandBooking } from "react-icons/tb";
// import useCart from "../hooks/useCart";
// import useAdmin from "../hooks/useAdmin";

// const Dashboard = () => {
//   const [cart] = useCart();

//   // get admin value from db
//   const [isAdmin] =useAdmin();

//   return (
//     <div className="flex">
//       {/* dashboard sidebar */}
//       <div className="w-64 min-h-screen bg-orange-400">
//         <ul className="menu">
//           {
//             isAdmin ?
//             <>
//             <li>
//             <NavLink to="/dashboard/adminHome">
//               <FaHome /> Admin Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/addItems">
//               <FaUtensils /> Add Items
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/manageItems">
//             <FaList />Manage Items
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/bookings">
//             <FaBook />Manage Bookings
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/users">
//               <FaUsers /> All users
//             </NavLink>
//           </li>
//             </> :
//             <>
//             <li>
//             <NavLink to="/dashboard/userHome">
//               <FaHome /> User Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/reservation">
//               <FaCalendar /> Reservation
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/review">
//             <MdOutlineReviews />Add a Review
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/bookings">
//             <TbBrandBooking />My Bookings
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/paymentHistory">
//             <TbBrandBooking />Payment History
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/cart">
//               <FaCartPlus /> My Cart ({cart.length})
//             </NavLink>
//           </li>
//             </>
//           }
//           {/* shared dashboard menus */}
//           <div className="divider"></div>
//           <li>
//             <NavLink to="/">
//               <FaHome />Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/menu">
//               <FaSearch />Menu
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/contact">
//               <FaEnvelope />Contact
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//       {/* dashboard content */}
//       <div className="flex-1 p-8">
//         <Outlet></Outlet>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
