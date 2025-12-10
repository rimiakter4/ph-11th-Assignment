// import { motion } from "framer-motion";

// const steps = [
//   {
//     id: 1,
//     title: "Place Your Order",
//     desc: "Customer submits garment order with product details, quantity, colors, size breakdown, and delivery timeline.",
//     icon: "📝",
//   },
//   {
//     id: 2,
//     title: "Order Processing",
//     desc: "Merchandiser reviews order, confirms pricing, allocates fabrics & trims, and schedules production timeline.",
//     icon: "⚙️",
//   },
//   {
//     id: 3,
//     title: "Production & Delivery",
//     desc: "Bulk production begins → quality checks → packaging → shipment → final delivery to the customer.",
//     icon: "🚚",
//   },
// ];

// const Work = () => {
//   return (
//     <section className="py-16 bg-gradient-to-b from-green-50 to-white">
//       <h2 className="text-4xl md:text-5xl font-bold text-center text-green-700 mb-12">
//         How It Works
//       </h2>

//       <div className="container mx-auto grid md:grid-cols-3 gap-8 px-6">
//         {steps.map((step, index) => (
//           <motion.div
//             key={step.id}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.2, duration: 0.6 }}
//             className="bg-white shadow-lg rounded-2xl p-6 border border-green-200 hover:shadow-xl hover:-translate-y-1 duration-300"
//           >
//             <div className="text-5xl mb-4 text-green-600">{step.icon}</div>
//             <h3 className="text-2xl font-bold text-green-800 mb-2">
//               {step.title}
//             </h3>
//             <p className="text-gray-600 leading-relaxed">{step.desc}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Work;


// HowItWorks.jsx
import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Place Your Order",
    desc: "Customers submit garment orders with product details, quantity, size, color, and delivery schedule.",
    icon: "📝",
  },
  {
    id: 2,
    title: "Order Processing",
    desc: "Merchandisers review orders, confirm pricing, allocate fabrics & trims, and schedule production.",
    icon: "⚙️",
  },
  {
    id: 3,
    title: "Production Tracking",
    desc: "Monitor production stages in real-time, from cutting to stitching to quality checks.",
    icon: "📦",
  },
  {
    id: 4,
    title: "Delivery & Feedback",
    desc: "Finished garments are delivered on schedule. Customers can give feedback for continuous improvement.",
    icon: "🚚",
  },
];

const Work = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-gray-800"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: step.id * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
