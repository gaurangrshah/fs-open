import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  comment as addComment,
  initializeBlogs,
} from "../reducers/blog-reducer";

import { setNotification } from "../reducers/notification-reducer";

const CommentForm = ({ id }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  console.log("🚀 | file: CommentForm.js | line 14 | pathname", pathname);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      if (!comment) return;
      dispatch(addComment(id, comment));

      setComment("");
      setShowForm(false);

      dispatch(initializeBlogs());
      history.push(pathname);
    } catch (exception) {
      dispatch(setNotification("wrong credentials", "error"));
    }
  };

  const ShowButton = ({ button }) => {
    return <button {...button}>Add Comment</button>;
  };
  const AddButton = ({ button }) => {
    return <button {...button}>Add Comment</button>;
  };

  return (
    <div>
      <h3>Comments</h3>
      <hr />

      {showForm ? (
        <form onSubmit={handleComment}>
          <div>
            comment
            <input
              id='comment'
              name='comment'
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
          </div>

          <AddButton
            button={{
              id: "addComment",
              type: "submit",
            }}
          />
        </form>
      ) : (
        <ShowButton
          button={{
            id: "show-comment-form-btn",
            type: "button",
            onClick: () => setShowForm(true),
          }}
        />
      )}
    </div>
  );
};

export default CommentForm;
