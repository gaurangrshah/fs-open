import React from "react";
import { vote } from "../reducers/anecdoteReducer";

function AnecdoteList({ anecdotes = [], dispatch }) {
  return (
    <div className='anecdote-list'>
      {anecdotes
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AnecdoteList;
