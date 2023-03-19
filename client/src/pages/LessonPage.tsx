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
import { Container } from "react-bootstrap";

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
        className="FlexJustifyCentr videoContainer"
        style={{ maxWidth: "1200px", maxHeight: "550px", margin: "0 auto" }}
      >
        <video
          id="videoPlayer"
          width="500px"
          height="200px"
          controls
          autoPlay
          controlsList="nodownload"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        >
          <source
            src={`${process.env.REACT_APP_SERVERURL}/api/courses/video/=${courseName}=${id}`}
            type="video/mp4"
          />
        </video>
      </div>
      <Feedback videoName={data.name} courseName={courseName || ""} />
    </Container>
  );
};

export default LessonPage;
