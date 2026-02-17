import React from "react";
import { motion } from "framer-motion";
import { Play, Globe, ArrowRight, User } from "lucide-react";

const accentMap = [
  {
    border: "border-red-500",
    text: "text-red-400",
    bg: "from-red-500/20 to-transparent",
    badge: "from-red-600 to-red-400",
    btn: "from-red-500 to-red-600",
    glow: "shadow-red-500/30",
    tooltip: "bg-red-500/20 border-red-500/40 text-red-300",
    spotlight: "rgba(239,68,68,0.08)",
  },
  {
    border: "border-yellow-400",
    text: "text-yellow-400",
    bg: "from-yellow-400/20 to-transparent",
    badge: "from-yellow-500 to-yellow-300",
    btn: "from-yellow-400 to-yellow-500",
    glow: "shadow-yellow-400/30",
    tooltip: "bg-yellow-400/20 border-yellow-400/40 text-yellow-300",
    spotlight: "rgba(250,204,21,0.08)",
  },
  {
    border: "border-sky-400",
    text: "text-sky-400",
    bg: "from-sky-400/20 to-transparent",
    badge: "from-sky-500 to-sky-300",
    btn: "from-sky-400 to-sky-500",
    glow: "shadow-sky-400/30",
    tooltip: "bg-sky-400/20 border-sky-400/40 text-sky-300",
    spotlight: "rgba(56,189,248,0.08)",
  },
];

const MLCard = ({ course, index = 0 }) => {
  const accent = accentMap[index % 3];

  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  const [spotlightPos, setSpotlightPos] = React.useState({ x: 0, y: 0 });
  const divRef = React.useRef(null);

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    setPosition({ x, y });
    setSpotlightPos({ x, y });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.08 }}
      whileHover={{ y: -10, transition: { type: "spring", stiffness: 300 } }}
      className={`group relative bg-gradient-to-br from-gray-900 to-black border-2 ${accent.border} rounded-2xl shadow-xl hover:shadow-2xl hover:${accent.glow} transition-shadow duration-300 overflow-hidden flex flex-col cursor-pointer`}
    >
      {/* Mouse Spotlight Effect */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(200px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${accent.spotlight}, transparent 80%)`,
          opacity: tooltipVisible ? 1 : 0,
        }}
      />

      {/* Floating Tooltip */}
      <div
        className={`absolute z-30 px-3 py-1.5 text-xs rounded-lg border backdrop-blur-md font-semibold pointer-events-none flex items-center gap-1.5 whitespace-nowrap ${accent.tooltip}`}
        style={{
          top: position.y + 14,
          left: position.x + 14,
          opacity: tooltipVisible ? 1 : 0,
          transform: tooltipVisible ? "scale(1) translateY(0)" : "scale(0.7) translateY(4px)",
          transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <User size={11} />
        {course.instructor}
      </div>

      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={`${course.image}?auto=compress&cs=tinysrgb&w=800`}
          alt={course.title}
          className="w-full h-full object-cover object-center"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Gradient Top Stripe */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent.badge}`} />

        {/* Language Badge */}
        <motion.span
          className={`absolute top-4 left-4 bg-gradient-to-r ${accent.badge} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5`}
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Globe size={11} />
          {course.language}
        </motion.span>

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.a
            href={`https://www.youtube.com/watch?v=${course.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-16 h-16 bg-gradient-to-br ${accent.btn} rounded-full flex items-center justify-center shadow-2xl`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Play size={26} fill="white" className="text-white ml-1" />
          </motion.a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title */}
        <h3 className={`text-lg font-bold ${accent.text} leading-snug line-clamp-2 mb-3`}>
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-5">
          {course.description}
        </p>

        {/* Instructor Row */}
        <div className="flex items-center gap-3 py-4 border-t border-white/10 mb-5">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${accent.bg} border-2 ${accent.border} flex items-center justify-center shrink-0`}>
            <User size={15} className={accent.text} />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{course.instructor}</p>
            <p className="text-gray-500 text-xs">Instructor</p>
          </div>
        </div>

        {/* Footer: Language Tag + Watch Button */}
        <div className="flex items-center justify-between mt-auto gap-3">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${accent.border} ${accent.text} bg-white/5`}>
            {course.language}
          </span>

          <motion.a
            href={`https://www.youtube.com/watch?v=${course.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r ${accent.btn} text-white text-sm font-bold shadow-lg`}
            whileHover={{ scale: 1.05, opacity: 0.95 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={15} />
            </motion.span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default MLCard;