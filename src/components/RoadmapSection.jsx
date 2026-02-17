import React from "react";
import { motion } from "framer-motion";

function RoadmapSection() {
  const steps = [
    "Start with Basics",
    "Practice with Projects",
    "Master Core Concepts",
    "Prepare for Interviews",
  ];

  return (
    <section className="bg-neutral-950 text-white py-24 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          Your Learning Roadmap
        </h2>
        <p className="text-gray-400">
          Follow a structured path instead of random tutorials.
        </p>
      </div>

      <div className="space-y-10 max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-yellow-500 font-bold">
              {index + 1}
            </div>
            <p className="text-lg text-gray-300">{step}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default RoadmapSection;
