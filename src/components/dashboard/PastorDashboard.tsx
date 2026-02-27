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
import { Progress } from '@/components/ui/progress';
import { StatsCard } from './StatsCard';
import { sessions, pastors, reviews, categories } from '@/data/dummy';
import VideoConference from '@/components/video/VideoConference';
import AudioCall from '@/components/video/AudioCall';
import CallOverlay, { CallNotification } from '@/components/video/CallOverlay';
import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  DollarSign,
  Users,
  Star,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  Bell,
  Edit3,
  Save,
  Plus,
  Minus,
  Eye,
  Trash2,
  Download,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Globe,
  Award,
  BookOpen,
  Heart,
  UserCheck,
  FileText,
  PieChart,
  BarChart3,
  Activity,
  Target,
  Zap,
  TrendingDown,
  RefreshCw,
  Send,
  Paperclip,
  Smile,
  CreditCard,
  Wallet,
  Receipt,
  Banknote,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  Shield,
  Lock,
  Key,
  Smartphone,
  LogOut,
  User,
  Briefcase,
  GraduationCap,
  Languages,
  Clock4,
  Camera,
  ChevronDown,
  X,
  AlertTriangle,
  CalendarCheck,
  CalendarX,
  VideoOff,
  MessageCircle,
  Bookmark,
  Share2,
  ThumbsUp,
  Play,
  Pause,
  RotateCcw,
  Upload,
  FileCheck,
  WalletCards,
  Building2,
  Landmark,
  Coins,
  TrendingUpIcon,
  PhoneOff,
  Mic,
  MicOff,
} from 'lucide-react';
import { DashboardTab, User as UserType, Session, Pastor } from '@/types';

interface PastorDashboardProps {
  user: UserType;
  onTabChange: (tab: DashboardTab) => void;
}

// Mock data
const weeklyEarnings = [
  { day: 'Mon', amount: 180, sessions: 3 },
  { day: 'Tue', amount: 220, sessions: 4 },
  { day: 'Wed', amount: 150, sessions: 2 },
  { day: 'Thu', amount: 300, sessions: 5 },
  { day: 'Fri', amount: 250, sessions: 4 },
  { day: 'Sat', amount: 180, sessions: 3 },
  { day: 'Sun', amount: 120, sessions: 2 },
];

const monthlyStats = {
  totalSessions: 47,
  totalEarnings: 4250,
  avgRating: 4.9,
  completionRate: 96,
  responseTime: '< 2 hours',
  repeatClients: 32,
};

const transactions = [
  { id: '1', date: 'Jan 15, 2024', client: 'Sarah Johnson', description: 'Marriage Counseling Session', amount: 75, status: 'completed', type: 'credit' },
  { id: '2', date: 'Jan 14, 2024', client: 'Michael Brown', description: 'Personal Guidance Session', amount: 75, status: 'completed', type: 'credit' },
  { id: '3', date: 'Jan 13, 2024', client: 'Emily Davis', description: 'Grief Support Session', amount: 60, status: 'completed', type: 'credit' },
  { id: '4', date: 'Jan 12, 2024', client: 'Robert Kim', description: 'Couples Therapy Session', amount: 90, status: 'pending', type: 'credit' },
  { id: '5', date: 'Jan 11, 2024', client: 'Lisa Martinez', description: 'Family Counseling Session', amount: 85, status: 'completed', type: 'credit' },
  { id: '6', date: 'Jan 10, 2024', description: 'Platform Service Fee', amount: -42.50, status: 'completed', type: 'debit' },
];

const messages = [
  {
    id: '1',
    user: { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face' },
    preview: 'Thank you for the wonderful session yesterday. The guidance you provided was exactly what we needed...',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: '2',
    user: { name: 'Michael Brown', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    preview: 'I wanted to follow up on our discussion about dealing with stress at work...',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: '3',
    user: { name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face' },
    preview: 'Can we reschedule our appointment to next week? Something came up...',
    time: '1 day ago',
    unread: false,
  },
  {
    id: '4',
    user: { name: 'Robert Kim', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face' },
    preview: 'The techniques you suggested are working great! I feel much more at peace...',
    time: '2 days ago',
    unread: false,
  },
];

const pastorCredentials = [
  { id: '1', type: 'education', title: 'Master of Divinity', institution: 'Dallas Theological Seminary', year: '2010', verified: true },
  { id: '2', type: 'certification', title: 'Licensed Clinical Pastoral Counselor', institution: 'AAPC', year: '2012', verified: true },
  { id: '3', type: 'certification', title: 'Certified Marriage Counselor', institution: 'AAMFT', year: '2015', verified: true },
  { id: '4', type: 'education', title: 'Doctor of Ministry', institution: 'Liberty University', year: '2018', verified: false },
];

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
];

export function PastorDashboard({ user, onTabChange }: PastorDashboardProps) {
  const pastor = pastors.find((p) => p.id === 'p1') || pastors[0];
  const upcomingSessions = sessions.filter(
    (s) => s.pastorId === 'p1' && (s.status === 'scheduled' || s.status === 'in-progress')
  );
  const completedSessions = sessions.filter(
    (s) => s.pastorId === 'p1' && s.status === 'completed'
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'sessions', label: 'Sessions', icon: Video },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const [activeSection, setActiveSection] = useState<string>('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection pastor={pastor} upcomingSessions={upcomingSessions} setActiveSection={setActiveSection} />;
      case 'profile':
        return <ProfileSection pastor={pastor} credentials={pastorCredentials} />;
      case 'availability':
        return <AvailabilitySection />;
      case 'appointments':
        return <AppointmentsSection upcomingSessions={upcomingSessions} completedSessions={completedSessions} />;
      case 'sessions':
        return <SessionsHistorySection sessions={completedSessions} />;
      case 'messages':
        return <MessagesSection messages={messages} />;
      case 'earnings':
        return <EarningsSection weeklyEarnings={weeklyEarnings} transactions={transactions} />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <OverviewSection pastor={pastor} upcomingSessions={upcomingSessions} setActiveSection={setActiveSection} />;
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
              className={`${isActive ? 'bg-[#102a43] text-white' : 'text-gray-600 hover:bg-[#f0f4f8]'}`}
              onClick={() => setActiveSection(tab.id)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
              {tab.badge && (
                <Badge className="ml-2 bg-[#dc2626] text-white text-xs px-1.5 py-0.5">{tab.badge}</Badge>
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

// ============================================
// OVERVIEW SECTION
// ============================================
function OverviewSection({
  pastor,
  upcomingSessions,
  setActiveSection,
}: {
  pastor: Pastor;
  upcomingSessions: Session[];
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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Pastor {pastor.name.split(' ').pop()}!</h1>
            <p className="text-gray-300 mb-4">Your spiritual guidance continues to make a difference.</p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm">Available for sessions</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Calendar className="w-4 h-4 text-[#dc2626]" />
                <span className="text-sm">{upcomingSessions.length} sessions today</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-3xl font-bold">{pastor.rating}</span>
              </div>
              <p className="text-sm text-gray-400">Rating</p>
            </div>
            <div className="w-px h-12 bg-gray-600" />
            <div className="text-center">
              <p className="text-3xl font-bold text-[#dc2626]">{pastor.sessionCount}</p>
              <p className="text-sm text-gray-400">Sessions</p>
            </div>
            <div className="w-px h-12 bg-gray-600" />
            <div className="text-center">
              <p className="text-3xl font-bold text-green-400">{monthlyStats.completionRate}%</p>
              <p className="text-sm text-gray-400">Completion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up" data-aos-delay="100">
        <StatsCard
          title="Total Sessions"
          value={pastor.sessionCount}
          icon={Video}
          iconColor="text-[#dc2626]"
          iconBgColor="bg-[#dc2626]/10"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Upcoming"
          value={upcomingSessions.length}
          icon={Calendar}
          iconColor="text-[#102a43]"
          iconBgColor="bg-[#102a43]/10"
        />
        <StatsCard
          title="This Month"
          value={`$${monthlyStats.totalEarnings.toLocaleString()}`}
          icon={DollarSign}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Reviews"
          value={pastor.reviewCount}
          icon={Star}
          iconColor="text-yellow-500"
          iconBgColor="bg-yellow-100"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule */}
          <Card className="border-none shadow-md" data-aos="fade-up" data-aos-delay="200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[#102a43]">Today&apos;s Schedule</CardTitle>
              <Button variant="ghost" className="text-[#dc2626] hover:bg-[#dc2626]/10" onClick={() => setActiveSection('appointments')}>
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-3">
                  {upcomingSessions.slice(0, 4).map((session, index) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-[#f0f4f8] to-white rounded-xl border border-gray-100 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#dc2626] to-[#b91c1c] rounded-xl flex items-center justify-center shadow-md">
                            <Clock className="w-6 h-6 text-white" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
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
                        <Badge variant="outline" className="border-[#dc2626]/20 text-[#dc2626]">
                          {session.category}
                        </Badge>
                        <Button size="sm" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                          <Video className="w-4 h-4 mr-1" />
                          Start
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-[#f0f4f8] rounded-xl">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No sessions scheduled for today</p>
                  <Button className="bg-[#102a43] hover:bg-[#243b53]" onClick={() => setActiveSection('availability')}>
                    Set Availability
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly Earnings Chart */}
          <Card className="border-none shadow-md" data-aos="fade-up" data-aos-delay="300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[#102a43]">Weekly Overview</CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#dc2626] rounded-full" />
                  <span className="text-sm text-gray-500">Earnings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#102a43] rounded-full" />
                  <span className="text-sm text-gray-500">Sessions</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4 h-48">
                {weeklyEarnings.map((item, index) => {
                  const maxAmount = Math.max(...weeklyEarnings.map((w) => w.amount));
                  const height = (item.amount / maxAmount) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative w-full flex justify-center h-40">
                        {/* Earnings Bar */}
                        <div
                          className="w-6 bg-gradient-to-t from-[#dc2626] to-[#f87171] rounded-t-lg transition-all hover:from-[#102a43] hover:to-[#243b53] cursor-pointer group absolute bottom-0"
                          style={{ height: `${height}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#102a43] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            ${item.amount}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{item.day}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card className="border-none shadow-md" data-aos="fade-up" data-aos-delay="400">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[#102a43]">Recent Reviews</CardTitle>
              <Badge className="bg-yellow-100 text-yellow-700">
                <Star className="w-3 h-3 mr-1 fill-yellow-500" />
                {pastor.rating} avg
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.slice(0, 3).map((review, index) => (
                  <div key={review.id} className="p-4 bg-[#f0f4f8] rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-[#102a43]">Client #{index + 1}</h4>
                          <span className="text-xs text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">&quot;{review.comment}&quot;</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-none shadow-md overflow-hidden" data-aos="fade-left">
            <div className="bg-gradient-to-r from-[#102a43] to-[#243b53] text-white p-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#dc2626]" />
                Quick Actions
              </h3>
            </div>
            <CardContent className="p-4 space-y-2">
              <Button variant="outline" className="w-full justify-start border-gray-200 hover:border-[#102a43]" onClick={() => setActiveSection('profile')}>
                <Edit3 className="w-4 h-4 mr-3 text-[#dc2626]" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-200 hover:border-[#102a43]" onClick={() => setActiveSection('availability')}>
                <Calendar className="w-4 h-4 mr-3 text-[#dc2626]" />
                Set Availability
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-200 hover:border-[#102a43]" onClick={() => setActiveSection('messages')}>
                <MessageSquare className="w-4 h-4 mr-3 text-[#dc2626]" />
                Messages
                <Badge className="ml-auto bg-[#dc2626] text-white text-xs">3</Badge>
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-200 hover:border-[#102a43]" onClick={() => setActiveSection('earnings')}>
                <DollarSign className="w-4 h-4 mr-3 text-[#dc2626]" />
                View Earnings
              </Button>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          <Card className="border-none shadow-md" data-aos="fade-left" data-aos-delay="100">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#102a43] text-lg">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Progress value={85} className="h-3" />
                <span className="absolute right-0 -top-6 text-sm font-medium text-[#102a43]">85%</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Profile Photo', done: true },
                  { label: 'Bio & Description', done: true },
                  { label: 'Availability Set', done: true },
                  { label: 'Payment Setup', done: false },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className={item.done ? 'text-gray-600' : 'text-gray-400'}>{item.label}</span>
                    {item.done ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-[#102a43] hover:bg-[#243b53]">
                Complete Profile
              </Button>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="border-none shadow-md" data-aos="fade-left" data-aos-delay="200">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#102a43] text-lg">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Session Completion', value: 96, color: 'bg-[#dc2626]' },
                { label: 'Response Time', value: 98, color: 'bg-[#102a43]' },
                { label: 'Client Satisfaction', value: 92, color: 'bg-green-500' },
              ].map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{metric.label}</span>
                    <span className="font-medium text-[#102a43]">{metric.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`${metric.color} h-2 rounded-full transition-all`} style={{ width: `${metric.value}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Specializations */}
          <Card className="border-none shadow-md" data-aos="fade-left" data-aos-delay="300">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#102a43] text-lg">Specializations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {pastor.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-[#dc2626]/20 text-[#102a43] hover:bg-[#dc2626]/10"
                  >
                    {specialty}
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

// ============================================
// PROFILE SECTION
// ============================================
function ProfileSection({
  pastor,
  credentials,
}: {
  pastor: Pastor;
  credentials: typeof pastorCredentials;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    bio: pastor.bio,
    hourlyRate: pastor.hourlyRate?.toString() || '75',
    location: pastor.location || 'Dallas, TX',
    languages: pastor.languages.join(', '),
    specialties: pastor.specialties.join(', '),
    ministryName: pastor.ministryName || '',
    phone: '+1 (555) 123-4567',
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#102a43]">My Profile</h2>
          <p className="text-gray-500">Manage your professional profile and credentials</p>
        </div>
        <Button
          variant={isEditing ? 'default' : 'outline'}
          className={isEditing ? 'bg-[#dc2626] hover:bg-[#b91c1c]' : 'border-[#102a43] text-[#102a43]'}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-[#102a43] to-[#243b53] relative">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 right-10 w-32 h-32 bg-[#dc2626] rounded-full blur-[60px] opacity-30" />
            </div>
          </div>
          <CardContent className="pt-0 relative">
            <div className="flex flex-col items-center -mt-16 relative z-10">
              <div className="relative">
                <img
                  src={pastor.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face'}
                  alt={pastor.name}
                  className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#dc2626] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#b91c1c] transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-[#102a43] mt-4">{pastor.name}</h2>
              <p className="text-gray-500 text-sm">{pastor.ministryName || 'Senior Pastor'}</p>
              <div className="flex items-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-[#102a43]">{pastor.rating}</span>
                <span className="text-gray-400 text-sm">({pastor.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
                <Badge variant="outline" className="border-[#102a43]/20">
                  {pastor.yearsOfExperience}+ Years
                </Badge>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[#dc2626]" />
                <span className="text-gray-600">{pastor.location || 'Dallas, TX'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-[#dc2626]" />
                <span className="text-gray-600">{pastor.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe className="w-4 h-4 text-[#dc2626]" />
                <span className="text-gray-600">{pastor.languages.join(', ')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-[#dc2626]" />
                <span className="text-gray-600">Available Mon-Fri</span>
              </div>
            </div>

            <Button className="w-full mt-6 bg-[#102a43] hover:bg-[#243b53]">
              <Eye className="w-4 h-4 mr-2" />
              View Public Profile
            </Button>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-[#102a43]">Profile Information</CardTitle>
              <CardDescription>Update your profile details and professional information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[#102a43] font-medium">Full Name</Label>
                  <Input value={pastor.name} disabled className="border-gray-200 focus:border-[#102a43]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#102a43] font-medium">Email Address</Label>
                  <Input value={pastor.email} disabled className="border-gray-200 focus:border-[#102a43]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#102a43] font-medium">Location</Label>
                  <Input
                    value={profileData.location}
                    disabled={!isEditing}
                    className="border-gray-200 focus:border-[#102a43]"
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#102a43] font-medium">Hourly Rate ($)</Label>
                  <Input
                    value={profileData.hourlyRate}
                    disabled={!isEditing}
                    type="number"
                    className="border-gray-200 focus:border-[#102a43]"
                    onChange={(e) => setProfileData({ ...profileData, hourlyRate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#102a43] font-medium">Bio</Label>
                <Textarea
                  value={profileData.bio}
                  disabled={!isEditing}
                  className="min-h-32 border-gray-200 focus:border-[#102a43] resize-none"
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[#102a43] font-medium">Languages</Label>
                  <Input
                    value={profileData.languages}
                    disabled={!isEditing}
                    className="border-gray-200 focus:border-[#102a43]"
                    onChange={(e) => setProfileData({ ...profileData, languages: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#102a43] font-medium">Specialties</Label>
                  <Input
                    value={profileData.specialties}
                    disabled={!isEditing}
                    className="border-gray-200 focus:border-[#102a43]"
                    onChange={(e) => setProfileData({ ...profileData, specialties: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credentials & Certifications */}
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-[#102a43]">Credentials & Certifications</CardTitle>
                <CardDescription>Your professional qualifications and certifications</CardDescription>
              </div>
              <Button className="bg-[#102a43] hover:bg-[#243b53]">
                <Plus className="w-4 h-4 mr-2" />
                Add Credential
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {credentials.map((credential) => (
                  <div key={credential.id} className="flex items-center gap-4 p-4 bg-[#f0f4f8] rounded-xl">
                    <div className="w-12 h-12 bg-[#102a43]/10 rounded-xl flex items-center justify-center">
                      {credential.type === 'education' ? (
                        <GraduationCap className="w-6 h-6 text-[#102a43]" />
                      ) : (
                        <Award className="w-6 h-6 text-[#102a43]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-[#102a43]">{credential.title}</h4>
                        {credential.verified && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{credential.institution} • {credential.year}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#dc2626]">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ============================================
// AVAILABILITY SECTION
// ============================================
function AvailabilitySection() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [selectedSlots, setSelectedSlots] = useState<Record<string, string[]>>({
    Monday: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'],
    Tuesday: ['10:00 AM', '11:00 AM', '1:00 PM'],
    Wednesday: ['9:00 AM', '1:00 PM', '2:00 PM', '4:00 PM'],
    Thursday: ['10:00 AM', '2:00 PM'],
    Friday: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
    Saturday: [],
    Sunday: [],
  });

  const toggleSlot = (day: string, slot: string) => {
    setSelectedSlots((prev) => {
      const daySlots = prev[day] || [];
      const isSelected = daySlots.includes(slot);
      return {
        ...prev,
        [day]: isSelected
          ? daySlots.filter((s) => s !== slot)
          : [...daySlots, slot].sort((a, b) => timeSlots.indexOf(a) - timeSlots.indexOf(b)),
      };
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#102a43] to-[#243b53] rounded-2xl p-6 text-white">
        <div>
          <h2 className="text-2xl font-bold mb-2">Set Your Availability</h2>
          <p className="text-gray-300">Define when you&apos;re available for counseling sessions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset All
          </Button>
          <Button className="bg-[#dc2626] hover:bg-[#b91c1c]">
            <Save className="w-4 h-4 mr-2" />
            Save Schedule
          </Button>
        </div>
      </div>

      {/* Quick Settings */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: 'Session Duration', value: '60 minutes', icon: Clock, color: 'bg-[#dc2626]/10 text-[#dc2626]' },
          { label: 'Buffer Time', value: '15 minutes', icon: Clock4, color: 'bg-[#102a43]/10 text-[#102a43]' },
          { label: 'Max Sessions/Day', value: '8 sessions', icon: Calendar, color: 'bg-green-100 text-green-600' },
        ].map((setting, index) => {
          const Icon = setting.icon;
          return (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-12 h-12 ${setting.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{setting.label}</p>
                  <p className="font-semibold text-[#102a43]">{setting.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Weekly Calendar */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-[#102a43]">Weekly Schedule</CardTitle>
          <CardDescription>Click on time slots to toggle your availability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Time Labels Header */}
              <div className="grid grid-cols-13 gap-1 mb-2">
                <div className="p-2 w-20"></div>
                {timeSlots.map((slot) => (
                  <div key={slot} className="p-2 text-center text-xs text-gray-500 font-medium">
                    {slot}
                  </div>
                ))}
              </div>

              {/* Days Rows */}
              {days.map((day) => (
                <div key={day} className="grid grid-cols-13 gap-1 mb-1">
                  <div className="p-2 w-20 flex items-center">
                    <span className="font-medium text-[#102a43] text-sm">{day}</span>
                  </div>
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlots[day]?.includes(slot);
                    return (
                      <button
                        key={`${day}-${slot}`}
                        className={`p-2 rounded text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#dc2626] text-white hover:bg-[#b91c1c]'
                            : 'bg-[#f0f4f8] text-gray-400 hover:bg-gray-200'
                        }`}
                        onClick={() => toggleSlot(day, slot)}
                      >
                        {isSelected ? '✓' : ''}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability Summary & Time Off */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-[#102a43]">Selected Slots Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {days.map((day) => {
                const slots = selectedSlots[day] || [];
                if (slots.length === 0) return null;
                return (
                  <div key={day} className="flex items-center justify-between p-3 bg-[#f0f4f8] rounded-lg">
                    <span className="font-medium text-[#102a43]">{day}</span>
                    <div className="flex flex-wrap gap-1">
                      {slots.map((slot) => (
                        <Badge key={slot} variant="outline" className="border-[#dc2626]/20 text-[#dc2626]">
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-[#102a43]">Time Off & Exceptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-dashed border-gray-300 rounded-xl hover:border-[#102a43] transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-[#102a43]">Schedule Time Off</h4>
                  <p className="text-sm text-gray-500">Block out dates for vacation or personal time</p>
                </div>
                <Button variant="outline" className="border-[#102a43] text-[#102a43]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>

              <div className="p-4 bg-[#f0f4f8] rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#102a43]">Christmas Break</h4>
                    <p className="text-sm text-gray-500">Dec 24 - Dec 26, 2024</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#dc2626]">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-[#f0f4f8] rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#102a43]">Ministry Conference</h4>
                    <p className="text-sm text-gray-500">Feb 15 - Feb 17, 2024</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#dc2626]">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ============================================
// APPOINTMENTS SECTION
// ============================================
function AppointmentsSection({
  upcomingSessions,
  completedSessions,
}: {
  upcomingSessions: Session[];
  completedSessions: Session[];
}) {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#102a43]">Appointments</h2>
          <p className="text-gray-500">Manage your upcoming and past appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#102a43] text-[#102a43]">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200 focus:border-[#102a43]"
          />
        </div>
        <div className="flex items-center gap-2">
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
      </div>

      {/* Appointments List */}
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <div className="divide-y">
            {[...upcomingSessions, ...completedSessions].map((session, index) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 hover:bg-[#f0f4f8]/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    session.status === 'scheduled' ? 'bg-gradient-to-br from-[#dc2626] to-[#b91c1c]' :
                    session.status === 'completed' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                    'bg-gray-400'
                  }`}>
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#102a43]">{session.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock4 className="w-3 h-3" />
                        {new Date(session.scheduledAt).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span>•</span>
                      <span>{session.duration} min</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    className={`${
                      session.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-700'
                        : session.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </Badge>
                  {session.status === 'scheduled' && (
                    <Button size="sm" className="bg-[#dc2626] hover:bg-[#b91c1c]">
                      <Video className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="text-gray-400">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Showing 1-5 of 24 appointments</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="border-gray-200">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="border-[#102a43] bg-[#102a43] text-white">1</Button>
          <Button variant="outline" className="border-gray-200">2</Button>
          <Button variant="outline" className="border-gray-200">3</Button>
          <Button variant="outline" size="icon" className="border-gray-200">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// SESSIONS HISTORY SECTION
// ============================================
function SessionsHistorySection({ sessions }: { sessions: Session[] }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#102a43]">Session History</h2>
          <p className="text-gray-500">View your past counseling sessions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-gray-200">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-gray-200">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session, index) => (
          <Card key={session.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
                <span className="text-sm text-gray-400">
                  {new Date(session.scheduledAt).toLocaleDateString()}
                </span>
              </div>
              <h4 className="font-semibold text-[#102a43] mb-2">{session.title}</h4>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock4 className="w-3 h-3" />
                  {session.duration} min
                </span>
                <Badge variant="outline" className="border-gray-200 text-gray-600">
                  {session.category}
                </Badge>
              </div>
              {session.notes && (
                <p className="text-sm text-gray-500 mt-3 line-clamp-2 bg-[#f0f4f8] p-2 rounded">{session.notes}</p>
              )}
              <Separator className="my-3" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="text-[#102a43]">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ============================================
// MESSAGES SECTION
// ============================================
function MessagesSection({ messages }: { messages: typeof messages }) {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(messages[0]?.id || null);
  const [isInVideoCall, setIsInVideoCall] = useState(false);
  const [isInAudioCall, setIsInAudioCall] = useState(false);
  const [isCallMinimized, setIsCallMinimized] = useState(false);
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [callType, setCallType] = useState<'video' | 'audio'>('video');
  const [newMessage, setNewMessage] = useState('');

  const selectedConversation = messages.find((m) => m.id === selectedMessage);

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

  // Simulate incoming call (demo)
  const simulateIncomingCall = () => {
    setShowIncomingCall(true);
  };

  const acceptIncomingCall = () => {
    setShowIncomingCall(false);
    if (callType === 'video') {
      setIsInVideoCall(true);
    } else {
      setIsInAudioCall(true);
    }
  };

  const declineIncomingCall = () => {
    setShowIncomingCall(false);
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 min-h-[600px]">
        {/* Message List */}
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#102a43] to-[#243b53] text-white p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Messages</CardTitle>
              <Badge className="bg-[#dc2626]">2 New</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="divide-y">
                {messages.map((message) => (
                  <button
                    key={message.id}
                    className={`w-full p-4 text-left hover:bg-[#f0f4f8] transition-colors ${
                      selectedMessage === message.id ? 'bg-[#f0f4f8]' : ''
                    }`}
                    onClick={() => setSelectedMessage(message.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={message.user.avatar}
                          alt={message.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {message.unread && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#dc2626] rounded-full border-2 border-white" />
                        )}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-[#102a43] truncate">{message.user.name}</h4>
                          <span className="text-xs text-gray-400">{message.time}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{message.preview}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Message Detail */}
        <Card className="md:col-span-2 border-none shadow-md overflow-hidden flex flex-col">
          {selectedMessage ? (
            <>
              <CardHeader className="bg-white border-b p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedConversation?.user.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-[#102a43]">
                      {selectedConversation?.user.name}
                    </h4>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Online
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
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-4 bg-[#f0f4f8]">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-sm max-w-[70%]">
                      <p className="text-gray-600 text-sm">
                        Hello Pastor, I wanted to thank you for the wonderful session yesterday. The guidance you provided was exactly what we needed for our marriage.
                      </p>
                      <span className="text-xs text-gray-400 mt-2 block">10:30 AM</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#102a43] text-white p-4 rounded-2xl rounded-br-md shadow-sm max-w-[70%]">
                      <p className="text-sm">
                        You&apos;re welcome! I&apos;m glad I could help. Remember to practice the communication techniques we discussed. Let me know if you have any questions.
                      </p>
                      <span className="text-xs text-gray-300 mt-2 block">10:35 AM</span>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-sm max-w-[70%]">
                      <p className="text-gray-600 text-sm">
                        We&apos;ve been practicing active listening every evening. It&apos;s really making a difference! Can we schedule a follow-up session next week?
                      </p>
                      <span className="text-xs text-gray-400 mt-2 block">10:45 AM</span>
                    </div>
                  </div>
                  {/* Call invitation message */}
                  <div className="flex justify-center">
                    <div className="bg-[#dc2626]/10 px-4 py-2 rounded-full flex items-center gap-2">
                      <Video className="w-4 h-4 text-[#dc2626]" />
                      <span className="text-sm text-[#dc2626]">You started a video call • 15 min</span>
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
                    className="flex-1 border-gray-200 focus:border-[#102a43]"
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
              name: selectedConversation?.user.name || 'User',
              avatar: selectedConversation?.user.avatar,
              role: 'user'
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
              name: selectedConversation?.user.name || 'User',
              avatar: selectedConversation?.user.avatar,
              role: 'user'
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
              src={selectedConversation?.user.avatar}
              alt=""
              className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#102a43]" />
          </div>
          <div>
            <p className="text-white font-semibold">{selectedConversation?.user.name}</p>
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
              name: selectedConversation?.user.name || 'User',
              avatar: selectedConversation?.user.avatar,
              role: 'user'
            }}
            onAccept={acceptIncomingCall}
            onDecline={declineIncomingCall}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================
// EARNINGS SECTION
// ============================================
function EarningsSection({
  weeklyEarnings,
  transactions,
}: {
  weeklyEarnings: typeof weeklyEarnings;
  transactions: typeof transactions;
}) {
  const totalEarnings = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  const pendingAmount = transactions
    .filter((t) => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      {/* Earnings Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-none shadow-md bg-gradient-to-br from-[#102a43] to-[#243b53] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
              <Badge className="bg-green-500/20 text-green-300">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +12%
              </Badge>
            </div>
            <p className="text-gray-400 text-sm">Total Earnings</p>
            <p className="text-3xl font-bold">${totalEarnings.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Banknote className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-gray-500 text-sm">Available</p>
            <p className="text-2xl font-bold text-[#102a43]">${(totalEarnings - pendingAmount).toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-2xl font-bold text-[#102a43]">${pendingAmount.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-500 text-sm">This Month</p>
            <p className="text-2xl font-bold text-[#102a43]">${monthlyStats.totalEarnings.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[#102a43]">Weekly Earnings</CardTitle>
            <CardDescription>Your earnings breakdown for this week</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-100 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% from last week
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4 h-52">
            {weeklyEarnings.map((item, index) => {
              const maxAmount = Math.max(...weeklyEarnings.map((w) => w.amount));
              const height = (item.amount / maxAmount) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full flex justify-center h-44">
                    <div
                      className="w-full max-w-16 bg-gradient-to-t from-[#102a43] to-[#243b53] rounded-t-lg transition-all hover:from-[#dc2626] hover:to-[#f87171] cursor-pointer group"
                      style={{ height: `${height}%`, minHeight: '20px' }}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#102a43] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        ${item.amount} ({item.sessions} sessions)
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{item.day}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[#102a43]">Recent Transactions</CardTitle>
            <CardDescription>Your recent financial activities</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-gray-200">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-gray-200">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-[#f0f4f8]/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' 
                      ? transaction.status === 'completed' ? 'bg-green-100' : 'bg-amber-100'
                      : 'bg-red-100'
                  }`}>
                    {transaction.type === 'credit' ? (
                      transaction.status === 'completed' ? (
                        <ArrowUpRight className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-amber-600" />
                      )
                    ) : (
                      <ArrowDownRight className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-[#102a43]">{transaction.description}</h4>
                    {transaction.client && (
                      <p className="text-sm text-gray-500">{transaction.client}</p>
                    )}
                    <p className="text-xs text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <Badge className={`text-xs ${
                    transaction.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payout Settings */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-[#102a43] flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payout Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#f0f4f8] rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#102a43] rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#102a43]">Bank Account</p>
                  <p className="text-sm text-gray-500">•••• 4532</p>
                </div>
              </div>
              <p className="text-xs text-gray-400">Last payout: Jan 10, 2024</p>
            </div>
            <div className="p-4 bg-[#f0f4f8] rounded-xl">
              <p className="text-sm text-gray-500 mb-2">Payout Schedule</p>
              <p className="font-medium text-[#102a43]">Weekly (Every Monday)</p>
              <p className="text-xs text-gray-400 mt-1">Minimum payout: $50</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 border-[#102a43] text-[#102a43]">
              <Plus className="w-4 h-4 mr-2" />
              Add Bank Account
            </Button>
            <Button className="flex-1 bg-[#102a43] hover:bg-[#243b53]">
              <Wallet className="w-4 h-4 mr-2" />
              Request Payout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// SETTINGS SECTION
// ============================================
function SettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#102a43]">Settings</h2>
        <p className="text-gray-500">Manage your account preferences and settings</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Account Settings */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-[#102a43] flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#102a43]">Email Address</Label>
              <Input placeholder="pastor@church.org" className="border-gray-200 focus:border-[#102a43]" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#102a43]">Phone Number</Label>
              <Input placeholder="+1 (555) 000-0000" className="border-gray-200 focus:border-[#102a43]" />
            </div>
            <Button className="w-full bg-[#102a43] hover:bg-[#243b53]">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-[#102a43] flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Email notifications', description: 'Receive booking confirmations via email', enabled: true },
              { label: 'SMS reminders', description: 'Get text reminders before sessions', enabled: true },
              { label: 'New message alerts', description: 'Get notified of new messages', enabled: true },
              { label: 'Marketing emails', description: 'Receive updates about new features', enabled: false },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#f0f4f8] rounded-lg">
                <div>
                  <p className="font-medium text-[#102a43]">{setting.label}</p>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
                <button
                  className={`w-12 h-6 rounded-full transition-colors ${
                    setting.enabled ? 'bg-[#dc2626]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      setting.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security Settings */}
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

        {/* Danger Zone */}
        <Card className="border border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-[#102a43]">Delete Account</p>
                <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
