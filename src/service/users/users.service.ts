import { MessageType } from "../../types/message.types";
import { PageType } from "../../types/pagination.types";
import { UserType } from "../../types/user.types";
import httpInternalApi from "../common/http.internal.service";

class UserAPI {
    getMeInternal = async (accessToken: string): Promise<UserType>  => httpInternalApi.httpGet("/me", undefined, accessToken);
    getUserData = async (username: string): Promise<UserType> => httpInternalApi.httpGetPublic(`/users/${username}`);
    getUserMessages = async (username: string): Promise<PageType<MessageType>> => httpInternalApi.httpGetPublic(`/users/${username}/messages`);
    getUserMessagesReplies = async (username: string): Promise<PageType<MessageType>> => httpInternalApi.httpGetPublic(`/users/${username}/messages/replies`);
}

const userApi = new UserAPI();
export default userApi;