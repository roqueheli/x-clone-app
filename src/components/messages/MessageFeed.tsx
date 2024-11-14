import InfiniteScroll from "react-infinite-scroll-component";
import useMessages from "../../contexts/message.context";
import Message from "./Message";

const MessageFeed = () => {
  const { messages, messagePage, fetchData, refresh } = useMessages();

  return (
    <InfiniteScroll
      dataLength={messages.length} //This is important field to render the next data
      next={fetchData}
      hasMore={!messagePage.pagination.last}
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
