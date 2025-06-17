import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Film } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
      
      // Use the auth context's login function instead of directly setting localStorage
      login({ name: user.name, email: user.email }, token);
      
      navigate('/');
      console.log('Login successful:', response.data);
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
    <div className="bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side with image */}
        <div className="relative">
          <img
            src="src/assets/login-background.jpg"
            alt="Image"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side with login form */}
        <div className="flex flex-col gap-4 p-10">
          {/* Logo */}
          <div className="flex justify-start gap-2">
            <a href="/" className="flex items-center gap-2 font-medium">
              <div className="flex items-center justify-center rounded-md font-bold">
                <Film className="size-6" />
              </div>
              <span className="font-bold">CineBook</span>
            </a>
          </div>

          {/* Login form */}
          <div className="flex items-center justify-center flex-1">
            <Card className="w-full max-w-xs p-4">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Login to CineBook</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Don't have an account?{' '}
                    <Link to="/signup" className="underline text-primary-foreground hover:text-primary">
                      Sign up
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