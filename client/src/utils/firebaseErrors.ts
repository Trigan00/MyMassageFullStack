export type errorsTypes = {
  [errorName: string]: string;
};

export const firebaseErrors: errorsTypes = {
  "auth/invalid-email": "недопустимый email",
  "auth/user-not-found": "Пользователь не найден",
  "auth/email-already-in-use": "Пользователь с таким email уже существует",
  "auth/invalid-password": "Неверный пароль",
  "auth/wrong-password": "Неправильный пароль",
  "auth/weak-password": "Пароль должен состоять не менее чем из 6 символов",
};
