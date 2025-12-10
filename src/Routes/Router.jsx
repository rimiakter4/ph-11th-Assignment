import { createBrowserRouter } from "react-router";
import RootLayOuts from "../LayOuts/RootLayOuts";

import Eorr from "../Page/Eorr";
import Home from "../Page/Home/Home";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";

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
    }
  ]
  },
]);
export default router