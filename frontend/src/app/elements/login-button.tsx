import { ChevronDown, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const LoginButton = () => {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
        const parsedUser = JSON.parse(userData);
        setUserEmail(parsedUser.email);
    }

        // Close dropdown when clicking outside
        const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setShowDropdown(false);
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/user/login");
    };

    if (userEmail) {
        return (
        <div className="relative mr-5" ref={dropdownRef}>
            <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex items-center gap-1 bg-gray-700 text-white font-poppins px-4 py-2 rounded hover:bg-gray-600 transition"
            >
            <UserRound className="w-4 h-4 text-red-400" />
            {userEmail}
            <ChevronDown className="w-4 h-4" />
            </button>

            {showDropdown && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded shadow-md z-50">
                <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-md rounded text-gray-700 hover:bg-gray-100"
                >
                Logout
                </button>
            </div>
            )}
        </div>
        );
    }

    return (
        <div className="flex items-center gap-6 mr-5">
        <Link
            to="/user/login"
            className="flex items-center rounded-lg py-2 px-4 bg-gray-500 font-poppins hover:bg-gray-600 hover:text-white transition-colors duration-200 text-gray-800 font-bold text-sm"
        >
            <UserRound className="mr-1 text-red-600" />
            Login
        </Link>
        </div>
    );
};

export default LoginButton;
