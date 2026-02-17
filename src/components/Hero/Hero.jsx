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
    <div className="w-full overflow-hidden">
      <Carousel autoplay effect="fade" autoplaySpeed={5000}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              className="min-h-[600px] flex items-center text-white relative overflow-hidden"
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

              {/* Content */}
              <motion.div
                className="relative z-10 px-6 max-w-6xl mx-auto"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600/40 rounded-full mb-6 backdrop-blur-sm">
                    <Youtube size={16} className="text-red-500" />
                    <span className="text-sm font-medium text-red-400">
                      Powered by YouTube
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    <span className="block">
                      {slide.title.split(" ").slice(0, -2).join(" ")}
                    </span>
                    <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                      {slide.title.split(" ").slice(-2).join(" ")}
                    </span>
                  </h1>

                  <p className="text-lg md:text-xl mb-8 text-gray-300">
                    {slide.desc}
                  </p>

                  <div className="flex gap-4 flex-wrap">
                    <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-lg font-semibold shadow-xl hover:scale-105 transition">
                      <Play size={20} className="inline mr-2" />
                      Start Learning
                    </button>

                    <button className="px-8 py-4 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition">
                      Browse Categories
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Hero;
