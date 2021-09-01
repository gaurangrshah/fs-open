import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ children }) => {
  const menu = ["blogs", "users"];
  return (
    <nav>
      <ul style={{ display: "flex", listStyleType: "none" }}>
        {menu.map((item) => (
          <li key={item} style={{ margin: "0 1em" }}>
            <Link to={`/${item}`}>{item}</Link>
          </li>
        ))}
        <li>{children}</li>
      </ul>
    </nav>
  );
};

export default Nav;
