'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Heart,
  ArrowLeft,
  Shield,
  Users,
  Video,
  Star,
  CheckCircle,
  XCircle,
  ArrowRight,
} from 'lucide-react';
import { PageState } from '@/types';

interface UserRegisterFormProps {
  onNavigate: (page: PageState) => void;
  onRegister: (data: Record<string, unknown>) => void;
}

export function UserRegisterForm({ onNavigate, onRegister }: UserRegisterFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = () => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    return strength;
  };

  const getPasswordStrengthLabel = () => {
    const strength = passwordStrength();
    if (strength <= 25) return { label: 'Weak', color: 'text-red-500' };
    if (strength <= 50) return { label: 'Fair', color: 'text-amber-500' };
    if (strength <= 75) return { label: 'Good', color: 'text-blue-500' };
    return { label: 'Strong', color: 'text-green-500' };
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onRegister({ ...formData, role: 'user' });
      setIsLoading(false);
    }, 1500);
  };

  const benefits = [
    { icon: Video, text: 'Unlimited video sessions with verified pastors' },
    { icon: Shield, text: 'Private and confidential counseling' },
    { icon: Star, text: 'Access to top-rated spiritual counselors' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#102a43] via-[#243b53] to-[#102a43] relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#dc2626] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#dc2626] rounded-full blur-[150px] opacity-15" />
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
            Begin Your<br />
            <span className="text-[#dc2626]">Spiritual Journey</span>
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-md">
            Create your account to connect with compassionate pastors who can guide you through life&apos;s challenges.
          </p>

          {/* Benefits */}
          <div className="space-y-4 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#dc2626]" />
                  </div>
                  <span className="text-gray-200">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#dc2626]">500+</p>
              <p className="text-sm text-gray-400">Pastors</p>
            </div>
            <div className="text-center border-x border-white/10">
              <p className="text-3xl font-bold text-[#dc2626]">50K+</p>
              <p className="text-sm text-gray-400">Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#dc2626]">4.9</p>
              <p className="text-sm text-gray-400">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-[#f0f4f8] to-white overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#102a43] rounded-full mb-4">
              <Heart className="w-8 h-8 text-[#dc2626]" />
            </div>
            <h1 className="text-2xl font-bold text-[#102a43]">Create Account</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100" data-aos="fade-up">
            {/* Header */}
            <div className="text-center mb-8">
              <Badge className="bg-[#dc2626]/10 text-[#dc2626] border-[#dc2626]/20 px-4 py-1 text-sm mb-4">
                <Users className="w-4 h-4 mr-2" />
                User Account
              </Badge>
              <h2 className="text-2xl font-bold text-[#102a43]">Create Your Account</h2>
              <p className="text-gray-500 mt-2">Start your journey to spiritual guidance</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2].map((s) => (
                <React.Fragment key={s}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      step >= s
                        ? 'bg-[#dc2626] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 2 && (
                    <div
                      className={`w-16 h-1 rounded transition-colors ${
                        step > s ? 'bg-[#dc2626]' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 && (
                <>
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#102a43] font-medium">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-[#102a43]"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#102a43] font-medium">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-[#102a43]"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#102a43] font-medium">Phone Number (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-[#102a43]"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white h-12"
                    onClick={() => setStep(2)}
                    disabled={!formData.name || !formData.email}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#102a43] font-medium">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#102a43]"
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
                    {formData.password && (
                      <div className="space-y-1">
                        <Progress value={passwordStrength()} className="h-2" />
                        <p className={`text-xs ${getPasswordStrengthLabel().color}`}>
                          Password strength: {getPasswordStrengthLabel().label}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-[#102a43] font-medium">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-[#102a43]"
                        required
                      />
                    </div>
                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleChange('agreeToTerms', checked as boolean)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('terms')}
                        className="text-[#dc2626] hover:underline"
                      >
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('privacy')}
                        className="text-[#dc2626] hover:underline"
                      >
                        Privacy Policy
                      </button>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#dc2626] hover:bg-[#b91c1c] text-white h-12"
                      disabled={isLoading || !formData.agreeToTerms || formData.password !== formData.confirmPassword}
                    >
                      {isLoading ? 'Creating...' : 'Create Account'}
                    </Button>
                  </div>
                </>
              )}
            </form>

            <Separator className="my-6" />

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => onNavigate('user-login')}
                  className="text-[#dc2626] hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>

            {/* Pastor Register Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">
                Are you a pastor?{' '}
                <button
                  onClick={() => onNavigate('register-pastor')}
                  className="text-[#102a43] hover:underline font-medium"
                >
                  Apply here
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
