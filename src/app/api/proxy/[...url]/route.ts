import { headers } from "next/headers";
import httpInternalApi from "../../../../service/common/http.internal.service";

export async function POST(request: Request) {
    const url = request.url.split('/proxy')[1];
    const accessToken = headers().get('x-social-access-token');
    const body = await request.json();

    const response = await httpInternalApi.httpPost(url, body, accessToken ?? undefined);

    return new Response(JSON.stringify(response), {
        status: 200,
    });
}