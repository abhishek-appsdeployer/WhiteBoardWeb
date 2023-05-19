import React from "react";
import {
  BsCameraVideo,
  BsThreeDots,
  BsEmojiSunglasses,
  BsBell,
} from "react-icons/bs";
import { VscCommentDiscussion } from "react-icons/vsc";
import { GiAlarmClock } from "react-icons/gi";

const DrawerHeader = () => {
  const shareUrl = window.location.href;

  const sharePage = async () => {
    try {
      await navigator.share({
        title: "Draw",
        text: "Check out this page!",
        url: shareUrl,
      });
    } catch (error) {}
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "0.5rem",
        justifyContent: "space-between",
        margin: "0.5rem 0",
      }}
    >
      <p
        style={{
          backgroundColor: "white",
          padding: "10px",
          height: "40px",
          width: "fit-content",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>Whiteboard</span>
        <span>|</span>
        <span>User Board</span>
      </p>

      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          height: "40px",
          width: "fit-content",
          borderRadius: "10px",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <GiAlarmClock size={23} />
        <VscCommentDiscussion size={23} />
        <BsCameraVideo size={23} />
        <BsThreeDots size={23} />
        <BsEmojiSunglasses size={23} />
        <BsBell size={23} />
      </div>

      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "20px",
            backgroundColor: "gray",
          }}
        ></div>
        <p
          style={{
            backgroundColor: "gray",
            borderRadius: "5px",
            padding: "10px",
            height: "fit-content",
            margin: "0",
            color: "white",
            height: "40px",
          }}
        >
          Present
        </p>
        <p
          onClick={sharePage}
          style={{
            backgroundColor: "gray",
            borderRadius: "5px",
            padding: "10px",
            height: "fit-content",
            margin: "0",
            color: "white",
            height: "40px",
          }}
        >
          Share
        </p>
      </div>
    </div>
  );
};

export default DrawerHeader;
