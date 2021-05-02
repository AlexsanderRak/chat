import React from "react";
import "./Chats.sass";

import DragDropContext from "../components/DragDropContext";
import SendMessageForm from "../components/SendMessageForm";
import ChatsMenu from "../components/ChatsMenu";

import {
  socketInitialization,
  socketEmit,
  socket,
  getAllUserChats_api,
  connectToRoom_api,
  updateData_api,
  deleteMessage_api,
  createMessage_api,
  disconnectToRoom_api,
  addUser_api,
  userLeft_api,
  login_api,
  tasksList_api,
  updateTask_api,
  deleteTask_api,
  beingEdited_api,
  stopBeingEdited_api,
  disconnect_api,
  reconnect_api,
  reconnect_error_api,
  userConnect_api,
} from "../components/api";

class ChatsClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      numberUsers: 0,
      chatsArray: [],
      selectedChat: localStorage.getItem("activeRoomName"),
    };
  }

  componentDidMount() {
    const username = JSON.parse(localStorage.getItem("user"));
    socketInitialization();

    if (username) {
      socketEmit(getAllUserChats_api);
    }

    if (this.state.selectedChat) {
      socketEmit(connectToRoom_api, this.state.selectedChat);
    }

    socket.on(getAllUserChats_api, (data) => {
      this.setState({ chatsArray: data });
    });

    socket.on(updateData_api, (data) => {
      const roomName = localStorage.getItem("activeRoomName");
      if (roomName === data.roomName) {
        this.setState({
          messages: data.message,
        });
      } else {
        let newChatsArray = [...this.state.chatsArray];
        let index = newChatsArray.findIndex(
          (el) => el.roomName === data.roomName
        );
        newChatsArray[index].missMassage++;
        this.setState({ chatsArray: newChatsArray });
      }
    });

    socket.on(userConnect_api, (data) => {
      this.setState({ numberUsers: data.numUsers });
    });

    socket.on(userLeft_api, (data) => {
      this.setState({ numberUsers: data.numUsers });
    });

    socket.on(disconnect_api, () => {
      console.log("you have been disconnected");
    });

    socket.on(reconnect_api, () => {
      console.log("you have been reconnected");
      if (username) {
        socketEmit(addUser_api, username._id);
      }
    });

    socket.on(reconnect_error_api, () => {
      console.log("attempt to reconnect has failed");
    });
  }

  deleteMessage = (id) => {
    const roomName = localStorage.getItem("activeRoomName");
    socketEmit(deleteMessage_api, { roomName, id });
  };

  selectedChat = (name) => {
    socketEmit(connectToRoom_api, name);
    localStorage.setItem("activeRoomName", name);
    let newChatsArray = [...this.state.chatsArray];
    let index = newChatsArray.findIndex((el) => el.roomName === name);
    newChatsArray[index].missMassage = 0;
    this.setState({ chatsArray: newChatsArray, selectedChat: name});
  };

  sendMassage = (data) => {
    socketEmit(createMessage_api, data);
  }

  render() {
    return (
      <div className="chats">
        <ChatsMenu
          chatsArray={this.state.chatsArray}
          selectedChat={this.selectedChat}
          activeRoom={this.state.selectedChat}
        ></ChatsMenu>
        <div className="chats-content">
          {this.state.selectedChat && (
            <>
              <div className="chats-content-messages">
                <DragDropContext
                  todoList={this.state.messages}
                  deleteMessage={this.deleteMessage}
                  numberUsers={this.state.numberUsers}
                />
              </div>
              <div className="chats-content-send">
                <SendMessageForm send={this.sendMassage} />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default ChatsClass;
