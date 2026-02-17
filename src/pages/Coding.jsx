import React, { useState } from "react";
import { CodingLanguages } from "../assets/data.js";
import { motion, AnimatePresence } from "framer-motion";

function Coding() {
  const [language, setLanguage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Featured courses for carousel (first 5 courses)
  const featuredCourses = CodingLanguages.slice(0, 5);

  const filteredCourses = CodingLanguages.filter((course) => {
    const matchesLanguage =
      language === "all" ? true : course.language === language;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLanguage && matchesSearch;
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCourses.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? featuredCourses.length - 1 : prev - 1
    );
  };

  const getAccentColor = (index) => {
    const colors = ["bg-red-500", "bg-yellow-400", "bg-sky-400"];
    return colors[index % 3];
  };

  const getBorderColor = (index) => {
    const colors = ["border-red-500", "border-yellow-400", "border-sky-400"];
    return colors[index % 3];
  };

  const getTextColor = (index) => {
    const colors = ["text-red-500", "text-yellow-400", "text-sky-400"];
    return colors[index % 3];
  };

  const getShadowColor = (index) => {
    const colors = ["shadow-red-500/50", "shadow-yellow-400/50", "shadow-sky-400/50"];
    return colors[index % 3];
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r from-red-500 via-yellow-400 to-sky-400 bg-clip-text text-transparent"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Coding Courses
          </motion.h1>
          <motion.p 
            className="text-sky-300 text-lg md:text-xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Master programming languages with our curated collection
          </motion.p>
        </motion.div>

        {/* Carousel Section */}
        <motion.div 
          className="mb-16 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-white mb-6 text-center"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            🌟 Featured Courses
          </motion.h2>
          
          <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl">
            {/* Carousel Container */}
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentSlide}
                custom={currentSlide}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="p-8 md:p-16"
              >
                {(() => {
                  const course = featuredCourses[currentSlide];
                  const index = currentSlide;
                  const colors = ["from-red-500/20", "from-yellow-400/20", "from-sky-400/20"];
                  const accentColors = ["red", "yellow", "sky"];
                  const accentColor = accentColors[index % 3];
                  
                  return (
                    <div className={`bg-gradient-to-br ${colors[index % 3]} to-transparent rounded-2xl p-8 md:p-12 border-l-4 ${getBorderColor(index)}`}>
                      <div className="max-w-3xl mx-auto">
                        <motion.span 
                          className={`inline-block px-4 py-2 rounded-full ${getAccentColor(index)} text-black text-sm font-bold mb-4`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                          Featured
                        </motion.span>
                        <motion.h3 
                          className={`text-3xl md:text-5xl font-bold ${getTextColor(index)} mb-6`}
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {course.title}
                        </motion.h3>
                        <motion.p 
                          className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed"
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          {course.description}
                        </motion.p>
                        <motion.div 
                          className="flex items-center justify-between flex-wrap gap-4"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <span className={`px-6 py-3 rounded-full bg-white/10 ${getTextColor(index)} text-base font-semibold border ${getBorderColor(index)}`}>
                            📚 {course.language}
                          </span>
                          <motion.button 
                            className={`px-8 py-3 rounded-full border-2 ${getBorderColor(index)} ${getTextColor(index)} font-semibold hover:bg-${accentColor}-500 hover:text-black transition-all duration-300 transform hover:scale-105`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Enroll Now →
                          </motion.button>
                        </motion.div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 border border-white/20 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 border border-white/20 z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {featuredCourses.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? `w-8 ${getAccentColor(index)}` 
                      : 'w-3 bg-white/30 hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-10 border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {/* Search Bar */}
          <motion.div 
            className="mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.input
              type="search"
              placeholder="🔍 Search courses by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-base rounded-xl border-2 border-sky-400 bg-black/40 text-white outline-none focus:border-yellow-400 focus:shadow-lg focus:shadow-yellow-400/20 transition-all duration-300 placeholder:text-gray-400"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* Language Filter Buttons */}
          <motion.div 
            className="flex gap-4 flex-wrap justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { key: "all", label: "All Courses", color: "sky" },
              { key: "Hindi", label: "Hindi", color: "red" },
              { key: "English", label: "English", color: "yellow" }
            ].map((btn, idx) => (
              <motion.button
                key={btn.key}
                onClick={() => setLanguage(btn.key)}
                className={`px-8 py-3 text-base font-semibold rounded-full border-2 transition-all duration-300 transform ${
                  language === btn.key
                    ? `border-${btn.color}-500 bg-${btn.color}-500/20 text-${btn.color}-400 scale-105 shadow-lg shadow-${btn.color}-500/30`
                    : 'border-white/20 bg-white/5 text-white hover:bg-white/10 hover:scale-105'
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                {btn.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Results Counter */}
          <motion.div 
            className="mt-6 text-center text-sky-300 text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Showing <motion.span 
              className="text-yellow-400 font-bold text-xl"
              key={filteredCourses.length}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {filteredCourses.length}
            </motion.span> course{filteredCourses.length !== 1 ? 's' : ''}
          </motion.div>
        </motion.div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <AnimatePresence>
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className={`bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 cursor-pointer group ${getBorderColor(index)} border-l-4`}
                  variants={cardVariants}
                  layout
                  whileHover={{ 
                    y: -10, 
                    scale: 1.03,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Course Image */}
                  <motion.div 
                    className="relative h-48 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <motion.div 
                      className="absolute bottom-3 left-3 right-3"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getAccentColor(index)} text-black`}>
                        {course.language}
                      </span>
                    </motion.div>
                  </motion.div>

                  {/* Course Content */}
                  <div className="p-6">
                    <motion.h3 
                      className={`text-xl font-bold ${getTextColor(index)} mb-3 leading-tight`}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {course.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {course.description}
                    </motion.p>

                    {/* Instructor Info */}
                    <motion.div 
                      className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10"
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-sm">
                        👨‍🏫
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Instructor</p>
                        <p className="text-white text-sm font-semibold">{course.instructor}</p>
                      </div>
                    </motion.div>
                    
                    <motion.button 
                      className={`w-full px-5 py-3 rounded-xl border-2 ${getBorderColor(index)} ${getTextColor(index)} text-sm font-semibold transition-all duration-300 ${getShadowColor(index)}`}
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      View Course →
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16 bg-white/5 rounded-2xl border-2 border-dashed border-white/10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div 
              className="text-6xl mb-5"
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              🔍
            </motion.div>
            <motion.h3 
              className="text-red-500 text-2xl font-bold mb-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              No Courses Found
            </motion.h3>
            <motion.p 
              className="text-sky-300 text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Try adjusting your search or filters
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Coding;