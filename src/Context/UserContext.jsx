/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const currentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/user/${currentUser}`, {
                    withCredentials: true
                });
                setUser(res?.data?.data)
            } catch (err) {
                console.error(err.response?.data?.message || err.message);
            }
        };

        getUser();
    }, [currentUser, setUser])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// export const useUser = () => useContext(UserContext);
