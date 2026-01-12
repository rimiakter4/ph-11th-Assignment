
// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../../Hooks/useAxios";
// import useAuth from "../../../Hooks/useAuth"; 
// import Swal from "sweetalert2";
// import { FaTruck, FaHistory, FaBox, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

// const ApprovedOrders = () => {
//   const axiosSecure = useAxios();
//   const { user } = useAuth(); 
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [trackingHistory, setTrackingHistory] = useState([]);

//   // ১. ম্যানেজারের Approved অর্ডারগুলো ফেচ করা
//   // const { data: orders = [], isLoading, refetch } = useQuery({
//   //   queryKey: ["approved-orders", user?.email],
//   //   queryFn: async () => {
//   //     const res = await axiosSecure.get(`/allorders?status=approved&email=${user?.email}`);
//   //     return res.data;
//   //   },
//   //   enabled: !!user?.email,
//   // });
//   // ১. শুধুমাত্র Approved অর্ডারগুলো ফেচ করা
// const { data: orders = [], isLoading, refetch } = useQuery({
//   queryKey: ["approved-orders", user?.email],
//   queryFn: async () => {
//     // এখানে status=approved পাঠানো হচ্ছে
//     const res = await axiosSecure.get(`/allorders?status=approved`); 
//     return res.data;
//   },
//   enabled: !!user?.email,
// });

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

//   // ৩. নতুন ট্র্যাকিং ডাটা সেভ করার সম্পূর্ণ ফাংশন
//   const handleAddTracking = async (e) => {
//     e.preventDefault();
//     const form = e.target;
    
//     // ডাটা অবজেক্ট তৈরি
//     const trackingInfo = {
//       orderId: selectedOrder._id,
//       status: form.status.value,
//       location: form.location.value,
//       note: form.note.value,
//       updatedAt: new Date().toISOString(),
//     };

//     try {
//       const res = await axiosSecure.post("/tracking", trackingInfo);
      
//       // যদি ডাটা সফলভাবে সেভ হয়
//       if (res.data.insertedId || res.status === 200) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Update Saved!',
//           text: `Current Status: ${form.status.value}`,
//           timer: 1500,
//           showConfirmButton: false
//         });

//         // ফর্ম রিসেট এবং মডাল বন্ধ করা
//         form.reset();
//         document.getElementById("add_tracking_modal").close();
        
//         // লিস্ট রিফ্রেশ করা (যদি প্রয়োজন হয়)
//         refetch();
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to add tracking update", "error");
//     }
//   };

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
//                <p className="text-gray-400 italic font-medium">No approved orders found.</p>
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
//                   <select name="status" className="select select-bordered rounded-xl w-full" required defaultValue="">
//                     <option value="" disabled>Select Stage</option>
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
import { FaTruck, FaHistory, FaBox, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaTimes } from "react-icons/fa";

const ApprovedOrders = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth(); 
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingHistory, setTrackingHistory] = useState([]);

  // ১. শুধুমাত্র Approved অর্ডারগুলো ফেচ করা
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["approved-orders", user?.email],
    queryFn: async () => {
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

  // ৩. ট্র্যাকিং ডাটা সেভ করা
  const handleAddTracking = async (e) => {
    e.preventDefault();
    const form = e.target;
    const isDark = document.documentElement.classList.contains("dark");
    
    const trackingInfo = {
      orderId: selectedOrder._id,
      status: form.status.value,
      location: form.location.value,
      note: form.note.value,
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/tracking", trackingInfo);
      if (res.data.insertedId || res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Update Saved!',
          timer: 1500,
          showConfirmButton: false,
          background: isDark ? "#1e293b" : "#fff",
          color: isDark ? "#fff" : "#000",
        });
        form.reset();
        document.getElementById("add_tracking_modal").close();
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to add tracking update", "error");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen dark:bg-[#020617]">
      <span className="loading loading-spinner loading-lg text-green-500"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] p-4 md:p-8 lg:p-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
            Production <span className="text-green-500">&</span> Tracking
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Manage progress for approved orders</p>
        </header>

        {/* --- Desktop Table View --- */}
        <div className="hidden md:block bg-white dark:bg-[#0f172a] rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="table w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-green-500">
                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-wider">Order</th>
                <th className="py-5 text-[11px] font-black uppercase tracking-wider">Buyer</th>
                <th className="py-5 text-[11px] font-black uppercase tracking-wider">Product</th>
                <th className="py-5 text-center text-[11px] font-black uppercase tracking-wider">Qty</th>
                <th className="py-5 text-right px-6 text-[11px] font-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6 font-mono text-[10px] font-black text-blue-600 dark:text-blue-400">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                        <FaUser size={12} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{order.firstName} {order.lastName}</div>
                        <div className="text-[10px] text-slate-400">{order.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{order.productTitle}</div>
                    <div className="text-[9px] text-slate-400 flex items-center gap-1 mt-1 font-medium">
                       <FaCalendarAlt size={8}/> {new Date(order.updatedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 text-center font-black text-slate-600 dark:text-slate-400 text-xs">{order.quantity || 1}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => { setSelectedOrder(order); document.getElementById("add_tracking_modal").showModal(); }}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-[10px] font-black uppercase transition-all shadow-lg shadow-green-500/20"
                      >
                        <FaTruck className="inline mr-1" /> Update
                      </button>
                      <button 
                        onClick={() => fetchTrackingHistory(order._id)}
                        className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
                      >
                        <FaHistory size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Mobile Card View --- */}
        <div className="md:hidden flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white dark:bg-[#0f172a] p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <span className="font-mono font-black text-blue-600 text-[10px]">#{order._id.slice(-6).toUpperCase()}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{new Date(order.updatedAt).toLocaleDateString()}</span>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase leading-tight">{order.productTitle}</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">Buyer: {order.firstName} ({order.quantity || 1} units)</p>
              
              <div className="grid grid-cols-2 gap-2 mt-5">
                <button 
                  onClick={() => { setSelectedOrder(order); document.getElementById("add_tracking_modal").showModal(); }}
                  className="flex justify-center items-center gap-2 py-3 rounded-2xl bg-green-500 text-white text-[10px] font-black uppercase"
                >
                  <FaTruck /> Update
                </button>
                <button 
                  onClick={() => fetchTrackingHistory(order._id)}
                  className="flex justify-center items-center gap-2 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase"
                >
                  <FaHistory /> Timeline
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- Empty State --- */}
        {orders.length === 0 && (
          <div className="text-center py-24 bg-white dark:bg-[#0f172a] rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
            <FaBox className="mx-auto text-slate-200 dark:text-slate-800 mb-4" size={50} />
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No approved orders found</p>
          </div>
        )}
      </div>

      {/* --- Modal 1: Add Tracking --- */}
      <dialog id="add_tracking_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-[2.5rem] p-8 bg-white dark:bg-[#0f172a] dark:text-white border dark:border-slate-800">
          <h3 className="font-black text-2xl uppercase tracking-tighter">Update Stage</h3>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1 mb-8">Ref: {selectedOrder?.productTitle}</p>
          
          <form onSubmit={handleAddTracking} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label text-[10px] font-black uppercase text-slate-400">Process Stage</label>
                  <select name="status" className="select select-bordered rounded-2xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-2 ring-green-500 outline-none transition-all" required defaultValue="">
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
                  <label className="label text-[10px] font-black uppercase text-slate-400">Current Location</label>
                  <input name="location" type="text" placeholder="e.g. Factory Floor A" className="input input-bordered rounded-2xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800" required />
                </div>
            </div>
            
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase text-slate-400">Production Notes</label>
              <textarea name="note" className="textarea textarea-bordered rounded-2xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-24" placeholder="Mention specific details..."></textarea>
            </div>

            <div className="flex gap-3 pt-4">
              <button type="submit" className="flex-1 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all">Save Update</button>
              <button type="button" className="px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl font-black uppercase text-xs transition-all" onClick={() => document.getElementById("add_tracking_modal").close()}>Cancel</button>
            </div>
          </form>
        </div>
      </dialog>

      {/* --- Modal 2: Timeline View --- */}
      <dialog id="view_tracking_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-md rounded-[2.5rem] bg-white dark:bg-[#0f172a] p-8 border dark:border-slate-800">
          <div className="flex justify-between items-center mb-10">
              <h3 className="font-black text-2xl uppercase tracking-tighter dark:text-white">Production Journey</h3>
              <button onClick={() => document.getElementById("view_tracking_modal").close()} className="p-2 text-slate-400 hover:text-red-500 transition-all"><FaTimes/></button>
          </div>
          
          <div className="relative border-l-2 border-dashed border-slate-200 dark:border-slate-800 ml-3 space-y-8">
            {trackingHistory.length > 0 ? (
              trackingHistory.map((step, index) => (
                <div key={index} className="relative pl-8">
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-[#0f172a] shadow-sm ${index === 0 ? "bg-green-500 ring-4 ring-green-500/20" : "bg-slate-300 dark:bg-slate-700"}`}></div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="font-black text-slate-800 dark:text-slate-200 leading-tight uppercase text-[10px] tracking-widest">{step.status}</p>
                    <p className="text-[9px] text-slate-400 font-mono mt-1">{new Date(step.updatedAt).toLocaleString()}</p>
                    <div className="mt-3 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                      <p className="flex items-center gap-1 font-bold"><FaMapMarkerAlt className="text-red-400" size={10}/> {step.location}</p>
                      {step.note && <p className="italic bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-100 dark:border-slate-800">"{step.note}"</p>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">No production updates yet.</p>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApprovedOrders;