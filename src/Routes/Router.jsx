import { createBrowserRouter } from "react-router";
import RootLayOuts from "../LayOuts/RootLayOuts";

import Eorr from "../Page/Eorr";
import Home from "../Page/Home/Home";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import AllProducts from "../Page/AllProducts/AllProducts";
import { Component } from "react";
import ProductDetails from "../Page/ProdcutsDeatils/ProdcutDetails";
import BookingForm from "../Page/Bookingform/BookingForm";
// import Payment from "../Page/payment/Payment";
import DashBoardLayOut from "../LayOuts/DashBoardLayouts";
import PaymentSucess from "../Page/DashBoard/paymentsucess/PaymentSucess";
import PaymentCancel from "../Page/DashBoard/PaymentCancel";
import MyOrders from "../Page/DashBoard/MyOrder/MyOrder";
import OrderDetail from "../Page/DashBoard/OrdersDetails/OrderDetail";
import ManageUsers from "../Page/DashBoard/admin/MangeUsers";
import Allproducts from "../Page/DashBoard/admin/AllProducts";
import UpdateProduct from "../Page/DashBoard/admin/UpdateProduct";
import AllOrders from "../Page/DashBoard/admin/ALLOrders";
import AddProduct from "../Page/DashBoard/Manager/AddProduct";
import ManageProducts from "../Page/DashBoard/Manager/ManageProducts";
import PendingOrders from "../Page/DashBoard/Manager/PendingOrders";
import ApproveOrders from "../Page/DashBoard/Manager/ApproveOrders";
import Profile from "../Page/DashBoard/Profile/Profile";
import PraivateRouter from "./PraivateRouter";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import About from "../Page/About";


const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayOuts,
    errorElement:<Eorr></Eorr>,
    children:[{
    index: true,
    Component:Home
    },{
path:'login',
Component:Login
    },{
      path:'register',
      Component:Register
    },{
      path:'allProduct',
      Component:AllProducts
    },{
      path:'products/:id',
      element:<ProductDetails></ProductDetails>
    // Component:ProductDetails
  },
    {
      path:'/booking/:id',
      element:<PraivateRouter><BookingForm></BookingForm></PraivateRouter>
      // Component:BookingForm
    },{
      path:'/about',
      Component:About
    }
    // {
    //   path:'/payment/:id',
    //   Component:Payment
    // }
  ]
  },
  {
    path:'/dashboard',
    element:<PraivateRouter><DashBoardLayOut></DashBoardLayOut></PraivateRouter>,
    // Component:DashBoardLayOut,
    children:[
      {
      index: true, // এটিই ডিফল্ট পেজ হিসেবে কাজ করবে
    Component:Profile
    },
    {
      path:'success',
      Component:PaymentSucess
    },{
      path:'cancel',
      Component:PaymentCancel
    },{
      path:'myOrders',
      element:<PraivateRouter><MyOrders></MyOrders></PraivateRouter>
      // Component:MyOrders
    },{
      path:'orderDetails/:id',
      // Component:OrderDetail
      element:<OrderDetail></OrderDetail>},{ 
      path:'manageusers',
      element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      // Component:ManageUsers
    },{
      path:'allproducts',
      element:<AdminRoute><Allproducts></Allproducts></AdminRoute>
//  Component:Allproducts
    },{
      path:'updateproduct/:id',
      Component:UpdateProduct
    },{
      path:'allorders',
      element:<AdminRoute><AllOrders></AllOrders></AdminRoute>
      // Component:AllOrders
    },{
      path:'addproduct',
      element:<ManagerRoute><AddProduct></AddProduct></ManagerRoute>
      // Component:AddProduct
    },{
      path:'manageproduct',
      element:<ManagerRoute><ManageProducts></ManageProducts></ManagerRoute>
      // Component:ManageProducts
    },{
      path:'pendingorders',
      element:<ManagerRoute><PendingOrders></PendingOrders></ManagerRoute>
      // Component:PendingOrders
    },{
      path:'approvedorders',
    element:<ManagerRoute><ApproveOrders></ApproveOrders></ManagerRoute>
      // Component:ApproveOrders
    }
    ,{
      path:'profile',
      Component:Profile
    }
  ]

  }
]);
export default router