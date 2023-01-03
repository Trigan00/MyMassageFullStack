export type errorsTypes = {
  [errorName: string]: string;
};

export const firebaseErrors: errorsTypes = {
  "auth/invalid-email": "invalid-email",
  "auth/user-not-found": "No user corresponding to this email",
  "auth/email-already-in-use": "The email address is already in use",
  "auth/invalid-password": "invalid-password",
  "auth/wrong-password": "wrong-password",
  "auth/weak-password": "Password should be at least 6 characters",
};
