export const perfil = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER_PHOTO_URL':
      return {
        ...state,
        photoURL: action.photoURL,
      };
    default:
      return state;
  }
};
