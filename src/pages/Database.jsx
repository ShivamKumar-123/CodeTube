import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DatabaseCourses } from "../assets/data.js";
import MLCard from "../components/MLCard";

// ── Category config ───────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",         label: "All",          icon: "⬡", color: "#22d3ee" },
  { id: "sql",         label: "SQL",          icon: "⊞", color: "#38bdf8" },
  { id: "optimization",label: "Optimization", icon: "⚡", color: "#34d399" },
  { id: "mysql",       label: "MySQL",        icon: "◈", color: "#fb923c" },
  { id: "postgresql",  label: "PostgreSQL",   icon: "◎", color: "#818cf8" },
  { id: "nosql",       label: "NoSQL",        icon: "⬟", color: "#f472b6" },
  { id: "mongodb",     label: "MongoDB",      icon: "◉", color: "#4ade80" },
  { id: "mongoose",    label: "Mongoose",     icon: "⌬", color: "#a78bfa" },
  { id: "redis",       label: "Redis",        icon: "◆", color: "#fb7185" },
  { id: "cassandra",   label: "Cassandra",    icon: "⊕", color: "#fbbf24" },
  { id: "graphdb",     label: "GraphDB",      icon: "⬣", color: "#2dd4bf" },
  { id: "comparison",  label: "Comparison",   icon: "⇌", color: "#c084fc" },
  { id: "scaling",     label: "Scaling",      icon: "⤢", color: "#f97316" },
];

// ── Animated SQL query lines floating in background ───────────────────────────
const SQL_SNIPPETS = [
  "SELECT * FROM courses", "JOIN users ON id", "WHERE status = 'active'",
  "CREATE INDEX ON", "GROUP BY category", "INSERT INTO", "UPDATE SET",
  "DELETE WHERE", "EXPLAIN ANALYZE", "ALTER TABLE", "INNER JOIN",
  "COUNT(*) AS total", "ORDER BY created_at", "LIMIT 10 OFFSET",
];

function FloatingSql({ text, x, y, delay, duration }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none font-mono whitespace-nowrap"
      style={{ left: `${x}%`, top: `${y}%`, fontSize: 10, color: "rgba(34,211,238,0.07)" }}
      animate={{ y: [0, -18, 0], opacity: [0.03, 0.12, 0.03] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {text}
    </motion.div>
  );
}

// ── Animated data-flow dots (vertical streams) ───────────────────────────────
function DataStream({ x, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: "-4px", width: 1, height: 60,
        background: "linear-gradient(to bottom, transparent, rgba(34,211,238,0.2), transparent)" }}
      animate={{ top: ["-5%", "110%"] }}
      transition={{ duration: 4 + delay, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ── Grid dot pattern ──────────────────────────────────────────────────────────
function DotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.025 }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#22d3ee" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}

// ── Schema node decoration ────────────────────────────────────────────────────
function SchemaNodes() {
  const nodes = [
    { x: "4%",  y: "15%", label: "users",    color: "#38bdf8" },
    { x: "91%", y: "20%", label: "schemas",  color: "#4ade80" },
    { x: "5%",  y: "72%", label: "indexes",  color: "#f472b6" },
    { x: "90%", y: "75%", label: "queries",  color: "#818cf8" },
  ];
  return (
    <>
      {nodes.map((n, i) => (
        <motion.div key={i} className="absolute pointer-events-none hidden lg:block"
          style={{ left: n.x, top: n.y }}
          animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.08, 1] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}>
          <div className="rounded-lg px-2 py-1 font-mono text-xs"
            style={{ background: `${n.color}12`, border: `1px solid ${n.color}30`, color: `${n.color}60` }}>
            {`{${n.label}}`}
          </div>
        </motion.div>
      ))}
    </>
  );
}

// ── Animated counter ──────────────────────────────────────────────────────────
function StatCard({ value, label, icon, color, delay }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const [fired, setFired] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFired(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!fired) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1300, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [fired, value]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 180 }}
      className="relative rounded-xl p-5 text-center overflow-hidden"
      style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}25` }}>
      <div className="absolute inset-0 opacity-5"
        style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }} />
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-3xl font-black tabular-nums" style={{ color }}>{n}+</div>
      <div className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-mono">{label}</div>
    </motion.div>
  );
}

// ── Typewriter ────────────────────────────────────────────────────────────────
function TypeWriter({ text, speed = 35, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
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
      {!done && <span className="animate-pulse" style={{ color: "#22d3ee" }}>▋</span>}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
function Database() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inputFocused, setInputFocused] = useState(false);

  const floatingSql = Array.from({ length: 18 }, (_, i) => ({
    text: SQL_SNIPPETS[i % SQL_SNIPPETS.length],
    x: (i * 23) % 90,
    y: (i * 37) % 90,
    delay: (i * 0.5) % 6,
    duration: 5 + (i % 5),
  }));

  const streams = Array.from({ length: 10 }, (_, i) => ({
    x: 5 + i * 10,
    delay: i * 0.4,
  }));

  const filteredCourses = DatabaseCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" ? true : course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeConfig = CATEGORIES.find((c) => c.id === selectedCategory) ?? CATEGORIES[0];

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #020b12 0%, #040d14 50%, #030a10 100%)" }}>

      {/* ── Ambient orbs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute -top-60 left-1/3 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 11, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 65%)" }}
          animate={{ scale: [1.08, 1, 1.08] }} transition={{ duration: 9, repeat: Infinity }} />
        <motion.div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(129,140,248,0.04) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 13, repeat: Infinity }} />
      </div>

      {/* ── Dot grid ── */}
      <DotGrid />

      {/* ── Floating SQL ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingSql.map((s, i) => <FloatingSql key={i} {...s} />)}
      </div>

      {/* ── Data streams ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {streams.map((s, i) => <DataStream key={i} {...s} />)}
      </div>

      {/* ── Schema node decorations ── */}
      <SchemaNodes />

      {/* ── Decorative table lines (top left) ── */}
      <div className="absolute top-20 left-8 pointer-events-none hidden xl:block opacity-10">
        {[0,1,2,3].map(i => (
          <motion.div key={i} className="h-px mb-3 rounded-full"
            style={{ width: 60 + i * 20, background: "#22d3ee" }}
            animate={{ scaleX: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-28">

        {/* ════════════════════════════════════════════════ */}
        {/* HERO                                            */}
        {/* ════════════════════════════════════════════════ */}
        <div className="text-center mb-16">

          {/* Status badge */}
          <motion.div className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full"
            style={{ background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.18)" }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22d3ee" }}
              animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "#22d3ee99" }}>
              db.connect() → status: online · v4.2.0
            </span>
          </motion.div>

          {/* Title */}
          <motion.div initial={{ opacity: 0, y: -28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight">
              DATA
              <span className="relative mx-3 inline-block">
                <span style={{
                  background: "linear-gradient(135deg, #22d3ee 0%, #38bdf8 40%, #818cf8 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>
                  BASE
                </span>
                {/* Underline pulse */}
                <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)" }}
                  animate={{ opacity: [0.6, 1, 0.6], scaleX: [0.9, 1, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity }} />
              </span>
              <br className="md:hidden" />
              <span className="text-white/20 text-3xl md:text-5xl align-middle font-mono">COURSES</span>
            </h1>
          </motion.div>

          {/* SQL subtitle */}
          <motion.div className="mt-6 mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div className="inline-block text-left px-4 py-3 rounded-xl font-mono text-sm"
              style={{ background: "rgba(34,211,238,0.04)", border: "1px solid rgba(34,211,238,0.1)" }}>
              <span className="text-gray-600">{"-- "}</span>
              <span className="text-sky-400/60">SELECT</span>
              <span className="text-white/40"> * </span>
              <span className="text-sky-400/60">FROM</span>
              <span className="text-cyan-300/60"> knowledge </span>
              <span className="text-sky-400/60">WHERE</span>
              <span className="text-white/40"> topic </span>
              <span className="text-yellow-400/60">IN</span>
              <span className="text-white/40"> (</span>
              <span className="text-green-400/60">'SQL'</span>
              <span className="text-white/40">, </span>
              <span className="text-green-400/60">'NoSQL'</span>
              <span className="text-white/40">, </span>
              <span className="text-green-400/60">'Redis'</span>
              <span className="text-white/40">)</span>
            </div>
            <p className="text-gray-500 text-sm mt-4 max-w-xl mx-auto font-mono">
              <TypeWriter text="Master SQL, NoSQL, MongoDB, PostgreSQL, Redis and database scaling." />
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
            <StatCard value={60}  label="Courses"    icon="⬡" color="#22d3ee" delay={0.65} />
            <StatCard value={13}  label="Categories" icon="◈" color="#38bdf8" delay={0.75} />
            <StatCard value={120} label="Lessons"    icon="⊞" color="#818cf8" delay={0.85} />
            <StatCard value={8}   label="DB Engines" icon="◎" color="#4ade80" delay={0.95} />
          </motion.div>

          {/* ── SEARCH ── */}
          <motion.div className="max-w-xl mx-auto relative"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
            {/* SQL prompt */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
              <span className="font-mono text-xs" style={{ color: "#22d3ee60" }}>db</span>
              <span className="font-mono text-xs text-white/20">{">"}</span>
            </div>
            <input
              type="text"
              placeholder='SELECT * FROM courses WHERE title LIKE "%..."'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              className="w-full pl-12 pr-5 py-4 font-mono text-xs text-gray-300 placeholder-gray-700 rounded-xl outline-none transition-all duration-300"
              style={{
                background: "rgba(34,211,238,0.03)",
                border: inputFocused ? "1px solid rgba(34,211,238,0.4)" : "1px solid rgba(255,255,255,0.06)",
                boxShadow: inputFocused ? "0 0 24px rgba(34,211,238,0.08), inset 0 0 12px rgba(34,211,238,0.03)" : "none",
              }}
            />
            {/* focus underline sweep */}
            <AnimatePresence>
              {inputFocused && (
                <motion.div className="absolute bottom-0 left-6 right-6 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #22d3ee, transparent)" }}
                  initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }} transition={{ duration: 0.3 }} />
              )}
            </AnimatePresence>

            {searchQuery && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute -bottom-8 left-0 font-mono text-xs text-gray-600">
                <span style={{ color: "#22d3ee60" }}>{"→ "}</span>
                <span className="text-cyan-400 font-bold">{filteredCourses.length}</span>
                {" "}row{filteredCourses.length !== 1 ? "s" : ""} returned
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════ */}
        {/* CATEGORY FILTER                                 */}
        {/* ════════════════════════════════════════════════ */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px flex-1" style={{ background: "rgba(34,211,238,0.08)" }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "rgba(34,211,238,0.3)" }}>
              {"-- filter by engine / topic"}
            </span>
            <div className="h-px flex-1" style={{ background: "rgba(34,211,238,0.08)" }} />
          </div>

          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat, i) => {
              const active = selectedCategory === cat.id;
              return (
                <motion.button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                  whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 + i * 0.05 }}
                  className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 overflow-hidden"
                  style={{
                    background: active ? `${cat.color}14` : "rgba(255,255,255,0.025)",
                    border: active ? `1px solid ${cat.color}45` : "1px solid rgba(255,255,255,0.055)",
                    color: active ? cat.color : "#4b5563",
                    boxShadow: active ? `0 0 16px ${cat.color}12` : "none",
                  }}>
                  {active && (
                    <motion.div className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at center, ${cat.color}0d, transparent 70%)` }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
                  )}
                  <span className="relative">{cat.icon}</span>
                  <span className="relative">{cat.label}</span>
                  {active && (
                    <motion.span className="w-1.5 h-1.5 rounded-full relative"
                      style={{ background: cat.color }}
                      animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Active category status bar */}
          <AnimatePresence mode="wait">
            <motion.div key={selectedCategory}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 14 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
                style={{ background: `${activeConfig.color}07`, border: `1px solid ${activeConfig.color}15` }}>
                <span className="font-mono text-xs" style={{ color: activeConfig.color + "90" }}>
                  {activeConfig.icon} db.collection("<span style={{color: activeConfig.color}}>{activeConfig.id}</span>").find()
                </span>
                <span className="font-mono text-xs text-gray-600 ml-auto">
                  {filteredCourses.length} document{filteredCourses.length !== 1 ? "s" : ""}
                </span>
                <div className="h-1 w-24 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: activeConfig.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((filteredCourses.length / Math.max(DatabaseCourses?.length || 1, 1)) * 100, 100)}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ════════════════════════════════════════════════ */}
        {/* COURSE GRID                                     */}
        {/* ════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {filteredCourses.length > 0 ? (
            <motion.div key={selectedCategory + searchQuery}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}>
              {filteredCourses.map((course, i) => (
                <motion.div key={course.id}
                  initial={{ opacity: 0, y: 22, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ delay: i * 0.055, type: "spring", stiffness: 165, damping: 18 }}>
                  <MLCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} className="text-center py-28">
              <motion.div className="font-mono text-6xl font-black mb-6 relative inline-block"
                style={{ color: "rgba(34,211,238,0.1)" }}
                animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                NULL
              </motion.div>
              <h3 className="text-lg font-bold font-mono mb-2" style={{ color: "#22d3ee60" }}>
                db.error: no_documents_found
              </h3>
              <p className="text-gray-600 font-mono text-sm mb-8">
                Query returned 0 rows. Adjust your WHERE clause.
              </p>
              <motion.button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-xl font-mono text-sm transition-all"
                style={{ border: "1px solid rgba(34,211,238,0.25)", background: "rgba(34,211,238,0.05)", color: "#22d3ee" }}>
                db.reset() → SHOW ALL
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer line ── */}
        <motion.div className="mt-20 pt-8 text-center"
          style={{ borderTop: "1px solid rgba(34,211,238,0.06)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.1)" }}>
            <span style={{ color: "rgba(34,211,238,0.3)" }}>{"/* "}</span>
            {DatabaseCourses?.length ?? 0} records · query_time: 0.003ms · db.version: 4.2.0
            <span style={{ color: "rgba(34,211,238,0.3)" }}>{" */"}</span>
          </p>
        </motion.div>

      </div>
    </div>
  );
}

export default Database;