// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxios from "../../../Hooks/useAxios";
// import { motion } from "framer-motion";

// const Allproducts = () => {
//   const axiosSecure = useAxios();

//   // ১. সব প্রোডাক্ট ফেচ করা
//   const { data: products = [], isLoading, refetch } = useQuery({
//     queryKey: ["all-products"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/products");
//       return res.data;
//     },
//   });

//   // ২. ডিলিট ফাংশন
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/products/${id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             refetch();
//             Swal.fire("Deleted!", "Product has been deleted.", "success");
//           }
//         });
//       }
//     });
//   };

//   // ৩. Show on Home টগল ফাংশন
//   const handleToggleHome = async (id, currentStatus) => {
//     try {
//       const res = await axiosSecure.patch(`/products/toggle-home/${id}`, {
//         showOnHome: !currentStatus,
//       });
//       if (res.data.modifiedCount > 0) {
//         refetch();
//         Swal.fire({
//           title: !currentStatus ? "Added to Home!" : "Removed from Home!",
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (isLoading) return <p className="text-center mt-10">Loading Products...</p>;

//   return (
//     <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
//         All Products ({products.length})
//       </h2>

//       <div className="overflow-x-auto shadow-2xl rounded-xl">
//         <table className="table w-full bg-white">
//           {/* টেবিল হেডার */}
//           <thead className="bg-indigo-600 text-white">
//             <tr>
//               <th className="p-4">Image</th>
//               <th className="p-4">Product Name</th>
//               <th className="p-4">Price</th>
//               <th className="p-4">Category</th>
//               <th className="p-4">Created By</th>
//               <th className="p-4 text-center">Show on Home</th>
//               <th className="p-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <motion.tr
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 key={product._id}
//                 className="hover:bg-gray-50 transition border-b"
//               >
//                 {/* ছবি */}
//                 <td className="p-4">
//                   <div className="avatar">
//                     <div className="mask mask-squircle w-14 h-14">
//                       <img src={product.image} alt={product.name} />
//                     </div>
//                   </div>
//                 </td>

//                 {/* নাম */}
//                 <td className="p-4 font-semibold text-gray-700">{product.name}</td>

//                 {/* দাম */}
//                 <td className="p-4 font-bold text-green-600">${product.price}</td>

//                 {/* ক্যাটাগরি */}
//                 <td className="p-4">
//                   <span className="badge badge-ghost font-medium">
//                     {product.category}
//                   </span>
//                 </td>

//                 {/* কে তৈরি করেছে */}
//                 <td className="p-4 text-sm text-gray-500">{product.sellerEmail}</td>

//                 {/* Show on Home টগল */}
//                 <td className="p-4 text-center">
//                   <input
//                     type="checkbox"
//                     className="toggle toggle-primary"
//                     checked={product.showOnHome || false}
//                     onChange={() => handleToggleHome(product._id, product.showOnHome)}
//                   />
//                 </td>

//                 {/* অ্যাকশন বাটন */}
//                 <td className="p-4 text-center">
//                   <div className="flex justify-center gap-2">
//                     {/* এডিট বাটন */}
//                     <button
//                       className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none"
//                       onClick={() => {
//                         /* এখানে আপনার এডিট মডাল বা লিঙ্কে যাওয়ার লজিক বসবে */
//                         Swal.fire("Redirecting to Edit Page...");
//                       }}
//                     >
//                       Update
//                     </button>

//                     {/* ডিলিট বাটন */}
//                     <button
//                       className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
//                       onClick={() => handleDelete(product._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Allproducts;


// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxios from "../../../Hooks/useAxios";
// import { motion } from "framer-motion";
// import { Link } from "react-router"; // Link ইমপোর্ট করলাম

// const Allproducts = () => {
//   const axiosSecure = useAxios();

//   const { data: products = [], isLoading, refetch } = useQuery({
//     queryKey: ["all-products"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/products");
//       return res.data;
//     },
//   });

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/products/${id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             refetch();
//             Swal.fire("Deleted!", "Product has been deleted.", "success");
//           }
//         });
//       }
//     });
//   };

//   const handleToggleHome = async (id, currentStatus) => {
//     try {
//       const res = await axiosSecure.patch(`/products/toggle-home/${id}`, {
//         showOnHome: !currentStatus,
//       });
//       if (res.data.modifiedCount > 0) {
//         refetch();
//         Swal.fire({
//           position: "top-end", // কোণায় দেখালে ইউজার বিরক্ত হয় না
//           title: !currentStatus ? "Added to Home!" : "Removed from Home!",
//           icon: "success",
//           timer: 1000,
//           showConfirmButton: false,
//         });
//       }
//     } catch (error) {
//       Swal.fire("Error!", "Failed to update status", "error");
//     }
//   };

//   if (isLoading) return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;

//   return (
//     <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold text-indigo-800 mb-6 text-center">
//         All Products ({products.length})
//       </h2>

//       <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200">
//         <table className="table w-full bg-white">
//           <thead className="bg-indigo-600 text-white">
//             <tr>
//               <th className="p-4">Image</th>
//               <th className="p-4">Product Name</th>
//               <th className="p-4">Price</th>
//               <th className="p-4">Category</th>
//               <th className="p-4">Created By</th>
//               <th className="p-4 text-center">Show on Home</th>
//               <th className="p-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <motion.tr
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 key={product._id}
//                 className="hover:bg-blue-50 transition border-b"
//               >
//                 <td className="p-4">
//                   <div className="avatar">
//                     <div className="mask mask-squircle w-14 h-14 border">
//                       {/* Array এর প্রথম ছবি দেখানোর জন্য images[0] */}
//                       <img src={product.images }  />
//                     </div>
//                   </div>
//                 </td>

//                 <td className="p-4 font-semibold text-gray-700">{product.name}</td>
//                 <td className="p-4 font-bold text-green-600">${product.price}</td>
//                 <td className="p-4">
//                   <span className="badge badge-outline border-indigo-300 text-indigo-600 font-medium">
//                     {product.category}
//                   </span>
//                 </td>
//                 <td className="p-4 text-sm text-gray-500">{product.sellerEmail || "Admin"}</td>

//                 <td className="p-4 text-center">
//                   <input
//                     type="checkbox"
//                     className="toggle toggle-primary"
//                     checked={product.showOnHome || false}
//                     onChange={() => handleToggleHome(product._id, product.showOnHome)}
//                   />
//                 </td>

//                 <td className="p-4 text-center">
//                   <div className="flex justify-center gap-3">
//                     {/* এডিট বাটন হিসেবে Link ব্যবহার করা ভালো */}
//                     <Link to={`/dashboard/edit-product/${product._id}`}>
//                         <button className="btn btn-sm btn-info text-white">Update</button>
//                     </Link>

//                     <button
//                       className="btn btn-sm btn-error text-white"
//                       onClick={() => handleDelete(product._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Allproducts;
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxios from "../../../Hooks/useAxios";
// import { motion } from "framer-motion";
// import { Link } from "react-router"; // react-router-dom ব্যবহার করুন

// const Allproducts = () => {
//   const axiosSecure = useAxios();

//   // ১. সব প্রোডাক্ট ফেচ করা
//   const { data: products = [], isLoading, refetch } = useQuery({
//     queryKey: ["all-products"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/products");
//       return res.data;
//     },
//   });

//   // ২. ডিলিট ফাংশন (Confirmation Modal সহ)
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/products/${id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             refetch();
//             Swal.fire("Deleted!", "Product has been deleted.", "success");
//           }
//         });
//       }
//     });
//   };

//   // ৩. Show on Home টগল ফাংশন
//   const handleToggleHome = async (id, currentStatus) => {
//     try {
//       // ব্যাকএন্ডে PATCH রিকোয়েস্ট পাঠানো হচ্ছে
//       const res = await axiosSecure.patch(`/products/toggle-home/${id}`, {
//         showOnHome: !currentStatus,
//       });
      
//       if (res.data.modifiedCount > 0) {
//         refetch();
//         Swal.fire({
//           position: "top-end",
//           title: !currentStatus ? "Added to Home!" : "Removed from Home!",
//           icon: "success",
//           timer: 1000,
//           showConfirmButton: false,
//         });
//       }
//     } catch (error) {
//       Swal.fire("Error!", "Failed to update status", "error");
//     }
//   };

//   if (isLoading) return (
//     <div className="flex justify-center items-center h-screen">
//       <span className="loading loading-spinner loading-lg text-indigo-600"></span>
//     </div>
//   );

//   return (
//     <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center uppercase">
//           Inventory Management ({products.length})
//         </h2>

//         <div className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-100 bg-white">
//           <table className="table w-full">
//             {/* টেবিল হেডার */}
//             <thead className="bg-indigo-600 text-white text-sm">
//               <tr>
//                 <th className="py-4 px-6">Product</th>
//                 <th className="py-4">Price</th>
//                 <th className="py-4">Category</th>
//                 <th className="py-4">Created By</th>
//                 <th className="py-4 text-center">Show on Home</th>
//                 <th className="py-4 text-center">Actions</th>
//               </tr>
//             </thead>

//             {/* টেবিল বডি */}
//             <tbody>
//               {products.map((product) => (
//                 <motion.tr
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   key={product._id}
//                   className="hover:bg-indigo-50/50 transition border-b border-gray-100"
//                 >
//                   {/* ইমেজ ও নাম */}
//                   <td className="p-4">
//                     <div className="flex items-center gap-4">
//                       <div className="avatar">
//                         <div className="mask mask-squircle w-14 h-14 ring ring-indigo-100 ring-offset-2">
//                           {/* ইমেজ অ্যারে থেকে প্রথমটি নেয়া হচ্ছে */}
//                           <img 
//                             src={Array.isArray(product.images) ? product.images[0] : product.images} 
//                             alt={product.name} 
//                             onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="font-bold text-gray-800">{product.name}</div>
//                         <div className="text-xs opacity-50 uppercase">{product._id.slice(-6)}</div>
//                       </div>
//                     </div>
//                   </td>

//                   {/* দাম */}
//                   <td className="p-4 font-bold text-green-600">
//                     ${parseFloat(product.price).toFixed(2)}
//                   </td>

//                   {/* ক্যাটাগরি */}
//                   <td className="p-4">
//                     <span className="badge badge-ghost border-indigo-200 text-indigo-700 font-medium px-3 py-3 capitalize">
//                       {product.category}
//                     </span>
//                   </td>

//                   {/* ইমেইল */}
//                   <td className="p-4 text-sm text-gray-500">
//                     {product.sellerEmail || "Admin"}
//                   </td>

//                   {/* Show on Home টগল */}
//                   <td className="p-4 text-center">
//                     <input
//                       type="checkbox"
//                       className="toggle toggle-primary"
//                       checked={product.showOnHome || false}
//                       onChange={() => handleToggleHome(product._id, product.showOnHome)}
//                     />
//                   </td>

//                   {/* অ্যাকশন বাটন */}
//                   <td className="p-4">
//                     <div className="flex justify-center gap-3">
//                       {/* Update বাটন */}
//                       <Link to={`/dashboard/updateproduct/${product._id}`}>
//                         <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 border-none text-white shadow-md">
//                           Update
//                         </button>
//                       </Link>

//                       {/* Delete বাটন */}
//                       <button
//                         className="btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white shadow-md"
//                         onClick={() => handleDelete(product._id)}
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
//               <p className="text-xl">No products available in stock.</p>
//             </div>
//           )}         
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Allproducts;
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxios from "../../../Hooks/useAxios";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom"; // react-router-dom ব্যবহার করুন

// const AllProducts = () => {
//   const axiosSecure = useAxios();

//   // ১. সব প্রোডাক্ট ফেচ করা
//   const { data: products = [], isLoading, refetch, isError, error } = useQuery({
//     queryKey: ["all-products"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/products");
//       return res.data;
//     },
//   });

//   // ২. ডিলিট ফাংশন
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/products/${id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             refetch();
//             Swal.fire("Deleted!", "Product has been deleted.", "success");
//           }
//         });
//       }
//     });
//   };

//   // ৩. Show on Home টগল ফাংশন
//   const handleToggleHome = async (id, currentStatus) => {
//     try {
//       const res = await axiosSecure.patch(`/products/toggle-home/${id}`, {
//         showOnHome: !currentStatus,
//       });

//       if (res.data.modifiedCount > 0) {
//         refetch();
//         Swal.fire({
//           position: "top-end",
//           title: !currentStatus ? "Added to Home!" : "Removed from Home!",
//           icon: "success",
//           timer: 1000,
//           showConfirmButton: false,
//         });
//       }
//     } catch (err) {
//       Swal.fire("Error!", "Failed to update status", "error");
//     }
//   };

//   if (isLoading) return (
//     <div className="flex justify-center items-center h-screen">
//       <span className="loading loading-spinner loading-lg text-indigo-600"></span>
//     </div>
//   );

//   if (isError) return (
//     <p className="text-center text-red-500 mt-20">Error: {error.message}</p>
//   );

//   return (
//     <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center uppercase">
//           Inventory Management ({products.length})
//         </h2>

//         <div className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-100 bg-white">
//           <table className="table w-full">
//             <thead className="bg-indigo-600 text-white text-sm">
//               <tr>
//                 <th className="py-4 px-6">Product</th>
//                 <th className="py-4">Price</th>
//                 <th className="py-4">Category</th>
//                 <th className="py-4">Created By</th>
//                 <th className="py-4 text-center">Show on Home</th>
//                 <th className="py-4 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {products.map((product) => (
//                 <motion.tr
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   key={product._id}
//                   className="hover:bg-indigo-50/50 transition border-b border-gray-100"
//                 >
//                   {/* Product Image & Name */}
//                   <td className="p-4">
//                     <div className="flex items-center gap-4">
//                       <div className="avatar">
//                         <div className="mask mask-squircle w-14 h-14 ring ring-indigo-100 ring-offset-2">
//                           <img
//                             src={Array.isArray(product.images) ? product.images[0] : product.images}
//                             alt={product.name}
//                             onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="font-bold text-gray-800">{product.name}</div>
//                         <div className="text-xs opacity-50 uppercase">{product._id.slice(-6)}</div>
//                       </div>
//                     </div>
//                   </td>

//                   {/* Price */}
//                   <td className="p-4 font-bold text-green-600">
//                     ${parseFloat(product.price).toFixed(2)}
//                   </td>

//                   {/* Category */}
//                   <td className="p-4">
//                     <span className="badge badge-ghost border-indigo-200 text-indigo-700 font-medium px-3 py-2 capitalize">
//                       {product.category}
//                     </span>
//                   </td>

//                   {/* Created By */}
//                   <td className="p-4 text-sm text-gray-500">
//                     {product.sellerEmail || "Admin"}
//                   </td>

//                   {/* Show on Home Toggle */}
//                   <td className="p-4 text-center">
//                     <input
//                       type="checkbox"
//                       className="toggle toggle-primary"
//                       checked={product.showOnHome || false}
//                       onChange={() => handleToggleHome(product._id, product.showOnHome)}
//                     />
//                   </td>

//                   {/* Actions */}
//                   <td className="p-4">
//                     <div className="flex justify-center gap-3">
//                       <Link to={`/dashboard/updateproduct/${product._id}`}>
//                         <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 border-none text-white shadow-md">
//                           Update
//                         </button>
//                       </Link>

//                       <button
//                         className="btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white shadow-md"
//                         onClick={() => handleDelete(product._id)}
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
//               <p className="text-xl">No products available in stock.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProducts;
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// // import useAxios from "../../../Hooks/useAxios";
// import { motion } from "framer-motion";
// import { Link } from "react-router";
// import useAxios from "../../../Hooks/useAxios";

// const AllProducts = () => {
//   const axiosSecure = useAxios();

//   // ১. সব প্রোডাক্ট ফেচ করা
//   const { data: products = [], isLoading, refetch, isError, error } = useQuery({
//     queryKey: ["all-products"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/products");
//       return res.data;
//     },
//   });

//   // ২. প্রোডাক্ট ডিলিট ফাংশন
//   const handleDelete = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#d33",
//         cancelButtonColor: "#3085d6",
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (result.isConfirmed) {
//         const res = await axiosSecure.delete(`/products/${id}`);
//         if (res.data.deletedCount > 0) {
//           refetch();
//           Swal.fire("Deleted!", "Product has been deleted.", "success");
//         }
//       }
//     } catch (err) {
//       Swal.fire("Error!", "Failed to delete product", "error");
//     }
//   };

//   // ৩. Show on Home টগল ফাংশন
//   const handleToggleHome = async (id, currentStatus) => {
//     try {
//       const res = await axiosSecure.patch(`/products/toggle-home/${id}`, {
//         showOnHome: !currentStatus,
//       });

//       if (res.data.modifiedCount > 0) {
//         refetch();
//         Swal.fire({
//           position: "top-end",
//           title: !currentStatus ? "Added to Home!" : "Removed from Home!",
//           icon: "success",
//           timer: 1000,
//           showConfirmButton: false,
//         });
//       }
//     } catch (err) {
//       Swal.fire("Error!", "Failed to update status", "error");
//     }
//   };

//   // ৪. লোডিং স্টেট
//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="loading loading-spinner loading-lg text-indigo-600"></span>
//       </div>
//     );

//   // ৫. এরর হ্যান্ডলিং
//   if (isError)
//     return (
//       <p className="text-center text-red-500 mt-20">
//         Error: {error.message}
//       </p>
//     );

//   return (
//     <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center uppercase">
//           Inventory Management ({products.length})
//         </h2>

//         <div className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-100 bg-white">
//           <table className="table w-full">
//             <thead className="bg-indigo-600 text-white text-sm">
//               <tr>
//                 <th className="py-4 px-6">Product</th>
//                 <th className="py-4">Price</th>
//                 <th className="py-4">Category</th>
//                 <th className="py-4">Created By</th>
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
//                   {/* Product Image & Name */}
//                   <td className="p-4">
//                     <div className="flex items-center gap-4">
//                       <div className="avatar">
//                         <div className="mask mask-squircle w-14 h-14 ring ring-indigo-100 ring-offset-2">
//                           <img
//                             src={
//                               Array.isArray(product.images)
//                                 ? product.images[0]
//                                 : product.images
//                             }
//                             alt={product.name}
//                             onError={(e) =>
//                               (e.target.src =
//                                 "https://via.placeholder.com/150?text=No+Image")
//                             }
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="font-bold text-gray-800">
//                           {product.name}
//                         </div>
//                         <div className="text-xs opacity-50 uppercase">
//                           {product._id.slice(-6)}
//                         </div>
//                       </div>
//                     </div>
//                   </td>

//                   {/* Price */}
//                   <td className="p-4 font-bold text-green-600">
//                     ${parseFloat(product.price).toFixed(2)}
//                   </td>

//                   {/* Category */}
//                   <td className="p-4">
//                     <span className="badge badge-ghost border-indigo-200 text-indigo-700 font-medium px-3 py-2 capitalize">
//                       {product.category}
//                     </span>
//                   </td>

//                   {/* Created By */}
//                   <td className="p-4 text-sm text-gray-500">
//                     {product.sellerEmail || "Admin"}
//                   </td>

//                   {/* Show on Home Toggle */}
//                   <td className="p-4 text-center">
//                     <input
//                       type="checkbox"
//                       className="toggle toggle-primary"
//                       checked={product.showOnHome || false}
//                       onChange={() =>
//                         handleToggleHome(product._id, product.showOnHome)
//                       }
//                     />
//                   </td>

//                   {/* Actions */}
//                   <td className="p-4">
//                     <div className="flex justify-center gap-3">
//                       <Link to={`/dashboard/updateproduct/${product._id}`}>
//                         <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 border-none text-white shadow-md">
//                           Update
//                         </button>
//                       </Link>

//                       <button
//                         className="btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white shadow-md"
//                         onClick={() => handleDelete(product._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>

//           {/* যদি কোনো প্রোডাক্ট না থাকে */}
//           {products.length === 0 && (
//             <div className="text-center py-20 text-gray-400">
//               <p className="text-xl">No products available in stock.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllProducts;
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Link } from "react-router"; // নিশ্চিত করুন react-router-dom ইনস্টল আছে
import useAxios from "../../../Hooks/useAxios"; // আপনার কাস্টম হুক

const AllProducts = () => {
  const axiosSecure = useAxios();

  // ১. সব প্রোডাক্ট ফেচ করা (React Query)
  const { data: products = [], isLoading, refetch, isError, error } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  // ২. প্রোডাক্ট ডিলিট করার ফাংশন
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/products/${id}`);
        if (res.data.deletedCount > 0) {
          refetch(); // ডিলিট হওয়ার পর টেবিল রিফ্রেশ
          Swal.fire("Deleted!", "Product has been deleted.", "success");
        }
      } catch (err) {
        Swal.fire("Error!", "Something went wrong while deleting.", "error");
      }
    }
  };

  // ৩. Show on Home টগল করার লজিক
  const handleToggleHome = async (id, currentStatus) => {
    try {
      // ব্যাকএন্ডে PATCH রিকোয়েস্ট পাঠানো হচ্ছে
      const res = await axiosSecure.patch(`/products/toggle-home/${id}`, {
        showOnHome: !currentStatus, // বিপরীত স্ট্যাটাস পাঠানো হচ্ছে
      });

      if (res.data.modifiedCount > 0) {
        refetch(); // ডাটা রিফ্রেশ করা যাতে UI আপডেট হয়
        Swal.fire({
          position: "top-end",
          title: !currentStatus ? "Visible on Home Page" : "Hidden from Home Page",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to update status", "error");
    }
  };

  // লোডিং স্টেট
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );

  // এরর স্টেট
  if (isError)
    return (
      <p className="text-center text-red-500 mt-20 font-bold">
        Error: {error.message}
      </p>
    );

  return (
    <div className="p-4 md:p-10  bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center uppercase tracking-widest">
          Inventory Management ({products.length})
        </h2>

        <div className="overflow-x-auto shadow-2xl rounded-2xl border  border-gray-100 bg-white">
          <table className="table w-full">
            {/* টেবিল হেডার */}
            <thead className=" bg-gradient-to-r from-teal-400 to-indigo-500  text-white">
              <tr>
                <th className="py-4 px-6">Product</th>
                <th className="py-4">Price</th>
                <th className="py-4">Category</th>
                <th className="py-4">Seller Email</th>
                <th className="py-4 text-center">Show on Home</th>
                <th className="py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* টেবিল বডি */}
            <tbody>
              {products.map((product) => (
                <motion.tr
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-indigo-50/50 transition border-b border-gray-100"
                >
                  {/* ইমেজ ও নাম */}
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-14 h-14 ring ring-indigo-100 ring-offset-2">
                          <img
                            src={Array.isArray(product.images) ? product.images[0] : product.images}
                            alt={product.name}
                            onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">{product.name}</div>
                        <div className="text-[10px] opacity-50 uppercase font-mono">{product._id.slice(-8)}</div>
                      </div>
                    </div>
                  </td>

                  {/* দাম */}
                  <td className="p-4 font-bold text-green-600">
                    ${parseFloat(product.price).toFixed(2)}
                  </td>

                  {/* ক্যাটাগরি */}
                  <td className="p-4">
                    <span className="badge badge-ghost border-indigo-200 text-indigo-700 font-medium px-3 py-3 capitalize">
                      {product.category}
                    </span>
                  </td>

                  {/* সেলার ইমেইল */}
                  <td className="p-4 text-sm text-gray-500">
                    {product.sellerEmail || "Admin"}
                  </td>

                  {/* টগল বাটন লজিক */}
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary toggle-md"
                      checked={!!product.showOnHome} // বুলিয়ান ভ্যালু নিশ্চিত করা
                      onChange={() => handleToggleHome(product._id, product.showOnHome)}
                    />
                  </td>

                  {/* অ্যাকশন বাটনসমূহ */}
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link to={`/dashboard/updateproduct/${product._id}`}>
                        <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 border-none text-white shadow-md">
                          Update
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white shadow-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* যদি কোনো ডাটা না থাকে */}
          {products.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl italic font-semibold">No products found in the database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;