import React from 'react'
import { profilePicture } from '../core'

const Navbar = (props: any) => {
    return (
        <div className='w-full bg-[#fcfcfc] p-2 sticky top-0 z-50 border-b shadow-sm flex items-center gap-4'>
            <img src={profilePicture} alt="image" className='w-12 h-12 rounded-full object-fit' />
            <p className='font-bold'>
                {props.firstName ? `${props?.firstName} ` : ""}
                {props.lastName ? props?.lastName : ""}
            </p>
        </div>
    )
}

export default Navbar