import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";


export default function ProductDetails() {
  const { id } = useParams(); // product id from URL
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch single product by id
  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });
  //  console.log(product.demoVideo)
  if (isLoading) return <p className="text-center py-10">Loading product...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Error: {error.message}</p>;

  // Determine if user can order
  // const canOrder = user && !["admin", "manager"].includes(user.role?.toLowerCase());

  const handleOrderClick = () => {
    if (!user) {
      navigate("/login"); // redirect to login if not logged in
    } else {
      navigate(`/booking/${product._id}`); // redirect to booking page
    }
  };

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Product Images / Video */}
        <div className="md:w-1/2">
          {product.images?.length > 0 ? (
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="rounded-2xl w-full h-80 object-cover"
              whileHover={{ scale: 1.05 }}
            />
          ) : (
            <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-2xl">
              No Image
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-600 mb-2">{product.description}</p>

          <p className="text-gray-500 mb-1">
            <span className="font-semibold">Category:</span> {product.category || "N/A"}
          </p>
          <p className="text-gray-500 mb-1">
            <span className="font-semibold">Price:</span> ${product.price}
          </p>
          <p className="text-gray-500 mb-1">
            <span className="font-semibold">Available Quantity:</span> {product.quantity ?? 0}
          </p>
          <p className="text-gray-500 mb-1">
            <span className="font-semibold">Minimum Order:</span> {product.minOrder ?? 1}
          </p>
          <p className="text-gray-500 mb-3">
            <span className="font-semibold">Payment Options:</span> {product.paymentOptions || "COD"}
          </p>
          {product.features && (
            <p className="text-gray-500 mb-3">
              <span className="font-semibold">Features:</span> {product.features}
            </p>
          )}
 <button
              onClick={handleOrderClick}
              className="mt-auto px-6 py-3 rounded-xl bg-gradient-to-r font-semibold from-teal-400 to-indigo-500  text-white  hover:from-teal-600 hover:to-indigo-600 transition-colors duration-300  transition"
            >
              Order  Now
            </button></div>

          {/* Product Demo Video
  {product.demoVideo && (
    

    <div className="w-full rounded-2xl overflow-hidden bg-black">
   
      <video
        className="w-full h-60 object-cover"
        controls
        preload="metadata"
      >
        <source src={product.demoVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )} */}




      </div>
    </section>
  );
}
