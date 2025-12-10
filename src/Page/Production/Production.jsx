import { motion } from "framer-motion";

export default function Production() {
  const stats = [
    { number: "150+", label: "Completed Orders" },
    { number: "20+", label: "Running Orders" },
    { number: "12", label: "Partner Factories" },
    { number: "80+", label: "Happy Clients" },
  ];

  return (
    <section className="py-12 my-16 bg-gradient-to-r from-teal-400/30 via-indigo-500/30 to-purple-500/30 ">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 mb-10 "
        >
          Production Statistics
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white shadow p-6 rounded-xl  "
            >
              <h3 className="text-3xl font-bold text-blue-600">
                {item.number}
              </h3>
              <p className="text-gray-700 mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
