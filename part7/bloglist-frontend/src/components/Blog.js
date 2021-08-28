import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { remove, like } from "../reducers/blog-reducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
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

  const handleConfirmAndDelete = async (blog) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(remove(blog));
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

              <button id='like-button' onClick={() => dispatch(like(blog))}>
                Add like
              </button>
            </p>
          </div>
          <div>{blog.url}</div>
          <button
            id='remove-button'
            onClick={() => handleConfirmAndDelete(blog)}
          >
            remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default Blog;
