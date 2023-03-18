import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sanitize from "../helpers/Sanitize";
import useVideos, { Course } from "../hooks/useVideos";
import Loader from "../UI/Loader";
import { consts } from "../utils/routsConsts";

const AllCourses: React.FC = () => {
  const { getCourses, isCoursesLoading } = useVideos();
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const coursesArr: Course[] | void = await getCourses();

      if (coursesArr) {
        setCourses(coursesArr);
      }
    })();
  }, [getCourses]);

  return (
    <Container fluid>
      <h1 className="text-center mt-5">Курсы и семинары</h1>
      <div
        className="course-wrapper"
        style={{
          padding: "15px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        {!isCoursesLoading ? (
          courses.map(({ name, id, price, shortDescription, pictureUrl }) => (
            <div
              className="course-item"
              key={id}
              onClick={() => navigate(consts.ALLCOURSES_ROUTE + "/" + name)}
              style={{
                padding: "10px",
                cursor: "pointer",
                marginBottom: "20px",
                width: "fit-content",
                display: "flex",
              }}
            >
              <img
                src={
                  pictureUrl ||
                  "https://media.tenor.com/lVhFnY9tc94AAAAC/anime-dance.gif"
                }
                width="854px"
                height="480px"
                style={{
                  display: "block",
                  backgroundColor: "gray",
                  borderRadius: "20px",
                }}
                alt="CoursePicture"
              />
              <div className="price-info">
                <Sanitize html={shortDescription} />
                <div className="price-wrapper">
                  <h1 className="p-2 text-center">{price} &#8381;</h1>
                  <button type="button" className="btn btn-primary btn-lg">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="FlexJustifyCentr">
            <Loader />
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllCourses;
