// // 







// import React from 'react';
// import { Navigate, useLocation } from 'react-router';
// import useAuth from '../Hooks/useAuth';
// import useRole from '../Hooks/useRole';
// // import useRole from '../Hooks/useRole';

// const AdminRoute = ({children}) => {
//     const { user, loading } = useAuth(); // user অবজেক্টটি নিয়ে নিন
//     const [role, isRoleLoading] = useRole(); // আপনার হুক যদি অ্যারে রিটার্ন করে তবে [] ব্যবহার করুন
//     const location = useLocation();

//     // ১. যতক্ষণ ডাটা লোড হচ্ছে ততক্ষণ স্পিনার দেখান
//     if (loading || isRoleLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <span className="loading loading-spinner loading-xl text-primary"></span>
//             </div>
//         );
//     }

//     // ২. যদি ইউজার থাকে এবং তার রোল অ্যাডমিন হয়, তবেই পেজ দেখান
//     if (user && role === 'admin') {
//         return children;
//     }

//     // ৩. যদি অ্যাডমিন না হয়, তবে তাকে লগইন পেজে বা অন্য কোথাও পাঠিয়ে দিন
//     return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
// };

// export default AdminRoute;
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    // নিশ্চিত হোন এখানে { role, roleLoading } নামগুলো ঠিক আছে
    const { role, roleLoading } = useRole(); 
    const location = useLocation();

    // লোডিং অবস্থায় থামিয়ে রাখুন
    if (loading || roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-xl text-primary"></span>
            </div>
        );
    }

    // সঠিক রোল থাকলে কনটেন্ট দেখান
    if (user && role === 'admin') {
        return children;
    }

    // রোল না থাকলে হোম পেজ বা লগইন এ পাঠান
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;