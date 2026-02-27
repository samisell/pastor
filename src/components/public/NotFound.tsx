'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Home,
  Search,
  ArrowLeft,
  MessageSquare,
  BookOpen,
  Users,
  Calendar,
  Heart,
  Mail,
  RefreshCw,
  MapPin,
  Compass,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Cross,
  Shield,
  Clock,
  Star,
  Send,
} from 'lucide-react';
import { PageState } from '@/types';

interface NotFoundProps {
  onNavigate: (page: PageState) => void;
}

const quickLinks = [
  { label: 'Find a Pastor', icon: Users, page: 'browse-pastors' as PageState, color: 'bg-red-100 text-[#dc2626]' },
  { label: 'How It Works', icon: BookOpen, page: 'how-it-works' as PageState, color: 'bg-blue-100 text-[#102a43]' },
  { label: 'Book a Session', icon: Calendar, page: 'home' as PageState, color: 'bg-green-100 text-green-600' },
  { label: 'Contact Support', icon: Mail, page: 'contact' as PageState, color: 'bg-purple-100 text-purple-600' },
];

const suggestions = [
  {
    title: 'Looking for spiritual guidance?',
    description: 'Browse our verified pastors and find the right counselor for your needs.',
    icon: Search,
    action: 'Browse Pastors',
    page: 'browse-pastors' as PageState,
  },
  {
    title: 'Need help getting started?',
    description: 'Learn how our platform works and what to expect from your sessions.',
    icon: BookOpen,
    action: 'How It Works',
    page: 'how-it-works' as PageState,
  },
  {
    title: 'Have questions?',
    description: 'Check our frequently asked questions or reach out to our support team.',
    icon: MessageSquare,
    action: 'View FAQ',
    page: 'faq' as PageState,
  },
];

export function NotFound({ onNavigate }: NotFoundProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onNavigate('browse-pastors');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] via-white to-[#f0f4f8] flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#dc2626] rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#102a43] rounded-full blur-[180px]"
        />

        {/* Floating Icons */}
        {[Heart, Cross, Shield, Star, Sparkles].map((Icon, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              top: `${20 + index * 15}%`,
              left: index % 2 === 0 ? '10%' : 'auto',
              right: index % 2 !== 0 ? '10%' : 'auto',
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          >
            <Icon className="w-8 h-8 text-[#dc2626]/30" />
          </motion.div>
        ))}

        {/* Particle Effects */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#dc2626]/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-4xl w-full">
          {/* 404 Number with Creative Animation */}
          <div className="text-center mb-8" data-aos="fade-down">
            <div className="relative inline-block">
              {/* Glowing Background */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 blur-3xl bg-[#dc2626]/20 rounded-full"
              />
              
              {/* 404 Text */}
              <div className="relative">
                <motion.span
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(220, 38, 38, 0.3)',
                      '0 0 40px rgba(220, 38, 38, 0.5)',
                      '0 0 20px rgba(220, 38, 38, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[120px] md:text-[180px] font-black bg-gradient-to-br from-[#102a43] via-[#dc2626] to-[#102a43] bg-clip-text text-transparent leading-none block"
                >
                  4
                </motion.span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-gradient-to-br from-[#dc2626] to-[#b91c1c] rounded-full flex items-center justify-center shadow-lg shadow-[#dc2626]/30">
                    <Compass className="w-10 h-10 md:w-14 md:h-14 text-white" />
                  </div>
                </motion.div>
                <motion.span
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(220, 38, 38, 0.3)',
                      '0 0 40px rgba(220, 38, 38, 0.5)',
                      '0 0 20px rgba(220, 38, 38, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="text-[120px] md:text-[180px] font-black bg-gradient-to-br from-[#102a43] via-[#dc2626] to-[#102a43] bg-clip-text text-transparent leading-none block"
                >
                  4
                </motion.span>
              </div>
            </div>
          </div>

          {/* Error Badge & Message */}
          <div className="text-center mb-10" data-aos="fade-up">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <Badge className="bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white px-6 py-2 text-sm mb-6 shadow-lg shadow-[#dc2626]/20">
                <AlertCircle className="w-4 h-4 mr-2" />
                Page Not Found
              </Badge>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-[#102a43] mb-4">
              Oops! You&apos;ve Lost Your Way
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. 
              Don&apos;t worry, even the most faithful wander sometimes. Let us guide you back home.
            </p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto mb-10"
          >
            <div className="bg-white rounded-2xl shadow-xl p-2 border border-gray-100">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for pastors, services..."
                    className="w-full pl-12 pr-4 py-3 border-0 focus:ring-2 focus:ring-[#dc2626] text-gray-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 rounded-xl"
                  onClick={handleSearch}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12" data-aos="fade-up" data-aos-delay="100">
            <Button
              size="lg"
              className="bg-[#102a43] hover:bg-[#243b53] text-white px-8 h-14 shadow-lg shadow-[#102a43]/20"
              onClick={() => onNavigate('home')}
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white px-8 h-14"
              onClick={() => onNavigate('browse-pastors')}
            >
              <Search className="w-5 h-5 mr-2" />
              Find a Pastor
            </Button>
          </div>

          {/* Suggestions Grid */}
          <div className="mb-12" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-xl font-semibold text-[#102a43] text-center mb-6 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#dc2626]" />
              Here are some helpful suggestions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {suggestions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card
                      className="border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                      onClick={() => onNavigate(item.page)}
                    >
                      <CardContent className="p-6 relative">
                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#102a43] to-[#243b53] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative z-10">
                          <div className="w-14 h-14 bg-[#dc2626]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                            <Icon className="w-7 h-7 text-[#dc2626] group-hover:text-white transition-colors" />
                          </div>
                          <h3 className="font-semibold text-[#102a43] text-lg mb-2 group-hover:text-white transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-200 transition-colors">
                            {item.description}
                          </p>
                          <div className="flex items-center text-[#dc2626] text-sm font-medium group-hover:text-white transition-colors">
                            {item.action}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-none shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#102a43] via-[#243b53] to-[#102a43] text-white p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#dc2626] rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Quick Navigation</h3>
                    <p className="text-sm text-gray-300">Jump directly to popular pages</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 bg-[#f0f4f8]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {quickLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-[#102a43]/20"
                        onClick={() => onNavigate(link.page)}
                      >
                        <div className={`w-12 h-12 ${link.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-[#102a43]">{link.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Scripture Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <Card className="inline-block border-none shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-[#f0f4f8] via-white to-[#f0f4f8] p-8">
                  <div className="flex items-start gap-5">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-14 h-14 bg-gradient-to-br from-[#dc2626] to-[#b91c1c] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-[#dc2626]/20"
                    >
                      <BookOpen className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="text-left">
                      <p className="text-gray-700 italic text-lg mb-3 leading-relaxed">
                        &ldquo;For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.&rdquo;
                      </p>
                      <p className="text-[#102a43] font-semibold">— Jeremiah 29:11 (NIV)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-gray-500">
              If you believe this is an error, please{' '}
              <Button
                variant="link"
                className="h-auto p-0 text-[#dc2626] hover:text-[#b91c1c] font-medium"
                onClick={() => onNavigate('contact')}
              >
                contact our support team
              </Button>
              {' '}and we&apos;ll help you right away.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-200 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#dc2626] rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-[#102a43]">PastorCounsel</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Button
                variant="link"
                className="h-auto p-0 text-gray-500 hover:text-[#102a43]"
                onClick={() => onNavigate('privacy')}
              >
                Privacy Policy
              </Button>
              <Button
                variant="link"
                className="h-auto p-0 text-gray-500 hover:text-[#102a43]"
                onClick={() => onNavigate('terms')}
              >
                Terms of Service
              </Button>
              <Button
                variant="link"
                className="h-auto p-0 text-gray-500 hover:text-[#102a43]"
                onClick={() => onNavigate('contact')}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
