import {
  Avatar,
  Container,
  DialogTitle,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useVideos, { Video } from "../hooks/useVideos";
import Loader from "../UI/Loader";
import { consts } from "../utils/routsConsts";

const MyCourseInfoPage: React.FC = () => {
  const { courseName } = useParams();
  const { getVideos, isVideosLoading } = useVideos();
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);

  const fetchVideos = useCallback(async () => {
    if (courseName) {
      const videos: Video[] | void = await getVideos(courseName);
      if (videos) setVideos(videos);
    }
  }, [getVideos, courseName]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <Container style={{ marginTop: "20px" }}>
      <DialogTitle style={{ textAlign: "center" }}>{courseName}</DialogTitle>
      <Paper>
        <List>
          {!isVideosLoading ? (
            videos.length > 0 ? (
              videos.map(({ name, id }) => (
                <ListItem
                  key={id}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(
                      consts.MYCOURSES_ROUTE + "/" + courseName + "/" + id
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Icon>video_file</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                </ListItem>
              ))
            ) : (
              "Нет уроков"
            )
          ) : (
            <div className="FlexJustifyCentr">
              <Loader />
            </div>
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default MyCourseInfoPage;
