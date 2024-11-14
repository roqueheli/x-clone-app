import { useRouter } from "next/navigation";
import { MessageType } from "../../types/message.types";
import RepliesCounter from "../counters/RepliesCounter";
import UserCard, { UserCardLayout } from "../users/UserCard";
import MessageWithHashtags from "./MessageWithHashtags";

type MessageProps = {
  message: MessageType;
};

const Message = ({ message }: MessageProps) => {
  const router = useRouter();

  return (
    <UserCard user={message.user} layout={UserCardLayout.HORIZONTAL}>
      <div className="flex flex-col">
        <MessageWithHashtags message={message} />
        <div className="flex justify-end">
          <RepliesCounter
            count={message.repliesCount}
            onClick={() => router.push(`/messages/${message.id}`)}
          />
        </div>
      </div>
    </UserCard>
  );
};

export default Message;
