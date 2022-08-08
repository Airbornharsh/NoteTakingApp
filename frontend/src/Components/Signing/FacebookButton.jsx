import React, { useContext, useState } from "react";
import { Auth } from "aws-amplify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Context from "../../Context";
import { BsFacebook } from "react-icons/bs";

const FacebookButton = () => {
  const [isLoading, setIsLoading] = useState();

  const UserCtx = useContext(Context).user;

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await Auth.federatedSignIn({ provider: "Facebook" });
      console.log(response);
      setIsLoading(false);
      UserCtx.setIsLogged(true);
      UserCtx.setIsLogging(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <span
      className={`flex items-center justify-center font-bold text-white bg-[#a134eb] rounded h-10 relative w-[20rem] cursor-pointer`}
      onClick={handleClick}
    >
      {isLoading ? <AiOutlineLoading3Quarters className="ml-2 rotation" /> : ""}
      <BsFacebook size={"1.6rem"} className="absolute left-3" />
      <button className="px-2 py-1 " type="submit">
        Facebook
      </button>
    </span>
  );
};

export default FacebookButton;
