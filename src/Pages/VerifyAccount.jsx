import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UserContext } from './../Context/UserContext';

function VerifyAccount() {
    const [isLoading, setIsloading] = useState(false)
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const [otp, setOtp] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsloading(true);
        const otp = e.target.otp.value
        try {
            const res = await axios.post("http://localhost:5000/api/v1/user/verify-email", { otp }, {
                withCredentials: true
            });
            if (res?.data?.success) {
                navigate("/")
                toast.success(res?.data?.message)
                setOtp(true)
            } else {
                toast(res?.data?.message)
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        } finally {
            setIsloading(false);
        }
    }

    const sendVerificationOtp = async () => {
        try {
            setIsloading(true);
            const res = await axios.post("http://localhost:5000/api/v1/user/send-verify-otp", {}, {
                withCredentials: true
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message)
                setOtp(true)
            }
            // console.log(res?.data)
        } catch (err) {
            toast.error(err.response?.data?.message || err.message);
        } finally {
            setIsloading(false);
        }
    }


    return (
        <>
            {
                isLoading ?
                    <div className="min-h-[70vh] flex justify-center items-center">
                        <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10"
                                stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z">
                            </path>
                        </svg>
                    </div>
                    :
                    <>
                        {
                            user?.isAccountVerified ?
                                <div className="min-h-[70vh] flex items-center justify-center">
                                    <h3>User is verifyed !</h3>
                                </div>
                                :
                                <div className="min-h-[70vh] flex items-center justify-center">
                                    {
                                        otp ?
                                            <div className="p-8 rounded-2xl shadow-md w-full max-w-md border-[1px] border-stone-200">
                                                <h2 className="text-2xl font-bold text-center mb-6">Verify Account</h2>
                                                <form onSubmit={handleSubmit} className="space-y-4">
                                                    <input
                                                        type="number"
                                                        name="otp"
                                                        placeholder="Verify OTP"
                                                        required
                                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="w-full bg-blue-600 text-white font-medium cursor-pointer py-2 rounded-lg hover:bg-blue-700 transition"
                                                    >
                                                        Submit
                                                    </button>
                                                </form>
                                            </div>
                                            :
                                            <div className="p-8 rounded-2xl shadow-md w-full max-w-md border-[1px] border-stone-200">
                                                <button onClick={sendVerificationOtp}
                                                    className="w-full bg-blue-600 text-white font-medium cursor-pointer py-2 rounded-lg hover:bg-blue-700 transition"
                                                >
                                                    Send verification OTP
                                                </button>
                                            </div>
                                    }
                                </div>
                        }
                    </>
            }
        </>
    )
}

export default VerifyAccount;