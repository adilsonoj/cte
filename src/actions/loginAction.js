export const updateUserLogged = value => ({
  type: 'UPDATE_USER_LOGGED',
  user: value,
});

export const userLoggedOut = value => ({
  type: 'USER_LOGGED_OUT',
});

export const updateUserPhotoURL = value => ({
  type: 'UPDATE_USER_PHOTO_URL',
  photoURL: value,
});
