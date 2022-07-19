import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import back from "./../utils/Images/background.jpg";
import { MdArrowBackIosNew } from "react-icons/md";
import BackButton from "../Button/BackButton";

const ChangeEmail = () => {
  //Fields
  const [email, setEmail] = useState("");
  const [code, setCode] = useState();

  //Rendering Helper
  const [isSendingCode, setIsSendingCode] = useState(true);
  const [confirmingCode, setConfirmingCode] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const validateCodeForm = () => {
    return email.length > 0;
  };

  const validateEmailForm = () => {
    return email.length > 0;
  };

  const sendingCodeFn = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(currentUser, { email: email });
      setIsSendingCode(false);
      setConfirmingCode(true);
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
      Auth.verifyCurrentUserAttributeSubmit("email", code);
      setConfirmingCode(false);
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
                  Update Email
                </button>
              </span>
            </form>
          </div>
          <img
            src={back}
            className="absolute top-0 left-0 w-screen h-[100vh] z-[-1] object-cover"
            alt="back"
          />
          <BackButton to={"/settings"} />
        </div>
      ) : (
        <div>
          {confirmingCode ? (
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
                      disabled={!validateEmailForm()}
                    >
                      Confirm Code
                    </button>
                  </span>
                </form>
              </div>
              <img
                src={back}
                className="absolute top-0 left-0 w-screen h-[100vh] z-[-1] object-cover"
                alt="back"
              />
              <BackButton to={"/settings"} />
            </div>
          ) : (
            <div>
              <span>Email Changed</span>
              <BackButton to={"/settings"} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChangeEmail;
