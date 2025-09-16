"use client"

export default function Table({adjustmentTransactions, page, onEdit, onDelete} : {
    adjustmentTransactions: AdjustmentTransactionModel[],
    page: number,
    onEdit: (adjustmentTransaction: AdjustmentTransactionModel) => void,
    onDelete: (adjustmentTransactionId: number) => void,
}) {

    return (
        <table className="w-full">
            <thead>
                <tr className="border-b border-black/15">
                    <td className="py-2 px-3">#</td>
                    <td className="py-2 px-3">SKU</td>
                    <td className="py-2 px-3">QTY</td>
                    <td className="py-2 px-3">Amount</td>
                    <td className="py-2 px-3">Actions</td>
                </tr>
            </thead>
            <tbody>
                {
                    adjustmentTransactions.map((v, index) => {
                        return (
                            <tr className="even:bg-slate-100 odd:bg-slate-50" key={index}>
                                <td className="py-2 px-3">{((page - 1) * 10) + index + 1}</td>
                                <td className="py-2 px-3">{v.sku}</td>
                                <td className="py-2 px-3">{v.qty}</td>
                                <td className="py-2 px-3">{v.amount}</td>
                                <td className="py-2 px-3 flex gap-3">
                                    <button 
                                        className="py-1 px-2 cursor-pointer bg-green-500 text-sm text-white rounded-lg"
                                        onClick={() => {
                                            onEdit(v)
                                        }}>
                                            Edit
                                    </button>
                                    <button 
                                        className="py-1 px-2 cursor-pointer bg-red-500 text-sm text-white rounded-lg"
                                        onClick={(event) => {
                                            event.preventDefault()
                                            if (confirm("Are you sure went to delete?")) {
                                                onDelete(v.id)
                                            }
                                        }}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}