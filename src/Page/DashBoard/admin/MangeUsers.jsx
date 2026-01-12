
// import React from "react"; // useState, useEffect বাদ দেওয়া হয়েছে
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { motion, AnimatePresence } from "framer-motion";
// import useAxios from "../../../Hooks/useAxios";

// const ManageUsers = () => {
//   const axiosSecure = useAxios();

//   // ১. Fetch users (সরাসরি users ডাটা ব্যবহার করুন)
//   const {
//     data: users = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users");
//       return res.data;
//     },
//     retry: 1,
//   });

//   // ২. Role Update Function
//   const updateUserRole = (userId, newRole) => {
//     axiosSecure
//       .patch(`/users/${userId}`, { role: newRole })
//       .then(() => {
//         refetch(); // ডাটা আপডেট হলে রিফেচ করবে
//         Swal.fire("Updated!", `User is now ${newRole}.`, "success");
//       })
//       .catch((err) => {
//         console.error(err);
//         Swal.fire("Error", "Failed to update user.", "error");
//       });
//   };

//   const handleManageRole = (user) => {
//     Swal.fire({
//       title: `Update Role for ${user.name}`,
//       input: "select",
//       inputOptions: {
//         buyer: "Buyer",
//         manager: "Manager",
//         admin: "Admin",
//       },
//       inputValue: user.role === "suspended" ? "buyer" : user.role,
//       inputPlaceholder: "Select a role",
//       showCancelButton: true,
//       confirmButtonText: "Save Changes",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         updateUserRole(user._id, result.value);
//       }
//     });
//   };

//   const handleSuspend = (user) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `Do you want to suspend ${user.name}?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       confirmButtonText: "Yes, Suspend!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         updateUserRole(user._id, "suspended");
//       }
//     });
//   };

//   const rowVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -20 },
//   };

//   if (isLoading) return <p className="text-center mt-10 text-xl">Loading users...</p>;

//   return (
//     <div className="p-4 md:p-16 bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 min-h-screen">
//       <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">
//         Manage Users ({users.length})
//       </h2>

//       <div className="overflow-x-auto shadow-xl rounded-lg">
//         <table className="min-w-full divide-y divide-gray-300 bg-white">
//           <thead className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white">
//             <tr className="text-lg">
//               <th className="px-6 py-4 text-left">Name</th>
//               <th className="px-6 py-4 text-left">Email</th>
//               <th className="px-6 py-4 text-left">Role</th>
//               <th className="px-6 py-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             <AnimatePresence>
//               {users.map((user) => (
//                 <motion.tr
//                   key={user._id}
//                   variants={rowVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   className={user.role === "suspended" ? "bg-red-50 opacity-70" : "hover:bg-gray-50"}
//                 >
//                   <td className="px-6 py-4">{user.name}</td>
//                   <td className="px-6 py-4">{user.email}</td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase 
//                       ${user.role === "manager" ? "bg-green-100 text-green-700" : 
//                         user.role === "suspended" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 flex justify-center gap-3">
//                     <button onClick={() => handleManageRole(user)} className="bg-indigo-500 text-white px-3 py-1 rounded text-sm shadow">
//                       Update Role
//                     </button>
//                     {user.role === "suspended" ? (
//                       <button onClick={() => updateUserRole(user._id, "buyer")} className="bg-green-500 text-white px-3 py-1 rounded text-sm shadow">
//                         Activate
//                       </button>
//                     ) : (
//                       <button onClick={() => handleSuspend(user)} className="bg-red-500 text-white px-3 py-1 rounded text-sm shadow">
//                         Suspend
//                       </button>
//                     )}
//                   </td>
//                 </motion.tr>
//               ))}
//             </AnimatePresence>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../../Hooks/useAxios";

const ManageUsers = () => {
  const axiosSecure = useAxios();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
    retry: 1,
  });

  const updateUserRole = (userId, newRole) => {
    axiosSecure
      .patch(`/users/${userId}`, { role: newRole })
      .then(() => {
        refetch();
        Swal.fire("Updated!", `User is now ${newRole}.`, "success");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update user.", "error");
      });
  };

  const handleManageRole = (user) => {
    Swal.fire({
      title: `Update Role for ${user.name}`,
      input: "select",
      inputOptions: {
        buyer: "Buyer",
        manager: "Manager",
        admin: "Admin",
      },
      inputValue: user.role === "suspended" ? "buyer" : user.role,
      inputPlaceholder: "Select a role",
      showCancelButton: true,
      confirmButtonText: "Save Changes",
    }).then((result) => {
      if (result.isConfirmed) {
        updateUserRole(user._id, result.value);
      }
    });
  };

  const handleSuspend = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to suspend ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Suspend!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateUserRole(user._id, "suspended");
      }
    });
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <span className="loading loading-spinner loading-lg text-indigo-600"></span>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      
      {/* Header Section */}
      <h2 className="text-2xl md:text-4xl font-black text-center mb-8 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
        Manage Users ({users.length})
      </h2>

      {/* Table Container */}
      <div className="max-w-6xl mx-auto overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl bg-white dark:bg-gray-900">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-teal-500 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-sm md:text-base font-bold uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-sm md:text-base font-bold uppercase tracking-wider hidden sm:table-cell">Email</th>
                <th className="px-6 py-4 text-sm md:text-base font-bold uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-sm md:text-base font-bold uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <AnimatePresence>
                {users.map((user) => (
                  <motion.tr
                    key={user._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`${
                      user.role === "suspended" 
                        ? "bg-red-50/50 dark:bg-red-900/10 opacity-80" 
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    } transition-colors`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                      {user.name}
                      <div className="sm:hidden text-xs text-gray-500 mt-1">{user.email}</div>
                    </td>
                    
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase border ${
                        user.role === "manager" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800" : 
                        user.role === "suspended" ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800" : 
                        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap justify-center gap-2">
                        <button 
                          onClick={() => handleManageRole(user)} 
                          className="btn btn-xs md:btn-sm bg-indigo-500 hover:bg-indigo-600 border-none text-white shadow-sm"
                        >
                          Role
                        </button>
                        
                        {user.role === "suspended" ? (
                          <button 
                            onClick={() => updateUserRole(user._id, "buyer")} 
                            className="btn btn-xs md:btn-sm bg-green-500 hover:bg-green-600 border-none text-white shadow-sm"
                          >
                            Active
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleSuspend(user)} 
                            className="btn btn-xs md:btn-sm bg-red-500 hover:bg-red-600 border-none text-white shadow-sm"
                          >
                            Suspend
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      
      {users.length === 0 && (
        <div className="text-center mt-10 text-gray-500">No users found.</div>
      )}
    </div>
  );
};

export default ManageUsers;