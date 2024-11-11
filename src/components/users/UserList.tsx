"use client";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import exploreApi from "../../service/explore/explore.service";
import { PageType } from "../../types/pagination.types";
import { TrendingUserType } from "../../types/user.types";
import UserCard, { UserCardLayout } from "./UserCard";

type UserListProps = {
  initUsersPage: PageType<TrendingUserType>;
};

const UserList = ({ initUsersPage }: UserListProps) => {
  const [page, setPage] = useState<PageType<TrendingUserType>>(initUsersPage);
  const [users, setUsers] = useState<TrendingUserType[]>(initUsersPage.content);

  const fetchData = async () => {
    const response = await exploreApi.getFollowRecommendations(
      page.pagination.page + 1,
      5
    );
    setPage(response);
    setUsers([...users, ...response.content]);
  };

  const refresh = async () => {
    const response = await exploreApi.getFollowRecommendations(0, 5);
    setPage(response);
    setUsers(response.content);
  };

  return (
    <InfiniteScroll
      dataLength={users.length} //This is important field to render the next data
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
      {users?.map((user, index) => {
        return (
          <UserCard
            key={`explore-user-${index}`}
            user={user}
            layout={UserCardLayout.VERTICAL}
          />
        );
      })}
    </InfiniteScroll>
  );
};

export default UserList;
