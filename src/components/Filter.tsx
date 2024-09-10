"use client"
import React from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

function Filter() {

    const searchParams = useSearchParams()
    const router = useRouter()

    const pathname = usePathname()


    const activeFilter = searchParams.get('capacity') ?? "all"
    const handleFilter = (filter) => {

        const params = new URLSearchParams(searchParams)
        params.set("capacity", filter)
        router.replace(`${pathname}?${params.toString()}`, {scroll:false})
    }
    return (
        <div className="border border-primary-800 flex">
            <button className="px-5 py-2 hover:bg-primary-700" onClick={() => handleFilter("all")}>
                All Cabins
            </button>

            <Button filter="small" activeFilter={activeFilter} handleFilter={handleFilter}>
                1&mdash;3 guests
            </Button>

            <Button filter="medium" activeFilter={activeFilter} handleFilter={handleFilter}>
                4&mdash;7 guests
            </Button>

            {/*<button className="px-5 py-2 hover:bg-primary-700" onClick={() => handleFilter("large")}>*/}


            <Button filter="large" activeFilter={activeFilter} handleFilter={handleFilter}>
                4&mdash;12 guests
            </Button>
        </div>
    );
}


function  Button({filter, handleFilter, activeFilter, children}) {
    return (
    <button className={`px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? "bg-primary-700  text-primary-50":""}`  } onClick={() => handleFilter(filter)}>
        {children}
    </button>
    )
}
export default Filter;