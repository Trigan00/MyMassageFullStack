import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import Form from "../UI/Form";
import { useNavigate } from "react-router-dom";
import { consts } from "../utils/routsConsts";
import { useHttp } from "../hooks/useHttp";

const SignUp: React.FC = () => {
  const { request } = useHttp();
  const [loading, setloading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const registerHandler = (
    email: string,
    password: string,
    username: string | undefined
  ) => {
    setloading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        try {
          const res = await request(
            `${process.env.REACT_APP_SERVERURL}/api/auth/addUser`,
            "POST",
            {
              id: cred.user.uid,
              username,
              email,
            }
          );
          if (res) sendEmailVerification(cred.user);
        } catch (e) {
          console.log(e);
        }
      })
      .then(() => navigate(consts.HOME_ROUTE))

      .catch((error) => {
        setError(error.code);
      })
      .finally(() => {
        setloading(false);
      });
  };
  return (
    <Form
      isSignUp={true}
      onSubmit={registerHandler}
      isLoading={loading}
      title={"Зарегистрироваться"}
      error={error}
    />
  );
};

export default SignUp;
