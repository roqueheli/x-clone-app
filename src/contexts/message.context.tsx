import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";
import messageApi from "../service/messages/messages.services";
import { MessageType } from "../types/message.types";
import { PageType } from "../types/pagination.types";

export type MessageStates = {
    origMessage?: MessageType;
    messagePage: PageType<MessageType>;
    postMessage: (message: string, parentId?: string) => void;
}

const MessageContext = createContext<MessageStates | undefined>(undefined);

type MessageProviderProps = PropsWithChildren & {
    initialPage: PageType<MessageType>;
    initialMessage?: MessageType; 
}

export const MessageProvider: FC<MessageProviderProps> = ({initialPage, initialMessage, children}: MessageProviderProps) => {
    const [messagePage, setMessagePage] = useState<PageType<MessageType>>(initialPage);
    const [origMessage, setOrigMessage] = useState<MessageType | undefined>(initialMessage);

    const postMessage = useCallback(async (message: string, parentId?: string) => {
        const response = await messageApi.postMessage(message, parentId);
        setMessagePage({ ...messagePage, content: [response, ...messagePage.content]});
        if(origMessage && origMessage.id === parentId) {
            setOrigMessage({
                ...origMessage,
                repliesCount: origMessage?.repliesCount + 1,
            })
            origMessage?.repliesCount
        }
    }, [messagePage, origMessage]);

    const value = useMemo(() => ({
        origMessage,
        messagePage,
        postMessage
    }), [origMessage, messagePage, postMessage]);

    return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
}

const useMessages = () : MessageStates => {
    const context = useContext(MessageContext);
    if(!context){
        throw new Error("useMessages must be used within a MessageProvider");
    }
    return context;
}

export default useMessages;