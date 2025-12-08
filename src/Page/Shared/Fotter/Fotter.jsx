import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* ----- Logo & Description ----- */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            GarmentFlow
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            GarmentFlow is a modern Order & Production Tracker System designed 
            to help garment industries manage orders, production flow, and 
            inventory with ease and efficiency.
          </p>
        </div>

        {/* ----- Useful Links ----- */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-teal-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/all-products" className="hover:text-teal-400 transition">All Products</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-teal-400 transition">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-teal-400 transition">Contact</Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-teal-400 transition">Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* ----- Contact / Social ----- */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Info</h3>
          <p className="text-gray-400 text-sm">
            Email: support@garmentflow.com
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Phone: +880 1234 567890
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-4">
            <a href="#" className="hover:text-teal-400 text-xl transition">🌐</a>
            <a href="#" className="hover:text-teal-400 text-xl transition">📘</a>
            <a href="#" className="hover:text-teal-400 text-xl transition">📸</a>
          </div>
        </div>
      </div>

      {/* ----- Bottom Copy ----- */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} GarmentFlow — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
