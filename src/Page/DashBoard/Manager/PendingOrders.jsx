
// // import { useQuery } from "@tanstack/react-query";

// import useAxios from "../../../Hooks/useAxios";
// // import useAxios from "../../../Hooks/useAxios";

// const PendingOrders = () => {
//     const axiosSecure = useAxios();

//     const { data: orders = [], isLoading } = useQuery({
//         queryKey: ["pendingOrders"],
//         queryFn: async () => {
//             const res = await axiosSecure.get("/orders/pending");
//             return res.data;
//         },
//     });

//     if (isLoading) return <p className="text-center p-10">লোড হচ্ছে...</p>;

//     return (
//         <div className="p-5">
//             <h2 className="text-2xl font-bold mb-4">পেন্ডিং অর্ডার লিস্ট: {orders.length}</h2>
//             <div className="overflow-x-auto border rounded-lg">
//                 <table className="table w-full">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th>Email</th>
//                             <th>Product</th>
//                             <th>Qty</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orders.map((order) => (
//                             <tr key={order._id}>
//                                 <td>{order.email}</td>
//                                 <td>{order.productTitle}</td>
//                                 <td>{order.quantity}</td>
//                                 <td>
//                                     <span className="badge badge-warning">{order.orderStatus}</span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PendingOrders;



// 2nd aita o thik chilo ager

// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxios from "../../../Hooks/useAxios";
// import { Link } from "react-router";
// import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

// const PendingOrders = () => {
//   const axiosSecure = useAxios();

//   const { data: orders = [], refetch, isLoading } = useQuery({
//     queryKey: ["pendingOrders"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/orders/pending");
//       return res.data;
//     },
//   });

//   const handleApprove = async (id) => {
//     Swal.fire({
//       title: "Approve Order?",
//       text: "Confirming will move this to approved status.",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#10B981",
//       confirmButtonText: "Yes, Approve",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await axiosSecure.patch(`/orders/approve/${id}`);
//           if (res.data.modifiedCount > 0) {
//             Swal.fire("Success!", "Order approved successfully.", "success");
//             refetch();
//           }
//         } catch (error) {
//           Swal.fire("Error", "Something went wrong!", "error");
//         }
//       }
//     });
//   };

//   const handleReject = async (id) => {
//     Swal.fire({
//       title: "Reject Order?",
//       text: "This will mark the order as rejected.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#EF4444",
//       confirmButtonText: "Yes, Reject",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await axiosSecure.patch(`/orders/reject/${id}`);
//           if (res.data.modifiedCount > 0) {
//             Swal.fire("Rejected", "Order has been rejected.", "info");
//             refetch();
//           }
//         } catch (error) {
//           Swal.fire("Error", "Something went wrong!", "error");
//         }
//       }
//     });
//   };

//   if (isLoading) return <div className="flex justify-center items-center min-h-[400px]"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

//   return (
//     <div className="p-4 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 min-h-screen">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Pending Orders Management</h2>
//           <p className="text-gray-500 text-sm">Review and manage incoming orders that need approval.</p>
//         </div>
//         <div className="badge badge-lg bg-orange-100 text-orange-600 border-orange-200 py-4 px-6 font-bold uppercase tracking-tight">
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
//               <th>Order Date</th>
//               <th>Status</th> {/* নতুন কলাম */}
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
//                     <div className="text-[11px] text-gray-400 italic font-medium">{order.email}</div>
//                   </td>
//                   <td className="font-medium text-gray-700">{order.productTitle}</td>
//                   <td>
//                     <span className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded">
//                       {order.quantity}
//                     </span>
//                   </td>
//                   <td className="text-gray-500">
//                     {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
//                   </td>
                  
//                   {/* Status Column with Styling */}
//                   <td>
//                     <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px] w-fit uppercase">
//                       <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
//                       {order.orderStatus}
//                     </span>
//                   </td>

//                   <td>
//                     <div className="flex justify-center gap-2">
//                       <Link 
//                         to={`/dashboard/order-details/${order._id}`}
//                         className="btn btn-sm btn-ghost hover:bg-blue-100 text-blue-600 tooltip" 
//                         data-tip="View Details"
//                       >
//                         <FaEye size={16} />
//                       </Link>
                      
//                       <button 
//                         onClick={() => handleApprove(order._id)}
//                         className="btn btn-sm btn-circle btn-success text-white tooltip" 
//                         data-tip="Approve Now"
//                       >
//                         <FaCheck size={14} />
//                       </button>

//                       <button 
//                         onClick={() => handleReject(order._id)}
//                         className="btn btn-sm btn-circle btn-error text-white tooltip" 
//                         data-tip="Reject Order"
//                       >
//                         <FaTimes size={14} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-20 text-gray-400 italic font-medium">
//                   <div className="flex flex-col items-center gap-2">
//                      <span className="text-4xl">📦</span>
//                      <p>Great! No pending orders remaining.</p>
//                   </div>
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



// 3rd

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router"; // react-router-dom ব্যবহার করলে সেটি চেক করে নিন
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";

const PendingOrders = () => {
  const axiosSecure = useAxios();

  const { data: orders = [], refetch, isLoading } = useQuery({
    queryKey: ["pendingOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders/pending");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    Swal.fire({
      title: "Approve Order?",
      text: "Confirming will move this to approved status.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      confirmButtonText: "Yes, Approve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/orders/approve/${id}`);
          if (res.data.modifiedCount > 0) {
            Swal.fire("Success!", "Order approved successfully.", "success");
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      }
    });
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: "Reject Order?",
      text: "This will mark the order as rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, Reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/orders/reject/${id}`);
          if (res.data.modifiedCount > 0) {
            Swal.fire("Rejected", "Order has been rejected.", "info");
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", "Something went wrong!", "error");
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
          <h2 className="text-2xl font-bold text-gray-800">Pending Orders Management</h2>
          <p className="text-gray-500 text-sm">Review incoming orders that need approval.</p>
        </div>
        <div className="badge badge-lg bg-orange-100 text-orange-600 border-orange-200 py-4 px-6 font-bold uppercase">
          Total Pending: {orders.length}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="table w-full">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-4">Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-blue-50/30 transition-colors border-b last:border-0">
                  <td className="font-mono font-bold text-blue-600">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td>
                    <div className="font-bold text-gray-800">{order.firstName} {order.lastName}</div>
                    <div className="text-[11px] text-gray-400 font-medium">{order.email}</div>
                  </td>
                  <td className="font-medium text-gray-700">{order.productTitle}</td>
                  <td>
                    <span className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded">
                      {order.quantity}
                    </span>
                  </td>
                  <td className="text-gray-500">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : 'N/A'}
                  </td>
                  <td>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px] w-fit uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="flex justify-center gap-2">
                    <Link to={`/dashboard/order-details/${order._id}`} className="btn btn-sm btn-ghost text-blue-600">
                      <FaEye size={16} />
                    </Link>
                    <button onClick={() => handleApprove(order._id)} className="btn btn-sm btn-circle btn-success text-white">
                      <FaCheck size={14} />
                    </button>
                    <button onClick={() => handleReject(order._id)} className="btn btn-sm btn-circle btn-error text-white">
                      <FaTimes size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-20 text-gray-400">
                  📦 No pending orders remaining.
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