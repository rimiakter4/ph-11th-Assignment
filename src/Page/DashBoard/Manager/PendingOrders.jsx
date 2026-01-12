
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxios from "../../../Hooks/useAxios";
// import useAuth from "../../../Hooks/useAuth"; // আপনার Auth Hook টি ইম্পোর্ট করুন
// import { Link } from "react-router"; 
// import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

// const PendingOrders = () => {
//   const axiosSecure = useAxios();
//   const { user } = useAuth(); // লগইন করা ইউজারের ডাটা নিতে

//   // ১. পেন্ডিং অর্ডার ফেচ করা (ইমেইল ফিল্টার সহ)
//   const { data: orders = [], isLoading, refetch } = useQuery({
//     queryKey: ["pending-orders", user?.email], // ইমেইল কি-তে রাখা হয়েছে
//     queryFn: async () => {
//       // ব্যাকএন্ডে স্ট্যাটাস এবং ইমেইল দুটোই পাঠানো হচ্ছে
//       const res = await axiosSecure.get(`/allorders?status=pending&email=${user?.email}`);
//       return res.data;
//     }
//   });

//   // ২. Approve Logic
//   const handleApprove = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You want to approve this order?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#10B981",
//       confirmButtonText: "Yes, Approve it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await axiosSecure.patch(`/orders/approve/${id}`);

//           if (res.data.modifiedCount > 0 || res.data.success) {
//             await refetch(); // লিস্ট আপডেট করা
//             Swal.fire({
//               title: "Approved!",
//               text: "Order list updated.",
//               icon: "success",
//               timer: 1000,
//               showConfirmButton: false
//             });
//           } else {
//             Swal.fire("Info", "Already updated or no changes.", "info");
//           }
//         } catch (error) {
//           console.error("Approve Error:", error);
//           Swal.fire("Error", "Check if you have manager/admin access.", "error");
//         }
//       }
//     });
//   };

//   // ৩. Reject Logic
//   const handleReject = async (id) => {
//     Swal.fire({
//       title: "Reject Order?",
//       text: "This will mark the order as Rejected.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#EF4444",
//       confirmButtonText: "Yes, Reject it!"
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await axiosSecure.patch(`/orders/reject/${id}`);
          
//           if (res.data.modifiedCount > 0 || res.data.success) {
//             Swal.fire({
//               title: "Rejected!",
//               icon: "error",
//               timer: 1000,
//               showConfirmButton: false
//             });
//             await refetch(); // রিজেক্ট হওয়ার পর লিস্ট আপডেট
//           }
//         } catch (error) {
//           Swal.fire("Error", "Failed to reject.", "error");
//         }
//       }
//     });
//   };

//   if (isLoading) return (
//     <div className="flex justify-center items-center min-h-[400px]">
//       <span className="loading loading-spinner loading-lg text-primary"></span>
//     </div>
//   );

//   return (
//     <div className="p-4 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 min-h-screen">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Pending Orders</h2>
//           <p className="text-gray-500 text-sm">Action required for incoming orders.</p>
//         </div>
//         <div className="badge badge-lg bg-orange-100 text-orange-600 border-orange-200 py-4 px-6 font-bold uppercase">
//           Pending: {orders.length}
//         </div>
//       </div>

//       <div className="overflow-x-auto rounded-xl border border-gray-200">
//         <table className="table w-full font-sans">
//           <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//             <tr>
//               <th className="py-4">Order ID</th>
//               <th>Customer</th>
//               <th>Product</th>
//               <th>Qty</th>
//               <th>Status</th>
//               <th className="text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm">
//             {orders.length > 0 ? (
//               orders.map((order) => (
//                 <tr key={order._id} className="hover:bg-gray-50 transition-colors border-b last:border-0">
//                   <td className="font-mono font-bold text-blue-600">
//                     #{order._id.slice(-6).toUpperCase()}
//                   </td>
//                   <td>
//                     <div className="font-bold">{order.firstName} {order.lastName}</div>
//                     <div className="text-[11px] text-gray-400">{order.email}</div>
//                   </td>
//                   <td className="font-medium">{order.productTitle}</td>
//                   <td className="font-bold">{order.quantity}</td>
//                   <td>
//                     <span className="badge badge-warning text-[10px] font-bold uppercase animate-pulse">
//                       {order.orderStatus}
//                     </span>
//                   </td>
//                   <td className="flex justify-center gap-3">
//                     <Link to={`/dashboard/order-details/${order._id}`} className="btn btn-sm btn-ghost text-blue-500 tooltip" data-tip="View Details">
//                       <FaEye size={18} />
//                     </Link>
//                     <button onClick={() => handleApprove(order._id)} className="btn btn-sm btn-success text-white px-4">
//                       <FaCheck /> Approve
//                     </button>
//                     <button onClick={() => handleReject(order._id)} className="btn btn-sm btn-outline btn-error">
//                       <FaTimes /> Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-20 text-gray-400 italic">
//                    No pending orders to review.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PendingOrders;
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth"; 
import { Link } from "react-router"; 
import { FaCheck, FaTimes, FaEye, FaInbox } from "react-icons/fa";

const PendingOrders = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["pending-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allorders?status=pending&email=${user?.email}`);
      return res.data;
    }
  });

  const handleApprove = async (id) => {
    const isDark = document.documentElement.classList.contains("dark");
    Swal.fire({
      title: "Approve Order?",
      text: "This will move the order to the processing list.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Approve",
      background: isDark ? "#1e293b" : "#fff",
      color: isDark ? "#fff" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/orders/approve/${id}`);
          if (res.data.modifiedCount > 0 || res.data.success) {
            refetch();
            Swal.fire({
              title: "Approved!",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
              background: isDark ? "#1e293b" : "#fff",
            });
          }
        } catch (error) {
          Swal.fire("Error", "Access denied or server error.", "error");
        }
      }
    });
  };

  const handleReject = async (id) => {
    const isDark = document.documentElement.classList.contains("dark");
    Swal.fire({
      title: "Reject Order?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Reject",
      background: isDark ? "#1e293b" : "#fff",
      color: isDark ? "#fff" : "#000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/orders/reject/${id}`);
          if (res.data.modifiedCount > 0 || res.data.success) {
            refetch();
            Swal.fire({
              title: "Rejected",
              icon: "error",
              timer: 1000,
              showConfirmButton: false,
              background: isDark ? "#1e293b" : "#fff",
            });
          }
        } catch (error) {
          Swal.fire("Error", "Failed to reject.", "error");
        }
      }
    });
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen dark:bg-[#020617]">
      <span className="loading loading-spinner loading-lg text-teal-500"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] p-4 md:p-8 lg:p-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
              Pending Orders
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
              New requests awaiting verification
            </p>
          </div>
          <div className="px-5 py-2.5 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-2xl border border-orange-200 dark:border-orange-500/20 text-sm font-black uppercase tracking-tighter">
            Total Pending: {orders.length}
          </div>
        </div>

        {/* --- Desktop Table View (Visible on md+) --- */}
        <div className="hidden md:block bg-white dark:bg-[#0f172a] rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-all">
          <table className="table w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-teal-500 border-b dark:border-slate-800">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-wider">Order Detail</th>
                <th className="py-5 text-[11px] font-black uppercase tracking-wider">Customer</th>
                <th className="py-5 text-[11px] font-black uppercase tracking-wider">Qty</th>
                <th className="py-5 text-[11px] font-black uppercase tracking-wider text-center">Status</th>
                <th className="py-5 text-center px-6 text-[11px] font-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-mono font-black text-blue-600 dark:text-blue-400 text-xs">
                        #{order._id.slice(-6).toUpperCase()}
                      </div>
                      <div className="text-slate-700 dark:text-slate-300 font-bold text-xs mt-1 truncate max-w-[150px]">
                        {order.productTitle}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-slate-800 dark:text-slate-200 font-bold text-xs">
                        {order.firstName} {order.lastName}
                      </div>
                      <div className="text-[10px] text-slate-400 lowercase">{order.email}</div>
                    </td>
                    <td className="py-4 font-black text-slate-700 dark:text-slate-300 text-xs">
                      {order.quantity}
                    </td>
                    <td className="py-4 text-center">
                      <span className="px-3 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full text-[10px] font-black uppercase ring-1 ring-inset ring-orange-200 dark:ring-orange-500/20">
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center gap-2">
                        <Link to={`/dashboard/order-details/${order._id}`} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-blue-500 hover:text-white transition-all">
                          <FaEye size={14} />
                        </Link>
                        <button onClick={() => handleApprove(order._id)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 text-white text-[10px] font-black uppercase hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20">
                          <FaCheck /> Approve
                        </button>
                        <button onClick={() => handleReject(order._id)} className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                          <FaTimes size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : null}
            </tbody>
          </table>
        </div>

        {/* --- Mobile Card View (Visible on < md) --- */}
        <div className="md:hidden flex flex-col gap-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="bg-white dark:bg-[#0f172a] p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="font-mono font-black text-blue-600 text-xs">#{order._id.slice(-6).toUpperCase()}</div>
                  <span className="px-2 py-0.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 text-[9px] font-black uppercase rounded">
                    {order.orderStatus}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase mb-1">{order.productTitle}</h3>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mb-4">
                  Customer: {order.firstName} {order.lastName} ({order.quantity} units)
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <Link to={`/dashboard/order-details/${order._id}`} className="flex justify-center items-center py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                    <FaEye />
                  </Link>
                  <button onClick={() => handleApprove(order._id)} className="flex justify-center items-center py-2.5 rounded-xl bg-teal-500 text-white text-[10px] font-black uppercase">
                    Approve
                  </button>
                  <button onClick={() => handleReject(order._id)} className="flex justify-center items-center py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500">
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))
          ) : null}
        </div>

        {/* --- Empty State --- */}
        {orders.length === 0 && (
          <div className="text-center py-24 bg-white dark:bg-[#0f172a] rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800 shadow-inner transition-all">
            <FaInbox className="mx-auto text-slate-200 dark:text-slate-800 mb-4" size={60} />
            <h3 className="text-slate-800 dark:text-slate-200 font-black uppercase tracking-tight">No Pending Orders</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Everything is up to date!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingOrders;