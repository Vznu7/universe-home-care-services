'use client';

import { useState } from 'react';
import Image from 'next/image';
import { login } from '@/app/actions/auth';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(event.currentTarget);
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={64} height={64} className="w-16 h-16 object-contain" />
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sign in to manage {siteConfig.name} care requests.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm text-slate-900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm text-slate-900"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full justify-center" disabled={isPending}>
                {isPending ? 'Signing in...' : 'Sign In'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
