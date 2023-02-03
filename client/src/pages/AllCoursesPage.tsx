import { Card, Container, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sanitize from "../helpers/Sanitize";
import useVideos, { Course } from "../hooks/useVideos";
import Loader from "../UI/Loader";
import { consts } from "../utils/routsConsts";

const AllCoursesPage: React.FC = () => {
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
    <Container style={{ marginTop: "20px" }}>
      <DialogTitle style={{ textAlign: "center" }}>Курсы</DialogTitle>
      <div
        style={{
          padding: "15px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {!isCoursesLoading ? (
          courses.map(({ name, id, price, shortDescription }) => (
            <Card
              variant="outlined"
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
              {name}
              <img
                src={"https://media.tenor.com/lVhFnY9tc94AAAAC/anime-dance.gif"}
                width="200px"
                height="200px"
                style={{ display: "block" }}
                alt="Chika danse"
              />
              <div>
                <Sanitize html={shortDescription} />
                <div>
                  <b>
                    {price}
                    &#8381;
                  </b>
                </div>
              </div>
            </Card>
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

export default AllCoursesPage;
