import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import back from "./../utils/Images/background.jpg";
import BackButton from "../Button/BackButton";

const ForgotPassword = () => {
  //Fields
  const [email, setEmail] = useState("");
  const [code, setCode] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  //Rendering Helper
  const [isSendingCode, setIsSendingCode] = useState(true);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const validateCodeForm = () => {
    return email.length > 0;
  };

  const validatePasswordForm = () => {
    return email.length > 0;
  };

  const sendingCodeFn = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.forgotPassword(email);
      setIsSendingCode(false);
      setIsPasswordChanging(true);
      setIsLoading(false);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  };

  const settingPasswordChange = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      setIsPasswordChanging(false);
      setIsLoading(false);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isSendingCode ? (
        <div className="h-[calc(100vh-3rem)] w-screen flex items-center justify-center">
          <div className="bg-white min-w-[15rem] rounded-md w-[25rem] max-w-[30rem] z-10">
            <form
              className="flex flex-col items-center py-12"
              onSubmit={sendingCodeFn}
            >
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-[0.9rem] font-bold w-[20rem] pl-1"
                >
                  Email Address
                </label>
                <input
                  autoFocus
                  type="email"
                  className="p-2 text-black rounded bg-gray-300 w-[20rem] h-10 mb-4"
                  placeholder="Email Address"
                  autoComplete="current-password"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <span
                className={`flex items-center justify-center font-bold text-white bg-[#a134eb] rounded`}
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="ml-2 rotation" />
                ) : (
                  ""
                )}
                <button
                  type="submit"
                  className="px-3 py-2 "
                  disabled={!validateCodeForm()}
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
        </div>
      ) : (
        <div>
          {isPasswordChanging ? (
            <div className="h-[calc(100vh-3rem)] w-screen flex items-center justify-center">
              <div className="bg-white min-w-[15rem] rounded-md w-[25rem] max-w-[30rem] z-10">
                <form
                  className="flex flex-col items-center py-12"
                  onSubmit={settingPasswordChange}
                >
                  <ul>
                    <li className="flex flex-col">
                      <label
                        htmlFor="email"
                        className="text-[0.9rem] font-bold w-[20rem] pl-1"
                      >
                        Code
                      </label>
                      <input
                        autoFocus
                        type="number"
                        className="p-2 text-black rounded bg-gray-300 w-[20rem] h-10 mb-4"
                        placeholder="Code"
                        autoComplete="current-password"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
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
                        type="password"
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
                  <p className="text-[0.8rem] mb-3">{`Code was Sent to ${email}`}</p>
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
            </div>
          ) : (
            <div>Login Success</div>
          )}
        </div>
      )}
      <BackButton to={"/signin"} />
    </div>
  );
};

export default ForgotPassword;
