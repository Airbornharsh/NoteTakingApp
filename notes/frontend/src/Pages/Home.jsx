import React, { useContext } from "react";
import Context from "../Context/index";
import Navbar from "../Components/Navbar";
// import { Link } from "react-router-dom";

const Home = () => {
  const UserCtx = useContext(Context).user;

  UserCtx.setIsLogging(false);

  return <div>{!UserCtx.isLogging ? <Navbar /> : ""}</div>;
};

export default Home;
