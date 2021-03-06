import React, { useState } from "react";
import axios from "axios";

const labelClasses = [
  "indigo",
  "red",
  "blue",
  "green",
  "purple",
];

export default function CreateEvent( {url, setData, setShowCreateEvent, daySelected, user} ) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(labelClasses[0]);

  const handleTitle = ({ target }) => {
    setTitle(target.value);
  };

  const handleDescription = ({ target }) => {
    setDescription(target.value);
  };

  const handleSubmit = () => {
    const newEvent = { 
      title: title, 
      description: description,
      date: daySelected.format("YYYY-MM-DD"),
      label: selectedLabel,
      userId: user.id,
    }
    axios
      .post(`${url}/server/calendar/create`, newEvent)
      .then((res) => setData((prevData) => [...prevData, res.data]))
    setTitle("");
    setDescription("");
    setShowCreateEvent(false);
  };

  const chooseLabel = () => {
    return (
      <div className="flex gap-x-2 ml-3">
        {labelClasses.map((label, index) => (
          <span
            aria-label={`label-${label}`}
            key={index}
            onClick={() => setSelectedLabel(label)}
            className={`bg-${label}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
          >
          {selectedLabel === label && (
            <span className="text-white"> ✓ </span>
          )}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl w-1/3">
      <header className={`bg-gray-200 px-4 py-2 flex justify-between items-center`}>
        <span className="text-gray-500">Create Event:</span>
        <button className="text-gray-500" onClick={()=>setShowCreateEvent(false)}>X</button>
      </header>
  
        <div className="p-3">
          <div className="grid items-end gap-y-7">
            <div className="pt-3 border-0 text-gray-400 pb-2 w-full text-left ml-3">
              {daySelected.format("dddd, MMMM DD YYYY")}
            </div>
            <input
              aria-label="title"
              placeholder="Title"
              id="title"
              type="text"
              value={title}
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={handleTitle}
            />
            <input
              aria-label="description"
              placeholder="Description"
              id="description"
              type="text"
              value={description}
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={handleDescription}
            />
            {chooseLabel()}
          </div>
          <div className="flex justify-end p-3 mt-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-white-500 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 border border-gray-500 rounded"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}