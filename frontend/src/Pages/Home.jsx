import React, { Fragment, useContext, useEffect, useState } from "react";
import Context from "../Context/index";
import Navbar from "../Components/Navbar";
import Note from "../Components/Home/Note";
import { useNavigate } from "react-router-dom";
import { API } from "aws-amplify";
import { AiOutlineLoading3Quarters, AiFillDelete } from "react-icons/ai";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [isRunning, setIsRunning] = useState(true);
  const [deleteColor, setDeleteColor] = useState("gray");
  const UserCtx = useContext(Context).user;
  const Navigate = useNavigate();

  UserCtx.setIsLogging(false);

  const NewNoteFn = () => {
    Navigate("/notes/new");
  };

  useEffect(() => {
    const onLoad = async () => {
      if (!UserCtx.isLogged) {
        setIsRunning(false);
        return;
      }

      try {
        const notes = await loadNotes();
        setIsRunning(false);
        setNotes(notes);
      } catch (e) {
        console.log("list");
        setIsRunning(false);
        alert(e);
      }
    };

    onLoad();
  }, [UserCtx.isLogged]);

  const loadNotes = () => {
    return API.get("notes", "/notes");
  };

  const DragOver = (event) => {
    event.preventDefault();
    setDeleteColor("red");
  };

  const deleteNote = (noteId) => {
    return API.del("notes", `/notes/${noteId}`);
  };

  const deleteNoteDisplay = (element) => {
    element.remove();
  };

  const Drop = async (event) => {
    event.preventDefault();
    const noteId = event.dataTransfer.getData("noteId");

    if (!noteId) {
      return;
    }

    event.preventDefault();
    const confirm = window.confirm("Are you want to Delete This Note");

    if (!confirm) {
      return;
    }

    const element = document.getElementById(noteId);
    deleteNoteDisplay(element);

    try {
      const response = await deleteNote(noteId);
      // await Storage.remove(note.attachment, { level: "private" });
      setDeleteColor("gray");
      console.log(response);
    } catch (e) {
      alert(e);
      setDeleteColor("gray");
    }
  };

  return (
    <Fragment>
      <div>{!UserCtx.isLogging ? <Navbar /> : ""}</div>
      {UserCtx.isLogged ? (
        <div className="flex flex-col justify-start mx-4">
          <span className="flex items-center mt-12 mb-7">
            <button
              onClick={NewNoteFn}
              className="font-bold text-white bg-[#a134eb] rounded px-2 py-2"
            >
              New Note
            </button>
            <span
              onDragOver={DragOver}
              onDragLeaveCapture={() => {
                setDeleteColor("gray");
              }}
              onDrop={Drop}
              className="h-8 ml-4 "
            >
              <AiFillDelete color={deleteColor} size="2rem" />
            </span>
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
      {isRunning && (
        <div className="fixed top-0 left-0 h-[100vh] w-screen bg-[rgba(0,0,0,0.3)] z-30 flex justify-center items-center">
          <span className="loader">
            <AiOutlineLoading3Quarters
              size="5rem"
              color="rgba(0,0,0,0.7)"
              className="ml-2 rotation"
            />
          </span>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
