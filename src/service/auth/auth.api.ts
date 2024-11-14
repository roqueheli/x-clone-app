import { LoginResponseType, RedisResponseType } from "../../types/auth.types";
import httpExternalApi from "../common/http.external.service";
import httpInternalApi from "../common/http.internal.service";

class AuthAPI {
    getRedisValue = async (key: string): Promise<RedisResponseType> => httpExternalApi.httpGet(`/redis`, new URLSearchParams({ key: key}), process.env.REDIS_API_TOKEN);
    login = async (username: string, password: string): Promise<LoginResponseType> => httpExternalApi.httpPost(`/auth/login`, { username, password });
    logout = async (): Promise<LoginResponseType> => httpExternalApi.httpPost(`/auth/logout`, {});
    loginInternal = async (username: string, password: string): Promise<LoginResponseType> => httpInternalApi.httpPostPublic(`/auth/login`, { username, password });
    register = async (username: string, password: string, name: string, photoUrl: string): Promise<LoginResponseType> => httpExternalApi.httpPost(`/auth/register`, { username, password, name, photoUrl });
    registerInternal = async (username: string, password: string, name: string, photoUrl: string): Promise<LoginResponseType> => httpInternalApi.httpPostPublic(`/auth/register`, { username, password, name, photoUrl });
}

const authAPI = new AuthAPI();
export default authAPI;