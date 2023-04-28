import React from 'react'
import {
    BsPencil,
    BsCameraVideo,
    BsThreeDots,
    BsEmojiSunglasses,
    BsBell,
    BsStickyFill,
    BsFileArrowUp,
  } from "react-icons/bs";
  import { VscCircle, VscCommentDiscussion } from "react-icons/vsc";
  import { GiAlarmClock } from "react-icons/gi"
const DrawerHeader = () => {
    const shareUrl = window.location.href;
    // share function for url
    const sharePage = async () => {
      try {
        await navigator.share({
          title: "Draw",
          text: "Check out this page!",
          url: shareUrl,
        });
      } catch (error) {
        console.error("Error sharing page:", error);
      }
    };
  return (
    <div className="d-flex flex-column gap-2 flex-lg-row justify-content-between m-2">
          <p className="d-flex gap-2 bgwhite p-2">
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>Whiteboard</p>
            <p>|</p>
            <p>User Board</p>
          </p>

          <div className="bgwhite d-flex gap-3">
            <GiAlarmClock size={23} />

            <VscCommentDiscussion size={23} />

            <BsCameraVideo size={23} />
            <BsThreeDots size={23} />
            <BsEmojiSunglasses size={23} />
            <BsBell size={23} />
          </div>

          <div className=" d-flex gap-3 round-2">
            <p className="circ"></p>
            <p className="present text-light h6">Present</p>
            <p className="present text-light h6" onClick={sharePage}>
              Share
            </p>
          </div>
        </div>
  )
}

export default DrawerHeader
