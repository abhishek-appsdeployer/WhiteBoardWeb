import { INCREMENT_BOARD_COUNT, ADD_BOARD, DELETE_BOARD } from "../Action/Action";
const initialState = {
    boardCount: 0,
    boards: [],
  };
  
  // Reducer
  const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
      case INCREMENT_BOARD_COUNT:
        return { ...state, boardCount: state.boardCount + 1 };
      case ADD_BOARD:
        return { ...state, boardCount: state.boardCount + 1, boards: [action.payload, ...state.boards] };
      case DELETE_BOARD:
        return { ...state, boardCount: state.boardCount - 1, boards: state.boards.filter(board => board !== action.payload) };
      default:
        return state;
    }
  };
  
  export default dashboardReducer;