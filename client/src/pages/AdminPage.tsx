import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import AddVideo from "../components/admin/AddVideo";
import Courses from "../components/admin/Courses";
import DeleteVideo from "../components/admin/DeleteVideo";
import NewCourse from "../components/admin/NewCourse";
import useVideos, { Course, Video } from "../hooks/useVideos";

const AdminPage: React.FC = () => {
  const [courses, setCoursees] = useState<Course[]>([]);
  const { getVideos, isVideosLoading, getCourses, isCoursesLoading } =
    useVideos();
  const [courseName, setCourseName] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [isNewCourse, setIsNewCourse] = useState<boolean>(false);

  const fetchVideos = useCallback(
    async (name: string) => {
      const videos: Video[] | void = await getVideos(name);
      if (videos) setVideos(videos);
    },
    [getVideos]
  );
  const fetchCourses = useCallback(
    async (isFirstLoad: boolean) => {
      const courses: Course[] | void = await getCourses();
      if (courses) {
        setCoursees(courses);
        if (courses.length > 0 && isFirstLoad) {
          setCourseName(courses[0].name);
          fetchVideos(courses[0].name);
        }
      }
    },
    [getCourses, fetchVideos]
  );

  useEffect(() => {
    fetchCourses(true);
  }, [fetchCourses]);

  return (
    <Container style={{ marginTop: "20px", display: "flex" }}>
      <Courses
        setCourseName={setCourseName}
        courseName={courseName}
        coursesArr={courses}
        setIsNewCourse={setIsNewCourse}
        fetchVideos={fetchVideos}
        isCoursesLoading={isCoursesLoading}
      />
      <div style={{ width: "100%" }}>
        {isNewCourse ? (
          <NewCourse fetchCourses={fetchCourses} />
        ) : (
          <>
            <h1
              style={{
                textAlign: "center",
                color: "#1976d2",
                margin: "0 0 20px 0",
              }}
            >
              {courseName}
            </h1>
            <AddVideo courseName={courseName} fetchVideos={fetchVideos} />
            <DeleteVideo
              courseName={courseName}
              videos={videos}
              isLoading={isVideosLoading || isCoursesLoading}
              fetchVideos={fetchVideos}
            />
          </>
        )}
      </div>
    </Container>
  );
};

export default AdminPage;
