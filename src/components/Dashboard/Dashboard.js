import React, { useState } from 'react';


import "./dashboard.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DrawingArea from '../draw/drawingArea';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { incrementBoardCount, addBoard, deleteBoard, updateBoardName } from '../../redux/action/action';
import DashboardHeader from './dashboardHeader';

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [editingBoardIndex, setEditingBoardIndex] = useState(-1); // State for tracking the index of the board being edited
  const boards = useSelector(state => state.boards);
  console.log(boards)
  const boardCount = useSelector(state => state.boardCount);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    setEditingBoardIndex(-1); // Reset the editing board index
    setBoardName(""); // Reset the board name state
  };

  const handleShow = () => setShow(true);

  const deleteBoardItem = (name) => {
    dispatch(deleteBoard(name));
  }

  const handleSaveChanges = () => {
    if (boardName) {
      if (editingBoardIndex !== -1) {
        // If editing a board, update the board name
        console.log("dispatch update board name")
        dispatch(updateBoardName(editingBoardIndex, boardName ));
      } else {
        // If adding a new board, dispatch actions to increment board count and add board
        dispatch(incrementBoardCount());
        dispatch(addBoard(boardName));
      }
      handleClose();
    }
  }

  const handleBoardNameChange = (e) => {
    setBoardName(e.target.value);
  }

  const handleEditBoardName = (index) => {
    // Function to handle editing board name
    setEditingBoardIndex(index); // Set the editing board index
    setBoardName(boards[index]); // Set the board name to be edited in the input field
    handleShow(); // Show the modal
  }

  const boardComponents = boards.map((board, index) => (
    <div key={index}>
      <div className='d-flex del'>
        {/* Render each board component */}
        {/* You can replace this with your actual board component */}
        <Link to="/drawing" style={{ textDecoration: "none" }}><h1 className='text-dark'>{board}</h1></Link>
        <div className='d-flex'>
        <div onClick={() => handleEditBoardName(index)}><i className="fas fa-edit text-danger p-3 " style={{ fontSize: '35px' }}/></div>

        <div onClick={() => deleteBoardItem(board)} > <i className="fas fa-trash text-danger p-3 " style={{ fontSize: '35px' }}></i></div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
    <DashboardHeader/>

      {/* Recent board */}
      <h2 className='m-5'>Recent Boards</h2>
      <div className=' container'>
        <div className="d-flex gap-4 border-2 nb " onClick={handleShow}>
          <p className='bg-success plus h-5 rounded-3'> <i className="fas fa-plus text-light p-3 " style={{ fontSize: '30px' }}></i></p>
          <h1>New Board</h1>
        </div>
        {/* Modal code */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
           
          <Modal.Title>{editingBoardIndex !== -1 ? 'Edit Board' : 'New Board'}</Modal.Title>
</Modal.Header>
<Modal.Body>
<input type="text" className="form-control" value={boardName} onChange={handleBoardNameChange} placeholder="Enter board name" />
</Modal.Body>
<Modal.Footer>

<Button variant="primary" onClick={handleSaveChanges}>
{editingBoardIndex !== -1 ? 'Save Changes' : 'Create Board'}
</Button>
</Modal.Footer>
</Modal>
</div> {/* Render the list of boards */}
  <div className="container ">
    <div className="">
      {boardComponents}
    </div>
  </div>
</div>
);
}

export default Dashboard;