// import { motion } from "framer-motion";

// export default function Inventory() {
//   return (
//     <motion.div
//       initial={{ y: 30, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.4 }}
//       className="p-8 min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-100"
//     >
//       <h2 className="text-2xl font-bold mb-6">Inventory Management</h2>

//       <div className="space-y-4">
//         <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow flex justify-between">
//           <span>🧶 Fabric Stock</span>
//           <span className="text-red-500 font-semibold">Low</span>
//         </div>

//         <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow flex justify-between">
//           <span>🔘 Buttons</span>
//           <span className="text-green-500 font-semibold">Sufficient</span>
//         </div>

//         <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow flex justify-between">
//           <span>🧵 Threads</span>
//           <span className="text-yellow-500 font-semibold">Medium</span>
//         </div>
//       </div>

//       <p className="mt-6 text-indigo-500">
//         🤖 AI Suggestion: Reorder fabric within 2 days to avoid production delay.
//       </p>
//     </motion.div>
//   );
// }
// import { motion } from "framer-motion";
// import { FaBoxes, FaExclamationTriangle, FaCheckCircle, FaChartLine } from "react-icons/fa";

// export default function Inventory() {
//   // এই ডাটাগুলো পরবর্তীতে API থেকে আসবে
//   const inventoryItems = [
//     { id: 1, name: "Fabric Stock", category: "Raw Material", status: "Low", icon: "🧶", color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
//     { id: 2, name: "Buttons", category: "Accessories", status: "Sufficient", icon: "🔘", color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
//     { id: 3, name: "Threads", category: "Raw Material", status: "Medium", icon: "🧵", color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="p-4 md:p-8 min-h-screen bg-gray-50 dark:bg-[#020617] text-gray-800 dark:text-gray-100 transition-colors duration-300"
//     >
//       {/* Header Section */}
//       <div className="mb-10">
//         <h2 className="text-3xl font-black uppercase tracking-tight flex items-center gap-3">
//           <FaBoxes className="text-indigo-600" /> Inventory <span className="text-indigo-600">Overview</span>
//         </h2>
//         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time stock monitoring and resource management.</p>
//       </div>

//       {/* Stats Cards - Quick Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Items</p>
//               <h4 className="text-2xl font-black mt-1">1,240</h4>
//             </div>
//             <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600">
//               <FaBoxes size={20} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Low Stock Alert</p>
//               <h4 className="text-2xl font-black mt-1 text-red-500">03</h4>
//             </div>
//             <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-xl text-red-500">
//               <FaExclamationTriangle size={20} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Updates Today</p>
//               <h4 className="text-2xl font-black mt-1 text-green-500">12</h4>
//             </div>
//             <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl text-green-500">
//               <FaCheckCircle size={20} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* AI Suggestion Box */}
//       <motion.div 
//         initial={{ x: -20, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.3 }}
//         className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/20 flex items-center gap-4"
//       >
//         <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
//           <FaChartLine size={24} />
//         </div>
//         <div>
//           <h5 className="font-bold text-sm uppercase tracking-wide">AI Smart Suggestion</h5>
//           <p className="text-sm opacity-90">Fabric stock is critically low. Reorder within <span className="font-bold underline">2 days</span> to avoid a 15% production delay.</p>
//         </div>
//       </motion.div>

//       {/* Inventory List / Table */}
//       <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
//         <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex justify-between items-center">
//           <h3 className="font-bold text-lg">Stock Details</h3>
//           <button className="text-xs font-bold text-indigo-600 uppercase hover:underline">View All</button>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50 dark:bg-gray-900/50 text-[10px] uppercase font-black text-gray-400 tracking-widest">
//               <tr>
//                 <th className="px-6 py-4">Item Name</th>
//                 <th className="px-6 py-4">Category</th>
//                 <th className="px-6 py-4">Status</th>
//                 <th className="px-6 py-4 text-right">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
//               {inventoryItems.map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
//                   <td className="px-6 py-5">
//                     <div className="flex items-center gap-3">
//                       <span className="text-xl">{item.icon}</span>
//                       <span className="text-sm font-bold">{item.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.category}</span>
//                   </td>
//                   <td className="px-6 py-5">
//                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.bg} ${item.color}`}>
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-5 text-right">
//                     <button className="text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-400 transition-colors">
//                       Update Stock
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
// import { motion } from "framer-motion";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../Hooks/useAxios";
// import { FaBoxes, FaExclamationTriangle, FaChartLine } from "react-icons/fa";

// export default function Inventory() {
//   const axiosSecure = useAxios();

//   const { data, isLoading } = useQuery({
//     queryKey: ["inventoryData"],
//     queryFn: async () => {
//       // আপনার API যদি '/products' হয়, তবে সেটি চেক করুন
//       const res = await axiosSecure.get('/products'); 
//       return res.data;
//     },
//   });

//   // --- ডাটা ফরম্যাট ফিক্সিং ---
//   // যদি data এর ভেতর products থাকে তবে সেটি নিবে, নয়তো সরাসরি data নিবে। 
//   // শেষে [] দেওয়ার মানে হলো শুরুতে এরর হ্যান্ডেল করা।
//   const allItems = data?.products || (Array.isArray(data) ? data : []);

//   // এখন calculations সেফলি কাজ করবে
//   const totalStock = allItems.reduce((acc, curr) => acc + (Number(curr.availableQuantity) || 0), 0);
//   const lowStockItems = allItems.filter(item => (item.availableQuantity || 0) < 5);
//   const outOfStockItems = allItems.filter(item => (item.availableQuantity || 0) === 0);

//   if (isLoading) return (
//     <div className="flex justify-center items-center min-h-screen dark:bg-[#020617]">
//       <span className="loading loading-spinner loading-lg text-indigo-600"></span>
//     </div>
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="p-8 min-h-screen bg-gray-50 dark:bg-[#020617] text-gray-800 dark:text-gray-100 transition-colors"
//     >
//       <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">
//         Inventory <span className="text-indigo-600">Management</span>
//       </h2>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
//           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Unit Stock</p>
//           <h4 className="text-2xl font-black mt-1">{totalStock}</h4>
//         </div>

//         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
//           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-orange-500">Low Stock Alerts</p>
//           <h4 className="text-2xl font-black mt-1 text-orange-500">{lowStockItems.length}</h4>
//         </div>

//         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
//           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-red-500">Out of Stock</p>
//           <h4 className="text-2xl font-black mt-1 text-red-600">{outOfStockItems.length}</h4>
//         </div>
//       </div>

//       {/* AI Suggestion */}
//       {lowStockItems.length > 0 && (
//         <div className="mb-10 p-5 rounded-2xl bg-indigo-600 text-white shadow-lg flex items-center gap-4">
//           <FaChartLine size={24} />
//           <p className="text-sm">
//             🤖 AI Alert: You have <span className="font-bold">{lowStockItems.length} items</span> running low. Consider restocking soon.
//           </p>
//         </div>
//       )}

//       {/* Inventory Table */}
//       <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50 dark:bg-gray-900/50 text-[10px] uppercase font-black text-gray-400 tracking-widest">
//               <tr>
//                 <th className="px-6 py-4">Product Name</th>
//                 <th className="px-6 py-4">Stock Qty</th>
//                 <th className="px-6 py-4">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
//               {allItems.map((product) => (
//                 <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all">
//                   <td className="px-6 py-4 font-bold text-sm">{product.name}</td>
//                   <td className="px-6 py-4 text-sm">{product.availableQuantity || 0}</td>
//                   <td className="px-6 py-4">
//                     {product.availableQuantity === 0 ? (
//                       <span className="text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-lg text-[9px] font-black uppercase">Out of Stock</span>
//                     ) : product.availableQuantity < 5 ? (
//                       <span className="text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-lg text-[9px] font-black uppercase">Low Stock</span>
//                     ) : (
//                       <span className="text-green-500 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-lg text-[9px] font-black uppercase">Sufficient</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { FaBoxes, FaChartLine, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Inventory() {
  const axiosSecure = useAxios();
  
  // Search এবং Pagination এর জন্য স্টেট
  const [displaySearch, setDisplaySearch] = useState(""); 
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const size = 10; // প্রতি পেজে কয়টি আইটেম দেখাবে

  // Debounce logic: টাইপ করার ৫০০ মিলি-সেকেন্ড পর সার্চ হবে
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(displaySearch);
      setPage(1); // নতুন সার্চ করলে ১ম পেজে ফিরে যাবে
    }, 500);
    return () => clearTimeout(handler);
  }, [displaySearch]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["inventoryData", search, page],
    queryFn: async () => {
      // এপিআই-তে সার্চ এবং পেজিনেশন প্যারামিটার পাঠানো হচ্ছে
      const res = await axiosSecure.get(`/products?search=${search}&page=${page - 1}&size=${size}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const allItems = data?.products || [];
  const totalProducts = data?.total || 0;
  const totalPages = Math.ceil(totalProducts / size) || 1;

  // ক্যালকুলেশন (সামারি কার্ডের জন্য)
  const totalStock = allItems.reduce((acc, curr) => acc + (Number(curr.availableQuantity) || 0), 0);
  const lowStockItems = allItems.filter(item => (item.availableQuantity || 0) < 5);
  const outOfStockItems = allItems.filter(item => (item.availableQuantity || 0) === 0);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen dark:bg-[#020617]">
      <span className="loading loading-spinner loading-lg text-indigo-600"></span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 min-h-screen bg-gray-50 dark:bg-[#020617] text-gray-800 dark:text-gray-100 transition-colors"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter">
          Inventory <span className="text-indigo-600">Management</span>
        </h2>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={displaySearch}
            onChange={(e) => setDisplaySearch(e.target.value)}
            placeholder="Search by product name..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Page Stock Total</p>
          <h4 className="text-2xl font-black mt-1">{totalStock}</h4>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">Low Stock (Page)</p>
          <h4 className="text-2xl font-black mt-1 text-orange-500">{lowStockItems.length}</h4>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Out of Stock</p>
          <h4 className="text-2xl font-black mt-1 text-red-600">{outOfStockItems.length}</h4>
        </div>
      </div>

      {/* Table Section */}
      <div className={`bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-opacity ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-[10px] uppercase font-black text-gray-400 tracking-widest">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Stock Qty</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {allItems.length > 0 ? allItems.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all">
                  <td className="px-6 py-4 font-bold text-sm">{product.name}</td>
                  <td className="px-6 py-4 text-sm">{product.availableQuantity || 0}</td>
                  <td className="px-6 py-4">
                    {product.availableQuantity === 0 ? (
                      <span className="text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-lg text-[9px] font-black uppercase">Out of Stock</span>
                    ) : product.availableQuantity < 5 ? (
                      <span className="text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-lg text-[9px] font-black uppercase">Low Stock</span>
                    ) : (
                      <span className="text-green-500 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-lg text-[9px] font-black uppercase">Sufficient</span>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="text-center py-10 text-gray-500 italic">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 disabled:opacity-30 hover:text-indigo-600 transition-all"
          >
            <FaChevronLeft size={14} />
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num + 1)}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                  page === num + 1
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "bg-white dark:bg-slate-800 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {num + 1}
              </button>
            ))}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 disabled:opacity-30 hover:text-indigo-600 transition-all"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      )}
    </motion.div>
  );
}