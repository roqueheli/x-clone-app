import { useRouter } from "next/navigation";
import { MessageType } from "../../types/message.types";
import RepliesCounter from "../counters/RepliesCounter";
import UserCard, { UserCardLayout } from "../users/UserCard";

type MessageProps = {
  message: MessageType;
};

const Message = ({ message }: MessageProps) => {
  const router = useRouter();

  console.log('message', message);
  
  return (
    <UserCard user={message.user} layout={UserCardLayout.HORIZONTAL}>
      <div className="flex flex-col">
        <p>{message.message}</p>
        <div className="flex justify-end">
          <RepliesCounter count={message.repliesCount} onClick={() => router.push(`/messages/${message.id}`)} />
        </div>
      </div>
    </UserCard>
  );
};

export default Message;
