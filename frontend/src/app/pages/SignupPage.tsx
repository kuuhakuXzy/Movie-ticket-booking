import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Film } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/signup', {
        name,
        email,
        password,
      });

      console.log('Signup successful:', response.data);
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else if (err.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="relative hidden bg-muted lg:block">
          <img
            src="src/assets/login-background.jpg"
            alt="Image"
            className="h-full"
          />
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="/" className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Film className="size-4" />
              </div>
              <div className="font-bold">CineBook</div>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <Card className="w-full max-w-xs p-4">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
                <CardDescription>Enter your details below to create your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign Up'}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="underline text-primary-foreground hover:text-primary">
                      Login
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
