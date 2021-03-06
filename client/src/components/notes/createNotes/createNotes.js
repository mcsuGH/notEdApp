import React, { useState } from "react";
import axios from "axios";

export default function CreateNotes( {url, user, notes, setNotes} ) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(<br></br>);

  const handleTitle = ({ target }) => {
    setTitle(target.value);
  };

  const handleDescription = ({ target }) => {
    setDescription(target.value);
  };

  const handleSubmit = () => {
    if (notes.length < 10) { 
      setMessage(<br></br>)
      const newNote = { 
        title: title, 
        description: description,
        userId: user.id,
        hidden: false,
      }
      axios
        .post(`${url}/server/notes/create`, newNote)
        .then((res) => {
          let createdNote = res.data
          setNotes((prevNotes) => [createdNote, ...prevNotes]
        )});
    } else {
      setMessage("Maximum limit of 10 notes")
    }
  };

  return (
    <div className="flex flex-1 grid">
      <br></br>
      <div className="bg-gray-200 h-72 w-72 place-self-center font-mono">
        <br></br>
        Create Note:
        <br></br>
        <br></br>
        <input
          aria-label="title"
          placeholder="Title"
          id="title"
          type="text"
          className="bg-gray-200 border-dashed"
          onChange={handleTitle}
        />
        <br></br>
        <br></br>
        <input
          aria-label="description"
          placeholder="Description"
          id="description"
          type="text"
          className="bg-gray-200 border-dashed"
          onChange={handleDescription}
        />
        <br></br>
        <br></br>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-white-500 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 border border-gray-500 rounded"
        >
          Create
        </button>
        <p className="text-red-500">
          {message}
        </p>
      </div>
    </div>
  )
}