import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserDropdown() {
    const [loggedInEmail, setLoggedInEmail] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) setLoggedInEmail(email);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/admin/login');
    };
    return (
        <>
            {loggedInEmail && (
                <div className="absolute top-4 right-6 z-50">
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu((prev) => !prev)}
                            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded shadow hover:bg-gray-200"
                        >
                            {loggedInEmail}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow">
                                <ul className="text-sm">
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => alert('Go to settings')}
                                    >
                                        Settings
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}