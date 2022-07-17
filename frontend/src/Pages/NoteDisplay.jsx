import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import Context from "../Context";
import Config from "../utils/Config";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import s3Upload from "../lib/awsLib";

const NoteDisplay = () => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const file = useRef();
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
    return content.length > 0;
  };

  const handleFileChange = (event) => {
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
    console.log("submitted");
    if (file.current && file.current.size > Config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please Pick a file Smaller than ${
          Config.MAX_ATTACHMENT_SIZE / 100000
        }MB`
      );
      return;
    }

    setIsLoading(true);

    try {
      attachment = file.current ? await s3Upload(file.current) : null;
      await updateNote({
        heading,
        content,
        attachment: attachment || note.attachment,
      });
      await Storage.remove(note.attachment, { level: "private" });
      Navigate("/");
    } catch (e) {
      console.log(e);
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
      const response = await deleteNote();
      await Storage.remove(note.attachment, { level: "private" });
      console.log(response);
      Navigate("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  };

  const exitFn = () => {
    Navigate("/");
  };

  return (
    <div className="h-[100vh]  w-screen flex items-center justify-center">
      <div className="bg-white min-w-[19rem] rounded-md w-[25rem] z-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start py-12 ml-8"
        >
          {/* <a href={`${note.attachmentUrl}`}>ok</a> */}
          <ul>
            <li className="flex flex-col">
              <label htmlFor="email" className="text-[0.9rem] font-bold pl-1">
                Heading
              </label>
              <input
                autoFocus
                type="text"
                className="p-2 text-black rounded bg-gray-300 min-w-[15rem] h-10 mb-4"
                placeholder="Heading"
                value={heading}
                onChange={(e) => {
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
                className="p-2 rounded text-black bg-gray-300 h-10 mb-4 min-h-[15rem] w-[20rem]"
                placeholder="Description"
                value={content}
                onChange={(e) => {
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
                className="py-2 pr-2 rounded text-[0.8rem] text-black h-10 mb-4 "
                placeholder="Description"
                onChange={handleFileChange}
              />
            </li>
          </ul>
          <span
            className={`flex items-center justify-center font-bold text-white bg-[#a134eb] rounded`}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="ml-2 rotation" />
            ) : (
              ""
            )}
            <button className="px-2 py-1 " disabled={!validateForm()}>
              Update
            </button>
          </span>
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
      <span
        className="absolute bg-[#a134eb] top-2 left-2 flex items-center rounded p-1 text-white cursor-pointer"
        onClick={exitFn}
      >
        <MdArrowBackIosNew />
        <p className="pb-[0.1rem]">Back</p>
      </span>
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
