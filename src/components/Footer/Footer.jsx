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
  ArrowUp
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
  { label: "Home", to: "/" },
  { label: "Coding", to: "/coding" },
  { label: "ML", to: "/ml" },
  { label: "AI", to: "/ai" },
  { label: "DSA", to: "/dsa" },
  { label: "Contact", to: "/contact" },
];

const categories = [
  { label: "Web Development", to: "/web" },
  { label: "App Development", to: "/app" },
  { label: "System Design", to: "/sys" },
  { label: "Deep Learning", to: "/deep" },
  { label: "Cyber Security", to: "/cyber" },
  { label: "Database", to: "/database" },
  { label: "Git/Github", to: "/git" },
  { label: "Career Roadmap", to: "/road" },
];

const socials = [
  { Icon: Youtube, href: "https://youtube.com" },
  { Icon: Facebook, href: "https://facebook.com" },
  { Icon: Instagram, href: "https://instagram.com" },
  { Icon: Twitter, href: "https://twitter.com" },
];

function Footer() {
  const [email, setEmail] = useState("");
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
    <>
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

        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        <motion.div
          style={{ y }}
          className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeUp}>
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <motion.div
                className="w-11 h-11 bg-gradient-to-br from-red-600 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                ▶
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
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h3 className="text-white font-bold text-base mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <motion.li key={i} whileHover={{ x: 6 }}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-yellow-400 transition flex items-center gap-2 group"
                  >
                    <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={fadeUp}>
            <h3 className="text-white font-bold text-base mb-5">Categories</h3>
            <ul className="space-y-3">
              {categories.map((cat, i) => (
                <motion.li key={i} whileHover={{ x: 6 }}>
                  <Link
                    to={cat.to}
                    className="text-sm text-gray-500 hover:text-sky-400 transition flex items-center gap-2 group"
                  >
                    <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition" />
                    {cat.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div variants={fadeUp}>
            <h3 className="text-white font-bold text-base mb-5">Connect With Us</h3>

            <div className="flex gap-3 mb-7">
              {socials.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -4 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r from-red-600 to-yellow-500 transition"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                <Mail size={12} className="text-yellow-400" />
                Subscribe to our newsletter
              </p>

              {subscribed ? (
                <div className="text-green-400 text-sm py-2">
                  🎉 You're subscribed!
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/5 border border-gray-800 rounded-xl text-sm text-white"
                  />
                  <motion.button
                    onClick={handleSubscribe}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded-xl"
                  >
                    <Send size={14} />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">

            <p className="text-gray-600">
              © {new Date().getFullYear()}{" "}
              <span className="bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent font-semibold">
                CodeTube
              </span>
              . All Rights Reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-4 text-gray-500 text-xs">
              <Link to="/privacy" className="hover:text-yellow-400 transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-yellow-400 transition">
                Terms & Conditions
              </Link>
            </div>

            <p className="flex items-center gap-1 text-xs text-gray-600">
              Made with
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <Heart size={12} className="text-red-500 fill-red-500" />
              </motion.span>
              for learners
            </p>
          </div>
        </div>
      </motion.footer>

      {/* Back To Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-red-600 to-yellow-500 text-white p-3 rounded-full shadow-lg shadow-red-500/30 z-50"
      >
        <ArrowUp size={18} />
      </motion.button>
    </>
  );
}

export default Footer;
