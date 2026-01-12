
// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { FaMagnifyingGlass } from "react-icons/fa6";
// import { MdDelete } from "react-icons/md";
// import Swal from "sweetalert2";
// import { Link } from "react-router";
// import useAuth from "../../../Hooks/useAuth";
// import useAxios from "../../../Hooks/useAxios";
// import { motion, AnimatePresence } from "framer-motion";

// const MyOrder = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxios();

 
//   const [localOrders, setLocalOrders] = useState([]);

//   // Fetch orders
// //   const { data: orders = [],  isLoading } = useQuery({
// //     queryKey: ["myOrders", user?.email],
// //     enabled: !loading && !!user?.email,
// //     // queryFn: async () => {
// //     //   const res = await axiosSecure.get(`/orders?email=${user.email}`);
// //     //   return res.data;
// //     // },
// //     queryFn: async () => {
// //   // আলাদা করে ইমেইল পাঠানোর দরকার নেই, কারণ ব্যাকএন্ড টোকেন থেকে ইমেইল পায়
// //   const res = await axiosSecure.get('/orders'); 
// //   console.log("Response from server:", res.data); // ডাটা আসছে কি না কনসোলে দেখুন
// //   return res.data;
// // },
// //   });
// const { data: orders = [], isLoading } = useQuery({
//   queryKey: ["myOrders", user?.email],
//   enabled: !loading && !!user?.email,
//   queryFn: async () => {
//     // শুধু '/orders' দিন, কুয়েরি প্যারামিটার (?email=...) বাদ দিন
//     const res = await axiosSecure.get('/orders'); 
//     return res.data;
//   },
// });
//   // Sync fetched orders to local state
//   useEffect(() => {
//     setLocalOrders(orders);
//   }, [orders]);

//   // Delete order
//   const handleDeleteOrder = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This order will be permanently deleted!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure
//           .delete(`/orders/${id}`)
//           .then((res) => {
//             if (res.data.deletedCount > 0) {
//               setLocalOrders((prev) => prev.filter((o) => o._id !== id));
//               Swal.fire(
//                 "Deleted!",
//                 "Order has been removed successfully.",
//                 "success"
//               );
//             } else {
//               Swal.fire(
//                 "Not Allowed",
//                 "Order status changed. Cannot delete.",
//                 "error"
//               );
//             }
//           })
//           .catch(() => {
//             Swal.fire(
//               "Error",
//               "Something went wrong while deleting order.",
//               "error"
//             );
//           });
//       }
//     });
//   };

//   // Motion variants for animation
//   const rowVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
//   };

//   if (isLoading) {
//     return <p className="text-center mt-10">Loading orders...</p>;
//   }

//   return (
//     <div className="p-8 bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 p-6 md:p-16">
//       {/* <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
//         My Orders ( {orders.length} ) 
//       </h2> */}
//       <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
//   My Orders ( {localOrders.length} ) 
// </h2>


//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead className=" bg-gradient-to-r from-teal-400 to-indigo-500  text-white ">
//             <tr className="text-xl">
//               <th className="px-4 py-3 text-left">Order ID</th>
//               <th className="px-4 py-3 text-left">Product</th>
//               <th className="px-4 py-3 text-left">Quantity</th>
//               <th className="px-4 py-3 text-left">Status</th>
//               <th className="px-4 py-3 text-left">Payment</th>
//               <th className="px-4 py-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             <AnimatePresence>
//               {localOrders.length > 0 ? (
//                 localOrders.map((order) => (
//                   <motion.tr
//                     key={order._id}
//                     variants={rowVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                     className="hover:bg-blue-100 transition"
//                   >
//                     <td className="px-4 py-3">{order._id}</td>
//                     <td className="px-4 py-3">{order.productTitle}</td>
//                     <td className="px-4 py-3">{order.quantity || 1}</td>
//                     <td className="px-4 py-3">
//                       <span
//                         className={`px-2 py-1 rounded text-white font-semibold ${
//                           order.orderStatus === "delivered"
//                             ? "bg-green-500"
//                             : order.orderStatus === "shipped"
//                             ? "bg-blue-500"
//                             : "bg-yellow-500"
//                         }`}
//                       >
//                         {order.orderStatus || "pending"}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       {order.paymentStatus === "paid" ||
//                       order.paymentStatus === "cod" ? (
//                         <span className="px-2 py-1 rounded bg-green-300 text-xs font-semibold">
//                           {order.paymentStatus === "cod" ? "COD" : "Paid"}
//                         </span>
//                       ) : (
//                         <Link
//                           to={`/dashboard/payment/${order._id}`}
//                           className="px-2 py-1 rounded bg-yellow-300 text-xs font-semibold"
//                         >
//                           Pay
//                         </Link>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 flex gap-2">
//                       <Link
//                         to={`/dashboard/orderDetails/${order._id}`}
//                         className="px-2 py-1 rounded bg-blue-500 text-white"
//                       >
//                         <FaMagnifyingGlass />
//                       </Link>
//                       {order.orderStatus === "pending" && (
//                         <button
//                           onClick={() => handleDeleteOrder(order._id)}
//                           className="px-2 py-1 rounded bg-red-500 text-white"
//                         >
//                           <MdDelete />
//                         </button>
//                       )}
//                     </td>
//                   </motion.tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center py-6 text-gray-500">
//                     No orders found.
//                   </td>
//                 </tr>
//               )}
//             </AnimatePresence>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MyOrder;


// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { FaSearch, FaTrashAlt, FaBoxOpen, FaCheckCircle, FaCreditCard } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { Link } from "react-router";
// import useAuth from "../../../Hooks/useAuth";
// import useAxios from "../../../Hooks/useAxios";

// const MyOrder = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxios();
//   const [localOrders, setLocalOrders] = useState([]);

//   const { data: orders = [], isLoading } = useQuery({
//     queryKey: ["myOrders", user?.email],
//     enabled: !loading && !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get('/orders'); 
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     setLocalOrders(orders);
//   }, [orders]);

//   const handleDeleteOrder = (id) => {
//     const isDark = document.documentElement.classList.contains("dark");
//     Swal.fire({
//       title: "Cancel Order?",
//       text: "This action cannot be undone!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#64748b",
//       confirmButtonText: "Yes, Cancel",
//       background: isDark ? "#0f172a" : "#fff",
//       color: isDark ? "#fff" : "#000",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/orders/${id}`)
//           .then((res) => {
//             if (res.data.deletedCount > 0) {
//               setLocalOrders((prev) => prev.filter((o) => o._id !== id));
//               Swal.fire({
//                 title: "Removed!",
//                 icon: "success",
//                 timer: 1000,
//                 showConfirmButton: false,
//                 background: isDark ? "#0f172a" : "#fff",
//               });
//             } else {
//               Swal.fire("Error", "Order status updated, cannot delete.", "error");
//             }
//           });
//       }
//     });
//   };

//   if (isLoading) return (
//     <div className="flex justify-center items-center min-h-screen dark:bg-[#020617]">
//       <span className="loading loading-spinner loading-lg text-blue-500"></span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-[#020617] p-4 md:p-8 lg:p-12 transition-colors duration-500">
//       <div className="max-w-7xl mx-auto">
        
//         {/* --- Header Section --- */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
//           <div>
//             <h2 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
//               My Orders
//             </h2>
//             <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mt-1">
//               Total {localOrders.length} Items Purchased
//             </p>
//           </div>
//           <Link to="/allproduct" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20">
//             Order More
//           </Link>
//         </div>

//         {/* --- Desktop View (Table) --- */}
//         <div className="hidden md:block bg-white dark:bg-[#0f172a] rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
//           <table className="table w-full border-separate border-spacing-0">
//             <thead>
//               <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-blue-400">
//                 <th className="py-5 px-6 text-[11px] font-black uppercase tracking-wider">Order Details</th>
//                 <th className="py-5 text-[11px] font-black uppercase tracking-wider">Quantity</th>
//                 <th className="py-5 text-[11px] font-black uppercase tracking-wider">Status</th>
//                 <th className="py-5 text-[11px] font-black uppercase tracking-wider">Payment</th>
//                 <th className="py-5 text-right px-6 text-[11px] font-black uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//               {localOrders.map((order) => (
//                 <tr key={order._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
//                   <td className="py-4 px-6 border-t dark:border-slate-800">
//                     <div className="font-mono text-[10px] font-black text-blue-600 dark:text-blue-400">
//                       #{order._id.slice(-8).toUpperCase()}
//                     </div>
//                     <div className="font-bold text-slate-700 dark:text-slate-200 text-sm mt-1">{order.productTitle}</div>
//                   </td>
//                   <td className="py-4 border-t dark:border-slate-800 text-slate-600 dark:text-slate-400 font-black text-xs">
//                     {order.quantity || 1} Pcs
//                   </td>
//                   <td className="py-4 border-t dark:border-slate-800">
//                     <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ring-1 ring-inset ${
//                       order.orderStatus === "delivered" ? "bg-green-50 text-green-600 ring-green-200 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20" :
//                       order.orderStatus === "shipped" ? "bg-blue-50 text-blue-600 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20" :
//                       "bg-orange-50 text-orange-600 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:ring-orange-500/20"
//                     }`}>
//                       {order.orderStatus || "pending"}
//                     </span>
//                   </td>
//                   <td className="py-4 border-t dark:border-slate-800">
//                     {order.paymentStatus === "paid" || order.paymentStatus === "cod" ? (
//                       <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase">
//                         <FaCheckCircle size={12}/> {order.paymentStatus === "cod" ? "COD" : "Paid"}
//                       </div>
//                     ) : (
//                       <Link to={`/dashboard/payment/${order._id}`} className="flex items-center gap-2 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-black text-[9px] font-black uppercase rounded-lg transition-all">
//                         <FaCreditCard size={10}/> Pay Now
//                       </Link>
//                     )}
//                   </td>
//                   <td className="py-4 px-6 border-t dark:border-slate-800 text-right">
//                     <div className="flex justify-end gap-2">
//                       <Link to={`/dashboard/orderDetails/${order._id}`} className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
//                         <FaSearch size={12} />
//                       </Link>
//                       {order.orderStatus === "pending" && (
//                         <button onClick={() => handleDeleteOrder(order._id)} className="p-2.5 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
//                           <FaTrashAlt size={12} />
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* --- Mobile View (Cards) --- */}
//         <div className="md:hidden flex flex-col gap-4">
//           {localOrders.map((order) => (
//             <div key={order._id} className="bg-white dark:bg-[#0f172a] p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
//               <div className="flex justify-between items-start mb-3">
//                 <span className="font-mono font-black text-blue-600 text-[10px]">#{order._id.slice(-8).toUpperCase()}</span>
//                 <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
//                   order.orderStatus === "delivered" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
//                 }`}>
//                   {order.orderStatus || "pending"}
//                 </span>
//               </div>
//               <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase leading-tight">{order.productTitle}</h3>
//               <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
//                 <div>
//                    {order.paymentStatus === "paid" || order.paymentStatus === "cod" ? (
//                       <span className="text-green-600 dark:text-green-400 text-[10px] font-black uppercase">Paid</span>
//                    ) : (
//                       <Link to={`/dashboard/payment/${order._id}`} className="text-yellow-600 dark:text-yellow-400 text-[10px] font-black uppercase underline">Pay Now</Link>
//                    )}
//                 </div>
//                 <div className="flex gap-2">
//                   <Link to={`/dashboard/orderDetails/${order._id}`} className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl">
//                     <FaSearch size={14} />
//                   </Link>
//                   {order.orderStatus === "pending" && (
//                     <button onClick={() => handleDeleteOrder(order._id)} className="p-2.5 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl">
//                       <FaTrashAlt size={14} />
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* --- Empty State --- */}
//         {localOrders.length === 0 && (
//           <div className="text-center py-20 bg-white dark:bg-[#0f172a] rounded-[2.5rem] border border-dashed border-slate-300 dark:border-slate-800">
//             <FaBoxOpen className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={50} />
//             <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">You haven't ordered anything yet</p>
//             <Link to="/allproducts" className="inline-block mt-4 text-blue-600 font-black uppercase text-[10px] hover:underline">Go to Shop</Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyOrder;
// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { FaSearch, FaTrashAlt, FaBoxOpen, FaCheckCircle, FaCreditCard, FaChevronRight } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router";
// import useAuth from "../../../Hooks/useAuth";
// import useAxios from "../../../Hooks/useAxios";

// const MyOrder = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxios();
//   const [localOrders, setLocalOrders] = useState([]);

//   const { data: orders = [], isLoading } = useQuery({
//     queryKey: ["myOrders", user?.email],
//     enabled: !loading && !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get('/orders');
//       return res.data;
//     },
//   });

//   useEffect(() => {
//     setLocalOrders(orders);
//   }, [orders]);

//   const handleDeleteOrder = (id) => {
//     const isDark = document.documentElement.classList.contains("dark");
//     Swal.fire({
//       title: "Cancel Order?",
//       text: "This action cannot be undone!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       cancelButtonColor: "#64748b",
//       confirmButtonText: "Yes, Cancel",
//       background: isDark ? "#1e293b" : "#fff",
//       color: isDark ? "#fff" : "#000",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/orders/${id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             setLocalOrders((prev) => prev.filter((o) => o._id !== id));
//             Swal.fire({
//               title: "Removed!",
//               icon: "success",
//               timer: 1000,
//               showConfirmButton: false,
//               background: isDark ? "#1e293b" : "#fff",
//             });
//           } else {
//             Swal.fire("Error", "Order status updated, cannot delete.", "error");
//           }
//         });
//       }
//     });
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-h-screen dark:bg-[#0f172a]">
//         <span className="loading loading-spinner loading-lg text-teal-500"></span>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] p-3 md:p-8 transition-colors duration-500">
//       <div className="max-w-7xl mx-auto">
        
//         {/* --- Header Section --- */}
//         <div className="mb-10 text-center">
//           <h2 className="text-2xl md:text-4xl font-black mb-2 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent uppercase">
//             My Purchase History ({localOrders.length})
//           </h2>
//           <div className="flex justify-center mt-4">
//             <Link to="/allproduct" className="group flex items-center gap-2 bg-white dark:bg-[#1e293b] text-slate-700 dark:text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-teal-500/20 transition-all border border-slate-200 dark:border-slate-700">
//               Continue Shopping <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>
//         </div>

//         {/* --- Table Container --- */}
//         <div className="bg-white dark:bg-[#1e293b] rounded-[1.5rem] shadow-2xl overflow-hidden p-2 md:p-6">
//           <div className="hidden sm:block overflow-x-auto">
//             <table className="table w-full border-separate border-spacing-y-3">
//               <thead>
//                 <tr className="text-slate-400 uppercase text-[10px] font-black">
//                   <th className="py-4 pl-8">Order Details</th>
//                   <th>Quantity</th>
//                   <th>Status</th>
//                   <th>Payment</th>
//                   <th className="text-right pr-8">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <AnimatePresence mode="wait">
//                   {localOrders.map((order) => (
//                     <motion.tr 
//                       key={order._id} 
//                       initial={{ opacity: 0, y: 10 }} 
//                       animate={{ opacity: 1, y: 0 }} 
//                       className="group"
//                     >
//                       <td className="bg-slate-50/50 dark:bg-slate-800/30 rounded-l-[1.5rem] py-4 pl-8">
//                         <div>
//                           <p className="font-mono text-[10px] font-black text-teal-500">#{order._id.slice(-8).toUpperCase()}</p>
//                           <p className="font-extrabold text-slate-800 dark:text-slate-100 text-sm uppercase truncate max-w-[200px]">{order.productTitle}</p>
//                         </div>
//                       </td>
                      
//                       <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4 font-black text-slate-600 dark:text-slate-400">
//                          <span className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 px-3 py-1 rounded-lg text-[11px]">
//                             {order.quantity || 1} Pcs
//                          </span>
//                       </td>

//                       <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4">
//                         <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ring-1 ring-inset ${
//                           order.orderStatus === "delivered" ? "bg-green-50 text-green-600 ring-green-200 dark:bg-green-500/10 dark:text-green-400" :
//                           order.orderStatus === "shipped" ? "bg-blue-50 text-blue-600 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-400" :
//                           "bg-orange-50 text-orange-600 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-400"
//                         }`}>
//                           {order.orderStatus || "pending"}
//                         </span>
//                       </td>

//                       <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4">
//                         {order.paymentStatus === "paid" || order.paymentStatus === "cod" ? (
//                           <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase">
//                             <FaCheckCircle size={12}/> {order.paymentStatus === "cod" ? "COD" : "Paid"}
//                           </div>
//                         ) : (
//                           <Link to={`/dashboard/payment/${order._id}`} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white text-[9px] font-black uppercase rounded-lg shadow-md transition-all">
//                             <FaCreditCard size={10}/> Pay Now
//                           </Link>
//                         )}
//                       </td>

//                       <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4 pr-8 rounded-r-[1.5rem] text-right">
//                         <div className="flex justify-end gap-2">
//                           <Link to={`/dashboard/orderDetails/${order._id}`} className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
//                             <FaSearch size={14} />
//                           </Link>
//                           {order.orderStatus === "pending" && (
//                             <button onClick={() => handleDeleteOrder(order._id)} className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm">
//                               <FaTrashAlt size={14} />
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>

//           {/* --- Mobile Card View --- */}
//           <div className="sm:hidden flex flex-col gap-4 p-2">
//             {localOrders.map((order) => (
//               <div key={order._id} className="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-[1.5rem] border border-slate-100 dark:border-slate-700/50">
//                 <div className="flex justify-between items-start mb-3">
//                   <span className="font-mono font-black text-teal-500 text-[10px]">#{order._id.slice(-8).toUpperCase()}</span>
//                   <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
//                     order.orderStatus === "delivered" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
//                   }`}>
//                     {order.orderStatus || "pending"}
//                   </span>
//                 </div>
//                 <h3 className="font-extrabold text-slate-800 dark:text-white text-sm uppercase leading-tight mb-4">{order.productTitle}</h3>
                
//                 <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
//                   <div>
//                      {order.paymentStatus === "paid" || order.paymentStatus === "cod" ? (
//                         <span className="text-green-600 dark:text-green-400 text-[10px] font-black uppercase flex items-center gap-1"><FaCheckCircle/> Paid</span>
//                      ) : (
//                         <Link to={`/dashboard/payment/${order._id}`} className="text-orange-500 text-[10px] font-black uppercase underline decoration-2 underline-offset-4">Pay Now</Link>
//                      )}
//                   </div>
//                   <div className="flex gap-2">
//                     <Link to={`/dashboard/orderDetails/${order._id}`} className="p-3 bg-white dark:bg-slate-700 text-indigo-600 rounded-xl shadow-sm">
//                       <FaSearch size={14} />
//                     </Link>
//                     {order.orderStatus === "pending" && (
//                       <button onClick={() => handleDeleteOrder(order._id)} className="p-3 bg-white dark:bg-slate-700 text-red-500 rounded-xl shadow-sm">
//                         <FaTrashAlt size={14} />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* --- Empty State --- */}
//           {localOrders.length === 0 && (
//             <div className="text-center py-20">
//               <FaBoxOpen className="mx-auto text-slate-200 dark:text-slate-700 mb-4" size={60} />
//               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No orders found in your history</p>
//               <Link to="/allproduct" className="inline-block mt-6 px-8 py-3 bg-teal-500 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20">
//                 Start Shopping
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyOrder;
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaTrashAlt, FaBoxOpen, FaCheckCircle, FaCreditCard, FaChevronRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";

const MyOrder = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxios();
  const [localOrders, setLocalOrders] = useState([]);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/orders');
      return res.data;
    },
  });

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  const handleDeleteOrder = (id) => {
    const isDark = document.documentElement.classList.contains("dark");
    Swal.fire({
      title: "Cancel Order?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Cancel",
      background: isDark ? "#1e293b" : "#fff",
      color: isDark ? "#fff" : "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/orders/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setLocalOrders((prev) => prev.filter((o) => o._id !== id));
            Swal.fire({
              title: "Removed!",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
              background: isDark ? "#1e293b" : "#fff",
            });
          }
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-[#0f172a]">
        <span className="loading loading-spinner loading-lg text-teal-500"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] p-3 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-2 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent uppercase">
            My Orders History
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            Total {localOrders.length} products purchased
          </p>
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-[1.5rem] shadow-2xl overflow-hidden p-2 md:p-6">
          <div className="hidden sm:block overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-slate-400 uppercase text-[10px] font-black">
                  <th className="py-4 pl-8">Item Info</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th className="text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {localOrders.map((order) => {
                    // ইমেজ ডায়নামিকভাবে চেক করার লজিক
                    const orderImg = order.productImage || order.image || order.productImg || "https://i.ibb.co.com/mrg7P3X/image.png";

                    return (
                      <motion.tr 
                        key={order._id} 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="group"
                      >
                        {/* --- Product Image & Title --- */}
                        <td className="bg-slate-50/50 dark:bg-slate-800/30 rounded-l-[1.5rem] py-4 pl-8">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                             {/* <img
                      src={product.images?.[0] || "https://via.placeholder.com/400x300"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    /> */}
                            </div>
                            <div>
                              <p className="font-extrabold text-slate-800 dark:text-slate-100 text-sm uppercase leading-tight">
                                {order.productTitle}
                              </p>
                              <p className="text-[10px] text-teal-500 font-bold mt-1">
                                ID: #{order._id.slice(-6).toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </td>
                        
                        {/* --- Quantity --- */}
                        <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4 font-black">
                          <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-3 py-1 rounded-lg text-[11px]">
                            {order.quantity || 1} Pcs
                          </span>
                        </td>

                        {/* --- Status --- */}
                        <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ring-1 ring-inset ${
                            order.orderStatus === "delivered" ? "bg-green-50 text-green-600 ring-green-200 dark:bg-green-500/10 dark:text-green-400" :
                            order.orderStatus === "shipped" ? "bg-blue-50 text-blue-600 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-400" :
                            "bg-orange-50 text-orange-600 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-400"
                          }`}>
                            {order.orderStatus || "pending"}
                          </span>
                        </td>

                        {/* --- Payment --- */}
                        <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4">
                          {order.paymentStatus === "paid" || order.paymentStatus === "cod" ? (
                            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-[10px] font-black uppercase">
                              <FaCheckCircle size={12}/> {order.paymentStatus === "cod" ? "COD" : "Paid"}
                            </div>
                          ) : (
                            <Link to={`/dashboard/payment/${order._id}`} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[9px] font-black uppercase rounded-lg shadow-sm hover:scale-105 transition-all">
                              <FaCreditCard size={10}/> Pay Now
                            </Link>
                          )}
                        </td>

                        {/* --- Actions --- */}
                        <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4 pr-8 rounded-r-[1.5rem] text-right">
                          <div className="flex justify-end gap-2">
                            <Link to={`/dashboard/orderDetails/${order._id}`} className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                              <FaSearch size={14} />
                            </Link>
                            {order.orderStatus === "pending" && (
                              <button onClick={() => handleDeleteOrder(order._id)} className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                <FaTrashAlt size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* --- Mobile View --- */}
          <div className="sm:hidden flex flex-col gap-4 p-2">
            {localOrders.map((order) => (
               <div key={order._id} className="bg-slate-50/50 dark:bg-slate-800/30 p-4 rounded-[1.5rem] flex gap-4 border border-slate-100 dark:border-slate-800">
                  <img 
                    className="w-20 h-20 rounded-2xl object-cover shadow-md" 
                    src={order.productImage || order.image || "https://i.ibb.co.com/mrg7P3X/image.png"} 
                    alt="" 
                  />
                  <div className="flex-1">
                    <h3 className="font-extrabold text-slate-800 dark:text-white text-xs uppercase truncate w-40">{order.productTitle}</h3>
                    <div className="flex justify-between items-center mt-4">
                       <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded">Qty: {order.quantity || 1}</span>
                       <div className="flex gap-2">
                          <Link to={`/dashboard/orderDetails/${order._id}`} className="p-2 bg-white dark:bg-slate-700 rounded-lg"><FaSearch size={12}/></Link>
                          {order.orderStatus === "pending" && (
                            <button onClick={() => handleDeleteOrder(order._id)} className="p-2 bg-white dark:bg-slate-700 text-red-500 rounded-lg"><FaTrashAlt size={12}/></button>
                          )}
                       </div>
                    </div>
                  </div>
               </div>
            ))}
          </div>

          {/* --- Empty State --- */}
          {localOrders.length === 0 && (
            <div className="text-center py-20">
              <FaBoxOpen className="mx-auto text-slate-200 dark:text-slate-700 mb-4" size={60} />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No orders found</p>
              <Link to="/allproduct" className="mt-4 inline-block text-teal-500 font-black text-[10px] uppercase hover:underline">Go Shopping</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;