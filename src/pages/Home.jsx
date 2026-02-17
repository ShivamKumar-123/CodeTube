import React, { useContext } from "react";
import DataContext from "../context/dataContext";
import Hero from "../components/Hero/Hero";
import AboutSection from "../components/AboutSection";
import CourseCard from "../components/Card/CourseCard";
import Wave from "../components/Wave";
import Testimonial from "../components/Testimonial";
import MissionSection from "../components/MissionSection";
import RoadmapSection from "../components/RoadmapSection";
import CategoriesSection from "../components/CategoriesSection";
import StatsSection from "../components/StatsSection";
import TeamSection from "../components/TeamSection";
import { motion, AnimatePresence } from "framer-motion";

// Loading Component
const LoadingAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <motion.div
          className="mb-8"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            {/* Outer Ring */}
            <motion.div
              className="w-24 h-24 mx-auto border-4 border-transparent border-t-red-500 border-r-yellow-400 border-b-sky-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Inner Ring */}
            <motion.div
              className="absolute inset-0 w-24 h-24 mx-auto border-4 border-transparent border-t-sky-400 border-r-red-500 border-b-yellow-400 rounded-full"
              animate={{ rotate: -360 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Center Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-4xl">💻</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-500 via-yellow-400 to-sky-400 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          Loading Courses
        </motion.h2>

        {/* Animated Dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full"
              style={{
                background:
                  index === 0
                    ? "#EF4444"
                    : index === 1
                    ? "#FACC15"
                    : "#38BDF8",
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div className="w-64 h-1 bg-white/10 rounded-full mt-8 mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-sky-400"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-gray-400 mt-4 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Preparing an amazing learning experience...
        </motion.p>
      </div>
    </motion.div>
  );
};

// Error Component
const ErrorAnimation = ({ error }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6"
    >
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <motion.div
          className="text-8xl mb-6"
          animate={{
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          ⚠️
        </motion.div>

        {/* Error Title */}
        <motion.h2
          className="text-3xl font-bold text-red-500 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Oops! Something went wrong
        </motion.h2>

        {/* Error Message */}
        <motion.p
          className="text-gray-400 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {error}
        </motion.p>

        {/* Retry Button */}
        <motion.button
          className="px-8 py-3 bg-gradient-to-r from-red-500 via-yellow-400 to-sky-400 text-white font-bold rounded-full hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Retry
        </motion.button>
      </div>
    </motion.div>
  );
};

function Home() {
  const { data, loading, error } = useContext(DataContext);

  // Show loading animation
  if (loading) {
    return (
      <AnimatePresence mode="wait">
        <LoadingAnimation />
      </AnimatePresence>
    );
  }

  // Show error animation
  if (error) {
    return <ErrorAnimation error={error} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <Hero />
      </motion.div>

      {/* Wave Separator */}
      <Wave flip />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <MissionSection />
      </motion.div>

      {/* Wave Separator */}
      <Wave />

      {/* About */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <AboutSection />
      </motion.div>

      {/* Wave Separator */}
      <Wave flip />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <CategoriesSection />
      </motion.div>

      {/* Inverted Wave */}
      <Wave flip />

      {/* Featured Section */}
      <motion.section
        className="max-w-7xl mx-auto px-6 py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-10"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured{" "}
            <motion.span
              className="bg-gradient-to-r from-red-500 via-yellow-400 to-sky-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Courses
            </motion.span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {data.map((video, index) => (
            <CourseCard key={video.id} video={video} index={index} />
          ))}
        </motion.div>
      </motion.section>

      {/* Wave Separator */}
      <Wave flip />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <StatsSection />
      </motion.div>

      {/* Wave Separator */}
      <Wave />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Testimonial />
      </motion.div>

      <Wave flip />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <RoadmapSection />
      </motion.div>

      {/* Wave Separator */}
      <Wave />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <TeamSection />
      </motion.div>

      <Wave />
    </motion.div>
  );
}

export default Home;