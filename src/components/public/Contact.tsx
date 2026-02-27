'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  CheckCircle,
  Globe,
  Building,
  User,
  FileText,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Heart,
  Shield,
  Zap,
  Calendar,
  Video,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from 'lucide-react';
import { PageState } from '@/types';

interface ContactProps {
  onNavigate: (page: PageState) => void;
}

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us an email and we\'ll respond within 24 hours',
    value: 'support@pastorcounsel.org',
    action: 'mailto:support@pastorcounsel.org',
    color: 'bg-blue-100 text-blue-600',
    available: '24/7',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our support team',
    value: '+1 (555) 123-4567',
    action: 'tel:+15551234567',
    color: 'bg-green-100 text-green-600',
    available: 'Mon-Fri, 9AM-6PM EST',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with us in real-time',
    value: 'Start a conversation',
    action: '#chat',
    color: 'bg-purple-100 text-purple-600',
    available: '24/7',
  },
  {
    icon: Calendar,
    title: 'Schedule a Call',
    description: 'Book a time that works for you',
    value: 'Book appointment',
    action: '#schedule',
    color: 'bg-orange-100 text-orange-600',
    available: 'Flexible scheduling',
  },
];

const officeLocations = [
  {
    city: 'Dallas',
    country: 'United States',
    address: '123 Ministry Way, Suite 400',
    zip: 'Dallas, TX 75001',
    phone: '+1 (555) 123-4567',
    email: 'dallas@pastorcounsel.org',
    hours: 'Mon-Fri: 9AM - 6PM CST',
    isHeadquarters: true,
  },
  {
    city: 'London',
    country: 'United Kingdom',
    address: '45 Faith Street',
    zip: 'London EC1A 1BB',
    phone: '+44 20 7123 4567',
    email: 'london@pastorcounsel.org',
    hours: 'Mon-Fri: 9AM - 6PM GMT',
    isHeadquarters: false,
  },
  {
    city: 'Nairobi',
    country: 'Kenya',
    address: '78 Grace Building, Upper Hill',
    zip: 'Nairobi 00100',
    phone: '+254 20 123 4567',
    email: 'nairobi@pastorcounsel.org',
    hours: 'Mon-Fri: 9AM - 6PM EAT',
    isHeadquarters: false,
  },
];

const faqLinks = [
  { question: 'How do I book a session?', page: 'faq' as PageState },
  { question: 'What are the payment options?', page: 'faq' as PageState },
  { question: 'How do I become a pastor?', page: 'faq' as PageState },
  { question: 'Is my information secure?', page: 'faq' as PageState },
];

const supportTopics = [
  'General Inquiry',
  'Technical Support',
  'Pastor Registration',
  'Billing & Payments',
  'Session Issues',
  'Account Problems',
  'Partnership Inquiry',
  'Media & Press',
  'Feedback & Suggestions',
  'Other',
];

const socialLinks = [
  { icon: Facebook, name: 'Facebook', url: '#', followers: '125K' },
  { icon: Twitter, name: 'Twitter', url: '#', followers: '89K' },
  { icon: Instagram, name: 'Instagram', url: '#', followers: '156K' },
  { icon: Youtube, name: 'YouTube', url: '#', followers: '234K' },
  { icon: Linkedin, name: 'LinkedIn', url: '#', followers: '45K' },
];

export function Contact({ onNavigate }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    subject: '',
    message: '',
    priority: 'normal',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.topic) {
      newErrors.topic = 'Please select a topic';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-white flex items-center justify-center p-4">
        <Card className="border-none shadow-2xl max-w-lg w-full" data-aos="fade-up">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#102a43] mb-4">Message Sent Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for reaching out. We've received your message and will respond within 24 hours. You'll receive a confirmation email shortly.
            </p>
            <div className="bg-[#f0f4f8] rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500">Your ticket reference</p>
              <p className="text-lg font-semibold text-[#102a43]">#PC-2024-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-[#102a43] hover:bg-[#243b53] text-white"
                onClick={() => onNavigate('home')}
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    topic: '',
                    subject: '',
                    message: '',
                    priority: 'normal',
                  });
                }}
              >
                Send Another Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#102a43] via-[#243b53] to-[#102a43] text-white py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#dc2626] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#dc2626] rounded-full blur-[150px] opacity-15" />
          {/* Animated dots pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.5" fill="white" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#dc2626]/20 text-[#fca5a5] border-[#dc2626]/30 px-4 py-2 text-sm mb-6" data-aos="fade-down">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-aos="fade-up">
              We're Here to{' '}
              <span className="text-[#dc2626]">Help</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Have a question or need assistance? Our team is ready to support you on your spiritual journey.
            </p>

            {/* Quick Contact Options */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <a
                    key={index}
                    href={method.action}
                    className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl p-4 transition-all border border-white/10 hover:border-white/30"
                  >
                    <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-white mb-1">{method.title}</h3>
                    <p className="text-sm text-gray-300">{method.value}</p>
                    <Badge variant="outline" className="mt-2 border-white/30 text-white/70 text-xs">
                      {method.available}
                    </Badge>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-[#f0f4f8]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-xl" data-aos="fade-right">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#dc2626] rounded-xl flex items-center justify-center">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#102a43]">Send Us a Message</h2>
                      <p className="text-gray-500">Fill out the form below and we'll get back to you</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">
                          Full Name <span className="text-[#dc2626]">*</span>
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className={`pl-10 h-12 ${errors.name ? 'border-[#dc2626] focus-visible:ring-[#dc2626]' : ''}`}
                          />
                        </div>
                        {errors.name && <p className="text-[#dc2626] text-sm">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 font-medium">
                          Email Address <span className="text-[#dc2626]">*</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className={`pl-10 h-12 ${errors.email ? 'border-[#dc2626] focus-visible:ring-[#dc2626]' : ''}`}
                          />
                        </div>
                        {errors.email && <p className="text-[#dc2626] text-sm">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-medium">
                          Phone Number (Optional)
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>

                      {/* Topic */}
                      <div className="space-y-2">
                        <Label htmlFor="topic" className="text-gray-700 font-medium">
                          Topic <span className="text-[#dc2626]">*</span>
                        </Label>
                        <Select value={formData.topic} onValueChange={(value) => handleChange('topic', value)}>
                          <SelectTrigger className={`h-12 ${errors.topic ? 'border-[#dc2626]' : ''}`}>
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                          <SelectContent>
                            {supportTopics.map((topic) => (
                              <SelectItem key={topic} value={topic.toLowerCase().replace(/\s+/g, '-')}>
                                {topic}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.topic && <p className="text-[#dc2626] text-sm">{errors.topic}</p>}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-700 font-medium">
                        Subject <span className="text-[#dc2626]">*</span>
                      </Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="subject"
                          placeholder="Brief description of your inquiry"
                          value={formData.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          className={`pl-10 h-12 ${errors.subject ? 'border-[#dc2626] focus-visible:ring-[#dc2626]' : ''}`}
                        />
                      </div>
                      {errors.subject && <p className="text-[#dc2626] text-sm">{errors.subject}</p>}
                    </div>

                    {/* Priority */}
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">Priority Level</Label>
                      <div className="flex gap-4">
                        {[
                          { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700 border-green-300' },
                          { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-700 border-blue-300' },
                          { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-700 border-orange-300' },
                          { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-700 border-red-300' },
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleChange('priority', option.value)}
                            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                              formData.priority === option.value
                                ? option.color
                                : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700 font-medium">
                        Message <span className="text-[#dc2626]">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Please describe your question or concern in detail..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        rows={6}
                        className={`resize-none ${errors.message ? 'border-[#dc2626] focus-visible:ring-[#dc2626]' : ''}`}
                      />
                      <div className="flex justify-between text-sm">
                        {errors.message ? (
                          <p className="text-[#dc2626]">{errors.message}</p>
                        ) : (
                          <span className="text-gray-400">Minimum 20 characters</span>
                        )}
                        <span className={`${formData.message.length < 20 ? 'text-gray-400' : 'text-green-600'}`}>
                          {formData.message.length} characters
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white h-14 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick FAQ */}
              <Card className="border-none shadow-lg" data-aos="fade-left">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#102a43] rounded-lg flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-[#102a43]">Quick Answers</h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">Find answers to common questions</p>
                  <div className="space-y-2">
                    {faqLinks.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => onNavigate(item.page)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#f0f4f8] transition-colors text-left group"
                      >
                        <span className="text-gray-700 group-hover:text-[#dc2626] transition-colors text-sm">
                          {item.question}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#dc2626] transition-colors" />
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-[#102a43] text-[#102a43] hover:bg-[#102a43] hover:text-white"
                    onClick={() => onNavigate('faq')}
                  >
                    View All FAQs
                  </Button>
                </CardContent>
              </Card>

              {/* Support Hours */}
              <Card className="border-none shadow-lg" data-aos="fade-left" data-aos-delay="100">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-[#102a43]">Support Hours</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monday - Friday</span>
                      <Badge className="bg-green-100 text-green-700">9:00 AM - 6:00 PM EST</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Saturday</span>
                      <Badge className="bg-blue-100 text-blue-700">10:00 AM - 4:00 PM EST</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Sunday</span>
                      <Badge variant="outline" className="border-gray-300 text-gray-500">Closed</Badge>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-[#f0f4f8] rounded-lg">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#dc2626]" />
                      <strong>24/7</strong> email support available
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Why Contact Us */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-[#102a43] to-[#243b53] text-white" data-aos="fade-left" data-aos-delay="200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#dc2626] rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold">Why Reach Out?</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { icon: Heart, text: 'Compassionate support team' },
                      { icon: Zap, text: 'Fast response times' },
                      { icon: Shield, text: 'Confidential assistance' },
                      { icon: User, text: 'Personalized help' },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <li key={index} className="flex items-center gap-3 text-sm">
                          <Icon className="w-4 h-4 text-[#dc2626]" />
                          <span className="text-gray-200">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <Badge className="bg-[#dc2626]/10 text-[#dc2626] px-4 py-2 mb-4">
              <Building className="w-4 h-4 mr-2" />
              Our Offices
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#102a43] mb-4">
              Global Presence
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We serve believers around the world from our offices across multiple continents.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {officeLocations.map((office, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {office.isHeadquarters && (
                  <div className="bg-[#dc2626] text-white text-xs font-medium px-3 py-1 text-center">
                    Headquarters
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#102a43] rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#102a43] text-lg">{office.city}</h3>
                      <p className="text-gray-500 text-sm">{office.country}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-gray-700">{office.address}</p>
                        <p className="text-gray-700">{office.zip}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      <a href={`tel:${office.phone}`} className="text-[#dc2626] hover:underline">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                      <a href={`mailto:${office.email}`} className="text-[#dc2626] hover:underline">
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-gray-600">{office.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-lg" data-aos="fade-up">
            <div className="h-80 bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0] flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-16 h-16 text-[#102a43] mx-auto mb-4" />
                <p className="text-gray-500">Interactive map would be displayed here</p>
                <p className="text-sm text-gray-400 mt-1">Integration with Google Maps or Mapbox</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-[#102a43] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Connect With Us</h2>
            <p className="text-gray-300">Follow us on social media for updates, inspiration, and community</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4" data-aos="fade-up" data-aos-delay="100">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  className="flex items-center gap-3 bg-white/10 hover:bg-[#dc2626] backdrop-blur-sm rounded-xl px-6 py-4 transition-all group"
                >
                  <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-medium">{social.name}</p>
                    <p className="text-sm text-gray-400 group-hover:text-white/80">{social.followers} followers</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#dc2626] to-[#b91c1c]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" data-aos="fade-up">
            Ready to Start Your Spiritual Journey?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Browse our community of verified pastors and find the right guide for your path.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#dc2626] hover:bg-gray-100 h-14 px-8"
            onClick={() => onNavigate('browse-pastors')}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Find a Pastor
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
