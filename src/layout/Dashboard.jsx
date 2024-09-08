import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";
import { FaCartPlus, FaHome, FaSearch, FaUsers } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";

const Dashboard = () => {
  const [cart] = useCart();
  // get admin value from db
  const [isAdmin] = useAdmin();

  return (
    <>
      <div className="flex">
        {/* dashboard sidebar */}
        <div className="md:w-44 lg:w-44 min-h-screen bg-neutral text-neutral-content pt-16">
        <ul className="menu">
          {
            isAdmin ?
            <>
            {/* admin dashboard */}
            <li>
            <NavLink to="/dashboard/adminHome">
              <FaHome /> Admin Home
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/manageUsers">
            <FaUsers />Manage Users
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/manageCategory">
            <TbCategoryPlus />Manage Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <FaCartPlus /> My Cart ({cart.length})
            </NavLink>
          </li>
            </> :
            <>
            {/* user dashboard */}
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

