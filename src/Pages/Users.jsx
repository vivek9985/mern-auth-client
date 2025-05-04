import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserContext } from "../Context/UserContext";
import { CookingPot } from "lucide-react";

function Users() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const { user } = useContext(UserContext);
    const id = user?._id;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/v1/user/all", {
                    withCredentials: true
                });
                const filtered = res?.data?.data?.filter(user => user?._id !== id);
                setUsers(filtered);
                if (res?.data?.message === "Unauthorized, missing token!" || res?.data?.message === "Unauthorized, invalid token!") {
                    navigate("/")
                }
            } catch (err) {
                console.error(err.response?.data?.message || err.message);
            }
        };

        fetchUsers();
    }, [id, navigate]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/v1/user/${id}`, {
                withCredentials: true
            });

            if (res?.data?.success) {
                setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
                toast.success(res?.data?.message);
            } else {
                toast.error(res?.data?.message);
            }
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
            toast.error(err.response?.data?.message || "Failed to delete user");
        }
    }

    return (
        <div>
            <ul className="w-10/12 mx-auto grid grid-cols-2 gap-6 mt-12">
                {users?.map((item, index) => (
                    <li key={index} className="bg-stone-600 rounded-xl py-5 px-7 text-xl font-medium flex items-center justify-between gap-4">
                        <div>
                            <h2 className="hover:text-blue-400 inline-flex">
                                <Link to={`/user/${item?._id}`}>
                                    Name : {item?.name}
                                </Link>
                            </h2>
                            <h2 className="mt-2">Email : {item?.email}</h2>
                        </div>
                        <CookingPot
                            onClick={() => handleDelete(item?._id)}
                            className="text-red-400 cursor-pointer hover:text-red-600 transition-colors"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;