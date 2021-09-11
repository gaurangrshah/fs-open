import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input } from "@chakra-ui/react";

import { create } from "../reducers/blog-reducer";
import { setNotification } from "../reducers/notification-reducer";

const BlogForm = ({ user, toggleVisibility }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      dispatch(setNotification("Please log in to create a new blog", "error"));
      return;
    }

    if (!title || !url) {
      dispatch(setNotification("Please fill in all fields", "error"));
      return;
    }
    try {
      toggleVisibility();
      dispatch(create({ title, author, url }));
      dispatch(
        setNotification(`New blog: ${title} by: ${author} added`, "success")
      );
    } catch (exception) {
      dispatch(setNotification("Invalid blog", "error"));
    }

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:{" "}
        <Input
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:{" "}
        <Input
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url:{" "}
        <Input
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <Button type="submit">save</Button>
      </div>
    </form>
  );
};

export default BlogForm;

/* eslint-enable no-unused-vars */
