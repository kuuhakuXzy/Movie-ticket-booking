import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!email || !password) {
            setError('Email and password are required.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/user/login', {
                email,
                password,
            });

            const { token, user } = response.data;
            login({ name: user.name, email: user.email }, token);
            navigate('/');
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message || 'Login failed. Please check your credentials.');
            } else if (err.request) {
                setError('No response from server. Please try again later.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                {/* <p className="text-balance text-sm text-muted-foreground">
                Enter your email below to login to your account
                </p> */}
            </div>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                        id="email" 
                        type="email" 
                        placeholder="example@example.com" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
                    <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter your password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-400 text-white hover:text-jet-black" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
                <hr className="text-black"></hr>
                <span className="flex justify-center px-2 text-sm">
                    Or continue with
                </span>

                <Button type="button" variant="outline" className="w-full bg-gray-700 hover:bg-gray-400 text-white hover:text-jet-black">
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
