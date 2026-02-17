import React from "react";

function Wave({ flip = false }) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${
        flip ? "rotate-180" : ""
      }`}
    >
      <svg
        viewBox="0 0 1440 120"
        className="w-full h-[100px]"
        preserveAspectRatio="none"
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />   {/* red-600 */}
            <stop offset="100%" stopColor="#facc15" /> {/* yellow-400 */}
          </linearGradient>
        </defs>

        {/* Wave Path */}
        <path
          d="M0,64L60,80C120,96,240,128,360,122.7C480,117,600,75,720,69.3C840,64,960,96,1080,101.3C1200,107,1320,85,1380,74.7L1440,64V120H0Z"
          fill="url(#waveGradient)"
        />
      </svg>
    </div>
  );
}

export default Wave;
