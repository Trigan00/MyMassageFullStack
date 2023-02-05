import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sanitize from "../helpers/Sanitize";
import { useAuth } from "../hooks/useAuth";
import { useHttp } from "../hooks/useHttp";
import useVideos, { Course } from "../hooks/useVideos";
import Loader from "../UI/Loader";

const CoursePage: React.FC = () => {
  const { name } = useParams();
  const { id, token } = useAuth();
  const { request } = useHttp();
  const { getCourses } = useVideos();
  const [courseInfo, setCourseInfo] = useState<Course>();

  const fetchCourse = useCallback(async () => {
    const courses: Course[] | void = await getCourses();
    if (courses) {
      courses.forEach((course: Course) => {
        if (course.name === name) {
          setCourseInfo(course);
        }
      });
    }
  }, [getCourses, name]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

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
      {courseInfo ? (
        <Sanitize html={courseInfo.fullDescription} />
      ) : (
        <div className="FlexJustifyCenter">
          <Loader />
        </div>
      )}
      <Button onClick={buyCourseHandler}>Buy Course</Button>
    </Container>
  );
};

export default CoursePage;
