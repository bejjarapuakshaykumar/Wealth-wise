import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FloatingAIButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the button when already on /ai page
  if (location.pathname === "/ai") return null;

  const goToAIPage = () => {
    navigate("/ai");
  };

  return (
    <div
      className="fixed bottom-6 right-6 cursor-pointer z-50"
      onClick={goToAIPage}
    >
      {/* ✅ Just the main image — no extra symbol */}
      <img
        src="/ai-button.png" // 👈 your image path (keep in /public)
        alt="AI Chat Button"
        className="w-16 h-16 drop-shadow-lg hover:scale-110 transition-transform"
      />
    </div>
  );
};

export default FloatingAIButton;
