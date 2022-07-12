import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Auth } from "aws-amplify";
import Context from "../Context/index";
import back from "./../utils/Images/background.jpg";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userCtx = useContext(Context).user;
  const Navigate = useNavigate();

  const validateForm = () => {
    return (
      email.length > 0 && password.length > 0 && password === confirmPassword
    );
  };

  const validateConfirmationForm = () => {
    return confirmationCode.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  };

  const handleConfirmationSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      await Auth.signIn(email, password);
      userCtx.isLogged(true);
      userCtx.isLogging(false);
      setIsLoading(false);
      Navigate("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  };

  const renderConfirmationForm = () => {
    return (
      <div>
        {" "}
        <div className="bg-white min-w-[15rem] rounded-md w-[25rem] max-w-[30rem] z-10">
          <form
            className="flex flex-col items-center py-12"
            onSubmit={handleConfirmationSubmit}
          >
            <ul>
              <li className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-[0.9rem] font-bold w-[20rem] pl-1"
                >
                  Confirmation Code
                </label>
                <input
                  type="tel"
                  className="p-2 rounded text-black bg-gray-300 w-[20rem] h-10 mb-4"
                  placeholder="Confirm Password"
                  value={confirmationCode}
                  onChange={(e) => {
                    setConfirmationCode(e.target.value);
                  }}
                />
              </li>
            </ul>
            <p className="text-black text-[0.75rem] pb-2">
              Please check your email for the code.
            </p>
            <span className="flex items-center justify-center font-bold text-white bg-[#a134eb] rounded">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="ml-2 rotation" />
              ) : (
                ""
              )}
              <button
                className="px-2 py-1 "
                disabled={!validateConfirmationForm()}
              >
                Verify
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
    );
  };

  const renderForm = () => {
    return (
      <div>
        {" "}
        <div className="bg-white min-w-[15rem] rounded-md w-[25rem] max-w-[30rem] z-10">
          <form
            className="flex flex-col items-center py-12"
            onSubmit={handleSubmit}
          >
            <ul>
              <li className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-[0.9rem] font-bold w-[20rem] pl-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="p-2 text-black rounded bg-gray-300 w-[20rem] h-10 mb-4"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </li>
              <li className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-[0.9rem] font-bold w-[20rem] pl-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className="p-2 text-black rounded bg-gray-300 w-[20rem] h-10 mb-4"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </li>
              <li className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-[0.9rem] font-bold w-[20rem] pl-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="p-2 rounded text-black bg-gray-300 w-[20rem] h-10 mb-4"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </li>
              <li className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-[0.9rem] font-bold w-[20rem] pl-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="p-2 rounded text-black bg-gray-300 w-[20rem] h-10 mb-4"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </li>
            </ul>
            <span className="flex items-center justify-center font-bold text-white bg-[#a134eb] rounded">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="ml-2 rotation" />
              ) : (
                ""
              )}
              <button className="px-2 py-1 " disabled={!validateForm()}>
                Sign Up
              </button>
            </span>
            <p className="text-black text-[0.7rem] pt-2">
              Oops! I have a Account
              <Link to="/signin" className="text-blue-500">
                {" "}
                Sign In
              </Link>
            </p>
          </form>
        </div>
        <img
          src={back}
          className="absolute top-0 left-0 w-screen h-[100vh] z-[-1] object-cover"
          alt="back"
        />
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-3rem)] w-screen flex items-center justify-center">
      {!newUser ? renderForm() : renderConfirmationForm()}
    </div>
  );
};

export default SignUp;
