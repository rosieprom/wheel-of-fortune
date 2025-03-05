import { Button } from "@nextui-org/react";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { colorMap } from "@/utils/colour-map";
import Confetti from "./confetti";
import WinnerModal from "./winner";

interface WheelProps {
  items: string[];
  reset: boolean;
}

const Wheel: React.FC<WheelProps> = ({ items, reset }: WheelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState("");
  const [animatingItemIndex, setAnimatingItemIndex] = useState(-1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const memoizedItems = useMemo(() => items, [items]);

  const colors = useMemo(() => {
    const totalColors = colorMap.length;
    return memoizedItems.map((_, index) => colorMap[index % totalColors]);
  }, [memoizedItems]);

  useEffect(() => {
    if (reset) {
      setRotation(0);
      setSpinning(false);
      setPrize("");
      setAnimatingItemIndex(-1);
      setIsModalOpen(false);
    }
  }, [reset]);

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

    // Clear the canvas
    context.clearRect(0, 0, width, height);

    if (memoizedItems.length === 0) {
      // Draw empty wheel
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      context.strokeStyle = "#ccc";
      context.lineWidth = 2;
      context.stroke();
    } else {
      const numberOfParts = memoizedItems.length;
      const angleStep = (2 * Math.PI) / numberOfParts;

      // Draw each segment
      memoizedItems.forEach((item, index) => {
        const startAngle = angleStep * index;
        const endAngle = startAngle + angleStep;

        // Draw the segment
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.closePath();

        // Set segment color
        context.fillStyle = colors[index].background;
        context.fill();

        // Draw text in the segment
        context.save();
        context.translate(centerX, centerY);
        context.rotate(startAngle + angleStep / 2);
        context.textAlign = "right";
        context.fillStyle = colors[index].text; // Text color: ;
        context.font = "20px Arial"; // Text font
        context.fillText(item, radius - 10, 10); // Adjust position as needed
        context.restore();

        // Animate new item being added
        if (index === animatingItemIndex) {
          context.save();
          context.globalAlpha = 0.5;
          context.beginPath();
          context.moveTo(centerX, centerY);
          context.arc(centerX, centerY, radius + 10, startAngle, endAngle);
          context.closePath();
          context.fill();
          context.restore();
        }
      });
    }

    // Apply rotation if needed
    context.save();
    context.translate(centerX, centerY);
    context.rotate((rotation * Math.PI) / 180); // Convert degrees to radians
    context.translate(-centerX, -centerY);
    context.restore();
  }, [memoizedItems, rotation, spinning, colors, animatingItemIndex]);

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
    markerContext.fillStyle = "#ff0000";
    markerContext.fill();
  }, []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setPrize(""); // Clear previous prize
    const randomRotation = Math.floor(Math.random() * 360) + 720; // At least 2 full rotations
    setRotation(randomRotation);

    // Use setTimeout to match the CSS transition duration
    setTimeout(() => {
      setSpinning(false);
      const normalizedRotation = randomRotation % 360;
      const anglePerItem = 360 / memoizedItems.length;
      const index =
        Math.floor((360 - normalizedRotation) / anglePerItem) %
        memoizedItems.length;
      setPrize(memoizedItems[index]);
      setIsModalOpen(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }, 2000); // Match this with the CSS transition duration
  };

  useEffect(() => {
    if (animatingItemIndex !== -1) {
      setTimeout(() => {
        setAnimatingItemIndex(-1);
      }, 500);
    }
  }, [animatingItemIndex]);

  useEffect(() => {
    setAnimatingItemIndex(memoizedItems.length - 1);
  }, [memoizedItems.length]);

  const closeModal = () => {
    setIsModalOpen(false);
    setShowConfetti(false);
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
          transition: spinning
            ? "transform 2s cubic-bezier(0.25, 0.1, 0.25, 1)"
            : "none",
          transform: `rotate(${rotation}deg)`,
        }}
        data-testid="wheel"
      />

      <Button onClick={spin} disabled={spinning || memoizedItems.length === 0}>
        Spin
      </Button>
      {showConfetti && <Confetti />}
      <WinnerModal
        isModalOpen={isModalOpen}
        winner={prize}
        onCloseModal={closeModal}
      />
    </div>
  );
};

export default Wheel;
