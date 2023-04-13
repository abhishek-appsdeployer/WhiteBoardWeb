import React, { useState } from 'react';
import Whiteboard from './Whiteboard';
import Dheader from './Dheader';
import "./Dashboard.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DrawingArea from './DrawingArea';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [boardCount, setBoardCount] = useState(1);
  const [show, setShow] = useState(false);
  const [boardName, setBoardName] = useState(""); // State for board name

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNewBoardClick = () => {
    // Function to handle the "New Board" button click
    setBoardCount(prevCount => prevCount + 1); // Increase the board count by 1
  }

  const handleSaveChanges = () => {
    // Function to handle the "Save Changes" button click in the modal
    if (boardName) {
      // Check if board name is not empty
      setBoardCount(prevCount => prevCount + 1); // Increase the board count by 1
      handleClose(); // Close the modal
    }
  }

  const handleBoardNameChange = (e) => {
    // Function to handle board name input change in the modal
    setBoardName(e.target.value); // Update the board name state
  }

  const boardComponents = Array.from({ length: boardCount }).map((_, index) => (
    <Link to="/drawing" key={index}>
      <div>
        {/* Render each board component */}
        {/* You can replace this with your actual board component */}
        <p>{boardName} Board {index + 1}</p> {/* Fix the board name display */}
      </div>
    </Link>
  ));
  

  return (
    <div>
      <Dheader />

      {/* Recent board */}
      <h2 className='m-5'>Recent Board</h2>
      <div className='m-5'>
        <div className="d-flex gap-4 border-2 nb" onClick={handleShow}>
          <p className='bg-success plus h-5 rounded-3'> <i className="fas fa-plus text-light p-3 " style={{ fontSize: '35px' }}></i></p>
          <h1>New Board</h1>
        </div>
        {/* Modal code */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Board Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" className="form-control" value={boardName} onChange={handleBoardNameChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {boardComponents}
      </div>
    </div>
  )
}

export default Dashboard;
