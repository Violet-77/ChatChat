import React from "react";

import "./Message.scss";

import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  const time = new Date().toLocaleString();

  const currentName = name.trim().toLowerCase();

  if (user === currentName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer ">
      <p className="sentText justifyEnd">
        {currentName} {time}
      </p>
      <div className="messageBox backgroundGreen justifyEnd">
        <p className="messageText ">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer ">
      <p className="sentText justifyStart pl-13">
        {user} {time}
      </p>
      <div className="messageBox backgroundLight justifyStart">
        <p className="messageText ">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  );
};

export default Message;
