
// import { useState, useEffect } from "react";
// import { Link } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../Hooks/useAxios";
// import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// export default function AllProducts() {
//   const axiosSecure = useAxios();

//   // States for search and filtering
//   const [displaySearch, setDisplaySearch] = useState("");
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");
//   const [page, setPage] = useState(1);
//   const size = 10;

//   // Debounce logic to maintain input focus
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setSearch(displaySearch);
//       setPage(1);
//     }, 500);
//     return () => clearTimeout(handler);
//   }, [displaySearch]);

//   const { data, isLoading, isFetching } = useQuery({
//     queryKey: ["allProducts", search, sort, page],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/products?search=${search}&sort=${sort}&page=${page - 1}&size=${size}`
//       );
//       return res.data;
//     },
//     keepPreviousData: true,
//   });

//   const products = data?.products || [];
//   const totalProducts = data?.total || 0;
//   const totalPages = Math.ceil(totalProducts / size) || 1;

//   return (
//     <section className="py-14 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
//       <div className="max-w-11/12 mx-auto px-4">
        
//         {/* Header Section */}
//         <div className="text-center mb-10">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 uppercase tracking-tight">
//             All <span className="text-indigo-600">Products</span>
//           </h2>
//           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
//             Items Found: {totalProducts}
//           </p>
//         </div>

//         {/* Search and Filters Bar */}
//         <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-10">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
//             {/* Search Input */}
//             <div className="relative">
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 value={displaySearch}
//                 placeholder="Search products..."
//                 className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition-all"
//                 onChange={(e) => setDisplaySearch(e.target.value)}
//               />
//             </div>

//             {/* Sort Dropdown */}
//             <select
//               className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white cursor-pointer"
//               onChange={(e) => {setSort(e.target.value); setPage(1);}}
//               value={sort}
//             >
//               <option value="">Sort By: Default</option>
//               <option value="price-asc">Price: Low to High</option>
//               <option value="price-desc">Price: High to Low</option>
//               <option value="newest">Newest First</option>
//             </select>
//           </div>
//         </div>

//         {/* Product Grid Area */}
//         {isLoading ? (
//           <div className="flex justify-center items-center py-20">
//             <span className="loading loading-spinner loading-lg text-indigo-600"></span>
//           </div>
//         ) : products.length === 0 ? (
//           <div className="text-center py-20">
//             <p className="text-gray-500 italic dark:text-gray-400">No products found matching your search.</p>
//           </div>
//         ) : (
//           <>
//             {/* Grid Settings: XL এ ৫টি কলাম (xl:grid-cols-5) যাতে কার্ড ছোট দেখায় */}
//             <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
//               {products.map((product) => (
//                 <div
//                   key={product._id}
//                   className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-xl transition-all duration-300"
//                 >
//                   {/* Image: Height h-40 like your LatestProducts */}
//                   <div className="relative overflow-hidden h-40">
//                     <img
//                       src={product.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
//                       alt={product.name}
//                       className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
//                     />
//                     <div className="absolute top-2 right-2">
//                       <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
//                         ${product.price}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="p-4 flex flex-col flex-grow">
//                     {/* Title: Text-sm like your LatestProducts */}
//                     <h3 className="text-sm font-bold mb-1 text-gray-800 dark:text-gray-100 line-clamp-1">
//                       {product.name}
//                     </h3>

//                     {/* Description: Text-[11px] like your LatestProducts */}
//                     <p className="text-gray-600 dark:text-gray-300 text-[11px] mb-3 line-clamp-2 flex-grow leading-relaxed">
//                       {product.description}
//                     </p>

//                     <div className="mt-auto">
//                       <Link
//                         to={`/products/${product._id}`}
//                         className="w-full text-center block px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-bold text-[11px] uppercase tracking-wider hover:from-teal-500 hover:to-indigo-600 transition-all duration-300 shadow-md"
//                       >
//                         View Details
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination UI */}
//             {totalPages > 1 && (
//               <div className="flex justify-center items-center mt-12 gap-3">
//                 <button
//                   disabled={page === 1}
//                   onClick={() => setPage(page - 1)}
//                   className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 disabled:opacity-20 hover:text-indigo-600 transition-all dark:text-white"
//                 >
//                   <FaChevronLeft size={12} />
//                 </button>

//                 <div className="flex gap-2">
//                   {[...Array(totalPages).keys()].map((num) => (
//                     <button
//                       key={num}
//                       onClick={() => setPage(num + 1)}
//                       className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
//                         page === num + 1
//                           ? "bg-indigo-600 text-white shadow-lg"
//                           : "bg-white dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100"
//                       }`}
//                     >
//                       {num + 1}
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   disabled={page === totalPages}
//                   onClick={() => setPage(page + 1)}
//                   className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 disabled:opacity-20 hover:text-indigo-600 transition-all dark:text-white"
//                 >
//                   <FaChevronRight size={12} />
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { FaSearch, FaChevronLeft, FaChevronRight, FaStar, FaMapMarkerAlt, FaBox } from "react-icons/fa";

export default function AllProducts() {
  const axiosSecure = useAxios();

  // States for search and filtering
  const [displaySearch, setDisplaySearch] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const size = 10;

  // Debounce logic to maintain input focus
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(displaySearch);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [displaySearch]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["allProducts", search, sort, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?search=${search}&sort=${sort}&page=${page - 1}&size=${size}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const products = data?.products || [];
  const totalProducts = data?.total || 0;
  const totalPages = Math.ceil(totalProducts / size) || 1;

  return (
    <section className="py-14 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen font-sans">
      <div className="max-w-11/12 mx-auto px-4 lg:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight">
            All <span className="text-indigo-600">Products</span>
          </h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] mt-2">
            Items Found: {totalProducts}
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
              <input
                type="text"
                value={displaySearch}
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition-all font-medium"
                onChange={(e) => setDisplaySearch(e.target.value)}
              />
            </div>

            {/* Sort Dropdown */}
            <select
              className="w-full px-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white cursor-pointer font-medium"
              onChange={(e) => {setSort(e.target.value); setPage(1);}}
              value={sort}
            >
              <option value="">Sort By: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Product Grid Area */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-indigo-600"></span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 italic dark:text-gray-400 font-medium">No products found matching your search.</p>
          </div>
        ) : (
          <>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
              
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden h-44">
                    <img
                      src={product.images?.[0] || "https://via.placeholder.com/400x300"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Top Right: Price Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                        ${product.price}
                      </span>
                    </div>

                    {/* Top Left: Category Label */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-[9px] font-black text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                        {product.category || "General"}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    
                    {/* Meta Top: Rating & Stock */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1 text-orange-400 text-[10px] font-black">
                        <FaStar /> {product.rating || "4.8"}
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${product.availableQuantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {product.availableQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-[13px] font-black mb-2 text-gray-800 dark:text-gray-100 line-clamp-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className=" dark:text-gray-400 text-[14px] mb-4 line-clamp-2 leading-relaxed flex-grow ">
                      {product.description}
                    </p>

                    {/* Meta Middle: Location & Date */}
                    <div className="flex items-center justify-between py-3 border-t border-gray-50 dark:border-gray-700/50 mb-4">
                      <div className="flex flex-col">
                        <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest flex items-center gap-1">
                          <FaMapMarkerAlt /> Location
                        </span>
                        <span className="text-[10px] text-gray-700 dark:text-gray-300 font-bold">{product.location || "Dhaka, BD"}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[8px] text-gray-400 uppercase font-black tracking-widest flex items-center gap-1 justify-end">
                          <FaBox /> Min Order
                        </span>
                        <span className="text-[10px] text-gray-700 dark:text-gray-300 font-bold">{product.minOrder || "100"} pcs</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto">
                       <Link
                      to={`/products/${product._id}`}
                      /* আপনার অরিজিনাল গ্র্যাডিয়েন্ট ডিজাইন ঠিক রাখা হয়েছে */
                      className="w-full text-center block px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-bold text-[11px] uppercase tracking-wider hover:from-teal-500 hover:to-indigo-600 transition-all duration-300"
                    >
                      View Details
                    </Link>
                      {/* <Link
                        to={`/products/${product._id}`}
                        className="w-full text-center block px-4 py-3 rounded-2xl bg-gray-900 dark:bg-indigo-600 text-white font-black text-[10px] uppercase tracking-[2px] hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all duration-300 shadow-md group-hover:shadow-indigo-500/20"
                      >
                        View Details
                      </Link> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-16 gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 disabled:opacity-20 hover:text-indigo-600 transition-all dark:text-white"
                >
                  <FaChevronLeft size={14} />
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages).keys()].map((num) => (
                    <button
                      key={num}
                      onClick={() => setPage(num + 1)}
                      className={`w-12 h-12 rounded-2xl text-[13px] font-black transition-all ${
                        page === num + 1
                          ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/20"
                          : "bg-white dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {num + 1}
                    </button>
                  ))}
                </div>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 disabled:opacity-20 hover:text-indigo-600 transition-all dark:text-white"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}