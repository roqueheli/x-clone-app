"use client";
import messageApi from "../../../../service/messages/messages.services";
import MessagePageContainer from "./page.container";

const Messages = async ({ params }: { params: { id: string } }) => {
  const repliesPagePromise = messageApi.getMessagesReplies(params.id, 0, 10);
  const origMessagePromise = messageApi.getMessagesById(params.id);

  const [repliesPage, origMessage] = await Promise.all([repliesPagePromise, origMessagePromise]);

  return <div className="flex flex-col bg-gray-100 p-8">
    <MessagePageContainer repliesPage={repliesPage} origMessage={origMessage} parentId={params.id} />
  </div>;
};

export default Messages;
