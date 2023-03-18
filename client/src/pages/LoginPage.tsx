import { Card } from "@mui/material";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import { consts } from "../utils/routsConsts";

const LoginPage = () => {
  return (
    <Container>
      <Card
        sx={{
          maxWidth: "500px",
          w: "100%",
          m: "10% auto 0 auto",
          p: "10px",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ textAlign: "center" }}>Вход</h3>
        <Login />

        <Link
          to={consts.REGISTRATION_ROUTE}
          style={{ color: "#1976d2", marginLeft: "10px" }}
        >
          Создать аккаунт
        </Link>
        <Link
          to={consts.RESET_PASSWORD}
          style={{ color: "#1976d2", marginLeft: "10px", float: "right" }}
        >
          Забыли пароль ?
        </Link>
      </Card>
    </Container>
  );
};

export default LoginPage;
