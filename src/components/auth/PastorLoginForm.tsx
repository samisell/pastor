'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
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
  Award,
  BookOpen,
  Globe,
  Clock,
  DollarSign,
  Briefcase,
} from 'lucide-react';
import { PageState } from '@/types';

interface PastorLoginFormProps {
  onNavigate: (page: PageState) => void;
  onLogin: (email: string, password: string) => void;
}

export function PastorLoginForm({ onNavigate, onLogin }: PastorLoginFormProps) {
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

  const benefits = [
    { icon: Globe, text: 'Reach a Global Audience' },
    { icon: Clock, text: 'Flexible Schedule' },
    { icon: DollarSign, text: 'Competitive Earnings' },
    { icon: Shield, text: 'Secure Platform' },
  ];

  const stats = [
    { value: '500+', label: 'Active Pastors' },
    { value: '10K+', label: 'Sessions Completed' },
    { value: '4.9', label: 'Avg. Rating' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-[#f0f4f8] to-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#102a43] to-[#243b53] rounded-full mb-4 shadow-lg">
              <Briefcase className="w-8 h-8 text-[#dc2626]" />
            </div>
            <h1 className="text-2xl font-bold text-[#102a43]">PastorCounsel</h1>
            <p className="text-gray-500 text-sm">Counselor Portal</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100" data-aos="fade-up">
            {/* Header */}
            <div className="text-center mb-8">
              <Badge className="bg-[#102a43]/10 text-[#102a43] border-[#102a43]/20 px-4 py-1 text-sm mb-4">
                <Briefcase className="w-4 h-4 mr-2" />
                Pastor Portal
              </Badge>
              <h2 className="text-2xl font-bold text-[#102a43]">Pastor Sign In</h2>
              <p className="text-gray-500 mt-2">Access your counseling dashboard</p>
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
                    placeholder="pastor@church.org"
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
                  className="text-sm text-[#102a43] hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#102a43] hover:bg-[#243b53] text-white h-12 text-base font-medium"
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
                  'Access Dashboard'
                )}
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">New to PastorCounsel?</p>
              <Button
                variant="outline"
                className="w-full border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white h-12"
                onClick={() => onNavigate('register-pastor')}
              >
                Apply to Join as Pastor
              </Button>
            </div>

            {/* User Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Seeking counseling?{' '}
                <button
                  onClick={() => onNavigate('user-login')}
                  className="text-[#dc2626] hover:underline font-medium"
                >
                  User Login
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

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#102a43] via-[#1e3a5f] to-[#102a43] relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#dc2626] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#dc2626] rounded-full blur-[150px] opacity-15" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-14 h-14 bg-gradient-to-br from-[#dc2626] to-[#b91c1c] rounded-xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">PastorCounsel</h1>
              <p className="text-gray-400 text-sm">Counselor Portal</p>
            </div>
          </div>

          {/* Hero Text */}
          <h2 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
            Expand Your<br />
            <span className="text-[#dc2626]">Ministry</span> Online
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-md">
            Connect with those seeking spiritual guidance. Grow your ministry and make a difference in lives around the world.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="w-10 h-10 bg-[#dc2626]/20 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#dc2626]" />
                  </div>
                  <span className="text-gray-200 text-sm font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-3xl font-bold text-[#dc2626]">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-12 p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-300 italic mb-4">
              &quot;PastorCounsel has transformed my ministry. I can now reach and counsel people from all over the world while maintaining my local church duties.&quot;
            </p>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face"
                alt="Pastor"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">Pastor John Williams</p>
                <p className="text-sm text-gray-400">Grace Community Church</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
