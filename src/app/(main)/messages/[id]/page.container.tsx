"use client";
import Message from "../../../../components/messages/Message";
import MessageList from "../../../../components/messages/MessageList";
import MessagePostForm from "../../../../components/messages/MessagePostForm";
import useMessages, { MessageProvider, } from "../../../../contexts/message.context";
import { MessageType } from "../../../../types/message.types";
import { PageType } from "../../../../types/pagination.types";

type MessagePageContainerProps = {
  origMessage: MessageType;
  repliesPage: PageType<MessageType>;
  parentId?: string;
};

const MessageContainer = () => {
  const { origMessage } = useMessages();
    
  if (!origMessage) return <></>;
  return (
    <section className="flex flex-col mb-8">
      <Message message={origMessage} />
    </section>
  );
};

const MessagePageContainer = ({ origMessage, repliesPage, parentId, }: MessagePageContainerProps) => {
  return (
    <MessageProvider initialPage={repliesPage} initialMessage={origMessage}>
      <MessageContainer />
      <section className="flex flex-col mb-8">
        <MessagePostForm parentId={parentId} />
      </section>
      <section className="flex flex-col w-full">
        <MessageList />
      </section>
    </MessageProvider>
  );
};

export default MessagePageContainer;
