// import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router";
import { motion } from "framer-motion";
// import useAuth from "../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";

import { useQuery } from "@tanstack/react-query";



export default function LatestProducts() {

  const axiosSecure=useAxios()
  const {   data: products = [],
    isLoading,
    isError,
    error,} =useQuery ({
    queryKey: ["latestProducts",6],
    queryFn: async()=>{
     const res = await axiosSecure.get('/products?limit=6')
      return res.data
    }
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  if (isError) {
    return (
      <p className="text-center py-10 text-red-500">
        Error: {error.message}
      </p>
    );
  }

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <p className="font-bold text-lg mb-4">
                  ${product.price}
                </p>

                <Link
                  to={`/products/${product._id}`}
                  className="inline-block px-4 py-2 rounded-xl  bg-gradient-to-r from-teal-400 to-indigo-500  text-white  hover:from-teal-600 hover:to-indigo-600 transition-colors duration-300 "
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
