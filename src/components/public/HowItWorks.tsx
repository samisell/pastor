'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Video, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import { PageState } from '@/types';

interface HowItWorksProps {
  onNavigate: (page: PageState) => void;
}

export function HowItWorks({ onNavigate }: HowItWorksProps) {
  const steps = [
    {
      step: '01',
      icon: Search,
      title: 'Browse Pastors',
      description: 'Explore our directory of verified pastors. Filter by specialty, location, language, and availability to find the perfect match for your needs.',
    },
    {
      step: '02',
      icon: Calendar,
      title: 'Book a Session',
      description: 'View available time slots and book a session that fits your schedule. Our calendar system makes scheduling effortless.',
    },
    {
      step: '03',
      icon: Video,
      title: 'Attend Session',
      description: 'Join your video counseling session directly from our platform. No additional software needed - everything is integrated.',
    },
    {
      step: '04',
      icon: Heart,
      title: 'Find Healing',
      description: 'Receive compassionate, faith-based guidance and continue your spiritual journey with renewed hope and purpose.',
    },
  ];

  const benefits = [
    'No download required - join sessions from your browser',
    'End-to-end encrypted video calls',
    'Flexible scheduling across time zones',
    'Affordable rates with transparent pricing',
    'Secure payment processing',
    'Satisfaction guarantee',
  ];

  return (
    <section className="py-20 bg-[#f0f4f8]" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block px-4 py-2 bg-[#102a43]/10 text-[#102a43] rounded-full text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#102a43] mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps to connect with a pastor and begin your journey to spiritual healing.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative" data-aos="fade-up" data-aos-delay={index * 150}>
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#dc2626] to-transparent z-0" />
                )}
                <Card className="relative z-10 h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-[#dc2626] rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#102a43] rounded-full text-white text-xs flex items-center justify-center font-bold">
                          {item.step}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#102a43] mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12" data-aos="fade-up">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#102a43] mb-6">
                Why Choose PastorCounsel?
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#dc2626] shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8 bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                onClick={() => onNavigate('browse-pastors')}
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=400&fit=crop"
                alt="Video Counseling"
                className="rounded-xl shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#102a43] text-white p-4 rounded-xl shadow-lg">
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-gray-300">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
