import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

function AnecdoteForm({ dispatch }) {
  const addAnecdote = async (e) => {
    e.preventDefault();

    const content = e.target.querySelector("input").value;
    e.target.querySelector("input").value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotification(`New anecdote '${content}' successfully added`));
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </>
  );
}

export default AnecdoteForm;
