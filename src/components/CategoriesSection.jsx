import React from "react";
import { motion } from "framer-motion";

const categories = [
  "Python Programming",
  "Web Development",
  "Machine Learning",
  "Artificial Intelligence",
  "Data Structures & Algorithms",
  "Career Roadmap",
];

// Animation Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function CategoriesSection() {
  return (
    <section className="bg-black text-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-14">

        {/* Heading Animation */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-4"
        >
          Explore{" "}
          <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
            Learning Categories
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-400"
        >
          Choose your path and start learning today.
        </motion.p>
      </div>

      {/* Categories with Stagger Scroll Effect */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto"
      >
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-red-600/20 to-yellow-500/20 border border-red-600/40 rounded-full cursor-pointer hover:from-red-600 hover:to-yellow-500 hover:text-white transition-all duration-300"
          >
            {cat}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default CategoriesSection;
