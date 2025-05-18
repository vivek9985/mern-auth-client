import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";


const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [error, setError] = useState('');

    const avatarHandler = async (e) => {
        const file = e.target.files[0];
        const maxSize = 2 * 1024 * 1024;

        if (!file) {
            setError('Please select an image file.');
            return;
        }

        if (file.size > maxSize) {
            setError('File size should not exceed 2MB.');
            return;
        }

        setError('');
        setImage(file);
        setPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'testing_cloud');

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dsnxqkb66/image/upload',
                formData
            );

            const uploadedImageUrl = response.data.secure_url;
            setUploadedUrl(uploadedImageUrl);
        } catch (error) {
            console.error('Upload error:', error);
            setError('Image upload failed.');
        }
    };

    const handleRemoveImage = () => {
        setImage(null)
        setPreview(null);
    }

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const avatar = uploadedUrl;
        const userData = { avatar, name, email, password };
        console.log(userData)

        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/user/register",
                userData,
                { withCredentials: true }
            );

            if (res?.data?.success) {
                toast.success(res?.data?.message);
                localStorage.setItem("user", JSON.stringify(res?.data?.data?._id));
                navigate("/");
                window.location.reload();
            } else {
                toast.error(res?.data?.message || "Something went wrong");
            }
        } catch (err) {
            // console.error(err);
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="h-[70vh] flex items-center justify-center px-4">
            <div className="p-8 rounded-2xl shadow-md w-full max-w-md border-[1px] border-stone-200">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="w-[100px] h-[100px] mx-auto rounded-full bg-gray-500 relative">
                        <div className="w-8 h-8 bg-gray-700 absolute right-0 bottom-0 rounded-full flex items-center justify-center overflow-hidden">
                            {image ?
                                <div className="w-full h-full flex items-center justify-center bg-gray-700 reltive z-100" onClick={handleRemoveImage}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                </div>
                                :
                                <div className="w-full h-full bg-gray-700 reltive z-100">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="name"
                                        onChange={avatarHandler}
                                        required
                                        className="w-full h-full absolute opacity-0 z-10 bg-purple-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 absolute z-0 left-0 right-0 top-0 bottom-0 mx-auto my-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                </div>
                            }
                        </div>
                        {
                            preview ? <div className="w-full h-full rounded-full absolute flex items-center justify-center overflow-hidden">
                                <img className="w-full h-full object-cover object-bottom" src={preview} alt="" />
                            </div> : <div className="w-full h-full flex items-center justify-center absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                        }
                    </div>
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
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition"
                    >
                        {
                            loading ? "Loading..." : "Register"
                        }
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
