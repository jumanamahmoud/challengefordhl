"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Later: This is where you'll verify credentials against your .NET backend
    console.log("Attempting login for:", email);
    router.push('/dashboard'); 
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* DHL Branding Strip */}
        <div className="h-2 bg-[#FFCC00]" />
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">Login to manage DHL incidents</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email Address</label>
              <input 
                type="email" 
                required 
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D40511] outline-none text-black placeholder:text-gray-400"
                placeholder="name@dhl.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-xs text-[#D40511] hover:underline font-medium">Forgot password?</a>
              </div>
              <input 
                type="password" 
                required 
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#D40511] outline-none text-black placeholder:text-gray-400"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 mt-2 text-white bg-[#D40511] rounded-md hover:bg-red-700 transition-colors font-bold shadow-md"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            New to the portal?{' '}
            <Link href="/signup" className="text-[#D40511] font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}