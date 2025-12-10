
import { motion } from "framer-motion";
import { Link } from "react-router";

const Home = () => {
  return (
    <section  className="bg-gray-50 min-h-screen flex items-center  bg-gradient-to-r from-teal-400/30 via-indigo-500/30 to-purple-500/30 ">
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row gap-12 md:gap-14 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Manage Your  
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Garment Workflow
            </span>{" "}
            Smartly
          </h1>

          <p className="mt-4 sm:mt-5 text-gray-600 text-base sm:text-lg">
            GarmentFlow helps you track orders, monitor production, and manage
            workflow efficiently with a clean & user-friendly dashboard.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 justify-center md:justify-start">
            <Link to="/all-products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-teal-400 to-indigo-500 text-white rounded-xl shadow-lg w-full sm:w-auto"
              >
                View Products
              </motion.button>
            </Link>

            <Link to="/book-product">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-indigo-500 text-indigo-600 rounded-xl hover:bg-indigo-50 w-full sm:w-auto"
              >
                Book a Product
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* ================= RIGHT IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex-1 relative flex justify-center mt-8 md:mt-0"
        >
          {/* Main Hero Image */}
          <img
            src="https://i.ibb.co/8LT3D5k4/istockphoto-478015628-2048x2048.jpg"
            alt="Garment Production"
            className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl shadow-xl object-cover"
          />

          {/* Overlay Images */}
          <motion.img
            src="https://i.ibb.co/S4X10c6n/istockphoto-2185417557-2048x2048.jpg"
            alt="Fabric Roll"
            className="absolute -top-6 -left-6 w-16 sm:w-24 md:w-45 rounded-xl shadow-lg hidden sm:block"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.img
            src="https://i.ibb.co/Xrg37fzy/istockphoto-1331336765-2048x2048.jpg"
            alt="Sewing Machine"
            className="absolute -bottom-6 -right-6 w-16 sm:w-24 md:w-45 rounded-xl shadow-lg hidden sm:block"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
