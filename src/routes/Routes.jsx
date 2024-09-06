import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Dashboard from "../layout/Dashboard";
import Shop from "../Pages/Shop/Shop";
import Login from "../Pages/Login/Login";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import SignUp from "../Pages/SignUp/SignUp";
import PainRelief from "../Pages/SingleCategory/PainRelief";
import Antibiotics from "../Pages/SingleCategory/Antibiotics";
import AllergyRelief from "../Pages/SingleCategory/AllergyRelief";
import DigestiveHealth from "../Pages/SingleCategory/DigestiveHealth";
import ColdFlu from "../Pages/SingleCategory/ColdFlu";
import VitaminsSupplements from "../Pages/SingleCategory/VitaminsSupplements";
import Cart from "../Pages/Dashboard/Cart";
import UserHome from "../Pages/Dashboard/UserHome";
import Payment from "../Pages/Dashboard/Payment";
import Invoice from "../Pages/Dashboard/Invoice";
import AdminRoute from "./AdminRoute";
import AdminHome from "../Pages/Dashboard/AdminHome";
import ManageUsers from "../Pages/Dashboard/ManageUsers";

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
        path: "updateProfile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "painRelief",
        element: <PainRelief></PainRelief>,
      },
      {
        path: "antibiotics",
        element: <Antibiotics></Antibiotics>,
      },
      {
        path: "allergyRelief",
        element: <AllergyRelief></AllergyRelief>,
      },
      {
        path: "digestiveHealth",
        element: <DigestiveHealth></DigestiveHealth>,
      },
      {
        path: "coldFlu",
        element: <ColdFlu></ColdFlu>,
      },
      {
        path: "vitaminsSupplements",
        element: <VitaminsSupplements></VitaminsSupplements>
      },

      // {
      //   path: "menu",
      //   element: <Menu></Menu>,
      // },
      // {
      //   path: "order/:category",
      //   element: <Order></Order>,
      // },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      // {
      //   path: "secret",
      //   element: (
      //     <PrivateRoute>
      //       <Secret></Secret>
      //     </PrivateRoute>
      //   ),
      // },
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
    //   {
    //     path: "addItems",
    //     element: (
    //       <AdminRoute>
    //         <AddItems></AddItems>
    //       </AdminRoute>
    //     ),
    //   },
    //   {
    //     path: "manageItems",
    //     element: (
    //       <AdminRoute>
    //         <ManageItems></ManageItems>
    //       </AdminRoute>
    //     ),
    //   },
    //   {
    //     path: "updateItem/:id",
    //     element: (
    //       <AdminRoute>
    //         <UpdateItem></UpdateItem>
    //       </AdminRoute>
    //     ),
    //     loader: ({ params }) =>
    //       fetch(
    //         `https://bistro-boss-server-chi-taupe.vercel.app/menu/${params.id}`
    //       ),
    //   },
    //   {
    //     path: "users",
    //     element: (
    //       <AdminRoute>
    //         <AllUsers></AllUsers>
    //       </AdminRoute>
    //     ),
    //   },
    ],
  },
]);
