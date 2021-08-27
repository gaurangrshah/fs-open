import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

function AnecdoteForm({ createAnecdote, setNotification }) {
  const addAnecdote = async (e) => {
    e.preventDefault();

    const content = e.target.querySelector("input").value.trim();
    e.target.querySelector("input").value = "";
    createAnecdote(content);
    setNotification(`New anecdote '${content}' added successfully`);
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

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm);
