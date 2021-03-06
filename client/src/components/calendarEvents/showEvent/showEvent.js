import React from "react";
import axios from 'axios'
import dayjs from 'dayjs';

export default function ShowEvent( {url, event, setEventSelected, setData} ) {
  const labelValues = {
    "indigo": "General",
    "red": "Personal",
    "blue": "Family & Friends",
    "green": "Birthdays",
    "purple": "Holidays",
  }

  const handleDelete = (eventId) => {
    axios
      .delete(`${url}/server/calendar/delete/${eventId}`)
      .then(setData((prevData) => {
        return prevData.filter((event) => event._id !== eventId)
      }))
      .then(setEventSelected(null))
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl w-1/3 h-1/2">
        <header className={`bg-${event.label}-500 px-4 py-2 flex justify-between items-center`}>
          <span className="text-white">{labelValues[event.label]}</span>
          <button className="text-white" onClick={()=>setEventSelected(null)}>X</button>
        </header>
        <div className="p-1">
          <div className="grid items-end gap-y-1">
            <div className="pt-2 border-0 text-gray-400 pb-2 w-full text-left ml-3">
              {dayjs(event.date).format("dddd, MMMM DD YYYY")}
            </div>
            <p
              aria-label="showTitle"
              id="showTitle"
              className="pt-2 pb-2 border-0 text-gray-600 text-xl font-semibold pb-2 w-full h-28 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 overflow-auto break-all"
            >
              {event.title}
            </p>
          
            <p
              aria-label="showDescription"
              id="showDescription"
              className="pt-2 pb-2 border-0 text-gray-600 w-full h-40 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 overflow-auto break-all"
            >
              {event.description}
            </p>
            <button
              onClick={() => {handleDelete(event._id)}}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}