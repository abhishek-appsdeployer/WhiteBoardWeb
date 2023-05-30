import React from 'react';
import { Popover } from 'react-bootstrap';
import pen1 from '../../assets/Images/pen1.png';
import pen2 from '../../assets/Images/pen2.png';
import pen3 from '../../assets/Images/pen3.jpeg';

const CustomPopover = ({ handleColorChange, setSelectedTool }) => {
  const colors = [
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFA500', // Orange
    '#800080', // Purple
    '#008000', // Dark Green
  ];

  const rows = [];
  const maxColorsPerRow = 3;

  for (let i = 0; i < colors.length; i += maxColorsPerRow) {
    const rowColors = colors.slice(i, i + maxColorsPerRow);
    const row = (
      <div key={i} style={{ display: 'flex' }}>
        {rowColors.map((color, index) => (
          <div
            key={index}
            onClick={() => handleColorChange(color)}
            style={{
              backgroundColor: color,
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              margin: '6px',
              cursor: 'pointer',
            }}
          ></div>
        ))}
      </div>
    );
    rows.push(row);
  }

  return (
    <Popover id="popover-basic">
      <Popover.Body>
        {rows}
        <div
  onClick={() => setSelectedTool("line")}
  style={{ color: "green", fontWeight: "bold", padding: "12px" }}
>
  <img
    src={pen1}
    alt=""
    style={{
      width: "80px",
      height: "3px",
      filter: "brightness(10%)", // Increase brightness to 150%
    }}
  />
</div>
<div
  onClick={() => setSelectedTool("line2")}
  style={{ color: "green", fontWeight: "bold", padding: "12px" }}
>
  <img
    src={pen2}
    alt=""
    style={{
      width: "80px",
      height: "5px",
      filter: "brightness(10%)", // Increase brightness to 150%
    }}
  />
</div>

        

<div
  onClick={() => setSelectedTool("line3")}
  style={{ color: "green", fontWeight: "bold", padding: "12px" }}
>
  <img
    src={pen3}
    alt=""
    style={{
      width: "80px",
      height: "6px",
      filter: "brightness(10%)", // Increase brightness to 150%
    }}
  />
</div>

      </Popover.Body>
    </Popover>
  );
};

export default CustomPopover;
