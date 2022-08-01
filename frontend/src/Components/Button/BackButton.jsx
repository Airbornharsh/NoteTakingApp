import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const BackButton = (props) => {
  const Navigate = useNavigate();

  const exitFn = () => {
    Navigate(props.to);
  };

  return (
    <span
      className="absolute bg-[#a134eb] top-2 left-2 flex items-center rounded p-1 text-white cursor-pointer"
      onClick={exitFn}
    >
      <MdArrowBackIosNew />
      <p className="pb-[0.1rem] pr-[0.4em]">Back</p>
    </span>
  );
};

export default BackButton;
