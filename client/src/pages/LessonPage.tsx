import Container from "@mui/material/Container/Container";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Feedback from "../components/Feedback";
import Sanitize from "../helpers/Sanitize";
import { useAuth } from "../hooks/useAuth";
import { useAuthState } from "../hooks/useAuthState";
import { useHttp } from "../hooks/useHttp";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setAlert } from "../store/slices/alertSlice";
import Loader from "../UI/Loader";

const LessonPage: React.FC = () => {
  const { request } = useHttp();
  const { id, courseName } = useParams();
  const dispatch = useTypedDispatch();
  const { token } = useAuth();
  const { isPending } = useAuthState();
  const [data, setData] = useState<any>();

  const getVideoInfo = useCallback(async () => {
    try {
      const res = await request(
        `${process.env.REACT_APP_SERVERURL}/api/courses/lesson/${id}-${courseName}`,
        "GET",
        null,
        {
          authorization: "Bearer " + token,
        }
      );

      setData(res.data);
    } catch (error: any) {
      console.log(error);
      dispatch(
        setAlert({
          severity: "error",
          message: error.message,
        })
      );
    }
  }, [courseName, dispatch, id, request, token]);

  useEffect(() => {
    if (!isPending) {
      getVideoInfo();
    }
  }, [isPending, getVideoInfo]);

  if (isPending || !data) {
    return (
      <div className="FlexJustifyCentr">
        <Loader color="#1976d2" />
      </div>
    );
  }

  return (
    <Container style={{ marginTop: "40px" }}>
      <span>Video Name: {data.name}</span>
      <Sanitize html={data.description} />
      <div
        className="FlexJustifyCentr"
        style={{ position: "relative", paddingTop: "56.25%" }}
      >
        <video
          id="videoPlayer"
          width="100%"
          controls
          autoPlay
          controlsList="nodownload"
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "auto",
          }}
        >
          <source
            src={`${process.env.REACT_APP_SERVERURL}/api/courses/video/=${courseName}=${id}=${token}`}
            type="video/mp4"
          />
        </video>
      </div>
      <Feedback videoName={data.name} courseName={courseName || ""} />
    </Container>
  );
};

export default LessonPage;
