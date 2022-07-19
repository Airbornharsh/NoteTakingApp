import React, { useContext, useState } from "react";
import { Auth } from "aws-amplify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Context from "../../Context";

const FacebookButton = () => {
  const [isLoading, setIsLoading] = useState();

  const UserCtx = useContext(Context).user;

  const handleError = (error) => {
    alert(error);
  };

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

  const statusChangeCallback = (response) => {
    if (response.status === "connected") {
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

  const handleFbLogin = () => {
    UserCtx.setIsLogged(true);
  };

  const handleResponse = async (data) => {
    const { email, accessToken: token, expiresIn } = data;
    const expires_at = expiresIn * 1000 + new Date().getTime();
    const user = { email };

    setIsLoading(true);

    try {
      const response = await Auth.federatedSignIn(
        "facebook",
        { token, expires_at },
        user
      );
      setIsLoading(false);
      handleFbLogin(response);
    } catch (e) {
      setIsLoading(false);
      handleError(e);
    }
  };

  return (
    <span
      className={`flex items-center justify-center font-bold text-white bg-[#a134eb] rounded h-10`}
      onClick={handleClick}
    >
      {isLoading ? <AiOutlineLoading3Quarters className="ml-2 rotation" /> : ""}
      <button className="px-2 py-1 " type="submit">
        Login with Facebook
      </button>
    </span>
  );
};

export default FacebookButton;
