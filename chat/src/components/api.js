import io from 'socket.io-client';

let socket = null;
let socketEmit = null;

// new
const getAllUserChats_api = 'getAllUserChats';
const connectToRoom_api = 'connectToRoom';
const createMessage_api = 'createMessage';
const clientSendingFirstMessage_api = 'clientSendingFirstMessage';
const updateData_api = 'updateData';
const deleteMessage_api = 'deleteMessage';
const disconnectToRoom_api = 'disconnectToRoom';


// old
const addUser_api = 'addUser';
const login_api = 'login';
const tasksList_api = 'tasksList';
const updateTask_api = 'updateTask';
const createTask_api = 'createTask';
const deleteTask_api = 'deleteTask';
const beingEdited_api = 'beingEdited';
const stopBeingEdited_api = 'stopBeingEdited';
const userConnect_api = 'userConnect';
const userLeft_api = 'userLeft';
const disconnect_api = 'disconnect';
const reconnect_api = 'reconnect';
const reconnect_error_api = 'reconnect_error';

const socketInitialization = ()=> {
    const userName = JSON.parse(localStorage.getItem("user"));
    socket = io('http://localhost:4000', {
        query: {
            userName: userName._id,
        }
    });
    socketEmit = (message, data)=> socket.emit(message, data);
}


export {
    socketInitialization,
    socketEmit,
    socket,
    
// new
    getAllUserChats_api,
    connectToRoom_api,
    createMessage_api,
    clientSendingFirstMessage_api,
    updateData_api,
    deleteMessage_api,
    disconnectToRoom_api,
    
// old
    addUser_api,
    userConnect_api,
    userLeft_api,
    login_api,
    tasksList_api,
    updateTask_api,
    createTask_api,
    deleteTask_api,
    beingEdited_api,
    stopBeingEdited_api,
    disconnect_api,
    reconnect_api,
    reconnect_error_api,
}

