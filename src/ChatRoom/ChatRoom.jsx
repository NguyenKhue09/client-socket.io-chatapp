import React from "react";

import "./ChatRoom.css";
import useChat from "../useChat";

const ChatRoom = (props) => {
// console.log(props)
// props =  Object {
// history: {length: 3, action: "PUSH", location: {…}, createHref: ƒ, push: ƒ, …}
// location: {pathname: "/a", search: "", hash: "", state: undefined, key: "7s7nni"}
// match: {path: "/:roomId", url: "/a", isExact: true, params: {…}}
// staticContext: undefined
// __proto__: Object }
  const { roomId } = props.match.params; // params is a property of match   
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  const handleNewUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleSendMessage = () => {
    sendMessage(newMessage,userName);
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
             {message.userName} {`:`} {message.body}
            </li>
          ))}
        </ol>
      </div>
      <label>UserName:</label>
      <input 
       type="text"   
       onChange={handleNewUserNameChange}
       placeholder="Type your username"
       className="new-username-input-field"
      />
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
