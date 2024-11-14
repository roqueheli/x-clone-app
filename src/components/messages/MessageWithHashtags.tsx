import Link from "next/link";
import { MessageType } from "../../types/message.types";

type MessageWithHashtagsProps = {
  message: MessageType;
};

const MessageWithHashtags = ({ message }: MessageWithHashtagsProps) => {
  const hashtagRegex = /(#[A-Za-zÁÉÍÓÚáéíóúÑñ0-9_]+)/g;
  const parts = message.message.split(hashtagRegex);

  return (
    <p>
      {parts.map((part, index) =>
        hashtagRegex.test(part) ? (
          <Link
            key={`message-hashtag-${index}`}
            href={`/?query=${part.substring(1) || ""}&type=hash`}
          >
            <span className="link-primary">{part}</span>
          </Link>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </p>
  );
};

export default MessageWithHashtags;
