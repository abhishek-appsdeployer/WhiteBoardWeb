import React, { useState, useRef } from "react";
import { Stage, Layer, Line, Circle, Text, Rect } from "react-konva";

import { BiText, BiRectangle, BiBrush } from "react-icons/bi";
import {
  BsPencil,
  BsCameraVideo,
  BsThreeDots,
  BsEmojiSunglasses,
  BsBell,
  BsStickyFill,
} from "react-icons/bs";
import { VscCircle, VscCommentDiscussion } from "react-icons/vsc";
import { GiAlarmClock } from "react-icons/gi";
import { Button } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";

import { HuePicker } from "react-color";

import Sticky from "./Sticky";
const DrawingArea = () => {
  const [lines, setLines] = useState([]);
  const [circles, setCircles] = useState([]);
  const [texts, setTexts] = useState([]);
  const [rectangles, setRectangles] = useState([]);
  const [draw, setDraw] = useState([]);
  const [inputtext, setInutText] = useState();
  const [notes, setNotes] = useState([]);
  const [stickyShow, setStickyShow] = useState(false);

  const [selectedTool, setSelectedTool] = useState("");
  const [selectedColor, setSelectedColor] = useState("#0055ff");
  const [brushColor, setBrushColor] = useState("#000000");
  const [lineColor, setLineColor] = useState("#000000");
  const [line1Color, setLine1Color] = useState("#000000");
  const [line2Color, setLine2Color] = useState("#000000");
  const [rectangleColor, setRectangleColor] = useState("#000000");
  const [circleColor, setCircleColor] = useState("#000000");

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
    }
  };

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

  const lineTools = ["line", "line2", "line3", "line4"];

  const handleUndo = () => {
    if (lineTools.includes(selectedTool)) {
      const lastLine = lines[lines.length - 1];
      setLines(lines.slice(0, -1));
    } else if (selectedTool === "circle") {
      setCircles(circles.slice(0, circles.length - 1));
    } else if (selectedTool === "text") {
      setTexts(texts.slice(0, texts.length - 1));
    } else if (selectedTool === "rectangle") {
      setRectangles(rectangles.slice(0, rectangles.length - 1));
    }
  };

  const handleClear = () => {
    setLines([]);
    setCircles([]);
    setTexts([]);
    setRectangles([]);
    setNotes([]);
  };
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
      default:
        break;
    }
    console.log(color.hex);
    console.log("line1", line1Color);
    console.log("line2", line2Color);

    console.log("line", lineColor);
  };

  const handleCircleDragMove = (e, i) => {
    const updatedCircles = [...circles];
    const newRadius =
      Math.abs(e.target.x() - circles[i].x) +
      Math.abs(e.target.y() - circles[i].y);
    updatedCircles[i].radius = newRadius;
    setCircles([...updatedCircles]);
  };
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

  const handleNoteChange = (index, newText) => {
    const updatedNotes = [...notes];
    updatedNotes[index].text = newText;
    setNotes(updatedNotes);
  };
  const handleNoteDelete = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    // const del=notes[index]
    // const res=notes.filter((item)=>item!==del)
    // setNotes(res)
  };
  // share
  const shareUrl = window.location.href;

  const sharePage = async () => {
    try {
      await navigator.share({
        title: "Draw",
        text: "Check out this page!",
        url: shareUrl,
      });
    } catch (error) {
      console.error("Error sharing page:", error);
    }
  };

  return (
    <>
      <div className=" p-1 border-danger bg-gray drawmain">
        {/* new header */}
        <div className="d-flex flex-column gap-2 flex-lg-row justify-content-between m-2">
          <p className="d-flex gap-2 bgwhite p-2">
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>Whiteboard</p>
            <p>|</p>
            <p>User Board</p>
          </p>

          <div className="bgwhite d-flex gap-3">
            <GiAlarmClock size={23} />

            <VscCommentDiscussion size={23} />

            <BsCameraVideo size={23} />
            <BsThreeDots size={23} />
            <BsEmojiSunglasses size={23} />
            <BsBell size={23} />
          </div>

          <div className=" d-flex gap-3 round-2">
            <p className="circ"></p>
            <p className="present text-light h6">Present</p>
            <p className="present text-light h6" onClick={sharePage}>
              Share
            </p>
          </div>
        </div>
        <div>
          {/* options */}
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
          {/* options */}
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
              <div onClick={handleClear}>
                {" "}
                <i
                  className="fas fa-trash text-dark t p-2 "
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
            </div>
          </div>
          {/* <StickyNote/> */}
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
                    line.color
                    // line.line ? lineColor :
                    // line.line2 ? line1Color :
                    // line.line3 ? line2Color :
                    // brushColor
                  }
                  // strokeWidth={line.line ?5: 80}
                  strokeWidth={
                    line.line ? 2 : line.line2 ? 10 : line.line3 ? 20 : 80
                  }
                  // ref={line.line ? line.ref : brushRef.current}
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
      {/* Modal code */}
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
          {/* save */}
            Saves
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DrawingArea;
