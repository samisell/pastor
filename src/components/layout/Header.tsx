'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menu,
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  Calendar,
  MessageSquare,
  Heart,
  Shield,
  Home,
  ChevronDown,
  X,
  ArrowRight,
} from 'lucide-react';
import { PageState, DashboardTab, User as UserType } from '@/types';
import { categories } from '@/data/dummy';

interface HeaderProps {
  currentPage: PageState;
  onNavigate: (page: PageState, pastorId?: string) => void;
  user: UserType | null;
  onLogout: () => void;
}

export function Header({ currentPage, onNavigate, user, onLogout }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'Home', page: 'home' as PageState },
    { label: 'About', page: 'about' as PageState },
    { label: 'How It Works', page: 'how-it-works' as PageState },
    { label: 'Browse Pastors', page: 'browse-pastors' as PageState },
    { label: 'Contact', page: 'contact' as PageState },
    { label: 'FAQ', page: 'faq' as PageState },
  ];

  const isActive = (page: PageState) => currentPage === page;

  const popularSearches = [
    'Marriage Counseling',
    'Grief Support',
    'Personal Guidance',
    'Family Counseling',
    'Deliverance Ministry',
  ];

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [searchOpen]);

  const handleSearch = () => {
    if (searchQuery.trim() || selectedCategory) {
      setSearchOpen(false);
      onNavigate('browse-pastors');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#102a43] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-[#dc2626] rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold hidden sm:block">PastorCounsel</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.page)
                    ? 'bg-[#dc2626] text-white'
                    : 'text-gray-300 hover:text-white hover:bg-[#243b53]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-gray-300 hover:text-white hover:bg-[#243b53]"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {/* Notifications */}
                <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white">
                      <Bell className="w-5 h-5" />
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#dc2626]">
                        3
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-2 border-b">
                      <h4 className="font-semibold">Notifications</h4>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                        <span className="font-medium text-sm">Session Confirmed</span>
                        <span className="text-xs text-gray-500">Your session with Pastor John has been confirmed.</span>
                        <span className="text-xs text-gray-400">2 hours ago</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                        <span className="font-medium text-sm">New Message</span>
                        <span className="text-xs text-gray-500">You have a new message from Pastor Sarah.</span>
                        <span className="text-xs text-gray-400">5 hours ago</span>
                      </DropdownMenuItem>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="justify-center text-[#dc2626]">
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white">
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=dc2626&color=fff`}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="hidden sm:block">{user.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="p-2 border-b">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <DropdownMenuItem onClick={() => onNavigate(user.role === 'pastor' ? 'pastor-dashboard' : user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard')}>
                      <Home className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate(user.role === 'pastor' ? 'pastor-dashboard' : 'user-dashboard')}>
                      <Calendar className="w-4 h-4 mr-2" />
                      My Sessions
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Messages
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout} className="text-[#dc2626]">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate('login')}
                  className="text-gray-300 hover:text-white hidden sm:block"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => onNavigate('register-user')}
                  className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                >
                  Get Started
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-gray-300 hover:text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-[#102a43] text-white border-l border-[#334e68]">
                <nav className="flex flex-col gap-2 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => onNavigate(item.page)}
                      className={`px-4 py-3 rounded-md text-left font-medium transition-colors ${
                        isActive(item.page)
                          ? 'bg-[#dc2626] text-white'
                          : 'text-gray-300 hover:text-white hover:bg-[#243b53]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <hr className="border-[#334e68] my-4" />
                  {!user && (
                    <>
                      <Button
                        onClick={() => onNavigate('login')}
                        variant="outline"
                        className="w-full border-[#334e68] text-white hover:bg-[#243b53]"
                      >
                        Sign In
                      </Button>
                      <Button
                        onClick={() => onNavigate('register-user')}
                        className="w-full bg-[#dc2626] hover:bg-[#b91c1c]"
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Search Popup Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            ref={searchContainerRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#0a1929] border-t border-[#334e68] shadow-2xl"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="max-w-3xl mx-auto">
                {/* Search Input Row */}
                <div className="flex gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search pastors, specialties, categories..."
                      className="w-full pl-12 pr-4 py-4 bg-[#102a43] border-[#334e68] text-white placeholder-gray-400 focus:border-[#dc2626] text-lg rounded-xl"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <select
                    className="px-4 py-2 bg-[#102a43] border border-[#334e68] rounded-xl text-white focus:border-[#dc2626] focus:outline-none cursor-pointer"
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
                  <Button
                    className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 rounded-xl"
                    onClick={handleSearch}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white hover:bg-[#243b53] rounded-xl"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Quick Search Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-400">Popular:</span>
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      className="px-3 py-1.5 bg-[#102a43] hover:bg-[#243b53] border border-[#334e68] rounded-full text-sm text-gray-300 hover:text-white transition-colors"
                      onClick={() => {
                        setSearchQuery(search);
                        setSearchOpen(false);
                        onNavigate('browse-pastors');
                      }}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
