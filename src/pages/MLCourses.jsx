import React, { useState } from "react";
import { MLCourse } from "../assets/data.js";
import MLCard from "../components/MLCard";
import { motion } from "framer-motion";
import { Brain, Search, SlidersHorizontal, Sparkles } from "lucide-react";

function MLCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { key: "all", label: "All Courses" },
    { key: "Hindi", label: "Hindi" },
    { key: "English", label: "English" },
  ];

  const filteredCourses = MLCourse.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ? true : course.language === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-yellow-400/5 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Hero Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        {/* Icon Badge */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-yellow-400 to-sky-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/30">
              <Brain size={40} className="text-white" />
            </div>
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={12} className="text-black" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tight"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          Machine{" "}
          <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-sky-400 bg-clip-text text-transparent">
            Learning
          </span>
          <br />
          <span className="text-white">Courses</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Explore our curated ML courses in Hindi and English and start building
          intelligent systems today.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          className="flex justify-center gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { value: `${MLCourse.length}+`, label: "Courses" },
            { value: "2", label: "Languages" },
            { value: "100%", label: "Free" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-400 to-sky-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-2xl max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Search Input */}
          <div className="relative mb-4">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search ML courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-black/40 border-2 border-sky-400/30 rounded-xl text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <SlidersHorizontal size={16} className="text-gray-400" />
            {filters.map((filter) => (
              <motion.button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-300 ${
                  activeFilter === filter.key
                    ? "border-red-500 bg-red-500/20 text-red-400 shadow-lg shadow-red-500/20"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}

            <span className="ml-auto text-gray-500 text-sm">
              <span className="text-yellow-400 font-bold text-base">
                {filteredCourses.length}
              </span>{" "}
              result{filteredCourses.length !== 1 ? "s" : ""}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Courses Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        {filteredCourses.length > 0 ? (
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCourses.map((course, index) => (
              <MLCard key={course.id} course={course} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
          >
            <motion.div
              className="text-7xl mb-6"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              🤖
            </motion.div>
            <h3 className="text-2xl font-bold text-red-500 mb-3">
              No Courses Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default MLCourses;