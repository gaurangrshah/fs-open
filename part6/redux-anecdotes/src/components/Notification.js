import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return notification.length ? (
    <div style={style}>{notification[0]}</div>
  ) : null;
};

export default Notification;
