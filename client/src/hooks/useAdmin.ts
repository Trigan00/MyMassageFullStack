import axios from "axios";
import { useState } from "react";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setAlert } from "../store/slices/alertSlice";
import { useAuth } from "./useAuth";

const useAdmin = () => {
  const { token } = useAuth();
  const dispatch = useTypedDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const createNewCourse = async (name: string) => {
    try {
      setIsLoading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_SERVERURL}/api/admin/newCourse`,
        { name },
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
  const uploadFiles = async (
    file: any,
    inputName: string,
    collectionName: string
  ) => {
    try {
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
      return;
    }
  };

  return { uploadFiles, deleteFiles, isLoading, createNewCourse };
};

export default useAdmin;
