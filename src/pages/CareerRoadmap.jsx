import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  AreaChart, Area, XAxis, YAxis, Tooltip,
  BarChart, Bar, LineChart, Line,
  ResponsiveContainer, CartesianGrid, Cell,
  PieChart, Pie,
} from "recharts";
import {
  Search, ChevronDown, ChevronRight, Clock, BookOpen,
  Briefcase, TrendingUp, Target, Terminal,
  Code2, Brain, Smartphone, Database, Shield, Cloud, BarChart2,
  Flame,
} from "lucide-react";

// ── Roadmap data ──────────────────────────────────────────────────────────────
const roadmaps = [
  {
    id: 1, title: "Frontend Development", emoji: "🎨",
    description: "Master HTML, CSS, JavaScript, and modern frameworks to build stunning user interfaces.",
    duration: "6-8 months", salary: "$80k–$140k", demand: "Very High",
    color: "from-sky-500 to-sky-400", border: "border-sky-500/30",
    text: "text-sky-400", bg: "bg-sky-400/5", shadow: "shadow-sky-400/10", icon: Code2,
    tools: ["HTML5","CSS3","JavaScript","React","TypeScript","Tailwind","Vite","Git"],
    jobs: ["UI Developer","React Developer","Frontend Engineer","Web Designer"],
    phases: [
      { phase:"Phase 1", title:"Web Fundamentals", duration:"6 weeks",
        steps:[{name:"HTML & Semantic Markup",desc:"Structure, forms, accessibility"},{name:"CSS & Layouts",desc:"Flexbox, Grid, animations"}]},
      { phase:"Phase 2", title:"JavaScript Mastery", duration:"8 weeks",
        steps:[{name:"ES6+ & DOM",desc:"Modern JS patterns"},{name:"Async & APIs",desc:"Fetch, Promises, async/await"}]},
      { phase:"Phase 3", title:"React & Ecosystem", duration:"10 weeks",
        steps:[{name:"React Core",desc:"Components, hooks, state"},{name:"TypeScript + Tailwind",desc:"Type safety and utility CSS"}]},
    ],
  },
  {
    id: 2, title: "Machine Learning & AI", emoji: "🧠",
    description: "From Python basics to deploying neural networks and large language models.",
    duration: "10-14 months", salary: "$110k–$200k", demand: "Extremely High",
    color: "from-red-500 to-red-400", border: "border-red-500/30",
    text: "text-red-400", bg: "bg-red-400/5", shadow: "shadow-red-400/10", icon: Brain,
    tools: ["Python","TensorFlow","PyTorch","scikit-learn","Jupyter","Pandas","NumPy","Hugging Face"],
    jobs: ["ML Engineer","Data Scientist","AI Researcher","NLP Engineer"],
    phases: [
      { phase:"Phase 1", title:"Python & Math Foundations", duration:"8 weeks",
        steps:[{name:"Python & Libraries",desc:"NumPy, Pandas, Matplotlib"},{name:"Stats & Linear Algebra",desc:"Core ML mathematics"}]},
      { phase:"Phase 2", title:"Classical ML", duration:"10 weeks",
        steps:[{name:"Supervised Learning",desc:"Regression, classification"},{name:"Unsupervised & Clustering",desc:"K-means, PCA"}]},
      { phase:"Phase 3", title:"Deep Learning & LLMs", duration:"12 weeks",
        steps:[{name:"Neural Networks",desc:"CNNs, RNNs, Transformers"},{name:"LLM Fine-tuning",desc:"Hugging Face, LoRA"}]},
    ],
  },
  {
    id: 3, title: "Mobile Development", emoji: "📱",
    description: "Build cross-platform apps for iOS and Android with React Native or Flutter.",
    duration: "7-10 months", salary: "$90k–$160k", demand: "High",
    color: "from-green-500 to-green-400", border: "border-green-500/30",
    text: "text-green-400", bg: "bg-green-400/5", shadow: "shadow-green-400/10", icon: Smartphone,
    tools: ["React Native","Flutter","Dart","Expo","Firebase","Swift","Kotlin","App Store Connect"],
    jobs: ["Mobile Developer","iOS Engineer","Android Engineer","App Developer"],
    phases: [
      { phase:"Phase 1", title:"Mobile Fundamentals", duration:"6 weeks",
        steps:[{name:"App Architecture",desc:"Navigation, state management"},{name:"Platform APIs",desc:"Camera, GPS, notifications"}]},
      { phase:"Phase 2", title:"React Native / Flutter", duration:"10 weeks",
        steps:[{name:"Cross-platform UI",desc:"Components, animations"},{name:"Backend Integration",desc:"REST, GraphQL, Firebase"}]},
      { phase:"Phase 3", title:"Publishing & Scale", duration:"8 weeks",
        steps:[{name:"App Store Submission",desc:"iOS & Android deployment"},{name:"Performance Optimization",desc:"Profiling, crash reporting"}]},
    ],
  },
  {
    id: 4, title: "Backend Development", emoji: "⚙️",
    description: "Design scalable APIs, databases, and server infrastructure for modern applications.",
    duration: "8-11 months", salary: "$95k–$170k", demand: "Very High",
    color: "from-orange-500 to-orange-400", border: "border-orange-500/30",
    text: "text-orange-400", bg: "bg-orange-400/5", shadow: "shadow-orange-400/10", icon: Database,
    tools: ["Node.js","Python","PostgreSQL","Redis","Docker","REST","GraphQL","AWS"],
    jobs: ["Backend Engineer","API Developer","Node.js Developer","Systems Engineer"],
    phases: [
      { phase:"Phase 1", title:"Server & Language Basics", duration:"6 weeks",
        steps:[{name:"Node.js / Python",desc:"Core server programming"},{name:"HTTP & REST APIs",desc:"Express / FastAPI"}]},
      { phase:"Phase 2", title:"Databases & Caching", duration:"8 weeks",
        steps:[{name:"SQL & PostgreSQL",desc:"Schema design, queries"},{name:"Redis & Caching",desc:"Performance optimization"}]},
      { phase:"Phase 3", title:"DevOps & Scale", duration:"10 weeks",
        steps:[{name:"Docker & Containers",desc:"Deployment pipelines"},{name:"Cloud & Microservices",desc:"AWS, serverless patterns"}]},
    ],
  },
  {
    id: 5, title: "Cybersecurity", emoji: "🛡️",
    description: "Protect systems, networks, and data from evolving threats and vulnerabilities.",
    duration: "9-12 months", salary: "$100k–$180k", demand: "Extremely High",
    color: "from-violet-500 to-violet-400", border: "border-violet-500/30",
    text: "text-violet-400", bg: "bg-violet-400/5", shadow: "shadow-violet-400/10", icon: Shield,
    tools: ["Kali Linux","Wireshark","Metasploit","Burp Suite","Nmap","Python","SIEM","Splunk"],
    jobs: ["Security Analyst","Penetration Tester","SOC Engineer","Security Architect"],
    phases: [
      { phase:"Phase 1", title:"Security Fundamentals", duration:"8 weeks",
        steps:[{name:"Networking & Protocols",desc:"TCP/IP, DNS, HTTP"},{name:"Linux & Command Line",desc:"Kali, bash scripting"}]},
      { phase:"Phase 2", title:"Offensive Security", duration:"10 weeks",
        steps:[{name:"Ethical Hacking",desc:"Recon, exploitation"},{name:"Web App Pentesting",desc:"OWASP Top 10, Burp Suite"}]},
      { phase:"Phase 3", title:"Defense & Compliance", duration:"10 weeks",
        steps:[{name:"SIEM & Monitoring",desc:"Threat detection, Splunk"},{name:"Certifications",desc:"CompTIA Security+, CEH"}]},
    ],
  },
  {
    id: 6, title: "Cloud & DevOps", emoji: "☁️",
    description: "Automate infrastructure, build CI/CD pipelines, and master cloud platforms.",
    duration: "8-12 months", salary: "$105k–$185k", demand: "High (Senior Roles)",
    color: "from-blue-500 to-blue-400", border: "border-blue-500/30",
    text: "text-blue-400", bg: "bg-blue-400/5", shadow: "shadow-blue-400/10", icon: Cloud,
    tools: ["AWS","Kubernetes","Terraform","Docker","Jenkins","GitHub Actions","Ansible","Prometheus"],
    jobs: ["DevOps Engineer","Cloud Architect","SRE","Platform Engineer"],
    phases: [
      { phase:"Phase 1", title:"Linux & Networking", duration:"6 weeks",
        steps:[{name:"Linux Administration",desc:"Shell, permissions, services"},{name:"Networking Basics",desc:"VPC, subnets, routing"}]},
      { phase:"Phase 2", title:"Containers & IaC", duration:"10 weeks",
        steps:[{name:"Docker & Kubernetes",desc:"Container orchestration"},{name:"Terraform & Ansible",desc:"Infrastructure as code"}]},
      { phase:"Phase 3", title:"CI/CD & Observability", duration:"10 weeks",
        steps:[{name:"CI/CD Pipelines",desc:"GitHub Actions, Jenkins"},{name:"Monitoring & Alerting",desc:"Prometheus, Grafana"}]},
    ],
  },
];

// ── Market data ───────────────────────────────────────────────────────────────
const marketData = {
  demandScore: [
    { course: "ML & AI",       score: 98, color: "#f87171", emoji: "🧠" },
    { course: "Cybersecurity", score: 95, color: "#a78bfa", emoji: "🛡️" },
    { course: "Cloud/DevOps",  score: 88, color: "#60a5fa", emoji: "☁️" },
    { course: "Backend",       score: 85, color: "#fb923c", emoji: "⚙️" },
    { course: "Frontend",      score: 82, color: "#38bdf8", emoji: "🎨" },
    { course: "Mobile",        score: 74, color: "#4ade80", emoji: "📱" },
  ],
  salaryRange: [
    { course: "ML & AI",       min: 110, max: 200, avg: 155, color: "#f87171" },
    { course: "Cloud/DevOps",  min: 105, max: 185, avg: 145, color: "#60a5fa" },
    { course: "Cybersecurity", min: 100, max: 180, avg: 140, color: "#a78bfa" },
    { course: "Backend",       min: 95,  max: 170, avg: 132, color: "#fb923c" },
    { course: "Mobile",        min: 90,  max: 160, avg: 125, color: "#4ade80" },
    { course: "Frontend",      min: 80,  max: 140, avg: 110, color: "#38bdf8" },
  ],
  jobGrowth: [
    { year: "2021", AI: 62, Cyber: 70, Cloud: 58, Backend: 55, Frontend: 52, Mobile: 45 },
    { year: "2022", AI: 72, Cyber: 76, Cloud: 65, Backend: 60, Frontend: 58, Mobile: 50 },
    { year: "2023", AI: 85, Cyber: 82, Cloud: 74, Backend: 68, Frontend: 63, Mobile: 55 },
    { year: "2024", AI: 95, Cyber: 90, Cloud: 82, Backend: 74, Frontend: 70, Mobile: 60 },
    { year: "2025", AI: 98, Cyber: 95, Cloud: 88, Backend: 80, Frontend: 76, Mobile: 67 },
  ],
  jobShare: [
    { name: "ML & AI",       value: 28, color: "#f87171" },
    { name: "Cybersecurity", value: 22, color: "#a78bfa" },
    { name: "Cloud/DevOps",  value: 20, color: "#60a5fa" },
    { name: "Backend",       value: 16, color: "#fb923c" },
    { name: "Frontend",      value: 10, color: "#38bdf8" },
    { name: "Mobile",        value: 4,  color: "#4ade80" },
  ],
};

// ── Demand badge colours ──────────────────────────────────────────────────────
const demandColor = {
  "Very High":           "text-green-400 bg-green-400/10 border-green-400/30",
  "Extremely High":      "text-red-400 bg-red-400/10 border-red-400/30",
  "High":                "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  "High (Senior Roles)": "text-orange-400 bg-orange-400/10 border-orange-400/30",
};

// ── Per-roadmap graph data ────────────────────────────────────────────────────
function buildGraphData(roadmap) {
  const presets = {
    1: {
      radar:[{skill:"HTML/CSS",value:95},{skill:"JavaScript",value:90},{skill:"React",value:88},{skill:"TypeScript",value:80},{skill:"Testing",value:70},{skill:"Performance",value:75}],
      salary:[{year:"Jr (0-1y)",salary:65},{year:"Mid (2-3y)",salary:95},{year:"Sr (4-6y)",salary:130},{year:"Lead (7y+)",salary:160}],
      jobDemand:[{role:"UI Dev",openings:42},{role:"React Dev",openings:78},{role:"Frontend Eng",openings:65},{role:"Web Designer",openings:30}],
      weeklyProgress:[{week:"W1",hours:12},{week:"W4",hours:18},{week:"W8",hours:22},{week:"W12",hours:28},{week:"W16",hours:32},{week:"W20",hours:38},{week:"W24",hours:42}],
      accentColor:"#38bdf8",gradientFrom:"#38bdf8",gradientTo:"#0ea5e9",
    },
    2: {
      radar:[{skill:"Python",value:95},{skill:"Math/Stats",value:85},{skill:"ML Models",value:90},{skill:"Deep Learning",value:88},{skill:"NLP/LLMs",value:82},{skill:"MLOps",value:70}],
      salary:[{year:"Jr (0-1y)",salary:90},{year:"Mid (2-3y)",salary:130},{year:"Sr (4-6y)",salary:175},{year:"Lead (7y+)",salary:210}],
      jobDemand:[{role:"ML Eng",openings:95},{role:"Data Sci",openings:82},{role:"AI Res",openings:55},{role:"NLP Eng",openings:68}],
      weeklyProgress:[{week:"W1",hours:15},{week:"W4",hours:20},{week:"W8",hours:28},{week:"W12",hours:35},{week:"W16",hours:42},{week:"W20",hours:48},{week:"W24",hours:55}],
      accentColor:"#f87171",gradientFrom:"#f87171",gradientTo:"#ef4444",
    },
    3: {
      radar:[{skill:"React Native",value:90},{skill:"Flutter",value:80},{skill:"UI/UX",value:85},{skill:"APIs",value:88},{skill:"Publishing",value:75},{skill:"Performance",value:78}],
      salary:[{year:"Jr (0-1y)",salary:70},{year:"Mid (2-3y)",salary:105},{year:"Sr (4-6y)",salary:140},{year:"Lead (7y+)",salary:170}],
      jobDemand:[{role:"Mobile Dev",openings:58},{role:"iOS Eng",openings:45},{role:"Android Eng",openings:42},{role:"App Dev",openings:37}],
      weeklyProgress:[{week:"W1",hours:10},{week:"W4",hours:16},{week:"W8",hours:24},{week:"W12",hours:30},{week:"W16",hours:36},{week:"W20",hours:40},{week:"W24",hours:45}],
      accentColor:"#4ade80",gradientFrom:"#4ade80",gradientTo:"#22c55e",
    },
    4: {
      radar:[{skill:"Node/Python",value:92},{skill:"Databases",value:88},{skill:"APIs",value:90},{skill:"Caching",value:80},{skill:"Security",value:75},{skill:"Cloud",value:82}],
      salary:[{year:"Jr (0-1y)",salary:75},{year:"Mid (2-3y)",salary:110},{year:"Sr (4-6y)",salary:150},{year:"Lead (7y+)",salary:180}],
      jobDemand:[{role:"Backend Eng",openings:72},{role:"API Dev",openings:55},{role:"Node Dev",openings:48},{role:"Systems Eng",openings:35}],
      weeklyProgress:[{week:"W1",hours:12},{week:"W4",hours:18},{week:"W8",hours:25},{week:"W12",hours:32},{week:"W16",hours:38},{week:"W20",hours:44},{week:"W24",hours:50}],
      accentColor:"#fb923c",gradientFrom:"#fb923c",gradientTo:"#f97316",
    },
    5: {
      radar:[{skill:"Networking",value:90},{skill:"Linux",value:88},{skill:"Pen Testing",value:85},{skill:"Web Security",value:82},{skill:"SIEM",value:78},{skill:"Compliance",value:72}],
      salary:[{year:"Jr (0-1y)",salary:78},{year:"Mid (2-3y)",salary:115},{year:"Sr (4-6y)",salary:158},{year:"Lead (7y+)",salary:190}],
      jobDemand:[{role:"Sec Analyst",openings:88},{role:"Pen Tester",openings:62},{role:"SOC Eng",openings:70},{role:"Sec Arch",openings:45}],
      weeklyProgress:[{week:"W1",hours:14},{week:"W4",hours:20},{week:"W8",hours:26},{week:"W12",hours:34},{week:"W16",hours:40},{week:"W20",hours:46},{week:"W24",hours:52}],
      accentColor:"#a78bfa",gradientFrom:"#a78bfa",gradientTo:"#8b5cf6",
    },
    6: {
      radar:[{skill:"Linux/Shell",value:90},{skill:"Docker/K8s",value:88},{skill:"Terraform",value:85},{skill:"CI/CD",value:87},{skill:"Monitoring",value:80},{skill:"Cloud Arch",value:82}],
      salary:[{year:"Jr (0-1y)",salary:82},{year:"Mid (2-3y)",salary:120},{year:"Sr (4-6y)",salary:162},{year:"Lead (7y+)",salary:195}],
      jobDemand:[{role:"DevOps Eng",openings:80},{role:"Cloud Arch",openings:58},{role:"SRE",openings:50},{role:"Platform Eng",openings:42}],
      weeklyProgress:[{week:"W1",hours:12},{week:"W4",hours:18},{week:"W8",hours:24},{week:"W12",hours:32},{week:"W16",hours:40},{week:"W20",hours:46},{week:"W24",hours:52}],
      accentColor:"#60a5fa",gradientFrom:"#60a5fa",gradientTo:"#3b82f6",
    },
  };
  return presets[roadmap.id] ?? { radar:[], salary:[], jobDemand:[], weeklyProgress:[], accentColor:"#fff", gradientFrom:"#fff", gradientTo:"#ccc" };
}

const CustomTooltip = ({ active, payload, label, prefix = "", suffix = "" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-950/95 border border-white/10 rounded-xl px-3 py-2 text-xs shadow-2xl backdrop-blur">
      <p className="text-gray-400 mb-1">{label}</p>
      <p className="text-white font-bold">{prefix}{payload[0].value}{suffix}</p>
    </div>
  );
};

function AnimatedNumber({ value, prefix = "", suffix = "", duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const start = useRef(null);
  useEffect(() => {
    setDisplay(0); start.current = null;
    let rafId;
    const step = (ts) => {
      if (!start.current) start.current = ts;
      const p = Math.min((ts - start.current) / duration, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [value, duration]);
  return <span>{prefix}{display}{suffix}</span>;
}

// ════════════════════════════════════════════════════════════════════════════════
// ── MARKET DEMAND DASHBOARD ───────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════════════════════
function MarketDemandDashboard() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const cardStyle = {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 20,
    padding: "20px 18px",
  };

  const sectionLabel = {
    fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
    textTransform: "uppercase", color: "#6b7280", marginBottom: 16,
  };

  const tickStyle = { fill: "#4b5563", fontSize: 9 };
  const gridStroke = "rgba(255,255,255,0.04)";
  const H = 200;

  const tierBadge = (score) => {
    if (score >= 95) return { label: "🔥 Extremely High", color: "#f87171", bg: "rgba(248,113,113,0.12)" };
    if (score >= 85) return { label: "⚡ Very High",      color: "#facc15", bg: "rgba(250,204,21,0.12)" };
    if (score >= 75) return { label: "★ High",            color: "#4ade80", bg: "rgba(74,222,128,0.12)" };
    return              { label: "◆ Moderate",            color: "#94a3b8", bg: "rgba(148,163,184,0.12)" };
  };

  const growthLines = [
    { key: "AI",       color: "#f87171", label: "ML & AI" },
    { key: "Cyber",    color: "#a78bfa", label: "Cybersecurity" },
    { key: "Cloud",    color: "#60a5fa", label: "Cloud/DevOps" },
    { key: "Backend",  color: "#fb923c", label: "Backend" },
    { key: "Frontend", color: "#38bdf8", label: "Frontend" },
    { key: "Mobile",   color: "#4ade80", label: "Mobile" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mb-14"
    >
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8">
        <motion.div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg"
          style={{ boxShadow: "0 0 20px rgba(251,146,60,0.3)" }}
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flame size={20} className="text-white" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Market Demand Dashboard</h2>
          <p className="text-gray-500 text-sm mt-0.5">Live 2025 job market — demand scores, salaries & growth trends</p>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent hidden md:block" />
      </div>

      <div className="space-y-5">

        {/* ROW 1: Demand bars (2/3) + Pie (1/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Demand score horizontal bars */}
          <div style={{ ...cardStyle, gridColumn: "span 2" }} className="md:col-span-2">
            <p style={sectionLabel}>📊 Demand Score by Course (2025)</p>
            <div className="space-y-4">
              {marketData.demandScore.map((d, i) => {
                const badge = tierBadge(d.score);
                return (
                  <motion.div key={d.course}
                    initial={{ opacity: 0, x: -24 }}
                    animate={visible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.09, duration: 0.5 }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{d.emoji}</span>
                        <span className="text-white text-sm font-semibold">{d.course}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{ color: badge.color, background: badge.bg }}>
                          {badge.label}
                        </span>
                        <span className="text-xs font-extrabold tabular-nums" style={{ color: d.color }}>
                          {d.score}<span className="text-gray-600 font-normal">/100</span>
                        </span>
                      </div>
                    </div>
                    {/* Track */}
                    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <motion.div className="h-full rounded-full relative overflow-hidden"
                        style={{ background: `linear-gradient(90deg, ${d.color}70, ${d.color})` }}
                        initial={{ width: 0 }}
                        animate={visible ? { width: `${d.score}%` } : {}}
                        transition={{ delay: i * 0.09 + 0.2, duration: 0.9, ease: "easeOut" }}>
                        {/* shimmer */}
                        <motion.div className="absolute inset-0"
                          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)" }}
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 1.8, delay: i * 0.09 + 1, ease: "easeInOut" }} />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Job Market Share donut */}
          <div style={cardStyle}>
            <p style={sectionLabel}>🥧 Job Market Share</p>
            <ResponsiveContainer width="100%" height={168}>
              <PieChart>
                <Pie data={marketData.jobShare} cx="50%" cy="50%"
                  innerRadius={48} outerRadius={74} paddingAngle={3}
                  dataKey="value" isAnimationActive animationBegin={300} animationDuration={1200}>
                  {marketData.jobShare.map((entry, i) => (
                    <Cell key={i} fill={entry.color} fillOpacity={0.88} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div style={{ background:"rgba(5,5,10,0.97)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"8px 14px", fontSize:11 }}>
                      <p style={{ color:"#fff", fontWeight:700 }}>{payload[0].name}</p>
                      <p style={{ color: payload[0].payload.color }}>{payload[0].value}% share</p>
                    </div>
                  ) : null
                } />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {marketData.jobShare.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-gray-400 text-xs flex-1 truncate">{d.name}</span>
                  <span className="text-gray-500 text-xs font-bold tabular-nums">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: Salary grouped bar + Growth line chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Salary Range */}
          <div style={cardStyle}>
            <p style={sectionLabel}>💰 Salary Range by Course (k USD)</p>
            <ResponsiveContainer width="100%" height={H}>
              <BarChart data={marketData.salaryRange} margin={{ top: 4, right: 8, left: -8, bottom: 0 }} barCategoryGap="28%">
                <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="course" tick={{ ...tickStyle, fontSize: 8 }} tickLine={false} axisLine={false}
                  tickFormatter={(v) => v.split("/")[0].split(" ")[0]} />
                <YAxis tick={tickStyle} tickLine={false} axisLine={false} tickFormatter={v => `$${v}k`} />
                <Tooltip content={({ active, payload, label }) =>
                  active && payload?.length ? (
                    <div style={{ background:"rgba(5,5,10,0.97)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"10px 14px", fontSize:11 }}>
                      <p style={{ color:"#9ca3af", marginBottom:6, fontWeight:600 }}>{label}</p>
                      <p style={{ color: payload[0]?.payload?.color }}>Min: ${payload[0]?.payload?.min}k</p>
                      <p style={{ color:"#fff", fontWeight:700 }}>Avg: ${payload[0]?.payload?.avg}k</p>
                      <p style={{ color: payload[0]?.payload?.color }}>Max: ${payload[0]?.payload?.max}k</p>
                    </div>
                  ) : null
                } />
                <Bar dataKey="min" radius={[4,4,0,0]} isAnimationActive animationDuration={900}>
                  {marketData.salaryRange.map((e, i) => <Cell key={i} fill={e.color} fillOpacity={0.22} />)}
                </Bar>
                <Bar dataKey="avg" radius={[4,4,0,0]} isAnimationActive animationDuration={1100}>
                  {marketData.salaryRange.map((e, i) => <Cell key={i} fill={e.color} fillOpacity={0.65} />)}
                </Bar>
                <Bar dataKey="max" radius={[4,4,0,0]} isAnimationActive animationDuration={1300}>
                  {marketData.salaryRange.map((e, i) => <Cell key={i} fill={e.color} fillOpacity={1} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-6 mt-3 justify-center">
              {[["Min", 0.22], ["Avg", 0.65], ["Max", 1]].map(([l, op], i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ background: "#facc15", opacity: op }} />
                  <span className="text-gray-500 text-xs">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Job Growth 2021–2025 */}
          <div style={cardStyle}>
            <p style={sectionLabel}>📈 Job Growth Trend (2021–2025)</p>
            <ResponsiveContainer width="100%" height={H}>
              <LineChart data={marketData.jobGrowth} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={tickStyle} tickLine={false} axisLine={false} />
                <YAxis tick={tickStyle} tickLine={false} axisLine={false} />
                <Tooltip content={({ active, payload, label }) =>
                  active && payload?.length ? (
                    <div style={{ background:"rgba(5,5,10,0.97)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, padding:"10px 14px", fontSize:11 }}>
                      <p style={{ color:"#9ca3af", marginBottom:6, fontWeight:600 }}>{label}</p>
                      {payload.map((p, i) => (
                        <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                          <div style={{ width:8, height:8, borderRadius:"50%", background:p.color }} />
                          <span style={{ color:"#d1d5db" }}>{p.name}:</span>
                          <span style={{ color:"#fff", fontWeight:700 }}>{p.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : null
                } />
                {growthLines.map((l) => (
                  <Line key={l.key} type="monotone" dataKey={l.key} name={l.label}
                    stroke={l.color} strokeWidth={2}
                    dot={{ r: 3, fill: l.color, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: l.color }}
                    isAnimationActive animationDuration={1400} />
                ))}
              </LineChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 mt-3">
              {growthLines.map((l, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-4 h-0.5 rounded-full" style={{ background: l.color }} />
                  <span className="text-gray-400 text-xs">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 3: Demand mini-cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {marketData.demandScore.map((d, i) => {
            const badge = tierBadge(d.score);
            const roadmap = roadmaps.find((_, ri) => ri === i);
            return (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.88, y: 12 }}
                animate={visible ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07 + 0.3, type: "spring", stiffness: 200, damping: 18 }}
                whileHover={{ y: -5, scale: 1.025 }}
                className="rounded-2xl p-4 cursor-pointer relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${d.color}0d, rgba(0,0,0,0.35))`,
                  border: `1px solid ${d.color}25`,
                }}
              >
                {/* glow orb */}
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl pointer-events-none"
                  style={{ background: d.color, opacity: 0.12 }} />
                <div className="flex items-start justify-between mb-3 relative">
                  <span className="text-2xl">{d.emoji}</span>
                  <div className="text-right">
                    <div className="text-lg font-extrabold tabular-nums" style={{ color: d.color }}>{d.score}</div>
                    <div className="text-gray-600 text-xs -mt-0.5">score</div>
                  </div>
                </div>
                <p className="text-white text-sm font-bold leading-tight mb-0.5 relative">{d.course}</p>
                <p className="text-xs mb-3 relative" style={{ color: d.color + "99" }}>{roadmap?.salary}</p>
                {/* progress bar */}
                <div className="h-1.5 rounded-full overflow-hidden relative" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${d.color}80, ${d.color})` }}
                    initial={{ width: 0 }}
                    animate={visible ? { width: `${d.score}%` } : {}}
                    transition={{ delay: i * 0.07 + 0.5, duration: 1, ease: "easeOut" }} />
                </div>
                <div className="flex justify-between items-center mt-1.5">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ color: badge.color, background: badge.bg, fontSize: 9 }}>{badge.label}</span>
                  <span className="text-gray-600 text-xs tabular-nums">{d.score}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </motion.div>
  );
}

// ── Per-card graphs ───────────────────────────────────────────────────────────
function RoadmapGraphs({ roadmap, accent }) {
  const g = buildGraphData(roadmap);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const sectionClass = "rounded-2xl bg-white/3 border border-white/8 p-5 hover:bg-white/5 transition-colors duration-300";
  const labelClass = `text-xs font-bold uppercase tracking-widest ${accent.text} mb-4 flex items-center gap-2`;
  const chartHeight = 170;
  const stats = [
    { label: "Avg Salary", value: g.salary[g.salary.length - 1].salary, prefix: "$", suffix: "k/yr" },
    { label: "Job Openings", value: g.jobDemand.reduce((a, d) => a + d.openings, 0), suffix: "k+ posted" },
    { label: "Skills Covered", value: g.radar.length, suffix: " core skills" },
  ];

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }} className="mt-8 space-y-5">
      <div className="flex items-center gap-3 mb-1">
        <BarChart2 size={18} className={accent.text} />
        <h4 className={`text-lg font-bold ${accent.text}`}>Career Analytics</h4>
        <div className="flex-1 h-px bg-white/8" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
            className={`${sectionClass} text-center`}>
            <div className={`text-2xl font-extrabold ${accent.text}`}>
              {visible && <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />}
            </div>
            <div className="text-gray-500 text-xs mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={sectionClass}>
          <p className={labelClass}><span>🕸</span> Skill Coverage</p>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <RadarChart data={g.radar}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} />
              <Radar dataKey="value" stroke={g.accentColor} fill={g.accentColor} fillOpacity={0.18}
                strokeWidth={2} dot={{ r: 3, fill: g.accentColor, strokeWidth: 0 }}
                isAnimationActive animationDuration={1000} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className={sectionClass}>
          <p className={labelClass}><span>💰</span> Salary Growth (k USD)</p>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart data={g.salary} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id={`sg-${roadmap.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={g.gradientFrom} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={g.gradientTo} stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fill: "#6b7280", fontSize: 9 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={v => `$${v}k`} />
              <Tooltip content={<CustomTooltip prefix="$" suffix="k" />} />
              <Area type="monotone" dataKey="salary" stroke={g.accentColor} strokeWidth={2.5}
                fill={`url(#sg-${roadmap.id})`} dot={{ r: 4, fill: g.accentColor, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: g.accentColor }} isAnimationActive animationDuration={1200} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className={sectionClass}>
          <p className={labelClass}><span>📊</span> Job Openings (k)</p>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={g.jobDemand} margin={{ top: 4, right: 8, left: -10, bottom: 0 }} barSize={22}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="role" tick={{ fill: "#6b7280", fontSize: 9 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 9 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip suffix="k openings" />} />
              <Bar dataKey="openings" radius={[6,6,0,0]} isAnimationActive animationDuration={1000}>
                {g.jobDemand.map((_, i) => (
                  <Cell key={i} fill={g.accentColor} fillOpacity={0.5 + (i / g.jobDemand.length) * 0.5} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={sectionClass}>
          <p className={labelClass}><span>📈</span> Study Hours / Week</p>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={g.weeklyProgress} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id={`lp-${roadmap.id}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={g.gradientFrom} />
                  <stop offset="100%" stopColor={g.gradientTo} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <XAxis dataKey="week" tick={{ fill: "#6b7280", fontSize: 9 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={v => `${v}h`} />
              <Tooltip content={<CustomTooltip suffix=" hrs/week" />} />
              <Line type="monotone" dataKey="hours" stroke={`url(#lp-${roadmap.id})`} strokeWidth={3}
                dot={{ r: 4, fill: g.accentColor, strokeWidth: 0 }} activeDot={{ r: 6, fill: g.accentColor }}
                isAnimationActive animationDuration={1400} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}

function getAccent(roadmap) {
  return {
    border: roadmap.border ?? "border-white/20",
    text:   roadmap.text   ?? "text-white",
    bg:     roadmap.bg     ?? "bg-white/5",
    shadow: roadmap.shadow ?? "shadow-white/10",
    color:  roadmap.color  ?? "from-gray-500 to-gray-400",
  };
}

function RoadmapCard({ roadmap, isOpen, onToggle }) {
  const a = getAccent(roadmap);
  const IconComponent = roadmap.icon ?? Code2;
  return (
    <motion.div layout initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className={`rounded-2xl border-2 ${a.border} ${a.bg} backdrop-blur-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300`}>
      <motion.button onClick={onToggle} className="w-full p-6 text-left flex items-center gap-5" whileTap={{ scale: 0.995 }}>
        <motion.div className={`w-14 h-14 bg-gradient-to-br ${a.color} rounded-xl flex items-center justify-center shadow-lg shrink-0`}
          whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
          <IconComponent size={28} className="text-white" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {roadmap.emoji && <span className="text-xl">{roadmap.emoji}</span>}
            <h3 className="text-xl font-bold text-white">{roadmap.title}</h3>
            {roadmap.demand && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${demandColor[roadmap.demand] ?? "text-gray-400 bg-white/5 border-white/10"}`}>
                {roadmap.demand}
              </span>
            )}
          </div>
          {roadmap.description && <p className="text-gray-400 text-sm line-clamp-1">{roadmap.description}</p>}
          <div className="flex gap-4 mt-2 flex-wrap">
            {roadmap.duration && <span className="flex items-center gap-1 text-xs text-gray-500"><Clock size={12} className={a.text} /> {roadmap.duration}</span>}
            {roadmap.salary && <span className="flex items-center gap-1 text-xs text-gray-500"><TrendingUp size={12} className={a.text} /> {roadmap.salary}</span>}
            {roadmap.phases?.length > 0 && <span className="flex items-center gap-1 text-xs text-gray-500"><Target size={12} className={a.text} /> {roadmap.phases.length} Phases</span>}
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className={`${a.text} shrink-0`}>
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden">
            <div className="px-6 pb-8 border-t border-white/10 pt-6 space-y-8">
              {roadmap.description && <p className="text-gray-300 text-base leading-relaxed">{roadmap.description}</p>}
              {roadmap.phases?.length > 0 && (
                <div>
                  <h4 className={`text-lg font-bold ${a.text} mb-5 flex items-center gap-2`}><Target size={18} /> Learning Phases</h4>
                  <div className="space-y-5">
                    {roadmap.phases.map((phase, pi) => (
                      <motion.div key={pi} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: pi * 0.08 }} className="relative pl-6 border-l-2 border-white/10">
                        <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gradient-to-br ${phase.color ?? a.color} shadow-lg`} />
                        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                          <div>
                            {phase.phase && <span className="text-xs text-gray-500 uppercase tracking-widest">{phase.phase}</span>}
                            <h5 className="text-white font-bold text-base">{phase.title}</h5>
                          </div>
                          {phase.duration && (
                            <span className="flex items-center gap-1 text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                              <Clock size={11} /> {phase.duration}
                            </span>
                          )}
                        </div>
                        {phase.steps?.length > 0 && (
                          <div className="space-y-2">
                            {phase.steps.map((step, si) => (
                              <motion.div key={si} className="flex items-start gap-3 bg-white/3 hover:bg-white/5 rounded-xl p-3 transition-colors duration-200 border border-white/5"
                                whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                                <ChevronRight size={16} className={`${a.text} shrink-0 mt-0.5`} />
                                <div>
                                  <p className="text-white text-sm font-semibold">{step.name}</p>
                                  {step.desc && <p className="text-gray-500 text-xs">{step.desc}</p>}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              <RoadmapGraphs roadmap={roadmap} accent={a} />
              {roadmap.tools?.length > 0 && (
                <div>
                  <h4 className={`text-base font-bold ${a.text} mb-3 flex items-center gap-2`}><Terminal size={16} /> Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.tools.map((tool, i) => (
                      <motion.span key={i} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-white/30 hover:text-white transition-all duration-200"
                        whileHover={{ scale: 1.08, y: -2 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}>
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
              {roadmap.jobs?.length > 0 && (
                <div>
                  <h4 className={`text-base font-bold ${a.text} mb-3 flex items-center gap-2`}><Briefcase size={16} /> Job Roles You Can Apply For</h4>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.jobs.map((job, i) => (
                      <motion.span key={i} className={`text-xs font-bold px-3 py-1.5 rounded-full ${a.bg} border ${a.border} ${a.text}`}
                        whileHover={{ scale: 1.08, y: -2 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}>
                        {job}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
              {(roadmap.salary || roadmap.jobs?.length > 0) && (
                <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {roadmap.salary && (
                    <div>
                      <p className="text-gray-400 text-xs">Average Salary Range</p>
                      <p className={`text-2xl font-extrabold ${a.text}`}>{roadmap.salary}</p>
                    </div>
                  )}
                  <motion.button className={`px-6 py-3 rounded-xl bg-gradient-to-r ${a.color} text-white text-sm font-bold shadow-lg flex items-center gap-2`}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <BookOpen size={16} /> Start Learning
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
function CareerRoadmap() {
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = roadmaps.filter(
    (r) => r.title?.toLowerCase().includes(search.toLowerCase()) ||
           r.description?.toLowerCase().includes(search.toLowerCase())
  );
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const floatingIcons = [
    { Icon: Code2,      x: "5%",  y: "12%", delay: 0,   color: "text-sky-400/15",    size: 48 },
    { Icon: Brain,      x: "88%", y: "8%",  delay: 0.5, color: "text-red-500/15",    size: 44 },
    { Icon: Smartphone, x: "80%", y: "65%", delay: 1,   color: "text-green-400/15",  size: 40 },
    { Icon: Database,   x: "3%",  y: "68%", delay: 1.5, color: "text-orange-400/15", size: 40 },
    { Icon: Shield,     x: "45%", y: "90%", delay: 2,   color: "text-violet-400/15", size: 36 },
    { Icon: Cloud,      x: "25%", y: "3%",  delay: 0.3, color: "text-blue-400/15",   size: 34 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {floatingIcons.map(({ Icon, x, y, delay, color, size }, i) => (
        <motion.div key={i} className={`absolute pointer-events-none ${color}`} style={{ left: x, top: y }}
          animate={{ y: [0, -20, 0], rotate: [0, 8, -8, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6 + i * 0.5, repeat: Infinity, delay, ease: "easeInOut" }}>
          <Icon size={size} />
        </motion.div>
      ))}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-red-500/6 rounded-full blur-[140px]"
          animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 9, repeat: Infinity }} />
        <motion.div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-400/6 rounded-full blur-[120px]"
          animate={{ scale: [1.1, 1, 1.1] }} transition={{ duration: 11, repeat: Infinity }} />
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-yellow-400/4 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 7, repeat: Infinity }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-24">

        {/* Hero */}
        <div className="text-center mb-16">
          <motion.div className="flex justify-center mb-8" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}>
            <div className="relative">
              <motion.div className="absolute rounded-2xl border-2 border-dashed border-yellow-400/40" style={{ inset: "-6px" }}
                animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-yellow-400 to-sky-400 rounded-2xl flex items-center justify-center shadow-2xl relative z-10">
                <TrendingUp size={40} className="text-white" />
              </div>
              {[1, 2].map((i) => (
                <motion.div key={i} className="absolute inset-0 rounded-2xl border border-yellow-400/20"
                  style={{ margin: `-${i * 10}px` }}
                  animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }} />
              ))}
            </div>
          </motion.div>

          <motion.h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight"
            initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", delay: 0.1 }}>
            Career{" "}
            <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-sky-400 bg-clip-text text-transparent">Roadmaps</span>
          </motion.h1>

          <motion.p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Step-by-step learning paths to land your dream tech job. Pick a track, follow the phases, and get hired.
          </motion.p>

          <motion.div className="flex justify-center gap-8 md:gap-16 mb-10 flex-wrap"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            {[
              { value: `${roadmaps.length}`,                                                 label: "Career Tracks",   color: "from-red-500 to-red-400"      },
              { value: `${roadmaps.reduce((a, r) => a + (r.phases?.length ?? 0), 0)}+`,     label: "Learning Phases", color: "from-yellow-400 to-yellow-300" },
              { value: "100%",                                                               label: "Free Resources",  color: "from-sky-400 to-sky-300"      },
              { value: `${roadmaps.reduce((a, r) => a + (r.jobs?.length ?? 0), 0)}+`,       label: "Job Roles",       color: "from-green-400 to-green-300"  },
            ].map((s, i) => (
              <motion.div key={i} className="text-center" whileHover={{ scale: 1.1, y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                <div className={`text-2xl md:text-3xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
                <div className="text-gray-500 text-xs mt-1 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="relative max-w-xl mx-auto" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <motion.input type="text" placeholder="Search career tracks..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white placeholder-gray-600 focus:border-yellow-400 focus:outline-none transition-all duration-300 text-sm backdrop-blur-xl"
              whileFocus={{ scale: 1.01 }} />
          </motion.div>
          {search && (
            <motion.p className="text-gray-500 text-sm mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Found <span className="text-yellow-400 font-bold">{filtered.length}</span> track{filtered.length !== 1 ? "s" : ""}
            </motion.p>
          )}
        </div>

        {/* ══════════════════════════════════════════════════ */}
        {/* Market Demand Dashboard — shown when not searching */}
        {/* ══════════════════════════════════════════════════ */}
        {!search && <MarketDemandDashboard />}

        {/* Accordion */}
        <motion.div className="space-y-4"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          initial="hidden" animate="visible">
          {filtered.length > 0 ? (
            filtered.map((roadmap) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap}
                isOpen={openId === roadmap.id} onToggle={() => toggle(roadmap.id)} />
            ))
          ) : (
            <motion.div className="text-center py-24" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
              <motion.div className="text-8xl mb-6 inline-block"
                animate={{ rotate: [0, -15, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}>
                🗺️
              </motion.div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-3">No Roadmap Found</h3>
              <p className="text-gray-500 mb-6">Try a different keyword.</p>
              <motion.button onClick={() => setSearch("")}
                className="px-6 py-2.5 rounded-full border-2 border-yellow-400 text-yellow-400 text-sm font-semibold hover:bg-yellow-400/10 transition-all"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Clear Search
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default CareerRoadmap;