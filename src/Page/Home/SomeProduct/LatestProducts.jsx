// import { useQuery } from "@tanstack/react-query";

// import { Link } from "react-router";
// import { motion } from "framer-motion";
// // import useAuth from "../../Hooks/useAuth";
// import useAxios from "../../../Hooks/useAxios";

// import { useQuery } from "@tanstack/react-query";



// export default function LatestProducts() {

//   const axiosSecure=useAxios()
//   const {   data: products = [],
//     isLoading,
//     isError,
//     error,} =useQuery ({
//     queryKey: ["latestProducts",6],
//     queryFn: async()=>{
//      const res = await axiosSecure.get('/products?limit=6')
//       return res.data
//     }
//   });

//   if (isLoading) {
//     return <p className="text-center py-10">Loading products...</p>;
//   }

//   if (isError) {
//     return (
//       <p className="text-center py-10 text-red-500">
//         Error: {error.message}
//       </p>
//     );
//   }

//   return (
//     <section className="py-14 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center mb-10">
//           Our Products
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {products.map(product => (
//             <motion.div
//               key={product._id}
//               whileHover={{ scale: 1.03 }}
//               className="bg-white rounded-2xl shadow-md overflow-hidden"
//             >
//               <img
//                 src={product.images?.[0]}
//                 alt={product.name}
//                 className="h-56 w-full object-cover"
//               />

//               <div className="p-5">
//                 <h3 className="text-xl font-semibold mb-2">
//                   {product.name}
//                 </h3>

//                 <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                   {product.description}
//                 </p>

//                 <p className="font-bold text-lg mb-4">
//                   ${product.price}
//                 </p>

//                 <Link
//                   to={`/products/${product._id}`}
//                   className="inline-block px-4 py-2 rounded-xl  bg-gradient-to-r from-teal-400 to-indigo-500  text-white  hover:from-teal-600 hover:to-indigo-600 transition-colors duration-300 "
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router"; // আপনার ইম্পোর্ট অনুযায়ী রাখলাম
// import { motion } from "framer-motion";
// import useAxios from "../../../Hooks/useAxios";

// export default function LatestProducts() {
//   const axiosSecure = useAxios();

//   const { data: allProducts = [], isLoading, isError, error } = useQuery({
//     queryKey: ["latestProducts"],
//     queryFn: async () => {
//       // আপনি চাইলে ব্যাকএন্ড থেকেও ফিল্টার করে আনতে পারেন (যদি রাউট থাকে)
//       const res = await axiosSecure.get('/products');
//       return res.data;
//     }
//   });

//   // ১. লজিক: শুধু সেই প্রোডাক্টগুলো ফিল্টার করা যেগুলোর showOnHome মান true
//   const displayedProducts = allProducts
//     .filter(product => product.showOnHome === true) // ফিল্টার লজিক
//     .slice(0, 6); // আপনি যেহেতু ৬টি প্রোডাক্ট দেখাতে চেয়েছেন

//   if (isLoading) {
//     return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;
//   }

//   if (isError) {
//     return (
//       <p className="text-center py-10 text-red-500">
//         Error: {error.message}
//       </p>
//     );
//   }

//   return (
//     <section className="py-14 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-4xl font-bold text-center mb-10 text-indigo-900">
//           Our Featured Products
//         </h2>

//         {/* যদি কোনো প্রোডাক্ট শো করার মতো না থাকে */}
//         {displayedProducts.length === 0 ? (
//           <p className="text-center text-gray-500 italic">No products currently featured on home.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {displayedProducts.map(product => (
//               <motion.div
//                 key={product._id}
//                 whileHover={{ scale: 1.03 }}
//                 className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
//               >
//                 <img
//                   src={product.images?.[0] || "https://via.placeholder.com/300"}
//                   alt={product.name}
//                   className="h-56 w-full object-cover"
//                 />

//                 <div className="p-5">
//                   <h3 className="text-xl font-semibold mb-2">
//                     {product.name}
//                   </h3>

//                   <p className="text-gray-600 text-sm mb-3 line-clamp-2">
//                     {product.description}
//                   </p>

//                   <div className="flex justify-between items-center mb-4">
//                     <p className="font-bold text-lg text-indigo-600">
//                       ${product.price}
//                     </p>
//                     <span className="badge badge-outline text-xs">{product.category}</span>
//                   </div>

//                   <Link
//                     to={`/products/${product._id}`}
//                     className="w-full text-center inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white hover:from-teal-600 hover:to-indigo-600 transition-all duration-300 shadow-sm"
//                   >
//                     View Details
//                   </Link>
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
import { Link } from "react-router"; // আপনার প্রজেক্ট অনুযায়ী import path ঠিক রাখুন
import { motion } from "framer-motion";
import useAxios from "../../../Hooks/useAxios";

export default function LatestProducts() {
  const axiosSecure = useAxios();

  // ১. ডাটা ফেচিং: সরাসরি হোম-ফিল্টারড API থেকে ডাটা আনা হচ্ছে
  const { 
    data: products = [], 
    isLoading, 
    isError, 
    error 
  } = useQuery({
    queryKey: ["homeLatestProducts"], // ইউনিক কি
    queryFn: async () => {
      // এই রাউটটি ব্যাকএন্ড থেকে সবসময় ফিল্টার করা ৬টি প্রোডাক্ট দিবে
      const res = await axiosSecure.get('/products/home');
      return res.data;
    },
  });

  // লোডিং স্টেট
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  // এরর স্টেট
  if (isError) {
    return (
      <p className="text-center py-10 text-red-500 font-semibold">
        Error: {error.message}
      </p>
    );
  }

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Featured Products
        </h2>

        {/* যদি এডমিন কোনো প্রোডাক্টই showOnHome: true না করে থাকে */}
        {products.length === 0 ? (
          <div className="text-center py-10">
             <p className="text-gray-500 italic">No featured products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* প্রোডাক্ট ইমেজ */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={product.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="badge badge-secondary bg-indigo-600 border-none text-white px-3 py-3">
                      ${product.price}
                    </span>
                  </div>
                </div>

                {/* প্রোডাক্ট ডিটেইলস */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {product.description}
                  </p>

                  <div className="mt-auto">
                    <Link
                      to={`/products/${product._id}`}
                      className="w-full text-center block px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-semibold hover:shadow-lg hover:from-teal-500 hover:to-indigo-600 transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}