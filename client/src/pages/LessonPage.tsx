import Container from "@mui/material/Container/Container";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useHttp } from "../hooks/useHttp";
import { useTypedDispatch } from "../store/hooks/useTypedDispatch";
import { setAlert } from "../store/slices/alertSlice";
import Loader from "../UI/Loader";

const LessonPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useTypedDispatch();
  const { request } = useHttp();
  const { token } = useAuth();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if ((id || "").substring((id || "").length - 1) === "1") {
      if (token) {
        foo();
      }
    } else {
      foo();
    }
  }, [token, id, request]);

  const foo = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVERURL}/api/lesson/${id}`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      setData(res.data);
      console.log(res);
    } catch (error: any) {
      console.log(error);
      dispatch(
        setAlert({
          severity: "error",
          message: error.response.data.message,
        })
      );
    }
  };

  if (!data) {
    return (
      <div className="FlexJustifyCentr">
        <Loader color="#1976d2" />
      </div>
    );
  }

  return (
    <Container style={{ marginTop: "40px" }}>
      <span>Video Name: {data.name}</span>
      <p>
        Video Description: Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Enim, iure quod dolores repudiandae aliquam obcaecati ratione ea,
        deserunt voluptates nesciunt sit? Eos ducimus asperiores voluptates
        atque inventore ipsum esse nisi.
      </p>
      <div className="FlexJustifyCentr">
        <video
          id="videoPlayer"
          width="650"
          controls
          autoPlay
          controlsList="nodownload"
        >
          <source
            src={`${process.env.REACT_APP_SERVERURL}/api/lesson/video/${id}`}
            type="video/mp4"
          />
        </video>
      </div>
    </Container>
  );
};

export default LessonPage;
