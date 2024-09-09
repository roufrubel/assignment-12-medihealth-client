import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";
import { FaCartPlus, FaDollarSign, FaHome, FaSearch, FaUsers } from "react-icons/fa";
import { TbCategoryPlus, TbReportAnalytics } from "react-icons/tb";
import { RiAdvertisementFill, RiAdvertisementLine, RiSecurePaymentFill } from "react-icons/ri";
import useSeller from "../hooks/useSeller";
import { MdManageHistory } from "react-icons/md";

const Dashboard = () => {
  const [cart] = useCart();
  // get admin value from db
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();

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
              <FaHome className="text-xl"></FaHome> Admin Home
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/manageUsers">
            <FaUsers className="text-xl"></FaUsers>Manage Users
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/manageCategory">
            <TbCategoryPlus className="text-xl"></TbCategoryPlus>Manage Categories
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/paymentManagement">
            <FaDollarSign className="text-xl"></FaDollarSign>Payment Management
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/salesReport">
            <TbReportAnalytics className="text-2xl"> </TbReportAnalytics>Sales Report
            </NavLink>
          </li>

          {/* ------------- TODO: need to write code -------------------- */}
            <li>
            <NavLink to="/dashboard/manageBannerAdvertise">
            <RiAdvertisementFill className="text-xl"></RiAdvertisementFill>Manage Banner Advertise
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <FaCartPlus className="text-xl"></FaCartPlus> My Cart ({cart.length})
            </NavLink>
          </li>
            </>
             :          
            isSeller ?
            <>
            {/* seller dashboard */}
            <li>
            <NavLink to="/dashboard/sellerHome">
              <FaHome className="text-xl"></FaHome> Seller Home
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/manageMedicines">
              <MdManageHistory className="text-xl"></MdManageHistory> Manage Medicines
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/paymentHistory">
              <RiSecurePaymentFill className="text-xl"></RiSecurePaymentFill> Payment History
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/askForAdvertisement">
              <RiAdvertisementLine className="text-xl"></RiAdvertisementLine> Ask For Advertisement
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <FaCartPlus className="text-xl"></FaCartPlus> My Cart ({cart.length})
            </NavLink>
          </li>
          </>
          
             :
            <>
            {/* user dashboard */}
            <li>
            <NavLink to="/dashboard/userHome">
              <FaHome className="text-xl"></FaHome> User Home
            </NavLink>
          </li>
            <li>
            <NavLink to="/dashboard/userPaymentHistory">
              <RiSecurePaymentFill className="text-xl"></RiSecurePaymentFill> Payment History
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/dashboard/cart">
              <FaCartPlus className="text-xl"></FaCartPlus> My Cart ({cart.length})
            </NavLink>
          </li>
            </>
          }
          {/* shared dashboard menus */}
          <div className="divider my-4 divider-info"></div>
          <li>
            <NavLink to="/">
              <FaHome className="text-xl"></FaHome>Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop">
              <FaSearch className="text-xl"></FaSearch>Shop
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

