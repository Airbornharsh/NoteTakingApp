import React, { Fragment, useContext, useEffect } from "react";
import Context from "../Context/index";
import Navbar from "../Components/Navbar";
import Note from "../Components/Home/Note";
import { useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { useState } from "react";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const UserCtx = useContext(Context).user;
  const Navigate = useNavigate();

  UserCtx.setIsLogging(false);

  const NewNoteFn = () => {
    Navigate("/notes/new");
  };

  useEffect(() => {
    const onLoad = async () => {
      if (!UserCtx.isLogged) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        alert(e);
      }
    };

    onLoad();
  }, [UserCtx.isLogged]);

  const loadNotes = () => {
    return API.get("notes", "/notes");
  };

  return (
    <Fragment>
      <div>{!UserCtx.isLogging ? <Navbar /> : ""}</div>
      {UserCtx.isLogged ? (
        <div className="flex flex-col justify-start mx-4">
          <span className="mt-12 mb-7">
            <button
              onClick={NewNoteFn}
              className="font-bold text-white bg-[#a134eb] rounded px-2 py-2"
            >
              New Note
            </button>
          </span>
          <ul className="flex h-[75vh] flex-wrap overflow-auto">
            {notes.map(
              ({ heading, attachment, noteId, content, createdAt }) => {
                return (
                  <Note
                    key={noteId}
                    heading={heading}
                    content={content}
                    createdAt={createdAt}
                    id={noteId}
                    attachment={attachment}
                  />
                );
              }
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default Home;
