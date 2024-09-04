import { Outlet, useLocation } from "react-router-dom";
// import Footer from "../pages/shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";


const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes("login") || location.pathname.includes("signup");
    return (
        <div>
            {  noHeaderFooter || <Navbar></Navbar>}
            <div>
            <Outlet></Outlet>
            </div>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;