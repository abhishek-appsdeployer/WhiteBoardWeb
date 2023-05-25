import React, { useRef ,useState} from "react";
import { Rect, Text, Group, Transformer } from "react-konva";

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
  color,
  isSelected,
  onSelect,
}) => {
  const shapeRef = useRef(null);
  const textRef = useRef(null);
  const deleteButtonRef = useRef(null);
  const trRef = useRef(null);
  let timer;
console.log(isSelected)
React.useEffect(() => {
  if (isSelected) {
    // Attach transformer when the sticky is selected
    trRef.current.nodes([shapeRef.current, textRef.current, deleteButtonRef.current]);
    trRef.current.getLayer().batchDraw();

    timer = setTimeout(() => {
      trRef.current.nodes([]);
    }, 30000);
  }

  return () => {
    if (timer) {
      clearTimeout(timer);
    }
  };
}, [isSelected]);

  return (
    <React.Fragment>
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
          onClick={onSelect}
          
          ref={shapeRef}
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
          ref={textRef}
        />
        <Group x={x + width - 35} y={y} width={30} height={30} ref={deleteButtonRef}>
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
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit minimum size of the sticky
            if (newBox.width < 50 || newBox.height < 50) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Sticky;