import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userLogin } from "../api/api"

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const login = await userLogin({email, password})
                localStorage.setItem("user", JSON.stringify(login.user));
                alert("Login successful!")
                navigate("/")
            } catch (err: any) {
                alert(err.message || "Login failed")
            }
        }

    return (
        <form
            onSubmit={handleLogin}
            className={cn("flex flex-col gap-6", className)}
            {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
        </div>
        <div className="grid gap-6">
            <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" onChange = {(e) => setEmail(e.target.value)} placeholder="example@example.com" required />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                    Forgot your password?
                    </a>
                </div>
            <Input id="password" type="password"  onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
            </div>
            <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-400 text-white hover:text-jet-black">
            Login
            </Button>
            <hr className="text-black"></hr>
            <span className="flex justify-center px-2 text-sm">
                Or continue with
            </span>

            <Button variant="outline" className="w-full bg-gray-700 hover:bg-gray-400 text-white hover:text-jet-black">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google Logo"
                width="20"
                height="20"
            />
            Login with Google
            </Button>
        </div>
        <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline underline-offset-4">
            Sign up
            </a>
        </div>
        </form>
    )
}
