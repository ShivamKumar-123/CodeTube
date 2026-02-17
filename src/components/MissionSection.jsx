import React from "react";
import { motion } from "framer-motion";
import { Youtube, BookOpen, Search, GraduationCap } from "lucide-react";

function MissionSection() {
  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Our Mission at{" "}
            <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
              CodeTube
            </span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            There are countless high-quality lectures available on YouTube,
            but many students struggle to discover the best ones.
            CodeTube exists to carefully curate and organize the most
            valuable educational content in one place —
            so students can access structured, high-quality learning
            without distractions.
          </p>

          <div className="space-y-5">

            <div className="flex items-start gap-4">
              <Search className="text-red-500 mt-1" />
              <p className="text-gray-300">
                We research and collect the best educational lectures from YouTube.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <BookOpen className="text-yellow-500 mt-1" />
              <p className="text-gray-300">
                We organize courses by category — Coding, ML, AI, DSA and more.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <GraduationCap className="text-green-500 mt-1" />
              <p className="text-gray-300">
                We provide a clear learning roadmap to help students grow step by step.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Right Side Visual Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-neutral-900 border border-white/10 rounded-2xl p-10 shadow-xl hover:shadow-red-600/20 transition-all duration-300"
        >
          <div className="flex items-center gap-4 mb-6">
            <Youtube size={40} className="text-red-600" />
            <h3 className="text-2xl font-semibold">
              From YouTube to Structured Learning
            </h3>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6">
            Instead of randomly searching through countless videos,
            students can directly access curated, high-quality lectures
            organized in a clear and structured way.
          </p>

          <div className="bg-gradient-to-r from-red-600 to-yellow-500 p-1 rounded-xl">
            <div className="bg-black rounded-xl p-6 text-center">
              <p className="text-lg font-semibold">
                “Curated Learning. Zero Distraction.”
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default MissionSection;
