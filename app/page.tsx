"use client"

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios"
import User from "./components/User";

export default function Home() {

  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers]: any = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const resp = await axios.get("/api/users", { withCredentials: true })
      setUsers(resp.data.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col border-x w-full sm:w-[600px] mx-auto h-full">
        {
          users ?
            users.map((user: any, index: number) => (
              <User key={index} firstName={user?.firstName} lastName={user?.lastName} _id={user?._id} />
            ))
            : <div className="w-full h-full flex justify-center items-center mt-[12rem]">
              <span className="load"></span>
            </div>
        }
      </div>
    </>
  );
}
