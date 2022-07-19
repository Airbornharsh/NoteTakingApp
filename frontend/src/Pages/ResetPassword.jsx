import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import back from "./../utils/Images/background.jpg";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const Navigate = useNavigate();

  const exitFn = () => {
    Navigate("/settings");
  };

  const validatePasswordForm = () => {
    return (
      oldPassword.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  };

  const passwordChangeFn = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      console.log(currentUser);
      await Auth.changePassword(currentUser, oldPassword, password);
      setIsLoading(false);
      alert("PassWord Changed");
      Navigate("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-3rem)] w-screen flex items-center justify-center">
      <div className="bg-white min-w-[15rem] rounded-md w-[25rem] max-w-[30rem] z-10">
        <form
          className="flex flex-col items-center py-12"
          onSubmit={passwordChangeFn}
        >
          <ul>
            <li className="flex flex-col">
              <label
                htmlFor="email"
                className="text-[0.9rem] font-bold w-[20rem] pl-1"
              >
                Old Password
              </label>
              <input
                autoFocus
                type="text"
                className="p-2 text-black rounded bg-gray-300 w-[20rem] h-10 mb-4"
                placeholder="Code"
                autoComplete="current-password"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
            </li>
            <li className="flex flex-col">
              <label
                htmlFor="email"
                className="text-[0.9rem] font-bold w-[20rem] pl-1"
              >
                Password
              </label>
              <input
                autoFocus
                type="text"
                className="p-2 text-black rounded bg-gray-300 w-[20rem] h-10 mb-4"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </li>
            <li className="flex flex-col">
              <label
                htmlFor="email"
                className="text-[0.9rem] font-bold w-[20rem] pl-1"
              >
                Confirm Password
              </label>
              <input
                autoFocus
                type="password"
                className="p-2 text-black rounded bg-gray-300 w-[20rem] h-10 mb-4"
                placeholder="Confirm Password"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </li>
          </ul>
          <span
            className={`flex items-center justify-center font-bold text-white bg-[#a134eb] rounded`}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="ml-2 rotation" />
            ) : (
              ""
            )}
            <button
              className="px-2 py-1 "
              type="submit"
              disabled={!validatePasswordForm()}
            >
              Send Code
            </button>
          </span>
        </form>
      </div>
      <img
        src={back}
        className="absolute top-0 left-0 w-screen h-[100vh] z-[-1] object-cover"
        alt="back"
      />
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

export default ResetPassword;
