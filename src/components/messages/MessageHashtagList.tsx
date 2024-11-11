"use client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import exploreApi from "../../service/explore/explore.service";
import { HashtagType } from "../../types/hash.types";
import { PageType } from "../../types/pagination.types";
import MessageHashtag from "./MessageHashtag";

type MessageHashtagListProps = {
  initHashtagsPage: PageType<HashtagType>;
};

const MessageHashtagList = ({ initHashtagsPage }: MessageHashtagListProps) => {
  const [page, setPage] = useState<PageType<HashtagType>>(initHashtagsPage);
  const [hashtags, setHashtags] = useState<HashtagType[]>(
    initHashtagsPage.content
  );

  const fetchData = async () => {
    const response = await exploreApi.getTrendingHashtags(
      page.pagination.page + 1,
      5
    );
    setPage(response);
    setHashtags([...hashtags, ...response.content]);
  };

  const refresh = async () => {
    const response = await exploreApi.getTrendingHashtags(0, 5);
    setPage(response);
    setHashtags(response.content);
  };

  return (
    <InfiniteScroll
      dataLength={hashtags.length} //This is important field to render the next data
      next={fetchData}
      hasMore={!page.pagination.last}
      loader={<h4>Cargando más mensajes...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      // below props only if you need pull down functionality
      refreshFunction={refresh}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
      }
    >
      {hashtags?.map((hashtag, index) => {
        return <MessageHashtag key={`explore-hash-${index}`} hash={hashtag} />;
      })}
    </InfiniteScroll>
  );
};

export default MessageHashtagList;
