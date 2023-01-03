import { Card } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import SignUp from "../components/SignUp";
import { consts } from "../utils/routsConsts";

const RegisterPage = () => {
  return (
    <Card
      style={{
        maxWidth: "500px",
        width: "100%",
        margin: "40px auto 0 auto",
        padding: "10px",
      }}
    >
      <h1>RegisterPage</h1>
      <SignUp />
      <p>
        <Link
          to={consts.LOGIN_ROUTE}
          style={{ color: "#1976d2", marginLeft: "10px" }}
        >
          Войти
        </Link>
      </p>
    </Card>
  );
};

export default RegisterPage;
