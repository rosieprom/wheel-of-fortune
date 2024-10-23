import { Button } from "@nextui-org/react";
import React, { useRef, useEffect, useState } from "react";
import { generateRandomColors } from "../utils/generate-random-colour";

interface WheelProps {
  items: string[];
}

const Wheel: React.FC<WheelProps> = ({ items }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [colors, setColors] = useState<String[]>([]);
  const [prize, setPrize] = useState("");

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
      context.fillStyle = colors[index % colors.length] as any;
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

  useEffect(() => {
    // Draw the marker
    const marker = markerRef.current;
    if (!marker) return;
    const markerContext = marker.getContext("2d");
    if (!markerContext) return;

    markerContext.clearRect(0, 0, marker.width, marker.height);
    markerContext.beginPath();
    markerContext.moveTo(75, 50);
    markerContext.lineTo(100, 75);
    markerContext.lineTo(100, 25);
    markerContext.closePath();
    markerContext.fillStyle = "#991b1b";
    markerContext.fill();
  }, []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const randomRotation = Math.floor(Math.random() * 360) + 720; // At least 2 full rotations
    setRotation(randomRotation);

    setTimeout(() => {
      setSpinning(false);
      const normalizedRotation = randomRotation % 360;
      const anglePerItem = 360 / items.length;
      const index =
        Math.floor((360 - normalizedRotation) / anglePerItem) % items.length;
      setPrize(items[index]);
    }, 3000); // Spin duration
  };

  return (
    <div className="overflow-hidden">
      <canvas
        ref={markerRef}
        width={100}
        height={100}
        className="relative z-10 top-72 left-[400px]"
      />
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
      {prize && <p>Congratulations! You won: {prize}</p>}
    </div>
  );
};

export default Wheel;
