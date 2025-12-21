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
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";

export default function OrderDetail() {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/orders/${id}`).then((res) => {
      setOrder(res.data);
    });
  }, [id]);

  if (!order) return <p className="text-center mt-10">Loading order details...</p>;

  // আপনার বর্তমান অ্যাডমিন লজিক অনুযায়ী ২ টি ধাপ
  const steps = ["pending", "Approved"];
  
  // currentIndex বের করার লজিক (পেন্ডিং হলে ০, অ্যাপ্রুভড হলে ১)
  const currentIndex = order.orderStatus === "Approved" ? 1 : 0;

  return (
    <div className="p-4 md:p-10 max-w-3xl mx-auto">
      <Link to="/dashboard/my-orders" className="flex items-center mb-6 text-indigo-500 hover:underline">
        <FaArrowLeft className="mr-2" /> Back to My Orders
      </Link>

      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Order Details</h2>

      {/* 💳 Order Info Card (Gradient Style) */}
      <div className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white shadow-lg rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Order ID : </strong> <span className="font-mono text-sm">#{order._id}</span></p>
            <p><strong>Product : </strong> {order.productTitle}</p>
            <p><strong>Quantity : </strong> {order.quantity || 1}</p>
          </div>
          <div>
            <p><strong>Payment : </strong> {order.paymentStatus?.toUpperCase()}</p>
            <p><strong>Total Price : </strong> ${order.orderPrice || order.price * (order.quantity || 1)}</p>
            <p><strong>Current Status : </strong> <span className="capitalize">{order.orderStatus}</span></p>
          </div>
        </div>
      </div>

      {/* 🚀 Tracking Timeline */}
      <h3 className="text-xl font-semibold mb-6 text-indigo-700">Tracking History</h3>
      
      <div className="relative ml-4">
        {/* লাইনটি শুধু ২ ধাপের জন্য হাইট কমানো হয়েছে */}
        <div className="absolute left-5 top-0 w-1 bg-gray-300 h-24"></div>
        
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
            className="flex items-center mb-12 relative"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold transition-all duration-500 ${
                index <= currentIndex ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
              }`}
            >
              {index <= currentIndex ? "✓" : index + 1}
            </div>
            
            <div className="ml-6">
              <p className={`text-lg font-bold ${index <= currentIndex ? "text-green-600" : "text-gray-500"}`}>
                {step === "pending" ? "Order Placed" : "Order Confirmed"}
              </p>
              <p className="text-xs text-gray-400">
                {index === 0 ? "We have received your order" : 
                 (order.orderStatus === "Approved" ? "Admin has approved your order" : "Waiting for approval")}
              </p>
            </div>
          </motion.div>
        ))}

        {/* ❌ Rejection Message (যদি স্ট্যাটাস Rejected হয়) */}
        {order.orderStatus === "Rejected" && (
          <motion.div 
            initial={{ scale: 0.8 }} 
            animate={{ scale: 1 }}
            className="p-4 bg-red-100 text-red-700 rounded-lg border-l-4 border-red-500 ml-12"
          >
            <p className="font-bold uppercase text-sm">Order Cancelled</p>
            <p className="text-xs">This order has been rejected by the administrator.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}