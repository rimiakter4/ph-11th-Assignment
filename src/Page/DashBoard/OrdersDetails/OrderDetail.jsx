// src/Pages/Dashboard/OrderDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router";
// import useAxios from "../../../Hooks/useAxios";
// import { motion } from "framer-motion";
// import { FaArrowLeft } from "react-icons/fa6";

// export default function OrderDetail() {
//   const { id } = useParams();
//   const axiosSecure = useAxios();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     axiosSecure.get(`/orders/${id}`).then((res) => {
//       setOrder(res.data);
//     });
//   }, [id]);

//   if (!order) return <p className="text-center mt-10">Loading order details...</p>;

//   const steps = ["pending", "shipped", "delivered"];
//   const currentIndex = steps.indexOf(order.orderStatus?.toLowerCase()) >= 0 
//                        ? steps.indexOf(order.orderStatus.toLowerCase()) 
//                        : 0;

//   return (
//     <div className="p-10 max-w-3xl mx-auto">
//       <Link to="/dashboard/myOrders" className="flex items-center mb-6 text-indigo-500  hover:underline">
//         <FaArrowLeft className="mr-2" /> Back to My Orders
//       </Link>

//       <h2 className=" text-3xl font-bold mb-6 text-center text-indigo-700 ">Order Details</h2>

//       {/* Order Info */}
//       <div className="bg-white bg-gradient-to-r from-teal-400 to-indigo-500 text-white shadow-lg rounded-xl p-6 mb-8">
//         <p><strong>Order ID:</strong> {order._id}</p>
//         <p><strong>Product:</strong> {order.productTitle}</p>
//         <p><strong>Quantity:</strong> {order.quantity || 1}</p>
//         <p><strong>Price:</strong> ${order.orderPrice || order.price * (order.quantity || 1)}</p>
//         <p><strong>Payment Status:</strong> {order.paymentStatus === "cod" ? "COD" : order.paymentStatus}</p>
//         <p><strong>Order Status:</strong> {order.orderStatus}</p>
//       </div>

//       {/* Tracking Timeline */}
//       <h3 className="text-xl font-semibold mb-4 text-indigo-700">Tracking Timeline</h3>
//       <div className="relative">
//         <div className="absolute left-5 top-0 w-1 bg-gray-300 h-full"></div>
//         {steps.map((step, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.2 }}
//             className="flex items-center mb-8 relative"
//           >
//             <div
//               className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
//                 index <= currentIndex ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
//               }`}
//             >
//               {index + 1}
//             </div>
//             <div className="ml-6">
//               <p className={`text-lg font-semibold ${index <= currentIndex ? "text-green-600" : "text-gray-500"}`}>
//                 {step.charAt(0).toUpperCase() + step.slice(1)}
//               </p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
// import { useParams } from "react-router";

// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import useAxios from "../../../Hooks/useAxios";
// import { FaBox, FaUser, FaCreditCard, FaMapMarkerAlt } from "react-icons/fa";

// export default function OrderDetails() {
//   const { id } = useParams();
//   const axiosSecure = useAxios();

//   const { data: order, isLoading } = useQuery({
//     queryKey: ["order", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/orders/${id}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <div className="text-center mt-20 loading loading-spinner loading-lg"></div>;

//   const steps = ["Order Placed", "Order Approved"];
//   const currentIndex = order?.orderStatus === "Approved" ? 1 : 0;

//   return (
//     <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-3xl font-bold mb-8 text-gray-800">Order Tracking</h2>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* 🚩 Left Column: Tracking Timeline */}
//           <div className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
//             <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
//               <FaBox className="text-primary" /> Progress
//             </h3>
            
//             <div className="relative ml-2">
//               {/* Vertical Line */}
//               <div className="absolute left-5 top-0 w-1 bg-gray-200 h-24"></div>

//               {steps.map((step, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.2 }}
//                   className="flex items-center mb-12 relative"
//                 >
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-sm transition-colors duration-500 ${
//                     index <= currentIndex ? "bg-green-500 text-white" : "bg-gray-300 text-gray-500"
//                   }`}>
//                     {index <= currentIndex ? "✓" : index + 1}
//                   </div>
//                   <div className="ml-6">
//                     <p className={`font-bold ${index <= currentIndex ? "text-green-600" : "text-gray-400"}`}>
//                       {step}
//                     </p>
//                     <p className="text-xs text-gray-400">
//                       {index === 0 ? "Confirmed" : (order?.orderStatus === "Approved" ? "Done" : "Pending")}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}

//               {order?.orderStatus === "Rejected" && (
//                 <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm">
//                   <strong>Order Rejected:</strong> This order has been cancelled.
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* 📝 Right Column: Order Info Cards */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Customer & Product Card */}
//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//               <div className="flex justify-between items-start border-b pb-4 mb-4">
//                 <div>
//                   <p className="text-xs text-gray-400 uppercase font-bold">Order ID</p>
//                   <p className="font-mono text-sm">#{order?._id}</p>
//                 </div>
//                 <div className={`badge ${order?.orderStatus === "Approved" ? "badge-success" : "badge-warning"} text-white p-3 font-bold`}>
//                   {order?.orderStatus}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="flex items-center gap-2 font-bold mb-3 text-gray-700">
//                     <FaUser className="text-blue-500" /> Customer Info
//                   </h4>
//                   <p className="text-sm"><strong>Email:</strong> {order?.email}</p>
//                   <p className="text-sm"><strong>Date:</strong> {new Date(order?.createdAt).toLocaleString()}</p>
//                 </div>
//                 <div>
//                   <h4 className="flex items-center gap-2 font-bold mb-3 text-gray-700">
//                     <FaBox className="text-orange-500" /> Product Info
//                   </h4>
//                   <p className="text-sm font-bold text-primary">{order?.productTitle}</p>
//                   <p className="text-sm"><strong>Quantity:</strong> {order?.quantity}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Payment & Shipping Card */}
//             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="flex items-center gap-2 font-bold mb-3 text-gray-700">
//                     <FaCreditCard className="text-purple-500" /> Payment Status
//                   </h4>
//                   <p className={`text-sm font-bold ${order?.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-500'}`}>
//                     {order?.paymentStatus?.toUpperCase()}
//                   </p>
//                   {order?.transactionId && (
//                     <p className="text-xs bg-gray-100 p-2 mt-2 rounded font-mono">
//                       TXN: {order.transactionId}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <h4 className="flex items-center gap-2 font-bold mb-3 text-gray-700">
//                     <FaMapMarkerAlt className="text-red-500" /> Shipping Detail
//                   </h4>
//                   <p className="text-sm text-gray-500 italic">Shipping info would appear here based on your database schema.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";

// import { useParams, Link } from "react-router";
// import useAxios from "../../../Hooks/useAxios";
// import { motion } from "framer-motion";
// import { FaArrowLeft } from "react-icons/fa6";

// export default function OrderDetail() {
//   const { id } = useParams();
//   const axiosSecure = useAxios();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     axiosSecure.get(`/orders/${id}`).then((res) => {
//       setOrder(res.data);
//     });
//   }, [id]);

//   if (!order) return <p className="text-center mt-10">Loading order details...</p>;

//   // আপনার বর্তমান অ্যাডমিন লজিক অনুযায়ী ২ টি ধাপ
//   const steps = ["pending", "Approved"];
  
//   // currentIndex বের করার লজিক (পেন্ডিং হলে ০, অ্যাপ্রুভড হলে ১)
//   const currentIndex = order.orderStatus === "Approved" ? 1 : 0;

//   return (
//     <div className="p-4 md:p-10 max-w-3xl mx-auto">
//       <Link to="/dashboard/my-orders" className="flex items-center mb-6 text-indigo-500 hover:underline">
//         <FaArrowLeft className="mr-2" /> Back to My Orders
//       </Link>

//       <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Order Details</h2>

//       {/* 💳 Order Info Card (Gradient Style) */}
//       <div className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white shadow-lg rounded-xl p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <p><strong>Order ID : </strong> <span className="font-mono text-sm">#{order._id}</span></p>
//             <p><strong>Product : </strong> {order.productTitle}</p>
//             <p><strong>Quantity : </strong> {order.quantity || 1}</p>
//           </div>
//           <div>
//             <p><strong>Payment : </strong> {order.paymentStatus?.toUpperCase()}</p>
//             <p><strong>Total Price : </strong> ${order.orderPrice || order.price * (order.quantity || 1)}</p>
//             <p><strong>Current Status : </strong> <span className="capitalize">{order.orderStatus}</span></p>
//           </div>
//         </div>
//       </div>

//       {/* 🚀 Tracking Timeline */}
//       <h3 className="text-xl font-semibold mb-6 text-indigo-700">Tracking History</h3>
      
//       <div className="relative ml-4">
//         {/* লাইনটি শুধু ২ ধাপের জন্য হাইট কমানো হয়েছে */}
//         <div className="absolute left-5 top-0 w-1 bg-gray-300 h-24"></div>
        
//         {steps.map((step, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.2 }}
//             className="flex items-center mb-12 relative"
//           >
//             <div
//               className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold transition-all duration-500 ${
//                 index <= currentIndex ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
//               }`}
//             >
//               {index <= currentIndex ? "✓" : index + 1}
//             </div>
            
//             <div className="ml-6">
//               <p className={`text-lg font-bold ${index <= currentIndex ? "text-green-600" : "text-gray-500"}`}>
//                 {step === "pending" ? "Order Placed" : "Order Confirmed"}
//               </p>
//               <p className="text-xs text-gray-400">
//                 {index === 0 ? "We have received your order" : 
//                  (order.orderStatus === "Approved" ? "Admin has approved your order" : "Waiting for approval")}
//               </p>
//             </div>
//           </motion.div>
//         ))}

//         {/* ❌ Rejection Message (যদি স্ট্যাটাস Rejected হয়) */}
//         {order.orderStatus === "Rejected" && (
//           <motion.div 
//             initial={{ scale: 0.8 }} 
//             animate={{ scale: 1 }}
//             className="p-4 bg-red-100 text-red-700 rounded-lg border-l-4 border-red-500 ml-12"
//           >
//             <p className="font-bold uppercase text-sm">Order Cancelled</p>
//             <p className="text-xs">This order has been rejected by the administrator.</p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router";
// import useAxios from "../../../Hooks/useAxios";
// import { motion } from "framer-motion";
// import { FaArrowLeft } from "react-icons/fa6";

// export default function OrderDetail() {
//   const { id } = useParams();
//   const axiosSecure = useAxios();
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     axiosSecure.get(`/orders/${id}`).then((res) => {
//       setOrder(res.data);
//     });
//   }, [id]);

//   if (!order) return <p className="text-center mt-10">Loading order details...</p>;

//   // Buyer-friendly tracking steps
//   const steps = [
//     { step: "Order Placed", key: "pending" },
//     { step: "Cutting Completed", key: "cutting" },
//     { step: "Sewing Started", key: "sewing" },
//     { step: "Finishing", key: "finishing" },
//     { step: "QC Checked", key: "qc" },
//     { step: "Packed", key: "packed" },
//     { step: "Shipped / Out for Delivery", key: "shipped" },
//     { step: "Delivered", key: "delivered" },
//   ];

//   // Current step index based on order.tracking length
//   const currentIndex = order.tracking ? order.tracking.length - 1 : 0;

//   return (
//     <div className="p-4 md:p-10 max-w-3xl mx-auto">
//       <Link to="/dashboard/my-orders" className="flex items-center mb-6 text-indigo-500 hover:underline">
//         <FaArrowLeft className="mr-2" /> Back to My Orders
//       </Link>

//       <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Order Details</h2>

//       {/* Order Info Card */}
//       <div className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white shadow-lg rounded-xl p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <p><strong>Order ID : </strong> <span className="font-mono text-sm">#{order._id}</span></p>
//             <p><strong>Product : </strong> {order.productTitle}</p>
//             <p><strong>Quantity : </strong> {order.quantity || 1}</p>
//           </div>
//           <div>
//             <p><strong>Payment : </strong> {order.paymentStatus?.toUpperCase()}</p>
//             <p><strong>Total Price : </strong> ${order.orderPrice || order.price * (order.quantity || 1)}</p>
//             <p><strong>Current Status : </strong> <span className="capitalize">{order.orderStatus}</span></p>
//           </div>
//         </div>
//       </div>

//       {/* Tracking Timeline */}
//       <h3 className="text-xl font-semibold mb-6 text-indigo-700">Tracking History</h3>
//       <div className="relative ml-4">
//         <div className="absolute left-5 top-0 w-1 bg-gray-300 h-full"></div>

//         {steps.map((step, index) => {
//           const completed = index <= currentIndex;
//           return (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className="flex items-center mb-8 relative"
//             >
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold transition-all duration-500 ${
//                   completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
//                 }`}
//               >
//                 {completed ? "✓" : index + 1}
//               </div>

//               <div className="ml-6">
//                 <p className={`text-lg font-bold ${completed ? "text-green-600" : "text-gray-500"}`}>
//                   {step.step}
//                 </p>
//                 {order.tracking && order.tracking[index]?.note && (
//                   <p className="text-xs text-gray-400">{order.tracking[index].note}</p>
//                 )}
//               </div>
//             </motion.div>
//           );
//         })}

//         {/* Rejected orders */}
//         {order.orderStatus === "Rejected" && (
//           <motion.div
//             initial={{ scale: 0.8 }}
//             animate={{ scale: 1 }}
//             className="p-4 bg-red-100 text-red-700 rounded-lg border-l-4 border-red-500 ml-12"
//           >
//             <p className="font-bold uppercase text-sm">Order Cancelled</p>
//             <p className="text-xs">This order has been rejected by the administrator.</p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }
// import React from "react";

// import { useParams, Link } from "react-router";
// import useAxios from "../../../Hooks/useAxios";
// import { motion } from "framer-motion";
// import { FaArrowLeft } from "react-icons/fa6";
// import { useQuery } from "@tanstack/react-query";

// export default function OrderDetail() {
//   const { id } = useParams();
//   const axiosSecure = useAxios();

//   // React Query fetch + auto refetch
//   const { data: order, isLoading } = useQuery(
//     ["order", id],
//     () => axiosSecure.get(`/orders/${id}`).then((res) => res.data),
//     {
//       refetchInterval: 5000, // প্রতি ৫ সেকেন্ডে refresh
//     }
//   );

//   if (isLoading) return <p className="text-center mt-10">Loading order details...</p>;
//   if (!order) return <p className="text-center mt-10">Order not found.</p>;

//   // Buyer-friendly tracking steps
//   const steps = [
//     { step: "Order Placed", key: "pending" },
//     { step: "Cutting Completed", key: "cutting" },
//     { step: "Sewing Started", key: "sewing" },
//     { step: "Finishing", key: "finishing" },
//     { step: "QC Checked", key: "qc" },
//     { step: "Packed", key: "packed" },
//     { step: "Shipped / Out for Delivery", key: "shipped" },
//     { step: "Delivered", key: "delivered" },
//   ];

//   // Current step index based on order.tracking
//   const currentIndex = order.tracking ? order.tracking.length - 1 : 0;

//   return (
//     <div className="p-4 md:p-10 max-w-3xl mx-auto">
//       {/* Back Button */}
//       <Link to="/dashboard/my-orders" className="flex items-center mb-6 text-indigo-500 hover:underline">
//         <FaArrowLeft className="mr-2" /> Back to My Orders
//       </Link>

//       <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Order Details</h2>

//       {/* Order Info Card */}
//       <div className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white shadow-lg rounded-xl p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <p><strong>Order ID :</strong> <span className="font-mono text-sm">#{order._id}</span></p>
//             <p><strong>Product :</strong> {order.productTitle}</p>
//             <p><strong>Quantity :</strong> {order.quantity || 1}</p>
//           </div>
//           <div>
//             <p><strong>Payment :</strong> {order.paymentStatus?.toUpperCase()}</p>
//             <p><strong>Total Price :</strong> ${order.orderPrice || order.price * (order.quantity || 1)}</p>
//             <p><strong>Current Status :</strong> <span className="capitalize">{order.orderStatus}</span></p>
//           </div>
//         </div>
//       </div>

//       {/* Tracking Timeline */}
//       <h3 className="text-xl font-semibold mb-6 text-indigo-700">Tracking History</h3>
//       <div className="relative ml-4">
//         <div className="absolute left-5 top-0 w-1 bg-gray-300 h-full"></div>

//         {steps.map((step, index) => {
//           const completed = index <= currentIndex;
//           return (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className="flex items-center mb-8 relative"
//             >
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold transition-all duration-500 ${
//                   completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
//                 }`}
//               >
//                 {completed ? "✓" : index + 1}
//               </div>

//               <div className="ml-6">
//                 <p className={`text-lg font-bold ${completed ? "text-green-600" : "text-gray-500"}`}>
//                   {step.step}
//                 </p>
//                 {order.tracking && order.tracking[index]?.note && (
//                   <p className="text-xs text-gray-400">{order.tracking[index].note}</p>
//                 )}
//               </div>
//             </motion.div>
//           );
//         })}

//         {/* Rejected Order */}
//         {order.orderStatus === "Rejected" && (
//           <motion.div
//             initial={{ scale: 0.8 }}
//             animate={{ scale: 1 }}
//             className="p-4 bg-red-100 text-red-700 rounded-lg border-l-4 border-red-500 ml-12"
//           >
//             <p className="font-bold uppercase text-sm">Order Cancelled</p>
//             <p className="text-xs">This order has been rejected by the administrator.</p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import { useParams, useNavigate } from "react-router"; // সঠিক ইমপোর্ট
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../../Hooks/useAxios";
// import { FaCheckCircle, FaClock, FaMapMarkerAlt, FaBoxOpen, FaArrowLeft } from "react-icons/fa";

// const OrderDetails = () => {
//   const { id } = useParams(); 
//   const axiosSecure = useAxios();
//   const navigate = useNavigate();

//   const { data: trackingHistory = [], isLoading, isError } = useQuery({
//     queryKey: ["order-tracking", id],
//     queryFn: async () => {
//       // এখানে নিশ্চিত করুন আপনার ব্যাকএন্ডে /tracking/${id} রুটটি আছে
//       const res = await axiosSecure.get(`/tracking/${id}`);
//       return res.data;
//     },
//     enabled: !!id, // আইডি থাকলে তবেই কল হবে
//   });

//   if (isLoading) return (
//     <div className="flex flex-col justify-center items-center min-h-screen">
//        <span className="loading loading-spinner loading-lg text-primary"></span>
//        <p className="mt-4 font-medium text-slate-500">Fetching live updates...</p>
//     </div>
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-10 bg-white shadow-2xl rounded-3xl my-10 border border-gray-100">
      
//       {/* Header Section */}
//       <div className="flex justify-between items-start mb-12">
//         <button onClick={() => navigate(-1)} className="btn btn-ghost btn-circle bg-slate-100">
//            <FaArrowLeft />
//         </button>
//         <div className="text-right">
//           <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Track Order</h2>
//           <p className="text-slate-500 font-mono text-sm">ID: #{id?.slice(-8).toUpperCase()}</p>
//         </div>
//       </div>

//       {/* --- Visual Timeline --- */}
//       <div className="relative border-l-4 border-green-500 ml-6 md:ml-20 space-y-12 pb-10">
//         {trackingHistory.length > 0 ? (
//           // .reverse() দিলে নতুন আপডেট সবার উপরে দেখাবে (যদি ব্যাকএন্ডে সর্ট করা না থাকে)
//           [...trackingHistory].reverse().map((step, index) => (
//             <div key={index} className="relative pl-12 transition-all duration-500">
              
//               {/* Timeline Indicator */}
//               <div className={`absolute -left-[14px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${index === 0 ? "bg-green-600 scale-125 ring-4 ring-green-100" : "bg-gray-300"}`}>
//                 {index === 0 ? <FaCheckCircle className="text-white text-[10px]" /> : <FaClock className="text-white text-[10px]" />}
//               </div>

//               {/* Status Card */}
//               <div className={`p-6 rounded-3xl border transition-all hover:shadow-md ${index === 0 ? "bg-green-50 border-green-200" : "bg-slate-50 border-slate-100"}`}>
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
//                   <h3 className={`text-lg font-black uppercase ${index === 0 ? "text-green-700" : "text-slate-700"}`}>
//                     {step.status}
//                   </h3>
//                   <span className="text-[10px] font-mono text-slate-400 bg-white px-3 py-1 rounded-full border shadow-sm">
//                     {new Date(step.updatedAt).toLocaleString()}
//                   </span>
//                 </div>

//                 <div className="space-y-2">
//                   <p className="flex items-center gap-2 text-sm text-slate-600 font-bold">
//                     <FaMapMarkerAlt className="text-red-400" /> {step.location || "Location not specified"}
//                   </p>
//                   {step.note && (
//                     <div className="bg-white/80 p-3 rounded-xl italic text-sm text-slate-500 border-l-4 border-blue-400">
//                       "{step.note}"
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="pl-12 py-10">
//             <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 flex flex-col items-center text-center gap-4">
//               <FaBoxOpen className="text-blue-400 text-5xl" />
//               <div>
//                 <h4 className="text-blue-800 font-bold text-lg">Order is being Processed</h4>
//                 <p className="text-blue-600 text-sm">Once the manager starts production, you will see live updates here.</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;
// import React from "react";
// import { useParams, Link } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../../Hooks/useAxios";
// import { motion } from "framer-motion";
// import { 
//   FaArrowLeft, FaBox, FaCalendarAlt, FaDollarSign, 
//   FaCheckCircle, FaClock, FaMapMarkerAlt, FaIndustry, 
//   FaTruckLoading, FaShieldAlt, FaShippingFast, FaIdCard 
// } from "react-icons/fa";

// const OrderDetail = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxios();

//   // ১. অর্ডারের সাধারণ তথ্য (Price, Title, Status) ফেচ করা
//   const { data: order = {}, isLoading: orderLoading } = useQuery({
//     queryKey: ["order-details", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/orders/${id}`);
//       return res.data;
//     },
//   });

//   // ২. ম্যানেজারের পাঠানো প্রোডাকশন ট্র্যাকিং ফেচ করা
//   const { data: trackingHistory = [], isLoading: trackingLoading } = useQuery({
//     queryKey: ["order-tracking", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/tracking/${id}`);
//       return res.data;
//     },
//   });

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Cutting Completed": return <FaIndustry />;
//       case "Sewing Started": return <FaIndustry />;
//       case "QC Checked": return <FaShieldAlt />;
//       case "Packed": return <FaBox />;
//       case "Shipped": return <FaShippingFast />;
//       case "Out for Delivery": return <FaTruckLoading />;
//       default: return <FaClock />;
//     }
//   };

//   if (orderLoading || trackingLoading) return (
//     <div className="flex justify-center items-center min-h-screen">
//       <span className="loading loading-spinner loading-lg text-indigo-600"></span>
//     </div>
//   );

//   return (
//     <div className="p-4 md:p-10 bg-slate-50 min-h-screen">
//       <div className="max-w-5xl mx-auto">
        
//         {/* Navigation */}
//         <Link to="/dashboard/myOrders" className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:bg-indigo-50 p-2 rounded-lg transition-all">
//           <FaArrowLeft /> Back to Orders
//         </Link>

//         {/* --- SECTION 1: Order Brief Summary (Details) --- */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10"
//         >
//           {/* Main Info */}
//           <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl">
//                 <FaBox />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-black text-slate-800">{order.productTitle}</h2>
//                 <p className="text-slate-400 text-sm flex items-center gap-1"><FaIdCard /> ID: {id}</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//               <div className="bg-slate-50 p-4 rounded-2xl">
//                 <p className="text-[10px] uppercase font-bold text-slate-400">Status</p>
//                 <p className="text-indigo-600 font-bold uppercase">{order.orderStatus}</p>
//               </div>
//               <div className="bg-slate-50 p-4 rounded-2xl">
//                 <p className="text-[10px] uppercase font-bold text-slate-400">Quantity</p>
//                 <p className="text-slate-700 font-bold">{order.quantity || 1} Pcs</p>
//               </div>
//               <div className="bg-slate-50 p-4 rounded-2xl">
//                 <p className="text-[10px] uppercase font-bold text-slate-400">Payment</p>
//                 <p className="text-green-600 font-bold uppercase">{order.paymentStatus}</p>
//               </div>
//             </div>
//           </div>

//           {/* Price Card */}
//           <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-lg flex flex-col justify-center items-center text-center">
//             <FaDollarSign className="text-4xl mb-2 opacity-50" />
//             <p className="text-indigo-100 font-medium uppercase tracking-widest text-xs">Total Amount</p>
//             <h3 className="text-4xl font-black mt-1">${order.orderPrice || order.price * (order.quantity || 1)}</h3>
//             <p className="text-indigo-200 text-[10px] mt-4 flex items-center gap-1">
//               <FaCalendarAlt /> Ordered on {new Date(order.updatedAt).toLocaleDateString()}
//             </p>
//           </div>
//         </motion.div>

//         {/* --- SECTION 2: Production Timeline (Tracking) --- */}
//         <div className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-slate-100">
//           <header className="flex justify-between items-center mb-12">
//             <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Production Journey</h3>
//             <span className="text-xs font-bold bg-green-100 text-green-700 px-4 py-2 rounded-full">LIVE TRACKING</span>
//           </header>

          

//           <div className="relative border-l-4 border-dashed border-slate-100 ml-6 md:ml-12 space-y-12">
//             {trackingHistory.length > 0 ? (
//               [...trackingHistory].reverse().map((step, index) => (
//                 <motion.div 
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   className="relative pl-12"
//                 >
//                   {/* Dot Indicator */}
//                   <div className={`absolute -left-[14px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center text-[10px] 
//                     ${index === 0 ? "bg-green-500 scale-150 ring-8 ring-green-50 text-white" : "bg-slate-200 text-slate-500"}`}>
//                     {index === 0 ? <FaCheckCircle /> : <FaClock />}
//                   </div>

//                   {/* Tracking Card */}
//                   <div className={`p-6 rounded-3xl border transition-all ${index === 0 ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-100"}`}>
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
//                       <div className="flex items-center gap-3">
//                         <span className={`p-3 rounded-2xl text-xl ${index === 0 ? "bg-green-500 text-white" : "bg-slate-100 text-slate-400"}`}>
//                           {getStatusIcon(step.status)}
//                         </span>
//                         <div>
//                           <h3 className="text-lg font-black uppercase tracking-tight">{step.status}</h3>
//                           <p className={`text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest ${index === 0 ? "text-slate-400" : "text-slate-400"}`}>
//                             <FaClock /> {new Date(step.updatedAt).toLocaleString()}
//                           </p>
//                         </div>
//                       </div>
//                       {index === 0 && <span className="text-[10px] font-black bg-green-500 text-white px-3 py-1 rounded-lg">CURRENT STAGE</span>}
//                     </div>

//                     <div className="flex flex-col gap-3">
//                       <div className={`flex items-center gap-2 text-xs font-bold w-fit px-4 py-2 rounded-xl border ${index === 0 ? "bg-white/10 border-white/20 text-white" : "bg-slate-50 border-slate-100 text-slate-600"}`}>
//                         <FaMapMarkerAlt className="text-red-500" /> {step.location}
//                       </div>
//                       {step.note && (
//                         <p className={`p-4 rounded-2xl text-sm italic border-l-4 border-indigo-500 ${index === 0 ? "bg-white/5 text-slate-300" : "bg-slate-50 text-slate-500"}`}>
//                           "{step.note}"
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <div className="pl-12 py-10">
//                 <div className="bg-slate-50 p-8 rounded-3xl border border-dashed border-slate-200 text-center">
//                   <FaIndustry className="mx-auto text-slate-300 text-4xl mb-3" />
//                   <p className="text-slate-500 font-medium">Production has not started yet. Once the manager updates the status, it will appear here.</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetail;
import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { motion } from "framer-motion";
import { 
  FaArrowLeft, FaBox, FaCalendarAlt, FaDollarSign, 
  FaCheckCircle, FaClock, FaMapMarkerAlt, FaIndustry, 
  FaTruckLoading, FaShieldAlt, FaShippingFast, FaIdCard 
} from "react-icons/fa";

const CombinedOrderDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();

  // ১. অর্ডারের সাধারণ তথ্য
  const { data: order = {}, isLoading: orderLoading } = useQuery({
    queryKey: ["order-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
  });

  // ২. লাইভ ট্র্যাকিং ডাটা (প্রতি ১০ সেকেন্ডে অটো আপডেট হবে)
  const { data: trackingHistory = [], isLoading: trackingLoading } = useQuery({
    queryKey: ["order-tracking", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tracking/${id}`);
      return res.data;
    },
    refetchInterval: 10000, // লাইভ লোকেশন চেঞ্জ দেখার জন্য ১০ সেকেন্ড পর পর অটো চেক করবে
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Cutting Completed": return <FaIndustry className="text-orange-500" />;
      case "Sewing Started": return <FaIndustry className="text-blue-500" />;
      case "Finishing/QC Checked": return <FaShieldAlt className="text-purple-500" />;
      case "Packed": return <FaBox className="text-yellow-600" />;
      case "Shipped": return <FaShippingFast className="text-indigo-500" />;
      case "Out for Delivery": return <FaTruckLoading className="text-green-500" />;
      default: return <FaClock />;
    }
  };

  if (orderLoading || trackingLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-indigo-600"></span>
    </div>
  );

  return (
    <div className="p-4 md:p-10 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <Link to="/dashboard/myOrders" className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:bg-indigo-50 p-2 rounded-lg transition-all">
          <FaArrowLeft /> Back to Orders
        </Link>

        {/* --- SECTION 1: Order Brief --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
             <h2 className="text-2xl font-black text-slate-800 mb-4">{order.productTitle}</h2>
             <div className="flex flex-wrap gap-3">
                <span className="badge badge-ghost p-4 font-bold tracking-wider">STATUS: {order.orderStatus}</span>
                <span className="badge badge-info p-4 text-white font-bold">QTY: {order.quantity || 1}</span>
             </div>
          </div>
          <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-lg text-center">
            <p className="text-xs uppercase opacity-70 mb-1">Total Bill</p>
            <h3 className="text-4xl font-black">${order.orderPrice || (order.price * order.quantity)}</h3>
          </div>
        </div>

        {/* --- SECTION 2: Live Tracking Timeline --- */}
        <div className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Live Production Journey</h3>
            <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold text-green-600">LIVE UPDATING</span>
            </div>
          </div>

          <div className="relative border-l-4 border-dashed border-slate-100 ml-6 md:ml-12 space-y-12">
            {trackingHistory.length > 0 ? (
              // ম্যানেজার নতুন আপডেট দিলে সেটা সবার উপরে দেখাবে
              [...trackingHistory].reverse().map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative pl-12"
                >
                  {/* Dot Indicator */}
                  <div className={`absolute -left-[14px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center 
                    ${index === 0 ? "bg-green-500 scale-125 ring-8 ring-green-50" : "bg-slate-200"}`}>
                  </div>

                  {/* Tracking Card */}
                  <div className={`p-6 rounded-3xl border transition-all ${index === 0 ? "bg-slate-900 text-white border-slate-900 shadow-xl" : "bg-white border-slate-100 opacity-70"}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl text-2xl ${index === 0 ? "bg-white/10" : "bg-slate-100"}`}>
                          {getStatusIcon(step.status)}
                        </div>
                        <div>
                          <h4 className="font-black text-lg uppercase tracking-tight">{step.status}</h4>
                          <p className="text-[10px] font-mono opacity-60">{new Date(step.updatedAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {/* লাইভ লোকেশন পার্ট */}
                      {/* <div className={`flex items-center gap-2 text-xs font-bold w-fit px-4 py-2 rounded-xl ${index === 0 ? "bg-green-500 text-white" : "bg-slate-50 text-slate-600 border"}`}>
                        <FaMapMarkerAlt className={index === 0 ? "text-white" : "text-red-500"} /> 
                        LOCATION: {step.location || "In Progress"}
                      </div> */}
                      {/* Tracking Card এর ভেতর */}
<div className="flex flex-col gap-3">
  <div className={`flex items-center gap-2 text-xs font-bold w-fit px-4 py-2 rounded-xl border ${index === 0 ? "bg-white/10 border-white/20 text-white" : "bg-slate-50 border-slate-100 text-slate-600"}`}>
    <FaMapMarkerAlt className={index === 0 ? "text-green-400" : "text-red-500"} /> 
    
    {/* এখানে পরিবর্তন করুন */}
    CURRENT LOCATION: {step.location ? step.location : "Processing in Factory"}
  </div>
  
  {step.note && (
    <p className={`p-4 rounded-2xl text-sm italic border-l-4 border-indigo-500 ${index === 0 ? "bg-white/5 text-slate-300" : "bg-slate-50 text-slate-500"}`}>
      "{step.note}"
    </p>
  )}
</div>
                      
                      {step.note && (
                        <p className={`p-4 rounded-2xl text-sm italic ${index === 0 ? "bg-white/5 border border-white/10" : "bg-slate-50"}`}>
                          "{step.note}"
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">
                <FaIndustry className="mx-auto text-4xl text-slate-300 mb-4" />
                <p className="text-slate-500">No production updates yet. Manager is preparing your order.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedOrderDetails;