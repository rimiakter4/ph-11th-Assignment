// import React, { useContext } from "react";
// import { Navigate, useLocation } from "react-router";
// import { Authcontext } from "./AuthProvider";


// const PrivateRouter = ({ children }) => {
//   const { user, loading } = useContext(Authcontext);
//   const location = useLocation();

//   if (loading) {
//     return <div className="text-center mt-10 text-xl font-semibold">Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default PrivateRouter;
import React from 'react';
import useAuth from '../Hooks/useaUTH.JSX';
import { Navigate, useLocation } from 'react-router';

const PraivateRouter = ({children}) => {
    const{user,loading}=useAuth()
    const location=useLocation()
    // const navigate=useNavigate()
    if(loading){
        return <span className="loading loading-spinner loading-xl"></span>

    }
    if(!user){
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
    return children;
};

export default PraivateRouter;