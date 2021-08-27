import anecdotesService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ANECDOTE":
      return state.concat(action.anecdote);
    case "VOTE":
      return state.map((anecdote) => {
        return anecdote.id === action.anecdote.id ? action.anecdote : anecdote;
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

export const vote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdotesService.incrementVote(anecdote);
    dispatch({
      type: "VOTE",
      anecdote: votedAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdotesService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data,
    });
  };
};

export default reducer;
