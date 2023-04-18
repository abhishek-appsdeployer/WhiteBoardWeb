import React, { useState, useRef } from 'react';
import { Stage, Layer, Line, Circle, Text ,Rect} from 'react-konva';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare,faText } from '@fortawesome/free-solid-svg-icons';
import { faPlay} from '@fortawesome/free-solid-svg-icons';
import { BiText } from 'react-icons/bi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ColorPicker from './ColorPicker';
import { SliderPicker, HuePicker } from 'react-color';
const DrawingArea = () => {
  const [lines, setLines] = useState([]);
  const [circles, setCircles] = useState([]);
  const [texts, setTexts] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [draw,setDraw]=useState([])
  const [inputtext,setInutText]=useState()

  const [selectedTool, setSelectedTool] = useState('');
  const [selectedColor, setSelectedColor] = useState('#0055ff');
  const isDrawing = useRef(false);
 
  const lineRef = useRef(); // Ref to keep track of current line
  const brushRef = useRef(); 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    if (selectedTool === 'line') {
        const newLine = {
            points: [pos.x, pos.y],
            line: true,
            ref: React.createRef()
          };
          setLines([...lines, newLine]);
          lineRef.current = newLine.ref; // Update line ref
      setDraw([...draw, { points: [pos.x, pos.y] }])
    } else if (selectedTool === 'circle') {
      setCircles([...circles, { x: pos.x, y: pos.y, radius: 0 }]);
      setDraw([...draw, { x: pos.x, y: pos.y, radius: 0 }])
    }
   else if (selectedTool === 'rectangle') {
    setRectangles([...rectangles, { x: pos.x, y: pos.y, width: 0, height: 0 }]);
    setDraw([...draw, { x: pos.x, y: pos.y, width: 0, height: 0 }])
  }
  else if (selectedTool === 'brush') {
    const newBrushLine = {
        points: [pos.x, pos.y],
        brush: true,
        ref: React.createRef()
      };
      setLines([...lines, newBrushLine]);
      brushRef.current = newBrushLine.ref; // Update brush ref
    }
   
  
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (selectedTool === 'line') {
        const newLine = {
            ...lines[lines.length - 1],
            points: lines[lines.length - 1].points.concat([point.x, point.y])
          };
          lines.splice(lines.length - 1, 1, newLine);
          setLines([...lines]);
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
    else if (selectedTool === 'brush') {
        const newBrushLine = {
            ...lines[lines.length - 1],
            points: lines[lines.length - 1].points.concat([point.x, point.y])
          };
          lines.splice(lines.length - 1, 1, newBrushLine);
          setLines([...lines]);
        }
  };
  
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

 

  const handleTextDragMove = (e, i) => {
    const updatedTexts = [...texts];
    const newX = e.target.x();
    const newY = e.target.y();
    updatedTexts[i].x = newX;
    updatedTexts[i].y = newY;
    setTexts([...updatedTexts]);
  };
  
  

  const handleUndo = () => {
    if (selectedTool === 'line') {
        const lastLine = lines[lines.length - 1];
        // Add last line to undo stack
        setLines(lines.slice(0, -1)); 
    
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
  const handleSaveChanges = () => {
    // Function to handle the "Save Changes" button click in the modal
    if (inputtext) {
      alert(inputtext)
      /// Close the modal
      setSelectedTool('text')
      setTexts([...texts, { x: 100, y: 100, text: inputtext, fontSize: 16 }])
      setInutText()
    setShow(false)
    }
  }
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    // alert(`Selected color: ${color.hex}`);
    console.log(color.hex)
  };
  return (
    <>
<h1 className='text-center p-2 text-success'>WhiteBoard</h1>
   
    <div className="text-center text-dark border m-1 border-danger">
    <div>
    <div className="d-flex gap-1  ">
      <div className="bg-dark d-flex gap-0.2 gap-md-3 gap-lg-5' m-2 ">
        <div onClick={() => setSelectedTool('line')} > <i className="fas fa-pencil text-light p-3 " style={{ fontSize: '35px' }}></i></div>
        <div onClick={()=> setSelectedTool('circle')}> <i className="fas fa-circle text-light p-3 " style={{ fontSize: '35px' }}></i></div>
        <div
          variant="light"
          onClick={() => setSelectedTool('brush')}
          className={selectedTool === 'brush' ? 'active' : ''}
        >
          {/* <FontAwesomeIcon icon={faPaintBrush} /> */}
          <i className="fas fa-brush text-light p-3 " style={{ fontSize: '35px' }}></i>
        </div>
        <div  onClick={() => setSelectedTool('rectangle')} > <FontAwesomeIcon style={{ fontSize: '35px' }} className="text-light p-3 " icon={faSquare} /></div>
        
{/* <div onClick={() => setSelectedTool('text')}className='mt-3'> */}
<div onClick={() => handleShow()}className='mt-3'>
  <BiText color='white' size={40} />
</div>


        <div onClick={handleUndo} > <i className="fas fa-undo text-light p-3 " style={{ fontSize: '35px' }}></i></div>
        <div onClick={handleClear} > <i className="fas fa-trash text-light p-3 " style={{ fontSize: '35px' }}></i></div>
        </div>
       
       

      
        </div>
        {/* color picker component */}
        {/* <ColorPicker/> */}
        <HuePicker color={selectedColor} onChange={handleColorChange} className='m-3' />

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
            stroke={selectedColor}
            strokeWidth={line.line ? 2 : 10}
            ref={line.line ? line.ref : brushRef.current}
          />
          ))}
          {circles.map((circle, i) => (
            <Circle
              key={i}
              x={circle.x}
              y={circle.y}
radius={circle.radius}
stroke={selectedColor}
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
        stroke={selectedColor}
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
  {/* Modal code */}
  <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter the text:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" className="form-control" value={inputtext} onChange={(e)=>setInutText(e.target.value)} />
          </Modal.Body>
          <Modal.Footer>

            <Button className='w-auto' variant="primary" onClick={handleSaveChanges}>
              Save 
            </Button>
          </Modal.Footer>
        </Modal>
 </>
);
};

export default DrawingArea;
