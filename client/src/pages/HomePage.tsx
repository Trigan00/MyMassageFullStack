import { Container } from "@mui/material";
import AllCourses from "../components/AllCourses";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <Container style={{ marginTop: "20px" }}>
      <h1>Home Page</h1>
      <AllCourses />
    </Container>
  );
};

export default HomePage;
