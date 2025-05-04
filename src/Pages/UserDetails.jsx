import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/v1/user/${id}`, {
                    withCredentials: true
                });
                setUser(data?.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]);

    if (!user) return <p className="text-center">Loading...</p>;

    return (
        <div className="w-full min-h-96 text-center text-xl">
            <h1>User details page</h1>
            <h1>{user?.name}</h1>
            <p>{user?.role}</p>
        </div>
    );
};

export default UserDetails;
