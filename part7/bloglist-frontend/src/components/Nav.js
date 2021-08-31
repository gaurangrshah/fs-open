import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  const menu = ["blogs", "users"];
  return (
    <nav>
      <ul>
        {menu.map(item => (
          <li key={item}>
            {item}
          </li>
        )}
      </ul>
    </nav>
  );
};
