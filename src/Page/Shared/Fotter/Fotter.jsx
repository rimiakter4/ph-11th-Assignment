// import { Link } from "react-router";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-gray-300 py-10 ">
//       <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">

//         {/* ----- Logo & Description ----- */}
//         <div>
//           <h2 className="text-2xl font-extrabold bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
//             GarmentFlow
//           </h2>
//           <p className="mt-3 text-sm leading-relaxed text-gray-400">
//             GarmentFlow is a modern Order & Production Tracker System designed 
//             to help garment industries manage orders, production flow, and 
//             inventory with ease and efficiency.
//           </p>
//         </div>

//         {/* ----- Useful Links ----- */}
//         <div>
//           <h3 className="text-xl font-semibold text-white mb-4">Useful Links</h3>
//           <ul className="space-y-2">
//             <li>
//               <Link to="/" className="hover:text-teal-400 transition">Home</Link>
//             </li>
//             <li>
//               <Link to="/all-products" className="hover:text-teal-400 transition">All Products</Link>
//             </li>
//             <li>
//               <Link to="/about" className="hover:text-teal-400 transition">About Us</Link>
//             </li>
//             <li>
//               <Link to="/contact" className="hover:text-teal-400 transition">Contact</Link>
//             </li>
//             <li>
//               <Link to="/dashboard" className="hover:text-teal-400 transition">Dashboard</Link>
//             </li>
//           </ul>
//         </div>

//         {/* ----- Contact / Social ----- */}
//         <div>
//           <h3 className="text-xl font-semibold text-white mb-4">Contact Info</h3>
//           <p className="text-gray-400 text-sm">
//             Email: support@garmentflow.com
//           </p>
//           <p className="text-gray-400 text-sm mt-1">
//             Phone: +880 1234 567890
//           </p>

//           {/* Social Icons */}
//           <div className="flex items-center gap-4 mt-4">
//             <a href="#" className="hover:text-teal-400 text-xl transition">🌐</a>
//             <a href="#" className="hover:text-teal-400 text-xl transition">📘</a>
//             <a href="#" className="hover:text-teal-400 text-xl transition">📸</a>
//           </div>
//         </div>
//       </div>

//       {/* ----- Bottom Copy ----- */}
//       <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-5">
//         © {new Date().getFullYear()} GarmentFlow — All Rights Reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { Link } from "react-router";
import { FaFacebook, FaLinkedin, FaInstagram, FaGlobe, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#020617] text-gray-300 border-t border-gray-800/50">
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* ----- Logo & Description ----- */}
        <div className="lg:col-span-1">
          <Link to="/">
            <h2 className="text-2xl font-black bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent tracking-tighter uppercase cursor-pointer">
              GarmentFlow
            </h2>
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-gray-400 font-medium">
            Next-gen Order & Production Tracker. We empower garment industries with real-time analytics, inventory control, and seamless manufacturing workflows.
          </p>
          
          {/* Social Icons - Working Links */}
          <div className="flex items-center gap-5 mt-8">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800/50 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm">
              <FaFacebook size={18} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800/50 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm">
              <FaLinkedin size={18} />
            </a>
            {/* <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800/50 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm">
              <FaInstagram size={18} />
            </a>
            <a href="https://garmentflow.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-800/50 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm">
              <FaGlobe size={18} /> */}
            {/* </a> */}
          </div>
        </div>

        {/* ----- Navigation - Working Internal Links ----- */}
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-[2px] mb-6">Navigation</h3>
          <ul className="space-y-4 text-sm font-bold">
            <li>
              <Link to="/" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                <span className="h-[1px] w-0 bg-indigo-400 group-hover:w-3 transition-all"></span> Home
              </Link>
            </li>
            <li>
              <Link to="/allProduct" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                <span className="h-[1px] w-0 bg-indigo-400 group-hover:w-3 transition-all"></span> All Products
              </Link>
            </li>
            <li>
              <Link to="/inventory" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                <span className="h-[1px] w-0 bg-indigo-400 group-hover:w-3 transition-all"></span> Inventory
              </Link>
            </li>
            <li>
              <Link to="/production" className="hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                <span className="h-[1px] w-0 bg-indigo-400 group-hover:w-3 transition-all"></span> Production
              </Link>
            </li>
          </ul>
        </div>

        {/* ----- Company - Working Internal Links ----- */}
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-[2px] mb-6">Company</h3>
          <ul className="space-y-4 text-sm font-bold">
            <li>
              <Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Support</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* ----- Contact - Working Mail & Phone Links ----- */}
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-[2px] mb-6">Office Info</h3>
          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-indigo-500 mt-1" />
              <p className="text-gray-400 leading-relaxed font-medium">
                123 Industrial Area, <br /> Dhaka, Bangladesh
              </p>
            </div>
            <div className="flex items-center gap-4 hover:text-indigo-400 transition-colors">
              <FaEnvelope className="text-indigo-500" />
              <a href="mailto:support@garmentflow.com" className="font-bold">support@garmentflow.com</a>
            </div>
            <div className="flex items-center gap-4 hover:text-indigo-400 transition-colors">
              <FaPhoneAlt className="text-indigo-500" />
              <a href="tel:+8801234567890" className="font-bold">+880 1234 567890</a>
            </div>
          </div>
        </div>

      </div>

      {/* ----- Bottom Bar ----- */}
      <div className="border-t border-gray-800/50 bg-[#020617]">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()} <span className="text-gray-400">GarmentFlow</span> — Modern ERP Solutions.
          </p>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
            Developed with <span className="text-red-600">❤</span> by <a href="#" className="hover:text-white transition-colors">Your Team</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;