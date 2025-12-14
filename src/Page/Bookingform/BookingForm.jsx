
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { motion } from "framer-motion";

export default function BookingPage() {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, watch, control, setValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      deliveryAddress: "",
      notes: "",
      quantity: product?.minOrder || 1,
    },
  });

  const watchedQuantity = watch("quantity");

  useEffect(() => {
    if (product) {
      setValue("quantity", product.minOrder || 1);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    if (!user) return navigate("/login");

    const quantity = Math.min(
      Math.max(data.quantity, product.minOrder),
      product.availableQuantity
    );

    const orderPrice = quantity * product.price;

    const orderData = {
      userId: user._id,
      email: user.email,
      productId: product._id,
      productTitle: product.name,
      price: product.price,
      quantity,
      orderPrice,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      deliveryAddress: data.deliveryAddress,
      notes: data.notes,
      paymentStatus: product.paymentOptions === "COD" ? "Pending" : "Unpaid",
    };

    try {
      const res = await axiosSecure.post("/bookings", orderData);
      if (product.paymentOptions !== "COD") {
        navigate(`/payment/${res.data._id}`);
      } else {
        navigate("/dashboard/my-orders");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Try again.");
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading product...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Error: {error.message}</p>;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/40"
      >
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 drop-shadow">
          Booking: {product.name}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">First Name</label>
              <input
                type="text"
                {...register("firstName", { required: "First name is required" })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white/80"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Last Name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white/80"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold text-gray-700 mb-1 block">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold text-gray-700 mb-1 block">Contact Number</label>
              <input
                type="text"
                {...register("contactNumber", { required: "Contact number is required" })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white/80"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-indigo-50 p-4 rounded-2xl space-y-3">
            <h2 className="text-xl font-semibold text-indigo-700">Product Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium mb-1 block">Product</label>
                <input
                  type="text"
                  value={product.name}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-gray-100 outline-none"
                />
              </div>
              <div>
                <label className="font-medium mb-1 block">Price per Unit</label>
                <input
                  type="number"
                  value={product.price}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-gray-100 outline-none"
                />
              </div>
              <div>
                <label className="font-medium mb-1 block">Quantity</label>
                <Controller
                  name="quantity"
                  control={control}
                  rules={{
                    required: true,
                    min: product.minOrder,
                    max: product.availableQuantity,
                  }}
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        let val = parseInt(e.target.value);
                        if (val < product.minOrder) val = product.minOrder;
                        if (val > product.availableQuantity) val = product.availableQuantity;
                        field.onChange(val);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white/80"
                    />
                  )}
                />
                <p className="text-sm text-gray-500">
                  Min: {product.minOrder}, Max: {product.availableQuantity}
                </p>
              </div>
              <div>
                <label className="font-medium mb-1 block">Total Price</label>
                <input
                  type="number"
                  value={watchedQuantity * product.price}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-gray-100 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-3">
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Delivery Address</label>
              <textarea
                {...register("deliveryAddress", { required: "Delivery address is required" })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white/80"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 mb-1 block">Additional Notes / Instructions</label>
              <textarea
                {...register("notes")}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none bg-white/80"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-teal-400 text-white font-bold text-lg hover:scale-105 transition-transform duration-300"
          >
            Place Order
          </button>
        </form>
      </motion.div>
    </section>
  );
}
