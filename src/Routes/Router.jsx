import { createBrowserRouter } from "react-router";
import RootLayOuts from "../LayOuts/RootLayOuts";

import Eorr from "../Page/Eorr";
import Home from "../Page/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayOuts,
    errorElement:<Eorr></Eorr>,
    children:[{
    index: true,
    Component:Home
    },{
path:''
    }
  ]
  },
]);
export default router