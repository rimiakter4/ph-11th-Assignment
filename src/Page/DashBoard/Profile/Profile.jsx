
// import React from "react";
// import { useNavigate } from "react-router";
// import Swal from "sweetalert2";
// import { FaUserCircle, FaEnvelope, FaShieldAlt, FaSignOutAlt, FaIdBadge } from "react-icons/fa";
// import useAuth from "../../../Hooks/useAuth";

// const Profile = () => {
//   // এখানে dbUser যোগ করুন, কারণ role ডাটাবেজে থাকে
//   const { user, dbUser, logout } = useAuth(); 
//   const navigate = useNavigate();

//   const handleLogOut = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out of your session!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout()
//           .then(() => {
//             Swal.fire("Logged Out!", "Successfully logged out.", "success");
//             navigate("/login");
//           })
//           .catch((error) => console.log(error));
//       }
//     });
//   };

//   return (
//     <div className="p-4 md:p-10 bg-slate-50 min-h-screen flex justify-center items-start">
//       <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
//         <div className="h-32 bg-gradient-to-r from-green-500 to-blue-600"></div>

//         <div className="px-8 pb-8">
//           <div className="relative -mt-16 mb-6 flex justify-center">
//             {user?.photoURL ? (
//               <img
//                 src={user.photoURL}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
//               />
//             ) : (
//               <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
//                 <FaUserCircle className="text-gray-400 text-7xl" />
//               </div>
//             )}
//           </div>

//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
//               {user?.displayName || "User Name"}
//             </h2>
//             {/* এখানে user.role এর বদলে dbUser.role ব্যবহার করুন */}
//             <span className="badge badge-success py-3 px-4 text-white font-bold mt-2">
//               <FaShieldAlt className="mr-2" /> {dbUser?.role || "User"}
//             </span>
//           </div>

//           <div className="space-y-4">
//             <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
//               <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
//                 <FaEnvelope size={20} />
//               </div>
//               <div>
//                 <p className="text-xs text-slate-400 font-bold uppercase">Email Address</p>
//                 <p className="text-slate-700 font-medium">{user?.email}</p>
//               </div>
//             </div>

//             <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
//               <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mr-4">
//                 <FaIdBadge size={20} />
//               </div>
//               <div>
//                 <p className="text-xs text-slate-400 font-bold uppercase">User ID</p>
//                 <p className="text-slate-700 font-mono text-sm">{user?.uid || "N/A"}</p>
//               </div>
//             </div>
//           </div>

//           <div className="mt-10 border-t pt-8">
//             <button
//               onClick={handleLogOut}
//               className="w-full btn btn-error bg-red-500 hover:bg-red-600 border-none text-white rounded-2xl h-14 text-lg font-bold shadow-lg shadow-red-100 transition-all active:scale-95"
//             >
//               <FaSignOutAlt /> Logout from Account
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
// import React from "react";
// import { useNavigate } from "react-router";
// import Swal from "sweetalert2";
// import { FaUserCircle, FaEnvelope, FaShieldAlt, FaSignOutAlt, FaIdBadge } from "react-icons/fa";
// import useAuth from "../../../Hooks/useAuth";

// const Profile = () => {
//   const { user, dbUser, logout } = useAuth(); 
//   const navigate = useNavigate();

//   const handleLogOut = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out of your session!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout()
//           .then(() => {
//             Swal.fire("Logged Out!", "Successfully logged out.", "success");
//             navigate("/login");
//           })
//           .catch((error) => console.log(error));
//       }
//     });
//   };

//   return (
//     <div className="p-4 md:p-10 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300 flex justify-center items-start">
//       <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-colors">
        
//         {/* Profile Header Background */}
//         <div className="h-32 bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-700 dark:to-blue-600"></div>

//         <div className="px-8 pb-8">
//           {/* User Image */}
//           <div className="relative -mt-16 mb-6 flex justify-center">
//             {user?.photoURL ? (
//               <img
//                 src={user.photoURL}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg object-cover"
//               />
//             ) : (
//               <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
//                 <FaUserCircle className="text-gray-400 dark:text-gray-600 text-7xl" />
//               </div>
//             )}
//           </div>

//           {/* User Info Section */}
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-black text-slate-800 dark:text-gray-100 uppercase tracking-tight">
//               {user?.displayName || "User Name"}
//             </h2>
//             <span className="badge bg-green-500 border-none py-4 px-4 text-white font-bold mt-2">
//               <FaShieldAlt className="mr-2" /> {dbUser?.role || "User"}
//             </span>
//           </div>

//           <div className="space-y-4">
//             {/* Email Field */}
//             <div className="flex items-center p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-100 dark:border-gray-800">
//               <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
//                 <FaEnvelope size={20} />
//               </div>
//               <div className="overflow-hidden">
//                 <p className="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase">Email Address</p>
//                 <p className="text-slate-700 dark:text-gray-300 font-medium truncate">{user?.email}</p>
//               </div>
//             </div>

//             {/* ID / Role Field */}
//             <div className="flex items-center p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-100 dark:border-gray-800">
//               <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
//                 <FaIdBadge size={20} />
//               </div>
//               <div className="overflow-hidden">
//                 <p className="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase">User ID</p>
//                 <p className="text-slate-700 dark:text-gray-300 font-mono text-sm truncate">{user?.uid || "N/A"}</p>
//               </div>
//             </div>
//           </div>

//           {/* Logout Button */}
//           <div className="mt-10 border-t dark:border-gray-800 pt-8">
//             <button
//               onClick={handleLogOut}
//               className="w-full btn bg-red-500 hover:bg-red-600 border-none text-white rounded-2xl h-14 text-lg font-bold shadow-lg shadow-red-100 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
//             >
//               <FaSignOutAlt /> Logout from Account
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
// import React from "react";
// import { useNavigate } from "react-router";
// import Swal from "sweetalert2";
// import { FaUserCircle, FaEnvelope, FaShieldAlt, FaSignOutAlt, FaIdBadge } from "react-icons/fa";
// import useAuth from "../../../Hooks/useAuth";

// const Profile = () => {
//   const { user, dbUser, logout } = useAuth(); 
//   const navigate = useNavigate();

//   const handleLogOut = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out of your session!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout()
//           .then(() => {
//             Swal.fire("Logged Out!", "Successfully logged out.", "success");
//             navigate("/login");
//           })
//           .catch((error) => console.log(error));
//       }
//     });
//   };

//   return (
//     <div className="p-4 md:p-10 bg-slate-50 dark:bg-gray-950 min-h-screen flex justify-center items-start transition-colors duration-300">
//       <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
        
//         {/* Profile Header Background (Original Colors) */}
//         <div className="h-32 bg-gradient-to-r from-green-500 to-blue-600"></div>

//         <div className="px-8 pb-8">
//           {/* User Image */}
//           <div className="relative -mt-16 mb-6 flex justify-center">
//             {user?.photoURL ? (
//               <img
//                 src={user.photoURL}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg object-cover"
//               />
//             ) : (
//               <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
//                 <FaUserCircle className="text-gray-400 text-7xl" />
//               </div>
//             )}
//           </div>

//           {/* User Info Section */}
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-black text-slate-800 dark:text-gray-100 uppercase tracking-tight">
//               {user?.displayName || "User Name"}
//             </h2>
//             <span className="badge badge-success py-3 px-4 text-white font-bold mt-2">
//               <FaShieldAlt className="mr-2" /> {dbUser?.role || "User"}
//             </span>
//           </div>

//           <div className="space-y-4">
//             {/* Email Field - Original blue preserved */}
//             <div className="flex items-center p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-100 dark:border-gray-800">
//               <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
//                 <FaEnvelope size={20} />
//               </div>
//               <div className="overflow-hidden">
//                 <p className="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase">Email Address</p>
//                 <p className="text-slate-700 dark:text-gray-300 font-medium truncate">{user?.email}</p>
//               </div>
//             </div>

//             {/* ID / Role Field - Original green preserved */}
//             <div className="flex items-center p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-100 dark:border-gray-800">
//               <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mr-4">
//                 <FaIdBadge size={20} />
//               </div>
//               <div className="overflow-hidden">
//                 <p className="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase">User ID</p>
//                 <p className="text-slate-700 dark:text-gray-300 font-mono text-sm truncate">{user?.uid || "N/A"}</p>
//               </div>
//             </div>
//           </div>

//           {/* Logout Button */}
//           <div className="mt-10 border-t dark:border-gray-800 pt-8">
//             <button
//               onClick={handleLogOut}
//               className="w-full btn btn-error bg-red-500 hover:bg-red-600 border-none text-white rounded-2xl h-14 text-lg font-bold shadow-lg shadow-red-100 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
//             >
//               <FaSignOutAlt /> Logout from Account
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaUserCircle, FaEnvelope, FaShieldAlt, FaSignOutAlt, FaIdBadge } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const Profile = () => {
  const { user, dbUser, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your session!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire("Logged Out!", "Successfully logged out.", "success");
            navigate("/login");
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <div className="p-4 md:p-10 bg-slate-50 dark:bg-gray-950 min-h-screen flex justify-center items-start transition-colors duration-300">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
        
        {/* Profile Header Background - এখানে আপনার দেওয়া গ্রেডিয়েন্ট কালার সেট করা হয়েছে */}
        <div className="h-32 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500"></div>

        <div className="px-8 pb-8">
          {/* User Image */}
          <div className="relative -mt-16 mb-6 flex justify-center">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <FaUserCircle className="text-gray-400 text-7xl" />
              </div>
            )}
          </div>

          {/* User Info Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {user?.displayName || "User Name"}
            </h2>
            <span className="badge badge-success py-3 px-4 text-white font-bold mt-2">
              <FaShieldAlt className="mr-2" /> {dbUser?.role || "User"}
            </span>
          </div>

          <div className="space-y-4">
            {/* Email Field */}
            <div className="flex items-center p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-100 dark:border-gray-800">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                <FaEnvelope size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase">Email Address</p>
                <p className="text-slate-700 dark:text-gray-300 font-medium truncate">{user?.email}</p>
              </div>
            </div>

            {/* ID / Role Field */}
            <div className="flex items-center p-4 bg-slate-50 dark:bg-gray-800/50 rounded-2xl border border-slate-100 dark:border-gray-800">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mr-4">
                <FaIdBadge size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs text-slate-400 dark:text-gray-500 font-bold uppercase">User ID</p>
                <p className="text-slate-700 dark:text-gray-300 font-mono text-sm truncate">{user?.uid || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-10 border-t dark:border-gray-800 pt-8">
            <button
              onClick={handleLogOut}
              className="w-full btn btn-error bg-red-500 hover:bg-red-600 border-none text-white rounded-2xl h-14 text-lg font-bold shadow-lg shadow-red-100 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <FaSignOutAlt /> Logout from Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;