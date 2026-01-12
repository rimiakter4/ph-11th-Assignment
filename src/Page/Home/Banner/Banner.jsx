
// import { motion } from "framer-motion";
// import { Link } from "react-router";

// const Home = () => {
//   return (
//     <section  className="bg-gray-50 min-h-screen flex items-center  bg-gradient-to-r from-teal-400/30 via-indigo-500/30 to-purple-500/30 ">
//       <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row gap-12 md:gap-14 items-center">

//         {/* ================= LEFT CONTENT ================= */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="flex-1 text-center md:text-left"
//         >
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
//             Manage Your  
//             <br />
//             <span className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
//               Garment Workflow
//             </span>{" "}
//             Smartly
//           </h1>

//           <p className="mt-4 sm:mt-5 text-gray-600 text-base sm:text-lg">
//             GarmentFlow helps you track orders, monitor production, and manage
//             workflow efficiently with a clean & user-friendly dashboard.
//           </p>

//           {/* CTA BUTTONS */}
//           <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 justify-center md:justify-start">
//             <Link to="/allProduct">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-6 py-3 bg-gradient-to-r from-teal-400 to-indigo-500 text-white rounded-xl shadow-lg w-full sm:w-auto"
//               >
//                 View Products
//               </motion.button>
//             </Link>

//             {/* <Link to="/book-product">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-6 py-3 border border-indigo-500 text-indigo-600 rounded-xl hover:bg-indigo-50 w-full sm:w-auto"
//               >
//                 Book a Product
//               </motion.button>
//             </Link> */}
//           </div>
//         </motion.div>

//         {/* ================= RIGHT IMAGE ================= */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.9, ease: "easeOut" }}
//           className="flex-1 relative flex justify-center mt-8 md:mt-0"
//         >
//           {/* Main Hero Image */}
//           <img
//             src="https://i.ibb.co/8LT3D5k4/istockphoto-478015628-2048x2048.jpg"
//             alt="Garment Production"
//             className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl shadow-xl object-cover"
//           />

//           {/* Overlay Images */}
//           <motion.img
//             src="https://i.ibb.co/S4X10c6n/istockphoto-2185417557-2048x2048.jpg"
//             alt="Fabric Roll"
//             className="absolute -top-6 -left-6 w-16 sm:w-24 md:w-45 rounded-xl shadow-lg hidden sm:block"
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.5 }}
//           />

//           <motion.img
//             src="https://i.ibb.co/Xrg37fzy/istockphoto-1331336765-2048x2048.jpg"
//             alt="Sewing Machine"
//             className="absolute -bottom-6 -right-6 w-16 sm:w-24 md:w-45 rounded-xl shadow-lg hidden sm:block"
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.7 }}
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Home;
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowRight, FaMouse } from "react-icons/fa";

const Home = () => {
  return (
    // ১. Height limited (75vh) and your original background
    <section className="relative h-[100vh] md:h-[90vh] flex items-center bg-gray-50 bg-gradient-to-r from-teal-400/30 via-indigo-500/30 to-purple-500/30 overflow-hidden">
      
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-12 items-center relative z-10">

        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          {/* Badge Animation */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/50 backdrop-blur-md border border-white/50 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-700">System Online</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black leading-tight text-gray-900">
            Manage Your <br />
            <span className="bg-gradient-to-r from-teal-500 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Garment Workflow
            </span>{" "}
            Smartly
          </h1>

          <p className="mt-6 text-gray-700 text-lg max-w-lg leading-relaxed font-medium">
            Streamline production, track real-time inventory, and boost efficiency with 
            GarmentFlow's intelligent manufacturing dashboard.
          </p>

          {/* CTA BUTTONS with Hover Effects */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center md:justify-start">
            {/* <Link to="/allProduct">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm transition-all shadow-2xl hover:bg-indigo-600"
              >
                Explore Products
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link> */}
              <Link to="/allProduct">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-teal-400 to-indigo-500 text-white rounded-xl shadow-lg w-full sm:w-auto"
              >
                View Products
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* ================= RIGHT IMAGE - Interactive 3D Stack ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="flex-1 relative flex justify-center items-center"
        >
          {/* Decorative Back Shape */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full" />

          {/* Main Hero Image with Floating Animation */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20"
          >
            <img
              src="https://i.ibb.co/8LT3D5k4/istockphoto-478015628-2048x2048.jpg"
              alt="Garment Production"
              className="w-full max-w-sm md:max-w-md rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white object-cover"
            />
          </motion.div>

          {/* Floating Side Images (Interactive) */}
          <motion.img
            src="https://i.ibb.co/S4X10c6n/istockphoto-2185417557-2048x2048.jpg"
            alt="Fabric"
            className="absolute -top-6 -left-4 w-28 md:w-36 rounded-2xl shadow-xl border-4 border-white z-30 hidden sm:block"
            animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.img
            src="https://i.ibb.co/Xrg37fzy/istockphoto-1331336765-2048x2048.jpg"
            alt="Sewing"
            className="absolute -bottom-8 -right-4 w-28 md:w-40 rounded-2xl shadow-xl border-4 border-white z-30 hidden sm:block"
            animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* ৩. Clear Visual Flow - Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <span className="text-[10px] font-bold uppercase tracking-[4px] text-gray-600 mb-1">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FaMouse size={20} className="text-indigo-600" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;