import React, { useContext, useState } from "react";
import { Auth } from "aws-amplify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Context from "../../Context";
import { BsFacebook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const FacebookButton = () => {
  const [isLoading, setIsLoading] = useState();

  const UserCtx = useContext(Context).user;

  const Navigate = useNavigate();

  // const waitForInit = () => {
  //   return new Promise((res, rej) => {
  //     const hasFbLoaded = () => {
  //       if (window.FB) {
  //         res();
  //       } else {
  //         setTimeout( hasFbLoaded, 300);
  //       }
  //     };
  //   });
  // };

  // const componentDidMount = async () => {
  //   await waitForInit();
  //   setIsLoading(false);
  // };

  const handleError = (error) => {
    console.log(error);
  };

  const handleFbLogin = () => {
    UserCtx.setIsLogged(true);
    Navigate("/");
  };

  const handleResponse = async (data) => {
    const { email, accessToken, expiresIn } = data;
    const expires_at = expiresIn * 1000000 + new Date().getTime();
    const user = { email };

    setIsLoading(true);

    try {
      const response = await Auth.federatedSignIn(
        "facebook",
        { token: accessToken, expires_at },
        user
      );
      setIsLoading(false);
      handleFbLogin(response);
    } catch (e) {
      setIsLoading(false);
      handleError(e);
    }
  };

  const statusChangeCallback = (response) => {
    if (response.status === "connected") {
      console.log(response);
      handleResponse(response.authResponse);
    } else {
      handleError(response);
    }
  };

  const checkLoginState = () => {
    window.FB.getLoginStatus(statusChangeCallback);
  };

  const handleClick = () => {
    window.FB.login(checkLoginState, { scope: "public_profile,email" });
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
