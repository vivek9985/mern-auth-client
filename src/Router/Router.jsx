import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from '../Pages/Home';
import Navbar from '../Components/Navbar';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Users from '../Pages/Users';
import axios from "axios";
import { toast } from "sonner";
import Profile from "../Pages/Profile";
import VerifyAccount from "../Pages/VerifyAccount";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import UserDetails from "../Pages/UserDetails";
import { BadgeCheck } from "lucide-react";
import About from "../Pages/About";

function App() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const logoutHanler = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/v1/user/logout", {}, {
                withCredentials: true
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message)
                navigate("/")
                localStorage.removeItem("user");
                window.location.reload()
            } else {
                toast.error(res?.data?.message)
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        }

    }

    return (
        <main className="">
            <Navbar />
            <div className="py-6 px-4 min-h-[80vh] relative">
                <Routes>
                    <Route>
                        <Route index element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {user?.isAccountVerified &&
                            <Route path="/users" element={<Users />} />
                        }
                        <Route path="/user/:id" element={<UserDetails />} />
                        {user &&
                            <Route path="/profile" element={<Profile />} />
                        }
                        <Route path="/verify-account" element={<VerifyAccount />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<h1 className="text-white text-center mt-20 flex flex-col items-center justify-center gap-3"><span className="text-9xl font-black">404</span><span className="text-xl font-medium">Page Not Found</span></h1>} />
                    </Route>
                </Routes>
            </div>
            <div className={`absolute right-5 top-4 ${user ? "block" : "hidden"}`}>
                <div className="relative group">
                    <div className="w-12 h-12 rounded-full bg-white overflow-hidden flex items-center justify-center cursor-pointer">
                        {user?.avatar ?
                            <img className="w-full h-full object-center object-cover" src={user?.avatar} alt="" />
                            :
                            <span className="font-semibold text-black text-2xl leading-[80%] uppercase">{user?.name.slice(0, 1)}</span>
                        }
                    </div>
                    <div className="scale-y-0 opacity-0 group-hover:opacity-100 group-hover:scale-y-100 duration-300 bg-white rounded-2xl w-[250px] p-4 absolute right-0 top-[calc(100%_+_5px)]">
                        <ul className="flex flex-col gap-3 text-black font-medium text-xl">
                            <li>
                                <Link to="/profile" className="bg-sky-100 px-3 py-1 rounded-lg hover:bg-sky-200 flex items-center justify-center gap-2">
                                    <span>Profile</span>
                                    {
                                        user?.isAccountVerified &&
                                        <BadgeCheck className="text-blue-500 w-4 h-4 mt-1" />
                                    }
                                </Link>
                            </li>
                            <li>
                                <Link to="/verify-account" className="bg-sky-100 text-center flex items-center justify-center px-3 py-1 rounded-lg hover:bg-sky-200">Verify Account</Link>
                            </li>
                            {
                                user ?
                                    <li>
                                        <span className="bg-sky-100 text-center flex items-center justify-center px-3 py-1 rounded-lg hover:bg-sky-200 cursor-pointer" onClick={logoutHanler}>Logout</span>
                                    </li>
                                    :
                                    <></>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <footer className="py-4 text-center border-t border-gray-700 mt-10">
                <p className="text-gray-400">© {new Date().getFullYear()} MyApp. All rights reserved.</p>
            </footer>
        </main>
    );
}

export default App;
