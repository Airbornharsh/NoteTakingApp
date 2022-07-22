import React from "react";
import back from "../utils/Images/background.jpg";

const Background = () => {
  return (
    <img
      src={back}
      className="absolute top-0 left-0 w-screen h-[100vh] z-[-2] object-cover"
      alt="back"
    />
  );
};

export default Background;
