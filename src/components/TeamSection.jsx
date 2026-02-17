import React from "react";
import { motion } from "framer-motion";
import { Youtube, Search, BookOpen } from "lucide-react";

function TeamSection() {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center lg:items-start gap-6"
        >
          <h2 className="text-center lg:text-left text-4xl md:text-5xl font-bold leading-tight">
            The Curators Behind{" "}
            <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
              CodeTube
            </span>
          </h2>

          <p className="text-center lg:text-left text-gray-400 max-w-md">
            We are a small team of passionate learners and developers
            who carefully research, filter and organize the best
            educational content from YouTube —
            so students can focus on learning, not searching.
          </p>

          {/* Feature Points */}
          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-3 text-gray-300">
              <Search size={18} className="text-red-500" />
              <span>Research high-quality lectures</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <Youtube size={18} className="text-yellow-500" />
              <span>Curate and organize by category</span>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <BookOpen size={18} className="text-green-500" />
              <span>Provide structured learning paths</span>
            </div>
          </div>

          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 rounded-lg font-semibold shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all">
            Explore Curated Content
          </button>
        </motion.div>

        {/* Right Content - Visual Grid */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0"
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-4 pt-12">
            <img
              className="w-32 h-44 object-cover rounded-2xl hover:-translate-y-1 transition"
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=700"
              alt="Coding"
            />
            <img
              className="w-32 h-44 object-cover rounded-2xl hover:-translate-y-1 transition"
              src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=700"
              alt="Learning"
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <img
              className="w-32 h-44 object-cover rounded-2xl hover:-translate-y-1 transition"
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=700"
              alt="Developer"
            />
            <img
              className="w-32 h-44 object-cover rounded-2xl hover:-translate-y-1 transition"
              src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=700"
              alt="Research"
            />
            <img
              className="w-32 h-44 object-cover rounded-2xl hover:-translate-y-1 transition"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=700"
              alt="Students"
            />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 pt-8">
            <img
              className="w-32 h-44 object-cover rounded-2xl hover:-translate-y-1 transition"
              src="https://images.unsplash.com/photo-1581090700227-1e8a1c4b4b7b?q=80&w=700"
              alt="Team"
            />
            <img
              className="w-32 h-44 object-cover rounded-2xl hover:-translate-y-1 transition"
              src="https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=700"
              alt="Learning Path"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TeamSection;
