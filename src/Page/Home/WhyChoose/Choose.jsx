// import { motion } from "framer-motion";

// export default function Choose() {
//   const features = [
//     {
//       icon: "⚡",
//       title: "Fast Production Tracking",
//       desc: "Real-time order progress updates with zero delays.",
//     },
//     {
//       icon: "🎯",
//       title: "100% Accuracy",
//       desc: "Automated system ensures correct quantity, color & sizes.",
//     },
//     {
//       icon: "🔍",
//       title: "Full Transparency",
//       desc: "Every stage — from cutting to delivery — visible anytime.",
//     },
//   ];

//   return (
//     <section className="py-10 bg-white">
//       <div className="container mx-auto text-center">
//         <motion.h2
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="text-3xl font-bold text-gray-800 mb-10"
//         >
//           Why Choose Our Tracker System?
//         </motion.h2>

//         <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
//           {features.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               className="p-6 bg-gray-50 shadow rounded-xl   bg-gradient-to-r from-teal-400/30 via-indigo-500/30 to-purple-500/30"
//             >
//               <div className="text-5xl mb-4">{item.icon}</div>
//               <h3 className="text-lg font-semibold text-gray-700">
//                 {item.title}
//               </h3>
//               <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import { motion } from "framer-motion";

export default function Choose() {
  const features = [
    {
      icon: "⚡",
      title: "Fast Production Tracking",
      desc: "Real-time order progress updates with zero delays.",
    },
    {
      icon: "🎯",
      title: "100% Accuracy",
      desc: "Automated system ensures correct quantity, color & sizes.",
    },
    {
      icon: "🔍",
      title: "Full Transparency",
      desc: "Every stage — from cutting to delivery — visible anytime.",
    },
  ];

  return (
    /* ১. সেকশন ব্যাকগ্রাউন্ড ডার্ক মোডে কালো/ডার্ক গ্রে হবে */
    <section className="py-19 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          /* ২. হেডিং টেক্সট কালার পরিবর্তন */
          className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-10"
        >
          Why Choose Our Tracker System?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              /* ৩. কার্ডের ব্যাকগ্রাউন্ড ও গ্রেডিয়েন্ট ডার্ক মোড অনুযায়ী অ্যাডজাস্ট */
              className="p-6 bg-gray-50 dark:bg-gray-800 shadow rounded-xl border border-transparent dark:border-gray-700 bg-gradient-to-r from-teal-400/20 via-indigo-500/20 to-purple-500/20"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              
              {/* ৪. টাইটেল ও ডেসক্রিপশন কালার */}
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}