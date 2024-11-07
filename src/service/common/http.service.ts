export const API_URL = "http://localhost:8080/api";
export const API_URL_PUBLIC = `/public`;

export const httpGet = async <T>(endpoint: string, params?: URLSearchParams): Promise<T> => {
    const res = await fetch(`${API_URL}${endpoint}${params ? `?${params}` : ''}`);
    if (!res.ok) {
        throw new Error('Failed to retrieve: ' + endpoint);
    }
    return res.json();
}

export const httpGetPublic = async <T>(endpoint: string, params?: URLSearchParams): Promise<T> => {
    return httpGet(`${API_URL_PUBLIC}${endpoint}`, params);
}