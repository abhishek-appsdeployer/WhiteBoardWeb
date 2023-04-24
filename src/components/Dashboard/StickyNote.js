import React, { useState } from "react";
import { Rect, Text, Stage, Layer } from "react-konva";

const Sticky = ({ x, y, width, height, text, draggable, onDragEnd, onChange }) => {
  return (
    <>
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="#ffffcc"
        stroke="#999966"
        strokeWidth={4}
        cornerRadius={10}
        draggable={draggable}
        onDragEnd={onDragEnd}
      />
      <Text
        x={x + 10}
        y={y + 10}
        width={width - 20}
        height={height - 20}
        text={text}
        fontFamily="Calibri"
        fontSize={20}
        fill="#333333"
        verticalAlign="middle"
        align="center"
        fontStyle="bold"
        draggable={draggable}
        onDragEnd={onDragEnd}
        onDblClick={onChange}
      />
    </>
  );
};
export default Sticky;
const StickyNote = () => {
  const [notes, setNotes] = useState([
    { x: 50, y: 50, width: 200, height: 200, text: "Note 1", draggable: true },
    { x: 300, y: 50, width: 200, height: 200, text: "Note 2", draggable: true },
    { x: 550, y: 50, width: 200, height: 200, text: "Note 3", draggable: true },
  ]);

  const [inputText, setInputText] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAddNote = () => {
    setNotes([
      ...notes,
      { x: 200, y:200, width: 200, height: 200, text: inputText, draggable: true },
    ]);
    setInputText("");
  };

  const handleNoteChange = (index, newText) => {
    const updatedNotes = [...notes];
    updatedNotes[index].text = newText;
    setNotes(updatedNotes);
  };

  return (
    <div className="App">
      <input value={inputText} onChange={handleInputChange} />
      <button onClick={handleAddNote}>Add Note</button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
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
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};


