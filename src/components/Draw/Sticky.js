import React from "react";
import { Rect, Text,  Group } from "react-konva";

// sticky components
const Sticky = ({
  x,
  y,
  width,
  height,
  text,
  draggable,
  onDragEnd,
  onChange,
  onDelete,
  color
}) => {
  return (
    <Group>
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
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
      <Group x={x + width - 35} y={y} width={30} height={30}>
        <Rect
          width={30}
          height={30}
          fill="red"
          cornerRadius={15}
          onClick={onDelete}
        />
        <Text
          x={10}
          y={5}
          text="-"
          fontFamily="FontAwesome"
          fontSize={20}
          fill="white"
          verticalAlign="middle"
          align="center"
        />
      </Group>
    </Group>
  );
};

export default Sticky;

