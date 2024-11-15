import Image from "next/image";
import Link from "next/link";
import userApi from "../../service/users/users.service";
import UserTabs from "./UserTabs";

type UserPageContainerProps = {
    username: string;
}

const UserPageContainer = async ({ username }: UserPageContainerProps) => {
  const userPromise = userApi.getUserData(username);
  const userMessagesPromise = userApi.getUserMessages(username);
  const userMessagesRepliesPromise = userApi.getUserMessagesReplies(username);
  const userFollowersPromise = userApi.getUserFollowers(username);
  const userFollowingPromise = userApi.getUserFollowing(username);

  const [user, userMessages, userMessagesReplies, userFollowers, userFollowing] = await Promise.all([
    userPromise,
    userMessagesPromise,
    userMessagesRepliesPromise,
    userFollowersPromise,
    userFollowingPromise,
  ]);

  return (
    <main className="flex flex-col bg-gray-100 p-8">
      <section className="flex flex-col mb-8">
        <div className="rounded-full text-center mb-4 block relative w-20 h-20">
          <Link href={`/users/${user.username}`}>
            <Image
              fill
              priority
              className="rounded-full cursor-pointer"
              src={user.photoUrl}
              alt={user.username}
            />
          </Link>
        </div>
        <h2 className="mb-1">{user.name}</h2>
        <div className="text-md mb-4 text-gray-600">
          @<Link href={`/users/${user.username}`}>{user.username}</Link>
        </div>
        <div className="mb-2">{user.bio}</div>
        <div className="flex justify-between">
          <div>
            <span className="font-semibold">
              {user.followersCount} Seguidores
            </span>
          </div>
          <div>
            <span className="font-semibold">
              {user.followingCount} Siguiendo
            </span>
          </div>
        </div>
        <UserTabs
          messages={userMessages.content}
          replies={userMessagesReplies.content}
          followers={userFollowers.content}
          following={userFollowing.content}
        />
      </section>
    </main>
  );
};

export default UserPageContainer;
