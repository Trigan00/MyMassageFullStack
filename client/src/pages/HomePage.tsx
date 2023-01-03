import { Button } from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useHttp } from "../hooks/useHttp";

const HomePage: React.FC = () => {
  const { token } = useAuth();
  const { id } = useAuth();
  const { request } = useHttp();
  const getPrimeHandler = async () => {
    if (id) {
      try {
        await request(
          `${process.env.REACT_APP_SERVERURL}/api/prime/getPrime`,
          "POST",
          {
            id,
          },
          {
            authorization: "Bearer " + token,
          }
        );
      } catch (e) {}
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={getPrimeHandler}>Get Prime</Button>
    </div>
  );
};

export default HomePage;
