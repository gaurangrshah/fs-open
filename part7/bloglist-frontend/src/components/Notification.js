import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const type = notification?.type;
  // if (message === null) {
  //   return null;
  // }

  return notification?.message ? (
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
      {notification?.message}
    </div>
  ) : null;
};

export default Notification;
