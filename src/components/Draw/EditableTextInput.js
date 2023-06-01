import React, { useState } from "react";
import { Html } from "react-konva-utils";

function getStyle(width, height) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    border: "none",
    padding: "0px",
    margin: "0px",
    background: "none",
    outline: "none",
    resize: "none",
    color: "black",
    fontSize: "24px",
    fontFamily: "sans-serif",
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    marginTop: "-4px",
  };
}

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

export function EditableTextInput({
  x,
  y,
  width,
  height,
  value,
  onChange,
  onKeyDown,
  isEditing,
}) {
  const style = getStyle(width, height);
  const [inputValue, setInputValue] = useState(value);
  const [disable, setDisable] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const handleEscapeKeys = (e) => {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      e.preventDefault(); // Prevent the default behavior of the Enter key
      // Call any necessary logic here after Enter key press
      setDisable(true);
      // alert("enter")
    }
  };

  return (
    <Html groupProps={{ x, y }} divProps={{ backgroundColor: "red" }}>
      <textarea
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleEscapeKeys}
        // onKeyDown={onkeydown}
        style={style}
        // disabled={disable} // Disable the textarea if editing is not enabled
      />
    </Html>
  );
}
