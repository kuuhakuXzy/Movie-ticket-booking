import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../api/api";

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"form">) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (!email || !password || !confirmPassword) {
            console.error("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            console.error("Passwords do not match.");
            return;
        }

        try {
            const response = await userSignup(email, password);
            console.log("Signup successful:", response);
            // Optionally, redirect the user or show a success message
            alert("Signup successful! Please log in.");
            // Redirect to login page or another page
            navigate("/user/login");
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            onSubmit={handleSubmit}
            {...props}
        >
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="example@example.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            required
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-2 top-2 text-gray-500"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm your password"
                            required
                            className="pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm((prev) => !prev)}
                            className="absolute right-2 top-2 text-gray-500"
                            tabIndex={-1}
                        >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <Button
                    type="submit"
                    className="w-full bg-gray-700 hover:bg-gray-400 text-white hover:text-jet-black"
                >
                    Signup
                </Button>
                <hr className="text-black" />
                <div className="text-center text-sm">
                    Having an account already?{" "}
                    <Link to="/user/login" className="underline underline-offset-4">
                        Login
                    </Link>
                </div>
            </div>
        </form>
    );
}
