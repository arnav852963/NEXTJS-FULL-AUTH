"use client"
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import React from "react";
import {useState} from "react";
import Link from "next/link";


export default function ProfilePage(){


    const router = useRouter()

    const onLogout = async ()=>{
        try {
           const res= await axios.get("/api/users/logout")
            console.log(res)
            router.push("/login")

        } catch(e:any){
            toast.error(e.message)
        }
    }
    const [data , setData] = React.useState("nothing")

    const onGetDetails = async ()=>{
        try {
            const res = await axios("/api/users/details")
            setData(res.data.user._id)

            toast.success("Details fetched successfully")

        } catch (e:any){
            toast.error(e.message)
        }

    }







    return(
        <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-5 sm:p-20">
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <hr/>
            <p>{data==="nothing" ? "Nothing" : <Link href={`/profile/${data}`}>click</Link>}</p>
            <hr/>
            <button
                onClick={onLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >LOGOUT</button>
            <hr/>

            <button
                onClick={onGetDetails}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >GET DETAILS</button>


        </div>
    )
}