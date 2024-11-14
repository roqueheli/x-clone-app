import { RedisClientType, createClient } from "redis";
import { v4 as uuidv4 } from "uuid";
import { AuthResponseType, LoginResponseType } from "../../types/auth.types";
import { AccesDeniedError } from "../common/http.errors";
import authAPI from "./auth.api";

const TEN_MINUT = 60 * 10;

class AuthService {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            url: "redis://default:SocialNetworkPass@localhost:6379",
        });

        this.client.connect().then(() => {
            console.log("connected to redis");
        });
    }

    buildAuthResponse(loginResponse: LoginResponseType): AuthResponseType {
        const sessionId = uuidv4();
        const now = new Date();
        const expireAt = new Date(now.getTime() + TEN_MINUT * 1000).getTime();

        this.client.set(sessionId, loginResponse.accessToken, { EX: TEN_MINUT });

        return {
            sessionId: sessionId,
            expireAt: expireAt,
            user: loginResponse.user,
        }
    }

    async authenticate(username: string, password: string): Promise<AuthResponseType> {
        const loginResponse = await authAPI.loginInternal(username, password);
        return await this.buildAuthResponse(loginResponse);
    }

    async register(username: string, password: string, name: string, photoUrl: string): Promise<AuthResponseType> {
        const loginResponse = await authAPI.registerInternal(username, password, name, photoUrl);
        return await this.buildAuthResponse(loginResponse);
    }

    async getAccessToken(sessionId?: string): Promise<string> {
        if (!sessionId) throw new AccesDeniedError("Session ID is not valid anymore");
        const accessToken = await this.client.get(sessionId);
        if (!accessToken) throw new AccesDeniedError("Session ID is not valid anymore");

        return accessToken;
    }

    async getRedisValue(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    async logout(sessionId: string): Promise<void> {
        await this.client.del(sessionId);
    }
}

const authService = new AuthService();
export default authService;