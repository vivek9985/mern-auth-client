import { Link } from "react-router-dom"
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";


function Navbar() {
    const { user } = useContext(UserContext)

    return (
        <div className="py-7">
            <ul className="flex items-center justify-center gap-10 text-white font-medium text-xl select-none">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                {
                    user ? <></>
                        :
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                }

                {
                    user?.isAccountVerified ?
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        :
                        <></>
                }
            </ul>
        </div>
    )
}

export default Navbar

