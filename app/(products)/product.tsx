"use client"

import { PaginatedResponse, PaginationData } from "@/http/rest"
import { deleteProduct, getListProduct } from "@/service/product"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import ModalForm from "./modal-form"

export default function Products() {
    const [openFormModal, setOpenFormModal] = useState(false)
    const [products, setProducts] = useState<ProductModel[]>([])
    const [search, setSearch] = useState("")
    const [selectedData, setSelectedData] = useState<ProductModel | null>()
    const query = useSearchParams()
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [page, setPage] = useState(1);

    async function loadListProduct(reset: boolean = false) {
        setLoading(true);
        const response = await getListProduct(Number(reset ? 1 : page), 10, search)

        if (response.status < 300) {
            const data = response.body as PaginatedResponse<any>
            const newProducts = data.items as ProductModel[]
            if (reset) {
                setProducts(newProducts)
                setPage(1)
            } else {
                setProducts([...products, ...newProducts])
                setPage(page+1)
            }
        }

        setLoading(false);
    }
    const dollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    useEffect(() => {
        loadListProduct(true)
    }, [search])
    
    async function Delete(productId: number) {
        const response = await deleteProduct(productId)

        if (response.status >= 300) {
            alert(response.message)
            return
        }

        loadListProduct(true)
    }

    return (
        <>
            <div className="lg:w-[65%] mx-auto py-5 px-5 lg:px-0">
                <div className="lg:grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                        <div className="sticky top-8">
                            <h2 className="text-lg font-semibold">Filter</h2>
                            <div className="mt-2">
                                <input type="text" className="py-2 px-3 rounded-lg border border-black/15 outline-none w-full" placeholder="Search" onInput={(event) => {
                                    setSearch(event.currentTarget.value)
                                }} />
                            </div>
                            <div className="mt-2">
                                <button 
                                    className="py-2 px-3 rounded-lg bg-blue-500 text-white outline-none w-full cursor-pointer"
                                    onClick={() => setOpenFormModal(true)}
                                    >Add New</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="grid grid-cols-2 gap-6 mt-6 lg:mt-0">

                            {
                                products.map((v, i) => (
                                    <article className="w-full rounded-lg bg-white overflow-hidden" key={i}>
                                        <div className="group aspect-square bg-slate-100 w-full rounded-lg relative overflow-hidden">
                                            <Image
                                                src={v.image}
                                                alt={v.title}
                                                fill
                                            />
                                            <div className="absolute top-0 left-0 w-full h-full bg-black/50 hidden group-hover:flex items-center justify-center gap-3">
                                                <button 
                                                className="py-2 px-3 border border-white rounded-lg text-white hover:bg-white hover:text-black cursor-pointer"
                                                onClick={() => {
                                                    setOpenFormModal(true)
                                                    setSelectedData(v)
                                                }}>Edit</button>
                                                <button 
                                                    className="py-2 px-3 border border-white rounded-lg text-white hover:bg-white hover:text-black cursor-pointer"
                                                    onClick={() => {
                                                        if (confirm("Are you sure to delete?")) {
                                                            Delete(v.id)
                                                        }
                                                    }}>Delete</button>
                                            </div>
                                        </div>
                                        <div className="py-3 px-2">
                                            <h3 className="text-lg leading-6 font-semibold capitalize">{v.title}</h3>
                                            <p className="line-clamp-2">{v.description}</p>
                                            <p className="mt-2">{dollar.format(v.price)}</p>
                                        </div>
                                    </article>
                                ))
                            }


                        </div>
                        <div className="flex justify-center py-6">
                            <button 
                                className="py-2 px-3 cursor-pointer rounded-lg bg-blue-500 text-white"
                                onClick={() => {
                                    loadListProduct()
                                }}>Load More</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                openFormModal ? (
                    <ModalForm onClose={(success) => {
                        setOpenFormModal(false)
                        if (success) {
                            loadListProduct(true)
                        }
                    }} data={selectedData} />
                ) : ''
            }
        </>
    );
}
