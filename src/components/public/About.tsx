'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  Users,
  Shield,
  Globe,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Target,
  Eye,
  Sparkles,
  Clock,
  Star,
  Play,
  Quote,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Cross,
  HandHeart,
  Church,
  MessageCircle,
  Video,
  Calendar,
  Lock,
} from 'lucide-react';
import { PageState } from '@/types';

interface AboutProps {
  onNavigate: (page: PageState) => void;
}

// Stats section component with internal animation state
function StatsSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    users: 0,
    pastors: 0,
    sessions: 0,
    countries: 0,
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  const targetCounts = {
    users: 1247,
    pastors: 89,
    sessions: 3456,
    countries: 52,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate counters
          const duration = 2000;
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            setCounts({
              users: Math.floor(progress * targetCounts.users),
              pastors: Math.floor(progress * targetCounts.pastors),
              sessions: Math.floor(progress * targetCounts.sessions),
              countries: Math.floor(progress * targetCounts.countries),
            });
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="py-24 bg-[#102a43] text-white relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#dc2626] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#dc2626] rounded-full blur-[150px]" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Since our founding, we've been blessed to serve thousands of individuals on their spiritual journey.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: counts.users, label: 'Users Served', icon: Users, suffix: '+' },
            { value: counts.pastors, label: 'Verified Pastors', icon: Cross, suffix: '' },
            { value: counts.sessions, label: 'Sessions Completed', icon: Video, suffix: '+' },
            { value: counts.countries, label: 'Countries Reached', icon: Globe, suffix: '' },
          ].map((stat, index) => (
            <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-[#dc2626]" />
              </div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value.toLocaleString()}{stat.suffix}
              </p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About({ onNavigate }: AboutProps) {

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We approach every individual with empathy and understanding, recognizing the courage it takes to seek help and the vulnerability involved in sharing personal struggles.',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We maintain the highest standards of ethics and transparency in all our operations, ensuring trust is at the foundation of every interaction.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: BookOpen,
      title: 'Faith-Based',
      description: 'Our counseling is rooted in biblical principles and the transformative power of faith, offering spiritual guidance alongside practical wisdom.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We foster a supportive community where individuals can find belonging, accountability, and spiritual growth on their journey.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'We believe spiritual guidance should be accessible to everyone, regardless of location, time zone, or circumstances.',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: Lock,
      title: 'Confidentiality',
      description: 'Your privacy is sacred. All sessions and communications are protected with the highest level of security and discretion.',
      color: 'bg-indigo-100 text-indigo-600',
    },
  ];

  const timeline = [
    {
      year: '2019',
      title: 'The Vision Begins',
      description: 'Our founder, Dr. Robert Johnson, envisioned a platform that would make spiritual counseling accessible to believers worldwide.',
      icon: Eye,
    },
    {
      year: '2020',
      title: 'Platform Launch',
      description: 'PastorCounsel officially launched with 25 verified pastors, offering video counseling sessions during the global pandemic.',
      icon: Sparkles,
    },
    {
      year: '2021',
      title: 'Rapid Growth',
      description: 'Expanded to over 100 pastors, introduced multi-language support, and reached 10,000 sessions milestone.',
      icon: Target,
    },
    {
      year: '2022',
      title: 'Global Reach',
      description: 'Opened services to 30+ countries, launched mobile apps, and partnered with major ministry networks.',
      icon: Globe,
    },
    {
      year: '2023',
      title: 'Community Impact',
      description: 'Reached 50,000 sessions, launched community features, and received recognition for excellence in faith-based counseling.',
      icon: Award,
    },
    {
      year: '2024',
      title: 'The Journey Continues',
      description: 'Continuing to grow and serve, with plans for AI-assisted matching, expanded categories, and global ministry partnerships.',
      icon: ArrowRight,
    },
  ];

  const team = [
    {
      name: 'Dr. Robert Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      bio: 'Former senior pastor with 25 years of ministry experience. Doctor of Ministry from Liberty University.',
      social: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Sarah Williams',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      bio: 'Expert in faith-based community building and nonprofit management. MBA from Duke University.',
      social: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      bio: 'Passionate about using technology for ministry. Former tech lead at major SaaS companies.',
      social: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Rev. Elizabeth Davis',
      role: 'Pastoral Advisory Board',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      bio: 'Licensed counselor and ordained minister with expertise in trauma-informed care.',
      social: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'David Martinez',
      role: 'Head of Pastors Relations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: '20+ years in pastoral ministry. Coordinates and supports our network of pastors.',
      social: { linkedin: '#', twitter: '#' },
    },
    {
      name: 'Rachel Thompson',
      role: 'Community Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      bio: 'Manages user experience and community engagement. Certified in pastoral care.',
      social: { linkedin: '#', twitter: '#' },
    },
  ];

  const testimonials = [
    {
      quote: "PastorCounsel saved my marriage. The convenience of video sessions combined with genuine spiritual guidance made all the difference.",
      author: 'Michael R.',
      role: 'Business Owner, Texas',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
    },
    {
      quote: "As a pastor, this platform has allowed me to extend my ministry beyond the walls of my church. I've counseled people from 15 different countries.",
      author: 'Pastor John W.',
      role: 'Platform Pastor, Dallas',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 5,
    },
    {
      quote: "After losing my husband, I felt alone. Finding Pastor Ruth through this platform helped me navigate my grief with faith and hope.",
      author: 'Jennifer L.',
      role: 'Teacher, Florida',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      rating: 5,
    },
  ];

  const features = [
    { icon: Video, title: 'HD Video Sessions', description: 'Crystal clear video quality for meaningful connections' },
    { icon: Calendar, title: 'Flexible Scheduling', description: 'Book sessions that fit your schedule, any time zone' },
    { icon: Lock, title: 'Secure & Private', description: 'End-to-end encryption for complete confidentiality' },
    { icon: MessageCircle, title: 'In-Session Chat', description: 'Communicate via text during video sessions' },
    { icon: Church, title: 'Verified Pastors', description: 'All pastors undergo rigorous credential verification' },
    { icon: HandHeart, title: 'Faith-Centered', description: 'Biblical principles guide every counseling session' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#102a43] via-[#243b53] to-[#102a43]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-[#dc2626] rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#dc2626] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[80px]" />
          </div>
          {/* Cross Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="crosses" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10 0v20M0 10h20" stroke="white" strokeWidth="0.5" fill="none"/>
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#crosses)"/>
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-[#dc2626]/20 text-[#fca5a5] border-[#dc2626]/30 px-4 py-2 text-sm mb-8" data-aos="fade-down">
              Our Story & Mission
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" data-aos="fade-up">
              Connecting Hearts with{' '}
              <span className="text-[#dc2626] relative">
                Spiritual
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M0 4c50-6 100-6 200 0" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>{' '}
              Guidance
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
              We believe everyone deserves access to compassionate, faith-based counseling. Our mission is to bridge the gap between those seeking guidance and pastors called to serve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
              <Button
                size="lg"
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-8 h-14 text-lg rounded-full shadow-xl shadow-[#dc2626]/30"
                onClick={() => onNavigate('browse-pastors')}
              >
                Find a Pastor
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 h-14 text-lg rounded-full"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Our Story
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <div className="relative" data-aos="fade-right">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dc2626]/10 rounded-full text-[#dc2626] text-sm font-medium mb-6">
                  <Target className="w-4 h-4" />
                  Our Mission
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#102a43] mb-6">
                  Making Spiritual Care Accessible to All
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  PastorCounsel was born from a simple yet powerful vision: to make quality spiritual counseling accessible to everyone, regardless of their location, circumstances, or background.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We connect individuals seeking guidance with verified pastors and counselors who provide faith-based support through secure video sessions. Our platform removes barriers of distance, time zones, and accessibility, bringing healing and hope directly to those who need it.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {['24/7 availability', 'Global reach', 'Verified pastors', 'Secure sessions'].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#dc2626]" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-[#dc2626]/10 rounded-full blur-3xl" />
            </div>

            {/* Image Collage */}
            <div className="relative" data-aos="fade-left">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&h=300&fit=crop"
                    alt="Prayer"
                    className="rounded-2xl shadow-xl w-full object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop"
                    alt="Community"
                    className="rounded-2xl shadow-xl w-full object-cover"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
                    alt="Video Call"
                    className="rounded-2xl shadow-xl w-full object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=300&fit=crop"
                    alt="Study"
                    className="rounded-2xl shadow-xl w-full object-cover"
                  />
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-6 flex items-center gap-4" data-aos="fade-up" data-aos-delay="300">
                <div className="w-16 h-16 bg-[#dc2626] rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#102a43]">50,000+</p>
                  <p className="text-gray-500">Lives Touched</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-gradient-to-br from-[#f0f4f8] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#102a43]/10 rounded-full text-[#102a43] text-sm font-medium mb-6">
                <Eye className="w-4 h-4" />
                Our Vision
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#102a43] mb-6">
                A World Where Everyone Has Access to Spiritual Guidance
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Globe,
                  title: 'Global Reach',
                  description: 'Breaking geographical barriers to connect believers with pastors from around the world, in their preferred language and time zone.',
                },
                {
                  icon: Church,
                  title: 'Church Partnership',
                  description: 'Partnering with churches and ministries to extend their counseling reach beyond physical walls to serve more souls.',
                },
                {
                  icon: HandHeart,
                  title: 'Healing & Hope',
                  description: 'Facilitating transformative encounters that bring spiritual healing, renewed faith, and lasting hope to those in need.',
                },
              ].map((item, index) => (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white" data-aos="fade-up" data-aos-delay={index * 100}>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-[#102a43] rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#102a43] mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dc2626]/10 rounded-full text-[#dc2626] text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              What We Stand For
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#102a43] mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These principles guide everything we do, from how we serve our users to how we support our pastors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#102a43] mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline / Journey */}
      <section className="py-24 bg-gradient-to-br from-[#f0f4f8] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#102a43]/10 rounded-full text-[#102a43] text-sm font-medium mb-6">
              <Clock className="w-4 h-4" />
              Our Journey
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#102a43] mb-4">
              The PastorCounsel Story
            </h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#dc2626] to-[#102a43] hidden md:block" />

            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  data-aos={isEven ? 'fade-right' : 'fade-left'}
                  data-aos-delay={index * 100}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <Card className="border-none shadow-lg inline-block">
                      <CardContent className="p-6">
                        <Badge className="bg-[#dc2626] text-white mb-3">{item.year}</Badge>
                        <h3 className="text-xl font-semibold text-[#102a43] mb-2">{item.title}</h3>
                        <p className="text-gray-600 max-w-sm">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center Icon */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#102a43] rounded-full items-center justify-center z-10">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-bold text-[#102a43] mb-4">
              Platform Features
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Built with care and purpose to facilitate meaningful spiritual connections.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-[#f0f4f8] rounded-2xl hover:bg-[#102a43] hover:text-white group transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className="w-12 h-12 bg-[#102a43] group-hover:bg-[#dc2626] rounded-xl flex items-center justify-center shrink-0 transition-colors">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#102a43] group-hover:text-white mb-1 transition-colors">{feature.title}</h3>
                    <p className="text-gray-600 group-hover:text-gray-300 text-sm transition-colors">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-br from-[#f0f4f8] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#dc2626]/10 rounded-full text-[#dc2626] text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Our Team
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#102a43] mb-4">
              Meet the People Behind PastorCounsel
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our dedicated team is passionate about connecting people with the spiritual guidance they need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-none shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102a43] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-semibold text-white text-lg">{member.name}</h3>
                    <p className="text-[#dc2626] text-sm">{member.role}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#102a43] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#dc2626] rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Stories of Transformation</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Real stories from people whose lives have been touched through our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-[#dc2626] mb-4" />
                  <p className="text-gray-200 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#dc2626] text-[#dc2626]" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6" data-aos="fade-up">
              Ready to Start Your Spiritual Journey?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Whether you're seeking guidance or called to provide it, PastorCounsel is here to help you take the next step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
              <Button
                size="lg"
                className="bg-white text-[#dc2626] hover:bg-gray-100 h-14 px-10 text-lg rounded-full shadow-xl"
                onClick={() => onNavigate('browse-pastors')}
              >
                Find a Pastor
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 h-14 px-10 text-lg rounded-full"
                onClick={() => onNavigate('register-pastor')}
              >
                <HandHeart className="mr-2 w-5 h-5" />
                Join as a Pastor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center" data-aos="fade-up">
              <div className="w-14 h-14 bg-[#dc2626]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[#dc2626]" />
              </div>
              <h3 className="font-semibold text-[#102a43] mb-1">Email Us</h3>
              <p className="text-gray-600">info@pastorcounsel.org</p>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-14 h-14 bg-[#dc2626]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-[#dc2626]" />
              </div>
              <h3 className="font-semibold text-[#102a43] mb-1">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-14 h-14 bg-[#dc2626]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-[#dc2626]" />
              </div>
              <h3 className="font-semibold text-[#102a43] mb-1">Visit Us</h3>
              <p className="text-gray-600">123 Ministry Way, Dallas, TX</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
