import { Outlet, useLocation } from "react-router-dom";
// import Footer from "../pages/shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar";


const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes("login") || location.pathname.includes("signup");
    return (
        <div>
            <h2>Main page</h2>
            {  noHeaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
            {/* {noHeaderFooter || <Footer></Footer>} */}
        </div>
    );
};

export default Main;