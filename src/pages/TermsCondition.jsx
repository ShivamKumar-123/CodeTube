import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// ── Animation variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};

const sectionItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Section data ────────────────────────────────────────────────────
const sections = [
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance of Terms",
    content:
      "By accessing or using CodeTube, you confirm that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you may not use our platform. Continued use of CodeTube constitutes acceptance of any future amendments.",
  },
  {
    id: "educational-purpose",
    number: "02",
    title: "Educational Purpose",
    content:
      "CodeTube curates publicly available educational YouTube videos to help learners discover quality programming content. We do not host, upload, or own any of the video content displayed on this platform. All videos are embedded directly from YouTube and are subject to YouTube's own terms of service.",
  },
  {
    id: "intellectual-property",
    number: "03",
    title: "Intellectual Property",
    content:
      "All video content, thumbnails, and associated materials belong exclusively to their respective creators and platforms. CodeTube only provides an organized, curated interface for discovering and accessing publicly available content. Any unauthorized reproduction or distribution of third-party content is strictly prohibited.",
  },
  {
    id: "limitation-of-liability",
    number: "04",
    title: "Limitation of Liability",
    content:
      "CodeTube is provided on an 'as is' and 'as available' basis. We expressly disclaim all warranties of any kind. We shall not be held liable for any indirect, incidental, or consequential damages arising from the use of third-party content, service interruptions, or any other matter related to your use of CodeTube.",
  },
  {
    id: "changes-to-terms",
    number: "05",
    title: "Changes to Terms",
    content:
      "We reserve the right to modify or replace these Terms & Conditions at any time at our sole discretion. We will notify users of significant changes by updating the 'Last Updated' date at the top of this page. Your continued use of CodeTube after any changes constitutes your acceptance of the new terms.",
  },
  {
    id: "contact",
    number: "06",
    title: "Contact Us",
    content: null, // rendered separately with a link
  },
];

// ── Component ───────────────────────────────────────────────────────
export default function TermsCondition() {
  const [activeSection, setActiveSection] = useState(null);

  // Framer Motion scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    restDelta: 0.001,
  });

  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggle = (id) =>
    setActiveSection((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-[#080a0d] text-[#e8edf2]">

      {/* ── Framer Motion Scroll Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-50 origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #ffd200, #ff8c00)",
        }}
        role="progressbar"
        aria-label="Reading progress"
      />

      {/* ── Subtle grid texture ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,210,0,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,210,0,0.018) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* ── Page wrapper ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-10 pt-16 pb-24">

        {/* ── Hero ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            {/* Eyebrow label */}
            <div className="flex items-center gap-3 mb-4">
              <motion.span
                className="block h-px bg-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: 28 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                aria-hidden="true"
              />
              <span className="text-yellow-400 text-[11px] tracking-[0.2em] uppercase font-mono">
                Legal Documentation
              </span>
            </div>

            {/* Page title */}
            <h1
              className="font-black uppercase leading-[0.9] tracking-tight text-[#e8edf2]"
              style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
            >
              Terms &amp;{" "}
              <span className="text-yellow-400 block">Conditions</span>
            </h1>
          </motion.div>

          {/* Doc meta */}
          <motion.div
            className="sm:text-right flex-shrink-0"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            aria-label="Document metadata"
          >
            <p className="font-mono text-[10px] tracking-widest text-[#404a56] uppercase mb-1">
              DOC-TCv2.1
            </p>
            <time
              className="block text-[13px] text-[#7a8694]"
              dateTime={new Date().toISOString().split("T")[0]}
            >
              {formattedDate}
            </time>
            <span className="inline-block mt-2 font-mono text-[10px] tracking-[0.15em] uppercase text-yellow-400 border border-yellow-400/40 px-3 py-1 rounded-sm">
              In Effect
            </span>
          </motion.div>
        </div>

        {/* ── Summary Banner ── */}
        <motion.div
          role="note"
          className="bg-yellow-400/[0.06] border border-yellow-400/30 border-l-[3px] border-l-yellow-400 rounded-r-md px-6 py-4 mb-14"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
        >
          <p className="text-[#7a8694] text-sm font-light leading-relaxed">
            <strong className="text-[#e8edf2] font-medium">Plain English:</strong>{" "}
            CodeTube helps you discover educational coding videos from YouTube.
            We curate, not host. All content belongs to its creators. By using
            this site, you agree to these terms. Questions?{" "}
            <strong className="text-[#e8edf2] font-medium">
              Reach out — we're here to help.
            </strong>
          </p>
        </motion.div>

        {/* ── Content Grid ── */}
        <main className="flex flex-col md:flex-row gap-16 items-start">

          {/* ── Table of Contents ── */}
          <motion.nav
            aria-label="Table of contents"
            className="hidden md:block w-52 flex-shrink-0 sticky top-10"
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#404a56] mb-4">
              On this page
            </p>
            <ul className="flex flex-col gap-0.5 list-none p-0 m-0">
              {sections.map((s) => {
                const isActive = activeSection === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setActiveSection(s.id)}
                      className={[
                        "flex items-center gap-2.5 text-[12px] px-2.5 py-2 rounded-sm border-l-2 no-underline transition-all duration-200",
                        isActive
                          ? "text-yellow-400 border-yellow-400 bg-yellow-400/[0.07] pl-3.5"
                          : "text-[#404a56] border-transparent hover:text-yellow-400 hover:border-yellow-400 hover:bg-yellow-400/[0.05] hover:pl-3.5",
                      ].join(" ")}
                    >
                      <span
                        className={`font-mono text-[9px] flex-shrink-0 ${
                          isActive ? "text-yellow-400" : "text-[#404a56]"
                        }`}
                      >
                        {s.number}
                      </span>
                      {s.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.nav>

          {/* ── Accordion Sections ── */}
          <article className="flex-1 min-w-0">
            <motion.div
              className="flex flex-col gap-3"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {sections.map((section) => {
                const isOpen = activeSection === section.id;
                const isContact = section.id === "contact";

                return (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    variants={sectionItem}
                    aria-expanded={isOpen}
                    className={[
                      "rounded border overflow-hidden transition-colors duration-200",
                      isOpen
                        ? "border-yellow-400/40 bg-[#111820]"
                        : "border-yellow-400/10 bg-[#0d1117] hover:border-yellow-400/30 hover:bg-[#0f151c]",
                    ].join(" ")}
                  >
                    {/* Accordion header */}
                    <button
                      className="group flex items-center gap-5 w-full px-6 py-5 text-left bg-transparent border-0 cursor-pointer"
                      onClick={() => toggle(section.id)}
                      aria-controls={`content-${section.id}`}
                    >
                      <motion.span
                        className="font-black text-[2.2rem] leading-none w-14 flex-shrink-0"
                        animate={{ color: isOpen ? "#ffd200" : "#404a56" }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="true"
                      >
                        {section.number}
                      </motion.span>

                      <h2 className="flex-1 text-[15px] font-medium tracking-wide text-[#e8edf2] m-0">
                        {section.title}
                      </h2>

                      {/* Animated chevron */}
                      <motion.svg
                        className={`w-4 h-4 flex-shrink-0 ${
                          isOpen ? "text-yellow-400" : "text-[#404a56]"
                        }`}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    </button>

                    {/* Animated accordion body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`content-${section.id}`}
                          role="region"
                          aria-labelledby={`heading-${section.id}`}
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.25, ease: "easeInOut" },
                          }}
                          style={{ overflow: "hidden" }}
                        >
                          <div className="px-6 pb-6 pt-4 pl-[4.75rem] border-t border-yellow-400/[0.08]">
                            {isContact ? (
                              <p className="text-[13.5px] font-light leading-[1.85] text-[#7a8694]">
                                If you have any questions, concerns, or feedback
                                regarding these Terms &amp; Conditions, we
                                encourage you to reach out to our team. We are
                                committed to addressing all inquiries promptly
                                and transparently.{" "}
                                <Link
                                  to="/contact"
                                  className="text-yellow-400 underline underline-offset-2 decoration-yellow-400/40 hover:decoration-yellow-400 transition-all duration-150 font-medium"
                                >
                                  Visit our Contact page →
                                </Link>
                              </p>
                            ) : (
                              <p className="text-[13.5px] font-light leading-[1.85] text-[#7a8694]">
                                {section.content}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.section>
                );
              })}
            </motion.div>
          </article>
        </main>
      </div>

      {/* Decorative corner bracket */}
      <div
        className="fixed bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-yellow-400/25 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}