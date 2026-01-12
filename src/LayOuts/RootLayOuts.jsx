import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Page/Shared/NavBar/NavBar';
import Fotter from '../Page/Shared/Fotter/Fotter';

const RootLayOuts = () => {
    return (
        <div className=" bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar></Navbar>
             <main className=" ">
        <Outlet />
      </main>
            <Fotter></Fotter>
        </div>
    );
};

export default RootLayOuts;



// import React from 'react';
// import { Outlet } from 'react-router';
// import Navbar from '../Page/Shared/NavBar/NavBar';
// import Fotter from '../Page/Shared/Fotter/Fotter';

// const RootLayOuts = () => {
//  return (
//     /* ! চিহ্ন ব্যবহার করা হয়েছে যাতে DaisyUI এটাকে ওভাররাইড করতে না পারে */
//     <div className="!bg-white dark:!bg-slate-950 !text-slate-900 dark:!text-slate-100 min-h-screen transition-colors duration-300">
//       <Navbar />
//       <main className="p-4 container mx-auto">
//         <Outlet />
//       </main>
//        <Fotter />
//     </div>)
//  };

// export default RootLayOuts;
// import React from 'react';
// import { Outlet } from 'react-router';
// import Navbar from '../Page/Shared/NavBar/NavBar';
// import Fotter from '../Page/Shared/Fotter/Fotter';

// const RootLayOuts = () => {
//   return (
//     /* !bg-white এবং dark:!bg-black ব্যবহার করুন যাতে সব ওভাররাইড হয় */
//     <div className="!bg-white dark:!bg-black !text-slate-900 dark:!text-white min-h-screen transition-colors duration-300">
//       <Navbar />
//       <main className="p-4 container mx-auto">
//         <Outlet />
//       </main>
//        <Fotter />
//     </div>)
// };

// export default RootLayOuts;