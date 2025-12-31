
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