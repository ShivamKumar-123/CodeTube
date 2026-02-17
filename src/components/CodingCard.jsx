import React from 'react';
import { motion } from "framer-motion";
import { Play, Globe, Languages } from "lucide-react";

function CodingCard({ course, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-white border border-zinc-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      {/* Image with Play Button Overlay */}
      <div className="relative overflow-hidden p-4">
        <motion.img
          src={`${course.image}?auto=compress&cs=tinysrgb&w=800`}
          alt={`${course.title} - Learn coding tutorial`}
          className="w-full h-48 object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width="800"
          height="450"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-4 rounded-xl bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Play Button Overlay */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl">
            <Play size={28} fill="white" className="text-white ml-1" />
          </div>
        </motion.div>

        {/* Language Badges */}
        <div className="absolute top-7 left-7 flex gap-2">
          {course.videos.hindi.youtubeId && (
            <span className="bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <Languages size={12} />
              Hindi
            </span>
          )}
          {course.videos.english.youtubeId && (
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <Globe size={12} />
              English
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-2">
        {/* Title */}
        <h3 className="text-base font-medium text-slate-900 line-clamp-2 mb-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-700 leading-relaxed line-clamp-3 mb-4">
          {course.description}
        </p>

        {/* Language Buttons */}
        <div className="flex gap-3 pt-4 border-t border-zinc-200">
          {course.videos.hindi.youtubeId && (
            <motion.a
              href={`https://www.youtube.com/watch?v=${course.videos.hindi.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Languages size={16} />
              Hindi
            </motion.a>
          )}

          {course.videos.english.youtubeId && (
            <motion.a
              href={`https://www.youtube.com/watch?v=${course.videos.english.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Globe size={16} />
              English
            </motion.a>
          )}
        </div>

        {/* If only one language, show primary CTA */}
        {(course.videos.hindi.youtubeId && !course.videos.english.youtubeId) || 
         (!course.videos.hindi.youtubeId && course.videos.english.youtubeId) ? null : null}
      </div>
    </motion.div>
  );
}

export default CodingCard;