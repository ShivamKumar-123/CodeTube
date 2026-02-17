import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CyberSecurityCourses } from "../assets/data.js";
import MLCard from "../components/MLCard";

// ── Floating binary/code particles ───────────────────────────────────────────
const CHARS = ["0", "1", ">", "_", "/", "#", "$", "⌘", "✦", "◈"];
function FloatingChar({ char, x, y, delay, duration, size }) {
  return (
    <motion.span
      className="absolute font-mono pointer-events-none select-none"
      style={{ left: `${x}%`, top: `${y}%`, fontSize: size, color: "rgba(239,68,68,0.12)" }}
      animate={{ y: [0, -30, 0], opacity: [0.05, 0.2, 0.05] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {char}
    </motion.span>
  );
}

// ── Scanline component ────────────────────────────────────────────────────────
function Scanline() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none z-10"
      style={{ background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.15), transparent)" }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ── Animated typing text ──────────────────────────────────────────────────────
function TypeWriter({ text, speed = 60, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return (
    <span className={className}>
      {displayed}
      {!done && <span className="animate-pulse text-red-500">▋</span>}
    </span>
  );
}

// ── Category config ───────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",           label: "All Courses",    icon: "◈", color: "#ef4444" },
  { id: "fundamentals",  label: "Fundamentals",   icon: "⬡", color: "#f97316" },
  { id: "networking",    label: "Networking",     icon: "⌬", color: "#eab308" },
  { id: "ethicalhacking",label: "Ethical Hacking",icon: "⌘", color: "#22c55e" },
  { id: "websecurity",   label: "Web Security",   icon: "⬡", color: "#06b6d4" },
  { id: "cloudsecurity", label: "Cloud Security", icon: "◎", color: "#8b5cf6" },
  { id: "cryptography",  label: "Cryptography",   icon: "⬟", color: "#ec4899" },
  { id: "soc",           label: "SOC",            icon: "◉", color: "#f59e0b" },
];

// ── Hex grid background ───────────────────────────────────────────────────────
function HexGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="opacity-[0.03]">
        <defs>
          <pattern id="hex" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
            <polygon
              points="28,4 52,18 52,42 28,56 4,42 4,18"
              fill="none"
              stroke="#ef4444"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>
    </div>
  );
}

// ── Stat counter card ─────────────────────────────────────────────────────────
function StatCard({ value, label, icon, color, delay }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const [fired, setFired] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !fired) { setFired(true); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!fired) return;
    let start = null;
    const dur = 1400;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [fired, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 180 }}
      className="relative rounded-xl p-5 text-center overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${color}30`,
        boxShadow: `0 0 20px ${color}10`,
      }}
    >
      <div className="absolute inset-0 opacity-5"
        style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }} />
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-3xl font-black tabular-nums" style={{ color }}>{n}+</div>
      <div className="text-gray-500 text-xs mt-1 uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
function CyberSecurity() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inputFocused, setInputFocused] = useState(false);

  const floatingChars = Array.from({ length: 28 }, (_, i) => ({
    char: CHARS[i % CHARS.length],
    x: (i * 37) % 100,
    y: (i * 53) % 100,
    delay: (i * 0.4) % 5,
    duration: 4 + (i % 4),
    size: `${10 + (i % 8)}px`,
  }));

  const filteredCourses = CyberSecurityCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" ? true : course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeConfig = CATEGORIES.find((c) => c.id === selectedCategory) ?? CATEGORIES[0];

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #040608 0%, #0a0d0f 40%, #06080a 100%)" }}>

      {/* ── Ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 10, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(234,179,8,0.04) 0%, transparent 70%)" }}
          animate={{ scale: [1.1, 1, 1.1] }} transition={{ duration: 13, repeat: Infinity }} />
        <motion.div className="absolute top-1/2 -left-20 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} />
      </div>

      {/* ── Hex grid + particles ── */}
      <HexGrid />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingChars.map((fc, i) => <FloatingChar key={i} {...fc} />)}
      </div>

      {/* ── Scanline ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Scanline />
      </div>

      {/* ── Corner bracket decorations ── */}
      {[
        { top: 16, left: 16, rot: 0 },
        { top: 16, right: 16, rot: 90 },
        { bottom: 16, left: 16, rot: 270 },
        { bottom: 16, right: 16, rot: 180 },
      ].map((pos, i) => (
        <motion.div key={i} className="absolute pointer-events-none"
          style={{ ...pos, width: 24, height: 24, borderColor: "rgba(239,68,68,0.3)", borderStyle: "solid",
            borderWidth: pos.rot === 0 ? "2px 0 0 2px" : pos.rot === 90 ? "2px 2px 0 0" : pos.rot === 180 ? "0 2px 2px 0" : "0 0 2px 2px" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-28">

        {/* ════════════════════════════════════════════ */}
        {/* HERO                                        */}
        {/* ════════════════════════════════════════════ */}
        <div className="text-center mb-16">

          {/* Terminal tag */}
          <motion.div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.span className="w-2 h-2 rounded-full bg-red-500"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
            <span className="text-red-400 text-xs font-mono tracking-widest uppercase">
              sys.module :: security_training v2.5.1
            </span>
          </motion.div>

          {/* Main title */}
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-3">
              CYBER
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  SECURITY
                </span>
                {/* Glitch underline */}
                <motion.div className="absolute -bottom-1 left-0 h-0.5"
                  style={{ background: "linear-gradient(90deg, #ef4444, #f97316, #eab308)" }}
                  animate={{ scaleX: [0, 1], transformOrigin: "left" }}
                  transition={{ duration: 0.8, delay: 0.5 }} />
              </span>
            </h1>
          </motion.div>

          {/* Subtitle with typewriter */}
          <motion.div className="mt-5 mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <p className="font-mono text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              <span className="text-red-500/60">{">> "}</span>
              <TypeWriter text="Learn ethical hacking, network defense, cloud protection & real-world threat analysis." speed={30} />
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <StatCard value={48} label="Courses"    icon="⬡" color="#ef4444" delay={0.7} />
            <StatCard value={12} label="Categories" icon="◈" color="#f97316" delay={0.8} />
            <StatCard value={94} label="Lessons"    icon="⌬" color="#eab308" delay={0.9} />
            <StatCard value={31} label="Experts"    icon="◉" color="#22c55e" delay={1.0} />
          </motion.div>

          {/* ── SEARCH ── */}
          <motion.div className="max-w-xl mx-auto relative"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>

            {/* Terminal prompt prefix */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
              <span className="text-red-500 font-mono text-sm">{">"}</span>
              <span className="text-gray-600 font-mono text-sm">{"_"}</span>
            </div>

            <motion.input
              type="text"
              placeholder="search --module cybersecurity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              className="w-full pl-12 pr-5 py-4 font-mono text-sm text-gray-200 placeholder-gray-600 rounded-xl outline-none transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: inputFocused ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: inputFocused ? "0 0 20px rgba(239,68,68,0.1), inset 0 0 10px rgba(239,68,68,0.03)" : "none",
              }}
            />

            {/* Scan animation on focus */}
            <AnimatePresence>
              {inputFocused && (
                <motion.div className="absolute bottom-0 left-4 right-4 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #ef4444, transparent)" }}
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
                  transition={{ duration: 0.3 }} />
              )}
            </AnimatePresence>

            {/* Live count */}
            {searchQuery && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-0 font-mono text-xs text-gray-600">
                <span className="text-red-500/70">{">> "}</span>
                found <span className="text-red-400 font-bold">{filteredCourses.length}</span> result{filteredCourses.length !== 1 ? "s" : ""}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════ */}
        {/* CATEGORY FILTERS                            */}
        {/* ════════════════════════════════════════════ */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>

          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
            <span className="font-mono text-xs text-gray-600 tracking-widest uppercase">// filter by module</span>
            <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>

          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat, i) => {
              const active = selectedCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.06 }}
                  className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-mono transition-all duration-200 overflow-hidden"
                  style={{
                    background: active ? `${cat.color}18` : "rgba(255,255,255,0.03)",
                    border: active ? `1px solid ${cat.color}50` : "1px solid rgba(255,255,255,0.06)",
                    color: active ? cat.color : "#6b7280",
                    boxShadow: active ? `0 0 14px ${cat.color}15` : "none",
                  }}
                >
                  {/* Active glow fill */}
                  {active && (
                    <motion.div className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at center, ${cat.color}10, transparent 70%)` }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                  )}
                  <span className="relative">{cat.icon}</span>
                  <span className="relative">{cat.label}</span>

                  {/* Active dot */}
                  {active && (
                    <motion.span className="w-1.5 h-1.5 rounded-full relative"
                      style={{ background: cat.color }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }} />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Active category info bar */}
          <AnimatePresence mode="wait">
            <motion.div key={selectedCategory}
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
                style={{ background: `${activeConfig.color}08`, border: `1px solid ${activeConfig.color}18` }}>
                <span className="font-mono text-xs" style={{ color: activeConfig.color }}>
                  {activeConfig.icon} module.load("{activeConfig.id}") →
                </span>
                <span className="font-mono text-xs text-gray-500">
                  {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} available
                </span>
                <div className="ml-auto h-1 w-20 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: activeConfig.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((filteredCourses.length / (CyberSecurityCourses?.length || 1)) * 100, 100)}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ════════════════════════════════════════════ */}
        {/* COURSE GRID                                 */}
        {/* ════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {filteredCourses.length > 0 ? (
            <motion.div
              key={selectedCategory + searchQuery}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 160, damping: 18 }}
                >
                  <MLCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} className="col-span-full text-center py-28">
              {/* Glitch box */}
              <div className="inline-block relative mb-8">
                <motion.div className="text-7xl font-black font-mono"
                  style={{ color: "rgba(239,68,68,0.15)" }}
                  animate={{ x: [0, -3, 3, -1, 0] }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}>
                  404
                </motion.div>
                <motion.div className="absolute inset-0 text-7xl font-black font-mono text-red-500/10"
                  animate={{ x: [0, 3, -3, 1, 0], opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2, delay: 0.05 }}>
                  404
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-400 font-mono mb-2">
                <span className="text-red-500">{"> "}</span>module not found
              </h3>
              <p className="text-gray-600 font-mono text-sm mb-6">
                No courses match your query. Try adjusting filters.
              </p>
              <motion.button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-xl font-mono text-sm text-red-400 transition-all"
                style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.06)" }}>
                {">> "} reset --all
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom terminal footer ── */}
        <motion.div className="mt-20 pt-8 border-t border-white/5 text-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <p className="font-mono text-xs text-gray-700">
            <span className="text-red-500/50">{"// "}</span>
            sys.status — {CyberSecurityCourses?.length ?? 0} modules loaded · security_db v2.5.1 · encrypted
            <span className="text-red-500/50">{" //"}</span>
          </p>
        </motion.div>

      </div>
    </div>
  );
}

export default CyberSecurity;