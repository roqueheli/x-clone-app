"use client";
import useMessages from "../../contexts/message.context";
import Message from "./Message";

const MessageList = () => {
  const { messagePage } = useMessages();
  return messagePage?.content.map((message, index) => {
    return <Message key={index} message={message} />;
  });
};

export default MessageList;
