
// import React, { useEffect, useState } from 'react';
// import Logo from './Logo';
// import { NavLink, Link } from 'react-router'; // Link ইমপোর্ট করা হয়েছে
// import useAuth from '../../../Hooks/useAuth';
// import { toast } from 'react-toastify';
// import { Moon, Sun, LayoutDashboard, User, LogOut } from 'lucide-react'; // প্রয়োজনীয় আইকন

// const NavBar = () => {
//   const { user, logout } = useAuth();

//   // ১. ডার্ক মোড স্টেট
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   // ২. থিম পরিবর্তন করার ইফেক্ট
//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (darkMode) {
//       root.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       root.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   const handellogout = () => {
//     logout()
//       .then(() => toast.success("LogOut successfully"))
//       .catch(err => console.log(err));
//   };

//   const links = (
//     <>
//       <li>
//         <NavLink 
//           to='/' 
//           className={({ isActive }) => isActive ? "text-primary font-bold underline" : "hover:text-primary transition-colors"}
//         >
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink 
//           to='/allProduct' 
//           className={({ isActive }) => isActive ? "text-primary font-bold underline" : "hover:text-primary transition-colors"}
//         >
//           All-Product
//         </NavLink>
//       </li>
//       {/* {!user && (
//         <li>
//           <NavLink 
//             to='/about' 
//             className={({ isActive }) => isActive ? "text-primary font-bold underline" : "hover:text-primary transition-colors"}
//           >
//             About Us
//           </NavLink>
//         </li>
//       )} */}
//        {user ? ( <ul className='flex'> <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
//       <li>
//         <NavLink 
//           to='/inventory' 
//           className={({ isActive }) => isActive ? "text-primary font-bold underline" : "hover:text-primary transition-colors"}
//         >
//         Inventory
//         </NavLink></li><li><NavLink 
//           to='/production' 
//           className={({ isActive }) => isActive ? "text-primary font-bold underline" : "hover:text-primary transition-colors"}
//         >
//         Production
//         </NavLink></li>
         
//        </ul>
       
        
//       ) : (
//         <li><NavLink to='/about'>About Us</NavLink></li>
//       )}
//     </>
//   );

//   return (
//     <div className="navbar !bg-white dark:!bg-black text-slate-900 dark:!text-white shadow-md sticky top-0 z-50 transition-colors duration-300 border-b border-gray-100 dark:border-gray-800 px-4 lg:px-12">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content !bg-white dark:!bg-gray-900 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl text-slate-900 dark:text-white border dark:border-gray-700"
//           >
//             {links}
//           </ul>
//         </div>
//         <Logo />
//       </div>

//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal font-semibold text-[16px] px-1 gap-4">
//           {links}
//         </ul>
//       </div>

//       <div className="navbar-end gap-3">
//         {/* ডার্ক মোড টগল বাটন */}
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer border border-gray-200 dark:border-gray-600"
//         >
//           {darkMode ? <Sun className="text-yellow-400" size={22} /> : <Moon className="text-blue-600" size={22} />}
//         </button>

//         {/* ইউজার প্রোফাইল ও ড্রপডাউন */}
//         {user ? (
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary overflow-hidden">
//               <div className="w-10 rounded-full">
//                 <img src={user?.photoURL} alt="profile" />
//               </div>
//             </div>
//             <ul tabIndex={0} className="mt-3 z-[50] p-2 shadow-2xl menu menu-sm dropdown-content bg-white dark:bg-gray-900 rounded-box w-56 border border-gray-100 dark:border-gray-700 text-slate-800 dark:text-white">
//               <li className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
//                 <p className="font-bold truncate">{user?.displayName}</p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
//               </li>
//               <li>
//                 <Link to="/dashboard" className="flex items-center gap-2 py-2 mt-2 hover:bg-primary/10 transition">
//                   <LayoutDashboard size={18} /> Dashboard
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/profile" className="flex items-center gap-2 py-2 hover:bg-primary/10 transition">
//                   <User size={18} /> My Profile
//                 </Link>
//               </li>
//               <hr className="my-1 border-gray-100 dark:border-gray-700" />
//               <li>
//                 <button onClick={handellogout} className="flex items-center gap-2 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition font-bold">
//                   <LogOut size={18} /> Log out
//                 </button>
//               </li>
//             </ul>
//           </div>
//         ) : (
//           <div className="flex gap-2">
//             <NavLink to='/login' className="btn bg-primary hover:bg-teal-600 text-white rounded-xl border-none font-bold px-6 shadow-sm">
//               Log in
//             </NavLink>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NavBar;
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { NavLink, Link } from 'react-router'; 
import useAuth from '../../../Hooks/useAuth';
import { toast } from 'react-toastify';
import { Moon, Sun, LayoutDashboard, User, LogOut, Home, Package, Warehouse, Hammer, Info } from 'lucide-react';

const NavBar = () => {
  const { user, logout } = useAuth();

  // ১. ডার্ক মোড স্টেট
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // ২. থিম পরিবর্তন করার ইফেক্ট
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handellogout = () => {
    logout()
      .then(() => toast.success("LogOut successfully"))
      .catch(err => console.log(err));
  };

  // নেভিগেশন লিংকসমূহ (আইকনসহ)
  const links = (
    <>
      <li>
        <NavLink 
          to='/' 
          className={({ isActive }) => `flex items-center gap-2 ${isActive ? "text-primary font-bold underline" : "hover:text-primary transition-colors"}`}
        >
          <Home size={18} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to='/allProduct' 
          className={({ isActive }) => `flex items-center gap-2 ${isActive ? "text-primary font-bold underline" : "hover:text-primary transition-colors"}`}
        >
          <Package size={18} /> All-Product
        </NavLink>
      </li>

      {user ? (
        <>
           <li>
            <NavLink 
              to='/dashboard' 
              className={({ isActive }) => `flex items-center gap-2 ${isActive ? "text-primary font-bold underline" : "hover:text-primary transition-colors"}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to='/inventory' 
              className={({ isActive }) => `flex items-center gap-2 ${isActive ? "text-primary font-bold underline" : "hover:text-primary transition-colors"}`}
            >
              <Warehouse size={18} /> Inventory
            </NavLink>
          </li>
          <li>
            <NavLink 
              to='/production' 
              className={({ isActive }) => `flex items-center gap-2 ${isActive ? "text-primary font-bold underline" : "hover:text-primary transition-colors"}`}
            >
              <Hammer size={18} /> Production
            </NavLink>
          </li>
         
        </>
      ) : (
        <li>
          <NavLink 
            to='/about' 
            className={({ isActive }) => `flex items-center gap-2 ${isActive ? "text-primary font-bold underline" : "hover:text-primary transition-colors"}`}
          >
            <Info size={18} /> About Us
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-white dark:bg-black text-slate-900 dark:text-white shadow-md sticky top-0 z-50 transition-colors duration-300 border-b border-gray-100 dark:border-gray-800 px-4 lg:px-12">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white dark:bg-gray-900 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border dark:border-gray-700 space-y-2">
            {links}
          </ul>
        </div>
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal font-semibold text-[15px] px-1 gap-6">
          {links}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {/* থিম টগল বাটন */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-600"
        >
          {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-blue-600" size={20} />}
        </button>

        {/* ইউজার সেকশন */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="profile" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[50] p-2 shadow-2xl menu menu-sm dropdown-content bg-white dark:bg-gray-900 rounded-box w-60 border border-gray-100 dark:border-gray-700">
              <li className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 mb-2">
                <p className="font-bold truncate text-indigo-600">{user?.displayName}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest truncate">{user?.email}</p>
              </li>
              <li>
                <Link to="/dashboard" className="flex items-center gap-2 py-2 hover:bg-indigo-50 dark:hover:bg-gray-800 transition">
                  <LayoutDashboard size={16} /> Dashboard Panel
                </Link>
              </li>
              <li>
                <Link to="/dashboard/profile" className="flex items-center gap-2 py-2 hover:bg-indigo-50 dark:hover:bg-gray-800 transition">
                  <User size={16} /> User Profile
                </Link>
              </li>
              <div className="divider my-1 dark:before:bg-gray-700 dark:after:bg-gray-700"></div>
              <li>
                <button onClick={handellogout} className="flex items-center gap-2 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold transition">
                  <LogOut size={16} /> Secure Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to='/login' className="btn btn-sm lg:btn-md bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl border-none font-bold px-6">
            Log in
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
