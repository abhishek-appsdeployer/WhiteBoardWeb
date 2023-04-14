import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
const Whiteboard = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawingMode, setDrawingMode] = useState("pencil");
  const [drawing, setDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [drawingHistory, setDrawingHistory] = useState([]);
  const [undoEnabled, setUndoEnabled] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctxRef.current = ctx;
  }, []);

  const startDrawing = (e) => {
    const ctx = ctxRef.current;
    const startX = e.clientX;
    const startY = e.clientY;
    setStartX(startX);
    setStartY(startY);
    setEndX(startX); // Set initial endX and endY values to startX and startY
    setEndY(startY);
    setDrawing(true);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  };
  

  const draw = (e) => {
    const ctx = ctxRef.current;
    if (!drawing) return;
    setEndX(e.clientX);
    setEndY(e.clientY);
    switch (drawingMode) {
      case "pencil":
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        break;
      case "circle":
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(canvasRef.current, 0, 0);
        ctx.beginPath(); // Add this line to fix the error
        ctx.arc(
          startX,
          startY,
          Math.sqrt(
            Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
          ),
          0,
          2 * Math.PI
        );
        ctx.stroke();
        ctx.closePath();

        break;
      default:
        break;
    }
  };

  const endDrawing = () => {
    if (!drawing) return;
    const ctx = ctxRef.current;
    setDrawing(false);
    switch (drawingMode) {
      case "pencil":
        ctx.closePath();
        break;
      case "circle":
        ctx.beginPath(); // Add this line to fix the error
        ctx.arc(
          startX,
          startY,
          Math.sqrt(
            Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
          ),
          0,
          2 * Math.PI
        );
        ctx.stroke();
        ctx.closePath(); // Add this line to fix the error
        break;
      case "rectangle":
        const width = endX - startX;
        const height = endY - startY;
        ctx.beginPath();
        ctx.rect(startX, startY, width, height);
        ctx.stroke();
        ctx.closePath();
        break;
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineTo(startX - (endX - startX), endY);
        ctx.closePath();
        ctx.stroke();
        break;
      default:
        break;
    }
    setDrawingHistory((prevHistory) => [...prevHistory, canvasRef.current.toDataURL()]);
    setUndoEnabled(true);
  };
  

  const clearCanvas = () => {
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };
  const undoDrawing = () => {
    if (drawingHistory.length === 0) return;
    const ctx = ctxRef.current;
    const lastDrawing = drawingHistory[drawingHistory.length - 1];
    const img = new Image();
    img.src = lastDrawing;
    img.onload = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(img, 0, 0);
      setDrawingHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
      setUndoEnabled(drawingHistory.length > 1); // Check if undo is still enabled
    };
  };
  
  

  return (
    <div className="" style={{backgroundColor:"white",border:"2px solid red",margin:"10px"}}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
      />
      {/* icons */}
      <div className="d-flex gap-5 ">
      <div className="bg-dark d-flex gap-5 m-2 ">
        <div onClick={() => setDrawingMode("pencil")}> <i className="fas fa-pencil text-light p-3 " style={{ fontSize: '35px' }}></i></div>
        <div onClick={() => setDrawingMode("circle")}> <i className="fas fa-circle text-light p-3 " style={{ fontSize: '35px' }}></i></div>
        <div onClick={() => setDrawingMode("triangle")}> <FontAwesomeIcon style={{ fontSize: '35px' }} className="text-light p-3" icon={faPlay} size={60}/></div>
        <div onClick={() => setDrawingMode("rectangle")}> <FontAwesomeIcon style={{ fontSize: '35px' }} className="text-light p-3 " icon={faSquare} /></div>
        </div>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={()=>undoDrawing()}>Undo</button>
      </div>
    </div>
  );
};

export default Whiteboard;
