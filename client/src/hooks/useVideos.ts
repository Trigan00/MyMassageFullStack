import { getDocs, collection } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firebase";

export type Video = {
  id: string;
  name: string;
  fileName: string;
};
export type Course = {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
};

const useVideos = () => {
  const [isVideosLoading, SetIsVideosLoading] = useState<boolean>(false);
  const [isCoursesLoading, SetIsCoursesLoading] = useState<boolean>(false);

  const getVideos = useCallback(
    async (category: string): Promise<void | Video[]> => {
      try {
        SetIsVideosLoading(true);
        const data = await getDocs(collection(db, category));
        const videos: Video[] = [];
        data.forEach((doc) => {
          videos.push({
            id: doc.id,
            name: doc.data().name,
            fileName: doc.data().fileName,
          });
        });
        SetIsVideosLoading(false);
        return videos;
      } catch (error) {
        SetIsVideosLoading(false);

        console.log(error);
      }
    },
    []
  );
  const getCourses = useCallback(async (): Promise<void | Course[]> => {
    try {
      SetIsCoursesLoading(true);
      const data = await getDocs(collection(db, "courses"));
      const courses: Course[] = [];
      data.forEach((doc) => {
        courses.push({
          id: doc.id,
          name: doc.data().name,
          price: doc.data().price,
          shortDescription: doc.data().shortDescription,
        });
      });
      SetIsCoursesLoading(false);
      return courses;
    } catch (error) {
      SetIsCoursesLoading(false);

      console.log(error);
    }
  }, []);

  return {
    isVideosLoading: isVideosLoading,
    getVideos,
    isCoursesLoading: isCoursesLoading,
    getCourses,
  };
};

export default useVideos;
