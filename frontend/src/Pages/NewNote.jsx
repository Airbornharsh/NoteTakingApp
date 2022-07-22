import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SubmittingButton from "../Components/Button/SubmittingButton";
import { API } from "aws-amplify";
import s3Upload from "../lib/awsLib";
import Config from "../utils/Config";
import BackButton from "../Components/Button/BackButton";

const NewNote = () => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();
  const file = useRef(null);

  const createNote = (note) => {
    return API.post("notes", "/notes", {
      body: note,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file.current && file.current.size > Config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          Config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }
    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;
      await createNote({ heading, content, attachment });
      Navigate("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    file.current = event.target.files[0];
    console.log(file.current.size);
  };

  const validateForm = () => {
    return heading.length > 0 && content.length > 0;
  };

  return (
    <div className="h-[100vh]  w-screen flex items-center justify-center">
      <div className="bg-white min-w-[19rem] rounded-md w-[25rem] z-10">
        <form
          className="flex flex-col items-start py-12 ml-8"
          onSubmit={handleSubmit}
        >
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
                autoComplete="current-password"
                value={heading}
                onChange={(e) => {
                  setHeading(e.target.value);
                }}
              />
            </li>
            <li className="flex flex-col">
              <label htmlFor="email" className="text-[0.9rem] font-bold  pl-1">
                Description
              </label>
              <textarea
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
              <input
                ref={file}
                type="file"
                className="py-2 pr-2 rounded text-[0.8rem] text-black h-10 mb-4 "
                placeholder="Description"
                onChange={handleFileChange}
              />
            </li>
          </ul>
          <SubmittingButton
            name="New Note"
            loader={isLoading}
            validate={validateForm}
          />
        </form>
      </div>
      <BackButton to={"/"} />
    </div>
  );
};

export default NewNote;
