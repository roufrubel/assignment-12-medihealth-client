import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Dashboard from "../layout/Dashboard";
import Shop from "../Pages/Shop/Shop";
import Login from "../Pages/Login/Login";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import SignUp from "../Pages/SignUp/SignUp";
import Cart from "../Pages/Dashboard/Cart";
import UserHome from "../Pages/Dashboard/UserHome";
import Payment from "../Pages/Dashboard/Payment";
import Invoice from "../Pages/Dashboard/Invoice";
import AdminRoute from "./AdminRoute";
import AdminHome from "../Pages/Dashboard/AdminHome";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import ManageCategory from "../Pages/Dashboard/ManageCategory";
import CategoryMedicines from "../Pages/Home/CategoryMedicines";
import PaymentManagement from "../Pages/Dashboard/PaymentManagement";
import UpdateCategoryMedicine from "../Pages/Dashboard/UpdateCategoryMedicine";
import SalesReport from "../Pages/Dashboard/SalesReport";
import ManageBannerAdvertise from "../Pages/Dashboard/ManageBannerAdvertise";
import SellerRoute from "./SellerRoute";
import SellerHome from "../Pages/Dashboard/SellerHome";
import ManageMedicines from "../Pages/Dashboard/ManageMedicines";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import AskForAdvertisement from "../Pages/Dashboard/AskForAdvertisement";
import UserPaymentHistory from "../Pages/Dashboard/UserPaymentHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "shop",
        element: <Shop></Shop>,
      },
      {
        path: "/category/:category",
        element: <CategoryMedicines></CategoryMedicines>
      },
      {
        path: "updateProfile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      // <PrivateRoute>
        <Dashboard></Dashboard>
      // </PrivateRoute>
    ),
    children: [
    //   // normal user routes
      {
        path: "cart",
        element: <Cart></Cart>
      },
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "userPaymentHistory",
        element: <UserPaymentHistory></UserPaymentHistory>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "invoice",
        element: <Invoice></Invoice>,
      },

      // Admin only routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageCategory",
        element: (
          <AdminRoute>
            <ManageCategory></ManageCategory>
          </AdminRoute>
        ),
      },
      {
        path: "updateCategoryMedicine/:id",
        element: (
          <AdminRoute>
            <UpdateCategoryMedicine></UpdateCategoryMedicine>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          // fetch(`http://localhost:5000/medicine/${params.id}`),
          fetch(`https://assignment-12-medihealth-server.vercel.app/medicine/${params.id}`),
      },
      {
        path: "paymentManagement",
        element: (
          <AdminRoute>
            <PaymentManagement></PaymentManagement>
          </AdminRoute>
        )
      },
      {
        path: "salesReport",
        element: (
          <AdminRoute>
            <SalesReport></SalesReport>
          </AdminRoute>
        )
      },

      // ------------------ TODO: need to write code -----------------------
      {
        path: "manageBannerAdvertise",
        element: (
          <AdminRoute>
            <ManageBannerAdvertise></ManageBannerAdvertise>
          </AdminRoute>
        )
      },

       // Seller only routes
       {
        path: "sellerHome",
        element: (
          <SellerRoute>
            <SellerHome></SellerHome>
          </SellerRoute>
        ),
      },
       {
        path: "manageMedicines",
        element: (
          <SellerRoute>
            <ManageMedicines></ManageMedicines>
          </SellerRoute>
        ),
      },
       {
        path: "paymentHistory",
        element: (
          <SellerRoute>
            <PaymentHistory></PaymentHistory>
          </SellerRoute>
        ),
      },

      // ------------------ TODO: need to write code -----------------------
       {
        path: "askForAdvertisement",
        element: (
          <SellerRoute>
            <AskForAdvertisement></AskForAdvertisement>
          </SellerRoute>
        ),
      },



    ],
  },
]);
