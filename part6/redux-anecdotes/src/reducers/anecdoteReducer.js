import anecdotesService from "../services/anecdotes";

const reducer = (state = [], action) => {
  console.table(state);
  console.log("action", action);
  switch (action.type) {
    case "ADD_ANECDOTE":
      return state.concat(action.anecdote);
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
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(anecdote);
    dispatch({
      type: "ADD_ANECDOTE",
      anecdote: newAnecdote,
    });
  };
};

export const vote = (id) => {
  return {
    type: "VOTE",
    id,
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const data = await anecdotesService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data,
    });
  };
};

export default reducer;
