import React from "react";
import { connect } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

function AnecdoteList({ anecdotes, filter, vote, setNotification }) {
  const regex = new RegExp(filter, "i");
  const filteredAnecdotes = Boolean(filter)
    ? anecdotes.filter((anecdote) => anecdote.content.match(regex))
    : anecdotes;

  const handleVote = (anecdote) => {
    vote(anecdote);
    setNotification(
      `You voted for '${anecdotes.find((a) => a.id === anecdote.id).content}'`,
      5000
    );
  };

  return (
    <div className='anecdote-list'>
      {filteredAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={handleVote}
        />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  anecdotes: state.anecdotes,
  filter: state.filter,
});

export default connect(mapStateToProps, { vote, setNotification })(
  AnecdoteList
);

function Anecdote({ anecdote, handleVote }) {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </>
  );
}
