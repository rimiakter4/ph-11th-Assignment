// import React from 'react';

// const NewsLetter = () => {
//    return (
//     <div className="bg-gradient-to-r from-cyan-500 to-blue-600 py-12">
//       <div className="max-w-5xl mx-auto px-4 text-center text-white">
//         <h2 className="text-3xl font-bold mb-4">Stay Updated with GarmentFlow</h2>
//         <p className="mb-8 opacity-90">Subscribe to our newsletter to get latest industry news and production tips.</p>
//         <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
//           <input 
//             type="email" 
//             placeholder="Enter your email" 
//             className="px-6 py-3 rounded-full text-gray-800 focus:outline-none w-full border-none"
//             required
//           />
//           <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-full transition duration-300">
//             Subscribe
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewsLetter;
import React from 'react';

const Newsletter = () => {
  return (
    <div className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center">
          {/* Title with your brand colors */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Subscribe to <span className="text-cyan-500">Garment</span><span className="text-purple-600">Flow</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            Get the latest updates on production tracking, industry trends, and new features delivered to your inbox.
          </p>

          {/* Form */}
          <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              required
            />
            <button 
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-semibold shadow-md transition-all active:scale-95"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
// import React from 'react';

// const Newsletter = () => {
//   return (
//     <div className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 relative">
        
//         {/* Main Content Wrapper */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
//           {/* Left Image - Hidden on mobile, visible on medium screens up */}
//           <div className="hidden md:block w-1/4 animate-bounce-slow">
//             <img 
//               src="https://via.placeholder.com/300x300" 
//               alt="Industry Trend" 
//               className="rounded-2xl shadow-lg rotate-3"
//             />
//           </div>

//           {/* Center Form Content */}
//           <div className="flex-1 text-center z-10">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
//               Subscribe to <span className="text-cyan-500">Garment</span><span className="text-purple-600">Flow</span>
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
//               Get the latest updates on production tracking, industry trends, and new features delivered to your inbox.
//             </p>

//             <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
//               <input 
//                 type="email" 
//                 placeholder="Enter your email" 
//                 className="w-full px-5 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
//                 required
//               />
//               <button 
//                 type="submit"
//                 className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-semibold shadow-md transition-all active:scale-95 whitespace-nowrap"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>

//           {/* Right Image - Hidden on mobile */}
//           <div className="hidden md:block w-1/4 animate-pulse-slow">
//             <img 
//               src="https://via.placeholder.com/300x300" 
//               alt="Production Tracking" 
//               className="rounded-2xl shadow-lg -rotate-3"
//             />
//           </div>

//         </div>

//         {/* Optional: Decorative background blobs */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-100 dark:bg-cyan-900/20 blur-3xl -z-10 rounded-full"></div>
//       </div>
//     </div>
//   );
// };

// export default Newsletter;