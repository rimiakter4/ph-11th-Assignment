// // import { useQuery } from '@tanstack/react-query';
// // import React from 'react';
// // import useAuth from './useAuth';
// // import useAxios from './useAxios';

// // const useRole = () => {
// //     const{ user }=useAuth()
// //     const axiosSecure=useAxios()
// //     const {isLoading :roleLoading,data : role='user'}=useQuery({
// //         queryKey:['user-role',user?.email],
// //         queryFn:async()=>{
// //             const result =await axiosSecure.get(`/user/${user.email}/role`)
// //             return result.data
// //         }
// //     })
// //    return{roleLoading,role}
// // };

// // export default useRole;
// import React from 'react';
// import { Navigate, useLocation } from 'react-router';
// import useAuth from '../Hooks/useAuth';
// import useRole from '../Hooks/useRole';

// const AdminRoute = ({ children }) => {
//     const { user, loading } = useAuth();
//     // এখানে ভুল ছিল: [] এর বদলে {} হবে এবং নামগুলো useRole এর সাথে মিলতে হবে
//     const { role, roleLoading } = useRole(); 
//     const location = useLocation();

//     // ১. লোডিং চেক
//     if (loading || roleLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <span className="loading loading-spinner loading-xl text-primary"></span>
//             </div>
//         );
//     }

//     // ২. অ্যাডমিন চেক
//     if (user && role === 'admin') {
//         return children;
//     }

//     // ৩. রিডাইরেক্ট
//     return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
// };

// export default AdminRoute;
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxios();

    const { isLoading: roleLoading, data: role = 'user' } = useQuery({
        // queryKey তে loading এবং user?.email দুটোই রাখুন
        queryKey: ['user-role', user?.email],
        // ইউজার লোড না হওয়া পর্যন্ত কুয়েরি চলবে না
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            const result = await axiosSecure.get(`/user/${user?.email}/role`);
            // সার্ভার থেকে যদি { role: "admin" } আসে তবে result.data.role রিটার্ন করুন
            return result.data.role; 
        }
    });

    return { roleLoading, role };
};

export default useRole;