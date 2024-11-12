import Link from "next/link";
import React from "react";
import PostCounter from "../counters/PostCounter";
import { HashtagType } from "../../types/hash.types";

type MessageHashtagProps = {
  hash: HashtagType;
};

const MessageHashtag = ({ hash }: MessageHashtagProps) => {
  return (
    <>
      <Link href={`/?query=${hash.hash?.replace("#", "") || ''}&type=hash`}>
        <h4 className="font-semibold cursor-pointer p-1">{hash.hash}</h4>
      </Link>
      <div className="px-1">
        <PostCounter count={hash.count} />
      </div>
    </>
  );
};

export default MessageHashtag;
