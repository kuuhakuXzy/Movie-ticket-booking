import { Film } from "lucide-react"

import { LoginForm } from "@/app/elements/login-form"

export default function LoginPage() {
    return (
        <div className="bg-white">
            <div className="grid min-h-screen lg:grid-cols-2">
                <div className="relative">
                    <img
                        src="src/assets/login-background.jpg"
                        alt="Image"
                        className="h-full"
                    />
                </div>
            <div className="flex flex-col gap-4 p-10">
                <div className="flex justify-start gap-2">
                    <a href="/" className="flex items-center gap-2 font-medium">
                        <div className="flex items-center justify-center rounded-md font-bold">
                            <Film className="size-6" />
                        </div>
                        <span className="font-bold">CineBook</span>
                    </a>
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
