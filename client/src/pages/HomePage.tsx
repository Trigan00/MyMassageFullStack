import AllCourses from "../components/AllCourses";
import React from "react";
import { Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { consts } from "../utils/routsConsts";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container fluid>
      <Row>
        <Carousel className="col-md-7 shadow-lg p-0 mb-0 rounded">
          <Carousel.Item className="h-100">
            <img
              className="w-100 h-100 d-inline-block ml-auto mr-auto mb-0 mt-0"
              src="../images/1.1.1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <blockquote className="blockquote text-center">
                <h3 className="mb-4">
                  Единственная красота, которую я знаю, — это здоровье.
                </h3>
                <footer className="blockquote-footer">Г. Гейне</footer>
              </blockquote>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item className="h-100">
            <img
              className="w-100 h-100 d-inline-block ml-auto mr-auto mb-0 mt-0"
              src="../images/2.2.2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <blockquote className="blockquote text-center">
                <h3 className="mb-4">
                  Ничто так не истощает и не разрушает человека, как
                  продолжительное физическое бездействие.
                </h3>
                <footer className="blockquote-footer">Аристотель</footer>
              </blockquote>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item className="h-100">
            <img
              className="w-100 h-100 d-inline-block ml-auto mr-auto mb-0 mt-0"
              src="../images/3.3.3.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <blockquote className="blockquote text-center">
                <h3 className="mb-4">
                  Прекрасное и красивое в человеке немыслимо без представления о
                  гармоническом развитии организма и здоровья.
                </h3>
                <footer className="blockquote-footer">Н.Г.Чернышевский</footer>
              </blockquote>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div
          className="col-md-5 shadow-lg pb-5 mb-0 rounded"
          style={{
            backgroundImage: `url("images/Back image shape.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPositionX: "center",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Row className="mx-1">
            <h1 className="lh-base fs-1">
              Найди подходящий для <br /> <span>себя</span> курс!
            </h1>
            <p className="lh-lm fs-5">
              Приобретая мой курс, ты вкладываешь в себя и свое тело, прекрасное
              самочувствие - залог счастливой жизни
            </p>
          </Row>
          <Row className="">
            <button
              type="button"
              className="btn btn-primary btn-lg col-md-12 col-lg-12 ps-3 pe-3"
              onClick={() => navigate(consts.REGISTRATION_ROUTE)}
            >
              Зарегистрироваться!
            </button>
          </Row>
          <Row className="col-md-1 mt-4 d-flex justify-content-center pe-0">
            <a
              href="https://t.me/elvira_prazdnikova"
              style={{ transform: "scale(2)" }}
            >
              <Pulse
                xmlns="http://www.w3.org/2000/svg"
                // width="70"
                // height="70"
                fill="#0088cc"
                className="bi bi-telegram pe-0 ps-0 "
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
              </Pulse>
            </a>
          </Row>
        </div>
      </Row>
      <AllCourses />
    </Container>
  );
};

const buttonPulse = keyframes`
0% {
  transform: scale(0.95);
  
  border-radius:50%;
  
}

70% {
  transform: scale(1.5);
  
  border-radius:50%;
  
}

100% {
  transform: scale(0.95);
  
  border-radius:50%;
}
`;

const Pulse = styled.svg`
  animation-name: ${buttonPulse};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
`;

export default HomePage;
