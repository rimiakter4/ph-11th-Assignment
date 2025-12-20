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
      
    Component:ProductDetails},{
      path:'/booking/:id',
      Component:BookingForm
    },
    // {
    //   path:'/payment/:id',
    //   Component:Payment
    // }
  ]
  },
  {
    path:'/dashboard',
    Component:DashBoardLayOut,
    children:[
    {
      path:'success',
      Component:PaymentSucess
    },{
      path:'cancel',
      Component:PaymentCancel
    },{
      path:'myOrders',
      Component:MyOrders
    },{
      path:'orderDetails/:id',
      Component:OrderDetail
    },{
      path:'manageusers',
      Component:ManageUsers
    },{
      path:'allproducts',
 Component:Allproducts
    },{
      path:'updateproduct/:id',
      Component:UpdateProduct
    }
  ]

  }
]);
export default router