import { Auth } from "aws-amplify";
import React, { useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import Context from "../../Context";

const GoogleButton = () => {
  const [isLoading, setIsLoading] = useState();

  const UserCtx = useContext(Context).user;

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await Auth.federatedSignIn({
        provider: "Google",
      });
      UserCtx.setIsLogged(true);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <span
      className={`flex items-center justify-center font-bold text-white bg-[#a134eb] rounded h-10 mb-3 relative w-[20rem]`}
      onClick={handleClick}
    >
      {isLoading ? <AiOutlineLoading3Quarters className="ml-2 rotation" /> : ""}
      <BsGoogle size={"1.6rem"} className="absolute left-3" />
      <button className="px-2 py-1" type="submit">
        Google
      </button>
    </span>
  );
};

export default GoogleButton;
