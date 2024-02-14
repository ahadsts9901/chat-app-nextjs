import React from 'react'
import { IoMdSend } from "react-icons/io";

const ChatForm = () => {
    return (
        <form className='w-full sm:w-[600px] absolute border-t border-l border-r bottom-0 z-50 p-2 flex items-center gap-2'>
            <input type="text" placeholder='Type something...'
                className='w-full p-2 rounded-md bg-gray-100 text-sm'
            />
            <IoMdSend className='w-[1.5rem] h-[1.5rem] cursor-pointer' />
        </form>
    )
}

export default ChatForm