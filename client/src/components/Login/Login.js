import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.scss";

const Login = function Login() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="loginOuterContainer">
      <div className="loginInnerContainer">
        <h1 className="heading">ChatChat</h1>
        <div>
          <input
            placeholder="Name"
            className="loginInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="loginInput mt-40"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={"button mt-40"} type="submit" alt="Please sign in">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
