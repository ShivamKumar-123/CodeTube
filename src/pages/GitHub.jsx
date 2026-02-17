import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitHubCourses } from "../assets/data.js";
import MLCard from "../components/MLCard";

// ── Category config ───────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",           label: "All",           icon: "◈", color: "#f0f6ff", accent: "#e6edf3" },
  { id: "git",           label: "Git",           icon: "⎇", color: "#f97316", accent: "#f9731620" },
  { id: "github",        label: "GitHub",        icon: "◉", color: "#e6edf3", accent: "#e6edf315" },
  { id: "branching",     label: "Branching",     icon: "⌥", color: "#4ade80", accent: "#4ade8020" },
  { id: "collaboration", label: "Collaboration", icon: "⊕", color: "#38bdf8", accent: "#38bdf820" },
  { id: "opensource",    label: "Open Source",   icon: "⬡", color: "#a78bfa", accent: "#a78bfa20" },
  { id: "cicd",          label: "CI/CD",         icon: "⟳", color: "#fb7185", accent: "#fb718520" },
];

// ── Git commit messages floating ──────────────────────────────────────────────
const COMMITS = [
  "feat: add new module",   "fix: resolve merge conflict",  "chore: update deps",
  "docs: improve README",   "refactor: clean up code",      "test: add unit tests",
  "ci: update workflow",    "feat: init repository",        "merge: pull request #42",
  "tag: v2.1.0 release",    "rebase: squash commits",       "stash: wip changes",
];

function FloatingCommit({ text, x, y, delay, duration }) {
  return (
    <motion.div className="absolute pointer-events-none select-none font-mono whitespace-nowrap"
      style={{ left: `${x}%`, top: `${y}%`, fontSize: 10, color: "rgba(240,246,255,0.055)" }}
      animate={{ x: [0, 12, 0], opacity: [0.03, 0.1, 0.03] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}>
      <span style={{ color: "rgba(74,222,128,0.4)" }}>$ </span>{text}
    </motion.div>
  );
}

// ── Contribution heatmap background decoration ────────────────────────────────
function ContribHeatmap() {
  const cells = Array.from({ length: 52 * 7 }, (_, i) => ({
    opacity: Math.random() > 0.55 ? Math.random() * 0.18 + 0.02 : 0.01,
    delay: Math.random() * 4,
  }));
  return (
    <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden opacity-40 hidden xl:block"
      style={{ width: 420, height: 120 }}>
      <div className="flex gap-[3px] flex-wrap-none" style={{ display: "grid", gridTemplateColumns: "repeat(52,1fr)", gap: 3, padding: 12 }}>
        {cells.map((c, i) => (
          <motion.div key={i} className="rounded-sm"
            style={{ width: 6, height: 6, background: `rgba(74,222,128,${c.opacity})` }}
            animate={{ opacity: [c.opacity, c.opacity * 3.5, c.opacity] }}
            transition={{ duration: 3 + c.delay, delay: c.delay, repeat: Infinity }} />
        ))}
      </div>
    </div>
  );
}

// ── Animated branch tree (left side decoration) ───────────────────────────────
function BranchTree() {
  return (
    <div className="absolute left-6 top-40 pointer-events-none hidden xl:block" style={{ width: 80, height: 320 }}>
      <svg width="80" height="320" viewBox="0 0 80 320">
        {/* main branch */}
        <motion.line x1="20" y1="0" x2="20" y2="320" stroke="rgba(240,246,255,0.12)" strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.3 }} />
        {/* branch 1 */}
        <motion.path d="M 20 80 Q 50 80 60 110" stroke="rgba(74,222,128,0.3)" strokeWidth="1.5" fill="none"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.8 }} />
        <motion.line x1="60" y1="110" x2="60" y2="180" stroke="rgba(74,222,128,0.2)" strokeWidth="1.5"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 1.2 }} />
        <motion.path d="M 60 180 Q 40 195 20 200" stroke="rgba(74,222,128,0.2)" strokeWidth="1.5" fill="none"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 1.6 }} />
        {/* branch 2 */}
        <motion.path d="M 20 220 Q 50 220 65 250" stroke="rgba(56,189,248,0.25)" strokeWidth="1.5" fill="none"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 1.9 }} />
        {/* commit dots */}
        {[40, 80, 140, 200, 260, 310].map((y, i) => (
          <motion.circle key={i} cx="20" cy={y} r="4"
            fill="none" stroke={i % 2 === 0 ? "rgba(240,246,255,0.4)" : "rgba(74,222,128,0.5)"}
            strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 200 }} />
        ))}
        {[110, 150].map((y, i) => (
          <motion.circle key={i} cx="60" cy={y} r="3.5"
            fill="none" stroke="rgba(74,222,128,0.4)" strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1 + i * 0.2, type: "spring", stiffness: 200 }} />
        ))}
      </svg>
    </div>
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
    <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 180 }}
      className="relative rounded-xl p-5 text-center overflow-hidden"
      style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${color}22` }}>
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(circle at center, ${color}07, transparent 70%)` }} />
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-3xl font-black tabular-nums" style={{ color }}>{n}+</div>
      <div className="font-mono text-xs mt-1 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>{label}</div>
    </motion.div>
  );
}

// ── Typewriter ────────────────────────────────────────────────────────────────
function TypeWriter({ text, speed = 35 }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1)); i++;
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return <>{displayed}{!done && <span className="animate-pulse text-green-400">▋</span>}</>;
}

// ── Git Commands Data ─────────────────────────────────────────────────────────
const GIT_COMMAND_GROUPS = [
  {
    id: "setup",
    label: "Setup & Init",
    icon: "⚙",
    color: "#f97316",
    commands: [
      { cmd: "git init",                          desc: "Initialize a new local repository" },
      { cmd: "git clone <url>",                   desc: "Clone a remote repository locally" },
      { cmd: "git config --global user.name",     desc: "Set your global username" },
      { cmd: "git config --global user.email",    desc: "Set your global email address" },
    ],
  },
  {
    id: "stage",
    label: "Stage & Commit",
    icon: "◈",
    color: "#4ade80",
    commands: [
      { cmd: "git status",                        desc: "Show working tree status" },
      { cmd: "git add .",                         desc: "Stage all changes for commit" },
      { cmd: "git add <file>",                    desc: "Stage a specific file" },
      { cmd: 'git commit -m "message"',           desc: "Commit staged changes with message" },
      { cmd: "git commit --amend",                desc: "Modify the last commit" },
    ],
  },
  {
    id: "push",
    label: "Push & Pull",
    icon: "⤢",
    color: "#38bdf8",
    commands: [
      { cmd: "git push origin main",              desc: "Push commits to remote main branch" },
      { cmd: "git push -u origin <branch>",       desc: "Push & set upstream tracking branch" },
      { cmd: "git pull",                          desc: "Fetch and merge from remote" },
      { cmd: "git pull --rebase",                 desc: "Pull with rebase instead of merge" },
      { cmd: "git fetch origin",                  desc: "Download remote changes without merging" },
    ],
  },
  {
    id: "branch",
    label: "Branching",
    icon: "⎇",
    color: "#a78bfa",
    commands: [
      { cmd: "git branch",                        desc: "List all local branches" },
      { cmd: "git branch <name>",                 desc: "Create a new branch" },
      { cmd: "git checkout -b <name>",            desc: "Create and switch to new branch" },
      { cmd: "git switch <branch>",               desc: "Switch to an existing branch" },
      { cmd: "git merge <branch>",                desc: "Merge a branch into current" },
      { cmd: "git branch -d <name>",              desc: "Delete a merged branch" },
    ],
  },
  {
    id: "remote",
    label: "Remote",
    icon: "◉",
    color: "#fb7185",
    commands: [
      { cmd: "git remote -v",                     desc: "Show all remote connections" },
      { cmd: "git remote add origin <url>",       desc: "Add a new remote origin" },
      { cmd: "git remote set-url origin <url>",   desc: "Change the remote URL" },
      { cmd: "git push origin --delete <branch>", desc: "Delete a remote branch" },
    ],
  },
  {
    id: "undo",
    label: "Undo & Fix",
    icon: "⟳",
    color: "#fbbf24",
    commands: [
      { cmd: "git reset HEAD~1",                  desc: "Undo last commit, keep changes staged" },
      { cmd: "git reset --hard HEAD~1",           desc: "Undo last commit and discard changes" },
      { cmd: "git revert <commit>",               desc: "Create a new commit that undoes changes" },
      { cmd: "git stash",                         desc: "Stash current uncommitted changes" },
      { cmd: "git stash pop",                     desc: "Re-apply most recently stashed changes" },
      { cmd: "git restore <file>",                desc: "Discard changes in working directory" },
    ],
  },
];

// ── Copy button ───────────────────────────────────────────────────────────────
function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <motion.button onClick={handleCopy} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
      className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-md font-mono text-xs transition-all duration-200"
      style={{
        background: copied ? "rgba(74,222,128,0.12)" : "rgba(240,246,255,0.05)",
        border: copied ? "1px solid rgba(74,222,128,0.35)" : "1px solid rgba(240,246,255,0.08)",
        color: copied ? "#4ade80" : "rgba(240,246,255,0.3)",
      }}>
      {copied ? (
        <><span>✓</span><span>copied</span></>
      ) : (
        <><svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z" />
          <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
        </svg><span>copy</span></>
      )}
    </motion.button>
  );
}

// ── Git Commands Section ──────────────────────────────────────────────────────
function GitCommandsSection() {
  const [activeGroup, setActiveGroup] = useState("push");
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const activeData = GIT_COMMAND_GROUPS.find((g) => g.id === activeGroup);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-14">

      {/* Section header */}
      <div className="flex items-center gap-4 mb-7">
        <div className="h-px flex-1" style={{ background: "rgba(240,246,255,0.06)" }} />
        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full"
          style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)" }}>
          <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "rgba(74,222,128,0.6)" }}>
            git command reference
          </span>
        </div>
        <div className="h-px flex-1" style={{ background: "rgba(240,246,255,0.06)" }} />
      </div>

      <div className="rounded-2xl overflow-hidden"
        style={{ background: "rgba(13,17,23,0.8)", border: "1px solid rgba(240,246,255,0.07)", backdropFilter: "blur(12px)" }}>

        {/* Terminal title bar */}
        <div className="flex items-center gap-3 px-5 py-3.5"
          style={{ background: "rgba(240,246,255,0.03)", borderBottom: "1px solid rgba(240,246,255,0.06)" }}>
          <div className="flex gap-2">
            {["#fb7185", "#fbbf24", "#4ade80"].map((c, i) => (
              <motion.div key={i} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.7 }}
                animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
            ))}
          </div>
          <div className="flex-1 text-center font-mono text-xs" style={{ color: "rgba(240,246,255,0.25)" }}>
            bash — git command cheatsheet
          </div>
          <div className="w-14" />
        </div>

        {/* Tab bar */}
        <div className="flex overflow-x-auto gap-0"
          style={{ borderBottom: "1px solid rgba(240,246,255,0.06)", scrollbarWidth: "none" }}>
          {GIT_COMMAND_GROUPS.map((group) => {
            const active = activeGroup === group.id;
            return (
              <motion.button key={group.id} onClick={() => setActiveGroup(group.id)}
                whileHover={{ backgroundColor: "rgba(240,246,255,0.04)" }}
                className="relative flex items-center gap-2 px-5 py-3 font-mono text-xs whitespace-nowrap transition-all duration-200 flex-shrink-0"
                style={{
                  color: active ? group.color : "rgba(240,246,255,0.3)",
                  background: active ? `${group.color}0a` : "transparent",
                  borderBottom: active ? `2px solid ${group.color}` : "2px solid transparent",
                }}>
                <span>{group.icon}</span>
                <span>{group.label}</span>
                {active && (
                  <motion.span className="w-1 h-1 rounded-full" style={{ background: group.color }}
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Commands list */}
        <AnimatePresence mode="wait">
          <motion.div key={activeGroup}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="p-5 space-y-2.5">

            {/* Prompt line */}
            <div className="flex items-center gap-2 mb-4 pb-3"
              style={{ borderBottom: "1px dashed rgba(240,246,255,0.06)" }}>
              <span className="font-mono text-xs" style={{ color: "rgba(74,222,128,0.5)" }}>
                ~/projects
              </span>
              <span className="font-mono text-xs" style={{ color: `${activeData.color}70` }}>
                ({activeGroup})
              </span>
              <span className="font-mono text-xs" style={{ color: "rgba(240,246,255,0.25)" }}>
                $ git --help {activeGroup}
              </span>
            </div>

            {activeData.commands.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
                className="group flex items-start gap-3 rounded-xl px-4 py-3 transition-all duration-200"
                style={{ background: "rgba(240,246,255,0.02)" }}
                onMouseEnter={(e) => e.currentTarget.style.background = `${activeData.color}08`}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(240,246,255,0.02)"}>

                {/* Line number */}
                <span className="font-mono text-xs mt-0.5 w-5 text-right flex-shrink-0"
                  style={{ color: "rgba(240,246,255,0.12)" }}>{i + 1}</span>

                {/* Dollar sign */}
                <span className="font-mono text-xs mt-0.5 flex-shrink-0"
                  style={{ color: `${activeData.color}60` }}>$</span>

                {/* Command */}
                <div className="flex-1 min-w-0">
                  <code className="font-mono text-sm font-semibold block"
                    style={{ color: activeData.color }}>
                    {item.cmd}
                  </code>
                  <span className="font-mono text-xs mt-0.5 block"
                    style={{ color: "rgba(240,246,255,0.3)" }}>
                    {/* comment style */}
                    <span style={{ color: "rgba(240,246,255,0.15)" }}># </span>
                    {item.desc}
                  </span>
                </div>

                {/* Copy button */}
                <CopyBtn text={item.cmd} />
              </motion.div>
            ))}

            {/* Bottom prompt */}
            <div className="flex items-center gap-2 pt-3 mt-2"
              style={{ borderTop: "1px dashed rgba(240,246,255,0.05)" }}>
              <span className="font-mono text-xs" style={{ color: "rgba(74,222,128,0.4)" }}>~/projects</span>
              <motion.span className="font-mono text-xs" style={{ color: "rgba(240,246,255,0.2)" }}
                animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>▋</motion.span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function GitHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inputFocused, setInputFocused] = useState(false);

  const floatingCommits = Array.from({ length: 16 }, (_, i) => ({
    text: COMMITS[i % COMMITS.length],
    x: (i * 19 + 5) % 85,
    y: (i * 31 + 8) % 90,
    delay: (i * 0.6) % 6,
    duration: 5 + (i % 5),
  }));

  const filteredCourses = GitHubCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" ? true : course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeConfig = CATEGORIES.find((c) => c.id === selectedCategory) ?? CATEGORIES[0];

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0d1117 0%, #0d1117 60%, #161b22 100%)" }}>

      {/* ── Ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(240,246,255,0.03) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 12, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 65%)" }}
          animate={{ scale: [1.06, 1, 1.06] }} transition={{ duration: 10, repeat: Infinity }} />
        <motion.div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.03) 0%, transparent 65%)" }}
          animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 14, repeat: Infinity }} />
      </div>

      {/* ── Subtle grid lines (like GitHub's interface) ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#e6edf3" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ── Floating commit messages ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingCommits.map((c, i) => <FloatingCommit key={i} {...c} />)}
      </div>

      {/* ── Branch tree decoration ── */}
      <BranchTree />

      {/* ── Contribution heatmap ── */}
      <ContribHeatmap />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-28">

        {/* ════════════════════════════════════════════════ */}
        {/* HERO                                            */}
        {/* ════════════════════════════════════════════════ */}
        <div className="text-center mb-16">

          {/* Repo tag */}
          <motion.div className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full"
            style={{ background: "rgba(240,246,255,0.05)", border: "1px solid rgba(240,246,255,0.1)" }}
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.span className="w-2 h-2 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(240,246,255,0.4)" }}>
              academy/learn-git-github · ★ 12.4k · 🍴 3.2k
            </span>
          </motion.div>

          {/* Title */}
          <motion.div initial={{ opacity: 0, y: -26 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}>
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight">
              <span style={{ color: "#e6edf3" }}>GIT</span>
              <span className="mx-2 md:mx-4" style={{ color: "rgba(240,246,255,0.15)" }}>&</span>
              <span className="relative inline-block">
                <span style={{
                  background: "linear-gradient(135deg, #e6edf3 0%, #4ade80 50%, #38bdf8 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>
                  GITHUB
                </span>
                {/* commit hash underline */}
                <motion.div className="absolute -bottom-2 left-0 right-0 flex items-center gap-1">
                  <div className="h-px flex-1" style={{ background: "rgba(74,222,128,0.4)" }} />
                  <span className="font-mono text-xs" style={{ color: "rgba(74,222,128,0.3)", fontSize: 9 }}>
                    a3f9c2d
                  </span>
                </motion.div>
              </span>
            </h1>
            <p className="font-mono text-xs mt-3" style={{ color: "rgba(240,246,255,0.2)" }}>COURSES</p>
          </motion.div>

          {/* Commit-style subtitle */}
          <motion.div className="mt-8 mb-10 flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div className="inline-flex items-start gap-3 text-left px-5 py-3 rounded-xl max-w-lg"
              style={{ background: "rgba(240,246,255,0.03)", border: "1px solid rgba(240,246,255,0.07)" }}>
              <div className="flex flex-col items-center gap-1 mt-1">
                <div className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                  style={{ borderColor: "rgba(74,222,128,0.6)" }} />
                <div className="w-px flex-1 min-h-6" style={{ background: "rgba(74,222,128,0.2)" }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold" style={{ color: "#4ade80" }}>HEAD → main</span>
                  <span className="font-mono text-xs px-1.5 py-0.5 rounded"
                    style={{ background: "rgba(74,222,128,0.1)", color: "rgba(74,222,128,0.6)", fontSize: 9 }}>
                    origin/main
                  </span>
                </div>
                <p className="font-mono text-sm" style={{ color: "rgba(240,246,255,0.5)" }}>
                  <TypeWriter text="Master Git workflows, GitHub collaboration, open source & CI/CD." />
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
            <StatCard value={42}   label="Courses"   icon="⎇" color="#e6edf3" delay={0.65} />
            <StatCard value={7}    label="Modules"   icon="◈" color="#4ade80" delay={0.75} />
            <StatCard value={88}   label="Lessons"   icon="⊕" color="#38bdf8" delay={0.85} />
            <StatCard value={200}  label="Commits"   icon="◉" color="#a78bfa" delay={0.95} />
          </motion.div>

          {/* ── SEARCH ── */}
          <motion.div className="max-w-xl mx-auto relative"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
            {/* Search icon area */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="rgba(240,246,255,0.25)">
                <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04-.708.707zM6 10.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search repositories, commits, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              className="w-full pl-10 pr-5 py-3.5 font-mono text-sm rounded-xl outline-none transition-all duration-300"
              style={{
                background: "rgba(240,246,255,0.04)",
                border: inputFocused ? "1px solid rgba(240,246,255,0.3)" : "1px solid rgba(240,246,255,0.1)",
                color: "#e6edf3",
                boxShadow: inputFocused ? "0 0 0 3px rgba(240,246,255,0.06)" : "none",
              }}
            />
            <AnimatePresence>
              {inputFocused && (
                <motion.div className="absolute bottom-0 left-8 right-8 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(240,246,255,0.3), transparent)" }}
                  initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }} transition={{ duration: 0.3 }} />
              )}
            </AnimatePresence>
            {searchQuery && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute -bottom-8 left-0 font-mono text-xs"
                style={{ color: "rgba(240,246,255,0.3)" }}>
                <span className="text-green-400">✓</span>
                {" "}<span className="text-green-400 font-bold">{filteredCourses.length}</span>
                {" "}result{filteredCourses.length !== 1 ? "s" : ""} · {searchQuery}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════ */}
        {/* GIT COMMANDS REFERENCE                          */}
        {/* ════════════════════════════════════════════════ */}
        <GitCommandsSection />

        {/* ════════════════════════════════════════════════ */}
        {/* CATEGORY FILTER                                 */}
        {/* ════════════════════════════════════════════════ */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
          {/* Branch indicator */}
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px flex-1" style={{ background: "rgba(240,246,255,0.06)" }} />
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="rgba(74,222,128,0.4)">
                <path d="M11.75 2.5a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0zm.75 2.75a.75.75 0 0 1-.75-.75V4h-.993A1.25 1.25 0 0 0 9.5 5.207v5.586a1.25 1.25 0 0 0 1.257 1.207H11.5v-.957a.75.75 0 0 1 1.5 0v.957h.993a1.25 1.25 0 0 0 1.257-1.207V5.207A1.25 1.25 0 0 0 13.993 4H13a.75.75 0 0 1-.75.75z" />
              </svg>
              <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(240,246,255,0.25)" }}>
                branches / topics
              </span>
            </div>
            <div className="h-px flex-1" style={{ background: "rgba(240,246,255,0.06)" }} />
          </div>

          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map((cat, i) => {
              const active = selectedCategory === cat.id;
              return (
                <motion.button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                  whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 + i * 0.06 }}
                  className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 overflow-hidden"
                  style={{
                    background: active ? `${cat.color}12` : "rgba(240,246,255,0.03)",
                    border: active ? `1px solid ${cat.color}40` : "1px solid rgba(240,246,255,0.08)",
                    color: active ? cat.color : "rgba(240,246,255,0.35)",
                    boxShadow: active ? `0 0 14px ${cat.color}10` : "none",
                  }}>
                  {active && (
                    <motion.div className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at center, ${cat.color}0a, transparent 70%)` }}
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

          {/* Active status */}
          <AnimatePresence mode="wait">
            <motion.div key={selectedCategory}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 14 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
                style={{ background: `${activeConfig.color}07`, border: `1px solid ${activeConfig.color}15` }}>
                <span className="font-mono text-xs" style={{ color: `${activeConfig.color}80` }}>
                  {activeConfig.icon} git log --topic="{activeConfig.id}" --oneline
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="font-mono text-xs" style={{ color: "rgba(240,246,255,0.2)" }}>
                    {filteredCourses.length} commit{filteredCourses.length !== 1 ? "s" : ""}
                  </span>
                  <div className="h-1 w-20 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: activeConfig.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((filteredCourses.length / Math.max(GitHubCourses?.length || 1, 1)) * 100, 100)}%` }}
                      transition={{ duration: 0.7, ease: "easeOut" }} />
                  </div>
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
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ delay: i * 0.055, type: "spring", stiffness: 165, damping: 18 }}>
                  <MLCard course={course} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }} className="text-center py-28">
              {/* Empty repo illustration */}
              <motion.div className="mx-auto w-20 h-20 rounded-full mb-6 flex items-center justify-center"
                style={{ background: "rgba(240,246,255,0.03)", border: "1px solid rgba(240,246,255,0.08)" }}
                animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                <svg width="36" height="36" viewBox="0 0 16 16" fill="rgba(240,246,255,0.15)">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </motion.div>
              <h3 className="text-lg font-bold font-mono mb-2" style={{ color: "rgba(240,246,255,0.4)" }}>
                This repository is empty
              </h3>
              <p className="font-mono text-sm mb-8" style={{ color: "rgba(240,246,255,0.2)" }}>
                No commits match your search. Try a different query.
              </p>
              <motion.button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-xl font-mono text-sm transition-all"
                style={{
                  border: "1px solid rgba(74,222,128,0.25)",
                  background: "rgba(74,222,128,0.06)",
                  color: "rgba(74,222,128,0.8)"
                }}>
                git checkout main -- show all
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer ── */}
        <motion.div className="mt-20 pt-8 text-center"
          style={{ borderTop: "1px solid rgba(240,246,255,0.05)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          <p className="font-mono text-xs" style={{ color: "rgba(240,246,255,0.1)" }}>
            <span style={{ color: "rgba(74,222,128,0.25)" }}>◉ </span>
            {GitHubCourses?.length ?? 0} commits · last push: just now · MIT License
            <span style={{ color: "rgba(74,222,128,0.25)" }}> ·</span>
            <span style={{ color: "rgba(56,189,248,0.3)" }}> 🍴 fork & learn</span>
          </p>
        </motion.div>

      </div>
    </div>
  );
}

export default GitHub;