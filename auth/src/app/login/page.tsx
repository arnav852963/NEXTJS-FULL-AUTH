"use client";
import Link from "next/link"
import React, {useEffect} from "react";
import {useRouter} from "next/navigation"
import axios from "axios";
import toast from "react-hot-toast";


export default function Login(){
    const [user , setUser] = React.useState({
        email:"",
        password:"",

    })
    const router = useRouter()

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const onLogin = async ()=>{
        try {
            setLoading(true)
            const response  = await axios.post("/api/users/login",user)
            console.log(response)

            toast.success("login successful")
            router.push("/profile")

        } catch (e:any){
            toast.error(e.message)
        } finally {
            setLoading(false)
        }

    }
    useEffect(()=>{
        if( user.email.length>0 && user.password.length>0){
            setButtonDisabled(false)
        }else {
            setButtonDisabled(true)
        }
    })

    return(
        <div  className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6">
            <h1 className="text-center text-black text-2xl">{loading ? "processing" : "Login"}</h1>
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
            <div className="relative">
            <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
                className="w-full px-4 py-2 pr-12 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

            />
                <button
                    type="button"
                    onMouseDown={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                    onMouseLeave={() => setShowPassword(false)}
                    className="absolute inset-y-0 right-3 flex items-center text-sm text-blue-600"
                >
                    👁view


                </button>

            </div>

            <button
                onClick={onLogin}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition">
                {buttonDisabled ? "NOPE" : "Login"}
            </button>

            <Link href="/signup"  className="block text-sm font-medium text-gray-700 mb-1"> visit Signup page</Link>
        </div>
        </div>
    )
}