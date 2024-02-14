import React from 'react'
import Link from "next/link"
import { TbBrandNextjs } from "react-icons/tb";
import { useSelector } from "react-redux"
import { profilePicture } from '../core';

const Navbar = () => {

    const currentUser = useSelector((state: any) => state.user)

    return (
        <div className='w-full bg-[#fcfcfc] px-4 py-2 sticky top-0 z-50 border-b shadow-sm flex justify-between items-center gap-4'>
            <Link href="/" className='w-fit text-left text-xl font-extrabold flex items-center'>
                <TbBrandNextjs className='w-[2rem] h-[2rem]' />
                <p>ext Chat</p>
            </Link>
            <img src={profilePicture} alt="image" className='w-12 h-12 rounded-full object-cover' />
        </div>
    )
}

export default Navbar