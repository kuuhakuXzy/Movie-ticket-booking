import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export const LoginButton = () => {
    return (
        <div className="flex items-center gap-6 mr-5">
            <Link
                to="/login"
                className="flex items-center rounded-lg py-2 px-4 bg-gray-500 font-roboto hover:bg-gray-600 hover:text-white transition-colors duration-200 text-gray-800 font-bold text-sm"
            >
                <UserRound className="mr-1 text-red-600" />
                Login
            </Link>
        </div>
    )
}

export default LoginButton