import React from "react";
import { Carousel } from "antd";
import { motion } from "framer-motion";
import { Play, Youtube } from "lucide-react";

const slides = [
  {
    title: "Curated YouTube Lectures",
    desc: "We collect the best educational content from YouTube and organize it for structured learning.",
    img: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
  },
  {
    title: "Structured Learning Paths",
    desc: "Stop searching randomly. Follow clear roadmaps for Coding, ML, AI and DSA.",
    img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
  },
  {
    title: "Quality Education. Zero Distraction.",
    desc: "Access high-quality lectures in one organized platform — built for serious learners.",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
  },
];

function Hero() {
  return (
    <Carousel autoplay effect="fade" autoplaySpeed={5000}>
      {slides.map((slide, index) => (
        <div key={index}>
          <div
            className="h-[600px] flex items-center justify-center text-white relative overflow-hidden"
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Content */}
            <motion.div
              className="relative z-10 px-6 max-w-4xl text-left md:ml-20"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600/40 rounded-full mb-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Youtube size={16} className="text-red-500" />
                <span className="text-sm font-medium text-red-400">
                  Powered by YouTube
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="block">
                  {slide.title.split(" ").slice(0, -2).join(" ")}
                </span>
                <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                  {slide.title.split(" ").slice(-2).join(" ")}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {slide.desc}
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex gap-4 flex-wrap"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-lg font-semibold text-lg shadow-xl shadow-red-600/40 hover:shadow-red-600/60 transition-all duration-200 flex items-center gap-2"
                >
                  <Play size={20} fill="white" />
                  Start Learning
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
                >
                  Browse Categories
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex gap-8 mt-12 flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                    200+
                  </span>
                  <p className="text-sm text-gray-400">Curated Lectures</p>
                </div>

                <div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                    10+
                  </span>
                  <p className="text-sm text-gray-400">Learning Categories</p>
                </div>

                <div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                    100% Free
                  </span>
                  <p className="text-sm text-gray-400">Open Access</p>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default Hero;
