
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import { motion, AnimatePresence } from "framer-motion";

const MyOrder = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxios();

 
  const [localOrders, setLocalOrders] = useState([]);

  // Fetch orders
//   const { data: orders = [],  isLoading } = useQuery({
//     queryKey: ["myOrders", user?.email],
//     enabled: !loading && !!user?.email,
//     // queryFn: async () => {
//     //   const res = await axiosSecure.get(`/orders?email=${user.email}`);
//     //   return res.data;
//     // },
//     queryFn: async () => {
//   // আলাদা করে ইমেইল পাঠানোর দরকার নেই, কারণ ব্যাকএন্ড টোকেন থেকে ইমেইল পায়
//   const res = await axiosSecure.get('/orders'); 
//   console.log("Response from server:", res.data); // ডাটা আসছে কি না কনসোলে দেখুন
//   return res.data;
// },
//   });
const { data: orders = [], isLoading } = useQuery({
  queryKey: ["myOrders", user?.email],
  enabled: !loading && !!user?.email,
  queryFn: async () => {
    // শুধু '/orders' দিন, কুয়েরি প্যারামিটার (?email=...) বাদ দিন
    const res = await axiosSecure.get('/orders'); 
    return res.data;
  },
});
  // Sync fetched orders to local state
  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  // Delete order
  const handleDeleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/orders/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setLocalOrders((prev) => prev.filter((o) => o._id !== id));
              Swal.fire(
                "Deleted!",
                "Order has been removed successfully.",
                "success"
              );
            } else {
              Swal.fire(
                "Not Allowed",
                "Order status changed. Cannot delete.",
                "error"
              );
            }
          })
          .catch(() => {
            Swal.fire(
              "Error",
              "Something went wrong while deleting order.",
              "error"
            );
          });
      }
    });
  };

  // Motion variants for animation
  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="p-8 bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 p-6 md:p-16">
      {/* <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
        My Orders ( {orders.length} ) 
      </h2> */}
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
  My Orders ( {localOrders.length} ) 
</h2>


      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className=" bg-gradient-to-r from-teal-400 to-indigo-500  text-white ">
            <tr className="text-xl">
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {localOrders.length > 0 ? (
                localOrders.map((order) => (
                  <motion.tr
                    key={order._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="hover:bg-blue-100 transition"
                  >
                    <td className="px-4 py-3">{order._id}</td>
                    <td className="px-4 py-3">{order.productTitle}</td>
                    <td className="px-4 py-3">{order.quantity || 1}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-white font-semibold ${
                          order.orderStatus === "delivered"
                            ? "bg-green-500"
                            : order.orderStatus === "shipped"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {order.orderStatus || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {order.paymentStatus === "paid" ||
                      order.paymentStatus === "cod" ? (
                        <span className="px-2 py-1 rounded bg-green-300 text-xs font-semibold">
                          {order.paymentStatus === "cod" ? "COD" : "Paid"}
                        </span>
                      ) : (
                        <Link
                          to={`/dashboard/payment/${order._id}`}
                          className="px-2 py-1 rounded bg-yellow-300 text-xs font-semibold"
                        >
                          Pay
                        </Link>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <Link
                        to={`/dashboard/orderDetails/${order._id}`}
                        className="px-2 py-1 rounded bg-blue-500 text-white"
                      >
                        <FaMagnifyingGlass />
                      </Link>
                      {order.orderStatus === "pending" && (
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          className="px-2 py-1 rounded bg-red-500 text-white"
                        >
                          <MdDelete />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;








// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { FaMagnifyingGlass } from "react-icons/fa6";
// import { MdDelete } from "react-icons/md";
// import Swal from "sweetalert2";
// import useAuth from "../../../Hooks/useAuth";
// import useAxios from "../../../Hooks/useAxios";
// import { motion, AnimatePresence } from "framer-motion";

// const MyOrder = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxios();
//   const [localOrders, setLocalOrders] = useState([]);
//   const [openOrderId, setOpenOrderId] = useState(null); // selected order for details + tracking

//   // Fetch orders
//   const { data: orders = [], isLoading } = useQuery({
//     queryKey: ["myOrders", user?.email],
//     enabled: !loading && !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/orders?email=${user.email}`);
//       return res.data;
//     },
//   });

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

//   const rowVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
//   };

//   if (isLoading) return <p className="text-center mt-10">Loading orders...</p>;

//   return (
//     <div className="p-8 bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 p-6 md:p-16">
//       <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
//         My Orders ( {localOrders.length} ) 
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white">
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
//                   <React.Fragment key={order._id}>
//                     <motion.tr
//                       variants={rowVariants}
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       className="hover:bg-blue-100 transition"
//                     >
//                       <td className="px-4 py-3">{order._id}</td>
//                       <td className="px-4 py-3">{order.productTitle}</td>
//                       <td className="px-4 py-3">{order.quantity || 1}</td>
//                       <td className="px-4 py-3">
//                         <span
//                           className={`px-2 py-1 rounded text-white font-semibold ${
//                             order.orderStatus === "delivered"
//                               ? "bg-green-500"
//                               : order.orderStatus === "shipped"
//                               ? "bg-blue-500"
//                               : "bg-yellow-500"
//                           }`}
//                         >
//                           {order.orderStatus || "pending"}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         {order.paymentStatus === "paid" ||
//                         order.paymentStatus === "cod" ? (
//                           <span className="px-2 py-1 rounded bg-green-300 text-xs font-semibold">
//                             {order.paymentStatus === "cod" ? "COD" : "Paid"}
//                           </span>
//                         ) : (
//                           <span className="px-2 py-1 rounded bg-yellow-300 text-xs font-semibold">
//                             Pay
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-4 py-3 flex gap-2">
//                         {/* Toggle details + tracking */}
//                         <button
//                           onClick={() =>
//                             setOpenOrderId(openOrderId === order._id ? null : order._id)
//                           }
//                           className="px-2 py-1 rounded bg-blue-500 text-white flex items-center justify-center"
//                         >
//                           <FaMagnifyingGlass />
//                         </button>

//                         {order.orderStatus === "pending" && (
//                           <button
//                             onClick={() => handleDeleteOrder(order._id)}
//                             className="px-2 py-1 rounded bg-red-500 text-white"
//                           >
//                             <MdDelete />
//                           </button>
//                         )}
//                       </td>
//                     </motion.tr>

//                     {/* Details + Tracking Timeline */}
//                     {openOrderId === order._id && (
//                       <motion.tr
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                       >
//                         <td colSpan="6" className="bg-gray-50 p-4">
//                           <h3 className="font-bold mb-2">Order Details:</h3>
//                           <p><strong>Product:</strong> {order.productTitle}</p>
//                           <p><strong>Quantity:</strong> {order.quantity}</p>
//                           <p><strong>Status:</strong> {order.orderStatus}</p>
//                           <p><strong>Payment:</strong> {order.paymentStatus}</p>

//                           <h3 className="font-bold mt-4 mb-2">Tracking Timeline:</h3>
//                           <ul className="space-y-2">
//                             {order.tracking?.map((step, index) => (
//                               <li
//                                 key={index}
//                                 className={`p-2 border-l-4 ${
//                                   index === order.tracking.length - 1
//                                     ? "border-blue-500 bg-blue-100"
//                                     : "border-gray-300 bg-gray-50"
//                                 }`}
//                               >
//                                 <strong>{step.step}</strong> - {new Date(step.time).toLocaleString()}
//                                 {step.location && <span> | Location: {step.location}</span>}
//                                 {step.note && <span> | Note: {step.note}</span>}
//                               </li>
//                             ))}
//                           </ul>
//                         </td>
//                       </motion.tr>
//                     )}
//                   </React.Fragment>
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
