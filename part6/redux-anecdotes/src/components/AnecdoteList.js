import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

function AnecdoteList({ anecdotes = [], dispatch }) {
  const handleVote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(
      setNotification(
        `You voted for '${
          anecdotes.find((a) => a.id === anecdote.id).content
        }'`,
        5
      )
    );
  };

  return (
    <div className='anecdote-list'>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnecdoteList;
