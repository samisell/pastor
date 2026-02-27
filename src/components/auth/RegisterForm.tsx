'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Mail, Lock, User, Phone, Heart, Building, Calendar, X } from 'lucide-react';
import { PageState } from '@/types';
import { categories } from '@/data/dummy';

interface RegisterFormProps {
  role: 'user' | 'pastor';
  onNavigate: (page: PageState) => void;
  onRegister: (data: any) => void;
}

export function RegisterForm({ role, onNavigate, onRegister }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    ministryName: '',
    yearsOfExperience: '',
    bio: '',
    specialties: [] as string[],
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onRegister({ ...formData, role });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4f8] to-white p-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8" data-aos="fade-up">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#102a43] rounded-full mb-4">
              <Heart className="w-8 h-8 text-[#dc2626]" />
            </div>
            <h1 className="text-2xl font-bold text-[#102a43]">
              {role === 'pastor' ? 'Register as Pastor' : 'Create Your Account'}
            </h1>
            <p className="text-gray-500 mt-2">
              {role === 'pastor'
                ? 'Join our community of spiritual counselors'
                : 'Start your journey to spiritual guidance'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Pastor-specific fields */}
            {role === 'pastor' && (
              <>
                {/* Ministry Name */}
                <div className="space-y-2">
                  <Label htmlFor="ministryName">Ministry/Church Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="ministryName"
                      placeholder="Grace Community Church"
                      value={formData.ministryName}
                      onChange={(e) => handleChange('ministryName', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Years of Experience */}
                <div className="space-y-2">
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="yearsOfExperience"
                      type="number"
                      placeholder="10"
                      value={formData.yearsOfExperience}
                      onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                      className="pl-10"
                      min="1"
                      required
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio / About Your Ministry</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about your ministry, experience, and approach to counseling..."
                    value={formData.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                {/* Specialties */}
                <div className="space-y-2">
                  <Label>Counseling Specialties</Label>
                  <p className="text-sm text-gray-500 mb-2">Select all that apply</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category.id}
                        variant={formData.specialties.includes(category.name) ? 'default' : 'outline'}
                        className={`cursor-pointer px-3 py-1 ${
                          formData.specialties.includes(category.name)
                            ? 'bg-[#dc2626] hover:bg-[#b91c1c]'
                            : 'border-gray-300 hover:border-[#dc2626]'
                        }`}
                        onClick={() => toggleSpecialty(category.name)}
                      >
                        {category.name}
                        {formData.specialties.includes(category.name) && (
                          <X className="w-3 h-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleChange('agreeToTerms', checked)}
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white h-12"
              disabled={isLoading || !formData.agreeToTerms}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <Separator className="my-6" />

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-[#dc2626] hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
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
