import { LoginForm } from "@/app/elements/login-form";
import backgroundLogin from "@/assets/login-background.jpg";
import { Film } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const id = user?.id ?? "guest";

    return (
        <div className="bg-white">
            <div className="grid min-h-screen lg:grid-cols-2">
                <div className="relative">
                    <img
                        src={backgroundLogin}
                        alt="Image"
                        className="h-full"
                    />
                </div>
            <div className="flex flex-col gap-4 p-10">
                <div className="flex justify-start gap-2">
                    <Link to={`/${id}`} className="flex items-center gap-2 font-medium">
                        <div className="flex items-center justify-center rounded-md font-bold">
                            <Film className="size-6" />
                        </div>
                        <span className="font-bold">CineBook</span>
                    </Link>
                </div>
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
