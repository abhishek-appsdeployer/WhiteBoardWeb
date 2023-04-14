import React, { useState, useRef } from 'react';
import { Stage, Layer, Line, Circle, Text ,Rect} from 'react-konva';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare,faText } from '@fortawesome/free-solid-svg-icons';
import { faPlay} from '@fortawesome/free-solid-svg-icons';
import { BiText } from 'react-icons/bi';

const DrawingArea = () => {
  const [lines, setLines] = useState([]);
  const [circles, setCircles] = useState([]);
  const [texts, setTexts] = useState([]);
  const [rectangles, setRectangles] = useState([]);
 

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
   else if (selectedTool === 'rectangle') {
    setRectangles([...rectangles, { x: pos.x, y: pos.y, width: 0, height: 0 }]);
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
    } else if (selectedTool === 'rectangle') {
      let lastRectangle = rectangles[rectangles.length - 1];
      if (lastRectangle) {
        const width = point.x - lastRectangle.x;
        const height = point.y - lastRectangle.y;
        lastRectangle.width = width;
        lastRectangle.height = height;
        setRectangles([...rectangles]);
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
    const newX = e.target.x() + e.target.getStage().getPointerPosition().x;
    const newY = e.target.y() + e.target.getStage().getPointerPosition().y;
    updatedTexts[i].x = newX;
    updatedTexts[i].y = newY;
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
    else if (selectedTool === 'rectangle') {
      setRectangles(rectangles.slice(0, rectangles.length - 1));
    }
  };

  const handleClear = () => {
    setLines([]);
    setCircles([]);
    setTexts([]);
    setRectangles([])
  };
 
  return (
    <>
<h1 className='text-center p-2 text-success'>WhiteBoard</h1>
   
    <div className="text-center text-dark border m-1 border-danger">
    <div>
    <div className="d-flex gap-5 ">
      <div className="bg-dark d-flex gap-5 m-2 ">
        <div onClick={() => setSelectedTool('line')} > <i className="fas fa-pencil text-light p-3 " style={{ fontSize: '35px' }}></i></div>
        <div onClick={()=> setSelectedTool('circle')}> <i className="fas fa-circle text-light p-3 " style={{ fontSize: '35px' }}></i></div>
        
        <div  onClick={() => setSelectedTool('rectangle')} > <FontAwesomeIcon style={{ fontSize: '35px' }} className="text-light p-3 " icon={faSquare} /></div>
        
<div onClick={() => setSelectedTool('text')}className='mt-3'>
  <BiText color='white' size={40} />
</div>


        <div onClick={handleUndo} > <i className="fas fa-undo text-light p-3 " style={{ fontSize: '35px' }}></i></div>
        <div onClick={handleClear} > <i className="fas fa-trash text-light p-3 " style={{ fontSize: '35px' }}></i></div>
        </div>

      
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
    
      <Stage
        width={window.innerWidth * 0.9}
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
              draggable={true}
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
draggable={true}
globalCompositeOperation={'source-over'}
/>
))}
{rectangles.map((rectangle, i) => (
      <Rect
        key={i}
        x={rectangle.x}
        y={rectangle.y}
        width={rectangle.width}
        height={rectangle.height}
        stroke="#df4b26"
        strokeWidth={2}
        draggable={selectedTool === 'rectangle'}
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
onDragMove={(e) => handleTextDragMove(e, i)}
globalCompositeOperation={'source-over'}
/>
))}
</Layer>
</Stage>


</div>
 </>
);
};

export default DrawingArea;
