import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path:"../.env"
})

export function getDetails(request:NextRequest){
    try {


        const token = request.cookies.get("token")?.value || ""
        if (!token) return NextResponse.json({status: 401, message: "Unauthorized"})
        const details:any = jwt.verify(token, process.env.TOKEN_SECRET!)
        if(!details) return NextResponse.json({status:401,message:"Unauthorized"})
        return details.id

    } catch (e:any) {
        return NextResponse.json({status:500,message:"error occurred" , error:e.message})
    }
}