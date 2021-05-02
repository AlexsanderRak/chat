import React, { useState } from "react";
import "./SendMessageForm.sass";
import TextField from '@material-ui/core/TextField';
import { v4 as uuidv4 } from 'uuid';

function SendMessageForm(props) {
  const [taskText, setTaskText] = useState();

  const userName = JSON.parse(localStorage.getItem("user"));

  const roomName = localStorage.getItem("activeRoomName");

  const createMessage = () => {

    const newMessage = {
      id: uuidv4(),
      creator: userName._id,
      creatorName: `${userName.firstName} ${userName.middleName}`,
      dateCreate: new Date().toUTCString(),
      text: taskText,
    };
    props.send({roomName, newMessage});
    
    setTaskText("");
  };

  return (
    <div className="messageForm">
       <TextField
          className='messageForm-field'
          multiline
          value={taskText}
          onChange={(e) => {
            setTaskText(e.target.value);
          }}
        />
      <div className='messageForm-btn' onClick={createMessage}>send</div>
    </div>
  );
}

export default SendMessageForm;
