import React, { useEffect, useState } from "react";
import { Course } from "../../hooks/useVideos";
import EditCourseDescription from "./EditCourseDescription";
import EditImage from "./EditImage";
import EditPrice from "./EditPrice";

interface EditCourseProps {
  courseInfo: Course;
}

const EditCourse: React.FC<EditCourseProps> = ({ courseInfo }) => {
  const [shortDescription, setShortDescription] = useState<string>("");
  const [fullDescription, setFullDescription] = useState<string>("");

  useEffect(() => {
    setShortDescription(courseInfo.shortDescription);
    setFullDescription(courseInfo.fullDescription);
  }, [courseInfo]);

  return (
    <div>
      <EditImage courseInfo={courseInfo} />
      <EditPrice courseInfo={courseInfo} />
      <EditCourseDescription
        description={shortDescription}
        setDescription={setShortDescription}
        defaultValue={courseInfo.shortDescription}
        courseID={courseInfo.id}
        type={"shortDescription"}
        title="Краткое описание"
      />
      <EditCourseDescription
        description={fullDescription}
        setDescription={setFullDescription}
        defaultValue={courseInfo.fullDescription}
        courseID={courseInfo.id}
        type={"fullDescription"}
        title="Полное описание"
      />
    </div>
  );
};

export default EditCourse;
