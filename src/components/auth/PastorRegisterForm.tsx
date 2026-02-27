'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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
  Star,
  CheckCircle,
  XCircle,
  ArrowRight,
  Building,
  Calendar,
  Award,
  BookOpen,
  Globe,
  Clock,
  DollarSign,
  Briefcase,
  FileText,
  Upload,
  X,
} from 'lucide-react';
import { PageState } from '@/types';
import { categories } from '@/data/dummy';

interface PastorRegisterFormProps {
  onNavigate: (page: PageState) => void;
  onRegister: (data: Record<string, unknown>) => void;
}

export function PastorRegisterForm({ onNavigate, onRegister }: PastorRegisterFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ministryName: '',
    yearsOfExperience: '',
    bio: '',
    specialties: [] as string[],
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string | boolean | string[]) => {
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
      onRegister({ ...formData, role: 'pastor' });
      setIsLoading(false);
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Ministry Details' },
    { number: 3, title: 'Specialties' },
    { number: 4, title: 'Security' },
  ];

  const benefits = [
    { icon: Globe, text: 'Global Reach' },
    { icon: Clock, text: 'Flexible Hours' },
    { icon: DollarSign, text: 'Earn Income' },
    { icon: Shield, text: 'Secure Platform' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-[#f0f4f8] to-white overflow-y-auto">
        <div className="w-full max-w-2xl py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#102a43] to-[#243b53] rounded-full mb-4 shadow-lg">
              <Briefcase className="w-8 h-8 text-[#dc2626]" />
            </div>
            <h1 className="text-2xl font-bold text-[#102a43]">PastorCounsel</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100" data-aos="fade-up">
            {/* Header */}
            <div className="text-center mb-8">
              <Badge className="bg-[#102a43]/10 text-[#102a43] border-[#102a43]/20 px-4 py-1 text-sm mb-4">
                <Briefcase className="w-4 h-4 mr-2" />
                Pastor Application
              </Badge>
              <h2 className="text-2xl font-bold text-[#102a43]">Join as a Pastor</h2>
              <p className="text-gray-500 mt-2">Complete your application to start counseling</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8 px-4">
              {steps.map((s, index) => (
                <React.Fragment key={s.number}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        step >= s.number
                          ? 'bg-[#102a43] text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step > s.number ? <CheckCircle className="w-5 h-5" /> : s.number}
                    </div>
                    <span className="text-xs text-gray-500 mt-2 hidden sm:block">{s.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition-colors ${
                        step > s.number ? 'bg-[#102a43]' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-[#102a43] font-medium">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="name"
                          placeholder="Pastor John Smith"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className="pl-10 h-12 border-gray-200 focus:border-[#102a43]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#102a43] font-medium">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="pastor@church.org"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="pl-10 h-12 border-gray-200 focus:border-[#102a43]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#102a43] font-medium">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-[#102a43]"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full bg-[#102a43] hover:bg-[#243b53] text-white h-12"
                    onClick={() => setStep(2)}
                    disabled={!formData.name || !formData.email || !formData.phone}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              )}

              {/* Step 2: Ministry Details */}
              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="ministryName" className="text-[#102a43] font-medium">Ministry/Church Name *</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="ministryName"
                        placeholder="Grace Community Church"
                        value={formData.ministryName}
                        onChange={(e) => handleChange('ministryName', e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-[#102a43]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience" className="text-[#102a43] font-medium">Years of Experience *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="yearsOfExperience"
                        type="number"
                        placeholder="10"
                        value={formData.yearsOfExperience}
                        onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
                        className="pl-10 h-12 border-gray-200 focus:border-[#102a43]"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-[#102a43] font-medium">Bio / About Your Ministry *</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your ministry, experience, and approach to counseling..."
                      value={formData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      rows={4}
                      className="border-gray-200 focus:border-[#102a43] resize-none"
                      required
                    />
                    <p className="text-xs text-gray-400">{formData.bio.length}/500 characters</p>
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
                      type="button"
                      className="flex-1 bg-[#102a43] hover:bg-[#243b53] text-white h-12"
                      onClick={() => setStep(3)}
                      disabled={!formData.ministryName || !formData.yearsOfExperience || !formData.bio}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}

              {/* Step 3: Specialties */}
              {step === 3 && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-[#102a43] font-medium">Counseling Specialties *</Label>
                      <p className="text-sm text-gray-500 mt-1">Select all that apply (minimum 1)</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => {
                        const isSelected = formData.specialties.includes(category.name);
                        return (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => toggleSpecialty(category.name)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              isSelected
                                ? 'bg-[#102a43] text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {isSelected && <CheckCircle className="w-3 h-3 inline mr-1" />}
                            {category.name}
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-sm text-gray-500">
                      Selected: {formData.specialties.length} specialty(ies)
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800">Verification Required</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          After registration, you&apos;ll need to verify your credentials. This typically takes 2-3 business days.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12"
                      onClick={() => setStep(2)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="button"
                      className="flex-1 bg-[#102a43] hover:bg-[#243b53] text-white h-12"
                      onClick={() => setStep(4)}
                      disabled={formData.specialties.length === 0}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}

              {/* Step 4: Security */}
              {step === 4 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#102a43] font-medium">Password *</Label>
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
                        minLength={8}
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

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-[#102a43] font-medium">Confirm Password *</Label>
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
                        className="text-[#102a43] hover:underline"
                      >
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate('privacy')}
                        className="text-[#102a43] hover:underline"
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
                      onClick={() => setStep(3)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#dc2626] hover:bg-[#b91c1c] text-white h-12"
                      disabled={isLoading || !formData.agreeToTerms || formData.password !== formData.confirmPassword || formData.password.length < 8}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Application'
                      )}
                    </Button>
                  </div>
                </>
              )}
            </form>

            <Separator className="my-6" />

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already registered?{' '}
                <button
                  onClick={() => onNavigate('pastor-login')}
                  className="text-[#102a43] hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>

            {/* User Register Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">
                Seeking counseling?{' '}
                <button
                  onClick={() => onNavigate('register-user')}
                  className="text-[#dc2626] hover:underline font-medium"
                >
                  Register as user
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
      <div className="hidden lg:flex lg:w-[400px] xl:w-[450px] bg-gradient-to-br from-[#102a43] via-[#1e3a5f] to-[#102a43] relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#dc2626] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#dc2626] rounded-full blur-[150px] opacity-15" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-8 xl:px-12 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-[#dc2626] to-[#b91c1c] rounded-xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">PastorCounsel</h1>
              <p className="text-gray-400 text-xs">Counselor Portal</p>
            </div>
          </div>

          {/* Benefits */}
          <h3 className="text-lg font-semibold mb-6">Why Join PastorCounsel?</h3>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/10">
                  <Icon className="w-4 h-4 text-[#dc2626]" />
                  <span className="text-sm text-gray-200">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          {/* Testimonial */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-300 text-sm italic mb-3">
              &quot;PastorCounsel has allowed me to extend my ministry beyond the walls of my church. Truly transformative!&quot;
            </p>
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                alt="Pastor"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Pastor Michael</p>
                <p className="text-xs text-gray-400">100+ Sessions</p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Requirements:</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Ordination or ministry credentials
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Counseling experience
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Background verification
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
