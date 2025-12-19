// src/Pages/Dashboard/OrderDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";

export default function OrderDetail() {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axiosSecure.get(`/orders/${id}`).then((res) => {
      setOrder(res.data);
    });
  }, [id]);

  if (!order) return <p className="text-center mt-10">Loading order details...</p>;

  const steps = ["pending", "shipped", "delivered"];
  const currentIndex = steps.indexOf(order.orderStatus?.toLowerCase()) >= 0 
                       ? steps.indexOf(order.orderStatus.toLowerCase()) 
                       : 0;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <Link to="/dashboard/myOrders" className="flex items-center mb-6 text-indigo-500  hover:underline">
        <FaArrowLeft className="mr-2" /> Back to My Orders
      </Link>

      <h2 className=" text-3xl font-bold mb-6 text-center text-indigo-700 ">Order Details</h2>

      {/* Order Info */}
      <div className="bg-white bg-gradient-to-r from-teal-400 to-indigo-500 text-white shadow-lg rounded-xl p-6 mb-8">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Product:</strong> {order.productTitle}</p>
        <p><strong>Quantity:</strong> {order.quantity || 1}</p>
        <p><strong>Price:</strong> ${order.orderPrice || order.price * (order.quantity || 1)}</p>
        <p><strong>Payment Status:</strong> {order.paymentStatus === "cod" ? "COD" : order.paymentStatus}</p>
        <p><strong>Order Status:</strong> {order.orderStatus}</p>
      </div>

      {/* Tracking Timeline */}
      <h3 className="text-xl font-semibold mb-4 text-indigo-700">Tracking Timeline</h3>
      <div className="relative">
        <div className="absolute left-5 top-0 w-1 bg-gray-300 h-full"></div>
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.2 }}
            className="flex items-center mb-8 relative"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                index <= currentIndex ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <div className="ml-6">
              <p className={`text-lg font-semibold ${index <= currentIndex ? "text-green-600" : "text-gray-500"}`}>
                {step.charAt(0).toUpperCase() + step.slice(1)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
