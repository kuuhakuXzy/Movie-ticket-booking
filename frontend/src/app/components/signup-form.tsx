import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function SignUpForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
            {/* <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to login to your account
            </p> */}
        </div>
        <div className="grid gap-6">
            <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@example.com" required />
            </div>
            <div className="grid gap-2">
            <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" placeholder="Enter your password" required />
            <Input id="password" type="password" placeholder="Confirm your password" required />
            </div>
            <Button type="submit" className="w-full">
            Signup
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"></div>
                <div className="text-center text-sm">
                Having an account already?{" "}
                <a href="/login" className="underline underline-offset-4">
                Login
                </a>
                </div>
        </div>
        </form>
    )
}
