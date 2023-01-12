import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../UI/Loader";
import { consts } from "../utils/routsConsts";

interface VideosListProps {
  arr: [];
  loading: boolean;
  primeVideos: boolean;
}

const VideosList: React.FC<VideosListProps> = ({
  arr,
  loading,
  primeVideos,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      {!loading ? (
        arr.length > 0 ? (
          arr.map((el: any) => (
            <div
              key={el.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(consts.LESSON_ROUTE + "/" + el.id)}
            >
              <span style={{ color: primeVideos ? "gold" : "blue" }}>
                {primeVideos ? "Для slave" : "Для всех"}
              </span>
              <br />
              <span>{el.name}</span>
              {/* <video
                src={el.data.url}
                controls
                controlsList="nodownload"
                width={"100%"}
              /> */}
            </div>
          ))
        ) : (
          "Нет уроков"
        )
      ) : (
        <div className="FlexJustifyCentr">
          <Loader color="#1976d2" />
        </div>
      )}
    </div>
  );
};

export default VideosList;
