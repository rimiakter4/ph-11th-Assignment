
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router"; 
// import { motion } from "framer-motion";
// import useAxios from "../../../Hooks/useAxios";

// export default function LatestProducts() {
//   const axiosSecure = useAxios();

//   const { 
//     data: products = [], 
//     isLoading, 
//     isError, 
//     error 
//   } = useQuery({
//     queryKey: ["homeLatestProducts"],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/products/home');
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center py-20 dark:bg-gray-900">
//         <span className="loading loading-spinner loading-lg text-indigo-600"></span>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <p className="text-center py-10 text-red-500 font-semibold dark:bg-gray-900">
//         Error: {error.message}
//       </p>
//     );
//   }

//   return (
//     /* ১. সেকশনের ব্যাকগ্রাউন্ড পরিবর্তন */
//     <section className="py-14 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* ২. হেডিং টেক্সট কালার পরিবর্তন */}
//         <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
//           Featured Products
//         </h2>

//         {products.length === 0 ? (
//           <div className="text-center py-10">
//              <p className="text-gray-500 italic dark:text-gray-400">No featured products available at the moment.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {products.map((product) => (
//               <motion.div
//                 key={product._id}
//                 whileHover={{ scale: 1.03 }}
//                 transition={{ duration: 0.3 }}
//                 /* ৩. কার্ডের ব্যাকগ্রাউন্ড এবং বর্ডার ডার্ক মোড অনুযায়ী */
//                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col"
//               >
//                 <div className="relative overflow-hidden h-64">
//                   <img
//                     src={product.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
//                     alt={product.name}
//                     className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
//                   />
//                   <div className="absolute top-3 right-3">
//                     <span className="badge badge-secondary bg-indigo-600 border-none text-white px-3 py-3">
//                       ${product.price}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-6 flex flex-col flex-grow">
//                   {/* ৪. টাইটেল ও ডেসক্রিপশন কালার */}
//                   <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
//                     {product.name}
//                   </h3>

//                   <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
//                     {product.description}
//                   </p>

//                   <div className="mt-auto">
//                     <Link
//                       to={`/products/${product._id}`}
//                       className="w-full text-center block px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold hover:shadow-lg hover:from-teal-500 hover:to-indigo-600 transition-all duration-300"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; 
import useAxios from "../../../Hooks/useAxios";

export default function LatestProducts() {
  const axiosSecure = useAxios();

  const { 
    data: products = [], 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ["homeLatestProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get('/products/home');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 py-10 transition-colors">
        <p className="text-center text-red-500 font-semibold">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <section className="py-14 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
          Featured Products
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-10">
             <p className="text-gray-500 italic dark:text-gray-400">No featured products available.</p>
          </div>
        ) : (
          /* গ্রিড সেটিংস: ল্যাপটপ এবং বড় স্ক্রিনে ৫টি করে কার্ড (xl:grid-cols-5) ফলে সাইজ ছোট হবে */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-xl transition-all duration-300"
              >
                {/* ইমেজ হাইট আগের ৬৪ থেকে কমিয়ে ৪০ (h-40) করা হয়েছে কার্ড ছোট করার জন্য */}
                <div className="relative overflow-hidden h-40">
                  <img
                    src={product.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                      ${product.price}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  {/* টাইটেল সাইজ text-xl থেকে text-sm (স্মল) করা হয়েছে */}
                  <h3 className="text-sm font-bold mb-1 text-gray-800 dark:text-gray-100 line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-[11px] mb-3 line-clamp-2 flex-grow leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-auto">
                    <Link
                      to={`/products/${product._id}`}
                      /* আপনার অরিজিনাল গ্র্যাডিয়েন্ট ডিজাইন ঠিক রাখা হয়েছে */
                      className="w-full text-center block px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-bold text-[11px] uppercase tracking-wider hover:from-teal-500 hover:to-indigo-600 transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}