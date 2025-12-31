// import React, { useState } from "react";

// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../../Hooks/useAxios";
// import Swal from "sweetalert2";
// import { FaTruck, FaHistory, FaSearch } from "react-icons/fa";

// const ApproveOrders = () => {
//   const axiosSecure = useAxios();
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [trackingStatus, setTrackingStatus] = useState("Cutting Completed");
//   const [trackingNote, setTrackingNote] = useState("");

//   // ১. শুধুমাত্র Approved অর্ডারগুলো ফেচ করা
//   const { data: orders = [], isLoading, refetch } = useQuery({
//     queryKey: ["approved-orders"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/allorders?status=approved`);
//       return res.data;
//     },
//   });

//   // ২. ট্র্যাকিং আপডেট সেভ করার ফাংশন
//   const handleAddTracking = async (e) => {
//     e.preventDefault();
//     const trackingData = {
//       orderId: selectedOrder._id,
//       status: trackingStatus,
//       note: trackingNote,
//       updatedAt: new Date().toISOString(),
//     };

//     try {
//       await axiosSecure.post("/tracking", trackingData);
//       Swal.fire("Success!", "Tracking status updated.", "success");
//       document.getElementById("tracking_modal").close();
//       setTrackingNote("");
//       refetch();
//     } catch (err) {
//       Swal.fire("Error!", "Could not update tracking.", "error");
//     }
//   };

//   if (isLoading) return <div className="p-20 text-center"><span className="loading loading-spinner loading-lg"></span></div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-green-700 mb-8 uppercase text-center">Approved Orders & Production Tracking</h2>

//         <div className="overflow-x-auto bg-white rounded-xl shadow-md">
//           <table className="table w-full">
//             <thead className="bg-green-600 text-white text-center">
//               <tr>
//                 <th>Order ID</th>
//                 <th className="text-left">Product</th>
//                 <th>Qty</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-center font-medium">
//               {orders.map((order) => (
//                 <tr key={order._id} className="hover:bg-green-50">
//                   <td className="font-mono text-xs">#{order._id.slice(-6).toUpperCase()}</td>
//                   <td className="text-left">
//                     <p className="font-bold">{order.productTitle}</p>
//                     <p className="text-[10px] text-gray-400">{order.email}</p>
//                   </td>
//                   <td>{order.quantity || 1}</td>
//                   <td>
//                     <span className="badge badge-success text-white badge-sm uppercase">{order.orderStatus}</span>
//                   </td>
//                   <td className="flex justify-center gap-2">
//                     {/* Add Tracking Button */}
//                     <button 
//                       onClick={() => {
//                         setSelectedOrder(order);
//                         document.getElementById("tracking_modal").showModal();
//                       }}
//                       className="btn btn-sm btn-outline btn-success gap-2"
//                     >
//                       <FaTruck /> Update
//                     </button>
                    
//                     {/* View History Button */}
//                     <button className="btn btn-sm btn-ghost bg-gray-100 text-gray-600 shadow-sm">
//                       <FaHistory />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- Tracking Modal --- */}
//       <dialog id="tracking_modal" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg text-blue-700 mb-4">Add Production Update</h3>
//           <form onSubmit={handleAddTracking}>
//             <div className="space-y-4">
//               {/* স্ট্যাটাস ড্রপডাউন */}
//               <div>
//                 <label className="label font-bold">Current Process:</label>
//                 <select 
//                   className="select select-bordered w-full"
//                   value={trackingStatus}
//                   onChange={(e) => setTrackingStatus(e.target.value)}
//                 >
//                   <option>Cutting Completed</option>
//                   <option>Sewing Started</option>
//                   <option>Finishing/QC Checked</option>
//                   <option>Packed</option>
//                   <option>Shipped</option>
//                   <option>Out for Delivery</option>
//                 </select>
//               </div>

//               {/* নোট ইনপুট */}
//               <div>
//                 <label className="label font-bold">Notes (Optional):</label>
//                 <textarea 
//                   className="textarea textarea-bordered w-full" 
//                   placeholder="Ex: Fabric cutting done, moving to sewing."
//                   value={trackingNote}
//                   onChange={(e) => setTrackingNote(e.target.value)}
//                 ></textarea>
//               </div>
//             </div>

//             <div className="modal-action">
//               <button type="submit" className="btn btn-primary">Save Update</button>
//               <button type="button" className="btn" onClick={() => document.getElementById("tracking_modal").close()}>Close</button>
//             </div>
//           </form>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default ApproveOrders;
// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../../Hooks/useAxios";
// import Swal from "sweetalert2";
// import { FaTruck, FaHistory, FaBox, FaDotCircle } from "react-icons/fa";

// const ApprovedOrders = () => {
//   const axiosSecure = useAxios();
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [trackingHistory, setTrackingHistory] = useState([]);

//   // ১. এপ্রুভড অর্ডারগুলো ফেচ করা
//   const { data: orders = [], isLoading, refetch } = useQuery({
//     queryKey: ["approved-orders"],
//     queryFn: async () => {
//       // ব্যাকএন্ডে Case-Insensitive করা হয়েছে তাই 'approved' পাঠালেই সব আসবে
//       const res = await axiosSecure.get(`/allorders?status=approved`);
//       return res.data;
//     },
//   });

//   // ২. ট্র্যাকিং স্ট্যাটাস সেভ করার ফাংশন
//   const handleTrackingUpdate = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const status = form.status.value;
//     const note = form.note.value;

//     const trackingData = {
//       orderId: selectedOrder._id,
//       status,
//       note,
//       updatedAt: new Date().toISOString(),
//     };

//     try {
//       await axiosSecure.post("/tracking", trackingData);
//       Swal.fire("Updated!", `Status set to ${status}`, "success");
//       form.reset();
//       document.getElementById("tracking_modal").close();
//     } catch (err) {
//       Swal.fire("Error!", "Failed to update tracking", "error");
//     }
//   };

//   // ৩. নির্দিষ্ট অর্ডারের টাইমলাইন দেখার ফাংশন
//   const showTimeline = async (orderId) => {
//     try {
//       const res = await axiosSecure.get(`/tracking/${orderId}`);
//       setTrackingHistory(res.data);
//       document.getElementById("timeline_modal").showModal();
//     } catch (err) {
//       Swal.fire("Error!", "Could not load timeline", "error");
//     }
//   };

//   if (isLoading) return <div className="p-20 text-center"><span className="loading loading-spinner loading-lg"></span></div>;

//   return (
//     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//           <FaBox className="text-green-600" /> Approved Production Orders
//         </h2>

//         {/* --- Table --- */}
//         <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
//           <table className="table w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th>Order ID</th>
//                 <th>Product Info</th>
//                 <th>Quantity</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id} className="hover:bg-gray-50 transition">
//                   <td className="font-mono text-xs text-blue-600 font-bold">
//                     #{order._id.slice(-6).toUpperCase()}
//                   </td>
//                   <td>
//                     <div className="font-bold">{order.productTitle}</div>
//                     <div className="text-xs text-gray-500">{order.email}</div>
//                   </td>
//                   <td className="font-semibold">{order.quantity || 1} Pcs</td>
//                   <td className="flex justify-center gap-2">
//                     <button 
//                       onClick={() => { setSelectedOrder(order); document.getElementById("tracking_modal").showModal(); }}
//                       className="btn btn-sm btn-success text-white"
//                     >
//                       <FaTruck /> Update Status
//                     </button>
//                     <button 
//                       onClick={() => showTimeline(order._id)}
//                       className="btn btn-sm btn-outline btn-info"
//                     >
//                       <FaHistory /> View Timeline
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- Modal 1: Add Tracking --- */}
//       <dialog id="tracking_modal" className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg mb-4">Update Production Progress</h3>
//           <form onSubmit={handleTrackingUpdate} className="space-y-4">
//             <div className="form-control">
//               <label className="label font-semibold">Select Current Stage:</label>
//               <select name="status" className="select select-bordered w-full" required>
//                 <option>Cutting Completed</option>
//                 <option>Sewing Started</option>
//                 <option>Finishing/QC Checked</option>
//                 <option>Packed</option>
//                 <option>Shipped</option>
//                 <option>Out for Delivery</option>
//               </select>
//             </div>
//             <div className="form-control">
//               <label className="label font-semibold">Notes (Optional):</label>
//               <textarea name="note" className="textarea textarea-bordered h-24" placeholder="Mention any details..."></textarea>
//             </div>
//             <div className="modal-action">
//               <button type="submit" className="btn btn-primary px-8">Save</button>
//               <button type="button" className="btn" onClick={() => document.getElementById("tracking_modal").close()}>Close</button>
//             </div>
//           </form>
//         </div>
//       </dialog>

//       {/* --- Modal 2: Timeline View --- */}
//       <dialog id="timeline_modal" className="modal">
//         <div className="modal-box max-w-md">
//           <h3 className="font-bold text-xl mb-6 border-b pb-2">Production Timeline</h3>
//           <div className="relative border-l-2 border-green-500 ml-4 space-y-8">
//             {trackingHistory.length > 0 ? trackingHistory.map((item, index) => (
//               <div key={index} className="relative pl-8">
//                 <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ${index === 0 ? 'bg-green-600 ring-4 ring-green-100' : 'bg-gray-300'}`}></div>
//                 <div>
//                   <p className="font-bold text-gray-800 uppercase text-sm">{item.status}</p>
//                   <p className="text-[10px] text-gray-500 font-mono">{new Date(item.updatedAt).toLocaleString()}</p>
//                   {item.note && <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-2 rounded italic">"{item.note}"</p>}
//                 </div>
//               </div>
//             )) : <p className="pl-8 text-gray-400 italic">No updates added yet.</p>}
//           </div>
//           <div className="modal-action">
//             <button className="btn" onClick={() => document.getElementById("timeline_modal").close()}>Close</button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };


// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../../Hooks/useAxios";
// import Swal from "sweetalert2";
// import { FaTruck, FaHistory, FaUser, FaBox, FaCalendarAlt } from "react-icons/fa";

// const ApprovedOrders = () => {
//   const axiosSecure = useAxios();
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [trackingHistory, setTrackingHistory] = useState([]);

//   // ১. শুধুমাত্র Approved অর্ডারগুলো ফেচ করা
//   const { data: orders = [], isLoading, refetch } = useQuery({
//     queryKey: ["approved-orders"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/allorders?status=approved`);
//       return res.data;
//     },
//   });

//   // ২. ট্র্যাকিং হিস্ট্রি লোড করা
//   const fetchTrackingHistory = async (orderId) => {
//     try {
//       const res = await axiosSecure.get(`/tracking/${orderId}`);
//       setTrackingHistory(res.data);
//       document.getElementById("view_tracking_modal").showModal();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ৩. নতুন ট্র্যাকিং ডাটা সেভ করা
//   const handleAddTracking = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const trackingInfo = {
//       orderId: selectedOrder._id,
//       status: form.status.value,
//       location: form.location.value,
//       note: form.note.value,
//       updatedAt: new Date().toISOString(),
//     };

//     try {
//       await axiosSecure.post("/tracking", trackingInfo);
//       Swal.fire("Success!", "Tracking update added.", "success");
//       form.reset();
//       document.getElementById("add_tracking_modal").close();
//     } catch (err) {
//       Swal.fire("Error", "Failed to add tracking", "error");
//     }
//   };

//   if (isLoading) return <div className="p-10 text-center text-2xl font-bold">Loading Approved Orders...</div>;

//   return (
//     <div className="p-6 bg-base-200 min-h-screen">
//       <h2 className="text-3xl font-extrabold mb-8 text-gray-800 border-l-8 border-green-500 pl-4">
//         APPROVED ORDERS & PRODUCTION
//       </h2>

//       <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
//         <table className="table w-full">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th>Order ID</th>
//               <th>User</th>
//               <th>Product</th>
//               <th>Quantity</th>
//               <th>Approved Date</th>
//               <th className="text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id} className="hover:bg-gray-50 border-b">
//                 <td className="font-mono text-sm font-bold text-blue-600">
//                   #{order._id.slice(-6).toUpperCase()}
//                 </td>
//                 <td>
//                   <div className="flex items-center gap-2">
//                     <FaUser className="text-gray-400" />
//                     <div>
//                       <p className="font-bold">{order.firstName} {order.lastName}</p>
//                       <p className="text-xs text-gray-500">{order.email}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="font-semibold text-gray-700">{order.productTitle}</td>
//                 <td className="text-center font-bold">{order.quantity || 1}</td>
//                 <td>
//                   <div className="flex items-center gap-2 text-gray-500">
//                     <FaCalendarAlt />
//                     {new Date(order.updatedAt).toLocaleDateString()}
//                   </div>
//                 </td>
//                 <td className="flex justify-center gap-3">
//                   <button 
//                     onClick={() => { setSelectedOrder(order); document.getElementById("add_tracking_modal").showModal(); }}
//                     className="btn btn-sm btn-success text-white"
//                   >
//                     <FaTruck /> Add Tracking
//                   </button>
//                   <button 
//                     onClick={() => fetchTrackingHistory(order._id)}
//                     className="btn btn-sm btn-outline btn-info"
//                   >
//                     <FaHistory /> View Tracking
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* --- Modal 1: Add Tracking Update --- */}
//       <dialog id="add_tracking_modal" className="modal">
//         <div className="modal-box w-11/12 max-w-lg">
//           <h3 className="font-bold text-xl mb-4 text-green-700">New Tracking Update</h3>
//           <form onSubmit={handleAddTracking} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="form-control">
//                 <label className="label font-bold">Status</label>
//                 <select name="status" className="select select-bordered" required>
//                   <option>Cutting Completed</option>
//                   <option>Sewing Started</option>
//                   <option>Finishing/QC Checked</option>
//                   <option>Packed</option>
//                   <option>Shipped</option>
//                   <option>Out for Delivery</option>
//                 </select>
//               </div>
//               <div className="form-control">
//                 <label className="label font-bold">Location</label>
//                 <input name="location" type="text" placeholder="Ex: Factory Floor A" className="input input-bordered" required />
//               </div>
//             </div>
//             <div className="form-control">
//               <label className="label font-bold">Notes</label>
//               <textarea name="note" className="textarea textarea-bordered h-24" placeholder="Detail about this stage..."></textarea>
//             </div>
//             <div className="modal-action">
//               <button type="submit" className="btn btn-primary px-8">Update Status</button>
//               <button type="button" className="btn" onClick={() => document.getElementById("add_tracking_modal").close()}>Cancel</button>
//             </div>
//           </form>
//         </div>
//       </dialog>

//       {/* --- Modal 2: View Tracking Timeline --- */}
//       <dialog id="view_tracking_modal" className="modal">
//         <div className="modal-box max-w-md">
//           <h3 className="font-bold text-2xl mb-8 border-b pb-2">Production Movement</h3>
//           <div className="relative border-l-4 border-green-500 ml-6 space-y-10">
//             {trackingHistory.length > 0 ? (
//               trackingHistory.map((step, index) => (
//                 <div key={index} className="relative pl-10">
//                   <div className={`absolute -left-[14px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-md ${index === 0 ? "bg-green-600 ring-4 ring-green-100" : "bg-gray-300"}`}></div>
//                   <div className="bg-white p-3 rounded-lg border shadow-sm">
//                     <p className="font-black text-gray-800 uppercase text-xs tracking-wider">{step.status}</p>
//                     <p className="text-[10px] text-gray-400 font-mono mb-2">{new Date(step.updatedAt).toLocaleString()}</p>
//                     <p className="text-xs text-gray-600 bg-gray-50 p-2 border-l-2 border-blue-400">
//                       <span className="font-bold">Loc:</span> {step.location} <br/>
//                       {step.note && <span className="italic mt-1 block">"{step.note}"</span>}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-400 italic text-center py-10">No tracking history found.</p>
//             )}
//           </div>
//           <div className="modal-action mt-8">
//             <button className="btn w-full" onClick={() => document.getElementById("view_tracking_modal").close()}>Close</button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default ApprovedOrders;
// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../../Hooks/useAxios";
// import useAuth from "../../../Hooks/useAuth"; // আপনার Auth Hook ইমপোর্ট করুন
// import Swal from "sweetalert2";
// import { FaTruck, FaHistory, FaUser, FaBox, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

// const ApprovedOrders = () => {
//   const axiosSecure = useAxios();
//   const { user } = useAuth(); // বর্তমানে লগইন করা ম্যানেজারের ডাটা
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [trackingHistory, setTrackingHistory] = useState([]);

//   // ১. শুধুমাত্র এই ম্যানেজারের Approved অর্ডারগুলো ফেচ করা
//   const { data: orders = [], isLoading, refetch } = useQuery({
//     queryKey: ["approved-orders", user?.email],
//     queryFn: async () => {
//       // ব্যাকএন্ডে email এবং status পাঠানো হচ্ছে
//       const res = await axiosSecure.get(`/allorders?status=approved&email=${user?.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email, // ইমেইল না পাওয়া পর্যন্ত ডাটা কল হবে না
//   });

//   // ২. ট্র্যাকিং হিস্ট্রি লোড করা
//   const fetchTrackingHistory = async (orderId) => {
//     try {
//       const res = await axiosSecure.get(`/tracking/${orderId}`);
//       setTrackingHistory(res.data);
//       document.getElementById("view_tracking_modal").showModal();
//     } catch (err) {
//       Swal.fire("Error", "Could not fetch tracking history", "error");
//     }
//   };

//   // ৩. নতুন ট্র্যাকিং ডাটা সেভ করা
// //   const handleAddTracking = async (e) => {
// //     e.preventDefault();
// //     const form = e.target;
// //     const trackingInfo = {
// //       orderId: selectedOrder._id,
// //       status: form.status.value,
// //       location: form.location.value,
// //       note: form.note.value,
// //       updatedAt: new Date().toISOString(),
// //     };

// //     try {
// //       await axiosSecure.post("/tracking", trackingInfo);
// //       Swal.fire({
// //         icon: 'success',
// //         title: 'Update Saved',
// //         text: `Production status set to: ${form.status.value}`,
// //         timer: 2000
// //       });
// //       form.reset();
// //       document.getElementById("add_tracking_modal").close();
// //     } catch (err) {
// //       Swal.fire("Error", "Failed to add tracking update", "error");
// //     }
// //   };
// const handleAddTracking = async (e) => {
//   e.preventDefault();
//   const form = e.target;
//   const trackingInfo = {
//     orderId: selectedOrder._id, // এই আইডিটিই বায়ার পেজে useParams দিয়ে ধরা হয়
//     status: form.status.value,
//     location: form.location.value, // এই ভ্যালুটি ঠিকমতো যাচ্ছে কি না চেক করুন
//     note: form.note.value,
//     updatedAt: new Date().toISOString(),
//   };

//   await axiosSecure.post("/tracking", trackingInfo);
//   // ... বাকি কোড
// };

//   if (isLoading) return (
//     <div className="flex justify-center items-center min-h-[400px]">
//       <span className="loading loading-spinner loading-lg text-green-600"></span>
//     </div>
//   );

//   return (
//     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-10">
//           <h2 className="text-3xl font-black text-slate-800 uppercase border-l-8 border-green-500 pl-4">
//             Production & Tracking
//           </h2>
//           <p className="text-slate-500 mt-1">Manage progress for your approved product orders</p>
//         </header>

//         {/* --- Orders Table --- */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//           <table className="table w-full border-collapse">
//             <thead className="bg-slate-900 text-white uppercase text-xs">
//               <tr>
//                 <th className="py-5 px-6">Order ID</th>
//                 <th>Buyer Info</th>
//                 <th>Product</th>
//                 <th className="text-center">Qty</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100 font-medium">
//               {orders.map((order) => (
//                 <tr key={order._id} className="hover:bg-slate-50 transition-colors">
//                   <td className="py-4 px-6 font-mono text-xs font-bold text-blue-600">
//                     #{order._id.slice(-6).toUpperCase()}
//                   </td>
//                   <td>
//                     <div className="flex items-center gap-3">
//                       <div className="avatar placeholder">
//                         <div className="bg-neutral text-neutral-content rounded-full w-8">
//                           <span>{order.firstName?.[0]}</span>
//                         </div>
//                       </div>
//                       <div>
//                         <div className="text-sm font-bold text-slate-800">{order.firstName} {order.lastName}</div>
//                         <div className="text-[10px] text-slate-400">{order.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     <div className="text-sm font-bold text-slate-700">{order.productTitle}</div>
//                     <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
//                        <FaCalendarAlt /> {new Date(order.updatedAt).toLocaleDateString()}
//                     </div>
//                   </td>
//                   <td className="text-center font-bold text-slate-600">{order.quantity || 1}</td>
//                   <td>
//                     <div className="flex justify-center gap-2">
//                       <button 
//                         onClick={() => { setSelectedOrder(order); document.getElementById("add_tracking_modal").showModal(); }}
//                         className="btn btn-sm btn-success text-white rounded-lg shadow-sm"
//                       >
//                         <FaTruck /> Update
//                       </button>
//                       <button 
//                         onClick={() => fetchTrackingHistory(order._id)}
//                         className="btn btn-sm btn-outline btn-info rounded-lg"
//                       >
//                         <FaHistory /> Timeline
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {orders.length === 0 && (
//             <div className="p-20 text-center">
//                <FaBox className="mx-auto text-gray-200 mb-4" size={50} />
//                <p className="text-gray-400 italic font-medium">No approved orders found for your products.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- Modal 1: Add Tracking --- */}
//       <dialog id="add_tracking_modal" className="modal modal-bottom sm:modal-middle">
//         <div className="modal-box rounded-3xl p-8">
//           <h3 className="font-black text-2xl text-slate-800 mb-2">Update Stage</h3>
//           <p className="text-slate-500 mb-6 text-sm italic">Tracking for: {selectedOrder?.productTitle}</p>
          
//           <form onSubmit={handleAddTracking} className="space-y-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="form-control">
//                   <label className="label text-slate-700 font-bold">Process</label>
//                   <select name="status" className="select select-bordered rounded-xl w-full" required>
//                     <option>Cutting Completed</option>
//                     <option>Sewing Started</option>
//                     <option>Finishing/QC Checked</option>
//                     <option>Packed</option>
//                     <option>Shipped</option>
//                     <option>Out for Delivery</option>
//                   </select>
//                 </div>
//                 <div className="form-control">
//                   <label className="label text-slate-700 font-bold">Location</label>
//                   <input name="location" type="text" placeholder="Factory Floor A" className="input input-bordered rounded-xl" required />
//                 </div>
//             </div>
            
//             <div className="form-control">
//               <label className="label text-slate-700 font-bold">Production Notes</label>
//               <textarea name="note" className="textarea textarea-bordered rounded-xl h-24" placeholder="Mention any specific details..."></textarea>
//             </div>

//             <div className="modal-action gap-3">
//               <button type="submit" className="btn btn-primary flex-1 rounded-xl">Save Status</button>
//               <button type="button" className="btn flex-1 rounded-xl" onClick={() => document.getElementById("add_tracking_modal").close()}>Cancel</button>
//             </div>
//           </form>
//         </div>
//       </dialog>

//       {/* --- Modal 2: Timeline View --- */}
//       <dialog id="view_tracking_modal" className="modal">
//         <div className="modal-box max-w-md rounded-3xl border shadow-2xl">
//           <div className="flex justify-between items-center mb-10">
//              <h3 className="font-black text-2xl text-slate-800">Production Journey</h3>
//              <button onClick={() => document.getElementById("view_tracking_modal").close()} className="btn btn-sm btn-circle btn-ghost">✕</button>
//           </div>
          
//           <div className="relative border-l-2 border-dashed border-green-200 ml-6 space-y-10">
//             {trackingHistory.length > 0 ? (
//               trackingHistory.map((step, index) => (
//                 <div key={index} className="relative pl-10">
//                   <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-4 border-white shadow-md ${index === 0 ? "bg-green-500 ring-4 ring-green-100" : "bg-gray-400"}`}></div>
//                   <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
//                     <p className="font-black text-slate-800 leading-tight uppercase text-[11px] tracking-widest">{step.status}</p>
//                     <p className="text-[10px] text-slate-400 font-mono mt-1">{new Date(step.updatedAt).toLocaleString()}</p>
//                     <div className="mt-3 text-xs text-slate-600 space-y-1">
//                       <p className="flex items-center gap-1 font-bold"><FaMapMarkerAlt className="text-red-400"/> {step.location}</p>
//                       {step.note && <p className="italic bg-white p-2 rounded-lg border border-slate-50">"{step.note}"</p>}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-10">
//                 <p className="text-slate-400 italic">No production updates yet.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default ApprovedOrders;
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth"; 
import Swal from "sweetalert2";
import { FaTruck, FaHistory, FaBox, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const ApprovedOrders = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth(); 
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingHistory, setTrackingHistory] = useState([]);

  // ১. ম্যানেজারের Approved অর্ডারগুলো ফেচ করা
  // const { data: orders = [], isLoading, refetch } = useQuery({
  //   queryKey: ["approved-orders", user?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/allorders?status=approved&email=${user?.email}`);
  //     return res.data;
  //   },
  //   enabled: !!user?.email,
  // });
  // ১. শুধুমাত্র Approved অর্ডারগুলো ফেচ করা
const { data: orders = [], isLoading, refetch } = useQuery({
  queryKey: ["approved-orders", user?.email],
  queryFn: async () => {
    // এখানে status=approved পাঠানো হচ্ছে
    const res = await axiosSecure.get(`/allorders?status=approved`); 
    return res.data;
  },
  enabled: !!user?.email,
});

  // ২. ট্র্যাকিং হিস্ট্রি লোড করা
  const fetchTrackingHistory = async (orderId) => {
    try {
      const res = await axiosSecure.get(`/tracking/${orderId}`);
      setTrackingHistory(res.data);
      document.getElementById("view_tracking_modal").showModal();
    } catch (err) {
      Swal.fire("Error", "Could not fetch tracking history", "error");
    }
  };

  // ৩. নতুন ট্র্যাকিং ডাটা সেভ করার সম্পূর্ণ ফাংশন
  const handleAddTracking = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    // ডাটা অবজেক্ট তৈরি
    const trackingInfo = {
      orderId: selectedOrder._id,
      status: form.status.value,
      location: form.location.value,
      note: form.note.value,
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/tracking", trackingInfo);
      
      // যদি ডাটা সফলভাবে সেভ হয়
      if (res.data.insertedId || res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Update Saved!',
          text: `Current Status: ${form.status.value}`,
          timer: 1500,
          showConfirmButton: false
        });

        // ফর্ম রিসেট এবং মডাল বন্ধ করা
        form.reset();
        document.getElementById("add_tracking_modal").close();
        
        // লিস্ট রিফ্রেশ করা (যদি প্রয়োজন হয়)
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add tracking update", "error");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <span className="loading loading-spinner loading-lg text-green-600"></span>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-slate-800 uppercase border-l-8 border-green-500 pl-4">
            Production & Tracking
          </h2>
          <p className="text-slate-500 mt-1">Manage progress for your approved product orders</p>
        </header>

        {/* --- Orders Table --- */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <table className="table w-full border-collapse">
            <thead className="bg-slate-900 text-white uppercase text-xs">
              <tr>
                <th className="py-5 px-6">Order ID</th>
                <th>Buyer Info</th>
                <th>Product</th>
                <th className="text-center">Qty</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-mono text-xs font-bold text-blue-600">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                          <span>{order.firstName?.[0]}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{order.firstName} {order.lastName}</div>
                        <div className="text-[10px] text-slate-400">{order.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm font-bold text-slate-700">{order.productTitle}</div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                       <FaCalendarAlt /> {new Date(order.updatedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="text-center font-bold text-slate-600">{order.quantity || 1}</td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => { setSelectedOrder(order); document.getElementById("add_tracking_modal").showModal(); }}
                        className="btn btn-sm btn-success text-white rounded-lg shadow-sm"
                      >
                        <FaTruck /> Update
                      </button>
                      <button 
                        onClick={() => fetchTrackingHistory(order._id)}
                        className="btn btn-sm btn-outline btn-info rounded-lg"
                      >
                        <FaHistory /> Timeline
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="p-20 text-center">
               <FaBox className="mx-auto text-gray-200 mb-4" size={50} />
               <p className="text-gray-400 italic font-medium">No approved orders found.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- Modal 1: Add Tracking --- */}
      <dialog id="add_tracking_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-3xl p-8">
          <h3 className="font-black text-2xl text-slate-800 mb-2">Update Stage</h3>
          <p className="text-slate-500 mb-6 text-sm italic">Tracking for: {selectedOrder?.productTitle}</p>
          
          <form onSubmit={handleAddTracking} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label text-slate-700 font-bold">Process</label>
                  <select name="status" className="select select-bordered rounded-xl w-full" required defaultValue="">
                    <option value="" disabled>Select Stage</option>
                    <option>Cutting Completed</option>
                    <option>Sewing Started</option>
                    <option>Finishing/QC Checked</option>
                    <option>Packed</option>
                    <option>Shipped</option>
                    <option>Out for Delivery</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label text-slate-700 font-bold">Location</label>
                  <input name="location" type="text" placeholder="Factory Floor A" className="input input-bordered rounded-xl" required />
                </div>
            </div>
            
            <div className="form-control">
              <label className="label text-slate-700 font-bold">Production Notes</label>
              <textarea name="note" className="textarea textarea-bordered rounded-xl h-24" placeholder="Mention any specific details..."></textarea>
            </div>

            <div className="modal-action gap-3">
              <button type="submit" className="btn btn-primary flex-1 rounded-xl">Save Status</button>
              <button type="button" className="btn flex-1 rounded-xl" onClick={() => document.getElementById("add_tracking_modal").close()}>Cancel</button>
            </div>
          </form>
        </div>
      </dialog>

      {/* --- Modal 2: Timeline View --- */}
      <dialog id="view_tracking_modal" className="modal">
        <div className="modal-box max-w-md rounded-3xl border shadow-2xl">
          <div className="flex justify-between items-center mb-10">
             <h3 className="font-black text-2xl text-slate-800">Production Journey</h3>
             <button onClick={() => document.getElementById("view_tracking_modal").close()} className="btn btn-sm btn-circle btn-ghost">✕</button>
          </div>
          
          <div className="relative border-l-2 border-dashed border-green-200 ml-6 space-y-10">
            {trackingHistory.length > 0 ? (
              trackingHistory.map((step, index) => (
                <div key={index} className="relative pl-10">
                  <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-4 border-white shadow-md ${index === 0 ? "bg-green-500 ring-4 ring-green-100" : "bg-gray-400"}`}></div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="font-black text-slate-800 leading-tight uppercase text-[11px] tracking-widest">{step.status}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">{new Date(step.updatedAt).toLocaleString()}</p>
                    <div className="mt-3 text-xs text-slate-600 space-y-1">
                      <p className="flex items-center gap-1 font-bold"><FaMapMarkerAlt className="text-red-400"/> {step.location}</p>
                      {step.note && <p className="italic bg-white p-2 rounded-lg border border-slate-50">"{step.note}"</p>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-400 italic">No production updates yet.</p>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApprovedOrders;