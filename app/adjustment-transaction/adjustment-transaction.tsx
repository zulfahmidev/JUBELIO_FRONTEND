"use client"

import { useEffect, useState } from "react";
import ModalForm from "./modal-form";
import Table from "./table";
import { deleteAdjustmentTransaction, getListAdjustmentTransaction } from "@/service/adjustment-transaction";
import { PaginatedResponse, PaginationData } from "@/http/rest";
import Pagination from "./pagination";
import { useSearchParams } from "next/navigation";

export default function AdjustmentTransaction() {
    const [openFormModal, setOpenFormModal] = useState(false)
    const [adjustmentTransactions, setAdjustmentTransactions] = useState<AdjustmentTransactionModel[]>([])
    const [search, setSearch] = useState("")
    const [selectedData, setSelectedData] = useState<AdjustmentTransactionModel | null>()
    const [pagination, setPagination] = useState<PaginationData>()
    const query = useSearchParams()

    async function loadListAdjustmentTransaction() {
        const response = await getListAdjustmentTransaction(Number(query.get("page") ?? 1), 10, search)

        if (response.status < 300) {
            const data = response.body as PaginatedResponse<AdjustmentTransactionModel[]>
            setAdjustmentTransactions(response.body.items)
            setPagination(response.body.pagination)
        }
    }

    async function Delete(adjustmentTransactionId: number) {
        const response = await deleteAdjustmentTransaction(adjustmentTransactionId)

        if (response.status >= 300) {
            alert(response.message)
            return
        }

        loadListAdjustmentTransaction()
    }

    useEffect(() => {
        loadListAdjustmentTransaction()
    }, [search, query.get("page")])

    return (
        <>
            <div className="lg:w-[65%] px-5 lg:px-0 mx-auto py-6">
                <div className="flex justify-between items-center">
                    <h2 className="my-3 text-xl font-semibold">Adjustment Transactions</h2>
                    <div className="flex gap-3">
                        <input 
                            type="text" 
                            className="py-2 px-3 rounded-lg border border-black/15" 
                            placeholder="Search"
                            onInput={(event) => {
                                setSearch(event.currentTarget.value)
                            }} />
                        <button 
                            className="py-2 px-3 cursor-pointer bg-blue-500 text-white rounded-lg"
                            onClick={() => setOpenFormModal(true)}>Add</button>
                    </div>
                </div>
                
                <Table 
                    adjustmentTransactions={adjustmentTransactions} 
                    page={Number(query.get("page") ?? 1)} 
                    onEdit={(v) => {
                        setSelectedData(v)
                        setOpenFormModal(true)
                    }}
                    onDelete={async v => {
                        Delete(v)
                    }} />

                <div className="py-3 mt-6 w-fit mx-auto mr-0">
                    <Pagination pagination={pagination} />
                </div>
            </div>


            { openFormModal ? (
                <ModalForm onClose={(success) => {
                    if (success) loadListAdjustmentTransaction()
                    setOpenFormModal(false)
                    setSelectedData(null)
                }} data={selectedData} />
            ) : ''}
        </>
    );
}
