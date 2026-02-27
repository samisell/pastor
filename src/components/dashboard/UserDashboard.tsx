'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StatsCard } from './StatsCard';
import { sessions, pastors, categories } from '@/data/dummy';
import VideoConference from '@/components/video/VideoConference';
import AudioCall from '@/components/video/AudioCall';
import CallOverlay from '@/components/video/CallOverlay';
import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Settings,
  Bell,
  Edit3,
  Save,
  Plus,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Heart,
  UserCheck,
  FileText,
  PieChart,
  Zap,
  RefreshCw,
  Send,
  Paperclip,
  Smile,
  CreditCard,
  Shield,
  Key,
  Smartphone,
  LogOut,
  User,
  Bookmark,
  Activity,
  Clock4,
  AlertTriangle,
  Download,
  CalendarCheck,
  Phone,
  PhoneOff,
} from 'lucide-react';
import { DashboardTab, User as UserType, Session, Pastor, PageState } from '@/types';

interface UserDashboardProps {
  user: UserType;
  onTabChange: (tab: DashboardTab) => void;
  onNavigate: (page: PageState) => void;
}

// Mock data
const savedPastors = pastors.slice(0, 4);
const userBookings = [
  { id: '1', pastor: pastors[0], date: 'Jan 20, 2024', time: '10:00 AM', status: 'confirmed', category: 'Marriage Counseling' },
  { id: '2', pastor: pastors[1], date: 'Jan 22, 2024', time: '2:00 PM', status: 'pending', category: 'Personal Guidance' },
  { id: '3', pastor: pastors[2], date: 'Jan 25, 2024', time: '11:00 AM', status: 'confirmed', category: 'Grief Support' },
];

const userMessages = [
  {
    id: '1',
    pastor: { name: 'Pastor John Williams', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    preview: 'Looking forward to our session tomorrow. Please prepare any questions...',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: '2',
    pastor: { name: 'Pastor Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face' },
    preview: 'Thank you for sharing your concerns. I believe we can work through this...',
    time: '3 hours ago',
    unread: true,
  },
];

export function UserDashboard({ user, onTabChange, onNavigate }: UserDashboardProps) {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const upcomingSessions = sessions.filter(
    (s) => s.userId === 'u1' && (s.status === 'scheduled' || s.status === 'in-progress')
  );
  const completedSessions = sessions.filter(
    (s) => s.userId === 'u1' && s.status === 'completed'
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'browse', label: 'Find Pastors', icon: Search },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'sessions', label: 'Sessions', icon: Video },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection user={user} upcomingSessions={upcomingSessions} onNavigate={onNavigate} setActiveSection={setActiveSection} />;
      case 'browse':
        return <BrowsePastorsSection onNavigate={onNavigate} />;
      case 'saved':
        return <SavedPastorsSection onNavigate={onNavigate} />;
      case 'bookings':
        return <BookingsSection onNavigate={onNavigate} />;
      case 'sessions':
        return <SessionsHistorySection sessions={completedSessions} />;
      case 'messages':
        return <MessagesSection />;
      case 'profile':
        return <ProfileSection user={user} />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <OverviewSection user={user} upcomingSessions={upcomingSessions} onNavigate={onNavigate} setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl shadow-sm overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <Button
              key={tab.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`${isActive ? 'bg-[#dc2626] text-white' : 'text-gray-600 hover:bg-[#f0f4f8]'}`}
              onClick={() => setActiveSection(tab.id)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
              {tab.id === 'messages' && (
                <Badge className="ml-2 bg-[#102a43] text-white text-xs px-1.5 py-0.5">2</Badge>
              )}
            </Button>
          );
        })}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
}

// Overview Section
function OverviewSection({
  user,
  upcomingSessions,
  onNavigate,
  setActiveSection,
}: {
  user: UserType;
  upcomingSessions: Session[];
  onNavigate: (page: PageState) => void;
  setActiveSection: (section: string) => void;
}) {
  return (
    <>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#102a43] via-[#243b53] to-[#102a43] rounded-2xl p-8 text-white relative overflow-hidden" data-aos="fade-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#dc2626] rounded-full blur-[100px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#dc2626] rounded-full blur-[80px] opacity-10" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-gray-300 mb-4">Continue your spiritual journey with guidance from our pastors.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white" onClick={() => onNavigate('browse-pastors')}>
                <Search className="w-4 h-4 mr-2" />
                Find a Pastor
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => setActiveSection('bookings')}>
                <Calendar className="w-4 h-4 mr-2" />
                My Bookings
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
                <Video className="w-8 h-8 text-[#dc2626]" />
              </div>
              <p className="text-2xl font-bold">{upcomingSessions.length}</p>
              <p className="text-sm text-gray-400">Upcoming</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-gray-400">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up" data-aos-delay="100">
        <StatsCard
          title="Total Sessions"
          value={8}
          icon={Video}
          iconColor="text-[#dc2626]"
          iconBgColor="bg-[#dc2626]/10"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Upcoming"
          value={upcomingSessions.length}
          icon={Calendar}
          iconColor="text-[#102a43]"
          iconBgColor="bg-[#102a43]/10"
        />
        <StatsCard
          title="Favorite Pastors"
          value={savedPastors.length}
          icon={Heart}
          iconColor="text-pink-500"
          iconBgColor="bg-pink-100"
        />
        <StatsCard
          title="Reviews Given"
          value={5}
          icon={Star}
          iconColor="text-yellow-500"
          iconBgColor="bg-yellow-100"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Session Highlight */}
          {upcomingSessions.length > 0 && (
            <Card className="border-none shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5" />
                  <span className="font-medium">Your Next Session</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{upcomingSessions[0].title}</h3>
                    <p className="text-red-100 mt-1">
                      {new Date(upcomingSessions[0].scheduledAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <Badge className="mt-2 bg-white/20 text-white">{upcomingSessions[0].category}</Badge>
                  </div>
                  <div className="flex gap-3">
                    <Button className="bg-white text-[#dc2626] hover:bg-gray-100" onClick={() => onNavigate('video-session')}>
                      <Video className="w-4 h-4 mr-2" />
                      Join Session
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      <Calendar className="w-4 h-4 mr-2" />
                      Reschedule
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Upcoming Sessions List */}
          <Card className="border-none shadow-md" data-aos="fade-up" data-aos-delay="300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[#102a43]">Upcoming Sessions</CardTitle>
              <Button variant="ghost" className="text-[#dc2626] hover:bg-[#dc2626]/10" onClick={() => setActiveSection('sessions')}>
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-3">
                  {upcomingSessions.slice(0, 3).map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-[#f0f4f8] to-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#102a43] to-[#243b53] rounded-xl flex items-center justify-center">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#102a43]">{session.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Clock4 className="w-3 h-3" />
                            <span>
                              {new Date(session.scheduledAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span>•</span>
                            <span>{session.duration} min</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-700">Scheduled</Badge>
                        <Button size="sm" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                          <Video className="w-4 h-4 mr-1" />
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[#f0f4f8] rounded-xl">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No upcoming sessions</p>
                  <Button className="bg-[#dc2626] hover:bg-[#b91c1c]" onClick={() => onNavigate('browse-pastors')}>
                    Book a Session
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommended Pastors */}
          <Card className="border-none shadow-md" data-aos="fade-up" data-aos-delay="400">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[#102a43]">Recommended for You</CardTitle>
              <Button variant="ghost" className="text-[#dc2626] hover:bg-[#dc2626]/10" onClick={() => setActiveSection('browse')}>
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {pastors.slice(0, 2).map((pastor) => (
                  <PastorCard key={pastor.id} pastor={pastor} onNavigate={onNavigate} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-none shadow-md overflow-hidden" data-aos="fade-left">
            <div className="bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white p-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Quick Actions
              </h3>
            </div>
            <CardContent className="p-4 space-y-2">
              <Button variant="outline" className="w-full justify-start border-gray-200 hover:border-[#dc2626]" onClick={() => onNavigate('browse-pastors')}>
                <Search className="w-4 h-4 mr-3 text-[#dc2626]" />
                Find Pastors
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-200 hover:border-[#dc2626]" onClick={() => setActiveSection('saved')}>
                <Bookmark className="w-4 h-4 mr-3 text-[#dc2626]" />
                Saved Pastors
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-200 hover:border-[#dc2626]" onClick={() => setActiveSection('messages')}>
                <MessageSquare className="w-4 h-4 mr-3 text-[#dc2626]" />
                Messages
                <Badge className="ml-auto bg-[#dc2626] text-white text-xs">2</Badge>
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-200 hover:border-[#dc2626]" onClick={() => setActiveSection('bookings')}>
                <Calendar className="w-4 h-4 mr-3 text-[#dc2626]" />
                My Bookings
              </Button>
            </CardContent>
          </Card>

          {/* Prayer Request */}
          <Card className="border-none shadow-md" data-aos="fade-left" data-aos-delay="100">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#102a43] text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#dc2626]" />
                Submit Prayer Request
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Share your prayer request with our community..."
                className="min-h-24 border-gray-200 focus:border-[#dc2626] resize-none"
              />
              <Button className="w-full mt-3 bg-[#102a43] hover:bg-[#243b53]">
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-none shadow-md" data-aos="fade-left" data-aos-delay="200">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#102a43] text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#102a43]">Session Completed</p>
                    <p className="text-xs text-gray-500">Marriage Counseling</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#dc2626]/10 rounded-full flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-[#dc2626]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#102a43]">Booking Confirmed</p>
                    <p className="text-xs text-gray-500">Personal Guidance</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="border-none shadow-md" data-aos="fade-left" data-aos-delay="300">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#102a43] text-lg">Browse Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 6).map((category) => (
                  <Badge
                    key={category.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-[#dc2626]/10 hover:border-[#dc2626] hover:text-[#dc2626] transition-colors"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

// Pastor Card Component
function PastorCard({ pastor, onNavigate }: { pastor: Pastor; onNavigate: (page: PageState) => void }) {
  return (
    <div className="p-4 bg-[#f0f4f8] rounded-xl hover:shadow-md transition-all group cursor-pointer">
      <div className="flex items-start gap-3">
        <img
          src={pastor.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'}
          alt={pastor.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-[#102a43] truncate group-hover:text-[#dc2626] transition-colors">{pastor.name}</h4>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{pastor.rating}</span>
            <span className="text-xs text-gray-400">({pastor.reviewCount})</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {pastor.specialties.slice(0, 2).map((specialty, i) => (
              <Badge key={i} variant="outline" className="text-xs border-gray-200 text-gray-600">{specialty}</Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
        <span className="text-sm font-medium text-[#102a43]">${pastor.hourlyRate || 75}/session</span>
        <Button size="sm" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white" onClick={() => onNavigate('pastor-profile')}>
          Book Now
        </Button>
      </div>
    </div>
  );
}

// Browse Pastors Section
function BrowsePastorsSection({ onNavigate }: { onNavigate: (page: PageState) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search pastors by name, specialty, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-[#dc2626]"
            />
          </div>
          <Button variant="outline" className="h-12 border-gray-200">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge
            className={`cursor-pointer ${!selectedCategory ? 'bg-[#dc2626] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category.id}
              className={`cursor-pointer ${selectedCategory === category.name ? 'bg-[#dc2626] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastors.map((pastor) => (
          <Card key={pastor.id} className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden group">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={pastor.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=200&fit=crop'}
                  alt={pastor.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white rounded-full">
                    <Bookmark className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <Badge className="bg-white/90 text-[#102a43]">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {pastor.rating}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#102a43] text-lg">{pastor.name}</h3>
                <p className="text-sm text-gray-500">{pastor.ministryName}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{pastor.location}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {pastor.specialties.slice(0, 3).map((specialty, i) => (
                    <Badge key={i} variant="outline" className="text-xs border-gray-200">{specialty}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-lg font-bold text-[#102a43]">${pastor.hourlyRate || 75}</span>
                    <span className="text-sm text-gray-500">/session</span>
                  </div>
                  <Button size="sm" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white" onClick={() => onNavigate('pastor-profile')}>
                    Book Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="icon" className="border-gray-200"><ChevronLeft className="w-4 h-4" /></Button>
        {[1, 2, 3].map((page) => (
          <Button key={page} variant={page === 1 ? 'default' : 'outline'} className={page === 1 ? 'bg-[#dc2626]' : 'border-gray-200'}>
            {page}
          </Button>
        ))}
        <Button variant="outline" size="icon" className="border-gray-200"><ChevronRight className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}

// Saved Pastors Section
function SavedPastorsSection({ onNavigate }: { onNavigate: (page: PageState) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#102a43]">Saved Pastors</h2>
          <p className="text-gray-500">Pastors you&apos;ve bookmarked for quick access</p>
        </div>
        <Button variant="outline" className="border-gray-200" onClick={() => onNavigate('browse-pastors')}>
          <Plus className="w-4 h-4 mr-2" />
          Find More Pastors
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {savedPastors.map((pastor) => (
          <Card key={pastor.id} className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <img
                  src={pastor.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face'}
                  alt={pastor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[#102a43] text-lg">{pastor.name}</h3>
                      <p className="text-sm text-gray-500">{pastor.ministryName}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-[#dc2626]">
                      <Bookmark className="w-5 h-5 fill-current" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{pastor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      {pastor.location}
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-[#102a43]">${pastor.hourlyRate || 75}</span>
                  <span className="text-gray-500">/session</span>
                </div>
                <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white" onClick={() => onNavigate('pastor-profile')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Session
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Bookings Section
function BookingsSection({ onNavigate }: { onNavigate: (page: PageState) => void }) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#102a43]">My Bookings</h2>
          <p className="text-gray-500">Manage your session bookings</p>
        </div>
        <Button className="bg-[#dc2626] hover:bg-[#b91c1c]" onClick={() => onNavigate('browse-pastors')}>
          <Plus className="w-4 h-4 mr-2" />
          Book New Session
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            className={filter === f ? 'bg-[#102a43]' : 'border-gray-200'}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {userBookings.map((booking) => (
          <Card key={booking.id} className="border-none shadow-md overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={booking.pastor.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'}
                      alt={booking.pastor.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-[#102a43] text-lg">{booking.category}</h3>
                      <p className="text-gray-500">with {booking.pastor.name}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {booking.date}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock4 className="w-4 h-4" />
                          {booking.time}
                        </div>
                        <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col items-center justify-center gap-2 p-4 bg-[#f0f4f8] border-t md:border-t-0 md:border-l border-gray-200">
                  <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                    <Video className="w-4 h-4 mr-2" />
                    Join Session
                  </Button>
                  <Button variant="outline" className="border-[#102a43] text-[#102a43]">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reschedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Sessions History Section
function SessionsHistorySection({ sessions }: { sessions: Session[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#102a43]">Session History</h2>
          <p className="text-gray-500">Your past counseling sessions</p>
        </div>
        <Button variant="outline" className="border-gray-200">
          <Download className="w-4 h-4 mr-2" />
          Export History
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sessions.map((session) => (
          <Card key={session.id} className="border-none shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              </div>
              <h3 className="font-semibold text-[#102a43] text-lg mb-2">{session.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(session.scheduledAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock4 className="w-4 h-4" />
                  {session.duration} min
                </div>
              </div>
              <Badge variant="outline" className="border-gray-200">{session.category}</Badge>
              <Separator className="my-4" />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-[#102a43] text-[#102a43]">
                  <FileText className="w-4 h-4 mr-2" />
                  View Notes
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-[#dc2626] text-[#dc2626]">
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  Book Again
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Messages Section
function MessagesSection() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const [isInAudioCall, setIsInAudioCall] = useState(false);
  const [isCallMinimized, setIsCallMinimized] = useState(false);
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [callType, setCallType] = useState<'video' | 'audio'>('video');
  const [newMessage, setNewMessage] = useState('');

  const selectedConversation = userMessages.find((m) => m.id === selectedMessage);

  const startVideoCall = () => {
    setCallType('video');
    setIsInVideoCall(true);
    setIsCallMinimized(false);
  };

  const startAudioCall = () => {
    setCallType('audio');
    setIsInAudioCall(true);
    setIsCallMinimized(false);
  };

  const endCall = () => {
    setIsInVideoCall(false);
    setIsInAudioCall(false);
    setIsCallMinimized(false);
  };

  const minimizeCall = () => {
    setIsCallMinimized(true);
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 min-h-[500px]">
        {/* Message List */}
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#102a43] to-[#243b53] text-white p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Messages</CardTitle>
              <Badge className="bg-[#dc2626]">2 New</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {userMessages.map((message) => (
                <button
                  key={message.id}
                  className={`w-full p-4 text-left hover:bg-[#f0f4f8] transition-colors ${selectedMessage === message.id ? 'bg-[#f0f4f8]' : ''}`}
                  onClick={() => setSelectedMessage(message.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={message.pastor.avatar} alt={message.pastor.name} className="w-12 h-12 rounded-full object-cover" />
                      {message.unread && <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#dc2626] rounded-full border-2 border-white" />}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-[#102a43] truncate">{message.pastor.name}</h4>
                        <span className="text-xs text-gray-400">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Detail */}
        <Card className="md:col-span-2 border-none shadow-md overflow-hidden flex flex-col">
          {selectedMessage ? (
            <>
              <CardHeader className="bg-white border-b p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedConversation?.pastor.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-[#102a43]">
                      {selectedConversation?.pastor.name}
                    </h4>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Available
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Audio Call Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#102a43] text-[#102a43] hover:bg-[#102a43] hover:text-white"
                      onClick={startAudioCall}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Audio
                    </Button>
                    {/* Video Call Button */}
                    <Button
                      size="sm"
                      className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                      onClick={startVideoCall}
                    >
                      <Video className="w-4 h-4 mr-1" />
                      Video
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#102a43] text-[#102a43]">
                      <Calendar className="w-4 h-4 mr-1" />
                      Book
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-4 bg-[#f0f4f8]">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm max-w-[70%]">
                      <p className="text-gray-600 text-sm">Hello! I wanted to follow up on our last session. How are you feeling?</p>
                      <span className="text-xs text-gray-400 mt-1 block">10:30 AM</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#dc2626] text-white p-3 rounded-2xl rounded-br-md shadow-sm max-w-[70%]">
                      <p className="text-sm">Thank you for checking in! I&apos;ve been practicing the techniques we discussed.</p>
                      <span className="text-xs text-red-200 mt-1 block">10:35 AM</span>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm max-w-[70%]">
                      <p className="text-gray-600 text-sm">That&apos;s wonderful to hear! Keep up the good work. Would you like to schedule another session this week?</p>
                      <span className="text-xs text-gray-400 mt-1 block">10:40 AM</span>
                    </div>
                  </div>
                  {/* Call invitation message */}
                  <div className="flex justify-center">
                    <div className="bg-[#dc2626]/10 px-4 py-2 rounded-full flex items-center gap-2">
                      <Video className="w-4 h-4 text-[#dc2626]" />
                      <span className="text-sm text-[#dc2626]">Pastor started a video call • Missed</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="p-4 border-t bg-white">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#102a43]">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Input 
                    placeholder="Type a message..." 
                    className="flex-1 border-gray-200 focus:border-[#dc2626]"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#102a43]">
                    <Smile className="w-5 h-5" />
                  </Button>
                  <Button className="bg-[#dc2626] hover:bg-[#b91c1c]">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a conversation to view messages</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Video Call Modal */}
      <AnimatePresence>
        {isInVideoCall && !isCallMinimized && (
          <VideoConference
            recipient={{
              id: selectedConversation?.id || '1',
              name: selectedConversation?.pastor.name || 'Pastor',
              avatar: selectedConversation?.pastor.avatar,
              role: 'pastor'
            }}
            onEndCall={endCall}
            onMinimize={minimizeCall}
          />
        )}
      </AnimatePresence>

      {/* Audio Call Modal */}
      <AnimatePresence>
        {isInAudioCall && !isCallMinimized && (
          <AudioCall
            recipient={{
              id: selectedConversation?.id || '1',
              name: selectedConversation?.pastor.name || 'Pastor',
              avatar: selectedConversation?.pastor.avatar,
              role: 'pastor'
            }}
            onEndCall={endCall}
            onMinimize={minimizeCall}
          />
        )}
      </AnimatePresence>

      {/* Minimized Call */}
      {(isInVideoCall || isInAudioCall) && isCallMinimized && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-[#102a43] rounded-2xl shadow-2xl p-4 flex items-center gap-4 z-50"
        >
          <div className="relative">
            <img
              src={selectedConversation?.pastor.avatar}
              alt=""
              className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#102a43]" />
          </div>
          <div>
            <p className="text-white font-semibold">{selectedConversation?.pastor.name}</p>
            <p className="text-green-400 text-sm flex items-center gap-1">
              {isInVideoCall ? <Video size={12} /> : <Phone size={12} className="rotate-45" />}
              {isInVideoCall ? 'Video Call' : 'Audio Call'} in progress
            </p>
          </div>
          <div className="flex gap-2 ml-4">
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setIsCallMinimized(false)}
            >
              <Video className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={endCall}
            >
              <PhoneOff className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Incoming Call Overlay */}
      <AnimatePresence>
        {showIncomingCall && (
          <CallOverlay
            type="incoming"
            callType={callType}
            recipient={{
              id: selectedConversation?.id || '1',
              name: selectedConversation?.pastor.name || 'Pastor',
              avatar: selectedConversation?.pastor.avatar,
              role: 'pastor'
            }}
            onAccept={() => {
              setShowIncomingCall(false);
              if (callType === 'video') {
                setIsInVideoCall(true);
              } else {
                setIsInAudioCall(true);
              }
            }}
            onDecline={() => setShowIncomingCall(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Profile Section
function ProfileSection({ user }: { user: UserType }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#102a43]">My Profile</h2>
        <p className="text-gray-500">Manage your personal information</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-[#102a43] to-[#243b53]" />
          <CardContent className="pt-0 relative text-center">
            <div className="flex flex-col items-center -mt-12">
              <div className="w-24 h-24 bg-[#f0f4f8] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-[#102a43] mt-4">{user.name}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <Badge className="mt-2 bg-green-100 text-green-700">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified Account
              </Badge>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#102a43]">8</p>
                <p className="text-xs text-gray-500">Sessions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#102a43]">5</p>
                <p className="text-xs text-gray-500">Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        <div className="md:col-span-2">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-[#102a43]">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#102a43]">Full Name</Label>
                  <Input defaultValue={user.name} className="border-gray-200 focus:border-[#dc2626]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#102a43]">Email Address</Label>
                  <Input defaultValue={user.email} type="email" className="border-gray-200 focus:border-[#dc2626]" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#102a43]">Bio (Optional)</Label>
                <Textarea placeholder="Tell us a bit about yourself..." className="min-h-24 border-gray-200 focus:border-[#dc2626] resize-none" />
              </div>
              <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Settings Section
function SettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#102a43]">Settings</h2>
        <p className="text-gray-500">Manage your account preferences</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-[#102a43] flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Email notifications', description: 'Receive booking confirmations', enabled: true },
              { label: 'SMS reminders', description: 'Get reminders before sessions', enabled: true },
              { label: 'Marketing emails', description: 'Updates about new features', enabled: false },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#f0f4f8] rounded-lg">
                <div>
                  <p className="font-medium text-[#102a43]">{setting.label}</p>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
                <button className={`w-12 h-6 rounded-full transition-colors ${setting.enabled ? 'bg-[#dc2626]' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-[#102a43] flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start border-gray-200 text-[#102a43]">
              <Key className="w-4 h-4 mr-3" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start border-gray-200 text-[#102a43]">
              <Smartphone className="w-4 h-4 mr-3" />
              Enable Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start border-gray-200 text-[#102a43]">
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out of All Devices
            </Button>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-[#102a43] flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-[#f0f4f8] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="font-medium text-[#102a43]">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/25</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full border-gray-200 text-[#102a43]">
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-[#102a43]">Delete Account</p>
                <p className="text-sm text-gray-500">Permanently delete your account</p>
              </div>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
