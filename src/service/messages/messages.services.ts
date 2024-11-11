import { MessageType } from "../../types/message.types";
import { PageType } from "../../types/pagination.types";
import { httpGetPublic, httpPost } from "../common/http.service";

class MessageApi {
    getMessagesFeed = async (page: number, size: number): Promise<PageType<MessageType>> => httpGetPublic(`/messages/feed`, new URLSearchParams({ page: `${page}`, size: `${size}` }));
    getMessagesById = async (id: string): Promise<MessageType> => httpGetPublic(`/messages/${id}`);
    getMessagesReplies = async (id: string, page: number, size: number): Promise<PageType<MessageType>> => httpGetPublic(`/messages/${id}/replies`, new URLSearchParams({ page: `${page}`, size: `${size}` }));
    postMessage = async (message: string, parentId?: string): Promise<MessageType> => httpPost(`/messages`, { message: message, parentId: parentId ?? null });
}

const messageApi = new MessageApi();
export default messageApi;