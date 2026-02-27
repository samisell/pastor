'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Play, Star, Users, Clock, Shield, Search, MapPin } from 'lucide-react';
import { PageState } from '@/types';
import { categories } from '@/data/dummy';

interface HeroProps {
  onNavigate: (page: PageState) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const stats = [
    { label: 'Verified Pastors', value: '500+', icon: Users },
    { label: 'Sessions Completed', value: '10K+', icon: Clock },
    { label: 'User Rating', value: '4.9', icon: Star },
    { label: 'Secure Platform', value: '100%', icon: Shield },
  ];

  const popularSearches = [
    'Marriage Counseling',
    'Grief Support',
    'Personal Guidance',
    'Family Counseling',
    'Spiritual Direction',
  ];

  const handleSearch = () => {
    if (searchQuery.trim() || selectedCategory) {
      onNavigate('browse-pastors');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#102a43] via-[#243b53] to-[#102a43] text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left" data-aos="fade-right">
            <div className="inline-block px-4 py-2 bg-[#dc2626]/20 rounded-full text-[#fca5a5] text-sm font-medium mb-6">
              Trusted by thousands of believers worldwide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find Spiritual{' '}
              <span className="text-[#dc2626]">Guidance</span>{' '}
              & Counseling
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              Connect with verified pastors and counselors for faith-based guidance through life's challenges. 
              Book video sessions from the comfort of your home.
            </p>

            {/* Search Field */}
            <div className="bg-white rounded-2xl p-2 shadow-2xl mb-6" data-aos="fade-up" data-aos-delay="100">
              <div className="flex flex-col md:flex-row gap-2">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search pastors, specialties..."
                    className="w-full pl-12 pr-4 py-4 text-gray-700 border-0 focus:ring-2 focus:ring-[#dc2626] text-lg rounded-xl"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    onKeyPress={handleKeyPress}
                  />
                  
                  {/* Search Suggestions Dropdown */}
                  {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                      <div className="p-3 border-b border-gray-100">
                        <p className="text-xs text-gray-500 font-medium uppercase">Popular Searches</p>
                      </div>
                      {popularSearches.filter(s => 
                        s.toLowerCase().includes(searchQuery.toLowerCase())
                      ).slice(0, 4).map((search, index) => (
                        <button
                          key={index}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                          onClick={() => {
                            setSearchQuery(search);
                            setShowSuggestions(false);
                            handleSearch();
                          }}
                        >
                          <Search className="w-4 h-4 text-gray-400" />
                          <span>{search}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category Select */}
                <div className="relative">
                  <select
                    className="w-full md:w-48 px-4 py-4 text-gray-700 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#dc2626] focus:border-transparent appearance-none bg-gray-50 cursor-pointer text-lg"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Search Button */}
                <Button
                  size="lg"
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-8 h-14 text-lg rounded-xl"
                  onClick={handleSearch}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Category Tags */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8" data-aos="fade-up" data-aos-delay="200">
              <span className="text-gray-400 text-sm">Popular:</span>
              {['Marriage', 'Grief', 'Family', 'Personal'].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors"
                  onClick={() => {
                    setSearchQuery(tag);
                    handleSearch();
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=40&h=40&fit=crop&crop=face`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-[#102a43]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=User${i}&background=random`;
                    }}
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-[#dc2626] text-[#dc2626]" />
                  ))}
                </div>
                <p className="text-sm text-gray-400">2,500+ Reviews</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative" data-aos="fade-left">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&h=700&fit=crop"
                alt="Pastoral Counseling"
                className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
              />
              {/* Floating Cards */}
              <div className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-xl p-4" data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#102a43]">Verified Pastors</p>
                    <p className="text-sm text-gray-500">Background checked</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 bottom-1/4 bg-white rounded-xl shadow-xl p-4" data-aos="fade-up" data-aos-delay="400">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#dc2626]/10 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#dc2626]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#102a43]">24/7 Availability</p>
                    <p className="text-sm text-gray-500">Book anytime</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-10 -right-10 w-72 h-72 bg-[#dc2626]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#dc2626]/10 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8" data-aos="fade-up">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-3">
                  <Icon className="w-6 h-6 text-[#dc2626]" />
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
