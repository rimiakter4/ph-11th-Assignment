
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import useAxios from "../../../Hooks/useAxios";
// import useAuth from "../../../Hooks/useAuth"; 
// import { Imgbb } from "./Imgbb";
// import { motion } from "framer-motion";

// const AddProduct = () => {
//   const axiosSecure = useAxios();
//   const { user } = useAuth(); 
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
         
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="text-lg font-semibold text-indigo-700">Product Name</label>
//               <input
//                 {...register("name")}
//                 required
//                 placeholder="Classic Denim Jacket"
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-lg font-semibold text-indigo-700">Category</label>
//               <select
//                 {...register("category")}
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none"
//               >
//                 <option>Shirt</option>
//                 <option>Pant</option>
//                 <option>Jacket</option>
//                 <option>Accessories</option>
//               </select>
//             </div>
//           </div>

         
//           <div className="space-y-2">
//             <label className="text-lg font-semibold text-indigo-700">Description</label>
//             <textarea
//               {...register("description")}
//               required
//               placeholder="Product details..."
//               className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300/40 outline-none h-28"
//             />
//           </div>

        
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="text-sm font-semibold text-indigo-700">Price ($)</label>
//               <input
//                 type="number" step="0.01"
//                 {...register("price")} required
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-semibold text-indigo-700">Available Qty</label>
//               <input
//                 type="number"
//                 {...register("quantity")} required
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-semibold text-indigo-700">Min Order (MOQ)</label>
//               <input
//                 type="number"
//                 {...register("moq")} required
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
//               />
//             </div>
//           </div>

          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-lg font-semibold text-indigo-700">Demo Video (URL)</label>
//               <input
//                 {...register("video")}
//                 placeholder="https://youtube.com/..."
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
//               />
//             </div>
//             <div>
//               <label className="text-lg font-semibold text-indigo-700">Payment Option</label>
//               <select
//                 {...register("payment")}
//                 className="w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-300/60 outline-none"
//               >
//                 <option>Cash on Delivery</option>
//                 <option>PayFirst</option>
//               </select>
//             </div>
//           </div>

         
//           <div className="space-y-2">
//             <label className="text-lg font-semibold text-indigo-700">Product Images</label>
//             <input
//               type="file" multiple accept="image/*"
//               onChange={handleImageChange}
//               className="file-input file-input-bordered w-full"
//             />
//             <div className="flex gap-3 flex-wrap mt-4">
//               {previews.map((img, i) => (
//                 <img key={i} src={img} className="w-20 h-20 rounded-xl object-cover ring ring-indigo-100" />
//               ))}
//             </div>
//           </div>

        
//           <div className="flex items-center gap-3 bg-white/40 p-3 rounded-xl">
//             <input type="checkbox" {...register("showOnHome")} className="toggle toggle-primary" />
//             <span className="font-semibold text-indigo-700">Show on Home Page</span>
//           </div>

//           <button
//             disabled={loading}
//             className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:bg-gray-400 shadow-lg"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <span className="loading loading-spinner"></span> Uploading...
//               </span>
//             ) : "Create Product"}
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
import { FaCloudUploadAlt, FaVideo, FaMoneyBillWave } from "react-icons/fa";

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

  // স্টাইল ক্লাসগুলো সহজ করার জন্য
  const inputClass = "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-teal-500/50 outline-none transition-all dark:text-slate-200 text-sm";
  const labelClass = "text-[11px] font-black text-slate-500 dark:text-teal-500 uppercase tracking-[0.2em] mb-2 block";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617] p-4 md:p-10 transition-colors duration-500">
      <div className="bg-white dark:bg-[#0f172a] p-6 md:p-12 rounded-[2rem] shadow-xl dark:shadow-none w-full max-w-4xl border border-transparent dark:border-slate-800">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black mb-2 text-slate-800 dark:text-white uppercase tracking-tighter">
            Add New Item
          </h2>
          <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Section: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Product Name</label>
              <input {...register("name")} required placeholder="Enter product name" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select {...register("category")} className={inputClass}>
                <option>Shirt</option>
                <option>Pant</option>
                <option>Jacket</option>
                <option>Accessories</option>
              </select>
            </div>
          </div>

          {/* Section: Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea {...register("description")} required placeholder="Describe your product..." className={`${inputClass} h-32 resize-none`} />
          </div>

          {/* Section: Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}>Price ($)</label>
              <input type="number" step="0.01" {...register("price")} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Available Qty</label>
              <input type="number" {...register("quantity")} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Min Order (MOQ)</label>
              <input type="number" {...register("moq")} required className={inputClass} />
            </div>
          </div>

          {/* Section: Media & Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Video URL</label>
              <div className="relative">
                <FaVideo className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input {...register("video")} placeholder="YouTube link" className={`${inputClass} pl-12`} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Payment Method</label>
              <div className="relative">
                <FaMoneyBillWave className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select {...register("payment")} className={`${inputClass} pl-12`}>
                  <option>Cash on Delivery</option>
                  <option>PayFirst</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Image Upload */}
          <div>
            <label className={labelClass}>Product Images</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all">
              <FaCloudUploadAlt className="text-3xl text-teal-500 mb-2" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Images</span>
              <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            
            <div className="flex gap-3 flex-wrap mt-4">
              {previews.map((img, i) => (
                <img key={i} src={img} className="w-16 h-16 rounded-xl object-cover border dark:border-slate-700 shadow-sm" alt="preview" />
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 px-5 py-3 rounded-xl border dark:border-slate-800">
              <input 
                type="checkbox" 
                {...register("showOnHome")} 
                className="toggle toggle-success toggle-sm" 
              />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Show on Home</span>
            </div>

            <button
              disabled={loading}
              className="w-full md:w-56 py-4 rounded-xl font-black text-white bg-teal-600 hover:bg-teal-700 transition-all disabled:bg-slate-400 shadow-lg shadow-teal-900/10 uppercase tracking-widest text-xs"
            >
              {loading ? "Processing..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;