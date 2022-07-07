import React, { useState } from "react";
import Context from "./index.jsx";

const ContextProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  const setIsLoggedFn = (data) => {
    setIsLogged(data);
  };

  const setIsLoggingFn = (data) => {
    setIsLogging(data);
  };

  const ContextData = {
    user: {
      isLogged: isLogged,
      setIsLogged: setIsLoggedFn,
      isLogging: isLogging,
      setIsLogging: setIsLoggingFn,
    },
  };

  return (
    <Context.Provider value={ContextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
