import { Button, Container } from "@mui/material";
// import axios from "axios";
// import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useHttp } from "../hooks/useHttp";

const HomePage: React.FC = () => {
  const { token } = useAuth();
  const { id } = useAuth();
  const { request } = useHttp();
  // const [image, setImage] = useState<any>();

  // const getImage = async () => {
  //   fetch(`${process.env.REACT_APP_SERVERURL}/api/admin/videos`).then(
  //     (response) => {
  //       response.blob().then((blobResponse) => {
  //         let img = document.createElement("img");

  //         img.src = URL.createObjectURL(blobResponse);
  //         document.body.appendChild(img);
  //       });
  //     }
  //   );

  //   const res: any = await axios.get(
  //     `${process.env.REACT_APP_SERVERURL}/api/admin/videos`, {}
  //   );

  //   console.log(res);
  //   setImage(res.data);
  //   var b64Response = btoa(res.data);

  //   var outputImg = document.createElement("img");
  //   outputImg.src = "data:image/png;base64," + b64Response;

  //   document.body.appendChild(outputImg);
  // };
  const getPrimeHandler = async () => {
    if (id) {
      try {
        await request(
          `${process.env.REACT_APP_SERVERURL}/api/prime/getPrime`,
          "POST",
          {
            id,
          },
          {
            authorization: "Bearer " + token,
          }
        );
      } catch (e) {}
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <h1>Home Page</h1>
      <Button onClick={getPrimeHandler}>Get Prime</Button>
      {/* <Button onClick={getImage}>Get Image</Button>
      <div>
        <img src={image} />
      </div> */}
    </Container>
  );
};

export default HomePage;
