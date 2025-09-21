import {NextResponse} from "next/server";
import {NextRequest} from "next/server";
import {db} from "@/dbconfig/dbconfig";
import {getDetails} from "@/helper/getDetails";
import {User} from "@/model/user.model";

db()

export async function GET(request:NextRequest){
    try{
        const details = await getDetails(request)
        if(!details) return NextResponse.json({status:401,message:"Unauthorized"})
        const user = await User.findById(details).select("-password")
        if(!user) return NextResponse.json({status:404,message:"User not found"})
        return NextResponse.json({status:200,message:"User details fetched successfully",user:user})




    } catch(e:any){
        return NextResponse.json({status:500,message:"error occurred" , error:e.message})
    }
}