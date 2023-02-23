import axios from "axios";
import { useState } from "react";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setAlert } from "../store/slices/alertSlice";
import { useAuth } from "./useAuth";

const useAdmin = () => {
  const { token } = useAuth();
  const dispatch = useTypedDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const CatchFunction = (error: any) => {
    setIsLoading(false);
    console.log(error);
    dispatch(
      setAlert({
        severity: "error",
        message: error.response.data.message,
      })
    );
  };

  const createNewCourse = async (
    name: string,
    price: number,
    shortDescription: string,
    fullDescription: string,
    file: File
  ) => {
    try {
      if (!name.trim() || !file) {
        return dispatch(
          setAlert({
            severity: "error",
            message: "Введены не все данные",
          })
        );
      }
      setIsLoading(true);
      const data = new FormData();
      data.append("name", name);
      data.append("price", price.toString());
      data.append("shortDescription", shortDescription);
      data.append("fullDescription", fullDescription);
      data.append("file", file);

      const res = await axios.post(
        `${process.env.REACT_APP_SERVERURL}/api/admin/newCourse`,
        data,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );

      dispatch(
        setAlert({
          severity: "success",
          message: res.data.message,
        })
      );
      setIsLoading(false);
    } catch (error: any) {
      CatchFunction(error);
    }
  };

  const deleteCourse = async (name: string) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVERURL}/api/admin/deleteCourse/`,
        {
          params: {
            key: name,
          },
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      dispatch(
        setAlert({
          severity: "success",
          message: res.data.message,
        })
      );
    } catch (error: any) {
      CatchFunction(error);
    }
  };
  const uploadFiles = async (
    file: File,
    inputName: string,
    collectionName: string,
    description: string
  ) => {
    try {
      if (!inputName.trim()) {
        return dispatch(
          setAlert({
            severity: "error",
            message: "Название видео не указано",
          })
        );
      }
      setIsLoading(true);
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);
      data.append("inputName", inputName);
      data.append("collectionName", collectionName);
      data.append("description", description);

      const res = await axios.post(
        `${process.env.REACT_APP_SERVERURL}/api/admin/uploadFile`,
        data,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );

      dispatch(
        setAlert({
          severity: "success",
          message: res.data.message,
        })
      );
      setIsLoading(false);
    } catch (error: any) {
      CatchFunction(error);
    }
  };

  const deleteFiles = async (category: string, id: string) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_SERVERURL}/api/admin/deleteFile`,
        { id, category },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      dispatch(
        setAlert({
          severity: "success",
          message: res.data.message,
        })
      );
      setIsLoading(false);
    } catch (error: any) {
      CatchFunction(error);
    }
  };
  const changeVideoDescription = async (
    id: string,
    courseName: string,
    name: string,
    description: string
  ) => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        `${process.env.REACT_APP_SERVERURL}/api/admin/changeVideoDescription`,
        { id, courseName, name, description },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      dispatch(
        setAlert({
          severity: "success",
          message: res.data.message,
        })
      );
      setIsLoading(false);
    } catch (error: any) {
      CatchFunction(error);
    }
  };
  const changeDescription = async (
    type: "shortDescription" | "fullDescription",
    description: string,
    id: string
  ) => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        `${process.env.REACT_APP_SERVERURL}/api/admin/changeDescription`,
        { type, description, id },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      dispatch(
        setAlert({
          severity: "success",
          message: res.data.message,
        })
      );
      setIsLoading(false);
    } catch (error: any) {
      CatchFunction(error);
    }
  };
  const changeCourseImage = async (
    file: File,
    courseId: string,
    courseName: string
  ) => {
    try {
      setIsLoading(true);

      const data = new FormData();
      data.append("file", file);
      data.append("courseId", courseId);
      data.append("courseName", courseName);

      // console.log({ ...data });
      const res = await axios.put(
        `${process.env.REACT_APP_SERVERURL}/api/admin/changeCourseImage`,
        data,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      dispatch(
        setAlert({
          severity: "success",
          message: res.data.message,
        })
      );

      setIsLoading(false);
    } catch (error: any) {
      CatchFunction(error);
    }
  };
  const changeCoursePrice = async (price: number, courseId: string) => {
    try {
      setIsLoading(true);

      const res = await axios.put(
        `${process.env.REACT_APP_SERVERURL}/api/admin/changeCoursePrice`,
        { price, courseId },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      dispatch(
        setAlert({
          severity: "success",
          message: res.data.message,
        })
      );

      setIsLoading(false);
    } catch (error: any) {
      CatchFunction(error);
    }
  };

  return {
    uploadFiles,
    deleteFiles,
    createNewCourse,
    deleteCourse,
    changeDescription,
    changeVideoDescription,
    changeCourseImage,
    changeCoursePrice,
    isLoading,
  };
};

export default useAdmin;
