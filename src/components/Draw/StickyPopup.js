import React from "react";
import { Rect, Text } from "react-konva";
import { AiOutlineCheck } from "react-icons/ai";
import { BiText } from "react-icons/bi";

function StickyPopup({
  x,
  y,
  onClose,
  onColorChange,
  handleText,
  onIncreaseFontSize,
  onDecreaseFontSize,
}) {
  const colorOptions = ["red", "green", "blue"];
  var yAdjusted = y - 60;

  return (
    <React.Fragment>
      <Rect
        x={x - 20}
        y={yAdjusted}
        width={300}
        height={50}
        fill="#b3cee5"
        cornerRadius={10}
      />

      <Text
        x={x}
        y={yAdjusted + 15}
        text="T"
        onClick={handleText}
        fontSize={24}
        fontStyle="bold"
        fontFamily="Arial, sans-serif"
        fill="black"
        draggable={false}
      />

      <Text
        x={x + 40}
        y={yAdjusted + 15}
        text="+"
        onClick={onIncreaseFontSize} // Assuming "+" has the same onClick behavior as "close"
        fontSize={20}
        fontStyle="bold"
        fontFamily="Arial, sans-serif"
        fill="black"
        draggable={false}
      />

      <Text
        x={x + 60}
        y={yAdjusted + 15}
        text="-"
        onClick={onDecreaseFontSize} // Assuming "-" has the same onClick behavior as "close"
        fontSize={20}
        fontStyle="bold"
        fontFamily="Arial, sans-serif"
        fill="black"
        draggable={false}
      />

      {colorOptions.map((color, index) => (
        <Rect
          key={index}
          x={x + 80 + index * 30}
          y={yAdjusted + 15}
          width={20}
          height={20}
          fill={color}
          onClick={() => onColorChange(color)}
        />
      ))}

      
    </React.Fragment>
  );
}

export default StickyPopup;
