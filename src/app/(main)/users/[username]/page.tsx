import Link from "next/link";
import React from "react";
import UserTabs from "../../../../components/users/UserTabs";
import Image from "next/image";
import Anakin from "../../../../../public/anakin.jpeg";

const UserPage = ({ params }: { params: { username: string } }) => {
  const user = {
    username: params.username,
    name: "Anakin Skywalker",
    bio: "Yo soy Anakin Skywalker",
    followersCount: 15,
    followingCount: 3,
    messages: [
      {
        name: "Anakin Skywalker",
        username: "anakin",
        message: "primer mensaje",
        repliesCount: 13,
      },
      {
        name: "Anakin Skywalker",
        username: "anakin",
        message: "segundo mensaje",
        repliesCount: 10,
      },
    ],
    replies: [
      {
        message: "Mi respupesta",
        repliesCount: 4,
      },
    ],
  };

  return (
    <main className="flex flex-col bg-gray-100 p-8">
      <section className="flex flex-col mb-8">
        <div className="rounded-full text-center mb-4 block relative w-20 h-20">
          <Image placeholder="blur" fill priority className="rounded-full cursor-pointer" src={Anakin} alt="anakin" />
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
        <UserTabs messages={user.messages} replies={[]} />
      </section>
    </main>
  );
};

export default UserPage;
