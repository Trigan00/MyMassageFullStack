import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useHttp } from "../hooks/useHttp";

const CoursePage: React.FC = () => {
  const { name } = useParams();
  const { id, token } = useAuth();
  const { request } = useHttp();

  const buyCourseHandler = async () => {
    if (id) {
      try {
        await request(
          `${process.env.REACT_APP_SERVERURL}/api/buy/course`,
          "POST",
          {
            id,
            courseName: name,
          },
          {
            authorization: "Bearer " + token,
          }
        );
      } catch (e) {}
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <h1>CoursePage</h1>
      <h2>{name}</h2>
      <p>
        Course Info: Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Officiis esse et voluptas assumenda! Consequuntur, nulla. Aut rem rerum
        aspernatur fugiat tempora sed, nobis quos blanditiis impedit. Delectus
        assumenda earum quia.
      </p>
      <Button onClick={buyCourseHandler}>Buy Course</Button>
    </Container>
  );
};

export default CoursePage;
