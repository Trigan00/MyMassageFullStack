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
import React, { useState } from "react";
import { Demo } from "../../UI/MyTabPanel";
import useAdmin from "../../hooks/useAdmin";
import Loader from "../../UI/Loader";
import { Video } from "../../hooks/useVideos";
import MyModal from "../../UI/MyModal";

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
  const [modalInfo, setModalInfo] = useState<{
    isModalOpen: boolean;
    modalName: string;
    deleteIsActive: boolean;
    data: {};
  }>({ isModalOpen: false, modalName: "", deleteIsActive: false, data: {} });

  const deleteHandler = async ({ id }: { id: string }) => {
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
                      onClick={() =>
                        setModalInfo({
                          isModalOpen: true,
                          modalName: video.name,
                          deleteIsActive: false,
                          data: {
                            id: video.id,
                          },
                        })
                      }
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
      <MyModal
        type="Видео"
        modalInfo={modalInfo}
        setModalInfo={setModalInfo}
        onDelete={deleteHandler}
      />
    </Paper>
  );
};

export default DeleteVideo;
