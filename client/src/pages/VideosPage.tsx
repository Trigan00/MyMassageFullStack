import { Box, Card, Container, DialogTitle, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import VideosList from "../components/VideosList";
import { useAuth } from "../hooks/useAuth";
import useVideos from "../hooks/useVideos";
import { Demo, MyTabPanel, a11yProps } from "../UI/MyTabPanel";

const VideosPage: React.FC = () => {
  const { primeLoading, getPrimeVideos, noPrimeLoading, getNoPrimeVideos } =
    useVideos();
  const { prime } = useAuth();
  const [primeVideos, setPrimeVideos] = useState<[]>([]);
  const [noPrimeVideos, setNoPrimeVideos] = useState<[]>([]);

  const [value, setValue] = useState(0);

  useEffect(() => {
    switch (value) {
      case 0:
        const noPrimevideos = getNoPrimeVideos();
        noPrimevideos.then((arr) => setNoPrimeVideos(arr));

        break;
      case 1:
        const primeVideos = getPrimeVideos();
        primeVideos.then((arr) => setPrimeVideos(arr));

        break;
      default:
        break;
    }
  }, [value, getNoPrimeVideos, getPrimeVideos]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <DialogTitle style={{ textAlign: "center" }}>Уроки</DialogTitle>
      <Card style={{ padding: "15px", marginTop: "20px" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="No Prime" {...a11yProps(0)} />
              <Tab label="Prime" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <Demo>
            <MyTabPanel index={0} value={value}>
              <VideosList
                arr={noPrimeVideos}
                loading={noPrimeLoading}
                primeVideos={false}
              />
            </MyTabPanel>
            <MyTabPanel index={1} value={value}>
              {prime ? (
                <VideosList
                  arr={primeVideos}
                  loading={primeLoading}
                  primeVideos={true}
                />
              ) : (
                "Нет доступа"
              )}
            </MyTabPanel>
          </Demo>
        </Box>
      </Card>
    </Container>
  );
};

export default VideosPage;
