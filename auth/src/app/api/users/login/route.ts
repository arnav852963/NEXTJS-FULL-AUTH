import {db} from "@/dbconfig/dbconfig";
import {User} from "@/model/user.model";
import {NextRequest,NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config({
    path:"../.env"
})

db()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const {email,password} = reqBody
        console.log(reqBody)
        if(!email || !password){
            return NextResponse.json({status:400,message:"All fields are required"})
        }
        const user = await User.findOne({email:email})
        if(!user) return NextResponse.json({status:404,message:"please sign in first"})
        const isMatch = await bcryptjs.compare(password,user.password)
        if(!isMatch) return NextResponse.json({status:401,message:"Invalid credentials"})

        const tokenData = {
            id:user._id,
            email:user.email,
            username:user.username
        }
        const createToken = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{
            expiresIn:"1d"
        })

        const response = NextResponse.json({
            message:"user logged in successfully",
            success:true
        })
        response.cookies.set("token",createToken,{httpOnly:true})

        return response






    }
    catch (e:any){
        return NextResponse.json({status:500,message:"error occurred" , error:e.message})
    }

}