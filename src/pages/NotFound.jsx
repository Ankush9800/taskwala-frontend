// components/NotFound.jsx
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const attemptedPath = location.state?.from || "/404";
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background: "#1E1E2F",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* SVG Illustration */}
      <div className="mb-8 w-64 h-64 flex justify-center items-center">
        <svg width="100%" height="100%" viewBox="0 0 512 512">
          <circle cx="256" cy="256" r="256" fill="#262649" />
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            fill="#00CFFF"
            fontSize="120"
            fontWeight="bold"
            style={{
              filter: "drop-shadow(0 2px 12px #00cfffcc)",
              letterSpacing: "6px",
            }}
          >
            404
          </text>
          {/* Eyes */}
          <ellipse cx="180" cy="310" rx="16" ry="7" fill="#A855F7" opacity="0.7" />
          <ellipse cx="332" cy="310" rx="16" ry="7" fill="#A855F7" opacity="0.7" />
          {/* Green tick for success in the mascot */}
          <circle cx="220" cy="215" r="10" fill="#10B981" opacity="0.7" />
          {/* Smile */}
          <ellipse cx="256" cy="360" rx="34" ry="14" fill="#9CA3AF" opacity="0.18" />
        </svg>
      </div>
      <h1
        className="text-6xl font-black mb-2 tracking-tight drop-shadow-lg"
        style={{
          color: "#00CFFF",
          letterSpacing: "0.05em",
          marginBottom: "0.5rem",
          textShadow: "0 6px 20px #00CFFF44",
        }}
      >
        Oops!
      </h1>
      <h2
        className="text-2xl font-semibold mb-3"
        style={{
          color: "#A855F7",
        }}
      >
        Page not found
      </h2>
      <p
        className="text-lg mb-8 text-center max-w-lg"
        style={{ color: "#9CA3AF" }}
      >
        Sorry, the page{" "}
        <span
          className="rounded px-2"
          style={{ background: "#262649", color: "#F97316", fontWeight: 600 }}
        >
          {attemptedPath}
        </span>{" "}
        does not exist.
        <br />
        Let’s help you get back home!
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="px-7 py-3 rounded-xl font-bold shadow-lg transition-transform duration-200 hover:scale-105"
          style={{
            background: "#F97316",
            color: "#F5F5F5",
            boxShadow: "0 4px 32px #F9731633, 0 1px 0 #26264970",
          }}
        >
          Go Back Home
        </Link>
        <Link
          to="/campaigns"
          className="px-7 py-3 rounded-xl font-bold shadow-lg transition-transform duration-200 hover:scale-105"
          style={{
            background: "#00CFFF",
            color: "#1E1E2F",
            marginLeft: "12px",
            boxShadow: "0 4px 32px #00CFFF66, 0 1px 0 #26264980",
          }}
        >
          Explore Campaigns
        </Link>
      </div>
      {/* Optional: Success/encouragement note */}
      <p className="mt-10 text-sm" style={{ color: "#10B981" }}>
        <span role="img" aria-label="rocket">
          🚀
        </span>{" "}
        You'll always find something amazing here!
      </p>
    </div>
  );
};

export default NotFound;
