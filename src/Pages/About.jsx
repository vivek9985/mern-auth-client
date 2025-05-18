import { useState } from 'react';
import axios from 'axios';

export default function About() {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [error, setError] = useState('');

    const validateImage = (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (!file) {
            setError('Please select an image file.');
            return false;
        }
        if (!validTypes.includes(file.type)) {
            setError('Only JPG, JPEG, PNG, and WEBP formats are allowed.');
            return false;
        }
        if (file.size > maxSize) {
            setError('File size should not exceed 2MB.');
            return false;
        }
        setError('');
        return true;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (validateImage(file)) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        } else {
            setImage(null);
            setPreview(null);
        }
    };

    const handleUpload = async () => {
        if (!image) {
            setError('No image selected.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'testing_cloud');

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dsnxqkb66/image/upload',
                formData
            );
            setUploadedUrl(response.data.secure_url);
            console.log('Uploaded image URL:', response.data.secure_url);
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Failed to upload image.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-neutral-800">Upload Image to Cloudinary</h2>

                <input
                    type="file"
                    onChange={handleImageChange}
                    className="mb-3 w-full border p-2 rounded cursor-pointer text-gray-700"
                />

                {error && (
                    <div className="mb-3 text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={loading || !image}
                    className={`w-full py-2 rounded font-semibold text-white transition ${loading || !image ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>

                {preview && (
                    <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">Preview:</h4>
                        <img src={preview} alt="Preview" className="w-full rounded shadow" />
                    </div>
                )}

                {uploadedUrl && (
                    <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">Uploaded Image:</h4>
                        <img src={uploadedUrl} alt="Uploaded" className="w-full rounded shadow" />
                        <a
                            href={uploadedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-500 text-sm mt-2 underline"
                        >
                            View Full Image
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
