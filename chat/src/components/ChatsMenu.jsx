import React, { useState } from "react";
import MyTextField from "../utils/MyTextField";
import "./ChatsMenu.sass";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import MyIcons from "../utils/MyIcons";
import MyBadge from "../utils/MyBadge";

function ChatsMenu(props) {
  const [isOpen, setIsOpen] = useState(true);
  const prepareName = (name) => {
    return name.split(':')[0];
  }

  return (
    <div className="chatsMenu">
      <div className="chatsMenu-content">
        <div className="chatsMenu-content-search">
          <MyTextField label="Search"></MyTextField>
          <MyIcons>
            <SearchRoundedIcon />
          </MyIcons>
        </div>
        <div className="chatsMenu-content-chats">
          {props.chatsArray.map((item, index) => (
            <div
              key={index}
              className={`chatsMenu-content-chats-item ${item.roomName === props.activeRoom && 'chatsMenu-content-chats-item-active'}`}
              onClick={() => props.selectedChat(item.roomName)}
            >
              <span className="chatsMenu-content-chats-item-name">
                {prepareName(item.roomName)}
              </span>
              {item.missMassage !== 0 && (
                <MyBadge messages={item.missMassage} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatsMenu;
