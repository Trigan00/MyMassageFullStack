import { Card } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import { consts } from "../utils/routsConsts";

const LoginPage = () => {
  return (
    <Card
      style={{
        maxWidth: "500px",
        width: "100%",
        margin: "40px auto 0 auto",
        padding: "10px",
      }}
    >
      <h1>LoginPage</h1>
      <Login />

      <Link
        to={consts.REGISTRATION_ROUTE}
        style={{ color: "#1976d2", marginLeft: "10px" }}
      >
        Создать аккаунт
      </Link>
    </Card>
  );
};

export default LoginPage;
