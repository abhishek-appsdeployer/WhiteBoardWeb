export const INCREMENT_BOARD_COUNT = 'INCREMENT_BOARD_COUNT';
export const ADD_BOARD = 'ADD_BOARD';
export const DELETE_BOARD = 'DELETE_BOARD';
export const incrementBoardCount = () => {
    return { type: INCREMENT_BOARD_COUNT };
  };
  
  export const addBoard = (boardName) => {
    return { type: ADD_BOARD, payload: boardName };
  };
  
  export const deleteBoard = (boardName) => {
    return { type: DELETE_BOARD, payload: boardName };
  };