import axios from "axios";
import { useState } from "react";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setAlert } from "../store/slices/alertSlice";
import { useAuth } from "./useAuth";

const useAdmin = () => {
  const { token } = useAuth();
  const dispatch = useTypedDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const createNewCourse = async (
    name: string,
    price: number,
    shortDescription: string,
    fullDescription: string
  ) => {
    try {
      if (!name.trim()) {
        return dispatch(
          setAlert({
            severity: "error",
            message: "Название курса не указано",
          })
        );
      }
      setIsLoading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_SERVERURL}/api/admin/newCourse`,
        { name, price, shortDescription, fullDescription },
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
      setIsLoading(false);
      console.log(error);
      dispatch(
        setAlert({
          severity: "error",
          message: error.response.data.message,
        })
      );
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
      setIsLoading(false);
      console.log(error);
      dispatch(
        setAlert({
          severity: "error",
          message: error.response.data.message,
        })
      );
    }
  };
  const uploadFiles = async (
    file: any,
    inputName: string,
    collectionName: string
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
      setIsLoading(false);
      console.log(error);
      dispatch(
        setAlert({
          severity: "error",
          message: error.response.data.message,
        })
      );
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
      setIsLoading(false);
      console.log(error);
      dispatch(
        setAlert({
          severity: "error",
          message: error.response.data.message,
        })
      );
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
      setIsLoading(false);
      console.log(error);
      dispatch(
        setAlert({
          severity: "error",
          message: error.response.data.message,
        })
      );
      return;
    }
  };

  return {
    uploadFiles,
    deleteFiles,
    createNewCourse,
    deleteCourse,
    changeDescription,
    isLoading,
  };
};

export default useAdmin;
