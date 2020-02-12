export const updateUserLogged = value => ({
  type: 'UPDATE_USER_LOGGED',
  user: value,
});

export const userLoggedOut = value => ({
  type: 'USER_LOGGED_OUT',
});
