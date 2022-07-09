import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context";

const Note = (props) => {
  const [noteId, setNoteId] = useState(props.id);
  const NoteCtx = useContext(Context).note;
  const Navigate = useNavigate();

  const RenderNote = () => {
    NoteCtx.setId(noteId);
    Navigate(`/notes/${noteId}`);
  };

  return (
    <li
      onClick={RenderNote}
      className="w-[16rem] h-[12rem] mr-4 p-2 rounded mb-4 bg-[#a134eb] text-white overflow-hidden relative"
    >
      <h3 className="mb-2 font-semibold">{props.heading}</h3>
      <p className="text-[0.8rem] ">{props.content}</p>
      <p className="absolute text-[0.7rem] top-0 right-2">
        Created: {new Date(props.createdAt).toLocaleString()}
      </p>
    </li>
  );
};

export default Note;
