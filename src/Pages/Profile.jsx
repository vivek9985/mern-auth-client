import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

function Profile() {
    const { user } = useContext(UserContext)

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="w-[200px] h-[200px] mx-auto bg-purple-500 text-white text-3xl font-semibold rounded-full flex items-center justify-center">
                {user?.name}
            </div>
        </div>
    )
}

export default Profile;