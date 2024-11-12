"use client";
import React, { useEffect, useState } from "react";
import Message from "./Message";
import InfiniteScroll from "react-infinite-scroll-component";
import { PageType } from "../../types/pagination.types";
import { MessageType } from "../../types/message.types";
import messageApi from "../../service/messages/messages.services";

type MessageFeedProps = {
  initMessages: PageType<MessageType>;
};

const MessageFeed = ({ initMessages }: MessageFeedProps) => {
  const [msgRsp, setMsgRsp] = useState<PageType<MessageType>>(initMessages);
  const [messages, setMessages] = useState<MessageType[]>(initMessages.content);

  useEffect(() => {
    setMsgRsp(initMessages);
    setMessages(initMessages.content);
  }, [initMessages]);

  const fetchData = async () => {
    const response = await messageApi.getMessagesFeed(msgRsp.pagination.page + 1, 10);
    setMsgRsp(response);
    setMessages([...messages, ...response.content]);
  };

  const refresh = async () => {
    const response = await messageApi.getMessagesFeed(0, 10);
    setMsgRsp(response);
    setMessages(response.content);
  };

  return (
    <InfiniteScroll
      dataLength={messages.length} //This is important field to render the next data
      next={fetchData}
      hasMore={!msgRsp.pagination.last}
      loader={<h4>Cargando más mensajes...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      // below props only if you need pull down functionality
      refreshFunction={refresh}
      pullDownToRefresh={false}
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
      }
    >
      {messages.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
    </InfiniteScroll>
  );
};

export default MessageFeed;
