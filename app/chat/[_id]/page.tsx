"use client"

import ChatForm from "@/app/components/ChatForm";
import ChatNav from "@/app/components/ChatNav";
import axios from "axios";
import { useEffect, useState } from "react";

const User = (props: any) => {

    const [user, setUser]: any = useState(null)

    useEffect(() => {
        getUser(props?.params?._id)
    }, [props?.params?._id])

    const getUser = (id: string) => {
        axios.get(`/api/user?id=${id}`, { withCredentials: true })
            .then(response => {
                // console.log(response.data.user);
                setUser(response.data.user);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="w-full sm:w-[600px] m-auto">
            <ChatNav firstName={user?.firstName} lastName={user?.lastName} />
            <ChatForm />
        </div>
    )
}

export default User