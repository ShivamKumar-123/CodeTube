import React from "react";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      description:
        "CodeTube helped me understand Python from scratch. The explanations are simple and practical.",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Aman Verma",
      role: "Python Learner",
    },
    {
      id: 2,
      description:
        "The DSA playlist helped me crack my internship interview. Highly structured and beginner friendly.",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Riya Sharma",
      role: "Computer Science Student",
    },
    {
      id: 3,
      description:
        "Machine Learning concepts finally make sense. The real-world examples are extremely helpful.",
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200",
      name: "Arjun Mehta",
      role: "ML Enthusiast",
    },
    {
      id: 4,
      description:
        "I built my first full stack project after following CodeTube tutorials.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
      name: "Sofia Khan",
      role: "Full Stack Developer",
    },
    {
      id: 5,
      description:
        "Clear explanations and structured roadmap. Perfect for beginners.",
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200",
      name: "Rahul Singh",
      role: "Frontend Developer",
    },
    {
      id: 6,
      description:
        "The AI and Deep Learning series is top notch. Helped me understand neural networks deeply.",
      image:
        "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
      name: "Emily Joseph",
      role: "AI Research Student",
    },
  ];

  const columns = [
    { start: 0, end: 2, className: "animate-scroll-up-1" },
    { start: 2, end: 4, className: "hidden md:block animate-scroll-up-2" },
    { start: 4, end: 6, className: "hidden lg:block animate-scroll-up-3" },
  ];

  const renderCard = (testimonial, index) => (
    <div
      key={`${testimonial.id}-${index}`}
      className="bg-neutral-900 border border-white/10 rounded-2xl p-6 mb-4 hover:border-red-600/40 hover:shadow-lg hover:shadow-red-600/10 transition-all duration-300"
    >
      {/* Quote Icon */}
      <div className="mb-4 text-red-500 text-3xl">“</div>

      <p className="text-sm text-gray-400 mb-6 leading-relaxed">
        {testimonial.description}
      </p>

      <div className="flex items-center gap-3">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full border border-red-600/30"
        />
        <div>
          <p className="text-sm text-white font-medium">
            {testimonial.name}
          </p>
          <p className="text-xs text-gray-500">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>
        {`
          @keyframes scroll-up {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .animate-scroll-up-1 { animation: scroll-up 25s linear infinite; }
          .animate-scroll-up-2 { animation: scroll-up 30s linear infinite; }
          .animate-scroll-up-3 { animation: scroll-up 20s linear infinite; }
        `}
      </style>

      <div className="bg-black flex flex-col items-center py-20 px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
              Students Say
            </span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Real feedback from developers and learners who are growing
            their careers with CodeTube.
          </p>
        </div>

        {/* Scrolling Columns */}
        <div className="relative w-full max-w-6xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[600px] overflow-hidden">
            {columns.map((col, colIndex) => (
              <div key={colIndex} className={col.className}>
                {[...testimonials.slice(col.start, col.end), ...testimonials.slice(col.start, col.end)].map(
                  (testimonial, index) =>
                    renderCard(testimonial, index)
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
