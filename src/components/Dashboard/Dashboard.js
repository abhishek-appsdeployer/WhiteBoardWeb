import React, { useState } from 'react';
import Whiteboard from './Whiteboard';
import Dheader from './Dheader';
import "./Dashboard.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DrawingArea from './DrawingArea';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { incrementBoardCount,addBoard, deleteBoard } from '../../Redux/Action/Action';

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [boardName, setBoardName] = useState(""); // State for board name
  const boards = useSelector(state => state.boards); // Get boards from Redux store
  const boardCount = useSelector(state => state.boardCount); // Get board count from Redux store
  const dispatch = useDispatch(); // Dispatch actions to Redux store

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  const deleteBoardItem = (name) => {
    // Function to handle board deletion
    dispatch(deleteBoard(name)); // Dispatch deleteBoard action to Redux store
  }

  const handleSaveChanges = () => {
    // Function to handle the "Save Changes" button click in the modal
    if (boardName) {
      // Check if board name is not empty
      dispatch(incrementBoardCount()); // Dispatch incrementBoardCount action to Redux store
      dispatch(addBoard(boardName)); // Dispatch addBoard action to Redux store
      handleClose();
      setBoardName("") // Close the modal
    }
  }

  const handleBoardNameChange = (e) => {
    // Function to handle board name input change in the modal
    setBoardName(e.target.value); // Update the board name state
  }

  const boardComponents = boards.map((board, index) => (
    <div key={index}>
      <div className='d-flex del'>
        {/* Render each board component */}
        {/* You can replace this with your actual board component */}
        <Link to="/drawing">{board}</Link> {/* Fix the board name display */}
        <button onClick={() => deleteBoardItem(board)}>Delete the board</button>
      </div>
    </div>
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
