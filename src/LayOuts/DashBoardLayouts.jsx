// import React from 'react';

// import { Link, NavLink, Outlet } from 'react-router';
// import useRole from '../Hooks/useRole';
// import useAuth from '../Hooks/useAuth';

// const DashBoardLayOut = () => {
//   const {role}=useRole()
//   const { dbUser } = useAuth()
//     return (
//         <div>
//             <div className="drawer lg:drawer-open">
//   <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//   <div className="drawer-content">
//     {/* Navbar */}
//     <nav className="navbar w-full bg-base-300">
//       <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
//         {/* Sidebar toggle icon */}
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
//       </label>
//       <div className="px-4">Zap shift dashboard</div>
//     </nav>
//     {/* Page content here */}
//     <Outlet></Outlet>
   
//   </div>

//   <div className="drawer-side is-drawer-close:overflow-visible">
//     <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
//     <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
//       {/* Sidebar content here */}
//       <ul className="menu w-full grow">
//         {/* List item */}
//         <li>
//           <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
//             {/* Home icon */}
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
//             <span className="is-drawer-close:hidden">Homepage</span>
//           </Link>
//         </li>
// {/* our dashboard link  */}
// {/* <li><NavLink to='/dashboard/myOrders'>My orders</NavLink></li>
// {
//   role==='admin'&&<> 
//   <li><NavLink to='/dashboard/manageusers'>Manage Users </NavLink></li>
// <li><NavLink to='/dashboard/allproducts'> All Products</NavLink></li>
// <li><NavLink to='/dashboard/allorders'> All Orders</NavLink></li>
// <li><NavLink to='/dashboard/addproduct'> Add Product</NavLink></li>
// <li><NavLink to='/dashboard/profile'>My Profile</NavLink></li>
//   </>
// }
// {/* <li><NavLink to='/dashboard/manageusers'>Manage Users </NavLink></li>
// <li><NavLink to='/dashboard/allproducts'> All Products</NavLink></li>
// <li><NavLink to='/dashboard/allorders'> All Orders</NavLink></li>
// <li><NavLink to='/dashboard/addproduct'> Add Product</NavLink></li>
//  <li><NavLink to='/dashboard/manageproduct'>Manage Products</NavLink></li>
// <li><NavLink to='/dashboard/pendingorders'>Pending Orders</NavLink></li>
// <li><NavLink to='/dashboard/approvedorders'>Approved Orders</NavLink></li>  */}
// {/* <li><NavLink to='/dashboard/profile'>My Profile</NavLink></li>
//         List item */} 
       


// <li><NavLink to='/dashboard/myOrders'>My orders</NavLink></li>

// {
//   dbUser?.role === 'admin' && (
//     <> 
//       <li><NavLink to='/dashboard/manageusers'>Manage Users</NavLink></li>
//       <li><NavLink to='/dashboard/allproducts'>All Products</NavLink></li>
//       <li><NavLink to='/dashboard/allorders'>All Orders</NavLink></li>
//       <li><NavLink to='/dashboard/addproduct'>Add Product</NavLink></li>
//       <li><NavLink to='/dashboard/profile'>My Profile</NavLink></li>
//     </>
//   )
// }

// {/* সাধারণ প্রোফাইল লিঙ্ক যা সবার জন্য থাকবে */}
// <li><NavLink to='/dashboard/profile'>My Profile</NavLink></li>
//         <li>
//           <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
//             {/* Settings icon */}
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
//             <span className="is-drawer-close:hidden">Settings</span>
//           </button>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>
//         </div>
//     );
// };

// export default DashBoardLayOut;
import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
// import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';

const DashBoardLayOut = () => {
  // const { role } = useRole(); // আপনি চাইলে সরাসরি role ব্যবহার করতে পারেন
  const { dbUser, loading } = useAuth(); // loading স্টেট থাকলে ভালো হয়

  // যদি ডাটা লোড হতে সময় নেয় তবে একটি স্পিনার দেখাতে পারেন
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
            </label>
            <div className="px-4 font-bold">GermentFlow Dashboard</div>
          </nav>
          
          {/* Page content here */}
          <div className="p-5">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            <ul className="menu w-full grow">
              <li>
                <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              {/* সাধারণ ইউজারদের জন্য লিঙ্ক
              <li><NavLink to='/dashboard/myOrders'>My Orders</NavLink></li>

              {/* অ্যাডমিনদের জন্য লিঙ্ক */}
              {/* {
                dbUser?.role === 'admin' && (
                  <> 
                    <li><NavLink to='/dashboard/manageusers'>Manage Users</NavLink></li>
                    <li><NavLink to='/dashboard/allproducts'>All Products</NavLink></li>
                    <li><NavLink to='/dashboard/allorders'>All Orders</NavLink></li>
                    <li><NavLink to='/dashboard/addproduct'>Add Product</NavLink></li>
                  </>
                )
              } */}

              {/* সবার জন্য কমন প্রোফাইল লিঙ্ক */}
              {/* <li><NavLink to='/dashboard/profile'>My Profile</NavLink></li>  */}


{/* ১. সবার জন্য কমন লিঙ্ক (Profile সবারই থাকে) */}
<li><NavLink to='/dashboard/profile'>My Profile</NavLink></li>

{/* --- ২. শুধুমাত্র ADMIN এর জন্য লিঙ্ক --- */}
{
 dbUser?.role === 'admin' && (
    <>
      <li><NavLink to='/dashboard/manageusers'>Manage Users</NavLink></li>
      <li><NavLink to='/dashboard/allproducts'>All Products</NavLink></li>
      <li><NavLink to='/dashboard/allorders'>All Orders</NavLink></li>
    </>
  )
}

{/* --- ৩. শুধুমাত্র MANAGER এর জন্য লিঙ্ক --- */}
{
  dbUser?.role === 'manager' && (
    <>
     <li><NavLink to='/dashboard/addproduct'> Add Product</NavLink></li>
  <li><NavLink to='/dashboard/manageproduct'>Manage Products</NavLink></li>
 <li><NavLink to='/dashboard/pendingorders'>Pending Orders</NavLink></li>
 <li><NavLink to='/dashboard/approvedorders'>Approved Orders</NavLink></li>  
    </>
  )
}

{/* --- ৪. শুধুমাত্র BUYER এর জন্য লিঙ্ক --- */}
{
 dbUser?.role === 'buyer' && (
    <>
     <li><NavLink to='/dashboard/myOrders'>My Orders</NavLink></li>
      {/* track order পেজে যেতে সাধারণত একটি ID লাগে, তাই /dashboard/my-orders থেকেই বাটনের মাধ্যমে যাওয়া ভালো */}
      {/* <li><NavLink to='/dashboard/track-order'>Track Order</NavLink></li> */}
    </>
  )
}










              <li>
                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayOut;