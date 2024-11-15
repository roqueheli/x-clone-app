import Image from "next/image";
import React, { PropsWithChildren } from "react";
import { TrendingUserType, UserType } from "../../types/user.types";
import Link from "next/link";

export enum UserCardLayout {
  HORIZONTAL,
  VERTICAL,
}

const divClasses = {
  [UserCardLayout.HORIZONTAL]: "flex",
  [UserCardLayout.VERTICAL]: "flex flex-col",
};

const linkClasses = {
  [UserCardLayout.HORIZONTAL]: "ml-2",
  [UserCardLayout.VERTICAL]: "",
};

type UserCardProps = PropsWithChildren & {
  user: TrendingUserType | UserType;
  layout: UserCardLayout;
};

const UserCard = ({ user, layout, children }: UserCardProps) => {
  return (
    <div className="mb-4 grid grid-cols-12">
      <div className="w-full h-full rounded-full text-center mb-4 col-span-2 flex items-center justify-center">
      <Link href={`/users/${user.username}`}>
        <Image
          priority
          width={80}
          height={80}
          className="rounded-full cursor-pointer"
          src={user.photoUrl}
          alt={user.username}
        />
      </Link>
      </div>
      <div className="flex flex-col ml-4 justify-center col-span-10">
        <div className={divClasses[layout]}>
          <h3>{user.name}</h3>
          <div
            className={`${linkClasses[layout]} text-md text-gray-600 cursor-pointer`}
          >
            @<Link href={`/users/${user.username}`}>{user.username}</Link>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default UserCard;
