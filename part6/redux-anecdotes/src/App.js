import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotelist from "./components/AnecdoteList";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotelist
        anecdotes={anecdotes.sort((a, b) => b.votes - a.votes)}
        dispatch={dispatch}
      />
      <AnecdoteForm dispatch={dispatch} />
    </div>
  );
};

export default App;
