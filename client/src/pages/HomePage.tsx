import AllCourses from "../components/AllCourses";
import React from "react";
import { Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
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
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-telegram fa-2x"></i>
            </a>
          </Row>
        </div>
      </Row>
      <AllCourses />
    </Container>
  );
};

export default HomePage;
