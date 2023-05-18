import React, { useState, useRef } from "react";
import { Stage, Layer, Arrow } from "react-konva";

function Lines() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [arrows, setArrows] = useState([]);
  const stageRef = useRef(null);

  const handleMouseDown = (e) => {
    const { clientX, clientY } = e.nativeEvent;
    setStartX(clientX);
    setStartY(clientY);
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const { clientX, clientY } = e.nativeEvent;
      setEndX(clientX);
      setEndY(clientY);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      const newArrow = {
        id: arrows.length + 1,
        startX,
        startY,
        endX,
        endY,
        color: "black",
        strokeWidth: 2,
      };
      setArrows([...arrows, newArrow]);
      setIsDrawing(false);
    }
  };

  return (
    <div>
      <button onClick={() => setArrows([])}>Clear Arrows</button>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: "1px solid black" }}
      >
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
        >
          <Layer>
            {arrows.map((arrow) => (
              <Arrow
                key={arrow.id}
                points={[arrow.startX, arrow.startY, arrow.endX, arrow.endY]}
                stroke={arrow.color}
                strokeWidth={arrow.strokeWidth}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default Lines;
