import { cookies } from "next/headers";
import { type NextRequest } from "next/server";
import authService from "../../../../service/auth/auth.service";

export async function POST(request: NextRequest) {
    try {
        const authCookie = await request.cookies.get("SocialSessionID");
        if (authCookie) {
            await authService.logout(authCookie.value);
        }

        cookies().delete('SocialSessionID');
        cookies().delete('SocialUsername');

        return new Response(JSON.stringify({}), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
        });
    }
}