import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
// import Navbar from "./Components/Navbar";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import { useContext, useEffect } from "react";
import Context from "./Context/index";
import { Auth } from "aws-amplify";
import NewNote from "./Pages/NewNote";
import NoteDisplay from "./Pages/NoteDisplay";
import Settings from "./Pages/Settings";
import BillingForm from "./Pages/BillingForm";

function App() {
  const UserCtx = useContext(Context).user;
  const NoteCtx = useContext(Context).note;
  const Navigate = useNavigate();

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      UserCtx.setIsLogged(true);
      Navigate("/");
    } catch (e) {
      // if (e !== "No current user"){
      UserCtx.setIsLogging(true);
      // }
    }
  };

  useEffect(() => {
    onLoad();
  },);

  return (
    <div>
      {/* {!UserCtx.isLogging ? <Navbar /> : ""} */}
      <div className="h-[calc(100vh)] w-screen bg-zinc-200 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes/new" element={<NewNote />} />
          <Route
            path={`/notes/:${NoteCtx.id}`}
            element={NoteCtx.id ? <NoteDisplay /> : ""}
          />
          <Route
            path="/signup"
            element={
              !UserCtx.isLogged ? <SignUp /> : <div>Already Logined</div>
            }
          />
          <Route
            path="/signin"
            element={
              !UserCtx.isLogged ? <SignIn /> : <div>Already Logined</div>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/billingform" element={<BillingForm />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
