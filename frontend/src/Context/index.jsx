import { createContext } from "react";

const Context = createContext({
  user: {
    isLogged: false,
    setIsLogged: () => {},
    isLogging: false,
    setIsLogging: () => {},
  },
  note: {
    id: "",
    setId: () => {},
    attachment: "",
    setAttachment: () => {},
  },
});

export default Context;
