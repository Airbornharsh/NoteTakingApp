import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import Context from "../Context";
import Config from "../utils/Config";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import s3Upload from "../lib/awsLib";
import BackButton from "../Components/Button/BackButton";
import SubmittingButton from "../Components/Button/SubmittingButton";

const NoteDisplay = () => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState(" ");
  const [note, setNote] = useState("");
  const [submittingButtonName, setSubmittingButtonName] =
    useState("Update Note");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [alertDisplay, setAlertDisplay] = useState("");
  const file = useRef(null);
  const noteCtx = useContext(Context).note;
  const Navigate = useNavigate();

  useEffect(() => {
    const loadNote = () => {
      return API.get("notes", `/notes/${noteCtx.id}`);
    };

    const onLoad = async () => {
      try {
        const note = await loadNote();
        const { heading, content, attachment } = note;

        if (attachment) {
          note.attachmentUrl = await Storage.vault.get(attachment);
        }

        setIsRunning(false);
        setHeading(heading);
        setContent(content);
        setNote(note);
      } catch (e) {
        //   alert("notedisplay");
        setIsRunning(false);
        alert(e);
      }
    };

    onLoad();
  }, [noteCtx.id]);

  const validateForm = () => {
    if (!(heading.trim().length > 0)) {
      setAlertDisplay("Heading is Empty");
      return false;
    }

    if (!(content.length > 0)) {
      setAlertDisplay("Description is Empty");
      return false;
    }
    return true;
  };

  const handleFileChange = (event) => {
    setAlertDisplay("");
    file.current = event.target.files[0];
  };

  const updateNote = (note) => {
    return API.put("notes", `/notes/${noteCtx.id}`, {
      body: note,
    });
  };

  const handleSubmit = async (event) => {
    let attachment;
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (file.current.value && file.current.size > Config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please Pick a file Smaller than ${
          Config.MAX_ATTACHMENT_SIZE / 100000
        }MB`
      );
      return;
    }
    setSubmittingButtonName("Updating Note");
    setIsLoading(true);

    try {
      attachment = file.current
        ? await s3Upload(file.current)
        : note.attachment;
      await updateNote({
        heading,
        content,
        attachment,
      });
      if (attachment !== note.attachment) {
        console.log("delete");
        await Storage.remove(note.attachment, { level: "private" });
      }
      Navigate("/");
    } catch (e) {
      console.log(e);
      alert("Select a File");
      setSubmittingButtonName("Update Note");
      setIsLoading(false);
    }
  };

  const deleteNote = () => {
    return API.del("notes", `/notes/${noteCtx.id}`);
  };

  const deleteData = async (event) => {
    event.preventDefault();
    const confirm = window.confirm("Are you want to Delete This Note");

    if (!confirm) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteNote();
      await Storage.remove(note.attachment, { level: "private" });
      // Navigate("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  };

  return (
    <div className="h-[100vh]  w-screen flex items-center justify-center">
      <div className="bg-white min-w-[20rem] rounded-md w-[60vw] z-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start py-12 ml-8"
        >
          {/* <a href={`${note.attachmentUrl}`}>ok</a> */}
          <ul className="w-[100%]">
            <li className="flex flex-col">
              <label htmlFor="email" className="text-[0.9rem] font-bold pl-1">
                Heading
              </label>
              <input
                autoFocus
                type="text"
                className="p-2 text-black rounded bg-gray-300 h-10 mb-4 w-[90%]"
                placeholder="Heading"
                value={heading}
                onChange={(e) => {
                  setAlertDisplay("");
                  setHeading(e.target.value);
                }}
              />
            </li>
            <li className="flex flex-col">
              <label htmlFor="email" className="text-[0.9rem] font-bold  pl-1">
                Content
              </label>
              <textarea
                autoFocus
                type="textarea"
                className="p-2 rounded text-black bg-gray-300 mb-4 min-h-[10rem] max-h-[30rem] h-[30vh] w-[90%]"
                placeholder="Description"
                value={content}
                onChange={(e) => {
                  setAlertDisplay("");
                  setContent(e.target.value);
                }}
              />
            </li>
            <li className="flex flex-col">
              <label htmlFor="email" className="text-[0.9rem] font-bold  pl-1">
                Attachment
              </label>
              {note.attachment && (
                <p className="w-[70%] h-6 overflow-auto">
                  <a href={`${note.attachmentUrl}`}>{note.attachment}</a>
                </p>
              )}
              <input
                ref={file}
                type="file"
                className="py-2 pr-2 rounded text-[0.8rem] text-black h-10 mb-2 "
                onChange={handleFileChange}
              />
            </li>
          </ul>
          <p className="mb-2 ml-2 font-semibold text-red-600">{alertDisplay}</p>
          <SubmittingButton
            name={submittingButtonName}
            loader={isLoading}
            // validate={validateForm}
          />
          <span
            className={`flex items-center justify-center font-bold text-white bg-gray-400 rounded mt-2 hover:bg-red-500`}
          >
            {isDeleting ? (
              <AiOutlineLoading3Quarters className="ml-2 rotation" />
            ) : (
              ""
            )}
            <button className="px-2 py-1 " onClick={deleteData}>
              Delete
            </button>
          </span>
        </form>
      </div>
      <BackButton to={"/"} />
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
    </div>
  );
};

export default NoteDisplay;
