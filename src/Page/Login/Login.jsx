
// import React, { useRef, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import useAuth from "../../Hooks/useAuth";

// const Login = () => {
//   const { sininuser, googlelogin, resetPassword } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const emailref = useRef();

//   const [showPassword, setShowPassword] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   // ✔ Login Handler
//   const onSubmit = (data) => {
//     const { email, password } = data;

//     sininuser(email, password)
//       .then(() => {
//         toast.success("Login Successful!");
//         reset();
//         navigate(location.state ? location.state : "/");
//       })
//       .catch((err) => toast.error(err.message));
//   };

//   // ✔ Reset Password
//   const handelpass = () => {
//     const email = emailref.current.value;
//     if (!email) return toast.error("Please enter email!");
//     resetPassword(email)
//       .then(() => toast("Check your email!"))
//       .catch((err) => toast.error(err.message));
//   };

//   // ✔ Google Login
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
//         <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow">
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
//                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                 message: "Enter a valid email",
//               },
//             })}
//             ref={emailref}
//             className="w-full mt-1 mb-4 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//             placeholder="Enter your email"
//           />
//           {errors.email && (
//             <p className="text-red-600 text-sm mb-2">{errors.email.message}</p>
//           )}

//           {/* Password */}
//           <label className="font-semibold text-gray-700">Password</label>
//           <div className="relative mt-1 mb-2">
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
//                   message: "Must contain uppercase and lowercase letters",
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
//             <p className="text-red-600 text-sm mb-2">{errors.password.message}</p>
//           )}

//           {/* Forgot Password */}
//           <p
//             onClick={handelpass}
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

//         {/* Google Button */}
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
//           <Link to="/register" className="text-indigo-600 font-bold hover:underline">
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

  // ✅ Login Handler
  // const onSubmit = (data) => {
  //   const { email, password } = data;

  //   sininuser(email, password)
  //     .then(() => {
  //       toast.success("Login Successful!");
  //       reset();
  //       navigate(location.state ? location.state : "/");
  //     })
  //     .catch((err) => toast.error(err.message));
  // };

// const onSubmit = async (data) => {
//   const { email, password } = data;
//   try {
//     await sininuser(email, password);
//     toast.success("Login successful!");

//     // 🔹 dbUser role এখন AuthProvider থেকে automatically fetch হবে
//     console.log("DB User role:", dbUser?.role);
//   } catch (err) {
//     toast.error(err.message);
//   }
// };
// ✅ Login Handler
const onSubmit = (data) => {
  const { email, password } = data;

  sininuser(email, password)
    .then(() => {
      toast.success("Login successful!");
      
      // 🔹 dbUser role এখন AuthProvider থেকে automatically fetch হবে
      // মনে রাখবেন, dbUser আপডেট হতে কয়েক মিলি সেকেন্ড সময় নিতে পারে
      console.log("DB User role:", dbUser?.role);

      reset(); // ফর্ম ক্লিন করার জন্য
      navigate(location.state ? location.state : "/"); // আগের পেজে বা হোমে পাঠানোর জন্য
    })
    .catch((err) => {
      toast.error(err.message);
    });
};
  // ✅ Forgot Password (react-hook-form way)
  const handleResetPassword = () => {
    const email = watch("email");
    if (!email) {
      return toast.error("Please enter your email first!");
    }

    resetPassword(email)
      .then(() => toast.success("Check your email for reset link"))
      .catch((err) => toast.error(err.message));
  };

  // ✅ Google Login
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
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
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
                value:
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email",
              },
            })}
            className="w-full mt-1 mb-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mb-2">
              {errors.email.message}
            </p>
          )}

          {/* Password */}
          <label className="font-semibold text-gray-700">Password</label>
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
                  message:
                    "Must contain at least one uppercase and one lowercase letter",
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
            <p className="text-red-600 text-sm mb-2">
              {errors.password.message}
            </p>
          )}

          {/* Forgot Password */}
          <p
            onClick={handleResetPassword}
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

        {/* Google Login */}
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
          <Link
            to="/register"
            className="text-indigo-600 font-bold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import useAuth from "../../Hooks/useAuth";
// import axios from "axios"; // axios import করতে হবে

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

//   // ✅ Login Handler with JWT
//   const onSubmit = (data) => {
//     const { email, password } = data;

//     sininuser(email, password)
//       .then((result) => {
//         const loggedUser = result.user;
//         const userInfo = { email: loggedUser.email };

//         // 🔹 ব্যাকএন্ড থেকে টোকেন নেওয়ার জন্য কল
//         axios.post('https://germents-factory-server.vercel.app/jwt', userInfo)
//           .then(res => {
//             if (res.data.token) {
//               localStorage.setItem('access-token', res.data.token);
//               toast.success("Login successful!");
//               reset(); 
//               navigate(location.state ? location.state : "/");
//             }
//           })
//           .catch(err => {
//             console.error("JWT Error:", err);
//             toast.error("Failed to generate secure token.");
//           });
//       })
//       .catch((err) => {
//         toast.error(err.message);
//       });
//   };

//   // ✅ Forgot Password
//   const handleResetPassword = () => {
//     const email = watch("email");
//     if (!email) {
//       return toast.error("Please enter your email first!");
//     }

//     resetPassword(email)
//       .then(() => toast.success("Check your email for reset link"))
//       .catch((err) => toast.error(err.message));
//   };

//   // ✅ Google Login with JWT
//   const handleGoogle = () => {
//     googlelogin()
//       .then((result) => {
//         const loggedUser = result.user;
//         const userInfo = { email: loggedUser.email };

//         axios.post('https://germents-factory-server.vercel.app/jwt', userInfo)
//           .then(res => {
//             if (res.data.token) {
//               localStorage.setItem('access-token', res.data.token);
//               toast.success("Logged in with Google!");
//               navigate("/");
//             }
//           });
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
//                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                 message: "Enter a valid email",
//               },
//             })}
//             className="w-full mt-1 mb-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//             placeholder="Enter your email"
//           />
//           {errors.email && (
//             <p className="text-red-600 text-sm mb-2">{errors.email.message}</p>
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
//                   message: "Must contain at least one uppercase and one lowercase letter",
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
//             <p className="text-red-600 text-sm mb-2">{errors.password.message}</p>
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

//         <div className="text-center my-4 text-gray-600 font-semibold">OR</div>

//         {/* Google Login */}
//         <button
//           onClick={handleGoogle}
//           className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border py-3 rounded-xl hover:bg-gray-100 transition font-semibold"
//         >
//           <FaGoogle className="text-xl" />
//           Continue with Google
//         </button>

//         <p className="mt-6 text-center text-gray-700">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-indigo-600 font-bold hover:underline">
//             Register
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;
// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxios";
// // import axios from "axios";

// const Login = () => {
//   const { sininuser, googlelogin, resetPassword } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
// const axiosSecure=useAxiosSecure()
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//   } = useForm();

//   // ✅ Login Handler (Email & Password)
//   const onSubmit = async (data) => {
//     const { email, password } = data;

//     try {
//       // ১. ফায়ারবেস লগইন
//       const result = await sininuser(email, password);
//       const loggedUser = result.user;
//       const userInfo = { email: loggedUser.email };

//       // ২. ব্যাকএন্ড থেকে JWT টোকেন সংগ্রহ
//       const res = await axiosSecure.post('/jwt', userInfo);
      
//       if (res.data.token) {
//         // ৩. টোকেন লোকাল স্টোরেজে রাখা
//         localStorage.setItem('access-token', res.data.token);
        
//         toast.success("Login Successful!");
//         reset();
        
//         // ৪. রিডাইরেক্ট (আগের পেজে অথবা হোমে)
//         const from = location.state?.from?.pathname || "/";
//         navigate(from, { replace: true });
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(err.message || "Login failed. Please try again.");
//     }
//   };

//   // ✅ Google Login Handler
//   // const handleGoogle = () => {
//   //   googlelogin()
//   //     .then(async (result) => {
//   //       const loggedUser = result.user;
//   //       const userInfo = { email: loggedUser.email };

//   //       try {
//   //         const res = await axios.post('https://germents-factory-server.vercel.app/jwt', userInfo);
//   //         if (res.data.token) {
//   //           localStorage.setItem('access-token', res.data.token);
//   //           toast.success("Logged in with Google!");
//   //           navigate("/");
//   //         }
//   //       } catch (err) {
//   //         toast.error("Security token generation failed.");
//   //       }
//   //     })
//   //     .catch((err) => toast.error(err.message));
//   // };
// const handleGoogle = async () => {
//   try {
//     // পপআপ কলটি সরাসরি ফাংশনের শুরুতে রাখুন
//     const result = await googlelogin(); 
//     const loggedUser = result.user;
//     const userInfo = { email: loggedUser.email };

//     // এরপর বাকি লজিক (JWT/Database) চালান
//     const res = await axiosSecure.post('/jwt', userInfo);
//     if (res.data.token) {
//       localStorage.setItem('access-token', res.data.token);
//       toast.success("Logged in with Google!");
//       navigate("/");
//     }
//   } catch (err) {
//     console.error(err);
//     // পপআপ ইউজার বন্ধ করে দিলে যেন এরর না দেখায়
//     if (err.code !== "auth/popup-closed-by-user") {
//       toast.error(err.message);
//     }
//   }
// };
//   // ✅ Reset Password Handler
//   const handleResetPassword = () => {
//     const email = watch("email");
//     if (!email) {
//       return toast.error("Please enter your email first!");
//     }

//     resetPassword(email)
//       .then(() => toast.success("Check your email for reset link"))
//       .catch((err) => toast.error(err.message));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 px-4 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="backdrop-blur-xl bg-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/40"
//       >
//         <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow">
//           Login
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Email Field */}
//           <div className="mb-4">
//             <label className="font-semibold text-gray-700 block mb-1">Email</label>
//             <input
//               type="email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                   message: "Enter a valid email",
//                 },
//               })}
//               className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div className="mb-2">
//             <label className="font-semibold text-gray-700 block mb-1">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Password must be at least 6 characters",
//                   },
//                 })}
//                 className="w-full px-4 py-3 pr-10 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
//                 placeholder="Enter your password"
//               />
//               <span
//                 className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 text-xl"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//             {errors.password && (
//               <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Forgot Password Link */}
//           <div className="text-right mb-6">
//             <span
//               onClick={handleResetPassword}
//               className="text-indigo-600 font-medium text-sm cursor-pointer hover:underline"
//             >
//               Forgot Password?
//             </span>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition active:scale-95"
//           >
//             Login
//           </button>
//         </form>

//         <div className="relative flex items-center justify-center my-6">
//           <div className="border-t w-full border-gray-300"></div>
//           <span className="absolute bg-white/30 px-3 text-gray-600 text-sm font-bold backdrop-blur-md">OR</span>
//         </div>

//         {/* Google Login Button */}
//         <button
//           onClick={handleGoogle}
//           className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition font-semibold shadow-sm active:scale-95"
//         >
//           <FaGoogle className="text-red-500 text-xl" />
//           Continue with Google
//         </button>

//         {/* Register Redirect */}
//         <p className="mt-8 text-center text-gray-700">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-indigo-600 font-bold hover:underline">
//             Register Now
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;