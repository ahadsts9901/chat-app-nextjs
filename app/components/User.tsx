import React from 'react'
import Link from "next/link"

const User = (props: any) => {
    return (
        <Link href={`/chat/${props?._id}`} className='w-full border-b bg-[#fcfcfc] flex justify-between items-center cursor-pointer p-4'>
            <p className='w-full font-extrabold'>{`${props?.firstName} ${props?.lastName}`}</p>
        </Link>
    )
}

export default User