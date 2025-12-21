
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import useAxios from "../../../Hooks/useAxios";
// import { Imgbb } from "./Imgbb";
// import { motion } from "framer-motion";

// const AddProduct = () => {
//   const axiosSecure = useAxios();
//   const { register, handleSubmit, reset } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   const handleImageChange = (e) => {
//     const selected = Array.from(e.target.files);
//     setFiles(selected);
//     setPreviews(selected.map((file) => URL.createObjectURL(file)));
//   };

//   const onSubmit = async (data) => {
//     if (files.length === 0) return toast.error("Upload at least one image");

//     setLoading(true);
//     try {
//       const imageUrls = await Imgbb(files);

//       const productData = {
//         name: data.name,
//         description: data.description,
//         category: data.category,
//         price: parseFloat(data.price),
//         availableQuantity: parseInt(data.quantity),
//         minimumOrder: parseInt(data.moq),
//         payment: {
//           type: data.payment === "Cash on Delivery" ? "offline" : "online",
//           methods: [data.payment],
//         },
//         images: imageUrls,
//         demoVideo: data.video || "",
//         showOnHome: data.showOnHome || false,
//         managerEmail: "manager@test.com",
//       };

//       const res = await axiosSecure.post("/products", productData);
//       if (res.data.insertedId) {
//         toast.success("Product added successfully!");
//         reset();
//         setFiles([]);
//         setPreviews([]);
//       }
//     } catch (err) {
//       toast.error("Failed to add product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="backdrop-blur-xl bg-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-white/40"
//       >
//         <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow">
//           Add New Product
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Product Info */}
//           <div className="space-y-3">
//             <label className="text-lg font-semibold text-indigo-700">Product Name</label>
//             <input
//               {...register("name")}
//               required
//             //   placeholder="Classic Denim Jacket"
//               className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//             />

//             <label className="text-lg font-semibold text-indigo-700">Category</label>
//             <select
//               {...register("category")}
//               className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//             >
//               <option>Shirt</option>
//               <option>Pant</option>
//               <option>Jacket</option>
//               <option>Accessories</option>
//             </select>

//             <label className="text-lg font-semibold text-indigo-700">Description</label>
//             <textarea
//               {...register("description")}
//               required
//               placeholder="Product details..."
//               className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none h-28"
//             />
//           </div>

//           {/* Pricing & Quantity */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-lg font-semibold text-indigo-700">Price ($)</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 {...register("price")}
//                 required
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//               />
//             </div>
//             <div>
//               <label className="text-lg font-semibold text-indigo-700">Available Quantity</label>
//               <input
//                 type="number"
//                 {...register("quantity")}
//                 required
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//               />
//             </div>
//             <div>
//               <label className="text-lg font-semibold text-indigo-700">Minimum Order (MOQ)</label>
//               <input
//                 type="number"
//                 {...register("moq")}
//                 required
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//               />
//             </div>
//             <div>
//               <label className="text-lg font-semibold text-indigo-700">Demo Video (Optional)</label>
//               <input
//                 {...register("video")}
//                 placeholder="https://youtube.com/..."
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//               />
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div className="space-y-2">
//             <label className="text-lg font-semibold text-indigo-700">Product Images</label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleImageChange}
//               className="file-input file-input-bordered w-full"
//             />
//             <div className="flex gap-3 flex-wrap mt-4">
//               {previews.map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   className="w-20 h-20 rounded-xl object-cover ring ring-indigo-100"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Payment & Home */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
//             <div>
//               <label className="text-lg font-semibold text-indigo-700">Payment Option</label>
//               <select
//                 {...register("payment")}
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//               >
//                 <option>Cash on Delivery</option>
//                 <option>PayFirst</option>
//               </select>
//             </div>
//             <div className="flex items-center gap-3 mt-6 md:mt-0">
//               <input type="checkbox" {...register("showOnHome")} className="toggle toggle-primary" />
//               <span className="font-semibold text-indigo-700">Show on Home Page</span>
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             disabled={loading}
//             className="w-full py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition"
//           >
//             {loading ? "Uploading..." : "Create Product"}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default AddProduct;
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import useAxios from "../../../Hooks/useAxios";
// import useAuth from "../../../Hooks/useAuth"; // ১. লগইন করা ইউজারকে পাওয়ার জন্য এটি লাগবে
// import { Imgbb } from "./Imgbb";
// import { motion } from "framer-motion";

// const AddProduct = () => {
//   const axiosSecure = useAxios();
//   const { user } = useAuth(); // ২. এখান থেকে ইউজারের ইমেইল আসবে
//   const { register, handleSubmit, reset } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   const handleImageChange = (e) => {
//     const selected = Array.from(e.target.files);
//     setFiles(selected);
//     setPreviews(selected.map((file) => URL.createObjectURL(file)));
//   };

//   const onSubmit = async (data) => {
//     if (files.length === 0) return toast.error("Upload at least one image");

//     setLoading(true);
//     try {
//       const imageUrls = await Imgbb(files);

//       // ৩. ডাটাবেজে পাঠানোর অবজেক্টটি ঠিক করা হয়েছে
//       const productData = {
//         name: data.name,
//         description: data.description,
//         category: data.category,
//         price: parseFloat(data.price),
//         availableQuantity: parseInt(data.quantity),
//         minimumOrder: parseInt(data.moq),
//         payment: {
//           type: data.payment === "Cash on Delivery" ? "offline" : "online",
//           methods: [data.payment],
//         },
//         images: imageUrls,
//         demoVideo: data.video || "",
//         showOnHome: data.showOnHome || false,
        
//         // এখানে manager@test.com এর বদলে user?.email দেওয়া হয়েছে
//         sellerEmail: user?.email, 
//         sellerName: user?.displayName || "Admin",
//         createdAt: new Date(),
//       };

//       const res = await axiosSecure.post("/products", productData);
//       if (res.data.insertedId) {
//         toast.success("Product added successfully!");
//         reset();
//         setFiles([]);
//         setPreviews([]);
//       }
//     } catch (err) {
//       toast.error("Failed to add product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7 }}
//         className="backdrop-blur-xl bg-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-white/40"
//       >
//         <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow">
//           Add New Product
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="space-y-3">
//             <label className="text-lg font-semibold text-indigo-700">Product Name</label>
//             <input
//               {...register("name")}
//               required
//               className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//             />

//             <label className="text-lg font-semibold text-indigo-700">Category</label>
//             <select
//               {...register("category")}
//               className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//             >
//               <option>Shirt</option>
//               <option>Pant</option>
//               <option>Jacket</option>
//               <option>Accessories</option>
//             </select>

//             <label className="text-lg font-semibold text-indigo-700">Description</label>
//             <textarea
//               {...register("description")}
//               required
//               placeholder="Product details..."
//               className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none h-28"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-lg font-semibold text-indigo-700">Price ($)</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 {...register("price")}
//                 required
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//               />
//             </div>
//             <div>
//               <label className="text-lg font-semibold text-indigo-700">Available Quantity</label>
//               <input
//                 type="number"
//                 {...register("quantity")}
//                 required
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-lg font-semibold text-indigo-700">Product Images</label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleImageChange}
//               className="file-input file-input-bordered w-full"
//             />
//             <div className="flex gap-3 flex-wrap mt-4">
//               {previews.map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   className="w-20 h-20 rounded-xl object-cover ring ring-indigo-100"
//                 />
//               ))}
//             </div>
//           </div>

//           <button
//             disabled={loading}
//             className="w-full py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:bg-gray-400"
//           >
//             {loading ? "Uploading..." : "Create Product"}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default AddProduct;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth"; 
import { Imgbb } from "./Imgbb";
import { motion } from "framer-motion";

const AddProduct = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth(); 
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setPreviews(selected.map((file) => URL.createObjectURL(file)));
  };

  const onSubmit = async (data) => {
    if (files.length === 0) return toast.error("Upload at least one image");

    setLoading(true);
    try {
      const imageUrls = await Imgbb(files);

      const productData = {
        name: data.name,
        description: data.description,
        category: data.category,
        price: parseFloat(data.price),
        availableQuantity: parseInt(data.quantity),
        minimumOrder: parseInt(data.moq),
        payment: {
          type: data.payment === "Cash on Delivery" ? "offline" : "online",
          methods: [data.payment],
        },
        images: imageUrls,
        demoVideo: data.video || "",
        showOnHome: data.showOnHome || false,
        sellerEmail: user?.email, 
        sellerName: user?.displayName || "Admin",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/products", productData);
      if (res.data.insertedId) {
        toast.success("Product added successfully!");
        reset();
        setFiles([]);
        setPreviews([]);
      }
    } catch (err) {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="backdrop-blur-xl bg-white/30 p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-white/40"
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-lg font-semibold text-indigo-700">Product Name</label>
              <input
                {...register("name")}
                required
                placeholder="Classic Denim Jacket"
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-lg font-semibold text-indigo-700">Category</label>
              <select
                {...register("category")}
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
              >
                <option>Shirt</option>
                <option>Pant</option>
                <option>Jacket</option>
                <option>Accessories</option>
              </select>
            </div>
          </div>

         
          <div className="space-y-2">
            <label className="text-lg font-semibold text-indigo-700">Description</label>
            <textarea
              {...register("description")}
              required
              placeholder="Product details..."
              className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none h-28"
            />
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold text-indigo-700">Price ($)</label>
              <input
                type="number" step="0.01"
                {...register("price")} required
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-indigo-700">Available Qty</label>
              <input
                type="number"
                {...register("quantity")} required
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-indigo-700">Min Order (MOQ)</label>
              <input
                type="number"
                {...register("moq")} required
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
              />
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-lg font-semibold text-indigo-700">Demo Video (URL)</label>
              <input
                {...register("video")}
                placeholder="https://youtube.com/..."
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
              />
            </div>
            <div>
              <label className="text-lg font-semibold text-indigo-700">Payment Option</label>
              <select
                {...register("payment")}
                className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
              >
                <option>Cash on Delivery</option>
                <option>PayFirst</option>
              </select>
            </div>
          </div>

         
          <div className="space-y-2">
            <label className="text-lg font-semibold text-indigo-700">Product Images</label>
            <input
              type="file" multiple accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
            />
            <div className="flex gap-3 flex-wrap mt-4">
              {previews.map((img, i) => (
                <img key={i} src={img} className="w-20 h-20 rounded-xl object-cover ring ring-indigo-100" />
              ))}
            </div>
          </div>

        
          <div className="flex items-center gap-3 bg-white/40 p-3 rounded-xl">
            <input type="checkbox" {...register("showOnHome")} className="toggle toggle-primary" />
            <span className="font-semibold text-indigo-700">Show on Home Page</span>
          </div>

          <button
            disabled={loading}
            className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:bg-gray-400 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner"></span> Uploading...
              </span>
            ) : "Create Product"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProduct;