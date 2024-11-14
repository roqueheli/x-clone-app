import { NextRequest, NextResponse } from "next/server";
import authService from "../../../service/auth/auth.service";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
    const headerList = headers();
    const authorization = await headerList.get('Authorization');
    if (authorization !== `Bearer ${process.env.REDIS_API_TOKEN}`){
        return new Response(JSON.stringify({
            error: 'Unauthorized',
        }), { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const key = await searchParams.get('key') ?? '';
    const value = await authService.getRedisValue(key);

    return NextResponse.json({ value: value });
}
