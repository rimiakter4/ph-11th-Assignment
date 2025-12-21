
// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import Swal from "sweetalert2";
// import useAxios from "../../../Hooks/useAxios";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaEye, FaCheck, FaTimes, FaSearch, FaUndo } from "react-icons/fa";

// const AllOrders = () => {
//   const axiosSecure = useAxios();
//   const [status, setStatus] = useState("");
//   const [searchText, setSearchText] = useState("");

//   // Fetch all orders
//   const { data: orders = [], isLoading, refetch } = useQuery({
//     queryKey: ["all-orders", status, searchText],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/allorders`, {
//         params: { status, search: searchText }
//       });
//       return res.data;
//     },
//   });

//   // Status Update Logic
//   const handleStatusUpdate = async (id, newStatus) => {
//     const result = await Swal.fire({
//       title: "Confirm Change?",
//       text: `Update this order to ${newStatus}?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Update",
//       confirmButtonColor: "#4F46E5",
//       cancelButtonColor: "#d33",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosSecure.patch(`/orders/${id}`, { status: newStatus });
//         Swal.fire("Success!", `Order is now ${newStatus}`, "success");
//         refetch();
//       } catch (err) {
//         Swal.fire("Error!", "Failed to update", "error");
//       }
//     }
//   };

//   // Animation Variants
//   const rowVariants = {
//     hidden: { opacity: 0, x: -10 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
//     exit: { opacity: 0, x: 10, transition: { duration: 0.2 } },
//   };

//   if (isLoading) return (
//     <div className="flex justify-center items-center min-h-[400px]">
//       <span className="loading loading-spinner loading-lg text-blue-600"></span>
//     </div>
//   );

//   return (
//     <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
//           Admin: All Orders ({orders.length})
//         </h2>

//         {/* 🔍 Search & Filter Bar */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
//           <div className="relative w-full md:w-96">
//             <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
//               <FaSearch />
//             </span>
//             <input
//               type="text"
//               placeholder="Search by Email..."
//               className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-200"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center gap-3 w-full md:w-auto">
//             <span className="font-bold text-gray-600">Status:</span>
//             <select
//               className="select select-bordered w-full md:w-48 focus:outline-none border-gray-200"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option value="">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="Approved">Approved</option>
//               <option value="Rejected">Rejected</option>
//             </select>
//           </div>
//         </div>

//         {/* 📊 Orders Table */}
//         <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white">
//               <tr className="text-lg">
//                 <th className="px-6 py-4 text-left font-semibold">Order ID</th>
//                 <th className="px-6 py-4 text-left font-semibold">Product</th>
//                 <th className="px-6 py-4 text-left font-semibold">User Email</th>
//                 <th className="px-6 py-4 text-left font-semibold">Status</th>
//                 <th className="px-6 py-4 text-center font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               <AnimatePresence mode="popLayout">
//                 {orders.length > 0 ? (
//                   orders.map((order) => (
//                     <motion.tr
//                       key={order._id}
//                       variants={rowVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       layout
//                       className="hover:bg-blue-50 transition-colors"
//                     >
//                       <td className="px-6 py-4">
//                         <span className="font-mono text-xs text-blue-600 font-bold">#{order._id.slice(-6).toUpperCase()}</span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="font-bold text-gray-800">{order.productTitle}</div>
//                         <div className="text-xs text-gray-400 font-medium">Qty: {order.quantity || 1}</div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className="text-sm text-gray-600">{order.email}</span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
//                           order.orderStatus === "pending" ? "bg-yellow-100 text-yellow-700 border border-yellow-200" :
//                           order.orderStatus === "Approved" ? "bg-green-100 text-green-700 border border-green-200" :
//                           "bg-red-100 text-red-700 border border-red-200"
//                         }`}>
//                           {order.orderStatus || "pending"}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex justify-center gap-2">
//                           {/* View */}
//                           <Link
//                             to={`/dashboard/orderDetails/${order._id}`}
//                             className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition shadow-md"
//                             title="View Order"
//                           >
//                             <FaEye size={14} />
//                           </Link>

//                           {/* Approve */}
//                           {order.orderStatus !== "Approved" && (
//                             <button
//                               onClick={() => handleStatusUpdate(order._id, "Approved")}
//                               className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition shadow-md"
//                               title="Approve"
//                             >
//                               <FaCheck size={14} />
//                             </button>
//                           )}

//                           {/* Reject */}
//                           {order.orderStatus !== "Rejected" && (
//                             <button
//                               onClick={() => handleStatusUpdate(order._id, "Rejected")}
//                               className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-md"
//                               title="Reject"
//                             >
//                               <FaTimes size={14} />
//                             </button>
//                           )}

//                           {/* Reset to Pending */}
//                           {order.orderStatus !== "pending" && (
//                             <button
//                               onClick={() => handleStatusUpdate(order._id, "pending")}
//                               className="p-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition shadow-md"
//                               title="Reset to Pending"
//                             >
//                               <FaUndo size={12} />
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </motion.tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center py-20 text-gray-400 italic font-medium">
//                       No orders found matching your search.
//                     </td>
//                   </tr>
//                 )}
//               </AnimatePresence>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllOrders;

import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaCheck, FaTimes, FaSearch, FaUndo } from "react-icons/fa";

const AllOrders = () => {
  const axiosSecure = useAxios();
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["all-orders", status, debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allorders`, {
        params: { 
          status, 
          search: debouncedSearch 
        }
      });
      return res.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const handleStatusUpdate = async (id, newStatus) => {
    const result = await Swal.fire({
      title: "Confirm Change?",
      text: `Update this order to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/orders/${id}`, { status: newStatus });
        Swal.fire("Success!", `Order is now ${newStatus}`, "success");
        refetch();
      } catch (err) {
        Swal.fire("Error!", "Failed to update", "error");
      }
    }
  };

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
          Admin: All Orders ({orders.length})
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <FaSearch />
            </span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by Email or Product..."
              className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-200 shadow-sm"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="font-bold text-gray-600">Filter:</span>
            <select
              className="select select-bordered w-full md:w-48 focus:outline-none border-gray-200 shadow-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100 min-h-[300px]">
          {isLoading && !orders.length ? (
            <div className="flex justify-center p-20">
              <span className="loading loading-spinner text-blue-600"></span>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white">
                <tr className="text-lg">
                  <th className="px-6 py-4 text-left">Order ID</th>
                  <th className="px-6 py-4 text-left">Product</th>
                  <th className="px-6 py-4 text-left">User Email</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence mode="popLayout">
                  {orders.map((order) => (
                    <motion.tr
                      key={order._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      layout
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-blue-600 font-bold">
                        #{order._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800">{order.productTitle}</div>
                        <div className="text-xs text-gray-400">Qty: {order.quantity || 1}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          order.orderStatus === "pending" ? "bg-yellow-100 text-yellow-700" :
                          order.orderStatus === "Approved" ? "bg-green-100 text-green-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {order.orderStatus || "pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link to={`/dashboard/orderDetails/${order._id}`} className="p-2 rounded-lg bg-blue-500 text-white">
                            <FaEye size={14} />
                          </Link>
                          {order.orderStatus !== "Approved" && (
                            <button onClick={() => handleStatusUpdate(order._id, "Approved")} className="p-2 rounded-lg bg-green-500 text-white">
                              <FaCheck size={14} />
                            </button>
                          )}
                          {order.orderStatus !== "Rejected" && (
                            <button onClick={() => handleStatusUpdate(order._id, "Rejected")} className="p-2 rounded-lg bg-red-500 text-white">
                              <FaTimes size={14} />
                            </button>
                          )}
                          {order.orderStatus !== "pending" && (
                            <button onClick={() => handleStatusUpdate(order._id, "pending")} className="p-2 rounded-lg bg-amber-500 text-white">
                              <FaUndo size={12} />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {orders.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan="5" className="text-center py-20 text-gray-400">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;