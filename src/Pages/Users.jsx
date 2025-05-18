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
                const finalFiltered = filtered?.filter(user => user?.role !== "admin");
                setUsers(finalFiltered);
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
                    <li key={index} className="bg-stone-600 rounded-xl py-8 px-7 text-xl font-medium">
                        <div className="flex items-center flex-col justify-center text-center gap-4">
                            <div className="w-12 h-12 mx-auto rounded-full overflow-hidden">
                                <img className="w-full h-full object-cover object-center" src={item?.avatar} alt="" />
                            </div>
                            <div>
                                <h6 className="text-lg hover:text-blue-400 inline-flex">
                                    <Link to={`/user/${item?._id}`}>
                                        Name : {item?.name}
                                    </Link>
                                </h6>
                                <p className="mt-2 text-base">Email : {item?.email} </p>
                                <p className="mt-2 text-base">Role: {item?.role}</p>
                            </div>
                            <CookingPot
                                onClick={() => handleDelete(item?._id)}
                                className="text-red-400 cursor-pointer hover:text-red-600 transition-colors mt-5"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;