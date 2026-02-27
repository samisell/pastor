'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Heart,
  ArrowLeft,
  Shield,
  Users,
  Video,
  Star,
  CheckCircle,
} from 'lucide-react';
import { PageState } from '@/types';

interface UserLoginFormProps {
  onNavigate: (page: PageState) => void;
  onLogin: (email: string, password: string) => void;
}

export function UserLoginForm({ onNavigate, onLogin }: UserLoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
    }, 1000);
  };

  const features = [
    { icon: Video, text: 'Video Sessions with Verified Pastors' },
    { icon: Shield, text: 'Private & Confidential Counseling' },
    { icon: Star, text: 'Rated & Reviewed Counselors' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#102a43] via-[#243b53] to-[#102a43] relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#dc2626] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#dc2626] rounded-full blur-[150px] opacity-15" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-14 h-14 bg-[#dc2626] rounded-xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">PastorCounsel</h1>
              <p className="text-gray-400 text-sm">For Seekers</p>
            </div>
          </div>

          {/* Hero Text */}
          <h2 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
            Find Spiritual<br />
            <span className="text-[#dc2626]">Guidance</span> Today
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-md">
            Connect with verified pastors and counselors for personalized spiritual guidance and support.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#dc2626]" />
                  </div>
                  <span className="text-gray-200">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* Testimonial */}
          <div className="mt-12 p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            <p className="text-gray-300 italic mb-4">
              &quot;PastorCounsel helped me find peace during a difficult time. The counselors are compassionate and truly understand spiritual needs.&quot;
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-[#f0f4f8] to-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#102a43] rounded-full mb-4">
              <Heart className="w-8 h-8 text-[#dc2626]" />
            </div>
            <h1 className="text-2xl font-bold text-[#102a43]">PastorCounsel</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100" data-aos="fade-up">
            {/* Header */}
            <div className="text-center mb-8">
              <Badge className="bg-[#dc2626]/10 text-[#dc2626] border-[#dc2626]/20 px-4 py-1 text-sm mb-4">
                <Users className="w-4 h-4 mr-2" />
                User Account
              </Badge>
              <h2 className="text-2xl font-bold text-[#102a43]">Welcome Back</h2>
              <p className="text-gray-500 mt-2">Sign in to continue your spiritual journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#102a43] font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-[#102a43] focus:ring-[#102a43]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#102a43] font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#102a43] focus:ring-[#102a43]"
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
                  className="text-sm text-[#dc2626] hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white h-12 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">Don&apos;t have an account?</p>
              <Button
                variant="outline"
                className="w-full border-[#102a43] text-[#102a43] hover:bg-[#102a43] hover:text-white h-12"
                onClick={() => onNavigate('register-user')}
              >
                Create Your Account
              </Button>
            </div>

            {/* Pastor Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Are you a pastor?{' '}
                <button
                  onClick={() => onNavigate('pastor-login')}
                  className="text-[#102a43] hover:underline font-medium"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <button
            onClick={() => onNavigate('home')}
            className="mt-6 flex items-center gap-2 text-gray-500 hover:text-[#102a43] transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
