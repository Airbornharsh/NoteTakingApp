import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import Context from "../../Context";
import FacebookButton from "../../Components/Signing/FacebookButton";
import BackButton from "../../Components/Button/BackButton";
import SubmittingButton from "../../Components/Button/SubmittingButton";
import Background from "../../Components/Background";
import GoogleButton from "../../Components/Signing/GoogleButton";

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
      UserCtx.setIsLogging(false);
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
        <div className="flex flex-col items-center justify-center mt-12">
          <GoogleButton />
          <FacebookButton />
        </div>
        <form
          className="flex flex-col items-center pt-3 pb-5"
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
          <SubmittingButton
            name="Sign In"
            loader={isLoading}
            validate={validateForm}
          />
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
      <Background />
      <BackButton to={"/"} />
    </div>
  );
};

export default SignIn;
