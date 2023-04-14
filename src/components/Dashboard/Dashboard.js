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
  const [boardCount, setBoardCount] = useState(0);
  const [show, setShow] = useState(false);
  const [boardName, setBoardName] = useState(""); // State for board name
  const [board, setBoard] = useState([]); // State for storing board names
  const boards = useSelector(state => state.boards); // Get boards from Redux store
  const dispatch = useDispatch(); // Dispatch actions to Redux store

  


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNewBoardClick = () => {
    // Function to handle the "New Board" button click
    setBoardCount(prevCount => prevCount + 1); // Increase the board count by 1
    dispatch(incrementBoardCount());
  }
  const deletebaord=(name)=>{
    const res=board.filter((item)=>item!==name)
    setBoardCount(prevCount => prevCount -1)
    setBoard(res)

  }

  const handleSaveChanges = () => {
    // Function to handle the "Save Changes" button click in the modal
    if (boardName) {
      // Check if board name is not empty
      setBoardCount(prevCount => prevCount + 1); // Increase the board count by 1
      setBoard(prevBoard => [boardName, ...prevBoard]); ; // Update the board name state with the new board name
      handleClose();
      setBoardName("") // Close the modal
    }
  }

  const handleBoardNameChange = (e) => {
    // Function to handle board name input change in the modal
    setBoardName(e.target.value); // Update the board name state
  }

  const boardComponents = Array.from({ length: boardCount }).map((_, index) => (
    <div to="/drawing" key={index}>
      <div className='d-flex del'>
        {/* Render each board component */}
        {/* You can replace this with your actual board component */}
      <Link to="/drawing" > <p>{board[index]} </p></Link> {/* Fix the board name display */}

        <button onClick={() => deletebaord(board[index])}>Delete the board</button>

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
