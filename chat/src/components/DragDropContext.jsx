import React from "react";
import "./DragDropContext.sass";
import Messages from "./Messages";

function DragDropContext(props) {
 

  return (
    <>
      <span className="information">{props.numberUsers}</span>
      {props.todoList.map((item, index) => (
        <Messages key={index} user={item.creator} deleteMessage={()=>props.deleteMessage(item.id)} text={item.text}></Messages>
      ))}
    </>
  );
}

export default DragDropContext;
