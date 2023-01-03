import React from "react";
import Loader from "../UI/Loader";

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
  return (
    <div>
      {!loading ? (
        arr.length > 0 ? (
          arr.map((el: any) => (
            <div key={el.id}>
              <span style={{ color: primeVideos ? "gold" : "blue" }}>
                {primeVideos ? "Для slave" : "Для всех"}
              </span>
              <br />
              <span>{el.data.name}</span>
              <br />
              <video
                src={el.data.url}
                controls
                controlsList="nodownload"
                width={"100%"}
              />
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
