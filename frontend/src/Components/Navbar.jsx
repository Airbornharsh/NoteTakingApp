import { Auth } from "aws-amplify";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import Context from "../Context/index";

const Navbar = () => {
  const UserCtx = useContext(Context).user;
  const Navigate = useNavigate();

  const LogOutFn = async () => {
    await Auth.signOut();
    UserCtx.setIsLogging(true);
    UserCtx.setIsLogged(false);
    Navigate("/signin");
  };

  const SignUpFn = () => {
    Navigate("/signup");
    UserCtx.setIsLogging(true);
  };

  const SignInFn = () => {
    Navigate("/signin");
    UserCtx.setIsLogging(true);
  };

  const settingRender = () => {
    Navigate("/settings");
  };

  return (
    <nav className="flex justify-between w-screen px-4 py-2 h-12 bg-[#760bbe] shadow-lg">
      <span>
        <h1 className="text-[1.5rem] text-white logoFont font-extrabold">
          NOT
        </h1>
      </span>
      <span className="flex items-center justify-center">
        {UserCtx.isLogged ? (
          <span>
            {UserCtx.isLogging ? (
              ""
            ) : (
              <span>
                <button
                  onClick={LogOutFn}
                  className="p-1 px-2 mx-4 text-black bg-[#dcdcdc] rounded"
                >
                  Log Out
                </button>
              </span>
            )}
          </span>
        ) : (
          <span>
            <span>
              <button
                onClick={SignUpFn}
                className="p-1 px-2 mx-4 text-black rounded bg-[#dcdcdc]"
              >
                Sign Up
              </button>
            </span>
            <span>
              <button
                onClick={SignInFn}
                className="p-1 px-2 text-black bg-[#dcdcdc] rounded"
              >
                Sign In
              </button>
            </span>
          </span>
        )}
        {UserCtx.isLogged && (
          <span onClick={settingRender} className="cursor-pointer">
            <FiSettings size={"1.5rem"} color="white" />
          </span>
        )}
      </span>
    </nav>
  );
};

export default Navbar;
