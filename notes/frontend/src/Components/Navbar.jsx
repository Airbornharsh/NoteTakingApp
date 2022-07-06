import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between w-screen px-4 py-2 h-12 bg-[#a431f2]">
      <span>
        <h1 className="text-[1.5rem] text-white">Scratch</h1>  
      </span>
      <span >
        <Link to="/singup">
          <button className="p-1 px-2 mx-4 text-black bg-white rounded">Sign Up</button>
        </Link>
        <Link to="/signin">
          <button className="p-1 px-2 text-black bg-white rounded">Sign In</button>
        </Link>
      </span>
    </nav>
  );
};

export default Navbar;
