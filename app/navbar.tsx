"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname()
    return (
        <header className="lg:w-[65%] px-5 lg:px-0 mx-auto">
          <div className="flex items-center justify-between h-16 border-b border-black/15">
            <h1 className="text-xl font-semibold">Small Store</h1>
            <nav>
              <ul className="flex gap-6 items-center">
                <li>
                  <Link className={`${pathname == "/" ? 'opacity-100' : 'opacity-50'} hover:opacity-100`} href={`/`} >Products</Link>
                </li>
                <div className="h-6 border-r border-black/15"></div>
                <li>
                  <Link className={`${pathname == "/adjustment-transaction" ? 'opacity-100' : 'opacity-50'} hover:opacity-100`} href={`/adjustment-transaction`} >Adjustment Transactions</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
    )
}