
// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { motion, AnimatePresence } from "framer-motion";
// import useAxios from "../../../Hooks/useAxios";

// const ManageUsers = () => {
//   const axiosSecure = useAxios();
//   const [localUsers, setLocalUsers] = useState([]);

//   // Fetch users
//   const {
//     data: users = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users");
//       return res.data;
//     },
//     retry: 1,
//   });

//   useEffect(() => {
//     setLocalUsers(users);
//   }, [users]);

 
//   // const handleManageRole = (user) => {
//   //   Swal.fire({
//   //     title: `Update Role for ${user.name}`,
//   //     input: "select",
//   //     inputOptions: {
//   //       buyer: "Buyer",
//   //       manager: "Manager",
//   //     },
//   //     inputValue: user.role === "suspended" ? "buyer" : user.role, 
//   //     inputPlaceholder: "Select a role",
//   //     showCancelButton: true,
//   //     confirmButtonText: "Save Changes",
//   //   }).then((result) => {
//   //     if (result.isConfirmed) {
//   //       const newRole = result.value;
//   //       updateUserRole(user._id, newRole);
//   //     }
//   //   });
//   // };
// const handleManageRole = (user) => {
//   Swal.fire({
//     title: `Update Role for ${user.name}`,
//     input: "select",
//     inputOptions: {
//       buyer: "Buyer",
//       manager: "Manager",
//       admin: "Admin", // এই লাইনটি যোগ করলে অন্যকে অ্যাডমিন বানানো যাবে
//     },
//     inputValue: user.role === "suspended" ? "buyer" : user.role, 
//     inputPlaceholder: "Select a role",
//     showCancelButton: true,
//     confirmButtonText: "Save Changes",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       const newRole = result.value;
//       updateUserRole(user._id, newRole);
//     }
//   });
// };
 
//   const handleSuspend = (user) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `Do you want to suspend ${user.name}? They will lose access.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, Suspend!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         updateUserRole(user._id, "suspended");
//       }
//     });
//   };

  
//   const updateUserRole = (userId, newRole) => {
//     axiosSecure
//       .patch(`/users/${userId}`, { role: newRole })
//       .then(() => {
//         refetch();
//         Swal.fire("Updated!", `User is now ${newRole}.`, "success");
//       })
//       .catch((err) => {
//         console.error(err);
//         Swal.fire("Error", "Failed to update user.", "error");
//       });
//   };

//   const rowVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
//   };

//   if (isLoading) return <p className="text-center mt-10 text-xl">Loading users...</p>;

//   return (
//     <div className="p-4 md:p-16 bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 p-6 min-h-screen">
//       <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">
//         Manage Users ({localUsers.length})
//       </h2>

//       <div className="overflow-x-auto shadow-xl rounded-lg">
//         <table className="min-w-full divide-y divide-gray-300 bg-white">
//           <thead className=" bg-gradient-to-r from-teal-400 to-indigo-500  text-white">
//             <tr className="text-lg">
//               <th className="px-6 py-4 text-left font-semibold">Name</th>
//               <th className="px-6 py-4 text-left font-semibold">Email</th>
//               <th className="px-6 py-4 text-left font-semibold">Role</th>
//               <th className="px-6 py-4 text-center font-semibold">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             <AnimatePresence>
//               {localUsers.map((user) => (
//                 <motion.tr
//                   key={user._id}
//                   variants={rowVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   className={`${
//                     user.role === "suspended" ? "bg-red-50 opacity-70" : "hover:bg-gray-50"
//                   } transition`}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
//                   <td className="px-6 py-4">{user.email}</td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
//                         user.role === "manager"
//                           ? "bg-green-100 text-green-700"
//                           : user.role === "suspended"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-blue-100 text-blue-700"
//                       }`}
//                     >
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 flex justify-center gap-3">
//                     {/* Update Role Button */}
//                     <button
//                       onClick={() => handleManageRole(user)}
//                       className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-sm shadow transition active:scale-95"
//                     >
//                       Update Role
//                     </button>

//                     {/* Suspend/Activate Button */}
//                     {user.role === "suspended" ? (
//                       <button
//                         onClick={() => updateUserRole(user._id, "buyer")}
//                         className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm shadow transition active:scale-95"
//                       >
//                         Activate
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => handleSuspend(user)}
//                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow transition active:scale-95"
//                       >
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
import React from "react"; // useState, useEffect বাদ দেওয়া হয়েছে
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../../Hooks/useAxios";

const ManageUsers = () => {
  const axiosSecure = useAxios();

  // ১. Fetch users (সরাসরি users ডাটা ব্যবহার করুন)
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

  // ২. Role Update Function
  const updateUserRole = (userId, newRole) => {
    axiosSecure
      .patch(`/users/${userId}`, { role: newRole })
      .then(() => {
        refetch(); // ডাটা আপডেট হলে রিফেচ করবে
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (isLoading) return <p className="text-center mt-10 text-xl">Loading users...</p>;

  return (
    <div className="p-4 md:p-16 bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">
        Manage Users ({users.length})
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 bg-white">
          <thead className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white">
            <tr className="text-lg">
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence>
              {users.map((user) => (
                <motion.tr
                  key={user._id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={user.role === "suspended" ? "bg-red-50 opacity-70" : "hover:bg-gray-50"}
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase 
                      ${user.role === "manager" ? "bg-green-100 text-green-700" : 
                        user.role === "suspended" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <button onClick={() => handleManageRole(user)} className="bg-indigo-500 text-white px-3 py-1 rounded text-sm shadow">
                      Update Role
                    </button>
                    {user.role === "suspended" ? (
                      <button onClick={() => updateUserRole(user._id, "buyer")} className="bg-green-500 text-white px-3 py-1 rounded text-sm shadow">
                        Activate
                      </button>
                    ) : (
                      <button onClick={() => handleSuspend(user)} className="bg-red-500 text-white px-3 py-1 rounded text-sm shadow">
                        Suspend
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;