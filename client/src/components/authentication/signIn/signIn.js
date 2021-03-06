import React, { useState } from "react";
import axios from "axios";

export default function SignIn( { url, setUser, user } ) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(<br></br>);

  const handleSubmit = () => {
    const user = { 
      username: email,
      password: password,
    }
    axios
      .post(`${url}/server/sessions`, user, {
        withCredentials: true,
      })
      .catch((error) => {
        setMessage("Login failed")
        throw error
      })
      .then(() => {
        axios.get(`${url}/server/users`, { withCredentials: true })
        .then((res) => localStorage.setItem("user", JSON.stringify(res.data)))
        .then(() => window.location.href = '/notes');
      })
  };

  const loginForm = () => {
    return (
      <div className="flex flex-1 grid">
        <p className="text-red-500">{message}</p>
        <div className="block bg-gray-200 h-full w-1/5 place-self-center">
          Login:
          <br></br>
          <input
            aria-label="email"
            placeholder="Email"
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <input
            aria-label="password"
            placeholder="Password"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <button
            type="submit"
            name="action"
            onClick={handleSubmit}
            className="bg-white-500 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 border border-gray-500 rounded"
          >
            Log In
          </button>
        </div>
      </div>
    )
  }

  const checkUser = () => {
    if (user) {
      return (
        <div>
          Welcome {user.username}!
        </div>
      )
    } else {
      return (
        <div>
          {loginForm()}
        </div>
      )
    }
  }

  return (
    <div>
      {checkUser()}
    </div>
  )
}