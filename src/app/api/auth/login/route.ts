import { cookies } from "next/headers";
import { type NextRequest } from "next/server";
import LoginScheme from "../../../../schemes/login.scheme";
import authService from "../../../../service/auth/auth.service";
import { AccesDeniedError } from "../../../../service/common/http.errors";

export async function POST(request: NextRequest) {
    const { username, password } = await LoginScheme.validate(await request.json());
    try {
        const loginResponse = await authService.authenticate(username, password);

        `SocialSessionID=${loginResponse.sessionId}; Expires=${loginResponse.expireAt}; Domain=localhost; Secure; HttpOnly; Path=/`

        cookies().set("SocialSessionID", loginResponse.sessionId, {
            expires: loginResponse.expireAt,
            httpOnly: true,
            secure: true,
            domain: 'localhost',
            path: '/'
        });

        cookies().set("SocialUsername", loginResponse.user.username, {
            expires: loginResponse.expireAt,
            httpOnly: false,
            secure: true,
            domain: 'localhost',
            path: '/'
        });

        return new Response(JSON.stringify(loginResponse.user), {
            status: 200,
        });
    } catch (error) {
        if (error instanceof AccesDeniedError) {
            return new Response(JSON.stringify({ error: 'Invalid credentials for user: ' + username }), {
                status: 403,
            });
        } else {
            return new Response(JSON.stringify({ error: 'Internal server error' }), {
                status: 500,
            });
        }
    }
}