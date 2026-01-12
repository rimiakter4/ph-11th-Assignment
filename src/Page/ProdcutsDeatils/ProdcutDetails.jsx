// import { useParams, useNavigate } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import useAxios from "../../Hooks/useAxios";
// import useAuth from "../../Hooks/useAuth";


// export default function ProductDetails() {
//   const { id } = useParams(); // product id from URL
//   const axiosSecure = useAxios();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // Fetch single product by id
//   const { data: product, isLoading, isError, error } = useQuery({
//     queryKey: ["product", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/products/${id}`);
//       return res.data;
//     },
//   });
//   //  console.log(product.demoVideo)
//   if (isLoading) return <p className="text-center py-10">Loading product...</p>;
//   if (isError) return <p className="text-center py-10 text-red-500">Error: {error.message}</p>;

//   // Determine if user can order
//   // const canOrder = user && !["admin", "manager"].includes(user.role?.toLowerCase());

//   const handleOrderClick = () => {
//     if (!user) {
//       navigate("/login"); // redirect to login if not logged in
//     } else {
//       navigate(`/booking/${product._id}`); // redirect to booking page
//     }
//   };

//   return (
//     <section className="py-14 bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-8">
//         {/* Product Images / Video */}
//         <div className="md:w-1/2">
//           {product.images?.length > 0 ? (
//             <motion.img
//               src={product.images[0]}
//               alt={product.name}
//               className="rounded-2xl w-full h-80 object-cover"
//               whileHover={{ scale: 1.05 }}
//             />
//           ) : (
//             <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-2xl">
//               No Image
//             </div>
//           )}
//         </div>

//         {/* Product Info */}
//         <div className="md:w-1/2 flex flex-col">
//           <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
//           <p className="text-gray-600 mb-2">{product.description}</p>

//           <p className="text-gray-500 mb-1">
//             <span className="font-semibold">Category:</span> {product.category || "N/A"}
//           </p>
//           <p className="text-gray-500 mb-1">
//             <span className="font-semibold">Price:</span> ${product.price}
//           </p>
//           <p className="text-gray-500 mb-1">
//             <span className="font-semibold">Available Quantity:</span> {product.availableQuantity ?? 0}
//           </p>
//           <p className="text-gray-500 mb-1">
//             <span className="font-semibold">Minimum Order:</span> {product.minOrder ?? 1}
//           </p>
//           <p className="text-gray-500 mb-3">
//             <span className="font-semibold">Payment Options:</span> {product.paymentOptions || "COD"}
//           </p>
//           {product.features && (
//             <p className="text-gray-500 mb-3">
//               <span className="font-semibold">Features:</span> {product.features}
//             </p>
//           )}
//  <button
//               onClick={handleOrderClick}
//               className="mt-auto px-6 py-3 rounded-xl bg-gradient-to-r font-semibold from-teal-400 to-indigo-500  text-white  hover:from-teal-600 hover:to-indigo-600 transition-colors duration-300  transition"
//             >
//               Order  Now
//             </button></div>
// {/* 
//           Product Demo Video */}
//   {/* {product.demoVideo && (
    

//     <div className="w-full rounded-2xl overflow-hidden bg-black">
   
//       <video
//         className="w-full h-60 object-cover"
//         controls
//         preload="metadata"
//       >
//         <source src={product.demoVideo} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   )} */}




//       </div>
//     </section>
//   );
// }
// import { useParams, useNavigate } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import useAxios from "../../Hooks/useAxios";
// import useAuth from "../../Hooks/useAuth";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const axiosSecure = useAxios();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const { data: product, isLoading, isError, error } = useQuery({
//     queryKey: ["product", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/products/${id}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return (
//     <div className="min-h-screen flex justify-center items-center dark:bg-gray-900">
//       <p className="text-center py-10 dark:text-gray-300">Loading product...</p>
//     </div>
//   );

//   if (isError) return (
//     <div className="min-h-screen flex justify-center items-center dark:bg-gray-900">
//       <p className="text-center py-10 text-red-500 font-semibold">Error: {error.message}</p>
//     </div>
//   );

//   const handleOrderClick = () => {
//     if (!user) {
//       navigate("/login");
//     } else {
//       navigate(`/booking/${product._id}`);
//     }
//   };

//   return (
//     /* ১. সেকশন ব্যাকগ্রাউন্ড ডার্ক মোড অনুযায়ী */
//     <section className="py-14 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
//       <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        
//         {/* Product Image Section */}
//         <div className="md:w-1/2">
//           {product.images?.length > 0 ? (
//             <motion.img
//               src={product.images[0]}
//               alt={product.name}
//               className="rounded-2xl w-full h-80 object-cover shadow-lg border border-transparent dark:border-gray-700"
//               whileHover={{ scale: 1.05 }}
//             />
//           ) : (
//             <div className="w-full h-80 bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-2xl border border-dashed dark:border-gray-700">
//               <span className="dark:text-gray-400">No Image Available</span>
//             </div>
//           )}
//         </div>

//         {/* Product Info Section */}
//         <div className="md:w-1/2 flex flex-col">
//           {/* ২. টাইটেল ও বর্ণনা ডার্ক মোড অনুযায়ী */}
//           <h1 className="text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100">
//             {product.name}
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
//             {product.description}
//           </p>

//           {/* ৩. ডিটেইলস লিস্ট কালার পরিবর্তন */}
//           <div className="space-y-2 mb-6">
//             <p className="text-gray-500 dark:text-gray-400">
//               <span className="font-semibold text-gray-700 dark:text-gray-200">Category:</span> {product.category || "N/A"}
//             </p>
//             <p className="text-gray-500 dark:text-gray-400">
//               <span className="font-semibold text-gray-700 dark:text-gray-200">Price:</span> 
//               <span className="text-indigo-600 dark:text-indigo-400 font-bold ml-1">${product.price}</span>
//             </p>
//             <p className="text-gray-500 dark:text-gray-400">
//               <span className="font-semibold text-gray-700 dark:text-gray-200">Available Quantity:</span> {product.availableQuantity ?? 0}
//             </p>
//             <p className="text-gray-500 dark:text-gray-400">
//               <span className="font-semibold text-gray-700 dark:text-gray-200">Minimum Order:</span> {product.minOrder ?? 1}
//             </p>
//             <p className="text-gray-500 dark:text-gray-400">
//               <span className="font-semibold text-gray-700 dark:text-gray-200">Payment Options:</span> {product.paymentOptions || "COD"}
//             </p>
//             {product.features && (
//               <p className="text-gray-500 dark:text-gray-400">
//                 <span className="font-semibold text-gray-700 dark:text-gray-200">Features:</span> {product.features}
//               </p>
//             )}
//           </div>

//           {/* ৪. অর্ডার বাটন (ইতোমধ্যে সুন্দর গ্রেডিয়েন্ট আছে) */}
//           <button
//             onClick={handleOrderClick}
//             className="mt-auto px-6 py-3 rounded-xl bg-gradient-to-r font-semibold from-teal-400 to-indigo-500 text-white hover:from-teal-600 hover:to-indigo-600 hover:shadow-lg transition-all duration-300"
//           >
//             Order Now
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
import { useParams, useNavigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { FaShoppingCart, FaStar, FaInfoCircle, FaBox, FaCreditCard, FaCheckCircle } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // সিলেক্টেড ইমেজ স্টেট (Multiple Image handling এর জন্য)
  const [selectedImg, setSelectedImg] = useState(0);

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  if (isLoading) return (
    <div className="min-h-screen flex justify-center items-center dark:bg-gray-900 italic font-bold">
      <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      <p className="ml-4 text-gray-500">Loading Product Details...</p>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen flex justify-center items-center dark:bg-gray-900 text-red-500 font-bold">
      Error: {error.message}
    </div>
  );

  const handleOrderClick = () => {
    if (!user) {
      navigate("/login", { state: { from: location } });
    } else {
      navigate(`/booking/${product._id}`);
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-[#020617] min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        
        {/* Main Section: Image & Basic Info */}
        <div className="flex flex-col lg:flex-row gap-12 bg-white dark:bg-gray-800 p-6 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700">
          
          {/* ১. Multiple Images/Media Section */}
          <div className="lg:w-1/2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl group"
            >
              <img
                src={product.images?.[selectedImg] || "https://via.placeholder.com/600"}
                alt={product.name}
                className="w-full h-[450px] object-cover shadow-inner transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-2xl font-black shadow-xl">
                ${product.price}
              </div>
            </motion.div>

            {/* Thumbnail Navigation */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  onClick={() => setSelectedImg(index)}
                  src={img}
                  className={`w-20 h-20 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                    selectedImg === index ? "border-indigo-600 scale-105 shadow-md" : "border-transparent opacity-60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ২. Info & Order Section */}
          <div className="lg:w-1/2 flex flex-col">
            <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[4px] mb-2">{product.category}</span>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4 italic leading-none">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
               <div className="flex items-center gap-1 text-orange-400 font-bold">
                 <FaStar /> <FaStar /> <FaStar /> <FaStar /> <span className="text-gray-400 ml-1">4.9 (24 Reviews)</span>
               </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-lg italic border-l-4 border-indigo-500 pl-4">
              "{product.description}"
            </p>

            {/* ৩. Specifications / Key Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <FaBox className="text-indigo-500" />
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Stock</p>
                  <p className="text-sm font-bold dark:text-gray-200">{product.availableQuantity} Pcs</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                <FaCreditCard className="text-indigo-500" />
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Payment</p>
                  <p className="text-sm font-bold dark:text-gray-200">{product.paymentOptions || "COD"}</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOrderClick}
              className="flex items-center justify-center gap-3 w-full py-5 rounded-[1.5rem] bg-indigo-600 text-white font-black text-sm uppercase tracking-[3px] shadow-2xl hover:bg-indigo-700 transition-all"
            >
              <FaShoppingCart /> Order Now
            </motion.button>
            
            <p className="text-center mt-4 text-[9px] text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <FaCheckCircle className="text-green-500" /> 100% Quality Assurance Guarantee
            </p>
          </div>
        </div>

        {/* ৪. Description / Review / Related Items - Tab Style Sections */}
        <div className="mt-16 space-y-12">
          
          {/* Detailed Specifications Section */}
          {/* <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-sm">
             <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6 flex items-center gap-2">
               <FaInfoCircle className="text-indigo-600" /> Full Specifications
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="flex justify-between border-b dark:border-gray-700 pb-2">
                    <span className="font-bold text-gray-400 uppercase text-xs">Minimum Order</span>
                    <span className="dark:text-white font-bold">{product.minOrder} Pcs</span>
                  </p>
                  <p className="flex justify-between border-b dark:border-gray-700 pb-2">
                    <span className="font-bold text-gray-400 uppercase text-xs">Material</span>
                    <span className="dark:text-white font-bold">Premium Cotton / Mixed</span>
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="flex justify-between border-b dark:border-gray-700 pb-2">
                    <span className="font-bold text-gray-400 uppercase text-xs">Origin</span>
                    <span className="dark:text-white font-bold">Bangladesh</span>
                  </p>
                  <p className="flex justify-between border-b dark:border-gray-700 pb-2">
                    <span className="font-bold text-gray-400 uppercase text-xs">Features</span>
                    <span className="dark:text-white font-bold">{product.features || "Industrial Grade"}</span>
                  </p>
                </div>
             </div>
          </div> */}

          {/* Related Items Placeholder */}
          {/* <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-8 italic">
              Related Garments
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
               {/* এখানে আপনি চাইলে পুনরায় এপিআই কল করে সেম ক্যাটাগরির প্রোডাক্ট রেন্ডার করতে পারেন */}
               {/* <p className="text-gray-500 font-bold col-span-full text-center py-10 border-2 border-dashed rounded-3xl dark:border-gray-700">
                 Explore more in {product.category} section...
               </p>
            </div>
          </div>  */}
        </div> 

       </div>
    </section>
  );
} 