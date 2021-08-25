import React from "react";

const Notification = ({ type = "error", message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div
      className={type}
      style={{
        position: "relative",
        border:
          type === "error"
            ? "2px solid red"
            : type === "success"
            ? "2px solid green"
            : "2px solid yellow",
        color:
          type === "error" ? "red" : type === "success" ? "green" : "yellow",
        width: "100%",
        padding: "10px",
        margin: "10px 0",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
