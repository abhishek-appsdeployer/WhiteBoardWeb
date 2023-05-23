import React from 'react';
import { Popover } from 'react-bootstrap';
import { BsFillStickyFill } from 'react-icons/bs';

const CustomStickyPopover = ({ setSelectedColor}) => {
  return (
    <Popover id="popover-basic">
      <Popover.Body>
        <div style={{ display: "flex" }}>
          <div
            onClick={() => setSelectedColor("#FF0000")}
            style={{
              backgroundColor: "red",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              margin: "6px",
              cursor: "pointer",
            }}
          ></div>

          <div
            onClick={() => setSelectedColor("#00FF00")}
            style={{
              backgroundColor: "green",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              margin: "6px",
              cursor: "pointer",
            }}
          ></div>
          <div
            onClick={() => setSelectedColor("#0000FF")}
            style={{
              backgroundColor: "blue",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              margin: "6px",
              cursor: "pointer",
            }}
          ></div>
        </div>
        <div
         
          style={{ padding: "12px" }}
        >
          <BsFillStickyFill size={20} color="red" />
        </div>

        <div
         
          style={{ padding: "12px" }}
        >
          <BsFillStickyFill size={20} color="red" />
        </div>

        <div
         
          style={{ padding: "12px" }}
        >
          <BsFillStickyFill size={40} color="red" />
        </div>
      </Popover.Body>
    </Popover>
  );
};

export default CustomStickyPopover;
