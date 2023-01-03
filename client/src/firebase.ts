import { initializeApp } from "firebase/app";
// import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// setPersistence(auth, inMemoryPersistence)
//   .then(() => {})
//   .catch((error) => {
//     // Handle Errors here.
//     // const errorCode = error.code;
//     // const errorMessage = error.message;
//     console.log(error);
//   });
export const db = getFirestore(app);
