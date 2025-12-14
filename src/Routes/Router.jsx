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
    }
  ]
  },
]);
export default router