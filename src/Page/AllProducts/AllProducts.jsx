
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

export default function AllProducts() {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allProducts"],
    // enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(
        '/all-products'
      );
      return res.data;
    },
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
    <section className="py-14 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          All Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
              >
                {/* Product Image */}
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5 flex flex-col flex-grow">
                  {/* Product Name */}
                  <h3 className="text-xl font-semibold mb-1">
                    {product.name}
                  </h3>

                  {/* Category */}
                  <p className="text-sm text-gray-500 mb-2">
                    Category:{" "}
                    <span className="font-medium text-gray-700">
                      {product.category || "N/A"}
                    </span>
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price & Quantity */}
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-bold text-lg">
                      ${product.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty:{" "}
                      <span className="font-semibold">
                        {product.availableQuantity ?? 0}
                      </span>
                    </p>
                  </div>

                  {/* Button */}
                  <Link
                    to={`/products/${product._id}`}
                    className="inline-block px-4 py-2 rounded-xl  bg-gradient-to-r from-teal-400 to-indigo-500  text-white  hover:from-teal-600 hover:to-indigo-600 transition-colors duration-300  text-center font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
