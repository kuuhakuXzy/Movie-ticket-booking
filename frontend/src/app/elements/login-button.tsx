import { UserRound, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useState, useRef, useEffect } from "react";

export const LoginButton = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (isAuthenticated) {
        return (
            <div className="flex items-center gap-6 mr-5 relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center rounded-lg py-2 px-4 bg-gray-500 font-poppins hover:bg-gray-600 hover:text-white transition-colors duration-200 text-gray-800 font-bold text-sm"
                >
                    <UserRound className="mr-1 text-red-600" />
                    Profile
                </button>
                
                {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        <Link
                            to="/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            <UserRound className="mr-2 h-4 w-4" />
                            View Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
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
                to="/login"
                className="flex items-center rounded-lg py-2 px-4 bg-gray-500 font-poppins hover:bg-gray-600 hover:text-white transition-colors duration-200 text-gray-800 font-bold text-sm"
            >
                <UserRound className="mr-1 text-red-600" />
                Login
            </Link>
        </div>
    );
}

export default LoginButton;