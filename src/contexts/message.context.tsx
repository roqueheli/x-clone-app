import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import messageApi from "../service/messages/messages.services";
import { MessageType } from "../types/message.types";
import { PageType } from "../types/pagination.types";

export type MessageStates = {
  origMessage?: MessageType;
  messages: MessageType[];
  messagePage: PageType<MessageType>;
  postMessage: (message: string, parentId?: string) => void;
  fetchData: () => void;
  refresh: () => void;
};

const MessageContext = createContext<MessageStates | undefined>(undefined);

type MessageProviderProps = PropsWithChildren & {
  initialPage: PageType<MessageType>;
  initialMessage?: MessageType;
};

export const MessageProvider: FC<MessageProviderProps> = ({ initialPage, initialMessage, children, }: MessageProviderProps) => {
  const [messagePage, setMessagePage] = useState<PageType<MessageType>>(initialPage);
  const [origMessage, setOrigMessage] = useState<MessageType | undefined>(initialMessage);
  const [messages, setMessages] = useState<MessageType[]>(initialPage.content);

  useEffect(() => {
    setMessagePage(initialPage);
    setMessages(initialPage.content);
  }, [initialPage]);

  const postMessage = useCallback(
    async (message: string, parentId?: string) => {
      const response = await messageApi.postMessage(message, parentId);
      setMessages([response, ...messagePage.content]);

      if (origMessage && origMessage.id === parentId) {
        setOrigMessage({
          ...origMessage,
          repliesCount: origMessage?.repliesCount + 1,
        });
        origMessage?.repliesCount;
      }
    },
    [messagePage, origMessage]
  );

  const fetchData = useCallback(async () => {
    const response = await messageApi.getMessagesFeed(
      messagePage.pagination.page + 1,
      10
    );
    setMessagePage(response);
    setMessages([...messages, ...response.content]);
  }, [messagePage.pagination.page, messages]);

  const refresh = useCallback(async () => {
    const response = await messageApi.getMessagesFeed(0, 10);
    setMessagePage(response);
    setMessages(response.content);
  }, []);

  const value = useMemo(
    () => ({
      origMessage,
      messages,
      messagePage,
      postMessage,
      fetchData,
      refresh,
    }),
    [origMessage, messages, messagePage, postMessage, fetchData, refresh]
  );

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

const useMessages = (): MessageStates => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};

export default useMessages;
