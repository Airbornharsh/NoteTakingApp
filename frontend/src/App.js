import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "./Context/index";
import { Auth } from "aws-amplify";
import { MdArrowBackIosNew } from "react-icons/md";

//Pages
import Home from "./Pages/Home";
import NewNote from "./Pages/NewNote";
import NoteDisplay from "./Pages/NoteDisplay";
import Settings from "./Pages/Settings";
import BillingForm from "./Pages/BillingForm";

//Account
import ForgotPassword from "./Pages/Account/ForgotPassword";
import ResetPassword from "./Pages/Account/ResetPassword";
import ChangeEmail from "./Pages/Account/ChangeEmail";
import SignUp from "./Pages/Account/SignUp";
import SignIn from "./Pages/Account/SignIn";
import Background from "./Components/Background";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const UserCtx = useContext(Context).user;
  const NoteCtx = useContext(Context).note;
  const Navigate = useNavigate();

  useEffect(() => {
    const onLoad = async () => {
      try {
        const data = await Auth.currentAuthenticatedUser();
        await 
        UserCtx.setUserId(data.attributes.email);
        console.log(data);
        setIsLogged(true);
      } catch (e) {
        console.log(e);
      }
      setIsLogging(true);
    };

    onLoad();
    UserCtx.setIsLogged(isLogged);
  }, [UserCtx, isLogged, isLogging]);

  const exitFn = () => {
    Navigate("/");
  };

  return (
    <div>
      {/* {!UserCtx.isLogging ? <Navbar /> : ""} */}
      <div className="h-[calc(100vh)] w-screen">
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
              !UserCtx.isLogged ? (
                <SignIn />
              ) : (
                <div className="flex flex-col items-center justify-center h-screen">
                  Already Logined
                  <span
                    className="absolute bg-[#a134eb] top-2 left-2 flex items-center rounded p-1 text-white cursor-pointer"
                    onClick={exitFn}
                  >
                    <MdArrowBackIosNew />
                    <p className="pb-[0.1rem] pr-[0.4em]">Back</p>
                  </span>
                </div>
              )
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/billingform" element={<BillingForm />} />
          <Route path="/user/reset/password" element={<ForgotPassword />} />
          <Route path="/settings/reset/password" element={<ResetPassword />} />
          <Route path="/settings/update/email" element={<ChangeEmail />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <Background />
      </div>
    </div>
  );
}

export default App;
