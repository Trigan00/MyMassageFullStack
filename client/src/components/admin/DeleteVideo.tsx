import {
  Avatar,
  Box,
  DialogTitle,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import React from "react";
import { Demo } from "../../UI/MyTabPanel";
import useAdmin from "../../hooks/useAdmin";
import Loader from "../../UI/Loader";
import { Video } from "../../hooks/useVideos";

interface DeleteVideoProps {
  videos: Video[];
  courseName: string;
  isLoading: boolean;
  fetchVideos: (name: string) => Promise<void>;
}

const DeleteVideo: React.FC<DeleteVideoProps> = ({
  courseName,
  videos,
  isLoading,
  fetchVideos,
}) => {
  const { deleteFiles } = useAdmin();

  const deleteHandler = async (id: string) => {
    await deleteFiles(courseName, id);
    fetchVideos(courseName);
  };

  return (
    <Paper elevation={3} style={{ padding: "15px", marginTop: "20px" }}>
      <DialogTitle style={{ textAlign: "center" }}>Список видео</DialogTitle>
      <Box sx={{ width: "100%" }}>
        <Demo>
          <List>
            {!isLoading ? (
              videos.map((video: any) => (
                <ListItem
                  key={video.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteHandler(video.id)}
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Icon>video_file</Icon>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={video.name}
                    secondary={video.fileName}
                  />
                </ListItem>
              ))
            ) : (
              <div className="FlexJustifyCentr">
                <Loader />
              </div>
            )}
          </List>
        </Demo>
      </Box>
    </Paper>
  );
};

export default DeleteVideo;
