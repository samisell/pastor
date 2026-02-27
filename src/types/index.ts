// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  role: 'user' | 'pastor' | 'admin';
  createdAt: string;
  isVerified: boolean;
}

export interface Pastor extends User {
  role: 'pastor';
  bio: string;
  ministryName?: string;
  specialties: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  sessionCount: number;
  hourlyRate?: number;
  availability: Availability[];
  education?: string;
  certifications?: string[];
  yearsOfExperience: number;
  location?: string;
  isAvailable: boolean;
  isApproved: boolean;
}

export interface Profile {
  id: string;
  userId: string;
  bio: string;
  avatar?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  timezone?: string;
}

// Session & Booking Types
export interface Session {
  id: string;
  pastorId: string;
  userId: string;
  title: string;
  description?: string;
  category: string;
  scheduledAt: string;
  duration: number; // in minutes
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  meetingUrl?: string;
  notes?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  sessionId: string;
  userId: string;
  pastorId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus?: 'pending' | 'paid' | 'refunded';
  amount?: number;
  notes?: string;
  createdAt: string;
}

// Availability Types
export interface Availability {
  id: string;
  pastorId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  isRecurring: boolean;
  specificDate?: string;
}

export interface TimeSlot {
  id: string;
  pastorId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  sessionCount: number;
}

// Communication Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  sender?: User | Pastor;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'message' | 'session' | 'payment' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// Review Types
export interface Review {
  id: string;
  sessionId: string;
  pastorId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: User;
}

// Dashboard Stats
export interface DashboardStats {
  totalSessions: number;
  completedSessions: number;
  upcomingSessions: number;
  totalEarnings?: number;
  totalUsers?: number;
  totalPastors?: number;
  totalBookings?: number;
  rating: number;
  reviewCount: number;
}

// Admin Types
export interface AdminStats {
  totalUsers: number;
  totalPastors: number;
  pendingPastors: number;
  totalSessions: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'user' | 'pastor';
  phone?: string;
  agreeToTerms: boolean;
}

export interface PastorRegisterFormData extends RegisterFormData {
  ministryName?: string;
  specialties: string[];
  yearsOfExperience: number;
  bio: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// Navigation Types
export type PageState = 
  | 'home'
  | 'about'
  | 'how-it-works'
  | 'browse-pastors'
  | 'pastor-profile'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'login'
  | 'user-login'
  | 'pastor-login'
  | 'register-pastor'
  | 'register-user'
  | 'forgot-password'
  | 'reset-password'
  | 'user-dashboard'
  | 'pastor-dashboard'
  | 'admin-dashboard'
  | 'video-session'
  | 'not-found';

export type DashboardTab = 
  | 'overview'
  | 'profile'
  | 'availability'
  | 'appointments'
  | 'sessions'
  | 'messages'
  | 'earnings'
  | 'settings'
  | 'browse'
  | 'saved'
  | 'bookings'
  | 'pastors'
  | 'users'
  | 'reports';
