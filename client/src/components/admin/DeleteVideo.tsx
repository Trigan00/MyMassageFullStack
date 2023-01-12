import {
  Avatar,
  Box,
  Card,
  DialogTitle,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useState } from "react";
import { Demo, a11yProps, MyTabPanel } from "../../UI/MyTabPanel";

import useAdmin from "../../hooks/useAdmin";
import useVideos from "../../hooks/useVideos";

const DeleteVideo: React.FC = () => {
  const { deleteFiles } = useAdmin();
  const { adminPrimeVideos, adminNoPrimeVideos } = useVideos();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const deleteHandler = async (id: string /*, fileName: string*/) => {
    deleteFiles(/*fileName, */ value ? "videos" : "primevideos", id);
  };

  return (
    <Card style={{ padding: "15px", marginTop: "20px" }}>
      <DialogTitle style={{ textAlign: "center" }}>Удалить видео</DialogTitle>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Prime" {...a11yProps(0)} />
            <Tab label="No Prime" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Demo>
          <MyTabPanel index={0} value={value}>
            <List>
              {adminPrimeVideos.map((video: any) => (
                <ListItem
                  key={video.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() =>
                        deleteHandler(video.id /*, video.fileName*/)
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
              ))}
            </List>
          </MyTabPanel>
          <MyTabPanel index={1} value={value}>
            <List>
              {adminNoPrimeVideos.map((video: any) => (
                <ListItem
                  key={video.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() =>
                        deleteHandler(video.id /*, video.fileName*/)
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
              ))}
            </List>
          </MyTabPanel>
        </Demo>
      </Box>
    </Card>
  );
};

export default DeleteVideo;
