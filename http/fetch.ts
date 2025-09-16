"use server"

import { APIResponse } from "./rest";

export async function Fetch(
    path: string = '',
    params: Record<string, string> = {},
    init: RequestInit | undefined = {}
) : Promise<APIResponse> {
    let queryParams = new URLSearchParams(params)
    let baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(
        `${baseUrl}${path}?${queryParams}`, 
        { ...init }
    );

    const result = await response.json()
    const data: APIResponse = {
        status: response.status,
        message: result.message,
        body: result.body
    }

    return data;
}
