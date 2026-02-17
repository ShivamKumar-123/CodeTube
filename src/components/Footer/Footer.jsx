import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  ArrowRight,
  Heart,
  Send,
} from "lucide-react";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const quickLinks = [
  { label: "Home",    to: "/"            },
  { label: "Coding",  to: "/coding"      },
  { label: "ML",      to: "/ml"  },
  { label: "AI",      to: "/ai"  },
  { label: "DSA",     to: "/dsa" },
  { label: "Contact", to: "/contact"     },
];

const categories = [
  { label: "Web Development", to: "/web" },
  { label: "App Development",          to: "/app"          },
  { label: "System Design",           to: "/sys" },
  { label: "Deep Learning",   to: "/deep"      },
  { label: "Cyber Security",   to: "/cyber"      },
  { label: "database",   to: "/database"      },
  { label: "Git/Github",   to: "/git"      },
  { label: "Career Roadmap",  to: "/road"                },
];

const socials = [
  {
    Icon:  Youtube,
    label: "YouTube",
    href:  "https://youtube.com",
    color: "hover:from-red-600 hover:to-red-500",
    ring:  "hover:shadow-red-500/40",
  },
  {
    Icon:  Facebook,
    label: "Facebook",
    href:  "https://facebook.com",
    color: "hover:from-blue-700 hover:to-blue-500",
    ring:  "hover:shadow-blue-500/40",
  },
  {
    Icon:  Instagram,
    label: "Instagram",
    href:  "https://instagram.com",
    color: "hover:from-pink-600 hover:to-yellow-500",
    ring:  "hover:shadow-pink-500/40",
  },
  {
    Icon:  Twitter,
    label: "Twitter",
    href:  "https://twitter.com",
    color: "hover:from-sky-500 hover:to-sky-400",
    ring:  "hover:shadow-sky-500/40",
  },
];

function Footer() {
  const [email, setEmail]       = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -60]);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
      className="bg-black text-gray-400 border-t border-red-900/30 relative overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-red-500/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-sky-400/5 rounded-full blur-[80px]" />
      </div>

      {/* Top Gradient Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      <motion.div
        style={{ y }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
      >
        {/* ── Brand ── */}
        <motion.div variants={fadeUp}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-5 group">
            <motion.div
              className="w-11 h-11 bg-gradient-to-br from-red-600 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M8 6.5L14 12L8 17.5V6.5Z" />
              </svg>
            </motion.div>
            <span className="text-white text-xl font-extrabold tracking-tight">
              Code
              <span className="bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
                Tube
              </span>
            </span>
          </Link>

          <p className="text-sm leading-relaxed text-gray-500 mb-6">
            We curate the best educational YouTube lectures and organize them
            into structured learning paths for everyone.
          </p>

          {/* Mini Stats */}
          <div className="flex gap-4">
            {[
              { value: "50+",  label: "Courses"  },
              { value: "10K+", label: "Learners" },
              { value: "Free", label: "Always"   },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-white font-bold text-base bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="text-gray-600 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Quick Links ── */}
        <motion.div variants={fadeUp}>
          <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-red-500 to-yellow-400 rounded-full inline-block" />
            Quick Links
          </h3>
          <ul className="space-y-3">
            {quickLinks.map((link, i) => (
              <motion.li key={i} whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  to={link.to}
                  className="text-sm text-gray-500 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={13}
                    className="opacity-0 group-hover:opacity-100 text-yellow-400 transition-opacity duration-300"
                  />
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ── Categories ── */}
        <motion.div variants={fadeUp}>
          <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-yellow-400 to-sky-400 rounded-full inline-block" />
            Categories
          </h3>
          <ul className="space-y-3">
            {categories.map((cat, i) => (
              <motion.li key={i} whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link
                  to={cat.to}
                  className="text-sm text-gray-500 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={13}
                    className="opacity-0 group-hover:opacity-100 text-sky-400 transition-opacity duration-300"
                  />
                  {cat.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ── Newsletter & Socials ── */}
        <motion.div variants={fadeUp}>
          <h3 className="text-white font-bold text-base mb-5 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-sky-400 to-red-500 rounded-full inline-block" />
            Connect With Us
          </h3>

          {/* Social Icons */}
          <div className="flex gap-3 mb-7">
            {socials.map(({ Icon, label, href, color, ring }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white bg-gradient-to-br ${color} hover:border-transparent hover:shadow-lg ${ring} transition-all duration-300`}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
              <Mail size={12} className="text-yellow-400" />
              Subscribe to our newsletter
            </p>

            {subscribed ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 text-green-400 text-sm font-medium py-2"
              >
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  🎉
                </motion.span>
                You're subscribed!
              </motion.div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  className="flex-1 px-3 py-2.5 bg-white/5 border border-gray-800 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-colors"
                />
                <motion.button
                  onClick={handleSubscribe}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-xl text-sm font-semibold flex items-center gap-1 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-shadow"
                >
                  <Send size={14} />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        variants={fadeUp}
        className="relative z-10 border-t border-gray-900"
      >
        {/* Bottom Gradient Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent mb-px" />

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-gray-600">
            © {new Date().getFullYear()}{" "}
            <span className="bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent font-semibold">
              CodeTube
            </span>
            . All Rights Reserved.
          </p>
          <p className="text-gray-700 flex items-center gap-1.5 text-xs">
            Made with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <Heart size={12} className="text-red-500 fill-red-500" />
            </motion.span>
            for learners everywhere
          </p>
        </div>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;