import {db} from "@/dbconfig/dbconfig";
import {User} from "@/model/user.model";
import {NextRequest,NextResponse} from "next/server";
import bcryptjs from "bcryptjs";

db()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody

        if(!username || !email || !password){
            return NextResponse.json({status:400,message:"All fields are required"})
        }
        const user = await User.findOne({
            $or:[
                {username:username},
                {email:email}

            ]
        })
        if(user) return NextResponse.json({status:400,message:"User already exists"})

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        const newUser = await User.create({
            username:username,
            email:email,
            password:hashedPassword
        })
        if(!newUser) return NextResponse.json({status:500,message:"Unable to create user"})
        return NextResponse.json({status:201,message:"User created successfully",user:newUser
        })

    } catch (e:any){
        return NextResponse.json({status:500,message:"error occurred" , error:e.message})
    }
}

