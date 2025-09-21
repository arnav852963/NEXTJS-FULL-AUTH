import {db} from "@/dbconfig/dbconfig";

import {NextRequest,NextResponse} from "next/server";



db()

export async function GET(request:NextRequest){
    try{
        const response = NextResponse.json({
            message:"user logged out successfully",
            success:true
        })
        response.cookies.set("token","",{httpOnly:true , expires:new Date(0)})
        return response

    } catch (e:any){
        return NextResponse.json({status:500,message:"error occurred" , error:e.message})
    }
}