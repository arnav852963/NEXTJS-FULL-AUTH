export default function UserProfilePage({params}:any){
    return(
        <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-5 sm:p-20">
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page {params.id}</p>

        </div>
    )
}