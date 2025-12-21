
// import React, { useState, useEffect, useRef } from "react";
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
//   const [debouncedSearch, setDebouncedSearch] = useState("");
//   const inputRef = useRef(null);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchText);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchText]);

//   const { data: orders = [], isLoading, refetch } = useQuery({
//     queryKey: ["all-orders", status, debouncedSearch],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/allorders`, {
//         params: { 
//           status, 
//           search: debouncedSearch 
//         }
//       });
//       return res.data;
//     },
//     placeholderData: (previousData) => previousData,
//   });

//   const handleStatusUpdate = async (id, newStatus) => {
//     const result = await Swal.fire({
//       title: "Confirm Change?",
//       text: `Update this order to ${newStatus}?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Update",
//       confirmButtonColor: "#4F46E5",
//     });

//     if (result.isConfirmed) {
//       try {
//         // এখানে newStatus ছোট হাতের পাঠানো হচ্ছে ডাটাবেসের সাথে মিল রাখতে
//         await axiosSecure.patch(`/orders/${id}`, { status: newStatus.toLowerCase() });
//         Swal.fire("Success!", `Order is now ${newStatus}`, "success");
//         refetch();
//       } catch (err) {
//         Swal.fire("Error!", "Failed to update", "error");
//       }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 p-6 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
//           Admin: All Orders ({orders.length})
//         </h2>

//         {/* Search & Filter */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
//           <div className="relative w-full md:w-96">
//             <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
//               <FaSearch />
//             </span>
//             <input
//               ref={inputRef}
//               type="text"
//               placeholder="Search by Email or Product..."
//               className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-200 shadow-sm"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               autoFocus
//             />
//           </div>

//           <div className="flex items-center gap-3 w-full md:w-auto">
//             <span className="font-bold text-gray-600">Filter:</span>
//             <select
//               className="select select-bordered w-full md:w-48 focus:outline-none border-gray-200 shadow-sm"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option value="">All Status</option>
//               <option value="pending">Pending</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//             </select>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100 min-h-[300px]">
//           {isLoading && !orders.length ? (
//             <div className="flex justify-center p-20">
//               <span className="loading loading-spinner text-blue-600"></span>
//             </div>
//           ) : (
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-indigo-600 text-white">
//                 <tr className="text-sm">
//                   <th className="px-6 py-4 text-left font-bold uppercase">Order ID</th>
//                   <th className="px-6 py-4 text-left font-bold uppercase">Product</th>
//                   <th className="px-6 py-4 text-left font-bold uppercase">User Email</th>
//                   <th className="px-6 py-4 text-left font-bold uppercase">Status</th>
//                   <th className="px-6 py-4 text-center font-bold uppercase">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 <AnimatePresence mode="popLayout">
//                   {orders.map((order) => (
//                     <motion.tr
//                       key={order._id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       layout
//                       className="hover:bg-blue-50/50 transition-colors"
//                     >
//                       <td className="px-6 py-4 font-mono text-xs text-blue-600 font-bold">
//                         #{order._id.slice(-6).toUpperCase()}
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="font-bold text-gray-800">{order.productTitle}</div>
//                         <div className="text-xs text-gray-400 font-semibold uppercase">Qty: {order.quantity || 1}</div>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">{order.email}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${
//                           order.orderStatus === "approved" ? "bg-green-100 text-green-700 border-green-200" :
//                           order.orderStatus === "pending" ? "bg-amber-100 text-amber-700 border-amber-200" :
//                           "bg-red-100 text-red-700 border-red-200"
//                         }`}>
//                           {order.orderStatus}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex justify-center gap-2">
//                           <Link 
//                             to={`/dashboard/orderDetails/${order._id}`} 
//                             className="p-2 rounded-lg bg-blue-500 text-white hover:scale-110 transition-transform"
//                             title="View"
//                           >
//                             <FaEye size={14} />
//                           </Link>

//                           {/* Approve Button - শুধু Pending থাকলে দেখাবে */}
//                           {order.orderStatus === "pending" && (
//                             <button 
//                               onClick={() => handleStatusUpdate(order._id, "approved")} 
//                               className="p-2 rounded-lg bg-green-500 text-white hover:scale-110 transition-transform"
//                               title="Approve"
//                             >
//                               <FaCheck size={14} />
//                             </button>
//                           )}

//                           {/* Reject Button - যদি অলরেডি রিজেক্ট না থাকে */}
//                           {order.orderStatus !== "rejected" && (
//                             <button 
//                               onClick={() => handleStatusUpdate(order._id, "rejected")} 
//                               className="p-2 rounded-lg bg-red-500 text-white hover:scale-110 transition-transform"
//                               title="Reject"
//                             >
//                               <FaTimes size={14} />
//                             </button>
//                           )}

//                           {/* Reset/Undo Button - যদি পেন্ডিং না থাকে */}
//                           {order.orderStatus !== "pending" && (
//                             <button 
//                               onClick={() => handleStatusUpdate(order._id, "pending")} 
//                               className="p-2 rounded-lg bg-gray-400 text-white hover:scale-110 transition-transform"
//                               title="Set to Pending"
//                             >
//                               <FaUndo size={12} />
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//                 {orders.length === 0 && !isLoading && (
//                   <tr>
//                     <td colSpan="5" className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest">
//                       No orders found in the database.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           )}
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
        params: { status, search: debouncedSearch }
      });
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, newStatus) => {
    const result = await Swal.fire({
      title: "Confirm Change?",
      text: `Update this order to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      confirmButtonColor: "#4F46E5",
    });

    if (result.isConfirmed) {
      try {
        // ছোট হাতের অক্ষরে ডাটা পাঠানো হচ্ছে স্ট্যন্ডার্ড বজায় রাখতে
        await axiosSecure.patch(`/orders/${id}`, { status: newStatus.toLowerCase() });
        Swal.fire("Success!", `Order is now ${newStatus}`, "success");
        refetch();
      } catch (err) {
        Swal.fire("Error!", "Failed to update", "error");
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 p-6 min-h-screen">
      <div className="max-w-7xl bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 mx-auto">
        <h2 className="text-3xl font-extrabold text-blue-800 mb-8 uppercase tracking-tighter text-center">
          Admin Control: Order History ({orders.length})
        </h2>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search email or product..."
              className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-blue-400"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <select
            className="select select-bordered w-full md:w-48 font-bold"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-teal-400 to-indigo-500  text-white">
              <tr>
                <th className="py-5">Order ID</th>
                <th>Product & Qty</th>
                <th>User Email</th>
                <th>Current Status</th>
                <th className="text-center">Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                // স্ট্যাটাসকে ছোট হাতের করে চেক করা হচ্ছে যাতে রঙ মিস না হয়
                const currentStatus = order.orderStatus?.toLowerCase() || "pending";

                return (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="font-mono text-xs font-bold text-blue-600">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td>
                      <div className="font-bold text-gray-700">{order.productTitle}</div>
                      <div className="text-xs opacity-50">Quantity: {order.quantity || 1}</div>
                    </td>
                    <td className="text-sm text-gray-600 font-medium">{order.email}</td>
                    
                    {/* Status Color Logic Fix */}
                    <td>
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border shadow-sm ${
                        currentStatus === "approved" ? "bg-green-100 text-green-700 border-green-200" :
                        currentStatus === "pending" ? "bg-amber-100 text-amber-700 border-amber-200" :
                        "bg-red-100 text-red-700 border-red-200"
                      }`}>
                        {currentStatus}
                      </span>
                    </td>

                    <td className="flex justify-center gap-2 py-4">
                      <Link to={`/dashboard/orderDetails/${order._id}`} className="btn btn-square btn-sm btn-info text-white">
                        <FaEye size={14} />
                      </Link>

                      {/* Approve Button - শুধু Pending থাকলে কাজ করবে */}
                      {currentStatus === "pending" && (
                        <button onClick={() => handleStatusUpdate(order._id, "approved")} className="btn btn-square btn-sm btn-success text-white">
                          <FaCheck size={14} />
                        </button>
                      )}

                      {/* Reject Button - যদি অলরেডি রিজেক্ট না থাকে */}
                      {currentStatus !== "rejected" && (
                        <button onClick={() => handleStatusUpdate(order._id, "rejected")} className="btn btn-square btn-sm btn-error text-white">
                          <FaTimes size={14} />
                        </button>
                      )}

                      {/* Reset to Pending - যদি অলরেডি পেন্ডিং না থাকে */}
                      {currentStatus !== "pending" && (
                        <button onClick={() => handleStatusUpdate(order._id, "pending")} className="btn btn-square btn-sm btn-ghost bg-gray-200">
                          <FaUndo size={12} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="p-20 text-center text-gray-400 italic">No orders found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
// import React, { useState, useEffect } from "react";
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
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearch(searchText);
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [searchText]);

//   const { data: orders = [], isLoading, refetch } = useQuery({
//     queryKey: ["all-orders", status, debouncedSearch],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/allorders`, {
//         params: { status, search: debouncedSearch }
//       });
//       return res.data;
//     },
//   });

//   const handleStatusUpdate = async (id, newStatus) => {
//     const result = await Swal.fire({
//       title: "Confirm Change?",
//       text: `Update this order to ${newStatus}?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Update",
//       confirmButtonColor: "#4F46E5",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosSecure.patch(`/orders/${id}`, { status: newStatus.toLowerCase() });
//         Swal.fire("Success!", `Order is now ${newStatus}`, "success");
//         refetch();
//       } catch (err) {
//         Swal.fire("Error!", "Failed to update", "error");
//       }
//     }
//   };

//   if (isLoading) return <div className="p-20 text-center"><span className="loading loading-spinner loading-lg text-blue-600"></span></div>;

//   return (
//     <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-extrabold text-blue-800 mb-8 uppercase tracking-tighter text-center">
//           Admin Control: Order History ({orders.length})
//         </h2>

//         {/* Search & Filters */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm">
//           <div className="relative w-full md:w-96">
//             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search email or product..."
//               className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-blue-400"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </div>
//           <select
//             className="select select-bordered w-full md:w-48 font-bold"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="approved">Approved</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </div>

//         {/* Orders Table */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//           <table className="table w-full">
//             <thead className="bg-slate-800 text-white">
//               <tr className="text-center">
//                 <th className="py-5">Product Info</th>
//                 <th>Order ID</th>
//                 <th>User Email</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <AnimatePresence>
//                 {orders.map((order) => {
//                   const currentStatus = order.orderStatus?.toLowerCase() || "pending";
//                   return (
//                     <motion.tr 
//                       layout
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       key={order._id} 
//                       className="hover:bg-gray-50 transition-colors text-center"
//                     >
//                       {/* Product Image & Title Combined */}
//                       <td className="text-left px-6">
//                         <div className="flex items-center gap-4">
//                           <div className="avatar">
//                             <div className="mask mask-squircle w-12 h-12 border shadow-sm bg-gray-100">
//                               <img 
//                                 src={order.productImage || "https://via.placeholder.com/50"} 
//                                 alt="product" 
//                                 onError={(e) => e.target.src = "https://via.placeholder.com/100"}
//                               />
//                             </div>
//                           </div>
//                           <div>
//                             <div className="font-bold text-gray-800 line-clamp-1">{order.productTitle}</div>
//                             <div className="text-[10px] font-bold text-gray-400 uppercase">Qty: {order.quantity || 1}</div>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="font-mono text-[10px] font-bold text-blue-600">
//                         #{order._id.slice(-6).toUpperCase()}
//                       </td>

//                       <td className="text-sm text-gray-600 font-medium">{order.email}</td>
                      
//                       <td>
//                         <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border shadow-sm ${
//                           currentStatus === "approved" ? "bg-green-100 text-green-700 border-green-200" :
//                           currentStatus === "pending" ? "bg-amber-100 text-amber-700 border-amber-200" :
//                           "bg-red-100 text-red-700 border-red-200"
//                         }`}>
//                           {currentStatus}
//                         </span>
//                       </td>

//                       <td className="flex justify-center gap-2 py-6">
//                         <Link to={`/dashboard/orderDetails/${order._id}`} className="btn btn-square btn-xs btn-info text-white shadow-md">
//                           <FaEye size={12} />
//                         </Link>

//                         {currentStatus === "pending" && (
//                           <button onClick={() => handleStatusUpdate(order._id, "approved")} className="btn btn-square btn-xs btn-success text-white shadow-md">
//                             <FaCheck size={12} />
//                           </button>
//                         )}

//                         {currentStatus !== "rejected" && (
//                           <button onClick={() => handleStatusUpdate(order._id, "rejected")} className="btn btn-square btn-xs btn-error text-white shadow-md">
//                             <FaTimes size={12} />
//                           </button>
//                         )}

//                         {currentStatus !== "pending" && (
//                           <button onClick={() => handleStatusUpdate(order._id, "pending")} className="btn btn-square btn-xs btn-ghost bg-gray-200 shadow-sm">
//                             <FaUndo size={10} />
//                           </button>
//                         )}
//                       </td>
//                     </motion.tr>
//                   );
//                 })}
//               </AnimatePresence>
//             </tbody>
//           </table>
//           {orders.length === 0 && (
//             <div className="p-20 text-center text-gray-400 italic">No orders found.</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllOrders;