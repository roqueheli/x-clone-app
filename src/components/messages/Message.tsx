import { MessageType } from "../../types/message.types";
import UserCard, { UserCardLayout } from "../users/UserCard";

type MessageProps = {
  message: MessageType;
};

const Message = ({ message }: MessageProps) => {
  return (
    <UserCard user={message.user} layout={UserCardLayout.HORIZONTAL}>
      {<p>{message.message}</p>}
    </UserCard>
  );
};

export default Message;
