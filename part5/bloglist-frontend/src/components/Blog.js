import React, { useState } from "react";
const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false);

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
    <li style={{ display: "flex", flexDirection: "column" }}>
      <div style={blogStyle}>
        <div>
          {blog.title} - {blog.author}
          <button onClick={toggleVisibility}>
            {visible ? "cancel" : "view"}
          </button>
        </div>
        <div style={showWhenVisible}>
          <div>
            <p className='likes-holder'>
              <span>likes: </span>
              <span className='likes'>{blog.likes}</span>

              <button id='like-button' onClick={() => handleLike(blog)}>
                Add like
              </button>
            </p>
          </div>
          <div>{blog.url}</div>
          <button
            id='remove-button'
            onClick={() => handleConfirmAndDelete(blog.id)}
          >
            remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default Blog;
