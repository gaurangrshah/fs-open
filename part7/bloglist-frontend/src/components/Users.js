import React from "react";
import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return users?.map((user) => (
    <ul key={user.id}>
      <li>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
        <span>{user?.posts?.length}</span>
      </li>
    </ul>
  ));
};

export default Users;
