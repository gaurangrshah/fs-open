import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";

function AnecdoteForm({ dispatch }) {
  const addAnecdote = (e) => {
    e.preventDefault();

    const content = e.target.querySelector("input").value;
    e.target.querySelector("input").value = "";
    dispatch(createAnecdote(content));
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
