import React from 'react'
import Whiteboard from './Whiteboard'
import Dheader from './Dheader'
import "./Dashboard.css"
import DrawingArea from './DrawingArea'
const Dashboard = () => {
  return (
    <div>
    <Dheader/>
      
      {/* <Whiteboard/> */}
      <DrawingArea/>
    </div>
  )
}

export default Dashboard
