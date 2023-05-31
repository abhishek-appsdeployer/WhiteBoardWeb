import React, { useState } from 'react';
import { Popover } from 'react-bootstrap';
import { BsCCircle, BsSquare, BsStickiesFill } from 'react-icons/bs';

const CustomStickyPopover = ({ setSelectedColor, handleAddNote }) => {
  const colors = [
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
  ];

  const [selectedShape, setSelectedShape] = useState(null);

  return (
    <Popover id="popover-basic">
      <Popover.Body>
        <div style={{ display: 'flex' }}>
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => setSelectedColor(color)}
              style={{
                backgroundColor: color,
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                margin: '6px',
                cursor: 'pointer',
                boxShadow: selectedShape === color ? '0 0 0 3px #000' : 'none',
              }}
            ></div>
          ))}
        </div>
        <div
          onClick={() => {
            handleAddNote(200, 300, 'Rectangle');
            setSelectedShape('Rectangle');
          }}
          style={{ padding: '12px', backgroundColor: selectedShape === 'Rectangle' ? '#999' : 'transparent',width:"40px",borderRadius:"20px" }}
        >
          <BsStickiesFill />
        </div>
        <div
          onClick={() => {
            handleAddNote(200, 200, 'circle');
            setSelectedShape('circle');
          }}
          style={{ padding: '12px', backgroundColor: selectedShape === 'circle' ? '#999' : 'transparent',width:"40px",borderRadius:"20px"  }}
        >
          <BsCCircle />
        </div>
        <div
          onClick={() => {
            handleAddNote(200, 200, 'square');
            setSelectedShape('square');
          }}
          style={{ padding: '12px', backgroundColor: selectedShape === 'square' ? '#999' : 'transparent',width:"40px",borderRadius:"20px"  }}
        >
          <BsSquare />
        </div>
      </Popover.Body>
    </Popover>
  );
};

export default CustomStickyPopover;
