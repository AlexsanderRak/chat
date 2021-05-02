import React, { useState } from "react";
import "./Messages.sass";


function Messages(props) {
  const [isOpen, setIsOpen] = useState(true);

  const userName = JSON.parse(localStorage.getItem("user"));

  return (
    <div className={`messages ${userName._id === props.user ? 'messages-local' : 'messages-income'}`}>
      <div className="messages-content">
        {props.text}
      </div>
      <i onClick={props.deleteMessage}>X</i>
    </div>
  );
}

export default Messages;
