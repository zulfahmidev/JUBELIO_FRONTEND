"use client"
import { PaginationData } from "@/http/rest";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Pagination({pagination} : {
    pagination: PaginationData | undefined
}) {
    const query = useSearchParams()
    const queryParams = new URLSearchParams(query)

    function getURL(page: number) {
        queryParams.set("page", String(page))
        return `/adjustment-transaction?${queryParams}`
    }
    return (
        <>
            {
                pagination ? (
                    <div className="flex items-center gap-3">
                        {
                            pagination.current_page > 1 ? (
                                <Link href={getURL(1)} className="py-2 px-3 rounded-lg bg-blue-500 text-white cursor-pointer">Prev</Link>
                            ) : (
                                <div className="py-2 px-3 rounded-lg bg-slate-100 text-black">Prev</div>
                            )
                        }

                        {
                            pagination.current_page - 1 >= 1 ? (
                                <Link href={getURL(pagination.current_page - 1)} className="py-2 px-3 rounded-lg bg-white text-blue-500 border border-black/15 cursor-pointer">{pagination.current_page - 1}</Link>
                            ) : ''
                        }

                        <div className="py-2 px-3 rounded-lg bg-blue-500 text-white">{pagination.current_page}</div>


                        {
                            pagination.current_page + 1 <= pagination.total_pages ? (
                                <Link href={getURL(pagination.current_page + 1)} className="py-2 px-3 rounded-lg bg-white text-blue-500 border border-black/15 cursor-pointer">{pagination.current_page + 1}</Link>
                            ) : ''
                        }

                        {
                            pagination.current_page < pagination.total_pages ? (
                                <Link href={getURL(pagination.current_page + 1)} className="py-2 px-3 rounded-lg bg-blue-500 text-white cursor-pointer">Next</Link>
                            ) : (
                                <div className="py-2 px-3 rounded-lg bg-slate-100 text-black">Next</div>
                            )
                        }
                    </div>
                ) : ''
            }
        </>
    )
}