import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import Context from "../Context";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import back from "./../utils/Images/background.jpg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isValid, setIsValid] = useState(false);
  // const activeButton = "fuchsia-600";

  // const inactiveButton = "fuchsia-500";
  // const [buttonColor, setButtonColor] = useState(inactiveButton);
  const UserCtx = useContext(Context).user;
  const Navigate = useNavigate();

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      setIsLoading(false);
      UserCtx.setIsLogged(true);
      Navigate("/");
      alert("Logged In");
    } catch (e) {
      setIsLoading(false);
      setAlert(e.message);
      alert(e.message);
    }
  };

  return (
    <div className="h-[calc(100vh-3rem)] w-screen flex items-center justify-center">
      <div className="bg-white min-w-[15rem] rounded-md w-[25rem] max-w-[30rem] z-10">
        <form
          className="flex flex-col items-center py-12"
          onSubmit={handleSubmit}
        >
          <ul>
            <li className="flex flex-col">
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
            </li>
            <li className="flex flex-col">
              <label
                htmlFor="email"
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
          </ul>
          {alert ? <p className="text-[0.8rem] text-red-500">{alert}</p> : ""}
          <span
            className={`flex items-center justify-center font-bold text-white bg-[#a134eb] rounded`}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="ml-2 rotation" />
            ) : (
              ""
            )}
            <button className="px-2 py-1 " disabled={!validateForm()}>
              Sign In
            </button>
          </span>

          <p className="text-black text-[0.7rem] pt-2">
            <Link to="/user/reset/password" className="text-blue-500">
              {" "}
              Forgotten Your Password
            </Link>
          </p>

          <p className="text-black text-[0.7rem] pt-2">
            I Don't Have a Account!
            <Link to="/signup" className="text-blue-500">
              {" "}
              Sign Up
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

export default SignIn;
