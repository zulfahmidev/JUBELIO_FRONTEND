"use server"

import { Fetch } from "../http/fetch";
import { APIResponse } from "../http/rest";

export async function getListAdjustmentTransaction(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    order: string = 'created_at',
    sort: string = 'DESC',
) : Promise<APIResponse> {

    const response = await Fetch(`/adjustment-transaction`, {
        page: String(page),
        limit: String(limit),
        search: String(search),
        order: String(order),
        sort: String(sort)
    })

    return response
}

export async function addAdjustmentTransaction(
    sku: string,
    qty: number,
    amount: number,
) : Promise<APIResponse> {

    const response = await Fetch(`/adjustment-transaction`, {}, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sku, qty, amount
        })
    })

    return response
}

export async function updateAdjustmentTransaction(
    adjustmentTransactionId: number,
    sku: string,
    qty: number,
    amount: number,
) : Promise<APIResponse> {

    const response = await Fetch(`/adjustment-transaction/${adjustmentTransactionId}`, {}, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sku, qty, amount
        })
    })

    return response
}

export async function deleteAdjustmentTransaction(
    adjustmentTransactionId: number
) : Promise<APIResponse> {

    const response = await Fetch(`/adjustment-transaction/${adjustmentTransactionId}`, {}, {
        method: "DELETE"
    })

    return response
}

// export async function upload(file: File) : Promise<APIResponse> {
//     const formData = new FormData();
//     formData.append("file", file);

//     const response = await Fetch(`/upload`, {}, {
//         method: 'POST',
//         body: formData
//     })

//     return response
// }