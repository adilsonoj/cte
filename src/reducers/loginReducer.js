const initialState = {
    user: {nome: 'abc'}
  };
  export const userLogged = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_USER_LOGGED':
        return {
          ...state,
          user: action.user
        };
      default:
        return state;
    }
  };