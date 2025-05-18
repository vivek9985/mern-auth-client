import { useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Login = () => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        const userData = {
            email,
            password
        }
        try {
            const res = await axios.post("http://localhost:5000/api/v1/user/login", userData, {
                withCredentials: true
            });
            // console.log(res)
            if (res?.data?.success) {
                navigate("/")
                toast.success("Logged in!")
                localStorage.setItem("user", JSON.stringify(res?.data?.data?._id));
                window.location.reload()
            } else {
                toast.error(res?.data?.message)
            }
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="h-[70vh] flex items-center justify-center px-4">
            <div className="p-8 rounded-2xl shadow-md w-full max-w-md border-[1px] border-stone-200">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
