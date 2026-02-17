import React, { useState } from "react";
import { AICoursesData } from "../assets/data.js";
import MLCard from "../components/MLCard";
import { motion } from "framer-motion";
import { Bot, Search, SlidersHorizontal, Cpu, Zap, Binary } from "lucide-react";

function AICourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { key: "all", label: "All Courses" },
    { key: "Hindi", label: "🇮🇳 Hindi" },
    { key: "English", label: "🇬🇧 English" },
  ];

  const filteredCourses = AICoursesData.filter((course) => {
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
      transition: { staggerChildren: 0.1 },
    },
  };

  const floatingIcons = [
    { Icon: Cpu, x: "10%", y: "20%", delay: 0, color: "text-red-500/20" },
    { Icon: Binary, x: "85%", y: "15%", delay: 0.5, color: "text-yellow-400/20" },
    { Icon: Zap, x: "75%", y: "70%", delay: 1, color: "text-sky-400/20" },
    { Icon: Bot, x: "5%", y: "75%", delay: 1.5, color: "text-red-500/20" },
    { Icon: Cpu, x: "50%", y: "85%", delay: 2, color: "text-yellow-400/20" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">

      {/* Floating Background Icons */}
      {floatingIcons.map(({ Icon, x, y, delay, color }, i) => (
        <motion.div
          key={i}
          className={`absolute pointer-events-none ${color}`}
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        >
          <Icon size={48} />
        </motion.div>
      ))}

      {/* Ambient Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 left-1/3 w-[600px] h-[600px] bg-red-500/8 rounded-full blur-[140px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-400/8 rounded-full blur-[120px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 11, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 -left-32 w-[400px] h-[400px] bg-yellow-400/6 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">

        {/* Icon Badge */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
        >
          <div className="relative">
            {/* Spinning Ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-dashed border-red-500/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ margin: "-6px" }}
            />
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-yellow-400 to-sky-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/30 relative z-10">
              <Bot size={40} className="text-white" />
            </div>

            {/* Pulse Rings */}
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-2xl border border-red-500/20"
                style={{ margin: `-${i * 10}px` }}
                animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.15, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring", delay: 0.1 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Artificial{" "}
            <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-sky-400 bg-clip-text text-transparent">
              Intelligence
            </span>
            <br />
            <span className="text-white text-4xl md:text-6xl">Courses</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Explore beginner to advanced AI courses in Hindi and English and
          start building intelligent systems.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          className="flex justify-center gap-6 md:gap-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { value: `${AICoursesData.length}+`, label: "Courses", color: "from-red-500 to-red-400" },
            { value: "2", label: "Languages", color: "from-yellow-400 to-yellow-300" },
            { value: "Free", label: "Access", color: "from-sky-400 to-sky-300" },
            { value: "AI", label: "Focused", color: "from-red-500 via-yellow-400 to-sky-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              whileHover={{ scale: 1.12, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`text-2xl md:text-3xl font-extrabold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-gray-500 text-xs mt-1 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          {/* Search */}
          <div className="relative mb-4">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <motion.input
              type="text"
              placeholder="Search AI courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-black/50 border-2 border-sky-400/30 rounded-xl text-white placeholder-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 text-sm"
              whileFocus={{ scale: 1.01 }}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <SlidersHorizontal size={15} className="text-gray-500 shrink-0" />
            {filters.map((filter) => (
              <motion.button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-300 ${
                  activeFilter === filter.key
                    ? "border-red-500 bg-red-500/20 text-red-400 shadow-lg shadow-red-500/20"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30 hover:text-white"
                }`}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
              >
                {filter.label}
              </motion.button>
            ))}

            {/* Live Counter */}
            <motion.span
              className="ml-auto text-gray-500 text-sm"
              key={filteredCourses.length}
              initial={{ scale: 1.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-yellow-400 font-bold text-base">
                {filteredCourses.length}
              </span>{" "}
              result{filteredCourses.length !== 1 ? "s" : ""}
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Courses Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
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
            className="text-center py-28"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <motion.div
              className="text-8xl mb-6 inline-block"
              animate={{
                rotate: [0, -15, 15, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              🤖
            </motion.div>
            <h3 className="text-2xl font-bold text-red-500 mb-3">
              No Courses Found
            </h3>
            <p className="text-gray-500 text-base">
              Try adjusting your search or filter.
            </p>
            <motion.button
              onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
              className="mt-6 px-6 py-2.5 rounded-full border-2 border-sky-400 text-sky-400 text-sm font-semibold hover:bg-sky-400/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AICourses;