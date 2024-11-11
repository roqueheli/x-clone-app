"use client";
import React, { useState } from "react";
import Message from "../messages/Message";
import { MessageType } from "../../types/message.types";

enum TabView {
  MESSAGES,
  REPLIES,
}

type UserTabsProps = {
  messages: MessageType[];
  replies: MessageType[];
};

const UserTabs = ({ messages, replies }: UserTabsProps) => {
  const [tab, setTab] = useState<TabView>(TabView.MESSAGES);

  return (
    <>
      <div className="flex justify-evenly mt-4 mb-4 w-full">
        <div onClick={() => setTab(TabView.MESSAGES)} className={`cursor-pointer border-b-4 ${tab === TabView.MESSAGES ? 'border-blue-400' : ''}`}>Mensajes</div>
        <div onClick={() => setTab(TabView.REPLIES)} className={`cursor-pointer border-b-4 ${tab === TabView.REPLIES ? 'border-blue-400' : ''}`}>Respuestas</div>
      </div>
      <div className="flex w-full flex-col mt-4">
        {tab === TabView.MESSAGES ? messages.map((message, index) => {
          return <Message key={index} message={message} />;
        }) : replies.map((repply, index) => {
          return <Message key={index} message={repply} />;
        })}
      </div>
    </>
  );
};

export default UserTabs;
