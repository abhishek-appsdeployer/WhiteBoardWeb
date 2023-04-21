import React, { useState, useRef,useEffect } from 'react';
import { Stage, Layer, Line, Circle, Text ,Rect} from 'react-konva';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare,faText } from '@fortawesome/free-solid-svg-icons';
import { faPlay} from '@fortawesome/free-solid-svg-icons';
import { BiText ,BiRectangle, BiBrush} from 'react-icons/bi';
import { BsPencil,BsCameraVideo ,BsThreeDots,BsEmojiSunglasses,BsBell} from 'react-icons/bs';
import { VscCircle,VscCommentDiscussion } from 'react-icons/vsc';
import { GiAlarmClock} from 'react-icons/gi';
import {Button,Popover , PopoverHeader, PopoverBody} from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
import ColorPicker from './ColorPicker';
import { SliderPicker, HuePicker } from 'react-color';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
const DrawingArea = () => {
  const [showPopover, setShowPopover] = useState(true);
  const [lines, setLines] = useState([]);
  const [circles, setCircles] = useState([]);
  const [texts, setTexts] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [draw,setDraw]=useState([])
  const [inputtext,setInutText]=useState()
 

  const [selectedTool, setSelectedTool] = useState('');
  const [selectedColor, setSelectedColor] = useState('#0055ff');
  const isDrawing = useRef(false);

 
  const lineRef = useRef(); 
  const lineRef2 = useRef(); 
  const lineRef3 = useRef(); // Ref to keep track of current line
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

    else if (selectedTool === 'line2') {
     
      const newLine2 = {
        points: [pos.x, pos.y],
        line2: true,
        ref: React.createRef()
      };
      setLines([...lines, newLine2]);
      lineRef2.current = newLine2.ref; // Update line2 ref
    }
    else if (selectedTool === 'line3') {
      const newLine3 = {
        points: [pos.x, pos.y],
        line3: true,
        ref: React.createRef()
      };
      setLines([...lines, newLine3]);
      lineRef3.current = newLine3.ref; // Update line3 ref
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
        else if (selectedTool === 'line2') {
          const newLine2 = {
              ...lines[lines.length - 1],
              points: lines[lines.length - 1].points.concat([point.x, point.y])
            };
            lines.splice(lines.length - 1, 1, newLine2);
            setLines([...lines]);
          }
          else if (selectedTool === 'line3') {
            const newLine3 = {
                ...lines[lines.length - 1],
                points: lines[lines.length - 1].points.concat([point.x, point.y])
              };
              lines.splice(lines.length - 1, 1, newLine3);
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
    if (selectedTool === 'line' ||"line2"||"line3" ||"line4") {
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
  const handleCircleDragMove = (e, i) => {
    const updatedCircles = [...circles];
    const newRadius = Math.abs(e.target.x() - circles[i].x) + Math.abs(e.target.y() - circles[i].y);
    updatedCircles[i].radius = newRadius;
    setCircles([...updatedCircles]);
  };
return (
    <>
<div className=" p-1 border-danger bg-gray drawmain">
    {/* new header */}
    <div className="d-flex flex-column gap-2 flex-lg-row justify-content-between m-2">
    <p className="d-flex gap-2 bgwhite p-2">
    
      <p style={{fontSize:"20px",fontWeight:"bold"}}>Whiteboard</p>
      <p>|</p>
      <p>User Board</p>
    </p>
    
    <div className="bgwhite d-flex gap-3">
    <GiAlarmClock size={23}/>
   
    <VscCommentDiscussion size={23}/>
    
    <BsCameraVideo size={23}/>
    <BsThreeDots size={23}/>
    <BsEmojiSunglasses size={23}/>
    <BsBell size={23}/>
   
    
    </div>

    <div className=" d-flex gap-3 round-2">
    <p className='circ'>

    </p>
    <p className='present text-light h6'>
      Present
    </p>
    <p className='present text-light h6'>
      Share
    </p>
    
    </div>
    </div>
    <div>
    {/* options */}
   <HuePicker color={selectedColor} onChange={handleColorChange} className='m-3' />

      </div>
    <div className="d-flex">
    {/* options */}
    <div className="d-flex flex-column gap-1  ">
      <div className=" d-flex flex-column rounded gap-0.2 gap-md-1 gap-lg-1' m-2 " style={{backgroundColor:"white"}}>
        <div onClick={() => setSelectedTool('line')}  className='p-2'><BsPencil size={20} color="red"/></div>
       
        <div onClick={() => setSelectedTool('line2')}  className='p-2' style={{color:"green",fontWeight:"bold"}}><BsPencil size={20} color="green"/></div>

        <div onClick={() => setSelectedTool('line3')}  className='p-2' style={{color:"blue",fontWeight:"bold"}}><BsPencil size={20} color="blue"/></div>

       
        <div onClick={()=> setSelectedTool('circle')} className='p-2'><VscCircle size={20}/></div>
        <div
          variant="light"
          onClick={() => setSelectedTool('brush')}
          className="p-2"
        >
          
          <BiBrush size={20} />
        </div>
        
        <div  onClick={() => setSelectedTool('rectangle')} className='p-2'> <BiRectangle size={20}/></div>
        

<div onClick={() => handleShow()}className='p-2'>
  <BiText color='black' size={20} />
</div>


        <div onClick={handleUndo} > <i className="fas fa-undo text-dark p-2 " style={{ fontSize: '20px' }}></i></div>
        <div onClick={handleClear} > <i className="fas fa-trash text-dark t p-2 " style={{ fontSize: '20px' }}></i></div>
        </div>
       
       

      
        </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
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
            stroke={
      line.line ? 'red' :
      line.line2 ? 'green' :
      line.line3 ? 'blue' :
      selectedColor
    }
            // strokeWidth={line.line ?5: 80}
            strokeWidth={line.line ? 2 : line.line2 ? 10 : line.line3 ? 20 : 80}
       

           
            // ref={line.line ? line.ref : brushRef.current}
            ref={line.line ? line.ref : line.line2 ? lineRef2.current : line.line3 ? lineRef3.current : (selectedTool === 'brush' ? brushRef.current : null)}
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
onDragMove={(e) => handleCircleDragMove(e, i)}
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
