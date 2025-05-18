import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

function Profile() {
    const { user } = useContext(UserContext)

    return (
        <div className="min-h-[70vh] flex flex-col gap-5 items-center justify-center">
            <div className="w-[200px] h-[200px] mx-auto bg-purple-500 text-white text-3xl font-semibold rounded-full flex items-center justify-center">
                {user?.name}
            </div>
            <p className="text-center">Email: {user?.email}</p>
            <p className="text-center">Role: {user?.role}</p>
        </div>
    )
}

export default Profile;