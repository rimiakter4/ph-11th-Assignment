
// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import Swal from "sweetalert2";
// import useAxios from "../../../Hooks/useAxios";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaEye, FaCheck, FaTimes, FaSearch, FaUndo, FaShoppingCart, FaBoxOpen } from "react-icons/fa";

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

//   // ইমেজ হ্যান্ডেল করার জন্য একটি কমন ফাংশন
//   const getProductImage = (order) => {
//     // ডাটাবেসে যে নামেই থাকুক না কেন এটি খুঁজে বের করবে
//     const imgSource = order.productImage || order.image || (Array.isArray(order.images) ? order.images[0] : order.images);
//     return imgSource || null;
//   };

//   const handleStatusUpdate = async (id, newStatus) => {
//     const result = await Swal.fire({
//       title: "Confirm Change?",
//       text: `Update this order to ${newStatus}?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Update",
//       confirmButtonColor: "#6366f1",
//       background: document.documentElement.classList.contains("dark") ? "#1e293b" : "#fff",
//       color: document.documentElement.classList.contains("dark") ? "#fff" : "#000",
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosSecure.patch(`/orders/${id}`, { status: newStatus.toLowerCase() });
//         Swal.fire({
//           title: "Success!",
//           icon: "success",
//           timer: 1000,
//           showConfirmButton: false,
//           background: document.documentElement.classList.contains("dark") ? "#1e293b" : "#fff",
//         });
//         refetch();
//       } catch (err) {
//         Swal.fire("Error!", "Failed to update", "error");
//       }
//     }
//   };

//   if (isLoading) return (
//     <div className="flex justify-center items-center min-h-screen dark:bg-[#0f172a]">
//       <span className="loading loading-spinner loading-lg text-[#14b8a6]"></span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] p-3 md:p-10 transition-colors duration-500">
//       <div className="max-w-7xl mx-auto">
        
//         {/* --- Header --- */}
//         <div className="mb-10 text-center px-4">
//           <h2 className="text-2xl md:text-5xl font-black mb-3 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent uppercase tracking-tight">
//             Order Control ({orders.length})
//           </h2>
//           <p className="text-slate-400 dark:text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">Manage Customer Shipments</p>
//         </div>

//         {/* --- Filters --- */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
//           <div className="relative w-full md:w-96 group">
//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#14b8a6] transition-colors" />
//             <input
//               type="text"
//               placeholder="Search email or product..."
//               className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#1e293b] border-none shadow-sm focus:ring-2 focus:ring-[#14b8a6] dark:text-white transition-all outline-none text-sm"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//             />
//           </div>
//           <select
//             className="w-full md:w-48 px-4 py-3.5 rounded-2xl bg-white dark:bg-[#1e293b] border-none shadow-sm focus:ring-2 focus:ring-[#14b8a6] dark:text-white outline-none font-bold text-xs uppercase"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="approved">Approved</option>
//             <option value="rejected">Rejected</option>
//           </select>
//         </div>

//         {/* --- Table View --- */}
//         <div className="hidden lg:block bg-white dark:bg-[#1e293b] rounded-[2.5rem] shadow-xl overflow-hidden p-6 border border-transparent dark:border-slate-800">
//           <table className="table w-full border-separate border-spacing-y-3">
//             <thead>
//               <tr className="text-slate-400 dark:text-slate-500 uppercase text-[10px] tracking-widest font-black border-none">
//                 <th className="bg-transparent py-4 pl-8">Item Info</th>
//                 <th className="bg-transparent py-4">Customer</th>
//                 <th className="bg-transparent py-4 text-center">Status</th>
//                 <th className="bg-transparent py-4 text-right pr-8">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <AnimatePresence mode="popLayout">
//                 {orders.map((order) => {
//                   const currentStatus = order.orderStatus?.toLowerCase() || "pending";
//                   const productImage = getProductImage(order);
                  
//                   return (
//                     <motion.tr key={order._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="group">
//                       <td className="bg-slate-50/50 dark:bg-slate-800/20 group-hover:bg-white dark:group-hover:bg-slate-800 rounded-l-[1.5rem] py-5 pl-8 transition-all">
//                         <div className="flex items-center gap-4">
//                           <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[#14b8a6] overflow-hidden ring-2 ring-transparent group-hover:ring-[#14b8a6] transition-all">
//                             {productImage ? (
//                               <img 
//                                 src={productImage} 
//                                 className="w-full h-full object-cover" 
//                                 alt="product"
//                                 onError={(e) => {e.target.src = "https://via.placeholder.com/50"}} 
//                               />
//                             ) : (
//                               <FaBoxOpen size={20} />
//                             )}
//                           </div>
//                           <div>
//                             <p className="font-black text-slate-800 dark:text-slate-100 text-sm uppercase truncate max-w-[200px]">{order.productTitle || "Unknown Product"}</p>
//                             <p className="text-[10px] text-blue-500 font-mono font-bold">ID: #{order._id.slice(-6).toUpperCase()}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="bg-slate-50/50 dark:bg-slate-800/20 group-hover:bg-white dark:group-hover:bg-slate-800 py-5">
//                         <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{order.email}</p>
//                         <p className="text-[10px] text-slate-400 font-bold uppercase">Qty: {order.quantity || 1}</p>
//                       </td>
//                       <td className="bg-slate-50/50 dark:bg-slate-800/20 group-hover:bg-white dark:group-hover:bg-slate-800 py-5 text-center">
//                         <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
//                           currentStatus === "approved" ? "bg-green-100 text-green-600 dark:bg-green-900/30" :
//                           currentStatus === "pending" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30" :
//                           "bg-red-100 text-red-600 dark:bg-red-900/30"
//                         }`}>
//                           {currentStatus}
//                         </span>
//                       </td>
//                       <td className="bg-slate-50/50 dark:bg-slate-800/20 group-hover:bg-white dark:group-hover:bg-slate-800 py-5 pr-8 rounded-r-[1.5rem] text-right">
//                         <div className="flex justify-end gap-2">
//                           <Link to={`/dashboard/orderDetails/${order._id}`} className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"><FaEye size={14} /></Link>
//                           {currentStatus === "pending" && (
//                             <button onClick={() => handleStatusUpdate(order._id, "approved")} className="p-3 rounded-xl bg-green-50 dark:bg-green-900/40 text-green-500 hover:bg-green-500 hover:text-white transition-all"><FaCheck size={14} /></button>
//                           )}
//                           {currentStatus !== "rejected" && (
//                             <button onClick={() => handleStatusUpdate(order._id, "rejected")} className="p-3 rounded-xl bg-red-50 dark:bg-red-900/40 text-red-500 hover:bg-red-500 hover:text-white transition-all"><FaTimes size={14} /></button>
//                           )}
//                           {currentStatus !== "pending" && (
//                             <button onClick={() => handleStatusUpdate(order._id, "pending")} className="p-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-500 hover:bg-slate-500 hover:text-white transition-all"><FaUndo size={12} /></button>
//                           )}
//                         </div>
//                       </td>
//                     </motion.tr>
//                   );
//                 })}
//               </AnimatePresence>
//             </tbody>
//           </table>
//         </div>

//         {/* --- Mobile View (Image Added Here) --- */}
//         <div className="lg:hidden flex flex-col gap-4">
//           {orders.map((order) => {
//              const currentStatus = order.orderStatus?.toLowerCase() || "pending";
//              const productImage = getProductImage(order);
//              return (
//               <div key={order._id} className="bg-white dark:bg-[#1e293b] p-5 rounded-[2rem] border dark:border-slate-800 shadow-lg">
//                 <div className="flex items-center gap-4 mb-4">
//                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#14b8a6] overflow-hidden">
//                       {productImage ? (
//                         <img src={productImage} className="w-full h-full object-cover" alt="product" />
//                       ) : (
//                         <FaBoxOpen size={24} />
//                       )}
//                    </div>
//                    <div className="flex-1">
//                       <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs truncate">{order.productTitle || "Unknown Item"}</h3>
//                       <p className="text-[10px] text-blue-500 font-bold">ID: #{order._id.slice(-6).toUpperCase()}</p>
//                    </div>
//                 </div>
//                 <div className="flex justify-between items-center pt-4 border-t dark:border-slate-800">
//                   <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg ${
//                           currentStatus === "approved" ? "bg-green-100 text-green-600" :
//                           currentStatus === "pending" ? "bg-amber-100 text-amber-600" :
//                           "bg-red-100 text-red-600"
//                         }`}>{currentStatus}</span>
//                   <div className="flex gap-2">
//                     <Link to={`/dashboard/orderDetails/${order._id}`} className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-500"><FaEye size={14} /></Link>
//                     {currentStatus === "pending" && (
//                         <button onClick={() => handleStatusUpdate(order._id, 'approved')} className="p-2.5 rounded-lg bg-green-50 dark:bg-green-900/40 text-green-500"><FaCheck size={14} /></button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//              )
//           })}
//         </div>

//         {/* --- Empty State --- */}
//         {orders.length === 0 && (
//           <div className="text-center py-20 bg-white dark:bg-[#1e293b] rounded-[2.5rem]">
//             <FaShoppingCart className="mx-auto text-slate-200 dark:text-slate-700 mb-4" size={40} />
//             <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No orders found</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllOrders;
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaCheck, FaTimes, FaSearch, FaUndo, FaShoppingCart, FaBoxOpen } from "react-icons/fa";

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

  const getProductImage = (order) => {
    const imgSource = order.productImage || order.image || (Array.isArray(order.images) ? order.images[0] : order.images);
    return imgSource || null;
  };

  const handleStatusUpdate = async (id, newStatus) => {
    const isDark = document.documentElement.classList.contains("dark");
    const result = await Swal.fire({
      title: "Confirm Change?",
      text: `Update this order to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      confirmButtonColor: "#14b8a6",
      cancelButtonColor: "#ef4444",
      background: isDark ? "#1e293b" : "#fff",
      color: isDark ? "#fff" : "#000",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/orders/${id}`, { status: newStatus.toLowerCase() });
        Swal.fire({
          title: "Updated!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          background: isDark ? "#1e293b" : "#fff",
        });
        refetch();
      } catch (err) {
        Swal.fire("Error!", "Failed to update", "error");
      }
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen dark:bg-[#020617]">
      <span className="loading loading-spinner loading-lg text-[#14b8a6]"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] p-4 md:p-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-3 bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent uppercase tracking-tighter">
            Order Control ({orders.length})
          </h2>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] md:text-sm font-bold uppercase tracking-[0.4em]">Manage Customer Shipments</p>
        </div>

        {/* --- Filters --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-10">
          <div className="relative w-full md:w-96 group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
            <input
              type="text"
              placeholder="Search email or product..."
              className="w-full border-none pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-[#0f172a] shadow-md shadow-slate-200/50 dark:shadow-none focus:ring-2 focus:ring-teal-500/50 dark:text-white transition-all outline-none text-sm"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <select
            className="w-full md:w-56 px-4 py-4 rounded-2xl bg-white dark:bg-[#0f172a] shadow-md shadow-slate-200/50 dark:shadow-none border-none focus:ring-2 focus:ring-teal-500/50 dark:text-white outline-none font-black text-xs uppercase cursor-pointer"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">🟡 Pending</option>
            <option value="approved">🟢 Approved</option>
            <option value="rejected">🔴 Rejected</option>
          </select>
        </div>

        {/* --- Desktop View --- */}
        <div className="hidden lg:block bg-white dark:bg-[#0f172a] rounded-[2.5rem] shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden p-8 border-none dark:border dark:border-slate-800/50">
          <table className="table w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="text-slate-400 dark:text-slate-500 uppercase text-[11px] tracking-widest font-black border-none">
                <th className="bg-transparent pb-4 pl-10">Product</th>
                <th className="bg-transparent pb-4">Customer</th>
                <th className="bg-transparent pb-4 text-center">Status</th>
                <th className="bg-transparent pb-4 text-right pr-10">Control</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {orders.map((order) => {
                  const currentStatus = order.orderStatus?.toLowerCase() || "pending";
                  // const productImage = getProductImage(order);
                  return (
                    <motion.tr key={order._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group">
                      <td className="bg-slate-50 dark:bg-slate-800/40 group-hover:bg-teal-50/30 dark:group-hover:bg-teal-900/10 rounded-l-3xl py-6 pl-10 transition-colors">
                        <div className="flex items-center gap-5">
                          {/* <img 
                            src={productImage || "https://via.placeholder.com/100"} 
                            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-700 group-hover:ring-teal-400 transition-all" 
                            alt=""
                          /> */}
                          <div>
                            <p className="font-bold text-slate-800 dark:text-slate-100 text-sm uppercase truncate max-w-[180px]">{order.productTitle}</p>
                            <p className="text-[10px] text-teal-600 font-black">#{order._id.slice(-6).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="bg-slate-50 dark:bg-slate-800/40 group-hover:bg-teal-50/30 dark:group-hover:bg-teal-900/10 py-6">
                        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{order.email}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase">QTY: {order.quantity || 1}</p>
                      </td>
                      <td className="bg-slate-50 dark:bg-slate-800/40 group-hover:bg-teal-50/30 dark:group-hover:bg-teal-900/10 py-6 text-center">
                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter shadow-sm ${
                          currentStatus === "approved" ? "bg-green-500 text-white" :
                          currentStatus === "pending" ? "bg-amber-500 text-white" : "bg-red-500 text-white"
                        }`}>
                          {currentStatus}
                        </span>
                      </td>
                      <td className="bg-slate-50 dark:bg-slate-800/40 group-hover:bg-teal-50/30 dark:group-hover:bg-teal-900/10 py-6 pr-10 rounded-r-3xl text-right">
                        <div className="flex justify-end gap-3">
                          <Link to={`/dashboard/orderDetails/${order._id}`} className="p-3 rounded-2xl bg-white dark:bg-slate-900 text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white transition-all transform hover:-translate-y-1"><FaEye size={16} /></Link>
                          {currentStatus === "pending" && (
                            <button onClick={() => handleStatusUpdate(order._id, "approved")} className="p-3 rounded-2xl bg-white dark:bg-slate-900 text-green-500 shadow-sm hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-1"><FaCheck size={16} /></button>
                          )}
                          {currentStatus !== "rejected" && (
                            <button onClick={() => handleStatusUpdate(order._id, "rejected")} className="p-3 rounded-2xl bg-white dark:bg-slate-900 text-red-500 shadow-sm hover:bg-red-500 hover:text-white transition-all transform hover:-translate-y-1"><FaTimes size={16} /></button>
                          )}
                          {currentStatus !== "pending" && (
                            <button onClick={() => handleStatusUpdate(order._id, "pending")} className="p-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-500 shadow-sm hover:bg-slate-500 hover:text-white transition-all transform hover:-translate-y-1"><FaUndo size={14} /></button>
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

        {/* --- Mobile Card View --- */}
        <div className="lg:hidden flex flex-col gap-6">
          {orders.map((order) => {
             const currentStatus = order.orderStatus?.toLowerCase() || "pending";
            //  const productImage = getProductImage(order);
             return (
              <div key={order._id} className="bg-white dark:bg-[#0f172a] p-6 rounded-[2.5rem] shadow-lg shadow-slate-200/40 dark:shadow-none border-none dark:border dark:border-slate-800">
                <div className="flex items-center gap-5 mb-5">
                   {/* <img src={productImage || "https://via.placeholder.com/100"} className="w-16 h-16 rounded-2xl object-cover" alt="" /> */}
                   <div className="flex-1">
                      <h3 className="font-black text-slate-800 dark:text-white uppercase text-sm leading-tight mb-1">{order.productTitle}</h3>
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] text-teal-600 font-black">#{order._id.slice(-6).toUpperCase()}</p>
                        <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-lg ${
                          currentStatus === "approved" ? "bg-green-500 text-white" :
                          currentStatus === "pending" ? "bg-amber-500 text-white" : "bg-red-500 text-white"
                        }`}>{currentStatus}</span>
                      </div>
                   </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl mb-5">
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1 truncate">{order.email}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">QTY: {order.quantity || 1}</p>
                </div>

                {/* Mobile All Buttons Always Visible */}
                <div className="flex justify-center gap-2 pt-2">
                  <Link to={`/dashboard/orderDetails/${order._id}`} className="flex-1 flex justify-center items-center py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500"><FaEye size={16} /></Link>
                  
                  {currentStatus === "pending" && (
                    <button onClick={() => handleStatusUpdate(order._id, 'approved')} className="flex-1 flex justify-center items-center py-3 rounded-xl bg-green-50 dark:bg-green-500/10 text-green-500"><FaCheck size={16} /></button>
                  )}
                  
                  {currentStatus !== "rejected" && (
                    <button onClick={() => handleStatusUpdate(order._id, 'rejected')} className="flex-1 flex justify-center items-center py-3 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500"><FaTimes size={16} /></button>
                  )}

                  {currentStatus !== "pending" && (
                    <button onClick={() => handleStatusUpdate(order._id, 'pending')} className="flex-1 flex justify-center items-center py-3 rounded-xl bg-slate-100 dark:bg-slate-700/30 text-slate-500"><FaUndo size={14} /></button>
                  )}
                </div>
              </div>
             )
          })}
        </div>

        {/* --- Empty State --- */}
        {orders.length === 0 && (
          <div className="text-center py-32 bg-white dark:bg-[#0f172a] rounded-[3rem] shadow-sm border-none">
            <FaShoppingCart className="mx-auto text-slate-200 dark:text-slate-800 mb-6" size={80} />
            <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-xs">No orders in queue</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;