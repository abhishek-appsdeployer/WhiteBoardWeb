import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const DashboardHeader = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedInfo = localStorage.getItem("User");
  ;
    if (storedInfo) {
      const parsedInfo = JSON.parse(storedInfo);
      setName(parsedInfo.username);
      setEmail(parsedInfo.email);
    }
  }, []);

  return (
    <div className="d-flex flex-sm-row flex-column justify-content-between p-3">
      <h1>WhiteBoard</h1>
      <div className="d-flex gap-3 align-items-center">
        <p className="py-1">
          <i className="fas fa-bell " style={{ fontSize: "35px" }}></i>
        </p>

        <Dropdown drop="start">
          <Dropdown.Toggle
            className="rounded-circle  -mt-1 toggle"
            style={{ backgroundColor: "#28a745" }}
          >
            {name ? name[0] : null}
          </Dropdown.Toggle>

          <Dropdown.Menu show={isOpen} className="p-10">
            <Dropdown.Item href="#/action-11">{name}</Dropdown.Item>
            <Dropdown.Item href="#/action-2">{email}</Dropdown.Item>
            <Dropdown.Item href="/">logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default DashboardHeader;
