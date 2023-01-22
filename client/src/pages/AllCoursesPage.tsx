import {
  Card,
  /* Box, */ Container,
  DialogTitle,
  // Paper , Tab, Tabs,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import VideosList from "../components/VideosList";
// import { useAuth } from "../hooks/useAuth";
import useVideos, { Course } from "../hooks/useVideos";
import Loader from "../UI/Loader";
import { consts } from "../utils/routsConsts";
// import { Demo, MyTabPanel, a11yProps } from "../UI/MyTabPanel";

const AllCoursesPage: React.FC = () => {
  // const { primeLoading, getPrimeVideos, noPrimeLoading, getNoPrimeVideos } =
  //   useVideos();
  // const { prime } = useAuth();
  // const [primeVideos, setPrimeVideos] = useState<[]>([]);
  // const [noPrimeVideos, setNoPrimeVideos] = useState<[]>([]);
  const { getCourses, isCoursesLoading } = useVideos();
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const coursesArr: Course[] | void = await getCourses();
      if (coursesArr) setCourses(coursesArr);
    })();
  }, [getCourses]);

  // const [value, setValue] = useState(0);

  // useEffect(() => {
  //   switch (value) {
  //     case 0:
  //       const noPrimevideos = getNoPrimeVideos();
  //       noPrimevideos.then((arr) => setNoPrimeVideos(arr));

  //       break;
  //     case 1:
  //       const primeVideos = getPrimeVideos();
  //       primeVideos.then((arr) => setPrimeVideos(arr));

  //       break;
  //     default:
  //       break;
  //   }
  // }, [value, getNoPrimeVideos, getPrimeVideos]);

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };

  return (
    <Container style={{ marginTop: "20px" }}>
      <DialogTitle style={{ textAlign: "center" }}>Курсы</DialogTitle>
      <div
        // elevation={3}
        style={{
          padding: "15px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {!isCoursesLoading ? (
          courses.map(({ name, id }) => (
            <Card
              variant="outlined"
              key={id}
              onClick={() => navigate(consts.ALLCOURSES_ROUTE + "/" + name)}
              style={{
                padding: "10px",
                cursor: "pointer",
                marginBottom: "20px",
                width: "fit-content",
              }}
            >
              {name}
              <img
                src={"https://media.tenor.com/lVhFnY9tc94AAAAC/anime-dance.gif"}
                width="200px"
                height="200px"
                style={{ display: "block" }}
                alt="Chika danse"
              ></img>
            </Card>
          ))
        ) : (
          <div className="FlexJustifyCentr">
            <Loader />
          </div>
        )}

        {/* <Box sx={{ width: "100%" }}>
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
        </Box> */}
      </div>
    </Container>
  );
};

export default AllCoursesPage;
