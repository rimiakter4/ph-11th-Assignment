

// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import useAuth from "../../Hooks/useAuth";

// const Login = () => {
//   const { sininuser, googlelogin, resetPassword, dbUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//   } = useForm();

  
// const onSubmit = (data) => {
//   const { email, password } = data;

//   sininuser(email, password)
//     .then(() => {
//       toast.success("Login successful!");
      
//       // 🔹 dbUser role এখন AuthProvider থেকে automatically fetch হবে
//       // মনে রাখবেন, dbUser আপডেট হতে কয়েক মিলি সেকেন্ড সময় নিতে পারে
//       console.log("DB User role:", dbUser?.role);

//       reset(); // ফর্ম ক্লিন করার জন্য
//       navigate(location.state ? location.state : "/"); // আগের পেজে বা হোমে পাঠানোর জন্য
//     })
//     .catch((err) => {
//       toast.error(err.message);
//     });
// };
//   // ✅ Forgot Password (react-hook-form way)
//   const handleResetPassword = () => {
//     const email = watch("email");
//     if (!email) {
//       return toast.error("Please enter your email first!");
//     }

//     resetPassword(email)
//       .then(() => toast.success("Check your email for reset link"))
//       .catch((err) => toast.error(err.message));
//   };

//   // ✅ Google Login
//   const handleGoogle = () => {
//     googlelogin()
//       .then(() => {
//         toast.success("Logged in with Google!");
//         navigate("/");
//       })
//       .catch((err) => toast.error(err.message));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="backdrop-blur-xl bg-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/40"
//       >
//         <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Email */}
//           <label className="font-semibold text-gray-700">Email</label>
//           <input
//             type="email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value:
//                   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                 message: "Enter a valid email",
//               },
//             })}
//             className="w-full mt-1 mb-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//             placeholder="Enter your email"
//           />
//           {errors.email && (
//             <p className="text-red-600 text-sm mb-2">
//               {errors.email.message}
//             </p>
//           )}

//           {/* Password */}
//           <label className="font-semibold text-gray-700">Password</label>
//           <div className="relative mt-1 mb-1">
//             <input
//               type={showPassword ? "text" : "password"}
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters",
//                 },
//                 pattern: {
//                   value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
//                   message:
//                     "Must contain at least one uppercase and one lowercase letter",
//                 },
//               })}
//               className="w-full px-4 py-3 pr-10 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//               placeholder="Enter your password"
//             />
//             <span
//               className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           {errors.password && (
//             <p className="text-red-600 text-sm mb-2">
//               {errors.password.message}
//             </p>
//           )}

//           {/* Forgot Password */}
//           <p
//             onClick={handleResetPassword}
//             className="text-indigo-600 font-medium text-sm cursor-pointer hover:underline mb-4"
//           >
//             Forgot Password?
//           </p>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
//           >
//             Login
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="text-center my-4 text-gray-600 font-semibold">OR</div>

//         {/* Google Login */}
//         <button
//           onClick={handleGoogle}
//           className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border py-3 rounded-xl hover:bg-gray-100 transition font-semibold"
//         >
//           <FaGoogle className="text-xl" />
//           Continue with Google
//         </button>

//         {/* Register Link */}
//         <p className="mt-6 text-center text-gray-700">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-indigo-600 font-bold hover:underline"
//           >
//             Register
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { sininuser, googlelogin, resetPassword, dbUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    sininuser(email, password)
      .then(() => {
        toast.success("Login successful!");
        reset();
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleResetPassword = () => {
    const email = watch("email");
    if (!email) {
      return toast.error("Please enter your email first!");
    }

    resetPassword(email)
      .then(() => toast.success("Check your email for reset link"))
      .catch((err) => toast.error(err.message));
  };

  const handleGoogle = () => {
    googlelogin()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    /* ১. ডার্ক মোড অনুযায়ী ব্যাকগ্রাউন্ড পরিবর্তন */
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-950 px-4 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        /* ২. কার্ডের গ্লাস-মরফিজম ইফেক্ট ডার্ক মোডে অ্যাডজাস্ট করা হয়েছে */
        className="backdrop-blur-xl bg-white/30 dark:bg-black/30 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/40 dark:border-white/10"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 dark:text-indigo-400 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label className="font-semibold text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email",
              },
            })}
            /* ৩. ইনপুট ফিল্ড ডার্ক মোড অনুযায়ী */
            className="w-full mt-1 mb-1 px-4 py-3 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-600 dark:text-red-400 text-sm mb-2">
              {errors.email.message}
            </p>
          )}

          {/* Password */}
          <label className="font-semibold text-gray-700 dark:text-gray-300 mt-4 block">Password</label>
          <div className="relative mt-1 mb-1">
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
                  message: "Must contain at least one uppercase and one lowercase letter",
                },
              })}
              className="w-full px-4 py-3 pr-10 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Enter your password"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-600 dark:text-red-400 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          {/* Forgot Password */}
          <p
            onClick={handleResetPassword}
            className="text-indigo-600 dark:text-indigo-400 font-medium text-sm cursor-pointer hover:underline mb-4 inline-block"
          >
            Forgot Password?
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 dark:bg-indigo-500 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-4 text-gray-600 dark:text-gray-400 font-semibold flex items-center gap-2 before:content-[''] before:flex-1 before:border-b dark:before:border-gray-700 after:content-[''] after:flex-1 after:border-b dark:after:border-gray-700">
          OR
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition font-semibold shadow-sm"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-700 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;