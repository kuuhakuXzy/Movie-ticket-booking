import { SignUpForm } from "@/app/elements/signup-form";
import { Film } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignupPage() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const id = user?.id ?? "guest";
    
    return (
        <div className="bg-white grid min-h-svh lg:grid-cols-2">
        <div className="relative hidden bg-muted lg:block">
            <img
            src="/assets/login-background-D0B_xQP_.jpg"
            alt="Image"
            className="h-full"
            />
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
            <Link to={`/${id}`} className="flex items-center gap-2 font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Film className="size-4" />
                </div>
                <div className="font-bold">CineBook</div>
            </Link>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                    <SignUpForm />
                </div>
            </div>
        </div>
        </div>
    )
}
