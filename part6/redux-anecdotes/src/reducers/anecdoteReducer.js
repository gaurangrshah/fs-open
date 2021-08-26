const reducer = (state = [], action) => {
  console.table(state);
  console.log("action", action);
  switch (action.type) {
    case "ADD_ANECDOTE":
      return state.concat(action.content);
    case "VOTE":
      return state.map((anecdote) => {
        if (anecdote.id === action.id) {
          return Object.assign({}, anecdote, {
            votes: anecdote.votes + 1,
          });
        }
        return anecdote;
      });
    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = (anecdote) => {
  return {
    type: "ADD_ANECDOTE",
    content: anecdote,
  };
};

export const vote = (id) => {
  return {
    type: "VOTE",
    id,
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes,
  };
};

export default reducer;
