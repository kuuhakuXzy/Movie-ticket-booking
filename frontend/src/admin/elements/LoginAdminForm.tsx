import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/api';
export function LoginAdminForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await adminLogin(email, password);

        // Save token
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', response.email)

        console.log('Response: ', response)

        // Redirect to dashboard
        navigate('/dashboard/admin');
    } catch (err: any) {
        setError(err.response?.data?.message || 'Login failed');
    }
};


    return (
        <form onSubmit={handleLogin} className="space-y-4">
        <h2 className="text-lg font-semibold underline">Admin Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
            <label className='font-bold'>Email</label>
            <input
            type="email"
            required
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label className='font-bold'>Password</label>
            <input
            type="password"
            required
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
            Login
        </button>
        </form>
    );
}
