import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AccesDeniedError } from "./service/common/http.errors";
import authAPI from "./service/auth/auth.api";

export async function middleware(request: NextRequest) {
    try {
        const sessionId = await request.cookies.get('SocialSessionID')?.value ?? '';
        if (!sessionId) throw new AccesDeniedError("Session ID is not valid anymore");

        const accessToken = await getAccessToken(sessionId);

        if (!accessToken) throw new AccesDeniedError("Session ID is not valid anymore");

        return await getAuthenticationHeaders(request, accessToken);
    } catch (error) {
        if (error instanceof AccesDeniedError) {
            if (!request.url.endsWith("/profile")) {
                return NextResponse.next();
            }
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

const getAccessToken = async (sessionId: string): Promise<string> => {
    return (await authAPI.getRedisValue(sessionId)).value;
}

const getAuthenticationHeaders = (request: NextRequest, accessToken: string) => {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-social-access-token', accessToken);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
}

export const config = {
    matcher: ['/', '/messages/:path*', '/profile', '/api/proxy/:path*'],
}