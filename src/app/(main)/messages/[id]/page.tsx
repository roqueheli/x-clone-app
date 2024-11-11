"use client";
import React from "react";
import messageApi from "../../../../service/messages/messages.services";
import Message from "../../../../components/messages/Message";
import MessagePostForm from "../../../../components/messages/MessagePostForm";

const Messages = async ({ params }: { params: { id: string } }) => {
  const repliesPagePromise = messageApi.getMessagesReplies(params.id, 0, 10);
  const origMessagePromise = messageApi.getMessagesById(params.id);

  const [repliesPage, origMessage] = await Promise.all([repliesPagePromise, origMessagePromise]);

  return <div className="flex flex-col bg-gray-100 p-8">
    <section className="flex flex-col mb-8">
      <Message message={origMessage} />
    </section>
    <section className="flex flex-col mb-8">
      <MessagePostForm parentId={params.id} />
    </section>
    <section className="flex flex-col w-full">
      {repliesPage.content.map((message, index) => <Message key={`msg-replies-${index}`} message={message} />)}
    </section>
  </div>;
};

export default Messages;
