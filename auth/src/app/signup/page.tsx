"use client";
import Link from "next/link"
import React from "react";
import {useEffect} from "react";
import {useRouter} from "next/navigation"
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage(){
    const router = useRouter()
    const [user , setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignUp = async ()=>{
        try {
            setLoading(true)
           const response = await axios.post("/api/users/signup",user)
            router.push("/login")

        } catch (e:any){
            console.log("signup failed" , e.message)
            toast.error(e.message)

        }finally {
            setLoading(false)
        }

    }
    useEffect(()=>{
        if (user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false)
        }else {
            setButtonDisabled(true)
        }

    },[user])

    return(
        <div  className="min-h-screen flex items-center justify-center bg-black"
              style={{
                  backgroundImage:
                      "url('https://www.iiitnr.ac.in/sites/default/files/banner.jpg')",
                  backgroundSize: "cover",     // makes it fill screen
                  backgroundRepeat: "no-repeat", // prevents duplication
                  backgroundPosition: "center" // centers image
              }}
        >

            {/*<div className="absolute inset-0 bg-black/40"></div>*/}

        <div className="w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6">

            <div className="flex justify-center">
                <img
                    src="https://www.iiitnr.ac.in/sites/all/themes/iiit/head.png"
                    alt="IIIT Naya Raipur Logo"
                    className="h-16 mb-4"
                />
            </div>

            <h1 className="text-center text-black text-2xl">{loading ? "processing" : "signup"}</h1>
            <hr/>
            <label htmlFor="username"  className="block text-sm font-medium text-gray-700 mb-1">username</label>
            <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
                className="w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

            />

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
                    👁️


                </button>

            </div>

            <button
                onClick={onSignUp}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition">
                {buttonDisabled ? "NOPE" : "Signup"}
            </button>

            <Link href="/login" className="block text-sm font-medium text-gray-700 mb-1"> visit login page</Link>
        </div>
        </div>

    )
}