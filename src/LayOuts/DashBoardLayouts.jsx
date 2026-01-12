
// import React from 'react';
// import { Link, NavLink, Outlet } from 'react-router';
// // import useRole from '../Hooks/useRole';
// import useAuth from '../Hooks/useAuth';

// const DashBoardLayOut = () => {
//   // const { role } = useRole(); // আপনি চাইলে সরাসরি role ব্যবহার করতে পারেন
//   const { dbUser, loading } = useAuth(); // loading স্টেট থাকলে ভালো হয়

//   // যদি ডাটা লোড হতে সময় নেয় তবে একটি স্পিনার দেখাতে পারেন
//   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

//   return (
//     <div>
//       <div className="drawer lg:drawer-open">
//         <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content">
//           {/* Navbar */}
//           <nav className="navbar w-full bg-base-300">
//             <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
//             </label>
//             <div className="px-4 font-bold">GermentFlow Dashboard</div>
//           </nav>
          
//           {/* Page content here */}
//           <div className="p-5">
//             <Outlet />
//           </div>
//         </div>

//         <div className="drawer-side is-drawer-close:overflow-visible">
//           <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
//           <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
//             <ul className="menu w-full grow">
//               <li>
//                 <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
//                   <span className="is-drawer-close:hidden">Homepage</span>
//                 </Link>
//               </li>

              

// {/* ১. সবার জন্য কমন লিঙ্ক (Profile সবারই থাকে) */}
// <li><NavLink to='/dashboard/profile'>My Profile</NavLink></li>

// {/* --- ২. শুধুমাত্র ADMIN এর জন্য লিঙ্ক --- */}
// {
//  dbUser?.role === 'admin' && (
//     <>
//       <li><NavLink to='/dashboard/manageusers'>Manage Users</NavLink></li>
//       <li><NavLink to='/dashboard/allproducts'>All Products</NavLink></li>
//       <li><NavLink to='/dashboard/allorders'>All Orders</NavLink></li>
//     </>
//   )
// }

// {/* --- ৩. শুধুমাত্র MANAGER এর জন্য লিঙ্ক --- */}
// {
//   dbUser?.role === 'manager' && (
//     <>
//      <li><NavLink to='/dashboard/addproduct'> Add Product</NavLink></li>
//   <li><NavLink to='/dashboard/manageproduct'>Manage Products</NavLink></li>
//  <li><NavLink to='/dashboard/pendingorders'>Pending Orders</NavLink></li>
//  <li><NavLink to='/dashboard/approvedorders'>Approved Orders</NavLink></li>  
//     </>
//   )
// }




// {/* --- ৪. বায়ার বা সাধারণ ইউজারের জন্য লিঙ্ক --- */}
// {
//   (dbUser?.role === 'buyer' || !dbUser?.role) && (
//     <li>
//       <NavLink to='/dashboard/myOrders'>My Orders</NavLink>
//     </li>
//   )
// }





//               <li>
//                 <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
//                   <span className="is-drawer-close:hidden">Settings</span>
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoardLayOut;
// import React, { useEffect, useState } from 'react';
// import { Link, NavLink, Outlet } from 'react-router';
// import { FaSun, FaMoon } from 'react-icons/fa'; // থিম টগলের জন্য আইকন
// import useAuth from '../Hooks/useAuth';

// const DashBoardLayOut = () => {
//   const { dbUser, loading } = useAuth();

//   // --- থিম টগল লজিক ---
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-screen dark:bg-gray-900 dark:text-white">
//       Loading...
//     </div>
//   );

//   return (
//     <div className="dark:bg-gray-900 transition-colors duration-300">
//       <div className="drawer lg:drawer-open">
//         <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content flex flex-col min-h-screen">
          
//           {/* Navbar */}
//           <nav className="navbar w-full bg-base-300 dark:bg-gray-800 dark:text-gray-100 transition-colors">
//             <div className="flex-1">
//               <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
//               </label>
//               <div className="px-4 font-bold">GermentFlow Dashboard</div>
//             </div>

//             {/* থিম টগল বাটন (অরিজিনাল ড্যাশবোর্ডে নতুন সংযোজন) */}
//             <div className="flex-none px-2">
//               <button 
//                 onClick={toggleTheme} 
//                 className="btn btn-ghost btn-circle text-lg"
//               >
//                 {theme === "light" ? <FaMoon className="text-gray-700" /> : <FaSun className="text-yellow-400" />}
//               </button>
//             </div>
//           </nav>
          
//           {/* Page content here */}
//           <div className="p-5 flex-grow dark:bg-gray-950 transition-colors">
//             <Outlet />
//           </div>
//         </div>

//         <div className="drawer-side is-drawer-close:overflow-visible z-40">
//           <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
//           <div className="flex min-h-full flex-col items-start bg-base-200 dark:bg-gray-900 dark:text-gray-200 is-drawer-close:w-14 is-drawer-open:w-64 transition-colors">
//             <ul className="menu w-full grow">
//               <li>
//                 <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
//                   <span className="is-drawer-close:hidden">Homepage</span>
//                 </Link>
//               </li>

//               {/* ১. সবার জন্য কমন লিঙ্ক */}
//               <li><NavLink to='/dashboard/profile' className={({isActive}) => isActive ? "bg-indigo-600 text-white" : ""}>My Profile</NavLink></li>

//               {/* --- ২. শুধুমাত্র ADMIN এর জন্য লিঙ্ক --- */}
//               {dbUser?.role === 'admin' && (
//                 <>
//                   <li><NavLink to='/dashboard/manageusers'>Manage Users</NavLink></li>
//                   <li><NavLink to='/dashboard/allproducts'>All Products</NavLink></li>
//                   <li><NavLink to='/dashboard/allorders'>All Orders</NavLink></li>
//                 </>
//               )}

//               {/* --- ৩. শুধুমাত্র MANAGER এর জন্য লিঙ্ক --- */}
//               {dbUser?.role === 'manager' && (
//                 <>
//                   <li><NavLink to='/dashboard/addproduct'> Add Product</NavLink></li>
//                   <li><NavLink to='/dashboard/manageproduct'>Manage Products</NavLink></li>
//                   <li><NavLink to='/dashboard/pendingorders'>Pending Orders</NavLink></li>
//                   <li><NavLink to='/dashboard/approvedorders'>Approved Orders</NavLink></li>  
//                 </>
//               )}

//               {/* --- ৪. বায়ার বা সাধারণ ইউজারের জন্য লিঙ্ক --- */}
//               {(dbUser?.role === 'buyer' || !dbUser?.role) && (
//                 <li>
//                   <NavLink to='/dashboard/myOrders'>My Orders</NavLink>
//                 </li>
//               )}

//               <li>
//                 <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
//                   <span className="is-drawer-close:hidden">Settings</span>
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoardLayOut;
import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import { FaSun, FaMoon, FaUserCircle, FaBoxOpen, FaClipboardList, FaUsers, FaPlusSquare, FaCogs, FaHome } from 'react-icons/fa'; 
import useAuth from '../Hooks/useAuth';
import Logo from '../Page/Shared/NavBar/Logo';

const DashBoardLayOut = () => {
  const { dbUser, loading } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen dark:bg-[#0f172a] dark:text-white">
      <span className="loading loading-spinner loading-lg text-[#14b8a6]"></span>
    </div>
  );

  // আপনার দেওয়া কালার থিম অনুযায়ী স্টাইল
  const navLinkStyle = ({ isActive }) => 
    `flex items-center gap-4 px-5 py-3 rounded-2xl transition-all duration-300 font-bold mb-1.5 ${
      isActive 
        ? "bg-[#14b8a6] text-white shadow-lg shadow-[#14b8a6]/30" 
        : "text-slate-500 dark:text-slate-400 hover:bg-[#6366f1]/10 hover:text-[#6366f1] dark:hover:bg-[#6366f1]/20 dark:hover:text-[#6366f1]"
    }`;

  return (
    <div className="bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-300 min-h-screen font-sans">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col min-h-screen">
          {/* --- Navbar (No Border) --- */}
          <nav className="navbar w-full bg-white dark:bg-[#1e293b] px-6 transition-colors sticky top-0 z-30 shadow-sm">
            <div className="flex-1">
              <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost lg:hidden text-slate-600 dark:text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </label>
               <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
             <span className="text-cyan-500">Garment</span><span className="text-purple-600">Flow</span>
          </h2>
             
              {/* <div className="text-xl font-black tracking-tight ml-2">
                <span className="text-[#14b8a6]">GERMENT</span>
                <span className="text-slate-800 dark:text-white font-light">FLOW</span>
              </div> */}
            </div>

            <div className="flex-none gap-4">
              {/* অ্যাকসেন্ট কালার (Amber) ছোট একটি ইন্ডিকেটর হিসেবে ব্যবহার করা হয়েছে */}
              <div className="hidden md:flex items-center bg-[#f59e0b]/10 px-3 py-1 rounded-full">
                 <span className="w-2 h-2 bg-[#f59e0b] rounded-full mr-2 animate-pulse"></span>
                 <span className="text-[#f59e0b] text-xs font-bold uppercase">{dbUser?.role || 'User'}</span>
              </div>

              <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-xl transition-all hover:bg-slate-100 dark:hover:bg-slate-800">
                {theme === "light" ? <FaMoon className="text-slate-600" /> : <FaSun className="text-[#f59e0b]" />}
              </button>
            </div>
          </nav>
          
          {/* --- Main Content (No Padding) --- */}
          <main className="p-0 flex-grow transition-colors">
            <Outlet />
          </main>
        </div>

        {/* --- Sidebar (No Border) --- */}
        <div className="drawer-side z-40">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="bg-white dark:bg-[#1e293b] w-72 min-h-full flex flex-col transition-colors">
            
            {/* Sidebar Branding */}
            <div className="p-8 hidden lg:block">
               <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Management</h2>
            </div>

            <ul className="menu px-4 w-full flex-grow">
              <li>
                <Link to='/' className="flex items-center gap-4 px-5 py-3 text-slate-400 hover:text-[#6366f1] rounded-2xl transition-all font-bold mb-8 group">
                  <FaHome className="text-lg group-hover:scale-110 transition-transform" />
                  <span>Exit Dashboard</span>
                </Link>
              </li>

              {/* ১. সবার জন্য কমন লিঙ্ক */}
              <li><NavLink to='/dashboard/profile' className={navLinkStyle}><FaUserCircle className="text-lg" /> My Profile</NavLink></li>

              {/* --- ২. ADMIN এর জন্য লিঙ্ক --- */}
              {dbUser?.role === 'admin' && (
                <>
                  <li><NavLink to='/dashboard/manageusers' className={navLinkStyle}><FaUsers className="text-lg" /> Manage Users</NavLink></li>
                  <li><NavLink to='/dashboard/allproducts' className={navLinkStyle}><FaBoxOpen className="text-lg" /> All Products</NavLink></li>
                  <li><NavLink to='/dashboard/allorders' className={navLinkStyle}><FaClipboardList className="text-lg" /> All Orders</NavLink></li>
                </>
              )}

              {/* --- ৩. MANAGER এর জন্য লিঙ্ক --- */}
              {dbUser?.role === 'manager' && (
                <>
                  <li><NavLink to='/dashboard/addproduct' className={navLinkStyle}><FaPlusSquare className="text-lg" /> Add Product</NavLink></li>
                  <li><NavLink to='/dashboard/manageproduct' className={navLinkStyle}><FaCogs className="text-lg" /> Manage Products</NavLink></li>
                  <li><NavLink to='/dashboard/pendingorders' className={navLinkStyle}><FaClipboardList className="text-lg" /> Pending Orders</NavLink></li>
                  <li><NavLink to='/dashboard/approvedorders' className={navLinkStyle}><FaClipboardList className="text-lg" /> Approved Orders</NavLink></li>  
                </>
              )}

              {/* --- ৪. বায়ার এর জন্য লিঙ্ক --- */}
              {(dbUser?.role === 'buyer' || !dbUser?.role) && (
                <li><NavLink to='/dashboard/myOrders' className={navLinkStyle}><FaBoxOpen className="text-lg" /> My Orders</NavLink></li>
              )}
            </ul>

            {/* Sidebar Footer */}
            <div className="p-6">
              <button className="flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-[#6366f1] dark:hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest w-full">
                <FaCogs className="text-lg" />
                <span>System Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayOut;