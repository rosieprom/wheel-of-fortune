import { Button } from "@nextui-org/react";
import React, { useRef, useEffect, useState } from "react";
import { generateRandomColors } from "../utils/generate-random-colour";

interface WheelProps {
  items: string[];
  onSpinEnd: (prize: string) => void;
}

const Wheel: React.FC<WheelProps> = ({ items, onSpinEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [colors, setColors] = useState<string[]>([]);

  const spin = () => {
    setSpinning(true);
    const randomRotation = Math.floor(Math.random() * 360) + 720; // At least 2 full rotations
    setRotation(randomRotation);
    const prizeIndex = Math.floor(rotation % 360);
    onSpinEnd(items[prizeIndex]);
  };

  useEffect(() => {
    setColors(generateRandomColors(items.length));
  }, [items.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2 - 10;
    const centerX = width / 2;
    const centerY = height / 2;
    const numberOfParts = items.length;
    const angleStep = (2 * Math.PI) / numberOfParts;

    // Clear the canvas
    context.clearRect(0, 0, width, height);

    // Draw each segment
    items.forEach((item, index) => {
      const startAngle = angleStep * index;
      const endAngle = startAngle + angleStep;

      // Draw the segment
      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, radius, startAngle, endAngle);
      context.closePath();

      // Set segment color
      context.fillStyle = colors[index % colors.length];
      context.fill();

      // Draw text in the segment
      context.save();
      context.translate(centerX, centerY);
      context.rotate(startAngle + angleStep / 2);
      context.textAlign = "right";
      context.fillStyle = "#000"; // Text color
      context.font = "20px Arial"; // Text font
      context.fillText(item, radius - 10, 10); // Adjust position as needed
      context.restore();
    });

    // Apply rotation if needed
    context.save();
    context.translate(centerX, centerY);
    context.rotate((rotation * Math.PI) / 180); // Convert degrees to radians
    context.translate(-centerX, -centerY);
    context.restore();
  }, [items, rotation, spinning, colors]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{
          transition: spinning ? "transform 2s ease-out" : "none",
          transform: `rotate(${rotation}deg)`,
        }}
        data-testid="wheel"
      />
      <Button onClick={spin} disabled={spinning}>
        Spin
      </Button>
    </div>
  );
};

export default Wheel;
