import { Container } from "@mui/material";
// import axios from "axios";
// import React, { useState } from "react";

const HomePage: React.FC = () => {
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

  return (
    <Container style={{ marginTop: "20px" }}>
      <h1>Home Page</h1>
      {/* <Button onClick={getImage}>Get Image</Button>
      <div>
        <img src={image} />
      </div> */}
    </Container>
  );
};

export default HomePage;
