"use client";

import { useState, useEffect } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

interface ConfettiProps {
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ duration = 6000 }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return showConfetti ? (
    <ReactCanvasConfetti
      width={window.innerWidth}
      height={window.innerHeight}
      onInit={({ confetti }) => {
        confetti({
          particleCount: 500,
          angle: 90,
          spread: 360,
          startVelocity: 45,
          decay: 0.9,
          gravity: 1,
          ticks: 600,
          shapes: ["square", "circle", "star"],
          origin: {
            x: 0.5,
            y: 0.5,
          },
          colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
          scalar: 1.5,
        });
      }}
    />
  ) : null;
};

export default Confetti;
