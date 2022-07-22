import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SubmittingButton = (props) => {
  return (
    <span className="flex items-center justify-center font-bold text-white bg-[#a134eb] rounded hover:bg-[#6a219b]">
      {props.loader ? (
        <AiOutlineLoading3Quarters className="ml-2 rotation" />
      ) : (
        ""
      )}
      <button className="px-2 py-1 " disabled={!props.validate()}>
        {props.name}
      </button>
    </span>
  );
};

export default SubmittingButton;
