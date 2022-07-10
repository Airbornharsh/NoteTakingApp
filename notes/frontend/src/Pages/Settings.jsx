import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const Settings = () => {
  const Navigate = useNavigate();

  const exitFn = () => {
    Navigate("/");
  };

  return (
    <div className="h-[100vh]  w-screen flex items-center justify-center">
      <Link to={"/settings/billingform"}>Billing</Link>
      <span
        className="absolute bg-[#a134eb] top-2 left-2 flex items-center rounded p-1 text-white cursor-pointer"
        onClick={exitFn}
      >
        <MdArrowBackIosNew />
        <p className="pb-[0.1rem] pr-[0.4em]">Back</p>
      </span>
    </div>
  );
};

export default Settings;
