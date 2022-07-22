import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Context from "./Context/index";
import { Auth } from "aws-amplify";
import back from "./utils/Images/background.jpg";
import config from "./config";
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
    componentDidMount();
  };

  const loadFacebookSDK = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: config.social.FB,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v3.1",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };

  const componentDidMount = async () => {
    loadFacebookSDK();

    try {
      await Auth.currentAuthenticatedUser();
      UserCtx.setIsLogged(true);
    } catch (e) {
      // if (e !== "not authenticated") {
      //   console.log(e);
      // }
      console.log(e);
    }

    UserCtx.setIsLogging(true);
  };

  useEffect(() => {
    onLoad();
  }, []);

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
