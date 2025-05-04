import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";


const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsloading] = useState(false)
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsloading(true);
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const userData = { name, email, password };

        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/user/register",
                userData,
                { withCredentials: true }
            );
            toast.success(res?.data?.message);

            if (res?.data?.success) {
                localStorage.setItem("user", JSON.stringify(res?.data?.data?._id));
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setIsloading(false);
        }
    };


    return (
        <div className="h-[70vh] flex items-center justify-center px-4">
            {
                isLoading ?
                    <div className="flex justify-center items-center">
                        <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10"
                                stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z">
                            </path>
                        </svg>
                    </div>
                    :
                    <div className="p-8 rounded-2xl shadow-md w-full max-w-md border-[1px] border-stone-200">
                        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Register
                            </button>
                        </form>
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                        </p>
                    </div>
            }

        </div>
    );
};

export default Register;
