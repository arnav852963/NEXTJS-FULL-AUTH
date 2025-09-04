import  mongoose from "mongoose";
import dotenv from "dotenv";
import {DBNAME} from "../../constants";
import {error} from "next/dist/build/output/log";
dotenv.config({
    path:"./.env"
})
console.log(process.env.MONGODB_URL)


const db = async ()=>{
    try {
        const response =await  mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection

        connection.on('connected' , ()=>{
            console.log("mongodb connected")
        })
        connection.on('error' , (error)=>{
            console.log("mongodb error occur establish connection" , error)
            process.exit(1)
        })

    } catch (e){
        console.log("error occurred")
        console.log(e)

    }
}
export {db}