import React from "react";
import "./Client.sass";

import myFetch from "../utils/myFetch";
import config from "../config";

import DragDropContext from "../components/DragDropContext";
import SendMessageForm from "../components/SendMessageForm";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MyButton from "../utils/MyButton";
import MyTextField from "../utils/MyTextField";


import {
  socketInitialization,
  socketEmit,
  socket,
  getAllUserChats_api,
  connectToRoom_api,
  updateData_api,
  deleteMessage_api,
  createMessage_api,
  clientSendingFirstMessage_api,
  addUser_api,
  userLeft_api,
  disconnect_api,
  reconnect_api,
  reconnect_error_api,
  userConnect_api,
} from "../components/api";

class ClientClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      numberUsers: 0,
      chatsArray: [],
      clientName: localStorage.getItem("clientName"),
      isOpenModal: true,
      name: '',
      isSending: false,
    };
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      this.connectToSocket(user);
    }

    if (this.state.clientName) {
      this.setState({ isOpenModal: false});
    }
   
  }

  connectToSocket = (user) => {
    socketInitialization();
    socketEmit(getAllUserChats_api);

    socket.on(getAllUserChats_api, (data) => {
      this.setState({ chatsArray: data });
      this.selectedChat(user.firstName);
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
      if (user) {
        socketEmit(addUser_api, user._id);
      }
    });

    socket.on(reconnect_error_api, () => {
      console.log("attempt to reconnect has failed");
    });
  }

  handleClickOpen = () => {
    this.setState({ isOpenModal: true});
  };

  handleClose = () => {
    this.setState({ isOpenModal: false});
  };

  creatClient = () => {
    myFetch(config.creatClient, "POST", { name: this.state.name }).then(
      (res) => {
        if (res[0]?._id) {
          console.log(res[0]);
          localStorage.setItem('user', JSON.stringify(res[0]));
          localStorage.setItem('activeRoomName', res[0]?.firstName);
          this.setState({clientName: this.state.name});
          this.connectToSocket(res[0]);
        } else {
          console.log(res);
        }
      }
    );
  };

  saveName = () => {
    if (this.state.name) {
      localStorage.setItem("clientName", this.state.name);
      this.handleClose();
      this.creatClient();
    } else {
      this.setState({ isSending: true});
    }
    
  };

  deleteMessage = (id) => {
    const roomName = localStorage.getItem("activeRoomName");
    socketEmit(deleteMessage_api, { roomName, id });
  };

  sendMessage = (data) => {
    debugger
    if (!this.state.chatsArray.length) {
      socketEmit(clientSendingFirstMessage_api, data);
    } else {
      socketEmit(createMessage_api, data);
    }
    
  }

  selectedChat = (name) => {
    if (this.state.chatsArray.length) {
      socketEmit(connectToRoom_api, name);
      localStorage.setItem("activeRoomName", name);
      let newChatsArray = [...this.state.chatsArray];
      let index = newChatsArray.findIndex((el) => el.roomName === name);
      newChatsArray[index].missMassage = 0;
      this.setState({ chatsArray: newChatsArray, selectedChat: name});
    }
  };

  render() {
    return (
      <div className="client">
        <Dialog
              open={this.state.isOpenModal}
              onClose={this.handleClose}
              disableBackdropClick={true}
              className="client-dialog"
            >
              <DialogTitle>Как можно к вам обращаться?</DialogTitle>

              <DialogContent>
                    <MyTextField
                      label={"Имя"}
                      value={this.state.name}
                      change={(e) => {
                        this.setState({ isSending: false, name: e.target.value});
                      }}
                      isError={this.state.isSending && !this.state.name}
                      errorText={"Пожалуйста ввидите своё имя"}
                    />
              </DialogContent>

              <DialogActions>
                <MyButton click={this.saveName}>Задать вопрос</MyButton>
              </DialogActions>
            </Dialog>
        <div className="client-content">
          {this.state.clientName && (
            <>
              <div className="client-content-messages">
                <DragDropContext
                  todoList={this.state.messages}
                  deleteMessage={this.deleteMessage}
                  numberUsers={this.state.numberUsers}
                />
              </div>
              <div className="client-content-send">
                <SendMessageForm send={this.sendMessage}/>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default ClientClass;
