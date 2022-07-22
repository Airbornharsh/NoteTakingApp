import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../Context";

const Note = (props) => {
  const NoteCtx = useContext(Context).note;
  const Navigate = useNavigate();

  const RenderNote = () => {
    NoteCtx.setId(props.id);
    Navigate(`/notes/${props.id}`);
  };

  const DragStart = (event) => {
    event.dataTransfer.setData("noteId", `${event.target.id}`);
    event.dataTransfer.setData("noteAttachment", `${event.target.attachment}`);
  };

  return (
    <li
      onClick={RenderNote}
      draggable="true"
      id={props.id}
      attachment={props.attachment}
      onDragStart={DragStart}
      className="w-[16rem] h-[12rem] mr-4 p-2 rounded mb-4 bg-[#a134eb] text-white overflow-hidden relative cursor-pointer"
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
