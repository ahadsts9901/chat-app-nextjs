import React from 'react'
import { profilePicture } from '../core'
import Link from 'next/link'
import { IoChevronBackOutline } from "react-icons/io5";

const Navbar = (props: any) => {
    return (
        <div className='w-full bg-[#fcfcfc] p-2 sticky top-0 z-50 border-b shadow-sm flex items-center gap-2'>
            <Link href="/"><IoChevronBackOutline className='w-[1.5rem] h-[1.5rem]' /></Link>
            <div className='flex items-center gap-4'>
                <img src={profilePicture} alt="image" className='w-12 h-12 rounded-full object-fit' />
                <p className='font-bold'>
                    {
                        props?.isMe ? "You" : <>{props.firstName ? `${props?.firstName} ` : ""} {props.lastName ? props?.lastName : ""}</>
                    }
                </p>
            </div>
        </div>
    )
}

export default Navbar