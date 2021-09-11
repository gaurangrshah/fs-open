import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";

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
    return <Button {...button}>Add Comment</Button>;
  };
  const AddButton = ({ button }) => {
    return <Button {...button}>Submit Comment</Button>;
  };

  return (
    <>
      {showForm ? (
        <form onSubmit={handleComment}>
          <div>
            comment
            <Input
              id="comment"
              name="comment"
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
    </>
  );
};

export default CommentForm;
