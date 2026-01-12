
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { motion } from "framer-motion";
// import { Link } from "react-router";
// import useAxios from "../../../Hooks/useAxios"; 
// import useAuth from "../../../Hooks/useAuth"; // লগইন করা ইউজারকে পাওয়ার জন্য

// const ManageProducts = () => {
//   const axiosSecure = useAxios();
//   const { user } = useAuth(); // ইউজার ইমেইল এখান থেকে আসবে

//   // ১. শুধুমাত্র বর্তমান ম্যানেজারের প্রোডাক্ট নিয়ে আসার কুয়েরি
//   const { data: products = [], isLoading, refetch, isError, error } = useQuery({
//     queryKey: ["my-products", user?.email],
//     queryFn: async () => {
//       if (!user?.email) return [];
//       // ব্যাকএন্ডে ইমেইল পাঠিয়ে ডাটা আনা
//       const res = await axiosSecure.get(`/all-products/${user?.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email, // ইউজার লোড না হওয়া পর্যন্ত কল হবে না
//   });

//   // ২. প্রোডাক্ট ডিলিট ফাংশন
//   const handleDelete = async (id) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         const res = await axiosSecure.delete(`/products/${id}`);
//         if (res.data.deletedCount > 0) {
//           refetch(); 
//           Swal.fire("Deleted!", "Product has been deleted.", "success");
//         }
//       } catch (err) {
//         Swal.fire("Error!", "Something went wrong while deleting.", "error");
//       }
//     }
//   };

//   // ৩. হোম পেজে দেখানো বা লুকানোর ফাংশন (Toggle)
//   const handleToggleHome = async (id, currentStatus) => {
//     try {
//       const res = await axiosSecure.patch(`/products/toggle-home/${id}`, {
//         showOnHome: !currentStatus, 
//       });

//       if (res.data.modifiedCount > 0) {
//         refetch(); 
//         Swal.fire({
//           position: "top-end",
//           title: !currentStatus ? "Visible on Home Page" : "Hidden from Home Page",
//           icon: "success",
//           timer: 1000,
//           showConfirmButton: false,
//         });
//       }
//     } catch (err) {
//       Swal.fire("Error!", "Failed to update status", "error");
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="loading loading-spinner loading-lg text-indigo-600"></span>
//       </div>
//     );

//   if (isError)
//     return (
//       <p className="text-center text-red-500 mt-20 font-bold">
//         Error: {error.message}
//       </p>
//     );

//   return (
//     <div className="p-4 md:p-10 bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center uppercase tracking-widest">
//           My Inventory Management ({products.length})
//         </h2>

//         <div className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-100 bg-white">
//           <table className="table w-full">
//             <thead className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white">
//               <tr>
//                 <th className="py-4 px-6">Product</th>
//                 <th className="py-4">Price</th>
//                 <th className="py-4">Category</th>
//                 <th className="py-4">Seller Email</th>
//                 <th className="py-4 text-center">Show on Home</th>
//                 <th className="py-4 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {products.map((product) => (
//                 <motion.tr
//                   key={product._id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="hover:bg-indigo-50/50 transition border-b border-gray-100"
//                 >
//                   <td className="p-4">
//                     <div className="flex items-center gap-4">
//                       <div className="avatar">
//                         <div className="mask mask-squircle w-14 h-14 ring ring-indigo-100 ring-offset-2">
//                           <img
//                             src={Array.isArray(product.images) ? product.images[0] : product.images}
//                             alt={product.name}
//                             onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="font-bold text-gray-800">{product.name}</div>
//                         <div className="text-[10px] opacity-50 uppercase font-mono">{product._id.slice(-8)}</div>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="p-4 font-bold text-green-600">
//                     ${parseFloat(product.price).toFixed(2)}
//                   </td>

//                   <td className="p-4">
//                     <span className="badge badge-ghost border-indigo-200 text-indigo-700 font-medium px-3 py-3 capitalize">
//                       {product.category}
//                     </span>
//                   </td>

//                   <td className="p-4 text-sm text-gray-500">
//                     {product.sellerEmail}
//                   </td>

//                   <td className="p-4 text-center">
//                     <input
//                       type="checkbox"
//                       className="toggle toggle-primary toggle-md"
//                       checked={!!product.showOnHome} 
//                       onChange={() => handleToggleHome(product._id, product.showOnHome)}
//                     />
//                   </td>

//                   <td className="p-4">
//                     <div className="flex justify-center gap-3">
//                       <Link to={`/dashboard/updateproduct/${product._id}`}>
//                         <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 border-none text-white shadow-md">
//                           Update
//                         </button>
//                       </Link>

//                       <button
//                         onClick={() => handleDelete(product._id)}
//                         className="btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white shadow-md"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>

//           {products.length === 0 && (
//             <div className="text-center py-20 text-gray-400">
//               <p className="text-xl italic font-semibold">You haven't added any products yet.</p>
//               <Link to="/dashboard/addproduct" className="btn btn-link text-indigo-600">Add Product Now</Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageProducts;
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxios from "../../../Hooks/useAxios"; 
import useAuth from "../../../Hooks/useAuth";
import { FaEdit, FaTrashAlt, FaBoxOpen, FaExternalLinkAlt } from "react-icons/fa";

const ManageProducts = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const { data: products = [], isLoading, refetch, isError, error } = useQuery({
    queryKey: ["my-products", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/all-products/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    const isDark = document.documentElement.classList.contains("dark");
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      background: isDark ? "#0f172a" : "#fff",
      color: isDark ? "#fff" : "#000",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/products/${id}`);
        if (res.data.deletedCount > 0) {
          refetch(); 
          Swal.fire({
            title: "Deleted!",
            icon: "success",
            background: isDark ? "#0f172a" : "#fff",
            timer: 1000,
            showConfirmButton: false
          });
        }
      } catch (err) {
        Swal.fire("Error!", "Failed to delete.", "error");
      }
    }
  };

  const handleToggleHome = async (id, currentStatus) => {
    const isDark = document.documentElement.classList.contains("dark");
    try {
      const res = await axiosSecure.patch(`/products/toggle-home/${id}`, {
        showOnHome: !currentStatus, 
      });

      if (res.data.modifiedCount > 0) {
        refetch(); 
        Swal.fire({
          position: "top-end",
          title: !currentStatus ? "Live on Home" : "Removed",
          icon: "success",
          timer: 800,
          showConfirmButton: false,
          background: isDark ? "#0f172a" : "#fff",
        });
      }
    } catch (err) {
      Swal.fire("Error!", "Update failed", "error");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-[#020617]">
      <span className="loading loading-spinner loading-lg text-teal-500"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] p-4 md:p-8 lg:p-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
              My Inventory
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mt-1">
              Managing {products.length} active products
            </p>
          </div>
          <Link 
            to="/dashboard/addproduct" 
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-center transition-all shadow-lg shadow-teal-900/20"
          >
            + Add New Product
          </Link>
        </div>

        {/* --- Desktop & Tablet Table View --- */}
        <div className="hidden md:block bg-white dark:bg-[#0f172a] rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="table w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                <th className="py-5 px-6 text-[11px] font-black uppercase text-slate-500 dark:text-teal-500 tracking-wider">Product Info</th>
                <th className="py-5 text-[11px] font-black uppercase text-slate-500 dark:text-teal-500 tracking-wider">Pricing</th>
                <th className="py-5 text-[11px] font-black uppercase text-slate-500 dark:text-teal-500 tracking-wider">Category</th>
                <th className="py-5 text-center text-[11px] font-black uppercase text-slate-500 dark:text-teal-500 tracking-wider">Home Status</th>
                <th className="py-5 text-right px-6 text-[11px] font-black uppercase text-slate-500 dark:text-teal-500 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-6 border-t dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <img
                        src={Array.isArray(product.images) ? product.images[0] : product.images}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-800"
                        alt=""
                      />
                      <div className="max-w-[200px]">
                        <div className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">{product.name}</div>
                        <div className="text-[9px] text-slate-400 font-mono">ID: {product._id.slice(-8).toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 border-t dark:border-slate-800 font-black text-slate-700 dark:text-slate-300 text-sm">
                    ${parseFloat(product.price).toFixed(2)}
                  </td>
                  <td className="py-4 border-t dark:border-slate-800">
                    <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded uppercase">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 border-t dark:border-slate-800 text-center">
                    <input
                      type="checkbox"
                      className="toggle toggle-success toggle-sm"
                      checked={!!product.showOnHome} 
                      onChange={() => handleToggleHome(product._id, product.showOnHome)}
                    />
                  </td>
                  <td className="py-4 px-6 border-t dark:border-slate-800 text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/dashboard/updateproduct/${product._id}`} className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
                        <FaEdit size={14} />
                      </Link>
                      <button onClick={() => handleDelete(product._id)} className="p-2.5 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Mobile Card View (Visible only on small screens) --- */}
        <div className="md:hidden flex flex-col gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex gap-4">
                <img 
                  src={Array.isArray(product.images) ? product.images[0] : product.images} 
                  className="w-20 h-20 rounded-xl object-cover bg-slate-100 dark:bg-slate-800" 
                  alt="" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm truncate uppercase tracking-tight">{product.name}</h3>
                    <input
                      type="checkbox"
                      className="toggle toggle-success toggle-xs"
                      checked={!!product.showOnHome} 
                      onChange={() => handleToggleHome(product._id, product.showOnHome)}
                    />
                  </div>
                  <p className="text-teal-600 dark:text-teal-400 font-black text-sm mt-1">${parseFloat(product.price).toFixed(2)}</p>
                  <span className="inline-block mt-2 text-[9px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded uppercase">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Link to={`/dashboard/updateproduct/${product._id}`} className="flex justify-center items-center gap-2 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 text-xs font-bold uppercase">
                  <FaEdit size={12} /> Edit
                </Link>
                <button onClick={() => handleDelete(product._id)} className="flex justify-center items-center gap-2 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 text-xs font-bold uppercase">
                  <FaTrashAlt size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- Empty State --- */}
        {products.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-[#0f172a] rounded-[2rem] border border-dashed border-slate-300 dark:border-slate-800">
            <FaBoxOpen className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={50} />
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">No products found in your inventory</p>
            <Link to="/dashboard/addproduct" className="inline-block mt-4 text-teal-600 font-black uppercase text-[10px] hover:underline">Start adding products</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;