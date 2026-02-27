'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Shield, Calendar, MessageSquare, Heart, Users, Lock, Globe } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Video,
      title: 'Video Counseling',
      description: 'Connect with pastors through secure, high-quality video sessions from anywhere in the world.',
    },
    {
      icon: Shield,
      title: 'Verified Pastors',
      description: 'All pastors undergo thorough background checks and credential verification for your safety.',
    },
    {
      icon: Calendar,
      title: 'Easy Scheduling',
      description: 'Book sessions at your convenience with our intuitive calendar system.',
    },
    {
      icon: MessageSquare,
      title: 'Secure Messaging',
      description: 'Communicate with your counselor through our encrypted messaging platform.',
    },
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Receive faith-based guidance from pastors who truly care about your spiritual journey.',
    },
    {
      icon: Users,
      title: 'Diverse Specialties',
      description: 'Find pastors specializing in marriage, trauma, deliverance, youth, and more.',
    },
    {
      icon: Lock,
      title: 'Complete Privacy',
      description: 'Your sessions and conversations are completely confidential and protected.',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access spiritual guidance regardless of your location or time zone.',
    },
  ];

  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block px-4 py-2 bg-[#dc2626]/10 text-[#dc2626] rounded-full text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#102a43] mb-4">
            Everything You Need for Spiritual Growth
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools and resources you need to connect with trusted spiritual counselors and grow in your faith journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-none shadow-md"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-[#102a43] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#dc2626] transition-colors">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#102a43] mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
