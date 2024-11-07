import Message from "../../../components/messages/Message";
import React from "react";

const MessagesPage = () => {
  const messages = [
    {
      name: "Han Solo",
      username: "hsolo",
      message: "primer mensaje",
      repliesCount: 13,
    },
    {
      name: "Anakin Skywalker",
      username: "anakin",
      message: "segundo mensaje",
      repliesCount: 10,
    },
  ];

  return (
    <>
      <main className="flex flex-col bg-gray-100 p-8">
        <section className="flex flex-col mb-8">
          {messages.map((message, index) => {
            return (
                <Message key={index} message={message} />
            );
          })}
        </section>
      </main>
    </>
  );
};

export default MessagesPage;
