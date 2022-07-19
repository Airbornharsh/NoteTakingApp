import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../Button/BackButton";

const Settings = () => {

  return (
    <div className="h-[100vh]  w-screen flex items-center justify-center flex-col">
      <Link to={"/settings/update/email"}>Change Email</Link>
      <Link to={"/settings/reset/password"}>Change Password</Link>
      <Link to={"/settings/billingform"}>Billing</Link>
      <BackButton to={"/"} />
    </div>
  );
};

export default Settings;
