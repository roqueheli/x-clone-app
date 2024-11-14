import { MessageType } from "../../types/message.types";
import { PageType } from "../../types/pagination.types";
import httpExternalApi from "../common/http.external.service";
import httpInternalApi from "../common/http.internal.service";

class MessageApi {
    getMessagesFeed = async (page: number, size: number): Promise<PageType<MessageType>> => httpInternalApi.httpGetPublic(`/messages/feed`, new URLSearchParams({ page: `${page}`, size: `${size}` }));
    getMessagesById = async (id: string): Promise<MessageType> => httpInternalApi.httpGetPublic(`/messages/${id}`);
    getMessagesByHash = async (hashtag: string, page: number, size: number): Promise<PageType<MessageType>> => httpInternalApi.httpGetPublic(`/messages/hash/${hashtag}`, new URLSearchParams({ page: `${page}`, size: `${size}` }));
    getMessagesReplies = async (id: string, page: number, size: number): Promise<PageType<MessageType>> => httpInternalApi.httpGetPublic(`/messages/${id}/replies`, new URLSearchParams({ page: `${page}`, size: `${size}` }));
    postMessage = async (message: string, parentId?: string): Promise<MessageType> => httpExternalApi.httpPost(`/proxy/messages`, { message: message, parentId: parentId ?? null });
}

const messageApi = new MessageApi();
export default messageApi;