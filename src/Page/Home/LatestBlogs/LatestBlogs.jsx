// import React from 'react';

// const LatestBlogs = () => {
//   const blogs = [
//     { 
//       id: 1, 
//       title: "Efficiency in Textile Industry", 
//       desc: "How automation is changing the garment world with smart tracking and AI-driven solutions.", 
//       img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=400&q=80" 
//     },
//     { 
//       id: 2, 
//       title: "Sustainable Fashion Trends", 
//       desc: "The future of eco-friendly garment production and reducing carbon footprints in factories.", 
//       img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80" 
//     },
//     { 
//       id: 3, 
//       title: "Quality Control Tips", 
//       desc: "Ensuring zero defects in mass production through rigorous testing and quality management.", 
//       img: "https://images.unsplash.com/photo-1556905085-8f7451965821?auto=format&fit=crop&w=400&q=80" 
//     }
//   ];

//   return (
//     <div className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Section Heading */}
//         <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold dark:text-white">Latest Industry News</h2>
//             <div className="w-20 h-1 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
//         </div>

//         {/* Blog Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {blogs.map(blog => (
//             <div 
//               key={blog.id} 
//               className="bg-gray-50 dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
//             >
//               <img src={blog.img} alt={blog.title} className="w-full h-48 object-cover" />
//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-cyan-500">{blog.title}</h3>
//                 <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{blog.desc}</p>
//                 <button className="text-cyan-600 font-semibold hover:text-cyan-500 transition-colors">
//                     Read More →
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LatestBlogs;
import React from 'react';

const LatestBlogs = () => {
  const blogs = [
    { 
      id: 1, 
      title: "Efficiency in Textile Industry", 
      desc: "How automation is changing the garment world with smart tracking and AI-driven solutions.", 
      img: "https://i.ibb.co.com/JRLLWGx1/photo-1636986056375-184676d8ca14.avif" 
    },
    { 
      id: 2, 
      title: "Sustainable Fashion Trends", 
      desc: "The future of eco-friendly garment production and reducing carbon footprints in factories.", 
      // Replace with generated sustainable image URL
      img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80" 
    },
    { 
      id: 3, 
      title: "Quality Control Tips", 
      desc: "Ensuring zero defects in mass production through rigorous testing and quality management.", 
      // Replace with generated quality control image URL
      img: "https://i.ibb.co.com/KzVMPwny/istockphoto-1356386941-2048x2048.jpg" 
    }
  ];

  return (
    <div className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold dark:text-white">Latest Industry News</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <div 
              key={blog.id} 
              className="group bg-gray-50 dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="overflow-hidden">
                <img 
                  src={blog.img} 
                  alt={blog.title} 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-cyan-500 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {blog.desc}
                </p>
                <button className="text-cyan-600 font-semibold hover:text-cyan-400 transition-colors flex items-center gap-2">
                  Read More 
                  <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestBlogs;