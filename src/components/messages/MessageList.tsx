import useMessages from "../../contexts/message.context";
import Message from "./Message";

const MessageList = () => {
  const { messages } = useMessages();
  return messages?.map((message, index) => {
    return <Message key={index} message={message} />;
  });
};

export default MessageList;
