import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";

function AnecdoteForm({ dispatch }) {
  const addAnecdote = (e) => {
    e.preventDefault();

    const content = e.target.querySelector("input");
    e.target.querySelector("input").value = "";
    dispatch(createAnecdote(content.value));
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
