const chatsSocket = require("./chatsSocket");
const mongoApi = require("../mongoApi");
const utils = require("./socketUtils");
const socketApi = require("./socketApi");

const uuid = require("uuid");

module.exports.getAllUserChats = (socket) => {
  let chats = [];
  chatsSocket.chatsGet().then((res) => {
    if (res) {
      chats = utils.findAllUserChats(res, socket.handshake.query.userName);
      let preparedData = chats.map((el) => {
        socket.join(el.roomName);
        return { roomName: el.roomName, missMassage: 0 };
      });

      socket.emit("getAllUserChats", preparedData);
    }
  });
};

module.exports.connectToRoom = (io, socket, roomName) => {
  chatsSocket.getChat(roomName).then((res) => {
    if (res) {
      if (utils.isHaveAccess(res.users, socket.handshake.query.userName)) {
        delete res._id;
        delete res.users;

        socket.emit("updateData", res);

        io.to(res.roomName).emit("userConnect", {
          username: socket.username,
          numUsers: socket.rooms.size,
        });
      }
    } else {
      // err
    }
  });
};

module.exports.createMessage = (io, socket, roomName, newMessage) => {
  chatsSocket.getChat(roomName).then((res) => {
    if (res) {
      let newChat = { ...res };
      newChat.message.push(newMessage);

      delete newChat._id;

      let data = {
        id: res._id,
        new: newChat,
      };

      delete newChat.users;

      chatsSocket.chatUpdate(data).then((response) => {
        if (response.n > 0) {
          io.to(res.roomName).emit("updateData", newChat);
        } else {
          // err
        }
      });
    } else {
      // err
    }
  });
};

// role
// 0: admin
// 1: user
// 13: client

module.exports.clientSendingFirstMessage = (
  io,
  socket,
  roomName,
  newMessage
) => {
  mongoApi.findTo("users", { firstName: roomName }).then((response) => {
    mongoApi.findTo("users", { role: "1" }).then((res) => {
      chatsSocket
        .chatAdd({
          roomName,
          users: [...res, ...response],
          message: [newMessage],
        })
        .then((res) => {
          socketApi.getAllUserChats(socket);
        });
    });
  });
};

module.exports.deleteMessage = (io, socket, roomName, id) => {
  chatsSocket.getChat(roomName).then((res) => {
    if (res) {
      let newChat = { ...res };
      newChat.message = newChat.message.filter((el) => el.id !== id);

      delete newChat._id;

      let data = {
        id: res._id,
        new: newChat,
      };
      delete newChat.users;

      chatsSocket.chatUpdate(data).then((response) => {
        if (response.n > 0) {
          io.to(res.roomName).emit("updateData", newChat);
        } else {
          // err
        }
      });
    } else {
      // err
    }
  });
};
