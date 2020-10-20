import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.scss";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h2>Currently users: 💓</h2>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                <img alt="Online Icon" src={onlineIcon} />
                {name}
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
