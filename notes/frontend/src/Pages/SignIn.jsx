import React from "react";
import { Link } from "react-router-dom";
import back from "./../utils/Images/background.jpg";

const SignIn = () => {
  return (
    <div className="h-[calc(100vh-3rem)] w-screen flex items-center justify-center">
      <div className="bg-white min-w-[15rem] rounded-md w-[25rem] max-w-[30rem] z-10">
        <form className="flex flex-col items-center py-12" action="submit">
          <ul>
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
              />
            </li> 
          </ul>
          <button className="flex items-center justify-center px-2 py-1 font-bold text-white bg-[#a134eb] rounded">
            Sign In
          </button>
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
