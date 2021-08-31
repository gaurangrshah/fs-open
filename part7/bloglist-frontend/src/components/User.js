import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  if (!user) return null;
  return (
    <div>
      <h2>User</h2>
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      {user.posts.map((post) => (
        <li key={post.id}>
          <Link to={`/blogs/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </div>
  );
};

export default User;
