import { Film } from 'lucide-react';
import { LoginAdminForm } from '../elements/LoginAdminForm';

export default function LoginAdminPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: "url('/film.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-8 w-full max-w-sm space-y-8">
        {/* Logo & Title */}
        <div className="flex items-center gap-2 justify-center text-2xl font-semibold">
          <Film className="size-6 text-blue-600" />
          <span className="text-lg font-semibold">Admin CineBook</span>
        </div>

        {/* Login Form */}
        <LoginAdminForm />
      </div>
    </div>
  );
}
