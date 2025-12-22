// import React from 'react';
// import useAuth from '../Hooks/useAuth';
// import useRole from '../Hooks/useRole';

// const ManagerRoute = ({children}) => {
//      const{loading}=useAuth()
//     const {role,roleLoding}=useRole()
//     if(loading||roleLoding){
//         return <span className="loading loading-spinner loading-xl"></span>

//     }
//     if(role !==''){
//         return <span>this is nort function</span>
//     }
//     return children
   
// };

// export default ManagerRoute;
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const ManagerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole(); 
    const location = useLocation();

    // ১. লোডিং অবস্থা চেক (রিফ্রেশ দিলে এটি ইউজারকে বের হয়ে যাওয়া থেকে আটকাবে)
    if (loading || roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-xl text-secondary"></span>
            </div>
        );
    }

    // ২. শুধুমাত্র ম্যানেজার হলে কনটেন্ট দেখাবে
    if (user && role === 'manager') {
        return children;
    }

    // ৩. ম্যানেজার না হলে তাকে হোম পেজে পাঠিয়ে দিবে
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default ManagerRoute;