import React from "react";
import { motion } from "framer-motion";
import { Play, Clock, BarChart3, Star, ArrowRight } from "lucide-react";

export default function CourseCard({ video, index = 0 }) {
  const getAccentColor = (idx) => {
    const colors = [
      "from-red-600 to-red-500",
      "from-yellow-500 to-yellow-400", 
      "from-sky-500 to-sky-400"
    ];
    return colors[idx % 3];
  };

  const getBorderColor = (idx) => {
    const colors = ["border-red-500", "border-yellow-400", "border-sky-400"];
    return colors[idx % 3];
  };

  const getTextColor = (idx) => {
    const colors = ["text-red-500", "text-yellow-500", "text-sky-400"];
    return colors[idx % 3];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ 
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={`bg-gradient-to-br from-gray-900 to-black border-2 ${getBorderColor(index)} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer`}
    >
      {/* Image */}
      <motion.div 
        className="relative overflow-hidden p-4"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src={`${video.image}?auto=compress&cs=tinysrgb&w=800`}
          alt={`${video.title} - Learn coding tutorial`}
          loading="lazy"
          className="w-full h-52 object-cover rounded-xl transform transition-transform duration-500"
          width="800"
          height="450"
          whileHover={{ scale: 1.1 }}
        />

        {/* Gradient Overlay */}
        <motion.div 
          className={`absolute inset-4 rounded-xl bg-gradient-to-t from-black/80 via-transparent to-transparent`}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        ></motion.div>

        {/* Language Badge */}
        <motion.span 
          className={`absolute top-7 left-7 bg-gradient-to-r ${getAccentColor(index)} text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg`}
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {video.language}
        </motion.span>

        {/* Level Badge */}
        {video.level && (
          <motion.span 
            className="absolute top-7 right-7 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-medium px-3 py-1.5 rounded-full border border-zinc-200"
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {video.level}
          </motion.span>
        )}

        {/* Play Button Overlay */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div 
            className={`w-16 h-16 bg-gradient-to-r ${getAccentColor(index)} rounded-full flex items-center justify-center shadow-2xl`}
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Play size={28} fill="white" className="text-white ml-1" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="p-6 pt-2">
        {/* Title */}
        <motion.h3 
          className={`text-base font-bold ${getTextColor(index)} line-clamp-2 mb-2`}
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {video.title}
        </motion.h3>

        {/* Course Name */}
        <motion.p 
          className="text-white font-semibold text-sm mb-3"
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {video.name}
        </motion.p>

        {/* Description */}
        <motion.p 
          className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {video.description}
        </motion.p>

        {/* Meta Info */}
        {(video.duration || video.lessons || video.rating) && (
          <motion.div 
            className="flex items-center gap-4 mb-4 text-xs text-gray-300"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {video.duration && (
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1 }}
              >
                <Clock size={14} className={getTextColor(index)} />
                <span>{video.duration}</span>
              </motion.div>
            )}
            {video.lessons && (
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1 }}
              >
                <BarChart3 size={14} className={getTextColor(index)} />
                <span>{video.lessons} Lessons</span>
              </motion.div>
            )}
            {video.rating && (
              <motion.div 
                className="flex items-center gap-1"
                whileHover={{ scale: 1.1 }}
              >
                <Star size={14} fill="currentColor" className="text-yellow-500" />
                <span className="text-gray-300">{video.rating}</span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Instructor */}
        <motion.div 
          className="flex items-center justify-between mb-4 pb-4 border-b border-white/10"
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div>
            <p className="text-white font-medium text-sm">
              {video.instructor}
            </p>
            <p className="text-gray-400 text-xs">Instructor</p>
          </div>
          
          {/* Instructor Avatar */}
          {video.instructorAvatar ? (
            <motion.img 
              src={video.instructorAvatar} 
              alt={video.instructor}
              className={`w-10 h-10 rounded-full border-2 ${getBorderColor(index)}`}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            <motion.div 
              className={`w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-lg border-2 ${getBorderColor(index)}`}
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              👨‍🏫
            </motion.div>
          )}
        </motion.div>

        {/* Button */}
        <motion.a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r ${getAccentColor(index)} text-white text-sm font-bold py-3 rounded-xl transition-all duration-200 group/btn shadow-lg hover:shadow-xl`}
          aria-label={`Watch ${video.title} tutorial`}
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          WATCH NOW
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight size={20} />
          </motion.div>
        </motion.a>
      </div>
    </motion.div>
  );
}