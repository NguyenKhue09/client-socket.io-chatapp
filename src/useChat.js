import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
//const SOCKET_SERVER_URL = "http://localhost:4000";
const SOCKET_SERVER_URL = "https://deploychatapp.herokuapp.com"
const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  // tìm hiểu

  useEffect(() => {
    // tìm hiểu
    // io([url][, options]) return socket 
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });
    // console.log(socketIOClient(SOCKET_SERVER_URL, {
    //   query: { roomId },
    // })); 
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      // console.log(socketRef.current.id);  lại in ra dc id thế ms tài
      setMessages((messages) => [...messages, incomingMessage]);
    });
    // console.log(socketRef.current.id);  in ra undefined khó hiểu vl còn cái khác thì in dc cmm
    return () => {
      socketRef.current.disconnect();
    };
    // tìm hiểu return in useEffect 
    // https://www.tutorialspoint.com/using-useeffect-in-react-js-functional-component#:~:text=Inside%20useEffect%20we%20can%20add,argument%20passed%20to%20useEffect%20function.
  }, [roomId]);
  // nếu bỏ ngoặc vuông romId ko gửi dc tin nhắn

  const sendMessage = (messageBody, userName) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      userName: userName,
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return {
     messages,
     sendMessage 
  };
};

export default useChat;
