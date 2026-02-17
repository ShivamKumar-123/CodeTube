import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  ChevronDown,
  ArrowRight,
  Layers,
} from "lucide-react";

// ── Same data as Footer ───────────────────────────────────────────────────────
const quickLinks = [
  { name: "Home",    path: "/"        },
  { name: "Coding",  path: "/coding"  },
  { name: "ML",      path: "/ml"      },
  { name: "AI",      path: "/ai"      },
  { name: "DSA",     path: "/dsa"     },
  { name: "Contact", path: "/contact" },
];

const categories = [
  { label: "Web Development", to: "/web",      emoji: "🌐" },
  { label: "App Development", to: "/app",      emoji: "📱" },
  { label: "System Design",   to: "/sys",      emoji: "⚙️" },
  { label: "Deep Learning",   to: "/deep",     emoji: "🧠" },
  { label: "Cyber Security",  to: "/cyber",    emoji: "🛡️" },
  { label: "Database",        to: "/database", emoji: "🗄️" },
  { label: "Git / GitHub",    to: "/git",      emoji: "🔀" },
  { label: "Career Roadmap",  to: "/road",     emoji: "🗺️" },
];

const socials = [
  { Icon: Youtube,   href: "https://youtube.com",  color: "hover:text-red-500",  label: "YouTube"   },
  { Icon: Facebook,  href: "https://facebook.com", color: "hover:text-blue-400", label: "Facebook"  },
  { Icon: Instagram, href: "https://instagram.com",color: "hover:text-pink-400", label: "Instagram" },
  { Icon: Twitter,   href: "https://twitter.com",  color: "hover:text-sky-400",  label: "Twitter"   },
];

// ── Logo (exact same as Footer) ───────────────────────────────────────────────
function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-3 group">
      <motion.div
        className="w-10 h-10 bg-gradient-to-br from-red-600 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6 }}
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
          <path d="M8 6.5L14 12L8 17.5V6.5Z" />
        </svg>
      </motion.div>
      <span className="text-white text-xl font-extrabold tracking-tight leading-none">
        Code
        <span className="bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
          Tube
        </span>
      </span>
    </NavLink>
  );
}

// ── Categories mega-dropdown ──────────────────────────────────────────────────
function CategoriesDropdown({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      exit ={{ opacity: 0, y: 8,  scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl overflow-hidden z-50"
      style={{
        background: "rgba(10,10,10,0.97)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(239,68,68,0.1)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Top gradient line — matches footer */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      <div className="p-3">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 mb-1">
          <Layers size={13} className="text-yellow-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Categories
          </span>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 gap-0.5">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1,  x:  0 }}
              transition={{ delay: i * 0.04 }}
            >
              <NavLink
                to={cat.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-red-600/20 to-yellow-500/10 text-white border border-red-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <span className="text-base leading-none">{cat.emoji}</span>
                <span className="flex-1 font-medium">{cat.label}</span>
                <ArrowRight
                  size={13}
                  className="opacity-0 group-hover:opacity-100 text-yellow-400 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
                />
              </NavLink>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom gradient line — matches footer */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
    </motion.div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
function Navbar() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [catOpen,      setCatOpen]      = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileCatOpen,setMobileCatOpen]= useState(false);
  const catRef = useRef(null);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed w-full z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(0,0,0,0.97)"
          : "rgba(0,0,0,0.92)",
        borderBottom: "1px solid rgba(153,27,27,0.2)", // matches footer border-red-900/30
        boxShadow: scrolled
          ? "0 4px 30px rgba(239,68,68,0.08)"
          : "none",
        backdropFilter: "blur(14px)",
      }}
    >
      {/* Top gradient line — same as footer */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Logo />

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex items-center gap-1">
          {quickLinks.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-red-500 to-yellow-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* Categories dropdown trigger */}
          <div className="relative" ref={catRef}>
            <motion.button
              onClick={() => setCatOpen((p) => !p)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/5"
              style={catOpen ? { color: "#facc15" } : {}}
            >
              Categories
              <motion.div animate={{ rotate: catOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown size={14} />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {catOpen && <CategoriesDropdown onClose={() => setCatOpen(false)} />}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Right side: socials + CTA ── */}
        <div className="hidden md:flex items-center gap-4">
          {/* Social icons — same as footer */}
          <div className="flex items-center gap-1">
            {socials.map(({ Icon, href, color, label }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 ${color} hover:bg-white/5 transition-all duration-200`}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10" />

          {/* CTA — same gradient as footer button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-shadow duration-300"
          >
            Get Started
          </motion.button>
        </div>

        {/* ── Mobile hamburger ── */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => setMobileOpen((p) => !p)}
          className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.path key="x"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12" />
              ) : (
                <motion.path key="menu"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              )}
            </AnimatePresence>
          </svg>
        </motion.button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(9,9,9,0.98)",
              borderTop: "1px solid rgba(153,27,27,0.2)",
            }}
          >
            <div className="px-4 py-4 space-y-1">

              {/* Quick links */}
              {quickLinks.map((item, i) => (
                <motion.div key={i}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0,   opacity: 1 }}
                  transition={{ delay: i * 0.05 }}>
                  <NavLink
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-red-600/20 to-yellow-500/10 text-white border border-red-500/25"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="w-1 h-4 bg-gradient-to-b from-red-500 to-yellow-400 rounded-full" />
                        )}
                        {item.name}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}

              {/* Categories accordion */}
              <motion.div initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ delay: quickLinks.length * 0.05 }}>
                <button
                  onClick={() => setMobileCatOpen((p) => !p)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Layers size={14} className="text-yellow-400" />
                    Categories
                  </div>
                  <motion.div animate={{ rotate: mobileCatOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {mobileCatOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 mt-1 space-y-0.5 pl-3"
                        style={{ borderLeft: "1px solid rgba(239,68,68,0.2)" }}>
                        {categories.map((cat, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}>
                            <NavLink
                              to={cat.to}
                              onClick={() => { setMobileOpen(false); setMobileCatOpen(false); }}
                              className={({ isActive }) =>
                                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                                  isActive
                                    ? "text-yellow-400 bg-yellow-400/8"
                                    : "text-gray-500 hover:text-white hover:bg-white/5"
                                }`
                              }
                            >
                              <span className="text-sm">{cat.emoji}</span>
                              <span>{cat.label}</span>
                            </NavLink>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Social icons row */}
              <motion.div className="pt-3 pb-1 px-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mb-4" />
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    {socials.map(({ Icon, href, color, label }, i) => (
                      <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                        aria-label={label}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/8 text-gray-500 ${color} transition-all duration-200`}
                        whileHover={{ scale: 1.12, y: -2 }}
                        whileTap={{ scale: 0.9 }}>
                        <Icon size={16} />
                      </motion.a>
                    ))}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-red-500/25">
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;