import React from "react";
import { Popover } from "react-bootstrap";
import pen1 from "../../assets/Images/pen1.png";
import pen2 from "../../assets/Images/pen2.png";
import pen3 from "../../assets/Images/pen3.jpeg";
import { colors } from "../../utils/color";

const { colorMap } = colors();

const CustomPopover = ({ handleColorChange, setSelectedTool }) => {
  const colorNames = Object.keys(colorMap);

  const rows = [];
  const maxColorsPerRow = 3;

  for (let i = 0; i < colorNames.length; i += maxColorsPerRow) {
    const rowColorNames = colorNames.slice(i, i + maxColorsPerRow);
    const row = (
      <div key={i} style={{ display: "flex" }}>
        {rowColorNames.map((colorName, index) => (
          <div
            key={index}
            onClick={() => handleColorChange(colorMap[colorName])}
            style={{
              backgroundColor: colorMap[colorName],
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              margin: "6px",
              cursor: "pointer",
            }}
            title={colorName} // Display color name on hover
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
