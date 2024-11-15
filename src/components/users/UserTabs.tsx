"use client";
import React, { useState } from "react";
import Message from "../messages/Message";
import { MessageType } from "../../types/message.types";
import { TrendingUserType } from "../../types/user.types";
import UserCard, { UserCardLayout } from "./UserCard";

enum TabView {
  MESSAGES,
  REPLIES,
  FOLLOWERS,
  FOLLOWING,
}

type UserTabsProps = {
  messages: MessageType[];
  replies: MessageType[];
  followers: TrendingUserType[];
  following: TrendingUserType[];
};

const UserTabs = ({
  messages,
  replies,
  followers,
  following,
}: UserTabsProps) => {
  const [tab, setTab] = useState<TabView>(TabView.MESSAGES);

  return (
    <>
      <div className="flex justify-evenly mt-4 mb-4 w-full">
        <div onClick={() => setTab(TabView.MESSAGES)} className={`cursor-pointer border-b-4 ${tab === TabView.MESSAGES ? "border-blue-400" : ""}`}>Mensajes</div>
        <div onClick={() => setTab(TabView.REPLIES)} className={`cursor-pointer border-b-4 ${tab === TabView.REPLIES ? "border-blue-400" : ""}`}>Respuestas</div>
        <div onClick={() => setTab(TabView.FOLLOWERS)} className={`cursor-pointer border-b-4 ${tab === TabView.FOLLOWERS ? "border-blue-400" : ""}`}>Seguidores</div>
        <div onClick={() => setTab(TabView.FOLLOWING)} className={`cursor-pointer border-b-4 ${tab === TabView.FOLLOWING ? "border-blue-400" : ""}`}>Siguiendo</div>
      </div>
      <div className="flex w-full flex-col mt-4">
        {(() => {
          switch (tab) {
            case TabView.MESSAGES:
              return messages.map((message, index) => (
                <Message key={index} message={message} />
              ));
            case TabView.REPLIES:
              return replies.map((repply, index) => (
                <Message key={index} message={repply} />
              ));
            // Añade más casos para otras pestañas
            case TabView.FOLLOWERS:
              return followers.map((user, index) => (
                <UserCard
                  key={`follower-user-${index}`}
                  user={user}
                  layout={UserCardLayout.VERTICAL}
                />
              ));
            case TabView.FOLLOWING:
              return following.map((user, index) => (
                <UserCard
                  key={`following-user-${index}`}
                  user={user}
                  layout={UserCardLayout.VERTICAL}
                />
              ));
            default:
              return messages.map((message, index) => (
                <Message key={index} message={message} />
              ));
          }
        })()}
      </div>
    </>
  );
};

export default UserTabs;
