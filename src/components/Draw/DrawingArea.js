import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Circle, Text, Rect, Arrow } from "react-konva";

import { BiText, BiRectangle, BiBrush, BiArrowBack } from "react-icons/bi";
import {
  BsPencil,
  BsCameraVideo,
  BsThreeDots,
  BsEmojiSunglasses,
  BsBell,
  BsStickyFill,
  BsFileArrowUp,
} from "react-icons/bs";
import { VscCircle, VscCommentDiscussion } from "react-icons/vsc";
import { GiAlarmClock } from "react-icons/gi";
import { Button } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";

import { HuePicker } from "react-color";

import Sticky from "./sticky";
import DrawerHeader from "./drawerHeader";
const DrawingArea = () => {
  const stageRef = useRef(null);
  // hooks for stroing different tools in the array
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
    } else if (selectedTool === "arrow") {
      setStartX(pos.x);
      setStartY(pos.y);

      console.log(startX, startY);
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

      console.log(arrows);
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
    console.log(selectedTool);
    // Update the appropriate tool color state based on selected tool
    switch (selectedTool) {
      case "brush":
        setBrushColor(color.hex);
        break;
      case "line":
        setLineColor(color.hex);
        break;
      case "line2":
        setLine1Color(color.hex);
        break;
      case "line3":
        setLine2Color(color.hex);
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
    console.log(color.hex);
    console.log("line1", line1Color);
    console.log("line2", line2Color);

    console.log("line", lineColor);
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

  const handleAddNote = () => {
    setNotes([
      ...notes,
      {
        x: 100,
        y: 100,
        width: 300,
        height: 300,
        text: inputText,
        draggable: true,
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
      <div className=" p-1 border-danger bg-gray drawmain">
        {/* header of the board */}
        <DrawerHeader />
        <div>
          {/* options of the color */}
          <HuePicker
            color={selectedColor}
            onChange={handleColorChange}
            className="m-3"
          />
          {stickyShow ? (
            <div className="d-flex gap-1 flex-column flex-md-row">
              {" "}
              <label htmlFor="">
                <input value={inputText} onChange={handleInputChange} />
              </label>
              <button className="w-auto" onClick={handleAddNote}>
                Add
              </button>
            </div>
          ) : null}
        </div>
        <div className="d-flex">
          {/* options for draw in the board from icons select */}
          <div className="d-flex flex-column gap-1  ">
            <div
              className=" d-flex flex-column rounded gap-0.2 gap-md-1 gap-lg-1' m-2 "
              style={{ backgroundColor: "white" }}
            >
              <div onClick={() => setSelectedTool("line")} className="p-2">
                <BsPencil size={20} color="red" />
              </div>

              <div
                onClick={() => setSelectedTool("line2")}
                className="p-2"
                style={{ color: "green", fontWeight: "bold" }}
              >
                <BsPencil size={20} color="green" />
              </div>

              <div
                onClick={() => setSelectedTool("line3")}
                className="p-2"
                style={{ color: "blue", fontWeight: "bold" }}
              >
                <BsPencil size={20} color="blue" />
              </div>

              <div onClick={() => setSelectedTool("circle")} className="p-2">
                <VscCircle size={20} />
              </div>
              <div
                variant="light"
                onClick={() => setSelectedTool("brush")}
                className="p-2"
              >
                <BiBrush size={20} />
              </div>
              <div className="p-2" onClick={() => setStickyShow(!stickyShow)}>
                <BsStickyFill />
              </div>

              <div onClick={() => setSelectedTool("rectangle")} className="p-2">
                {" "}
                <BiRectangle size={20} />
              </div>
              <div onClick={() => setSelectedTool("arrow")} className="p-2">
                {" "}
                <BsFileArrowUp size={20} />
              </div>

              <div onClick={() => handleShow()} className="p-2">
                <BiText color="black" size={20} />
              </div>

              <div onClick={handleUndo}>
                {" "}
                <i
                  className="fas fa-undo text-dark p-2 "
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
              <div onClick={handleRedo}>
                {" "}
                <i
                  className="fas fa-redo text-dark p-2 "
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
              <div onClick={handleClear}>
                {" "}
                <i
                  className="fas fa-trash text-dark t p-2 "
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
              <div onClick={handleExport}>
                {" "}
                <i
                  className="fas fa-download text-dark p-2 "
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
              <div onClick={handleZoomIn}>
                {" "}
                <i
                  className="fas fa fa-search-plus text-dark p-2 "
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
              <div onClick={handleZoomOut}>
                {" "}
                <i
                  className="fas fa fa-search-minus text-dark p-2 "
                  style={{ fontSize: "20px" }}
                ></i>
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
            className="w-auto"
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
