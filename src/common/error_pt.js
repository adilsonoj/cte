export const error = e => {
  switch (e.code) {
    case 'auth/weak-password':
      return 'Senha deve ter pelo menos 6 caracteres';
    case 'auth/email-already-in-use':
      return 'O email já está em uso em outra conta';
    case 'auth/invalid-email':
      return 'Email inválido';
    case 'auth/wrong-password':
      return 'Senha errada';
    case 'auth/user-not-found':
      return 'Usuário não encontrado';
    default:
      console.log(e);
      return 'Erro inesperado, tente novamente';
  }
};
