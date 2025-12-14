

import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

export default function Register() {
  const { creatUser, setUser, googlelogin } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, photo, email, password, role } = data;
    const status = "pending";

    try {
      // Create user with email/password
      const result = await creatUser(email, password);
      const loggedUser = result.user;

      // Update displayName and photoURL
      await updateProfile(loggedUser, { displayName: name, photoURL: photo });
      setUser({ ...loggedUser, displayName: name, photoURL: photo });

      // Save to backend
      const newUser = { name, email, photo, role, status };
      await axiosSecure.post("/users", newUser);

      toast.success("Registration Successful!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await googlelogin();
      const user = result.user;

      // Fallback for missing displayName or photoURL
      const displayName = user.displayName || "Google User";
      const photoURL =
        user.photoURL || "https://i.ibb.co/7CQVJNm/default-avatar.png";

      // Update Firebase profile just in case
      await updateProfile(user, { displayName, photoURL });

      const newUser = {
        name: displayName,
        email: user.email,
        photo: photoURL,
        role: "buyer",
        status: "pending",
      };

      await axiosSecure.post("/users", newUser);
      setUser({ ...user, displayName, photoURL });

      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Google login failed");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="backdrop-blur-xl bg-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-white/40"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 drop-shadow">
          Register your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="font-semibold text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="font-semibold text-gray-700">Photo URL</label>
            <input
              type="text"
              placeholder="Photo URL"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              {...register("photo", { required: "Photo URL is required" })}
            />
            {errors.photo && (
              <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="font-semibold text-gray-700">Role</label>
            <select
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              {...register("role", { required: "Role is required" })}
            >
              <option value="">Select Role</option>
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold text-gray-700">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-10 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                    message: "Must contain uppercase and lowercase letters",
                  },
                })}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <div className="text-center my-6 text-gray-600 font-semibold">OR</div>

        {/* Google login */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border py-3 rounded-xl hover:bg-gray-100 transition font-semibold"
        >
          <FaGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

