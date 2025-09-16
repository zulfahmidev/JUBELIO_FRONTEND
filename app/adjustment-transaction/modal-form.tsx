"use client"

import { addAdjustmentTransaction, updateAdjustmentTransaction } from "@/service/adjustment-transaction"
import { FormEvent, useState } from "react"

export default function ModalForm({onClose, data} : {
    onClose: (success: boolean) => void,
    data?: AdjustmentTransactionModel | null
}) {
    const [errors, setErrors] = useState<any>({})
    const [failedMessage, setFailedMessage] = useState('')

    async function Add(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const form = new FormData(event.currentTarget)
        const response = await addAdjustmentTransaction(
            String(form.get('sku')), Number(form.get('qty')), Number(form.get('amount'))
        )

        if (response.status == 400) {
            setErrors(response.body)
            setFailedMessage(response.message)
            return
        }

        onClose(true)
    }

    async function Save(event: FormEvent<HTMLFormElement>, adjustmentTransactionId: number) {
        event.preventDefault()

        const form = new FormData(event.currentTarget)
        const response = await updateAdjustmentTransaction(
            adjustmentTransactionId, String(form.get('sku')), Number(form.get('qty')), Number(form.get('amount'))
        )

        if (response.status == 400) {
            setErrors(response.body)
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
                            <div className="py-2 px-3 bg-red-100 text-red-500 rounded-lg border border-red-300 mb-3">
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
                            <label htmlFor="">SKU</label>
                            <input type="text" name="sku" className="py-2 px-3 rounded-lg border border-black/15 w-full" placeholder="SKU" defaultValue={data?.sku} />
                            <div className="text-xs mt-1 text-red-500">{errors?.sku}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Qunatity</label>
                            <input type="number" name="qty" className="py-2 px-3 rounded-lg border border-black/15 w-full" placeholder="Quantity" defaultValue={data?.qty ?? 0} />
                            <div className="text-xs mt-1 text-red-500">{errors?.qty}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Amount</label>
                            <input type="number" name="amount" className="py-2 px-3 rounded-lg border border-black/15 w-full" placeholder="Amount" defaultValue={data?.amount ?? 0} />
                            <div className="text-xs mt-1 text-red-500">{errors?.amount}</div>
                        </div>
                        <div className="mb-3">
                            <button 
                                type="submit"
                                className="py-2 px-3 rounded-lg bg-blue-500 w-full text-white cursor-pointer">{
                                    data?.id ? "Save" : "Add"
                                }</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}