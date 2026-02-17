import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Rocket, Trophy, BookOpen, Users, Award } from "lucide-react";

function AboutSection() {
  const features = [
    {
      icon: <BookOpen size={20} />,
      color: "from-red-600 to-red-500",
      title: "Beginner to Advanced Level Courses",
      description: "Structured learning paths for all skill levels"
    },
    {
      icon: <Rocket size={20} />,
      color: "from-yellow-500 to-yellow-400",
      title: "Real World Projects & Practice",
      description: "Build portfolio-ready applications"
    },
    {
      icon: <Trophy size={20} />,
      color: "from-red-500 to-yellow-500",
      title: "Interview Preparation & Career Roadmap",
      description: "Get job-ready with proven strategies"
    }
  ];

  const stats = [
    { icon: <Users size={24} />, value: 50000, label: "Active Students", suffix: "+" },
    { icon: <Code2 size={24} />, value: 100, label: "Free Courses", suffix: "+" },
    { icon: <Award size={24} />, value: 95, label: "Success Rate", suffix: "%" }
  ];

  return (
    <section 
      className="bg-black text-white py-20 px-6"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            id="about-heading"
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
              CodeTube
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your trusted platform for mastering coding, AI, and technical skills
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
                alt="Students learning coding and programming on CodeTube platform"
                className="rounded-2xl shadow-2xl w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                width="600"
                height="400"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 via-transparent to-yellow-500/20 rounded-2xl"></div>
              
              {/* Floating Badge with Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md px-6 py-3 rounded-xl border border-red-600/30"
              >
                <p className="text-sm text-gray-400">Trusted by</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                  <CountUp end={50000} suffix="+" /> Learners
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Learn Coding & Technology{" "}
              <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
                The Smart Way
              </span>
            </h3>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              CodeTube is a modern e-learning platform offering comprehensive tutorials 
              in <strong className="text-white">Coding</strong>, <strong className="text-white">Machine Learning</strong>, 
              <strong className="text-white"> Artificial Intelligence</strong>, and <strong className="text-white">Data Structures & Algorithms</strong>. 
              Our mission is to make technical education simple, practical, and accessible for everyone.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-red-600/50 transition-all duration-300 group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl font-semibold shadow-xl shadow-red-600/40 hover:shadow-red-600/60 transition-all duration-200"
              aria-label="Explore all available courses on CodeTube"
            >
              Explore All Courses
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Section with Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

// Animated Counter Component
function CountUp({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Stat Card Component
function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm hover:border-red-600/50 transition-all duration-300"
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-600 to-yellow-500 rounded-xl flex items-center justify-center">
        {stat.icon}
      </div>
      <h4 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
        <CountUp end={stat.value} suffix={stat.suffix} />
      </h4>
      <p className="text-gray-400">{stat.label}</p>
    </motion.div>
  );
}

export default AboutSection;