"use server"

import { Fetch } from "../http/fetch";
import { APIResponse } from "../http/rest";

export async function getListProduct(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    order: string = 'created_at',
    sort: string = 'DESC',
) : Promise<APIResponse> {

    const response = await Fetch(`/product`, {
        page: String(page),
        limit: String(limit),
        search: String(search),
        order: String(order),
        sort: String(sort)
    })

    return response
}

export async function addProduct(form: FormData) : Promise<APIResponse> {
    const response = await Fetch(`/product`, {}, {
        method: "POST",
        body: form
    })

    return response
}

export async function updateProduct(form: FormData, productId: number) : Promise<APIResponse> {

    const response = await Fetch(`/product/${productId}`, {}, {
        method: "PATCH",
        body: form
    })

    return response
}

export async function deleteProduct(
    productId: number
) : Promise<APIResponse> {

    const response = await Fetch(`/product/${productId}`, {}, {
        method: "DELETE"
    })

    return response
}
