'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Star,
  MapPin,
  Clock,
  Calendar,
  Award,
  BookOpen,
  Globe,
  Heart,
  MessageSquare,
  Video,
  CheckCircle,
  ChevronLeft,
  Share2,
  Bookmark,
  Users,
  Sparkles,
  Shield,
  Cross,
  HandHeart,
  Home,
  Baby,
  Target,
  Brain,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { pastors, reviews, timeSlots, categories } from '@/data/dummy';
import { PageState } from '@/types';

interface PastorProfileProps {
  pastorId: string | null;
  onNavigate: (page: PageState) => void;
  onBookSession: (pastorId: string) => void;
}

// Category icons mapping
const categoryIcons: Record<string, React.ElementType> = {
  'Marriage Counseling': Heart,
  'Trauma & Healing': Shield,
  'Deliverance Ministry': Cross,
  'Prayer & Intercession': HandHeart,
  'Youth Counseling': Baby,
  'Family Counseling': Home,
  'Grief & Loss': Sparkles,
  'Addiction Recovery': Activity,
  'Pre-marital Counseling': Heart,
  'Spiritual Direction': Target,
  'Mental Wellness': Brain,
  'Life Coaching': Target,
};

// Category colors mapping
const categoryColors: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  'Marriage Counseling': { 
    bg: 'bg-pink-100', 
    text: 'text-pink-700', 
    border: 'border-pink-200',
    gradient: 'from-pink-500 to-rose-500' 
  },
  'Trauma & Healing': { 
    bg: 'bg-purple-100', 
    text: 'text-purple-700', 
    border: 'border-purple-200',
    gradient: 'from-purple-500 to-violet-500' 
  },
  'Deliverance Ministry': { 
    bg: 'bg-red-100', 
    text: 'text-red-700', 
    border: 'border-red-200',
    gradient: 'from-red-500 to-orange-500' 
  },
  'Prayer & Intercession': { 
    bg: 'bg-amber-100', 
    text: 'text-amber-700', 
    border: 'border-amber-200',
    gradient: 'from-amber-500 to-yellow-500' 
  },
  'Youth Counseling': { 
    bg: 'bg-cyan-100', 
    text: 'text-cyan-700', 
    border: 'border-cyan-200',
    gradient: 'from-cyan-500 to-teal-500' 
  },
  'Family Counseling': { 
    bg: 'bg-green-100', 
    text: 'text-green-700', 
    border: 'border-green-200',
    gradient: 'from-green-500 to-emerald-500' 
  },
  'Grief & Loss': { 
    bg: 'bg-slate-100', 
    text: 'text-slate-700', 
    border: 'border-slate-200',
    gradient: 'from-slate-500 to-gray-500' 
  },
  'Addiction Recovery': { 
    bg: 'bg-orange-100', 
    text: 'text-orange-700', 
    border: 'border-orange-200',
    gradient: 'from-orange-500 to-red-500' 
  },
};

// Generate mock session counts for categories
const getSessionCountForCategory = (category: string, totalSessions: number) => {
  const basePercentage: Record<string, number> = {
    'Marriage Counseling': 0.35,
    'Trauma & Healing': 0.25,
    'Deliverance Ministry': 0.15,
    'Prayer & Intercession': 0.30,
    'Youth Counseling': 0.20,
    'Family Counseling': 0.28,
    'Grief & Loss': 0.18,
    'Addiction Recovery': 0.12,
  };
  return Math.floor(totalSessions * (basePercentage[category] || 0.15));
};

// Generate mock expertise level
const getExpertiseLevel = (sessions: number): { level: string; percentage: number } => {
  if (sessions > 150) return { level: 'Expert', percentage: 95 };
  if (sessions > 100) return { level: 'Advanced', percentage: 80 };
  if (sessions > 50) return { level: 'Proficient', percentage: 65 };
  if (sessions > 20) return { level: 'Intermediate', percentage: 45 };
  return { level: 'Developing', percentage: 25 };
};

// Category icon component
function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const Icon = categoryIcons[category] || Heart;
  return <Icon className={className} />;
}

export function PastorProfile({ pastorId, onNavigate, onBookSession }: PastorProfileProps) {
  const [selectedDate, setSelectedDate] = useState<string>('2024-12-20');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const pastor = pastors.find((p) => p.id === pastorId) || pastors[0];
  const pastorReviews = reviews.filter((r) => r.pastorId === pastor.id);

  const availableSlots = timeSlots.filter(
    (slot) => slot.pastorId === pastor.id && !slot.isBooked
  );

  // Get detailed category info for pastor's specialties
  const pastorCategories = pastor.specialties.map((specialty) => {
    const categoryData = categories.find((c) => c.name === specialty);
    const sessionCount = getSessionCountForCategory(specialty, pastor.sessionCount);
    const expertise = getExpertiseLevel(sessionCount);
    const colors = categoryColors[specialty] || { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', gradient: 'from-gray-500 to-gray-600' };
    const Icon = categoryIcons[specialty] || Heart;
    
    return {
      name: specialty,
      description: categoryData?.description || `Specialized guidance in ${specialty}`,
      sessionCount,
      expertise,
      colors,
      Icon,
    };
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-[#dc2626] text-[#dc2626]' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-8 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('browse-pastors')}
          className="flex items-center gap-2 text-gray-600 hover:text-[#102a43] mb-6"
          data-aos="fade-right"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Browse
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card className="border-none shadow-lg overflow-hidden" data-aos="fade-up">
              <div className="h-48 bg-gradient-to-br from-[#102a43] to-[#243b53] relative">
                <img
                  src={pastor.avatar}
                  alt={pastor.name}
                  className="w-full h-full object-cover opacity-50"
                />
                {/* Specialties floating badges */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {pastor.specialties.slice(0, 3).map((specialty, index) => {
                    const colors = categoryColors[specialty];
                    return (
                      <Badge
                        key={index}
                        className={`${colors?.bg || 'bg-white/90'} ${colors?.text || 'text-[#102a43]'} backdrop-blur-sm`}
                      >
                        {specialty}
                      </Badge>
                    );
                  })}
                  {pastor.specialties.length > 3 && (
                    <Badge className="bg-white/80 text-[#102a43] backdrop-blur-sm">
                      +{pastor.specialties.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-6 -mt-20 relative">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={pastor.avatar}
                    alt={pastor.name}
                    className="w-32 h-32 rounded-xl border-4 border-white shadow-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold text-[#102a43]">{pastor.name}</h1>
                      {pastor.isVerified && (
                        <Badge className="bg-green-500">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {pastor.isAvailable && (
                        <Badge variant="outline" className="border-green-500 text-green-600">
                          Available Now
                        </Badge>
                      )}
                    </div>
                    {pastor.ministryName && (
                      <p className="text-gray-600 mb-2">{pastor.ministryName}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {pastor.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#dc2626] text-[#dc2626]" />
                        {pastor.rating} ({pastor.reviewCount} reviews)
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {pastor.sessionCount} sessions
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:self-start">
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specializations Section - Featured */}
            <Card className="border-none shadow-lg overflow-hidden" data-aos="fade-up">
              <div className="bg-gradient-to-r from-[#102a43] to-[#243b53] p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#dc2626] rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Areas of Specialization</h2>
                    <p className="text-gray-300 text-sm">Expert guidance in {pastor.specialties.length} counseling categories</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {pastorCategories.map((category, index) => {
                    const Icon = category.Icon;
                    const isSelected = selectedCategory === category.name;
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedCategory(isSelected ? null : category.name)}
                        className={`relative overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                          isSelected 
                            ? `${category.colors.border} shadow-lg` 
                            : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                        }`}
                        data-aos="fade-up"
                        data-aos-delay={index * 50}
                      >
                        {/* Gradient accent */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.colors.gradient}`} />
                        
                        <div className="p-5">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 ${category.colors.bg} rounded-xl flex items-center justify-center shrink-0`}>
                              <Icon className={`w-6 h-6 ${category.colors.text}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-[#102a43] mb-1">{category.name}</h3>
                              <p className="text-gray-500 text-sm line-clamp-2">{category.description}</p>
                            </div>
                          </div>
                          
                          {/* Stats row */}
                          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{category.sessionCount} sessions</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-gray-400" />
                              <Badge variant="outline" className={`text-xs ${category.colors.border} ${category.colors.text}`}>
                                {category.expertise.level}
                              </Badge>
                            </div>
                          </div>
                          
                          {/* Expertise progress */}
                          <div className="mt-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-500">Expertise Level</span>
                              <span className="text-xs font-medium text-[#102a43]">{category.expertise.percentage}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${category.colors.gradient} rounded-full transition-all duration-500`}
                                style={{ width: `${category.expertise.percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Book for specific category */}
                {selectedCategory && (
                  <div className="mt-6 p-4 bg-[#f0f4f8] rounded-xl animate-pulse" data-aos="fade-up">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${categoryColors[selectedCategory]?.bg || 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                          <CategoryIcon 
                            category={selectedCategory} 
                            className={`w-5 h-5 ${categoryColors[selectedCategory]?.text || 'text-gray-600'}`} 
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-[#102a43]">Book for {selectedCategory}</p>
                          <p className="text-sm text-gray-500">Get specialized guidance in this area</p>
                        </div>
                      </div>
                      <Button
                        className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                        onClick={() => onBookSession(pastor.id)}
                      >
                        Book Session
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full" data-aos="fade-up">
              <TabsList className="grid w-full grid-cols-4 bg-[#f0f4f8]">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="credentials">Credentials</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card className="border-none shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-[#102a43] mb-4">About</h3>
                    <p className="text-gray-600 mb-6">{pastor.bio}</p>

                    <Separator className="my-6" />

                    {/* Session Types */}
                    <h4 className="font-semibold text-[#102a43] mb-4">Session Types Offered</h4>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#f0f4f8] to-white rounded-xl border border-gray-100">
                        <div className="w-12 h-12 bg-[#dc2626]/10 rounded-xl flex items-center justify-center">
                          <Video className="w-6 h-6 text-[#dc2626]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#102a43]">Video Counseling</p>
                          <p className="text-sm text-gray-500">Face-to-face sessions online</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#f0f4f8] to-white rounded-xl border border-gray-100">
                        <div className="w-12 h-12 bg-[#102a43]/10 rounded-xl flex items-center justify-center">
                          <MessageSquare className="w-6 h-6 text-[#102a43]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#102a43]">Chat Support</p>
                          <p className="text-sm text-gray-500">Text-based counseling</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Languages */}
                    <h4 className="font-semibold text-[#102a43] mb-3">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {pastor.languages.map((lang, index) => (
                        <Badge key={index} variant="outline" className="border-[#102a43] text-[#102a43] py-1 px-3">
                          <Globe className="w-3 h-3 mr-2" />
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card className="border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-[#102a43]">
                        Reviews ({pastor.reviewCount})
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(Math.round(pastor.rating))}</div>
                        <span className="font-semibold">{pastor.rating}</span>
                      </div>
                    </div>

                    {/* Rating breakdown */}
                    <div className="mb-6 p-4 bg-[#f0f4f8] rounded-xl">
                      <div className="grid grid-cols-5 gap-2 text-center text-sm">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex flex-col items-center gap-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-[#dc2626] text-[#dc2626]" />
                              <span className="text-xs text-gray-600">{star}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#dc2626] rounded-full"
                                style={{ width: `${star === 5 ? 85 : star === 4 ? 10 : star === 3 ? 3 : star === 2 ? 1 : 1}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      {pastorReviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-0">
                          <div className="flex items-center gap-3 mb-2">
                            <img
                              src={review.user?.avatar || 'https://ui-avatars.com/api/?name=User'}
                              alt={review.user?.name || 'User'}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-medium text-[#102a43]">{review.user?.name || 'Anonymous'}</p>
                              <div className="flex items-center gap-1">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="credentials" className="mt-6">
                <Card className="border-none shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-[#102a43] mb-6">
                      Credentials & Experience
                    </h3>

                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#dc2626]/10 rounded-lg flex items-center justify-center shrink-0">
                          <Award className="w-6 h-6 text-[#dc2626]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#102a43]">Education</h4>
                          <p className="text-gray-600">{pastor.education}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#dc2626]/10 rounded-lg flex items-center justify-center shrink-0">
                          <Clock className="w-6 h-6 text-[#dc2626]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#102a43]">Experience</h4>
                          <p className="text-gray-600">{pastor.yearsOfExperience} years in ministry</p>
                        </div>
                      </div>

                      {pastor.certifications && (
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-[#dc2626]/10 rounded-lg flex items-center justify-center shrink-0">
                            <BookOpen className="w-6 h-6 text-[#dc2626]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#102a43] mb-2">Certifications</h4>
                            <div className="flex flex-wrap gap-2">
                              {pastor.certifications.map((cert, index) => (
                                <Badge key={index} variant="outline" className="border-[#102a43]">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="mt-6">
                <Card className="border-none shadow-md">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-[#102a43] mb-4">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-[#102a43]">How long are the sessions?</h4>
                        <p className="text-gray-600 text-sm">Sessions are typically 45-60 minutes depending on your needs.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#102a43]">What should I prepare before a session?</h4>
                        <p className="text-gray-600 text-sm">Come with an open heart and any specific questions or concerns you'd like to discuss.</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#102a43]">Can I reschedule or cancel?</h4>
                        <p className="text-gray-600 text-sm">Yes, you can reschedule or cancel up to 24 hours before your session without any charge.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Booking */}
          <div className="space-y-6">
            <Card className="border-none shadow-lg sticky top-24" data-aos="fade-left">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <p className="text-gray-500 text-sm">Session Rate</p>
                  <p className="text-3xl font-bold text-[#102a43]">
                    ${pastor.hourlyRate}
                    <span className="text-base font-normal text-gray-500">/hour</span>
                  </p>
                </div>

                <Separator className="my-4" />

                <h4 className="font-semibold text-[#102a43] mb-3">Select a Date</h4>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {['2024-12-20', '2024-12-21', '2024-12-22'].map((date) => (
                    <Button
                      key={date}
                      variant={selectedDate === date ? 'default' : 'outline'}
                      className={selectedDate === date ? 'bg-[#102a43]' : 'border-[#102a43]'}
                      onClick={() => setSelectedDate(date)}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs">
                          {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="font-semibold">
                          {new Date(date).getDate()}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>

                <h4 className="font-semibold text-[#102a43] mb-3">Available Time Slots</h4>
                <div className="grid grid-cols-2 gap-2 mb-6 max-h-48 overflow-y-auto">
                  {availableSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant="outline"
                      className="border-[#102a43] text-[#102a43] hover:bg-[#102a43] hover:text-white"
                    >
                      {slot.startTime} - {slot.endTime}
                    </Button>
                  ))}
                </div>

                <Button
                  className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white h-12"
                  onClick={() => onBookSession(pastor.id)}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Session
                </Button>

                <Button
                  variant="outline"
                  className="w-full mt-3 border-[#102a43] text-[#102a43]"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-none shadow-md" data-aos="fade-left" data-aos-delay="100">
              <CardContent className="p-6">
                <h4 className="font-semibold text-[#102a43] mb-4">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Sessions</span>
                    <span className="font-semibold">{pastor.sessionCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Years Experience</span>
                    <span className="font-semibold">{pastor.yearsOfExperience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-semibold">&lt; 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
