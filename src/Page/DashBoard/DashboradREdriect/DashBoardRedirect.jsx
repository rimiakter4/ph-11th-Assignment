// import { Navigate } from "react-router";
// import useAuth from "../../../Hooks/useAuth";
// import useRole from "../../../Hooks/useRole";
// // import useAdmin from "../../../Hooks/useAdmin"; 
// // import useAuth from "../../../Hooks/useAuth";

// const DashBoardRedirect = () => {
//     const { user, loading } = useAuth();
//     const [isAdmin, isAdminLoading] = useRole();

//     if (loading || isAdminLoading) {
//         return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>;
//     }

//     // Jodi Admin hoy, tobe sorasori Admin Home (Charts/Stats) e jabe
//     if (user && isAdmin) {
//         return <Navigate to="/dashboard/admin-home" replace />;
//     }

//     // Jodi Manager ba Buyer hoy, tobe Profile ba onno kono page-e jabe
//     return <Navigate to="/dashboard/profile" replace />;
// };

// export default DashBoardRedirect;
import { Navigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const DashBoardRedirect = () => {
    const { user, loading } = useAuth();
    
    // গুরুত্বপূর্ণ ফিক্স: এখানে [] এর বদলে {} ব্যবহার করতে হবে
    // কারণ আপনার হুক অবজেক্ট রিটার্ন করে
    const { role, roleLoading } = useRole(); 

    if (loading || roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    // ইউজার যদি অ্যাডমিন হয় তবে তাকে অ্যাডমিন হোমে পাঠান
    if (user && role === 'admin') {
        return <Navigate to="/dashboard/admin-home" replace />;
    }

    // ইউজার যদি অ্যাডমিন না হয় (ম্যানেজার বা বায়ার), তবে প্রোফাইলে পাঠান
    return <Navigate to="/dashboard/profile" replace />;
};

export default DashBoardRedirect;