import React from "react";
import { motion } from "framer-motion";

function StatsSection() {
  const stats = [
    { number: "200+", label: "Curated Lectures" },
    { number: "15+", label: "Categories" },
    { number: "100% Free", label: "Open Access" },
    { number: "Thousands", label: "Happy Learners" },
  ];

  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
              {stat.number}
            </h3>
            <p className="text-gray-400 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;
