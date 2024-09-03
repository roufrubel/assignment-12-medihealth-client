
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
// import logo from "../../assets/mediHealth.png"
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";


const Navbar = () => {
  const {user, logOut, loading} = useAuth();
  const [isAdmin] = useAdmin();
  const [cart] = useCart();

  if(loading) {
    <p>Loading...</p>
  }

  console.log(user)

  const handleSignOut = () => {
    logOut()
    .then(() => {})
    .catch(error => console.log(error))
  }

    const navbarMenus = <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/shop">Shop</Link></li>
      <li>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn btn-xs">Languages<IoIosArrowDown></IoIosArrowDown></div>
        <ul
          tabIndex={0}
          className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-32 p-4 shadow text-black">
          <li><a>English</a></li>
          <li><a>Bangla</a></li>
        </ul>
      </div>
      </li>
      {
        user && isAdmin && <li><Link to="/dashboard/adminHome">Admin home page</Link></li>
      }    
      {
        user && !isAdmin && <li><Link to="/dashboard/userHome">User home page</Link></li>
      }    
      <li><Link to="/dashboard/cart">
      <button className="btn btn-xs">
      <FaCartPlus />
  <div className="badge badge-info">+{cart.length}</div>
</button>
      </Link></li>    
      {/* {
      user ?  <> 
      <button onClick={handleLogOut} >Log Out</button></> : <><li><Link className="btn btn-outline"  to="/login">Join Us </Link></li> </>
    }  */}
    </>


    return (
        <>
        <div className="navbar bg-opacity-30 text-white fixed z-10 max-w-screen-xl	 bg-black">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {
            navbarMenus
        }
      </ul>
    </div>
    <div className="flex items-center">
    {/* <img className="h-6 w-6" src={logo} alt="mediHealth" /> */}
    
    <a className="btn btn-ghost text-xl  font-bold">
      <MdOutlineHealthAndSafety className="text-blue-600 text-2xl"></MdOutlineHealthAndSafety>mediHealth</a>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {
        navbarMenus
      }
    </ul>
  </div>
  {/* <div className="navbar-end">    
      <Link  to="/login">get started </Link>    
  </div> */}


<div className="navbar-end">
        {user ? (
          <>
          <div className="flex-none gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Profile"
            src= {user?.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-4 shadow space-y-4 text-black">
        <li className="bg-slate-100 rounded-lg">
          <Link to="/updateProfile" className="text-center">Update Profile</Link>
          </li>
        <li className="bg-slate-100 rounded-lg">
          <Link to="/dashboard" className="text-center">Dashboard</Link>
          </li>
        <li><button onClick={handleSignOut} className="btn btn-xs btn-info font-bold">
              Log Out
            </button></li>
      </ul>
    </div>
  </div>
            {/* <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar image-container"
            >
              <div className="w-10 rounded-full ">
                <img alt="Pic" src={user?.photoURL} />
                <div className="tooltip">{user?.displayName}</div>
              </div>
            </div>
            <button onClick={handleSignOut} className="btn">
              Log Out
            </button> */}
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-xs btn-info font-bold">Join Us</button>
            </Link>
          </>
        )}
      </div>

</div>            
        </>
    );
};

export default Navbar;