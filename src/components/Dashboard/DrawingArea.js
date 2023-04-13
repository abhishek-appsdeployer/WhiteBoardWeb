import React, { useState, useRef } from 'react';
import { Stage, Layer, Line, Circle, Text } from 'react-konva';

const DrawingArea = () => {
  const [lines, setLines] = useState([]);
  const [circles, setCircles] = useState([]);
  const [texts, setTexts] = useState([]);
  const [selectedTool, setSelectedTool] = useState('');
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    if (selectedTool === 'line') {
      setLines([...lines, { points: [pos.x, pos.y] }]);
    } else if (selectedTool === 'circle') {
      setCircles([...circles, { x: pos.x, y: pos.y, radius: 0 }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (selectedTool === 'line') {
      let lastLine = lines[lines.length - 1];
      if (lastLine) {
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        lines.splice(lines.length - 1, 1, lastLine);
        setLines([...lines]);
      }
    } else if (selectedTool === 'circle') {
      let lastCircle = circles[circles.length - 1];
      if (lastCircle) {
        const radius =
          Math.sqrt(
            Math.pow(point.x - lastCircle.x, 2) +
              Math.pow(point.y - lastCircle.y, 2)
          ) / 2;
        lastCircle.radius = radius;
        setCircles([...circles]);
      }
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTextChange = (e, i) => {
    const updatedTexts = [...texts];
    updatedTexts[i].text = e.target.value;
    setTexts([...updatedTexts]);
  };

  const handleTextDragMove = (e, i) => {
    const updatedTexts = [...texts];
    updatedTexts[i].x += e.target.deltaX();
    updatedTexts[i].y += e.target.deltaY();
    setTexts([...updatedTexts]);
  };

  const handleUndo = () => {
    if (selectedTool === 'line') {
      setLines(lines.slice(0, lines.length - 1));
    } else if (selectedTool === 'circle') {
      setCircles(circles.slice(0, circles.length - 1));
    } else if (selectedTool === 'text') {
      setTexts(texts.slice(0, texts.length - 1));
    }
  };

  const handleClear = () => {
    setLines([]);
    setCircles([]);
    setTexts([]);
  };

  return (
    <div className="text-center text-dark border m-5 border-danger">
      <Stage
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        className="canvas-stage"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={'source-over'}
            />
          ))}
          {circles.map((circle, i) => (
            <Circle
              key={i}
              x={circle.x}
              y={circle.y}
radius={circle.radius}
stroke="#00f"
strokeWidth={2}
draggable={false}
globalCompositeOperation={'source-over'}
/>
))}
{texts.map((text, i) => (
<Text
key={i}
x={text.x}
y={text.y}
text={text.text}
fontSize={text.fontSize}
draggable={true}
globalCompositeOperation={'source-over'}
/>
))}
</Layer>
</Stage>
<div className="mt-3">
<button
className={selectedTool === 'line' ? 'btn btn-primary mx-2' : 'btn btn-outline-primary mx-2'}
onClick={() => setSelectedTool('line')}
>
Line
</button>
<button
className={selectedTool === 'circle' ? 'btn btn-primary mx-2' : 'btn btn-outline-primary mx-2'}
onClick={() => setSelectedTool('circle')}
>
Circle
</button>
<button
className={selectedTool === 'text' ? 'btn btn-primary mx-2' : 'btn btn-outline-primary mx-2'}
onClick={() => setSelectedTool('text')}
>
Text
</button>
<button className="btn btn-danger mx-2" onClick={handleUndo}>
Undo
</button>
<button className="btn btn-warning mx-2" onClick={handleClear}>
Clear
</button>
</div>
{selectedTool === 'text' && (
<div className="mt-3">
<input
type="text"
className="form-control"
placeholder="Enter text"
onChange={(e) => setTexts([...texts, { x: 100, y: 100, text: e.target.value, fontSize: 16 }])}
/>
</div>
)}
</div>
);
};

export default DrawingArea;
