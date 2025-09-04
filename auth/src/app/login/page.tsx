"use client";
import Link from "next/link"
import React from "react";
import {useRouter} from "next/navigation"
import axios from "axios";

export default function Login(){
    const [user , setUser] = React.useState({
        email:"",
        password:"",

    })

    const onSignUp = async ()=>{

    }

    return(
        <div  className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6">
            <h1 className="text-center text-white text-2xl">Login</h1>
            <hr/>


            <label htmlFor="email"  className="block text-sm font-medium text-gray-700 mb-1">email</label>
            <input
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"
                className="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

            />

            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">passwords</label>
            <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
                className="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

            />

            <button
                onClick={onSignUp}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition">
                Signup
            </button>

            <Link href="/login"> visit login page</Link>
        </div>
        </div>
    )
}