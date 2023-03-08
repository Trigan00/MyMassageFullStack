import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import AdminComponents from "../components/admin/AdminComponents";
import Courses from "../components/admin/Courses";
import useVideos, { Course, Video } from "../hooks/useVideos";

const AdminPage: React.FC = () => {
  const [courses, setCoursees] = useState<Course[]>([]);
  const { getVideos, isVideosLoading, getCourses, isCoursesLoading } =
    useVideos();
  const [courseName, setCourseName] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [isNewCourse, setIsNewCourse] = useState<boolean>(false);
  const [courseInfo, setCourseInfo] = useState<Course | null>(null);
  const [commentsVideo, setCommentsVideo] = useState<string>("");

  const onEditCourse = (course: Course | null) => {
    setCourseInfo(course);
  };

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
    <Container sx={{ mt: "20px", mb: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          color: "#1976d2",
          margin: "0 0 20px 0",
        }}
      >
        {courseName}
        {commentsVideo && <span> / {commentsVideo}</span>}
      </h1>
      <div className="AdminPageWrapper">
        <Courses
          setCourseName={setCourseName}
          courseName={courseName}
          coursesArr={courses}
          setIsNewCourse={setIsNewCourse}
          fetchVideos={fetchVideos}
          isCoursesLoading={isCoursesLoading}
          onEditCourse={onEditCourse}
          setCommentsVideo={setCommentsVideo}
        />
        <div style={{ width: "100%" }}>
          <AdminComponents
            isNewCourse={isNewCourse}
            courses={courses}
            fetchCourses={fetchCourses}
            courseInfo={courseInfo}
            fetchVideos={fetchVideos}
            courseName={courseName}
            videos={videos}
            isVideosLoading={isVideosLoading}
            isCoursesLoading={isCoursesLoading}
            commentsVideo={commentsVideo}
            setCommentsVideo={setCommentsVideo}
          />
        </div>
      </div>
    </Container>
  );
};

export default AdminPage;
