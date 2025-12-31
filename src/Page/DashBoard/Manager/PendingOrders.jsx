


// // 3rd

// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxios from "../../../Hooks/useAxios";
// import { Link } from "react-router"; // react-router-dom ব্যবহার করলে সেটি চেক করে নিন
// import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

// const PendingOrders = () => {
//   const axiosSecure = useAxios();

//   // const { data: orders = [], refetch, isLoading } = useQuery({
//   //   queryKey: ["pendingOrders"],
//   //   queryFn: async () => {
//   //     const res = await axiosSecure.get("/orders/pending");
//   //     return res.data;
//   //   },
//   // });

//   // const handleApprove = async (id) => {
//   //   Swal.fire({
//   //     title: "Approve Order?",
//   //     text: "Confirming will move this to approved status.",
//   //     icon: "question",
//   //     showCancelButton: true,
//   //     confirmButtonColor: "#10B981",
//   //     confirmButtonText: "Yes, Approve",
//   //   }).then(async (result) => {
//   //     if (result.isConfirmed) {
//   //       try {
//   //         const res = await axiosSecure.patch(`/orders/approve/${id}`);
//   //         if (res.data.modifiedCount > 0) {
//   //           Swal.fire("Success!", "Order approved successfully.", "success");
//   //           refetch();
//   //         }
//   //       } catch (error) {
//   //         Swal.fire("Error", "Something went wrong!", "error");
//   //       }
//   //     }
//   //   });
//   // };
// // const { data: orders = [], refetch } = useQuery({
// //   queryKey: ["pending-orders"],
// //   queryFn: async () => {
// //     // এখানে status=pending পাঠানো হচ্ছে
// //     const res = await axiosSecure.get(`/allorders?status=pending`);
// //     return res.data;
// //   }
// // });
// const { data: Orders = [], isLoading, refetch } = useQuery({
//         queryKey: ["pending-orders"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/allorders?status=pending");
//             return res.data;
//         }
//     });
//   const handleApprove = async (id) => {
//     try {
//         // এখানে নিশ্চিত করুন axiosSecure এর বেস URL ঠিক আছে
//         const res = await axiosSecure.patch(`/orders/approve/${id}`);
        
//         if (res.data.modifiedCount > 0) {
//             Swal.fire({
//                 title: "Success!",
//                 text: "Order has been approved.",
//                 icon: "success",
//                 timer: 1500
//             });
//             refetch(); // টেবিল ডাটা রিফ্রেশ করার জন্য
//         } else {
//             Swal.fire("Info", "Order was already approved or no changes made", "info");
//         }
//     } catch (error) {
//         console.error("Approve error:", error);
//         Swal.fire("Error", "Could not approve. Check console for details.", "error");
//     }
// };
//   // const handleReject = async (id) => {
//   //   Swal.fire({
//   //     title: "Reject Order?",
//   //     text: "This will mark the order as rejected.",
//   //     icon: "warning",
//   //     showCancelButton: true,
//   //     confirmButtonColor: "#EF4444",
//   //     confirmButtonText: "Yes, Reject",
//   //   }).then(async (result) => {
//   //     if (result.isConfirmed) {
//   //       try {
//   //         const res = await axiosSecure.patch(`/orders/reject/${id}`);
//   //         if (res.data.modifiedCount > 0) {
//   //           Swal.fire("Rejected", "Order has been rejected.", "info");
//   //           refetch();
//   //         }
//   //       } catch (error) {
//   //         Swal.fire("Error", "Something went wrong!", "error");
//   //       }
//   //     }
//   //   });
//   // };
//   const handleReject = async (id) => {
//     // রিজেক্ট করার আগে ইউজারকে একবার জিজ্ঞেস করে নেওয়া ভালো (Confirmation)
//     Swal.fire({
//         title: "Are you sure?",
//         text: "You want to reject this order?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#d33",
//         cancelButtonColor: "#3085d6",
//         confirmButtonText: "Yes, Reject it!"
//     }).then(async (result) => {
//         if (result.isConfirmed) {
//             try {
//                 const res = await axiosSecure.patch(`/orders/reject/${id}`);
//                 if (res.data.modifiedCount > 0) {
//                     Swal.fire("Rejected!", "The order has been rejected.", "error");
//                     refetch(); // লিস্ট আপডেট করার জন্য
//                 }
//             } catch (error) {
//                 console.error("Reject error:", error);
//                 Swal.fire("Error", "Failed to reject order", "error");
//             }
//         }
//     });
// };

//   if (isLoading) return (
//     <div className="flex justify-center items-center min-h-[400px]">
//       <span className="loading loading-spinner loading-lg text-primary"></span>
//     </div>
//   );

//   return (
//     <div className="p-4 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 min-h-screen">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Pending Orders Management</h2>
//           <p className="text-gray-500 text-sm">Review incoming orders that need approval.</p>
//         </div>
//         <div className="badge badge-lg bg-orange-100 text-orange-600 border-orange-200 py-4 px-6 font-bold uppercase">
//           Total Pending: {orders.length}
//         </div>
//       </div>

//       <div className="overflow-x-auto rounded-xl border border-gray-200">
//         <table className="table w-full">
//           <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//             <tr>
//               <th className="py-4">Order ID</th>
//               <th>Customer</th>
//               <th>Product</th>
//               <th>Qty</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th className="text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm">
//             {orders.length > 0 ? (
//               orders.map((order) => (
//                 <tr key={order._id} className="hover:bg-blue-50/30 transition-colors border-b last:border-0">
//                   <td className="font-mono font-bold text-blue-600">
//                     #{order._id.slice(-6).toUpperCase()}
//                   </td>
//                   <td>
//                     <div className="font-bold text-gray-800">{order.firstName} {order.lastName}</div>
//                     <div className="text-[11px] text-gray-400 font-medium">{order.email}</div>
//                   </td>
//                   <td className="font-medium text-gray-700">{order.productTitle}</td>
//                   <td>
//                     <span className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded">
//                       {order.quantity}
//                     </span>
//                   </td>
//                   <td className="text-gray-500">
//                     {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : 'N/A'}
//                   </td>
//                   <td>
//                     <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px] w-fit uppercase">
//                       <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
//                       {order.orderStatus}
//                     </span>
//                   </td>
//                   <td className="flex justify-center gap-2">
//                     <Link to={`/dashboard/order-details/${order._id}`} className="btn btn-sm btn-ghost text-blue-600">
//                       <FaEye size={16} />
//                     </Link>
//                     <button onClick={() => handleApprove(order._id)} className="btn btn-sm btn-circle btn-success text-white">
//                       <FaCheck size={14} />
//                     </button>
//                     <button onClick={() => handleReject(order._id)} className="btn btn-sm btn-circle btn-error text-white">
//                       <FaTimes size={14} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-20 text-gray-400">
//                   📦 No pending orders remaining.
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
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxios from "../../../Hooks/useAxios";
// import { Link } from "react-router"; 
// import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

// const PendingOrders = () => {
//   const axiosSecure = useAxios();

//   // ১. ডাটা ফেচ করা (Orders-কে ছোট হাতের orders লিখুন)
//   const { data: orders = [], isLoading, refetch } = useQuery({
//     queryKey: ["pending-orders"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/allorders?status=pending");
//       return res.data;
//     }
//   });

//   // ২. এপ্রুভ ফাংশন
//   // const handleApprove = async (id) => {
//   //   try {
//   //     const res = await axiosSecure.patch(`/orders/approve/${id}`);
//   //     if (res.data.modifiedCount > 0) {
//   //       Swal.fire({
//   //         title: "Success!",
//   //         text: "Order has been approved.",
//   //         icon: "success",
//   //         timer: 1500
//   //       });
//   //       refetch(); 
//   //     } else {
//   //       Swal.fire("Info", "Order was already approved or no changes made", "info");
//   //     }
//   //   } catch (error) {
//   //     console.error("Approve error:", error);
//   //     Swal.fire("Error", "Could not approve. Check console.", "error");
//   //   }
//   // };
//   // ২. এপ্রুভ ফাংশন (Updated with clear refetch logic)
//   const handleApprove = async (id) => {
//     try {
//       const res = await axiosSecure.patch(`/orders/approve/${id}`);
      
//       // modifiedCount ১ হওয়া মানে ডাটাবেজে আপডেট হয়েছে
//       if (res.data.modifiedCount > 0) {
//         Swal.fire({
//           title: "Approved!",
//           text: "অর্ডারটি এপ্রুভ হয়েছে এবং লিস্ট আপডেট হচ্ছে।",
//           icon: "success",
//           timer: 1500, // ১.৫ সেকেন্ড পর এটি নিজে থেকেই বন্ধ হবে
//           showConfirmButton: false,
//         });

//         // সুইট অ্যালার্ট দেখানোর পর ডাটা নতুন করে নিয়ে আসা
//         refetch(); 
//       } else {
//         Swal.fire({
//           title: "Already Approved",
//           text: "এই অর্ডারটি আগেই এপ্রুভ করা হয়েছে।",
//           icon: "info"
//         });
//         refetch(); // কোনো কারণে ডাটা মিসম্যাচ হলে আবার ফেচ করবে
//       }
//     } catch (error) {
//       console.error("Approve error:", error);
//       Swal.fire("Error", "সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন।", "error");
//     }
//   };

//   // ৩. রিজেক্ট ফাংশন
//   const handleReject = async (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You want to reject this order?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, Reject it!"
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await axiosSecure.patch(`/orders/reject/${id}`);
//           if (res.data.modifiedCount > 0) {
//             Swal.fire("Rejected!", "The order has been rejected.", "success");
//             refetch();
//           }
//         } catch (error) {
//           Swal.fire("Error", "Failed to reject order", "error");
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
//           <h2 className="text-2xl font-bold text-gray-800">Pending Orders Management</h2>
//           <p className="text-gray-500 text-sm">Review incoming orders that need approval.</p>
//         </div>
//         {/* এখানে এখন orders.length কাজ করবে */}
//         <div className="badge badge-lg bg-orange-100 text-orange-600 border-orange-200 py-4 px-6 font-bold uppercase">
//           Total Pending: {orders.length}
//         </div>
//       </div>

//       <div className="overflow-x-auto rounded-xl border border-gray-200">
//         <table className="table w-full">
//           <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//             <tr>
//               <th className="py-4">Order ID</th>
//               <th>Customer</th>
//               <th>Product</th>
//               <th>Qty</th>
//               <th>Date</th>
//               <th>Status</th>
//               <th className="text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-sm">
//             {orders.length > 0 ? (
//               orders.map((order) => (
//                 <tr key={order._id} className="hover:bg-blue-50/30 transition-colors border-b last:border-0">
//                   <td className="font-mono font-bold text-blue-600">
//                     #{order._id.slice(-6).toUpperCase()}
//                   </td>
//                   <td>
//                     <div className="font-bold text-gray-800">{order.firstName} {order.lastName}</div>
//                     <div className="text-[11px] text-gray-400 font-medium">{order.email}</div>
//                   </td>
//                   <td className="font-medium text-gray-700">{order.productTitle}</td>
//                   <td>
//                     <span className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded">
//                       {order.quantity}
//                     </span>
//                   </td>
//                   <td className="text-gray-500">
//                     {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : 'N/A'}
//                   </td>
//                   <td>
//                     <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px] w-fit uppercase">
//                       <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
//                       {order.orderStatus}
//                     </span>
//                   </td>
//                   <td className="flex justify-center gap-2">
//                     <Link to={`/dashboard/order-details/${order._id}`} className="btn btn-sm btn-ghost text-blue-600">
//                       <FaEye size={16} />
//                     </Link>
//                     <button onClick={() => handleApprove(order._id)} className="btn btn-sm btn-circle btn-success text-white">
//                       <FaCheck size={14} />
//                     </button>
//                     <button onClick={() => handleReject(order._id)} className="btn btn-sm btn-circle btn-error text-white">
//                       <FaTimes size={14} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-20 text-gray-400">
//                   📦 No pending orders remaining.
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
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router"; 
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

const PendingOrders = () => {
  const axiosSecure = useAxios();

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["pending-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allorders?status=pending");
      return res.data;
    }
  });

 
// ১. Approve Logic
  // const handleApprove = async (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to approve this order?",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonColor: "#10B981",
  //     confirmButtonText: "Yes, Approve it!",
  //     cancelButtonText: "No"
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         // রিকোয়েস্ট পাঠানোর আগে নিশ্চিত হোন URL সঠিক আছে
  //         const res = await axiosSecure.patch(`/orders/approve/${id}`);
          
  //         // ব্যাকএন্ড থেকে আসা response কনসোলে চেক করুন সমস্যা বুঝতে
  //         console.log("Approve Response:", res.data);

  //         if (res.data.modifiedCount > 0 || res.data.success) {
  //           Swal.fire({
  //             title: "Approved!",
  //             text: "Order has been moved to Approved list.",
  //             icon: "success",
  //             timer: 1000,
  //             showConfirmButton: false
  //           });
  //           await refetch(); // ডাটা রিফেচ করে লিস্ট আপডেট করবে
  //         } else {
  //            // যদি ডাটাবেজে কোনো পরিবর্তন না হয়
  //            Swal.fire("Info", "No changes made to the order.", "info");
  //         }
  //       } catch (error) {
  //         console.error("Approve Error:", error);
  //         Swal.fire("Error", "Could not approve. Check console.", "error");
  //       }
  //     }
  //   });
  // };
  const handleApprove = async (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You want to approve this order?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#10B981",
        confirmButtonText: "Yes, Approve it!",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                // ১. প্যাচ রিকোয়েস্ট পাঠানো
                const res = await axiosSecure.patch(`/orders/approve/${id}`);

                if (res.data.modifiedCount > 0 || res.data.success) {
                    // ২. প্রথমে ডাটা রিফেচ করা (await দিন)
                    await refetch(); 
                    
                    // ৩. তারপর সাকসেস মেসেজ দেখানো
                    Swal.fire({
                        title: "Approved!",
                        text: "Order list updated.",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false
                    });
                } else {
                    Swal.fire("Info", "Already updated or no changes.", "info");
                }
            } catch (error) {
                console.error("Approve Error:", error);
                Swal.fire("Error", "Check if you have manager/admin access.", "error");
            }
        }
    });
};
  // // ২. Reject Logic with Confirmation
  // const handleReject = async (id) => {
  //   Swal.fire({
  //     title: "Reject Order?",
  //     text: "This will mark the order as Rejected.",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#EF4444",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, Reject it!"
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const res = await axiosSecure.patch(`/orders/reject/${id}`);
  //         if (res.data.modifiedCount > 0) {
  //           Swal.fire({
  //             title: "Rejected!",
  //             text: "The order is now rejected.",
  //             icon: "error",
  //             timer: 1500,
  //             showConfirmButton: false
  //           });
  //           refetch(); // এটিও UI থেকে ডাটা সরিয়ে দেবে
  //         }
  //       } catch (error) {
  //         Swal.fire("Error", "Failed to reject order.", "error");
  //       }
  //     }
  //   });
  // };
  // ১. Approve Logic
 

  // ২. Reject Logic
  const handleReject = async (id) => {
    Swal.fire({
      title: "Reject Order?",
      text: "This will mark the order as Rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, Reject it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/orders/reject/${id}`);
          
          if (res.data.modifiedCount > 0 || res.data.success) {
            Swal.fire({
              title: "Rejected!",
              icon: "error",
              timer: 1000,
              showConfirmButton: false
            });
            
            // রিজেক্ট হওয়ার পর পেন্ডিং লিস্ট থেকে সরাতে এটি কল করুন
            await refetch(); 
          }
        } catch (error) {
          Swal.fire("Error", "Failed to reject.", "error");
        }
      }
    });
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Pending Orders</h2>
          <p className="text-gray-500 text-sm">Action required for incoming orders.</p>
        </div>
        <div className="badge badge-lg bg-orange-100 text-orange-600 border-orange-200 py-4 px-6 font-bold uppercase">
          Pending: {orders.length}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="table w-full font-sans">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-4">Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors border-b last:border-0">
                  <td className="font-mono font-bold text-blue-600">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td>
                    <div className="font-bold">{order.firstName} {order.lastName}</div>
                    <div className="text-[11px] text-gray-400">{order.email}</div>
                  </td>
                  <td className="font-medium">{order.productTitle}</td>
                  <td className="font-bold">{order.quantity}</td>
                  <td>
                    <span className="badge badge-warning text-[10px] font-bold uppercase animate-pulse">
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="flex justify-center gap-3">
                    <Link to={`/dashboard/order-details/${order._id}`} className="btn btn-sm btn-ghost text-blue-500 tooltip" data-tip="View Details">
                      <FaEye size={18} />
                    </Link>
                    <button onClick={() => handleApprove(order._id)} className="btn btn-sm btn-success text-white px-4">
                      <FaCheck /> Approve
                    </button>
                    <button onClick={() => handleReject(order._id)} className="btn btn-sm btn-outline btn-error">
                      <FaTimes /> Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-20 text-gray-400 italic">
                   No pending orders to review.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingOrders;