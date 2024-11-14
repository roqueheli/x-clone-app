import { HttpBaseAPI } from "./http.service";

export const API_URL = "http://localhost:8080/api";
export const API_URL_PUBLIC = `/public`;

class HttpInternalAPI extends HttpBaseAPI {
    constructor() {
        super(API_URL, API_URL_PUBLIC)
    }
}

const httpInternalApi = new HttpInternalAPI();
export default httpInternalApi;