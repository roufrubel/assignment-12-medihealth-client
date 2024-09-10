import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [isAdmin] = useAdmin();
  const [isSeller] = useSeller();
  const [cart] = useCart();
  const navigate = useNavigate();

  const [language, setLanguage] = useState("English");
  const [searchTerm, setSearchTerm] = useState(""); // State to track the search input

  const myCart = cart?.filter((myc) => myc.buyerEmail === user.email);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      // Navigate to the /shop route with the search term as a query parameter
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      // "encodeURIComponent" is used to properly encode the search term when navigating to a URL. The main reason for using it is to ensure that any special characters in the search term (such as spaces, punctuation, or symbols) are safely included in the URL without breaking it or causing errors.

      // Clear the search field after search is performed
      setSearchTerm("");
    }
  };

  const handleSignOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const navbarMenus = (
    <>
      {/* Other navbar items */}
      <li>
        <Link to="/">{language === "English" ? "Home" : "হোম"}</Link>
      </li>
      <li>
        <Link to="/shop">{language === "English" ? "Shop" : "দোকান"}</Link>
      </li>

      {user && isAdmin && (
        <li>
          <Link to="/dashboard/adminHome">
            {language === "English" ? "Dashboard" : "ড্যাশবোর্ড"}
          </Link>
        </li>
      )}
      {user && isSeller && !isAdmin && (
        <li>
          <Link to="/dashboard/sellerHome">
            {language === "English" ? "Dashboard" : "ড্যাশবোর্ড"}
          </Link>
        </li>
      )}
      {user && !isSeller && !isAdmin && (
        <li>
          <Link to="/dashboard/userHome">
            {language === "English" ? "Dashboard" : "ড্যাশবোর্ড"}
          </Link>
        </li>
      )}

      {/* Search input */}
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder={
            language === "English"
              ? "Search medicines..."
              : "ঔষধ অনুসন্ধান করুন..."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered input-sm text-black"
        />
        <button type="submit" className="btn btn-sm btn-info ml-2">
          {language === "English" ? "Search" : "অনুসন্ধান"}
        </button>
      </form>

      {/* Cart and other items */}
      <li>
        <Link to="/dashboard/cart">
          <button className="btn md:btn-xs lg:btn-xs ">
            <FaShoppingCart />
            <div className="badge badge-info">+{myCart.length}</div>
          </button>
        </Link>
      </li>

      <li>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost rounded-btn btn-xs"
          >
            {language} <IoIosArrowDown />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-white border rounded-box z-[1] mt-36 p-2 shadow text-black"
          >
            {" "}
            <li className="bg-warning mb-2 rounded-lg">
              <a onClick={() => handleLanguageChange("English")}>English</a>
            </li>
            <li className="bg-warning rounded-lg">
              <a onClick={() => handleLanguageChange("Bangla")}>Bangla</a>
            </li>
          </ul>
        </div>
      </li>
    </>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="navbar bg-opacity-80 text-white fixed z-10 px-10 bg-black">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-4 text-black shadow"
          >
            {navbarMenus}
          </ul>
        </div>
        <div className="flex items-center">
          <a className="btn btn-ghost text-xl font-bold uppercase text-info">
            <MdOutlineHealthAndSafety className="text-info text-2xl" />
            mediHealth
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navbarMenus}</ul>
      </div>

      {/* profile and logout section */}
      <div className="navbar-end">
        {user ? (
          <>
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="Profile" src={user?.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-4 shadow space-y-4 text-black"
                >
                  <li className="bg-slate-100 rounded-lg">
                    <Link
                      to="/updateProfile"
                      className="text-center bg-warning"
                    >
                      {language === "English"
                        ? "Update Profile"
                        : "প্রোফাইল আপডেট"}
                    </Link>
                  </li>{" "}
                  <li className="bg-slate-100 rounded-lg">
                    <Link to="/dashboard" className="text-center bg-warning">
                      {language === "English" ? "Dashboard" : "ড্যাশবোর্ড"}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="btn btn-secondary font-bold"
                    >
                      {language === "English" ? "Log Out" : "লগ আউট"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <Link to="/login">
            <button className="btn btn-xs btn-info font-bold">
              {language === "English" ? "Join Us" : "যোগদান করুন"}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

