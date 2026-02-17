import React, { useEffect, useRef, useState } from "react";
import { Shield, Eye, Cookie, Link2, Lock, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

// ─── useSEO ── no react-helmet-async needed ───────────────────────────────────
// Injects <title>, <meta>, <link> and JSON-LD directly into <head>.
// Works out of the box with plain Vite + React — no HelmetProvider wrapper.
function useSEO({ title, description, canonical, ogImage, lastUpdated, jsonLd }) {
  useEffect(() => {
    // ── Page title ──
    document.title = title;

    // Helper: find-or-create a <meta> and set its content
    const setMeta = (attrs) => {
      const selectorParts = Object.entries(attrs)
        .filter(([k]) => k !== "content")
        .map(([k, v]) => `[${k}="${v}"]`)
        .join("");
      let el = document.querySelector(`meta${selectorParts}`);
      if (!el) {
        el = document.createElement("meta");
        Object.entries(attrs).forEach(([k, v]) => {
          if (k !== "content") el.setAttribute(k, v);
        });
        document.head.appendChild(el);
      }
      el.setAttribute("content", attrs.content);
    };

    // Helper: find-or-create a <link>
    const setLink = (attrs) => {
      let el = document.querySelector(`link[rel="${attrs.rel}"]`);
      if (!el) { el = document.createElement("link"); document.head.appendChild(el); }
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    };

    // ── Primary ──
    setMeta({ name: "description", content: description });
    setMeta({ name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" });
    setLink({ rel: "canonical", href: canonical });

    // ── Open Graph ──
    setMeta({ property: "og:type",                content: "website" });
    setMeta({ property: "og:url",                 content: canonical });
    setMeta({ property: "og:title",               content: title });
    setMeta({ property: "og:description",         content: description });
    setMeta({ property: "og:image",               content: ogImage });
    setMeta({ property: "og:site_name",           content: "CodeTube" });
    setMeta({ property: "og:locale",              content: "en_US" });
    setMeta({ property: "article:modified_time",  content: lastUpdated });

    // ── Twitter Card ──
    setMeta({ name: "twitter:card",        content: "summary_large_image" });
    setMeta({ name: "twitter:site",        content: "@codetube" });
    setMeta({ name: "twitter:title",       content: title });
    setMeta({ name: "twitter:description", content: description });
    setMeta({ name: "twitter:image",       content: ogImage });

    // ── JSON-LD structured data ──
    const existing = document.getElementById("jsonld-privacy");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id   = "jsonld-privacy";
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById("jsonld-privacy");
      if (s) s.remove();
    };
  }, [title, description, canonical, ogImage, lastUpdated]);
}

// ─── SEO CONFIG ───────────────────────────────────────────────────────────────
const SEO = {
  title:       "Privacy Policy | CodeTube — Free AI & Programming Courses",
  description: "Read CodeTube's Privacy Policy to understand how we collect, use, and protect your personal data. We are committed to transparency and never sell your information.",
  canonical:   "https://www.codetube.dev/privacy-policy",
  ogImage:     "https://www.codetube.dev/og-privacy.png",
  lastUpdated: new Date().toISOString().split("T")[0],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy — CodeTube",
  description: SEO.description,
  url: SEO.canonical,
  dateModified: SEO.lastUpdated,
  publisher: {
    "@type": "Organization",
    name: "CodeTube",
    url: "https://www.codetube.dev",
    logo: { "@type": "ImageObject", url: "https://www.codetube.dev/logo.png" },
    sameAs: [
      "https://youtube.com/@codetube",
      "https://twitter.com/codetube",
      "https://instagram.com/codetube",
    ],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",           item: "https://www.codetube.dev" },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: SEO.canonical },
    ],
  },
};

// ─── POLICY SECTIONS ─────────────────────────────────────────────────────────
const sections = [
  {
    id: "01", slug: "information-we-collect", icon: Eye,
    title: "Information We Collect",
    body: "CodeTube does not collect personal data unless you voluntarily provide it through forms such as newsletter subscription. We believe in radical transparency — only the minimum data needed to serve you better.",
  },
  {
    id: "02", slug: "how-we-use-information", icon: Shield,
    title: "How We Use Information",
    body: "Any information you provide is used only to improve user experience and send updates related to educational content. We never sell, rent, or trade your personal data with third parties.",
  },
  {
    id: "03", slug: "cookies", icon: Cookie,
    title: "Cookies",
    body: "We may use basic cookies to enhance website functionality and improve performance analytics. You can control cookie preferences from your browser settings at any time.",
  },
  {
    id: "04", slug: "third-party-links", icon: Link2,
    title: "Third-Party Links",
    body: "CodeTube contains links to YouTube and other third-party platforms. We are not responsible for their privacy policies or practices. We recommend reviewing their policies before interacting.",
  },
  {
    id: "05", slug: "data-security", icon: Lock,
    title: "Data Security",
    body: "We take reasonable steps to protect your information, but no method of transmission over the internet is 100% secure. We use industry-standard protocols and regularly review our security practices.",
  },
  {
    id: "06", slug: "contact-us", icon: Mail,
    title: "Contact Us",
    body: "If you have any questions about this Privacy Policy, please reach out through our Contact page. We aim to respond within 48 hours on business days.",
  },
];

// ─── POLICY CARD ─────────────────────────────────────────────────────────────
function PolicyCard({ section, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const Icon = section.icon;

  return (
    <section
      id={section.slug}
      aria-labelledby={`heading-${section.slug}`}
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
        display: "flex",
        gap: 0,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Number column */}
      <div aria-hidden="true" style={{
        width: 72, flexShrink: 0,
        paddingTop: 28, paddingRight: 24,
        display: "flex", flexDirection: "column",
        alignItems: "flex-end", gap: 8,
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: 10,
          letterSpacing: "0.18em", color: "rgba(249,115,22,0.5)",
          textTransform: "uppercase",
        }}>
          {section.id}
        </span>
        <div style={{
          width: 1, flex: 1,
          background: "linear-gradient(180deg, rgba(249,115,22,0.3), transparent)",
          minHeight: 40,
        }} />
      </div>

      {/* Content column */}
      <motion.div
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          flex: 1, padding: "28px 0 36px",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          paddingLeft: 28, cursor: "default", position: "relative",
        }}
      >
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: 2,
            background: "linear-gradient(180deg, #f97316, #facc15)",
            scaleY: 0, transformOrigin: "top",
          }}
          whileHover={{ scaleY: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div aria-hidden="true" style={{
            width: 34, height: 34, borderRadius: 6,
            background: "rgba(249,115,22,0.08)",
            border: "1px solid rgba(249,115,22,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon size={15} color="#f97316" />
          </div>
          <h2
            id={`heading-${section.slug}`}
            style={{
              fontFamily: "'Syne', sans-serif", fontSize: 17,
              fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em",
            }}
          >
            {section.title}
          </h2>
        </div>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 14,
          color: "rgba(255,255,255,0.42)", lineHeight: 1.75, maxWidth: 580,
        }}>
          {section.body}
        </p>
      </motion.div>
    </section>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function PrivacyPolicy() {
  // Inject all SEO tags into <head> via useEffect — no Helmet / HelmetProvider needed
  useSEO({ ...SEO, jsonLd });

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit", month: "long", year: "numeric",
  }).toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Space+Mono:wght@400;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .pp-root *, .pp-root *::before, .pp-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }
        .pp-root {
          min-height: 100vh;
          background: #06060a;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .pp-root::after {
          content: '';
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none; z-index: 0;
        }
        .pp-root section[id] { scroll-margin-top: 80px; }
        .toc-link {
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          color: rgba(255,255,255,0.3); text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: color 0.2s;
        }
        .toc-link:hover { color: #f97316; }
      `}</style>

      <div className="pp-root">
        {/* Ambient glow */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <motion.div
            style={{
              position: "absolute", top: "-10%", left: "30%",
              width: 600, height: 500, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <main id="main-content" role="main" style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto", padding: "72px 28px 96px" }}>

          {/* Skip link */}
          <a
            href="#main-content"
            style={{ position: "absolute", left: -9999, top: "auto", width: 1, height: 1, overflow: "hidden" }}
            onFocus={(e)  => { e.target.style.cssText = "position:static;width:auto;height:auto;padding:8px 16px;background:#f97316;color:#fff;border-radius:4px;z-index:999;text-decoration:none;font-family:monospace;font-size:12px;"; }}
            onBlur={(e)   => { e.target.style.cssText = "position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;"; }}
          >
            Skip to main content
          </a>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: 40 }}>
            <ol style={{
              display: "flex", alignItems: "center", gap: 8, listStyle: "none",
              fontFamily: "'Space Mono', monospace", fontSize: 10,
              letterSpacing: "0.14em", color: "rgba(255,255,255,0.2)",
            }}>
              <li><a href="/" style={{ color: "rgba(249,115,22,0.6)", textDecoration: "none" }}>Home</a></li>
              <li aria-hidden="true" style={{ opacity: 0.4 }}>›</li>
              <li aria-current="page" style={{ color: "rgba(255,255,255,0.35)" }}>Privacy Policy</li>
            </ol>
          </nav>

          {/* Page header */}
          <motion.header
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
            style={{ marginBottom: 64 }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "'Space Mono', monospace", fontSize: 10,
              letterSpacing: "0.22em", color: "rgba(249,115,22,0.7)",
              textTransform: "uppercase",
              border: "1px solid rgba(249,115,22,0.18)",
              padding: "5px 14px", borderRadius: 2, marginBottom: 24,
            }}>
              <Shield size={10} aria-hidden="true" />
              Legal · CodeTube
            </div>

            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(42px, 7vw, 72px)",
              fontWeight: 800, lineHeight: 0.95,
              letterSpacing: "-0.04em", color: "#fff", marginBottom: 20,
            }}>
              Privacy
              <br />
              <span style={{
                background: "linear-gradient(135deg, #f97316, #facc15)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Policy
              </span>
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11,
                color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em",
              }}>
                LAST UPDATED · <time dateTime={SEO.lastUpdated}>{formattedDate}</time>
              </span>
              <span aria-hidden="true" style={{ display: "inline-block", width: 4, height: 4, borderRadius: "50%", background: "rgba(249,115,22,0.4)" }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
                {sections.length} SECTIONS
              </span>
            </div>

            <div style={{ height: 1, marginTop: 32, background: "linear-gradient(90deg, rgba(249,115,22,0.5), rgba(250,204,21,0.3), transparent)" }} />
          </motion.header>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              color: "rgba(255,255,255,0.35)", lineHeight: 1.8,
              marginBottom: 56, maxWidth: 560,
              fontStyle: "italic", fontWeight: 300,
            }}
          >
            At CodeTube, your privacy matters. This Privacy Policy explains what personal data we collect, how we use it, and your rights as a learner on our free educational platform.
          </motion.p>

          {/* Table of Contents */}
          <nav aria-label="Table of contents" style={{ marginBottom: 56 }}>
            <p style={{
              fontFamily: "'Space Mono', monospace", fontSize: 9,
              letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase", marginBottom: 14,
            }}>
              Contents
            </p>
            <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {sections.map((s) => (
                <li key={s.slug}>
                  <a href={`#${s.slug}`} className="toc-link">
                    <span style={{
                      fontFamily: "'Space Mono', monospace", fontSize: 9,
                      color: "rgba(249,115,22,0.4)", letterSpacing: "0.12em",
                    }}>
                      {s.id}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Policy sections */}
          <article itemScope itemType="https://schema.org/WebPageElement">
            {sections.map((section, i) => (
              <PolicyCard key={section.id} section={section} index={i} />
            ))}
          </article>

          {/* Bottom CTA */}
          <motion.aside
            aria-label="Contact for privacy questions"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              marginTop: 64, padding: "28px 32px",
              background: "rgba(249,115,22,0.05)",
              border: "1px solid rgba(249,115,22,0.15)",
              borderRadius: 4,
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap", gap: 20,
            }}
          >
            <div>
              <p style={{
                fontFamily: "'Syne', sans-serif", fontSize: 16,
                fontWeight: 800, color: "#fff", marginBottom: 4,
                letterSpacing: "-0.02em",
              }}>
                Questions about this policy?
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
                We respond within 48 hours on business days.
              </p>
            </div>
            <motion.a
              href="/contact"
              rel="noopener"
              aria-label="Contact CodeTube about Privacy Policy"
              whileHover={{ scale: 1.04, x: 2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "'Space Mono', monospace", fontSize: 11,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: "#fff",
                background: "linear-gradient(135deg, #f97316, #facc15)",
                padding: "10px 22px", borderRadius: 3,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(249,115,22,0.3)",
              }}
            >
              Contact Us <ArrowUpRight size={13} aria-hidden="true" />
            </motion.a>
          </motion.aside>

        </main>
      </div>
    </>
  );
}