const initialState = {
  user: {},
};
export const userLogged = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_LOGGED':
      return {
        ...state,
        user: action.user,
      };
    case 'UPDATE_USER_PHOTO_URL':
      return {
        ...state,
        photoURL: action.url,
      };
    case 'USER_LOGGED_OUT':
      return {
        state: undefined,
      };

    default:
      return state;
  }
};
