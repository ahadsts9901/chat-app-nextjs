import React from 'react'
import Link from "next/link"

const Navbar = () => {
    return (
        <div className='w-full bg-[#fcfcfc] p-4 sticky top-0 z-50 border-b shadow-sm flex items-center'>
            <Link href="/" className='w-fit text-left text-xl font-extrabold capitalize'>Next Chat</Link>
        </div>
    )
}

export default Navbar