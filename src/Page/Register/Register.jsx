
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

const Register = () => {
  // ✅ refetch নিয়ে আসলাম যাতে ডাটা সেভ হওয়ার পর স্টেট আপডেট হয়
  const { creatUser, googlelogin, refetch } = useAuth(); 
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, photo, email, password, role } = data;
    const status = "pending";

    try {
      const result = await creatUser(email, password);
      const loggedUser = result.user;

      await updateProfile(loggedUser, { displayName: name, photoURL: photo });

      const userInfo = { name, email, photo, role, status };
      const res = await axiosSecure.post("/users", userInfo);

      if (res.data.insertedId) {
        // ✅ ডাটাবেজে সেভ হওয়ার পর স্টেট রি-ফেচ করা খুবই জরুরি
        if (refetch) await refetch(); 
        
        toast.success(`Registered successfully as ${role}!`);
        reset();
        // বায়ার হলে সরাসরি মাই অর্ডার পেজে পাঠিয়ে দিন
        navigate(role === 'buyer' ? "/dashboard/myOrders" : "/dashboard/profile");
      }
    } catch (err) {
      console.log("Error Details:", err);
      toast.error(err.message || "Something went wrong during registration");
    }
  };

  const handleGoogle = () => {
    googlelogin()
      .then(async (result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "buyer",
          status: "pending",
        };
        await axiosSecure.post("/users", userInfo);
        
        // ✅ গুগল লগইনের পরেও রি-ফেচ করুন
        if (refetch) await refetch();
        
        toast.success("Logged in with Google!");
        navigate("/dashboard/myOrders");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="backdrop-blur-xl bg-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/40"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-gray-700">Full Name</label>
              <input type="text" {...register("name", { required: "Name is required" })} className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your name" />
              {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <label className="font-semibold text-gray-700">Photo URL</label>
              <input type="text" {...register("photo", { required: "Photo URL is required" })} className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter photo link" />
              {errors.photo && <p className="text-red-600 text-sm">{errors.photo.message}</p>}
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700">Email Address</label>
            <input type="email" {...register("email", { required: "Email is required" })} className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter your email" />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Select Role</label>
            <select {...register("role", { required: "Please select a role" })} className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 outline-none font-medium text-gray-600">
              <option value="">Choose Role</option>
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-gray-700">Password</label>
            <div className="relative mt-1">
              <input type={showPassword ? "text" : "password"} {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })} className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg active:scale-95">Create Account</button>
        </form>

        <div className="text-center my-4 text-gray-600 font-semibold italic">OR</div>
        <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border py-3 rounded-xl hover:bg-gray-100 transition font-semibold">
          <FaGoogle className="text-xl text-red-500" /> Register with Google
        </button>
      </motion.div>
    </div>
  );
};

export default Register;