import React, { useRef, useState, useEffect } from "react";
import { Rect, Text, Group, Transformer } from "react-konva";
import { Html } from "react-konva-utils";
const Sticky = ({
  x,
  y,
  width,
  height,
  text,
  draggable,
  handleDragEnd,
  onChange,
  onDelete,
  color,
  isSelected,
  isText,
  handleSelect ,
  onSelectText,
}) => {
  const shapeRef = useRef(null);
  const textRef = useRef(null);
  const deleteButtonRef = useRef(null);
  const transformStickyRef = useRef(null);
  const inputRef = useRef(null);

  let timer;

  useEffect(() => {
    if (isSelected) {
      transformStickyRef.current.nodes([
        shapeRef.current,
        textRef.current,
        deleteButtonRef.current,
      ]);
      transformStickyRef.current.getLayer().batchDraw();

      timer = setTimeout(() => {
        transformStickyRef.current.nodes([]);
      }, 15000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isSelected]);

  const handleInputChange = () => {
    if (inputRef.current) {
      onChange(inputRef.current.value);
    }
  };

  return (
    <>
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
          onDragEnd={handleDragEnd}
          onClick={handleSelect }
          ref={shapeRef}
        />
        <Text
          x={x + 10}
          y={y + 10}
          width={width - 20}
          height={height - 20}
          onClick={onSelectText}
          text={text}
          fontFamily="Calibri"
          fontSize={20}
          fill="#333333"
          verticalAlign="middle"
          align="center"
          fontStyle="bold"
          draggable={draggable}
          onDragEnd={handleDragEnd}
          // onDblClick={onChange}
          ref={textRef}
        />
        {isText && (
          <Html>
            <input
              ref={inputRef}
              value={text}
              placeholder="DOM input from Konva nodes"
              style={{
                position: "absolute",
                top: y + 10,
                left: x + 10,
                width: "100px",
                height: "60px",
                fontFamily: "Calibri",
                fontSize: 20,
                padding: "5px",
              }}
              onChange={handleInputChange}
            />
          </Html>
        )}
        <Group
          x={x + width - 35}
          y={y}
          width={30}
          height={30}
          ref={deleteButtonRef}
        >
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
      {isSelected && (
        <Transformer
          ref={transformStickyRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit minimum size of the sticky
            if (newBox.width < 50 || newBox.height < 50) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default Sticky;
