import React, { useState } from "react";
const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const showWhenVisible = {
    display: visible ? "block" : "none",
    width: "100%",
    border: "1px solid red",
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleConfirmAndDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await handleDelete(id);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <span>
            <button onClick={toggleVisibility}>
              {visible ? "cancel" : "view"}
            </button>
          </span>
        </div>
        <div style={showWhenVisible}>
          <div>
            <p>
              likes: {blog.likes}{" "}
              <span>
                <button onClick={() => handleLike(blog)}>like</button>
              </span>
            </p>
          </div>
          <div>{blog.url}</div>
          <button onClick={() => handleConfirmAndDelete(blog.id)}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
