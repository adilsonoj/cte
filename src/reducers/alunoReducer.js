const initialState = {
  loadAvalia: false,
};
export const alunoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_AVALIA':
      return {
        ...state,
        loadAvalia: action.loadAvalia,
      };
    default:
      return state;
  }
};
