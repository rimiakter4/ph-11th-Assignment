import React from 'react';
import Logo from './Logo';
import { NavLink } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import { toast } from 'react-toastify';

const NavBar = () => {
  const {user,logout}=useAuth()
  const handellogout = () => {
    logout()
      .then(() => toast("LogOut successfully"))
      .catch(err => console.log(err));
  };
    const links=<> 
<li><NavLink to='/'>Home</NavLink></li>
<li><NavLink to='/coverage'>All-Product</NavLink></li>
{
  user?<li><NavLink to='/dashboard'>Dashboard</NavLink></li>:<li><NavLink to='/sender'>About Us</NavLink></li>
}
{/* {
  user?<li><NavLink to='/coverage'> User Avatar</NavLink></li>:''
} */}




</>
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {links}
      </ul>
    </div>
    <Logo></Logo>
 
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal font-semibold text-[16px] px-1">
     {
        links
     }
    </ul>
  </div>
  <div className="navbar-end gap-2">

          {user && (
            <div className="relative group cursor-pointer">
              <img
                src={user.photoURL}
                alt="profile"
                className="w-12 h-12 rounded-full border-2 border-white transition duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:border-sky-300"
              />
  

              <span
                className="
                  absolute opacity-0 group-hover:opacity-100
                  transition-all duration-300 ease-in-out
                  bg-black/80 backdrop-blur-md text-white
                  text-sm px-4 py-1 rounded-xl shadow-lg
                  whitespace-nowrap
                  left-1/2 -translate-x-1/2
                  top-14 group-hover:top-16
                "
              >
                {user.displayName}
              </span>
            </div>
          )}


{!user && (
            <NavLink to='/register' className="btn bg-gradient-to-r rounded-xl from-teal-400 to-indigo-500 text-white font-bold  w-[100px]">
             Register
            </NavLink>
          )}

          {user ? (
            <button onClick={handellogout} className="btn bg-gradient-to-r rounded-xl from-teal-400 to-indigo-500 text-white font-bold  w-[100px]">
              Log out
            </button>
          ) : (
            <NavLink to='/login' className="btn bg-gradient-to-r rounded-xl from-teal-400 to-indigo-500 text-white font-bold  w-[100px]">
              Log in
            </NavLink>
          )}


  </div>
</div>
    );
};

export default NavBar;
