

// export default AllProducts;
// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router";
// import { FaEdit, FaTrashAlt, FaLayerGroup, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import useAxios from "../../../Hooks/useAxios";

// const AllProducts = () => {
//   const axiosSecure = useAxios();
  
//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 10; // প্রতি পেজে ১০টি করে দেখাবে

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["all-products", currentPage, itemsPerPage],
//     queryFn: async () => {
//       // ব্যাকএন্ডে page এবং size প্যারামিটার পাঠানো হচ্ছে
//       const res = await axiosSecure.get(`/products?page=${currentPage}&size=${itemsPerPage}`);
//       return res.data;
//     },
//   });

//   const products = data?.products || [];
//   const totalCount = data?.total || 0;
  
//   // পেজ সংখ্যা ক্যালকুলেট করা (যেমন: ২২টি ডাটা থাকলে ৩টি পেজ হবে)
//   const numberOfPages = Math.ceil(totalCount / itemsPerPage);
//   const pages = [...Array(numberOfPages).keys()];

//   const handleDelete = async (id) => {
//     const isDark = document.documentElement.classList.contains("dark");
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "Product will be removed!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#ef4444",
//       confirmButtonText: "Yes, delete!",
//       background: isDark ? "#1e293b" : "#fff",
//       color: isDark ? "#fff" : "#000",
//     });

//     if (result.isConfirmed) {
//       try {
//         const res = await axiosSecure.delete(`/products/${id}`);
//         if (res.data.deletedCount > 0) {
//           refetch();
//           Swal.fire("Deleted!", "Product has been deleted.", "success");
//         }
//       } catch (err) {
//         Swal.fire("Error!", "Something went wrong.", "error");
//       }
//     }
//   };

//   const handleToggleHome = async (id, currentStatus) => {
//     try {
//       const res = await axiosSecure.patch(`/products/toggle-home/${id}`, {
//         showOnHome: !currentStatus,
//       });

//       if (res.data.modifiedCount > 0) {
//         refetch();
//         Swal.fire({
//           position: "top-end",
//           title: !currentStatus ? "Added to Home" : "Removed from Home",
//           icon: "success",
//           timer: 1000,
//           showConfirmButton: false,
//           background: document.documentElement.classList.contains("dark") ? "#1e293b" : "#fff",
//         });
//       }
//     } catch (err) {
//       Swal.fire("Error!", "Failed to update", "error");
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-h-screen dark:bg-[#0f172a]">
//         <span className="loading loading-spinner loading-lg text-[#14b8a6]"></span>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] p-3 md:p-8">
//       <div className="max-w-7xl mx-auto">
        
//         <div className="mb-10 text-center">
//           <h2 className="text-2xl md:text-4xl font-black mb-2 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent uppercase">
//             Inventory Management ({totalCount})
//           </h2>
//           <p className="text-slate-500 dark:text-slate-400 font-medium">Page {currentPage + 1} of {numberOfPages}</p>
//         </div>

//         <div className="bg-white dark:bg-[#1e293b] rounded-[1.5rem] shadow-2xl overflow-hidden p-2 md:p-6">
//           <div className="hidden sm:block overflow-x-auto">
//             <table className="table w-full border-separate border-spacing-y-3">
//               <thead>
//                 <tr className="text-slate-400 uppercase text-[10px] font-black">
//                   <th className="py-4 pl-8">Item Info</th>
//                   <th>Price</th>
//                   <th className="text-center">Home Status</th>
//                   <th className="text-right pr-8">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <AnimatePresence mode="wait">
//                   {products.map((product) => (
//                     <motion.tr 
//                       key={product._id} 
//                       initial={{ opacity: 0, y: 10 }} 
//                       animate={{ opacity: 1, y: 0 }} 
//                       exit={{ opacity: 0, x: -20 }}
//                       className="group"
//                     >
//                       <td className="bg-slate-50/50 dark:bg-slate-800/30 rounded-l-[1.5rem] py-4 pl-8">
//                         <div className="flex items-center gap-4">
//                           <img className="w-10 h-10 rounded-xl object-cover" 
//                                src={product.images?.[0] || product.image || 'https://via.placeholder.com/50'} 
//                                alt="" />
//                           <div>
//                             <p className="font-extrabold text-slate-800 dark:text-slate-100 text-sm uppercase">{product.name}</p>
//                             <p className="text-[10px] text-slate-400 font-bold">{product.category}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4 font-black text-teal-500">
//                         ${parseFloat(product.price || 0).toFixed(2)}
//                       </td>
//                       <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4 text-center">
//                         <input 
//                           type="checkbox" 
//                           className="toggle toggle-info"
//                           checked={!!product.showOnHome} 
//                           onChange={() => handleToggleHome(product._id, product.showOnHome)} 
//                         />
//                       </td>
//                       <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4 pr-8 rounded-r-[1.5rem] text-right">
//                         <div className="flex justify-end gap-2">
//                           <Link to={`/dashboard/updateproduct/${product._id}`} className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"><FaEdit /></Link>
//                           <button onClick={() => handleDelete(product._id)} className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"><FaTrashAlt /></button>
//                         </div>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>

//           {products.length === 0 && (
//             <div className="text-center py-20">
//               <FaLayerGroup className="mx-auto text-slate-200 mb-4" size={50} />
//               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Inventory Empty</p>
//             </div>
//           )}

//           {/* Pagination UI */}
//           <div className="flex flex-wrap justify-center items-center gap-2 mt-10 mb-4">
//             <button 
//               onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
//               disabled={currentPage === 0}
//               className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-teal-500 hover:text-white transition-all"
//             >
//               <FaChevronLeft />
//             </button>

//             {pages.map(page => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`w-10 h-10 rounded-xl font-bold transition-all ${
//                   currentPage === page 
//                   ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' 
//                   : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
//                 }`}
//               >
//                 {page + 1}
//               </button>
//             ))}

//             <button 
//               onClick={() => setCurrentPage(prev => Math.min(numberOfPages - 1, prev + 1))}
//               disabled={currentPage === numberOfPages - 1}
//               className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-teal-500 hover:text-white transition-all"
//             >
//               <FaChevronRight />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProducts;
// import React, { useState, useEffect, useRef } from "react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router";
// import { FaEdit, FaTrashAlt, FaLayerGroup, FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
// import useAxios from "../../../Hooks/useAxios";

// const AllProducts = () => {
//   const axiosSecure = useAxios();
  
//   // States
//   const [currentPage, setCurrentPage] = useState(0);
//   const [searchText, setSearchText] = useState(""); // এটি ইনপুট ফিল্ডের জন্য
//   const [searchQuery, setSearchQuery] = useState(""); // এটি API কলের জন্য
//   const itemsPerPage = 10;

//   // Debouncing logic: টাইপিং শেষ হওয়ার ৫০০ মিলি-সেকেন্ড পর সার্চ হবে
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setSearchQuery(searchText);
//       setCurrentPage(0);
//     }, 500);

//     return () => clearTimeout(handler);
//   }, [searchText]);

//   const { data, isLoading, isFetching, refetch } = useQuery({
//     queryKey: ["all-products", currentPage, itemsPerPage, searchQuery],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/products?page=${currentPage}&size=${itemsPerPage}&search=${searchQuery}`);
//       return res.data;
//     },
//   });

//   const products = data?.products || [];
//   const totalCount = data?.total || 0;
//   const numberOfPages = Math.ceil(totalCount / itemsPerPage);
//   const pages = [...Array(numberOfPages).keys()];

//   // Delete, Toggle functions are same as before...
//   const handleDelete = async (id) => { /* ... (আপনার আগের কোড) */ };
//   const handleToggleHome = async (id, currentStatus) => { /* ... (আপনার আগের কোড) */ };

//   return (
//     <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] p-3 md:p-8">
//       <div className="max-w-7xl mx-auto">
        
//         <div className="mb-10 text-center">
//           <h2 className="text-2xl md:text-4xl font-black mb-2 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent uppercase">
//             Inventory Management ({totalCount})
//           </h2>
//         </div>

//         {/* --- Search Bar Section --- */}
//         <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="relative w-full md:w-96">
//             <input
//               type="text"
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               placeholder="Search products by name..."
//               className="w-full pl-12 pr-4 py-3 rounded-2xl border-none bg-white dark:bg-[#1e293b] shadow-lg focus:ring-2 focus:ring-teal-400 dark:text-white transition-all outline-none"
//             />
//             <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            
//             {/* টাইপিং করার সময় ছোট একটি লোডার ইনপুটের ভেতর দেখাবে */}
//             {isFetching && (
//                <span className="absolute right-4 top-1/2 -translate-y-1/2 loading loading-spinner loading-xs text-teal-500"></span>
//             )}
//           </div>
          
//           <div className="text-slate-500 dark:text-slate-400 text-sm font-bold">
//             Showing {products.length} of {totalCount} Products
//           </div>
//         </div>

//         <div className="bg-white dark:bg-[#1e293b] rounded-[1.5rem] shadow-2xl overflow-hidden p-2 md:p-6 relative">
          
//           {/* টেবিল লোডিং অবস্থা */}
//           {isLoading ? (
//             <div className="flex justify-center items-center py-20">
//               <span className="loading loading-spinner loading-lg text-[#14b8a6]"></span>
//             </div>
//           ) : (
//             <div className="hidden sm:block overflow-x-auto">
//               <table className="table w-full border-separate border-spacing-y-3">
//                 <thead>
//                   <tr className="text-slate-400 uppercase text-[10px] font-black">
//                     <th className="py-4 pl-8">Item Info</th>
//                     <th>Price</th>
//                     <th className="text-center">Home Status</th>
//                     <th className="text-right pr-8">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <AnimatePresence mode="popLayout">
//                     {products.map((product) => (
//                       <motion.tr 
//                         key={product._id} 
//                         layout
//                         initial={{ opacity: 0 }} 
//                         animate={{ opacity: 1 }} 
//                         exit={{ opacity: 0 }}
//                         className="group"
//                       >
//                         <td className="bg-slate-50/50 dark:bg-slate-800/30 rounded-l-[1.5rem] py-4 pl-8">
//                           <div className="flex items-center gap-4">
//                             <img className="w-10 h-10 rounded-xl object-cover" 
//                                  src={product.images?.[0] || product.image || 'https://via.placeholder.com/50'} 
//                                  alt="" />
//                             <div>
//                               <p className="font-extrabold text-slate-800 dark:text-slate-100 text-sm uppercase">{product.name}</p>
//                               <p className="text-[10px] text-slate-400 font-bold">{product.category}</p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4 font-black text-teal-500">
//                           ${parseFloat(product.price || 0).toFixed(2)}
//                         </td>
//                         <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4 text-center">
//                           <input 
//                             type="checkbox" 
//                             className="toggle toggle-info"
//                             checked={!!product.showOnHome} 
//                             onChange={() => handleToggleHome(product._id, product.showOnHome)} 
//                           />
//                         </td>
//                         <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4 pr-8 rounded-r-[1.5rem] text-right">
//                           <div className="flex justify-end gap-2">
//                             <Link to={`/dashboard/updateproduct/${product._id}`} className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"><FaEdit /></Link>
//                             <button onClick={() => handleDelete(product._id)} className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"><FaTrashAlt /></button>
//                           </div>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </AnimatePresence>
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {!isLoading && products.length === 0 && (
//             <div className="text-center py-20">
//               <FaLayerGroup className="mx-auto text-slate-200 mb-4" size={50} />
//               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No products found</p>
//             </div>
//           )}

//           {/* Pagination UI same as before... */}
//           {numberOfPages > 1 && (
//             <div className="flex flex-wrap justify-center items-center gap-2 mt-10 mb-4">
//                {/* Pagination buttons logic... */}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProducts;
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { FaEdit, FaTrashAlt, FaLayerGroup, FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";

const AllProducts = () => {
  const axiosSecure = useAxios();
  
  // States
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState(""); // ইনপুট ফিল্ডের জন্য
  const [searchQuery, setSearchQuery] = useState(""); // API কলের জন্য
  const itemsPerPage = 10;

  // Debouncing: টাইপিং শেষ হওয়ার ৫০০ms পর ডাটা ফেচ হবে (ফোকাস ঠিক রাখার জন্য)
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchText);
      setCurrentPage(0); // সার্চ করলে ১ নম্বর পেজে নিয়ে যাবে
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["all-products", currentPage, itemsPerPage, searchQuery],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?page=${currentPage}&size=${itemsPerPage}&search=${searchQuery}`);
      return res.data;
    },
  });

  const products = data?.products || [];
  const totalCount = data?.total || 0;
  
  // Pagination calculation
  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // Delete & Toggle Functions (আগের মতই)
  const handleDelete = async (id) => {
    const isDark = document.documentElement.classList.contains("dark");
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Product will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete!",
      background: isDark ? "#1e293b" : "#fff",
      color: isDark ? "#fff" : "#000",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/products/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Product has been deleted.", "success");
        }
      } catch (err) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const handleToggleHome = async (id, currentStatus) => {
    try {
      const res = await axiosSecure.patch(`/products/toggle-home/${id}`, {
        showOnHome: !currentStatus,
      });

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          title: !currentStatus ? "Added to Home" : "Removed from Home",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          background: document.documentElement.classList.contains("dark") ? "#1e293b" : "#fff",
        });
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to update", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] p-3 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-2 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent uppercase">
            Inventory Management ({totalCount})
          </h2>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-none bg-white dark:bg-[#1e293b] shadow-lg focus:ring-2 focus:ring-teal-400 dark:text-white transition-all outline-none"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            {isFetching && (
               <span className="absolute right-4 top-1/2 -translate-y-1/2 loading loading-spinner loading-xs text-teal-500"></span>
            )}
          </div>
          <div className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">
            Page {currentPage + 1} of {numberOfPages || 1}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-[1.5rem] shadow-2xl overflow-hidden p-2 md:p-6">
          {/* টেবিল লোডিং হলে শুধু টেবিলের ভেতর স্পিনার দেখাবে, পুরো পেজ সরবে না */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <span className="loading loading-spinner loading-lg text-[#14b8a6]"></span>
            </div>
          ) : (
            <div className="hidden sm:block overflow-x-auto">
              <table className="table w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-slate-400 uppercase text-[10px] font-black">
                    <th className="py-4 pl-8">Item Info</th>
                    <th>Price</th>
                    <th className="px-6 py-4">Total Qty</th>
                    <th className="text-center">Home Status</th>
                    <th className="text-right pr-8">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="wait">
                    {products.map((product) => (
                      <motion.tr key={product._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group">
                        <td className="bg-slate-50/50 dark:bg-slate-800/30 rounded-l-[1.5rem] py-4 pl-8">
                          <div className="flex items-center gap-4">
                            <img className="w-10 h-10 rounded-xl object-cover" 
                                 src={product.images?.[0] || product.image || 'https://via.placeholder.com/50'} 
                                 alt="" />
                            <div>
                              <p className="font-extrabold text-slate-800 dark:text-slate-100 text-sm uppercase">{product.name}</p>
                              <p className="text-[10px] text-slate-400 font-bold">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4 font-black text-teal-500">
                          ${parseFloat(product.price || 0).toFixed(2)}
                        </td>
                        {/* Quantity Column */}
      <td className="px-6 py-4">
        <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-3 py-1 rounded-lg font-black text-[11px]">
          {product.availableQuantity}
        </span>
      </td>
                        <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4 text-center">
                          <input 
                            type="checkbox" 
                            className="toggle toggle-info"
                            checked={!!product.showOnHome} 
                            onChange={() => handleToggleHome(product._id, product.showOnHome)} 
                          />
                        </td>
                        <td className="bg-slate-50/50 dark:bg-slate-800/30 py-4 pr-8 rounded-r-[1.5rem] text-right">
                          <div className="flex justify-end gap-2">
                            <Link to={`/dashboard/updateproduct/${product._id}`} className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"><FaEdit /></Link>
                            <button onClick={() => handleDelete(product._id)} className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all"><FaTrashAlt /></button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}

          {products.length === 0 && !isLoading && (
            <div className="text-center py-20">
              <FaLayerGroup className="mx-auto text-slate-200 mb-4" size={50} />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Data Found</p>
            </div>
          )}

          {/* Pagination (আগের স্টাইলটি ফিরে এসেছে) */}
          {numberOfPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-10 mb-4">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-teal-500 hover:text-white transition-all"
              >
                <FaChevronLeft />
              </button>

              {pages.map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl font-bold transition-all ${
                    currentPage === page 
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {page + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(numberOfPages - 1, prev + 1))}
                disabled={currentPage === numberOfPages - 1}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-teal-500 hover:text-white transition-all"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;