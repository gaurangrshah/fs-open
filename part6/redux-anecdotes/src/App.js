import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotelist from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Fitler";
import anecdotesService from "./services/anecdotes";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {

  const dispatch = useDispatch();

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const regex = new RegExp(filter, "i");
    return filter
      ? anecdotes.filter((anecdote) => anecdote.content.match(regex))
      : anecdotes;
  });

  useEffect(() => {
    anecdotesService
      .getAll()
      .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotelist
        anecdotes={anecdotes.sort((a, b) => b.votes - a.votes)}
        dispatch={dispatch}
      />
      <AnecdoteForm dispatch={dispatch} />
    </div>
  );
};

export default App;
