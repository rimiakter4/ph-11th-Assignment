
// import { Link, useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { updateProfile } from "firebase/auth";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../../Hooks/useAuth";
// import useAxios from "../../Hooks/useAxios";

// export default function Register() {
//   const { creatUser, setUser, googlelogin } = useAuth();
//   const navigate = useNavigate();
//   const axiosSecure = useAxios();
//   const [showPassword, setShowPassword] = useState(false);

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = async (data) => {
//     const { name, photo, email, password, role } = data;
//     const status = "pending";
//     try {
//       const result = await creatUser(email, password);
//       const loggedUser = result.user;
//       await updateProfile(loggedUser, { displayName: name, photoURL: photo });
//       setUser({ ...loggedUser, displayName: name, photoURL: photo });
//       await axiosSecure.post("/users", { name, email, photo, role, status });
//       toast.success("Registration Successful!");
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message || "Something went wrong");
//     }
//   };

//   const handleGoogle = async () => {
//     try {
//       const result = await googlelogin();
//       const user = result.user;
//       const displayName = user.displayName || "Google User";
//       const photoURL = user.photoURL || "https://i.ibb.co/7CQVJNm/default-avatar.png";
//       await updateProfile(user, { displayName, photoURL });
//       await axiosSecure.post("/users", { name: displayName, email: user.email, photo: photoURL, role: "buyer", status: "pending" });
//       setUser({ ...user, displayName, photoURL });
//       toast.success("Logged in with Google!");
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message || "Google login failed");
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-200 px-4 py-20">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//         className="w-full max-w-4xl bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/30"
//       >
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-md">
//             Register Your Account
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Join now and get started in seconds
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

//           {/* User Info */}
//           <div>
//             <h2 className="text-xl font-semibold text-indigo-700 mb-4">User Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <input
//                 className="input"
//                 placeholder="Full Name"
//                 {...register("name", { required: "Name is required" })}
//               />
//               <input
//                 className="input"
//                 placeholder="Photo URL"
//                 {...register("photo", { required: "Photo URL is required" })}
//               />
//               <input
//                 className="input bg-gray-100 md:col-span-2"
//                 type="email"
//                 placeholder="Email"
//                 {...register("email", { required: "Email is required" })}
//               />
//               <select
//                 className="input md:col-span-2"
//                 {...register("role", { required: "Role is required" })}
//               >
//                 <option value="">Select Role</option>
//                 <option value="buyer">Buyer</option>
//                 <option value="manager">Manager</option>
//               </select>
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <h2 className="text-xl font-semibold text-indigo-700 mb-4">Set Password</h2>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 className="input pr-10"
//                 {...register("password", { required: "Password is required" })}
//               />
//               <span
//                 className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-indigo-600 transition"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold text-lg hover:scale-[1.02] transition transform"
//           >
//             Register
//           </button>
//         </form>

//         {/* OR Divider */}
//         <div className="text-center my-6 text-gray-500 font-semibold">OR</div>

//         {/* Google Login */}
//         <button
//           onClick={handleGoogle}
//           className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border py-3 rounded-2xl hover:bg-gray-100 transition font-semibold"
//         >
//           <FaGoogle className="text-xl text-red-500" />
//           Continue with Google
//         </button>

//         <p className="mt-6 text-center text-gray-700">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600 font-bold hover:underline">
//             Login
//           </Link>
//         </p>
//       </motion.div>
//     </section>
//   );
// }
// import { Link, useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { updateProfile } from "firebase/auth";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../../Hooks/useAuth";
// import useAxios from "../../Hooks/useAxios";

// export default function Register() {
//   const { creatUser, setUser, googlelogin } = useAuth();
//   const navigate = useNavigate();
//   const axiosSecure = useAxios();
//   const [showPassword, setShowPassword] = useState(false);

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   // ইমেইল পাসওয়ার্ড দিয়ে রেজিস্ট্রেশন
//   const onSubmit = async (data) => {
//     const { name, photo, email, password, role } = data; // ফর্ম থেকে রোল আসছে
//     const status = "pending";

//     try {
//       // ১. ফায়ারবেসে ইউজার তৈরি
//       const result = await creatUser(email, password);
//       const loggedUser = result.user;

//       // ২. ফায়ারবেস প্রোফাইল আপডেট (নাম ও ছবি)
//       await updateProfile(loggedUser, { displayName: name, photoURL: photo });

//       // ৩. ডাটাবেজে (MongoDB) ইউজারের তথ্য পাঠানো (রোল সহ)
//       const userInfo = { name, email, photo, role, status };
//       const res = await axiosSecure.post("/users", userInfo);

//       if (res.data.insertedId) {
//         setUser({ ...loggedUser, displayName: name, photoURL: photo });
//         toast.success(`Registered successfully as ${role}!`);
//         navigate("/");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message || "Something went wrong");
//     }
//   };

//   // গুগল দিয়ে রেজিস্ট্রেশন
//   const handleGoogle = async () => {
//     try {
//       const result = await googlelogin();
//       const user = result.user;
      
//       const displayName = user.displayName || "Google User";
//       const photoURL = user.photoURL || "https://i.ibb.co/7CQVJNm/default-avatar.png";
      
//       // গুগল লগইনের ক্ষেত্রে ডিফল্ট রোল "buyer" সেট করা হয়েছে
//       const userInfo = { 
//         name: displayName, 
//         email: user.email, 
//         photo: photoURL, 
//         role: "buyer", 
//         status: "pending" 
//       };

//       await axiosSecure.post("/users", userInfo);
//       setUser({ ...user, displayName, photoURL });
//       toast.success("Logged in with Google!");
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//       toast.error("Google login failed");
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-200 px-4 py-20">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//         className="w-full max-w-4xl bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/30"
//       >
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-md">
//             Register Your Account
//           </h1>
//           <p className="text-gray-600 mt-2">Join now and start managing your shifts</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             {/* Name */}
//             <div>
//               <input
//                 className="input border p-3 rounded-lg w-full"
//                 placeholder="Full Name"
//                 {...register("name", { required: "Name is required" })}
//               />
//               {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//             </div>

//             {/* Photo URL */}
//             <div>
//               <input
//                 className="input border p-3 rounded-lg w-full"
//                 placeholder="Photo URL"
//                 {...register("photo", { required: "Photo URL is required" })}
//               />
//               {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
//             </div>

//             {/* Email */}
//             <div className="md:col-span-2">
//               <input
//                 className="input border p-3 rounded-lg w-full"
//                 type="email"
//                 placeholder="Email Address"
//                 {...register("email", { required: "Email is required" })}
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             {/* Role Selection - এখানে ইউজার ম্যানেজার বা বায়ার সিলেক্ট করবে */}
//             <div className="md:col-span-2">
//               <select
//                 className="select select-bordered w-full p-3 rounded-lg border text-gray-600 font-medium"
//                 {...register("role", { required: "Please select a role" })}
//               >
//                 <option value="">Select Role</option>
//                 <option value="buyer">Buyer</option>
//                 <option value="manager">Manager</option>
//               </select>
//               {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
//             </div>

//             {/* Password */}
//             <div className="md:col-span-2 relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password (min 6 characters)"
//                 className="input border p-3 rounded-lg w-full"
//                 {...register("password", { 
//                   required: "Password is required", 
//                   minLength: { value: 6, message: "Password must be at least 6 characters" } 
//                 })}
//               />
//               <span
//                 className="absolute right-3 top-4 cursor-pointer text-gray-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </span>
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold text-lg hover:scale-[1.01] transition transform shadow-lg"
//           >
//             Register Now
//           </button>
//         </form>

//         <div className="divider text-gray-400 my-6 italic">OR</div>

//         <button
//           onClick={handleGoogle}
//           className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border py-3 rounded-2xl hover:bg-gray-50 transition font-semibold shadow-sm"
//         >
//           <FaGoogle className="text-xl text-red-500" />
//           Register with Google
//         </button>

//         <p className="mt-6 text-center text-gray-700">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600 font-bold hover:underline">
//             Login
//           </Link>
//         </p>
//       </motion.div>
//     </section>
//   );
// }
// import { Link, useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { updateProfile } from "firebase/auth";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../../Hooks/useAuth";
// import useAxios from "../../Hooks/useAxios";

// export default function Register() {
//   const { creatUser, setUser, googlelogin } = useAuth();
//   const navigate = useNavigate();
//   const axiosSecure = useAxios();
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // ইমেইল ও পাসওয়ার্ড দিয়ে রেজিস্ট্রেশন
//   const onSubmit = async (data) => {
//     const { name, photo, email, password, role } = data;
//     const status = "pending";
//     try {
//       const result = await creatUser(email, password);
//       const loggedUser = result.user;

//       // প্রোফাইল আপডেট
//       await updateProfile(loggedUser, { displayName: name, photoURL: photo });

//       // ডাটাবেজে ইউজার সেভ (রোল সহ)
//       const userInfo = { name, email, photo, role, status };
//       const res = await axiosSecure.post("/users", userInfo);

//       if (res.data.insertedId) {
//         setUser({ ...loggedUser, displayName: name, photoURL: photo });
//         toast.success(`Registered successfully as ${role}!`);
//         navigate("/");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message || "Something went wrong");
//     }
//   };

//   // গুগল লগইন
//   const handleGoogle = async () => {
//     try {
//       const result = await googlelogin();
//       const user = result.user;
//       const displayName = user.displayName || "Google User";
//       const photoURL = user.photoURL || "https://i.ibb.co/7CQVJNm/default-avatar.png";

//       // গুগলের ক্ষেত্রে ডিফল্ট রোল "buyer"
//       const userInfo = {
//         name: displayName,
//         email: user.email,
//         photo: photoURL,
//         role: "buyer",
//         status: "pending",
//       };

//       await axiosSecure.post("/users", userInfo);
//       setUser({ ...user, displayName, photoURL });
//       toast.success("Logged in with Google!");
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//       toast.error("Google login failed");
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-200 px-4 py-20">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//         className="w-full max-w-4xl bg-white/90 backdrop-blur-lg p-6 md:p-10 rounded-3xl shadow-xl border border-white/30"
//       >
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-md">
//             Register Your Account
//           </h1>
//           <p className="text-gray-600 mt-2">Join now and choose your role to get started</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             {/* Full Name */}
//             <div className="flex flex-col gap-1">
//               <input
//                 className="input input-bordered w-full p-4 rounded-xl border-gray-300 focus:border-indigo-500"
//                 placeholder="Full Name"
//                 {...register("name", { required: "Name is required" })}
//               />
//               {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
//             </div>

//             {/* Photo URL */}
//             <div className="flex flex-col gap-1">
//               <input
//                 className="input input-bordered w-full p-4 rounded-xl border-gray-300 focus:border-indigo-500"
//                 placeholder="Photo URL"
//                 {...register("photo", { required: "Photo URL is required" })}
//               />
//               {errors.photo && <span className="text-red-500 text-sm">{errors.photo.message}</span>}
//             </div>

//             {/* Email */}
//             <div className="md:col-span-2 flex flex-col gap-1">
//               <input
//                 className="input input-bordered w-full p-4 rounded-xl border-gray-300 focus:border-indigo-500"
//                 type="email"
//                 placeholder="Email Address"
//                 {...register("email", { required: "Email is required" })}
//               />
//               {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
//             </div>

//             {/* Role Selection */}
//             <div className="md:col-span-2 flex flex-col gap-1">
//               <select
//                 className="select select-bordered w-full p-4 h-14 rounded-xl border-gray-300 focus:border-indigo-500 font-medium text-gray-600"
//                 {...register("role", { required: "Please select a role" })}
//                 defaultValue=""
//               >
//                 <option value="" disabled>Select Role</option>
//                 <option value="buyer">Buyer (Default)</option>
//                 <option value="manager">Shop Manager</option>
//               </select>
//               {errors.role && <span className="text-red-500 text-sm">{errors.role.message}</span>}
//             </div>

//             {/* Password with Eye Button */}
//             <div className="md:col-span-2 flex flex-col gap-1">
//               <div className="relative flex items-center">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password (min 6 characters)"
//                   className="input input-bordered w-full p-4 pr-12 rounded-xl border-gray-300 focus:border-indigo-500"
//                   {...register("password", { 
//                     required: "Password is required", 
//                     minLength: { value: 6, message: "Minimum 6 characters required" } 
//                   })}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 text-gray-500 hover:text-indigo-600 focus:outline-none z-10"
//                 >
//                   {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
//                 </button>
//               </div>
//               {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-bold text-lg hover:shadow-lg transition-all active:scale-95"
//           >
//             Register Now
//           </button>
//         </form>

//         <div className="divider text-gray-400 my-6">OR</div>

//         {/* Google Login */}
//         <button
//           onClick={handleGoogle}
//           className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border py-3 rounded-2xl hover:bg-gray-50 transition font-semibold shadow-sm border-gray-300"
//         >
//           <FaGoogle className="text-xl text-red-500" />
//           Continue with Google
//         </button>

//         <p className="mt-6 text-center text-gray-700">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600 font-bold hover:underline">
//             Login
//           </Link>
//         </p>
//       </motion.div>
//     </section>
//   );
// }
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import { updateProfile } from "firebase/auth";
// import useAuth from "../../Hooks/useAuth";
// import useAxios from "../../Hooks/useAxios";

// const Register = () => {
//   const { creatUser,  dbUser, googlelogin } = useAuth();
//   const navigate = useNavigate();
//   const axiosSecure = useAxios();
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   // ✅ Register Handler
//   const onSubmit = async (data) => {
//     const { name, photo, email, password, role } = data;
//     const status = "pending";

//     try {
//       // ১. ফায়ারবেসে ইউজার তৈরি
//       const result = await creatUser(email, password);
//       const loggedUser = result.user;

//       // ২. ফায়ারবেস প্রোফাইল আপডেট
//       await updateProfile(loggedUser, { displayName: name, photoURL: photo });

//       // ৩. ডাটাবেজে ইউজারের তথ্য পাঠানো (Dynamic Role সহ)
//       const userInfo = { name, email, photo, role, status };
//       const res = await axiosSecure.post("/users", userInfo);

//       if (res.data.insertedId) {
//          dbUser({ ...loggedUser, displayName: name, photoURL: photo });
//         toast.success(`Registered successfully as ${role}!`);
//         reset();
//         navigate("/");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message || "Something went wrong");
//     }
//   };

//   // ✅ Google Login (Default Role: buyer)
//   const handleGoogle = () => {
//     googlelogin()
//       .then(async (result) => {
//         const user = result.user;
//         const userInfo = {
//           name: user.displayName,
//           email: user.email,
//           photo: user.photoURL,
//           role: "buyer", // গুগল লগইনে ডিফল্ট বায়ার রাখা হয়েছে
//           status: "pending",
//         };
//         await axiosSecure.post("/users", userInfo);
//         toast.success("Logged in with Google!");
//         navigate("/");
//       })
//       .catch((err) => toast.error(err.message));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 px-4 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="backdrop-blur-xl bg-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/40"
//       >
//         <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
//           Register
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Name */}
//             <div>
//               <label className="font-semibold text-gray-700">Full Name</label>
//               <input
//                 type="text"
//                 {...register("name", { required: "Name is required" })}
//                 className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//                 placeholder="Enter your name"
//               />
//               {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
//             </div>

//             {/* Photo URL */}
//             <div>
//               <label className="font-semibold text-gray-700">Photo URL</label>
//               <input
//                 type="text"
//                 {...register("photo", { required: "Photo URL is required" })}
//                 className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//                 placeholder="Enter photo link"
//               />
//               {errors.photo && <p className="text-red-600 text-sm">{errors.photo.message}</p>}
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="font-semibold text-gray-700">Email Address</label>
//             <input
//               type="email"
//               {...register("email", { 
//                 required: "Email is required",
//                 pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
//               })}
//               className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
//           </div>

//           {/* Role Selection */}
//           <div>
//             <label className="font-semibold text-gray-700">Select Role</label>
//             <select
//               {...register("role", { required: "Please select a role" })}
//               className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-gray-600"
//             >
//               <option value="">Choose Role</option>
//               <option value="buyer">Buyer</option>
//               <option value="manager">Manager</option>
//             </select>
//             {errors.role && <p className="text-red-600 text-sm">{errors.role.message}</p>}
//           </div>

//           {/* Password with Eye Button */}
//           <div>
//             <label className="font-semibold text-gray-700">Password</label>
//             <div className="relative mt-1">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: { value: 6, message: "Min 6 characters required" },
//                   pattern: {
//                     value: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
//                     message: "One uppercase & one lowercase letter required",
//                   },
//                 })}
//                 className="w-full px-4 py-3 pr-10 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//                 placeholder="••••••••"
//               />
//               <span
//                 className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//               </span>
//             </div>
//             {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
//           </div>

//           {/* Register Button */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg active:scale-95"
//           >
//             Create Account
//           </button>
//         </form>

//         {/* OR Divider */}
//         <div className="text-center my-4 text-gray-600 font-semibold italic underline decoration-indigo-300">OR</div>

//         {/* Google Login */}
//         <button
//           onClick={handleGoogle}
//           className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border py-3 rounded-xl hover:bg-gray-100 transition font-semibold"
//         >
//           <FaGoogle className="text-xl text-red-500" />
//           Register with Google
//         </button>

//         {/* Login Link */}
//         <p className="mt-6 text-center text-gray-700">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600 font-bold hover:underline">
//             Login
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import { toast } from "react-toastify";
// import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { useForm } from "react-hook-form";
// import { updateProfile } from "firebase/auth";
// import useAuth from "../../Hooks/useAuth";
// import useAxios from "../../Hooks/useAxios";

// const Register = () => {
//   // dbUser একটি ডাটা অবজেক্ট, এটি ফাংশন নয়। তাই এখান থেকে এটি ব্যবহারের প্রয়োজন নেই।
//   const { creatUser, googlelogin } = useAuth(); 
//   const navigate = useNavigate();
//   const axiosSecure = useAxios();
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   // ✅ Register Handler
//   const onSubmit = async (data) => {
//     const { name, photo, email, password, role } = data;
//     const status = "pending";

//     try {
//       // ১. ফায়ারবেসে ইউজার তৈরি
//       const result = await creatUser(email, password);
//       const loggedUser = result.user;

//       // ২. ফায়ারবেস প্রোফাইল আপডেট (নাম ও ছবি)
//       await updateProfile(loggedUser, { displayName: name, photoURL: photo });

//       // ৩. ডাটাবেজে (MongoDB) ইউজারের তথ্য পাঠানো
//       const userInfo = { name, email, photo, role, status };
//       const res = await axiosSecure.post("/users", userInfo);

//       // ৪. ডাটাবেজে সাকসেসফুলি সেভ হলে
//       if (res.data.insertedId) {
//         // এখানে dbUser(...) কল করার দরকার নেই, এটিই এরর দিচ্ছিল।
//         toast.success(`Registered successfully as ${role}!`);
//         reset(); // ফর্ম ক্লিয়ার করবে
//         navigate("/"); // হোমে পাঠাবে
//       }
//     } catch (err) {
//       console.log("Error Details:", err);
//       toast.error(err.message || "Something went wrong during registration");
//     }
//   };

//   // ✅ Google Login
//   const handleGoogle = () => {
//     googlelogin()
//       .then(async (result) => {
//         const user = result.user;
//         const userInfo = {
//           name: user.displayName,
//           email: user.email,
//           photo: user.photoURL,
//           role: "buyer", // গুগল লগইনে ডিফল্ট বায়ার
//           status: "pending",
//         };
//         await axiosSecure.post("/users", userInfo);
//         toast.success("Logged in with Google!");
//         navigate("/");
//       })
//       .catch((err) => {
//         console.error(err);
//         toast.error(err.message);
//       });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 px-4 py-10">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="backdrop-blur-xl bg-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/40"
//       >
//         <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
//           Register
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Name */}
//             <div>
//               <label className="font-semibold text-gray-700">Full Name</label>
//               <input
//                 type="text"
//                 {...register("name", { required: "Name is required" })}
//                 className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//                 placeholder="Enter your name"
//               />
//               {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
//             </div>

//             {/* Photo URL */}
//             <div>
//               <label className="font-semibold text-gray-700">Photo URL</label>
//               <input
//                 type="text"
//                 {...register("photo", { required: "Photo URL is required" })}
//                 className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//                 placeholder="Enter photo link"
//               />
//               {errors.photo && <p className="text-red-600 text-sm">{errors.photo.message}</p>}
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="font-semibold text-gray-700">Email Address</label>
//             <input
//               type="email"
//               {...register("email", { 
//                 required: "Email is required",
//                 pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
//               })}
//               className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
//           </div>

//           {/* Role Selection */}
//           <div>
//             <label className="font-semibold text-gray-700">Select Role</label>
//             <select
//               {...register("role", { required: "Please select a role" })}
//               className="w-full mt-1 px-4 py-3 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-gray-600"
//             >
//               <option value="">Choose Role</option>
//               <option value="buyer">Buyer</option>
//               <option value="manager">Manager</option>
//             </select>
//             {errors.role && <p className="text-red-600 text-sm">{errors.role.message}</p>}
//           </div>

//           {/* Password with Eye Button */}
//           <div>
//             <label className="font-semibold text-gray-700">Password</label>
//             <div className="relative mt-1">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: { value: 6, message: "Min 6 characters required" }
//                 })}
//                 className="w-full px-4 py-3 pr-10 rounded-xl bg-white/80 border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//                 placeholder="••••••••"
//               />
//               <span
//                 className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//               </span>
//             </div>
//             {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
//           </div>

//           {/* Register Button */}
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg active:scale-95"
//           >
//             Create Account
//           </button>
//         </form>

//         <div className="text-center my-4 text-gray-600 font-semibold italic">OR</div>

//         {/* Google Login */}
//         <button
//           onClick={handleGoogle}
//           className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 border py-3 rounded-xl hover:bg-gray-100 transition font-semibold"
//         >
//           <FaGoogle className="text-xl text-red-500" />
//           Register with Google
//         </button>

//         <p className="mt-6 text-center text-gray-700">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600 font-bold hover:underline">
//             Login
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;
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