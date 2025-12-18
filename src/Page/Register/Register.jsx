
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

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { name, photo, email, password, role } = data;
    const status = "pending";
    try {
      const result = await creatUser(email, password);
      const loggedUser = result.user;
      await updateProfile(loggedUser, { displayName: name, photoURL: photo });
      setUser({ ...loggedUser, displayName: name, photoURL: photo });
      await axiosSecure.post("/users", { name, email, photo, role, status });
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
      const displayName = user.displayName || "Google User";
      const photoURL = user.photoURL || "https://i.ibb.co/7CQVJNm/default-avatar.png";
      await updateProfile(user, { displayName, photoURL });
      await axiosSecure.post("/users", { name: displayName, email: user.email, photo: photoURL, role: "buyer", status: "pending" });
      setUser({ ...user, displayName, photoURL });
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Google login failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-200 px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/30"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-md">
            Register Your Account
          </h1>
          <p className="text-gray-600 mt-2">
            Join now and get started in seconds
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* User Info */}
          <div>
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                className="input"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
              />
              <input
                className="input"
                placeholder="Photo URL"
                {...register("photo", { required: "Photo URL is required" })}
              />
              <input
                className="input bg-gray-100 md:col-span-2"
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              <select
                className="input md:col-span-2"
                {...register("role", { required: "Role is required" })}
              >
                <option value="">Select Role</option>
                <option value="buyer">Buyer</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">Set Password</h2>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="input pr-10"
                {...register("password", { required: "Password is required" })}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-indigo-600 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold text-lg hover:scale-[1.02] transition transform"
          >
            Register
          </button>
        </form>

        {/* OR Divider */}
        <div className="text-center my-6 text-gray-500 font-semibold">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border py-3 rounded-2xl hover:bg-gray-100 transition font-semibold"
        >
          <FaGoogle className="text-xl text-red-500" />
          Continue with Google
        </button>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
