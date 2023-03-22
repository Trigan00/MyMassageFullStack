import Button from "@mui/material/Button/Button";
import { Container } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sanitize from "../helpers/Sanitize";
import { useAuth } from "../hooks/useAuth";
import { useHttp } from "../hooks/useHttp";
import useVideos, { Course } from "../hooks/useVideos";
import Loader from "../UI/Loader";
import { consts } from "../utils/routsConsts";

const CoursePage: React.FC = () => {
  const { name } = useParams();
  const { id, token } = useAuth();
  const { request, loading } = useHttp();
  const { getCourses } = useVideos();
  const navigate = useNavigate();
  const [courseInfo, setCourseInfo] = useState<Course>();
  const [isBought, setIsBought] = useState<boolean>(false);

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

  const checkCourses = useCallback(async () => {
    try {
      const res = await request(
        `${process.env.REACT_APP_SERVERURL}/api/courses/my_courses`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (res.courses.some((item: string) => item === name)) {
        setIsBought(true);
      }
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, token]);

  useEffect(() => {
    fetchCourse();
    if (id) checkCourses();
  }, [fetchCourse, checkCourses, id]);

  const buyCourseHandler = async () => {
    if (id) {
      try {
        if (!isBought) {
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
          navigate(consts.MYCOURSES_ROUTE + "/" + name);
        } else {
          navigate(consts.MYCOURSES_ROUTE + "/" + name);
        }
      } catch (e) {}
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <h2>{name}</h2>
      {courseInfo ? (
        <>
          <Sanitize html={courseInfo.fullDescription} />
          <Button onClick={buyCourseHandler} disabled={loading}>
            {isBought ? "Приобретено" : "Купить"}
          </Button>
        </>
      ) : (
        <div className="FlexJustifyCenter">
          <Loader />
        </div>
      )}
    </Container>
  );
};

export default CoursePage;
