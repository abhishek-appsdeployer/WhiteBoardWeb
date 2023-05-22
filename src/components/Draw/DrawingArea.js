import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Circle, Text, Rect, Arrow } from "react-konva";
import Dropdown from "react-bootstrap/Dropdown";
import { BiText, BiRectangle, BiBrush } from "react-icons/bi";
import ImageUpload from "./imageUpload";
import {
  BsPencil,
  BsStickyFill,
  BsFileArrowUp,
  BsEraser,
  BsTrashFill,
  BsDownload,
  BsZoomIn,
  BsZoomOut,
  BsFillStickyFill,
} from "react-icons/bs";
import { FaRedo, FaUndoAlt } from "react-icons/fa";
import { HiOutlinePhotograph } from "react-icons/hi";
import { VscCircle } from "react-icons/vsc";

import { Button } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";

import { HuePicker } from "react-color";

import Sticky from "./sticky";
import DrawerHeader from "./drawerHeader";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';



const DrawingArea = () => {
  const stageRef = useRef(null);
  // hooks for stroing different tools in the array
  const [isOpen,setIsOpen]=useState(false)
  const [lines, setLines] = useState([]);
  const [circles, setCircles] = useState([]);
  const [texts, setTexts] = useState([]);
  const [rectangles, setRectangles] = useState([]);

  const [arrows, setArrows] = useState([]);

  const [draw, setDraw] = useState([]);
  const [inputtext, setInutText] = useState();
  const [notes, setNotes] = useState([]);
  const [stickyShow, setStickyShow] = useState(false);
  // Redo hooks
  const [linesRedoHistory, setLinesRedoHistory] = useState([]);
  const [circlesRedoHistory, setCirclesRedoHistory] = useState([]);
  const [textsRedoHistory, setTextsRedoHistory] = useState([]);
  const [rectanglesRedoHistory, setRectanglesRedoHistory] = useState([]);
  const [arrowsRedoHistory, setArrowsRedoHistory] = useState([]);
  const [imagesRedoHistory, setImagesRedoHistory] = useState([]);
  // These hooks for arrow points
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);

  const [selectedTool, setSelectedTool] = useState("");
  // hooks for different tool  color
  const [selectedColor, setSelectedColor] = useState("#0055ff");
  const [brushColor, setBrushColor] = useState("#000000");
  const [lineColor, setLineColor] = useState("#000000");
  const [line1Color, setLine1Color] = useState("#000000");
  const [line2Color, setLine2Color] = useState("#000000");
  const [rectangleColor, setRectangleColor] = useState("#000000");
  const [circleColor, setCircleColor] = useState("#000000");
  const [arrowColor, setArrowColor] = useState("#000000");
  const [scale, setScale] = useState(1);

  const isDrawing = useRef(false);

  const lineRef = useRef();
  const lineRef2 = useRef();
  const lineRef3 = useRef(); // Ref to keep track of current lines
  const brushRef = useRef();
  const eraserRef = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // iamges
  const [images, setImages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleDragEnd = (id, x, y) => {
    const updatedImages = images.map((image) =>
      image.id === id ? { ...image, x, y } : image
    );
    setImages(updatedImages);
  };

  const handleResize = (id, width, height) => {
    const updatedImages = images.map((image) =>
      image.id === id ? { ...image, width, height } : image
    );
    setImages(updatedImages);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new window.Image();
      image.src = e.target.result;
      image.onload = () => {
        const newImage = {
          id: Date.now(), // Unique identifier for the image
          src: image,
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        };
        setImages([...images, newImage]);
      };
    };

    reader.readAsDataURL(file);
  };
  // popover elements
  const popover = (

  
    <Popover id="popover-basic">
      
      <Popover.Body>
      <div style={{display:"flex"}}>
      
      <div
      onClick={()=>handleColorChange("#FF0000")}
           
            style={{
              backgroundColor: "red",
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              margin: '6px',
              cursor: 'pointer',
            }}
          >
          </div>
          
      
         
      <div
      onClick={()=>handleColorChange("#00FF00")}
           
            style={{
              backgroundColor: "green",
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              margin: '6px',
              cursor: 'pointer',
            }}
          >
          </div>
          <div
      onClick={()=>handleColorChange("#0000FF")}
           
            style={{
              backgroundColor: "blue",
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              margin: '6px',
              cursor: 'pointer',
            }}
          >
          </div>
          </div>
      <div
                  onClick={() => setSelectedTool("line")}
                  style={{ padding: "12px" }}
                >
                  <BsPencil size={20} color="red" />
                </div>
  
                <div
                  onClick={() => setSelectedTool("line2")}
                  style={{ color: "green", fontWeight: "bold", padding: "12px" }}
                >
                  <BsPencil size={20} color="green" />
                </div>
  
                <div
                  onClick={() => setSelectedTool("line3")}
                  style={{ color: "blue", fontWeight: "bold", padding: "12px" }}
                >
                  <BsPencil size={20} color="blue" />
                </div>
      </Popover.Body>
    </Popover>
  );
 
  const popoverSticky = (

  
    <Popover id="popover-basic">
      
      <Popover.Body>
      <div style={{display:"flex"}}>
      
      <div
      onClick={()=>setSelectedColor("#FF0000")}
           
            style={{
              backgroundColor: "red",
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              margin: '6px',
              cursor: 'pointer',
            }}
          >
          </div>
          
      
         
      <div
      onClick={()=>setSelectedColor("#00FF00")}
           
            style={{
              backgroundColor: "green",
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              margin: '6px',
              cursor: 'pointer',
            }}
          >
          </div>
          <div
      onClick={()=>setSelectedColor("#0000FF")}
           
            style={{
              backgroundColor: "blue",
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              margin: '6px',
              cursor: 'pointer',
            }}
          >
          </div>
          </div>
      <div
                    onClick={() => handleAddNote(200,200)}
                  style={{ padding: "12px" }}
                >
                  <BsFillStickyFill size={20} color="red" />
                </div>
  
                <div
                    onClick={() => handleAddNote(300,200)}
                  style={{ padding: "12px" }}
                >
                  <BsFillStickyFill size={20} color="red" />
                </div>
  
                <div
                    onClick={() => handleAddNote(400,400)}
                  style={{ padding: "12px" }}
                >
                  <BsFillStickyFill size={40} color="red" />
                </div>
      </Popover.Body>
    </Popover>
  );


  // fucntion for export the canvas part only
  const handleExport = () => {
    const stage = stageRef.current;
    const canvas = stage.toCanvas();

    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL("image/jpeg");

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "stage.jpg";

    // Programmatically click the link to trigger the download
    link.click();
  };
  // zoom in zoom out
  const handleZoomIn = () => {
    setScale((prevScale) => prevScale + 0.1);
  };

  const handleZoomOut = () => {
    setScale((prevScale) => (prevScale > 0.1 ? prevScale - 0.1 : prevScale));
  };

  // Functions calling when the mouse click on the board start draawing
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    if (selectedTool === "line") {
      const newLine = {
        points: [pos.x, pos.y],
        line: true,
        ref: React.createRef(),
        color: lineColor, // set the line color to lineColor1
      };
      setLines([...lines, newLine]);
      lineRef.current = newLine.ref; // Update line ref
      setDraw([...draw, { points: [pos.x, pos.y] }]);
    } else if (selectedTool === "circle") {
      setCircles([
        ...circles,
        { x: pos.x, y: pos.y, radius: 0, color: circleColor },
      ]);
      setDraw([...draw, { x: pos.x, y: pos.y, radius: 0, color: circleColor }]);
    } else if (selectedTool === "rectangle") {
      setRectangles([
        ...rectangles,
        { x: pos.x, y: pos.y, width: 0, height: 0, color: rectangleColor },
      ]);
      setDraw([
        ...draw,
        { x: pos.x, y: pos.y, width: 0, height: 0, color: rectangleColor },
      ]);
    } else if (selectedTool === "brush") {
      const newBrushLine = {
        points: [pos.x, pos.y],
        brush: true,
        ref: React.createRef(),
        color: brushColor,
      };
      setLines([...lines, newBrushLine]);
      brushRef.current = newBrushLine.ref; // Update brush ref
    } else if (selectedTool === "line2") {
      const newLine2 = {
        points: [pos.x, pos.y],
        line2: true,
        ref: React.createRef(),
        color: line1Color, // set the line color to lineColor11
      };
      setLines([...lines, newLine2]);
      lineRef2.current = newLine2.ref; // Update line2 ref
    } else if (selectedTool === "line3") {
      const newLine3 = {
        points: [pos.x, pos.y],
        line3: true,
        ref: React.createRef(),
        color: line2Color, // set the line color to lineColor1
      };
      setLines([...lines, newLine3]);
      lineRef3.current = newLine3.ref; // Update line3 ref
    } else if (selectedTool === "eraser") {
      const newEraser = {
        points: [pos.x, pos.y],
        eraser: true,
        ref: React.createRef(),
        color: "white", // set the line color to lineColor1
      };
      setLines([...lines, newEraser]);
      eraserRef.current = newEraser.ref; // Update line3 ref
    } else if (selectedTool === "arrow") {
      setStartX(pos.x);
      setStartY(pos.y);
    }
  };
  // Functions calling when the mouse move on the board for start draawing
  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (selectedTool === "line") {
      const newLine = {
        ...lines[lines.length - 1],
        points: lines[lines.length - 1].points.concat([point.x, point.y]),
      };
      lines.splice(lines.length - 1, 1, newLine);
      setLines([...lines]);
    } else if (selectedTool === "circle") {
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
    } else if (selectedTool === "rectangle") {
      let lastRectangle = rectangles[rectangles.length - 1];
      if (lastRectangle) {
        const width = point.x - lastRectangle.x;
        const height = point.y - lastRectangle.y;
        lastRectangle.width = width;
        lastRectangle.height = height;
        setRectangles([...rectangles]);
      }
    } else if (selectedTool === "brush") {
      const newBrushLine = {
        ...lines[lines.length - 1],
        points: lines[lines.length - 1].points.concat([point.x, point.y]),
      };
      lines.splice(lines.length - 1, 1, newBrushLine);
      setLines([...lines]);
    } else if (selectedTool === "line2") {
      const newLine2 = {
        ...lines[lines.length - 1],
        points: lines[lines.length - 1].points.concat([point.x, point.y]),
      };
      lines.splice(lines.length - 1, 1, newLine2);
      setLines([...lines]);
    } else if (selectedTool === "line3") {
      const newLine3 = {
        ...lines[lines.length - 1],
        points: lines[lines.length - 1].points.concat([point.x, point.y]),
      };
      lines.splice(lines.length - 1, 1, newLine3);
      setLines([...lines]);
    } else if (selectedTool === "eraser") {
      const newEraser = {
        ...lines[lines.length - 1],
        points: lines[lines.length - 1].points.concat([point.x, point.y]),
      };
      lines.splice(lines.length - 1, 1, newEraser);
      setLines([...lines]);
    } else if (selectedTool === "arrow") {
      setEndX(point.x);
      setEndY(point.y);
    }
  };
  //  // Functions calling when the mouse not click and start stop drawing
  const handleMouseUp = (e) => {
    isDrawing.current = false;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (selectedTool === "arrow") {
      const newArrow = {
        id: arrows.length + 1,
        startX,
        startY,
        endX,
        endY,
        color: arrowColor,
        strokeWidth: 2,
      };

      setArrows([...arrows, newArrow]);
    } else if (selectedTool === "rectangle") {
      let last = rectangles[rectangles.length - 1];
      if (last) {
        const width = point.x - last.x;
        const height = point.y - last.y;
        if (width >= 1 && height >= 1) {
          const newRectangle = {
            x: last.x,
            y: last.y,
            width,
            height,
            color: rectangleColor,
            strokeWidth: 2,
          };
          setRectangles([...rectangles, newRectangle]);
        } else {
          setRectangles(rectangles.slice(0, rectangles.length - 1));
        }
      }
    }
  };

  // Functions for text drag move
  const handleTextDragMove = (e, i) => {
    const updatedTexts = [...texts];
    const newX = e.target.x();
    const newY = e.target.y();
    updatedTexts[i].x = newX;
    updatedTexts[i].y = newY;
    setTexts([...updatedTexts]);
  };
  // all types of lines in the array for checking the condition for undo
  const lineTools = ["line", "line2", "line3", "brush"];

  // const handleUndo = () => {
  //   if (lineTools.includes(selectedTool)) {
  //     setLines(lines.slice(0, -1));
  //   } else if (selectedTool === "circle") {
  //     setCircles(circles.slice(0, circles.length - 1));
  //   } else if (selectedTool === "text") {
  //     setTexts(texts.slice(0, texts.length - 1));
  //   } else if (selectedTool === "rectangle") {
  //     setRectangles(rectangles.slice(0, rectangles.length - 1));
  //   } else if (selectedTool === "arrow") {
  //     setArrows(arrows.slice(0, arrows.length - 1));
  //   }
  // };
  const handleUndo = () => {
    if (lineTools.includes(selectedTool) && lines.length > 0) {
      setLines((prevLines) => {
        const lastLine = prevLines[prevLines.length - 1];
        setLinesRedoHistory((prevRedoHistory) => [
          ...prevRedoHistory,
          lastLine,
        ]);
        return prevLines.slice(0, -1);
      });
    } else if (selectedTool === "circle" && circles.length > 0) {
      setCircles((prevCircles) => {
        const lastCircle = prevCircles[prevCircles.length - 1];
        setCirclesRedoHistory((prevRedoHistory) => [
          ...prevRedoHistory,
          lastCircle,
        ]);
        return prevCircles.slice(0, -1);
      });
    } else if (selectedTool === "text" && texts.length > 0) {
      setTexts((prevTexts) => {
        const lastText = prevTexts[prevTexts.length - 1];
        setTextsRedoHistory((prevRedoHistory) => [
          ...prevRedoHistory,
          lastText,
        ]);
        return prevTexts.slice(0, -1);
      });
    } else if (selectedTool === "rectangle" && rectangles.length > 0) {
      setRectangles((prevRectangles) => {
        const lastRectangle = prevRectangles[prevRectangles.length - 1];
        setRectanglesRedoHistory((prevRedoHistory) => [
          ...prevRedoHistory,
          lastRectangle,
        ]);
        return prevRectangles.slice(0, -1);
      });
    } else if (selectedTool === "arrow" && arrows.length > 0) {
      setArrows((prevArrows) => {
        const lastArrow = prevArrows[prevArrows.length - 1];
        setArrowsRedoHistory((prevRedoHistory) => [
          ...prevRedoHistory,
          lastArrow,
        ]);
        return prevArrows.slice(0, -1);
      });
    } else if (selectedTool === "photos" && images.length > 0) {
      setImages((prevImages) => {
        const lastImage = prevImages[prevImages.length - 1];
        setImagesRedoHistory((prevRedoHistory) => [
          ...prevRedoHistory,
          lastImage,
        ]);
        return prevImages.slice(0, -1);
      });
    }
  };

  const handleRedo = () => {
    if (lineTools.includes(selectedTool) && linesRedoHistory.length > 0) {
      setLines((prevLines) => {
        const redoLine = linesRedoHistory[linesRedoHistory.length - 1];
        setLinesRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
        return [...prevLines, redoLine];
      });
    } else if (selectedTool === "circle" && circlesRedoHistory.length > 0) {
      setCircles((prevCircles) => {
        const redoCircle = circlesRedoHistory[circlesRedoHistory.length - 1];
        setCirclesRedoHistory((prevRedoHistory) =>
          prevRedoHistory.slice(0, -1)
        );
        return [...prevCircles, redoCircle];
      });
    } else if (
      selectedTool === "rectangle" &&
      rectanglesRedoHistory.length > 0
    ) {
      setRectangles((prevRectangles) => {
        const redoRectangle =
          rectanglesRedoHistory[rectanglesRedoHistory.length - 1];
        setRectanglesRedoHistory((prevRedoHistory) =>
          prevRedoHistory.slice(0, -1)
        );
        return [...prevRectangles, redoRectangle];
      });
    } else if (selectedTool === "arrow" && arrowsRedoHistory.length > 0) {
      setArrows((prevArrows) => {
        const redoArrow = arrowsRedoHistory[arrowsRedoHistory.length - 1];
        setArrowsRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
        return [...prevArrows, redoArrow];
      });
    } else if (selectedTool === "text" && textsRedoHistory.length > 0) {
      setTexts((prevtexts) => {
        const redoText = textsRedoHistory[textsRedoHistory.length - 1];
        setTextsRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
        return [...prevtexts, redoText];
      });
    } else if (selectedTool === "photos" && imagesRedoHistory.length > 0) {
      setImages((previmages) => {
        const redoImage = imagesRedoHistory[imagesRedoHistory.length - 1];
        setImagesRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
        return [...previmages, redoImage];
      });
    }
  };

  // Functions for clearing the board
  const handleClear = () => {
    setLines([]);
    setCircles([]);
    setTexts([]);
    setRectangles([]);
    setNotes([]);
    setArrows([]);
    setImages([]);
  };
  // savechanges function for inpput text
  const handleSaveChanges = () => {
    // Function to handle the "Save Changes" button click in the modal
    if (inputtext) {
      alert(inputtext);
      /// Close the modal
      setSelectedTool("text");
      setTexts([...texts, { x: 100, y: 100, text: inputtext, fontSize: 16 }]);
      setInutText();
      setShow(false);
    }
  };
  // color for different tools with diffeent color options
  const handleColorChange = (color) => {
    // Update the selected color state
    setSelectedColor(color.hex);
// alert(color)
    // Update the appropriate tool color state based on selected tool
    switch (selectedTool) {
      case "brush":
        setBrushColor(color.hex);
        break;
      case "line":
        setLineColor(color);
        break;
      case "line2":
        setLine1Color(color.hex || color);
        break;
      case "line3":
        setLine2Color(color.hex || color);
        break;
      case "rectangle":
        setRectangleColor(color.hex);
        break;
      case "circle":
        setCircleColor(color.hex);
        break;
      case "arrow":
        setArrowColor(color.hex);
        break;
      default:
        break;
    }
  };
  // Function for circle move
  const handleCircleDragMove = (e, i) => {
    const updatedCircles = [...circles];
    const newRadius =
      Math.abs(e.target.x() - circles[i].x) +
      Math.abs(e.target.y() - circles[i].y);
    updatedCircles[i].radius = newRadius;
    setCircles([...updatedCircles]);
  };
  // Function for Rectangle move
  const handleRectangleDragMove = (e, i) => {
    const updatedRectangles = [...rectangles];
    const rect = updatedRectangles[i];

    // Calculate the new position and size of the rectangle based on the drag event
    const x = e.target.x();
    const y = e.target.y();

    // Calculate the new width and height of the rectangle based on the drag position
    // const pointerPos = e.target.getStage().getPointerPosition();
    const pointerPos = e.target.getStage().getPointerPosition();
    const newWidth = pointerPos.x;
    const newHeight = pointerPos.y;

    // const node = rectRef.current;
    // const scaleX = node.scaleX();
    // const scaleY = node.scaleY();

    // Update the rectangle in the state with the new width and height
    updatedRectangles[i] = {
      x: newWidth,
      y: newHeight,
      width: newWidth,
      height: newHeight,
      color: rectangleColor,
    };

    setRectangles([...updatedRectangles]);
  };

  // sticky notes
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddNote = (w,h) => {
    setNotes([
      ...notes,
      {
        x: 100,
        y: 100,
        width: w,
        height: h,
        text: inputText,
        draggable: true,
        color:selectedColor
      },
    ]);
    setInputText("");
  };
  // edit the sticy notes function
  const handleNoteChange = (index, newText) => {
    const updatedNotes = [...notes];
    updatedNotes[index].text = newText;
    setNotes(updatedNotes);
  };
  // For delete the sticky notes
  const handleNoteDelete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    // const del=notes[index]
    // const res=notes.filter((item)=>item!==del)
    // setNotes(res)
  };

  return (
    <>
      <div
        style={{
          padding: "1px",
          borderColor: "red",
          backgroundColor: "#f5f5f5",
          overflow: "hidden",
        }}
      >
        {/* header of the board */}
        <DrawerHeader />
        <div style={{ margin: "20px" }}>
          {/* options of the color */}
          <HuePicker color={selectedColor} onChange={handleColorChange} />
          {stickyShow ? (
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                flexWrap: "wrap",
                paddingTop: "20px",
              }}
            >
              {" "}
              <label htmlFor="">
                <input value={inputText} onChange={handleInputChange} />
              </label>
              <button style={{ width: "auto" }} onClick={handleAddNote}>
                Add
              </button>
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex" }}>
          {/* options for draw in the board from icons select */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "0.2rem",
                gap: "0.2rem",
                margin: "0.2rem",
                backgroundColor: "white",
              }}
            >
             <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose={true}>
     <div
                onClick={() => setSelectedTool("line")}
                style={{ padding: "12px" }}
              >
                <BsPencil size={20} color="red" />
              </div>
    </OverlayTrigger>
            
             
              <div
                onClick={() => setSelectedTool("eraser")}
                style={{ color: "blue", fontWeight: "bold", padding: "12px" }}
              >
                <BsEraser size={20} color="blue" />
              </div>

              <div
                onClick={() => setSelectedTool("circle")}
                style={{ padding: "12px" }}
              >
                <VscCircle size={20} />
              </div>
              <div
                variant="light"
                onClick={() => setSelectedTool("brush")}
                style={{ padding: "12px" }}
              >
                <BiBrush size={20} />
              </div>
              <div
                style={{ padding: "12px" }}
                onClick={() => setStickyShow(!stickyShow)}
              >
                <BsStickyFill />
              </div>
              {/* stickynotes */}
              <OverlayTrigger trigger="click" placement="right" overlay={popoverSticky} rootClose={true}>
     <div
                onClick={() => setSelectedTool("line")}
                style={{ padding: "12px" }}
              >
                 <BsStickyFill />
              </div>
    </OverlayTrigger>

              <div
                onClick={() => setSelectedTool("rectangle")}
                style={{ padding: "12px" }}
              >
                {" "}
                <BiRectangle size={20} />
              </div>
              <div
                onClick={() => setSelectedTool("arrow")}
                style={{ padding: "12px" }}
              >
                {" "}
                <BsFileArrowUp size={20} />
              </div>

              <div onClick={() => handleShow()} style={{ padding: "12px" }}>
                <BiText color="black" size={20} />
              </div>

              <div onClick={handleUndo} style={{ padding: "12px" }}>
                {" "}
                <FaUndoAlt color="black" size={20} />
              </div>
              <div onClick={handleRedo} style={{ padding: "12px" }}>
                {" "}
                <FaRedo color="black" size={20} />
              </div>
              <div onClick={handleClear} style={{ padding: "12px" }}>
                {" "}
                <BsTrashFill size={20} />
              </div>
              <div onClick={handleExport} style={{ padding: "12px" }}>
                {" "}
                <BsDownload size={20} />
              </div>
              <div onClick={handleZoomIn} style={{ padding: "12px" }}>
                {" "}
                <BsZoomIn size={20} />
              </div>
              <div onClick={handleZoomOut} style={{ padding: "12px" }}>
                {" "}
                <BsZoomOut size={20} />
              </div>
              <div
                onClick={() => {
                  document.getElementById("imageUpload").click();
                  setSelectedTool("photos");
                }}
                style={{ padding: "12px" }}
              >
                <input
                  type="file"
                  id="imageUpload"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />{" "}
                <HiOutlinePhotograph size={20} />
              </div>
            </div>
          </div>
          {/* code for drawing boards */}
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            className="canvas-stage"
            ref={stageRef}
            scaleX={scale}
            scaleY={scale}
            style={{ background: "white" }}
          >
            <Layer>
              {arrows.map((arrow) => (
                <Arrow
                  key={arrow.id}
                  points={[arrow.startX, arrow.startY, arrow.endX, arrow.endY]}
                  stroke={arrow.color}
                  strokeWidth={arrow.strokeWidth}
                  draggable
                />
              ))}
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.color}
                  strokeWidth={
                    line.line ? 2 : line.line2 ? 10 : line.line3 ? 20 : 80
                  }
                  ref={
                    line.line
                      ? line.ref
                      : line.line2
                      ? lineRef2.current
                      : line.line3
                      ? lineRef3.current
                      : selectedTool === "brush"
                      ? brushRef.current
                      : null
                  }
                />
              ))}
              {circles.map((circle, i) => (
                <Circle
                  key={i}
                  x={circle.x}
                  y={circle.y}
                  radius={circle.radius}
                  stroke={circle.color}
                  strokeWidth={2}
                  draggable={true}
                  onDragMove={(e) => handleCircleDragMove(e, i)}
                  globalCompositeOperation={"source-over"}
                />
              ))}
              {rectangles.map((rectangle, i) => (
                <Rect
                  key={i}
                  x={rectangle.x}
                  y={rectangle.y}
                  width={rectangle.width}
                  height={rectangle.height}
                  stroke={rectangle.color}
                  strokeWidth={2}
                  draggable
                  // onTransform={(e) => handleRectTransform(e)}
                  onDragMove={(e) => handleRectangleDragMove(e, i)}
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
                  globalCompositeOperation={"source-over"}
                />
              ))}

              {notes.map((note, index) => (
                <Sticky
                  key={index}
                  {...note}
                  onDragEnd={(event) => {
                    const updatedNotes = [...notes];
                    updatedNotes[index].x = event.target.x();
                    updatedNotes[index].y = event.target.y();
                    setNotes(updatedNotes);
                  }}
                  onChange={() => {
                    const newText = prompt("Enter new text:");
                    if (newText) {
                      handleNoteChange(index, newText);
                    }
                  }}
                  onDelete={() => handleNoteDelete(index)}
                />
              ))}

              {images.length > 0 &&
                images.map((image) => (
                  <ImageUpload
                    key={image.id}
                    image={image}
                    isSelected={selectedId === image.id}
                    onSelect={() => handleSelect(image.id)}
                    onChange={(x, y) => handleDragEnd(image.id, x, y)}
                    onResize={(width, height) =>
                      handleResize(image.id, width, height)
                    }
                  />
                ))}
            </Layer>
          </Stage>
        </div>
      </div>
      {/* Modal code for text input */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter the text:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={inputtext}
            onChange={(e) => setInutText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ width: "auto" }}
            variant="primary"
            onClick={handleSaveChanges}
          >
            Saves
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DrawingArea;
