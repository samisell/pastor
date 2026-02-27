'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, Heart } from 'lucide-react';
import { PageState } from '@/types';

interface LoginFormProps {
  onNavigate: (page: PageState) => void;
  onLogin: (email: string, password: string) => void;
}

export function LoginForm({ onNavigate, onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4f8] to-white p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8" data-aos="fade-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#102a43] rounded-full mb-4">
              <Heart className="w-8 h-8 text-[#dc2626]" />
            </div>
            <h1 className="text-2xl font-bold text-[#102a43]">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-sm text-[#dc2626] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white h-12"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <Separator className="my-6" />

          {/* Register Links */}
          <div className="text-center space-y-3">
            <p className="text-gray-600">Don't have an account?</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-[#102a43] text-[#102a43] hover:bg-[#102a43] hover:text-white"
                onClick={() => onNavigate('register-user')}
              >
                Register as User
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white"
                onClick={() => onNavigate('register-pastor')}
              >
                Register as Pastor
              </Button>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <p className="text-center mt-6">
          <button
            onClick={() => onNavigate('home')}
            className="text-gray-500 hover:text-[#102a43] transition-colors"
          >
            ← Back to Home
          </button>
        </p>
      </div>
    </div>
  );
}
