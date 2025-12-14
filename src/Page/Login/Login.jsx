
import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { sininuser, googlelogin, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const emailref = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✔ Login Handler
  const onSubmit = (data) => {
    const { email, password } = data;

    sininuser(email, password)
      .then(() => {
        toast.success("Login Successful!");
        reset();
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => toast.error(err.message));
  };

  // ✔ Reset Password
  const handelpass = () => {
    const email = emailref.current.value;
    if (!email) return toast.error("Please enter email!");
    resetPassword(email)
      .then(() => toast("Check your email!"))
      .catch((err) => toast.error(err.message));
  };

  // ✔ Google Login
  const handleGoogle = () => {
    googlelogin()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="backdrop-blur-xl bg-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/40"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label className="font-semibold text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email",
              },
            })}
            ref={emailref}
            className="w-full mt-1 mb-4 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mb-2">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className="font-semibold text-gray-700">Password</label>
          <div className="relative mt-1 mb-2">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                  message: "Must contain uppercase and lowercase letters",
                },
              })}
              className="w-full px-4 py-3 pr-10 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter your password"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mb-2">{errors.password.message}</p>
          )}

          {/* Forgot Password */}
          <p
            onClick={handelpass}
            className="text-indigo-600 font-medium text-sm cursor-pointer hover:underline mb-4"
          >
            Forgot Password?
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-4 text-gray-600 font-semibold">OR</div>

        {/* Google Button */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border py-3 rounded-xl hover:bg-gray-100 transition font-semibold"
        >
          <FaGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-700">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-bold hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
