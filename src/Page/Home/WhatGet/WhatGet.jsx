// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// export default function WhatGet() {
//   const feedbacks = [
//     {
//       name: "John Miller",
//       role: "Garments Buyer - USA",
//       message:
//         "The tracking system has made our order monitoring super smooth. Real-time updates saved us countless follow-up emails!",
//       img: "https://i.pravatar.cc/100?img=15",
//     },
//     {
//       name: "Ayesha Rahman",
//       role: "Factory Manager - Dhaka",
//       message:
//         "Amazing tool! We can track production, QC, and shipment all in one place. Fully recommended for any garment factory.",
//       img: "https://i.pravatar.cc/100?img=32",
//     },
//     {
//       name: "Michael Smith",
//       role: "Brand Owner - UK",
//       message:
//         "Very user-friendly system. Transparent tracking and perfect execution. Love the interface and accuracy!",
//       img: "https://i.pravatar.cc/100?img=8",
//     },
//   ];

//   const [index, setIndex] = useState(0);

//   // Auto-slide every 4 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % feedbacks.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, []);

//   const prevSlide = () => {
//     setIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
//   };

//   const nextSlide = () => {
//     setIndex((prev) => (prev + 1) % feedbacks.length);
//   };

//   return (
//     <section className="py-12 my-10 bg-white">
//       <div className="container mx-auto text-center">

//         <h2 className="text-3xl font-bold text-gray-800 mb-10">
//           What Our Clients Say
//         </h2>

//         <div className="relative   max-w-xl mx-auto">

//           {/* Carousel Content */}
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="bg-gray-50 shadow-lg rounded-2xl p-6 bg-gradient-to-r from-teal-400/30 via-indigo-500/30 to-purple-500/30"
//           >
//             <img
//               src={feedbacks[index].img}
//               className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-blue-500"
//             />

//             <p className="text-gray-700 text-sm leading-relaxed mb-4">
//               "{feedbacks[index].message}"
//             </p>

//             <h3 className="font-semibold text-gray-800">
//               {feedbacks[index].name}
//             </h3>
//             <p className="text-blue-600 text-sm">{feedbacks[index].role}</p>
//           </motion.div>

//           {/* Navigation Buttons */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
//           >
//             ◀
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
//           >
//             ▶
//           </button>
//         </div>

//         {/* Dots Indicator */}
//         <div className="flex justify-center mt-4 space-x-2">
//           {feedbacks.map((_, i) => (
//             <div
//               key={i}
//               className={`w-3 h-3 rounded-full ${
//                 index === i ? "bg-blue-600" : "bg-gray-400"
//               }`}
//             ></div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function WhatGet() {
  const feedbacks = [
    {
      name: "John Miller",
      role: "Garments Buyer - USA",
      message:
        "The tracking system has made our order monitoring super smooth. Real-time updates saved us countless follow-up emails!",
      img: "https://i.pravatar.cc/100?img=15",
    },
    {
      name: "Ayesha Rahman",
      role: "Factory Manager - Dhaka",
      message:
        "Amazing tool! We can track production, QC, and shipment all in one place. Fully recommended for any garment factory.",
      img: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "Michael Smith",
      role: "Brand Owner - UK",
      message:
        "Very user-friendly system. Transparent tracking and perfect execution. Love the interface and accuracy!",
      img: "https://i.pravatar.cc/100?img=8",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % feedbacks.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % feedbacks.length);
  };

  return (
    /* ১. সেকশন ব্যাকগ্রাউন্ড পরিবর্তন */
    <section className="py-12  bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto text-center px-4">

        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-10">
          What Our Clients Say
        </h2>

        <div className="relative max-w-xl mx-auto">

          {/* Carousel Content */}
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            /* ২. কার্ডের ব্যাকগ্রাউন্ড এবং গ্রেডিয়েন্ট অ্যাডজাস্টমেন্ট */
            className="bg-gray-50 dark:bg-gray-800 shadow-lg rounded-2xl p-6 bg-gradient-to-r from-teal-400/20 via-indigo-500/20 to-purple-500/20 border border-transparent dark:border-gray-700"
          >
            <img
              src={feedbacks[index].img}
              alt={feedbacks[index].name}
              className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-blue-500"
            />

            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
              "{feedbacks[index].message}"
            </p>

            <h3 className="font-semibold text-gray-800 dark:text-gray-100">
              {feedbacks[index].name}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm">{feedbacks[index].role}</p>
          </motion.div>

          {/* ৩. নেভিগেশন বাটন কালার পরিবর্তন */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-full transition-colors"
          >
            <span className="dark:text-white">◀</span>
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-full transition-colors"
          >
            <span className="dark:text-white">▶</span>
          </button>
        </div>

        {/* ৪. ডটস ইন্ডিকেটর */}
        <div className="flex justify-center mt-6 space-x-2">
          {feedbacks.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === i ? "bg-blue-600 scale-125" : "bg-gray-400 dark:bg-gray-600"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}