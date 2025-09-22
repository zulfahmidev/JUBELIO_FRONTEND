"use client"

import { addProduct, updateProduct } from "@/service/product"
import { FormEvent, useState } from "react"

export default function ModalForm({onClose, data} : {
    onClose: (success: boolean) => void,
    data?: ProductModel | null
}) {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [failedMessage, setFailedMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function Add(event: FormEvent<HTMLFormElement>) {
        setLoading(true)
        event.preventDefault()
        
        const form = new FormData(event.currentTarget)
        const response = await addProduct(form)

        setLoading(false)
        if (response.status == 400) {
            setErrors(response.body)
            setFailedMessage(response.message)
            return
        } else if (response.status >= 300) {
            setFailedMessage(response.message)
            return
        }

        onClose(true)
    }

    async function Save(event: FormEvent<HTMLFormElement>, productId: number) {
        setLoading(true)
        event.preventDefault()
        
        const form = new FormData(event.currentTarget)
        const file = form.get("image") as File
        if (!file.name) {
            form.delete("image")
        }
        const response = await updateProduct(form, productId)

        setLoading(false)
        if (response.status == 400) {
            setErrors(response.body)
            setFailedMessage(response.message)
            return
        } else if (response.status >= 300) {
            setFailedMessage(response.message)
            return
        }

        onClose(true)
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-96">
                <div className="p-3 border-b border-black/15 flex justify-between items-center">
                    <h3 className="font-semibold">
                        {data?.id ? 'Update Data' : 'Add New'}
                    </h3>
                    <button className="opacity-50 hover:opacity-100 cursor-pointer"
                        onClick={() => onClose(false)}>
                        Close
                    </button>
                </div>
                <div className="p-3">
                    {
                        failedMessage ? (
                            <div className="py-2 px-3 bg-red-100 text-red-500 rounded-lg border capitalize border-red-300 mb-3">
                                {failedMessage}
                            </div>
                        ) : ''
                    }
                    <form onSubmit={(event) => {
                        if (!data?.id) {
                            return Add(event)
                        }
                        Save(event, data?.id)
                        
                    }}>
                        <div className="mb-3">
                            <label htmlFor="">Image</label>
                            <input type="file" name="image" disabled={loading} className="py-2 px-3 rounded-lg border border-black/15 w-full disabled:bg-slate-200 disabled:cursor-auto" />
                            <div className="text-xs mt-1 text-red-500">{errors?.image}</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="">Title</label>
                            <input type="text" name="title" disabled={loading} className="py-2 px-3 rounded-lg border border-black/15 w-full disabled:bg-slate-200 disabled:cursor-auto" placeholder="Title" defaultValue={data?.title} />
                            <div className="text-xs mt-1 text-red-500">{errors?.title}</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="">SKU</label>
                            <input type="text" name="sku" disabled={loading} className="py-2 px-3 rounded-lg border border-black/15 w-full disabled:bg-slate-200 disabled:cursor-auto" placeholder="SKU" defaultValue={data?.sku} />
                            <div className="text-xs mt-1 text-red-500">{errors?.sku}</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="">Price</label>
                            <input type="number" name="price" disabled={loading} className="py-2 px-3 rounded-lg border border-black/15 w-full disabled:bg-slate-200 disabled:cursor-auto" placeholder="Price" defaultValue={data?.price ?? 0} />
                            <div className="text-xs mt-1 text-red-500">{errors?.price}</div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="">Description</label>
                            <textarea name="description" disabled={loading} className="py-2 px-3 rounded-lg border border-black/15 w-full disabled:bg-slate-200 disabled:cursor-auto" placeholder="Description" defaultValue={data?.description ?? ''}></textarea>
                            <div className="text-xs mt-1 text-red-500">{errors?.description}</div>
                        </div>
                        
                        <div className="mb-3">
                            <button 
                                type="submit"
                                disabled={loading}
                                className="py-2 px-3 disabled:bg-slate-200 disabled:cursor-auto rounded-lg bg-blue-500 w-full text-white cursor-pointer">{
                                    data?.id ? "Save" : "Add"
                                }</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}