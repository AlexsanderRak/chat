const findChatRoom = (chats, roomName) => {
  return chats.find((el) => el.roomName === roomName);
};

const findUserInRoom = (chat, userId) => {
  return chat.find((el) => el.id === userId);
};

const isHaveAccess = (users, userId) => {
    return !!(users.findIndex((el) => el._id == userId) + 1);
};

const findAllUserChats = (chats, userId) => {
    return chats.filter(el => isHaveAccess(el.users, userId));
};

module.exports.findChatRoom = findChatRoom;

module.exports.findUserInRoom = findUserInRoom;

module.exports.isHaveAccess = isHaveAccess;

module.exports.findAllUserChats = findAllUserChats;


