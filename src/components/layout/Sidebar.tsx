'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  User,
  Calendar,
  Clock,
  MessageSquare,
  DollarSign,
  Settings,
  Heart,
  Search,
  Bookmark,
  Users,
  FileText,
  BarChart3,
  Shield,
  LogOut,
} from 'lucide-react';
import { DashboardTab, User as UserType } from '@/types';

interface SidebarProps {
  user: UserType | null;
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onLogout: () => void;
}

export function Sidebar({ user, activeTab, onTabChange, onLogout }: SidebarProps) {
  const getUserNavItems = () => {
    const commonItems = [
      { id: 'overview' as DashboardTab, label: 'Overview', icon: LayoutDashboard },
      { id: 'messages' as DashboardTab, label: 'Messages', icon: MessageSquare },
      { id: 'settings' as DashboardTab, label: 'Settings', icon: Settings },
    ];

    if (user?.role === 'user') {
      return [
        { id: 'overview' as DashboardTab, label: 'Overview', icon: LayoutDashboard },
        { id: 'browse' as DashboardTab, label: 'Browse Pastors', icon: Search },
        { id: 'saved' as DashboardTab, label: 'Saved Pastors', icon: Bookmark },
        { id: 'bookings' as DashboardTab, label: 'My Bookings', icon: Calendar },
        { id: 'sessions' as DashboardTab, label: 'Sessions', icon: Clock },
        { id: 'messages' as DashboardTab, label: 'Messages', icon: MessageSquare },
        { id: 'settings' as DashboardTab, label: 'Settings', icon: Settings },
      ];
    }

    if (user?.role === 'pastor') {
      return [
        { id: 'overview' as DashboardTab, label: 'Overview', icon: LayoutDashboard },
        { id: 'profile' as DashboardTab, label: 'My Profile', icon: User },
        { id: 'availability' as DashboardTab, label: 'Availability', icon: Calendar },
        { id: 'appointments' as DashboardTab, label: 'Appointments', icon: Clock },
        { id: 'sessions' as DashboardTab, label: 'Sessions', icon: MessageSquare },
        { id: 'earnings' as DashboardTab, label: 'Earnings', icon: DollarSign },
        { id: 'settings' as DashboardTab, label: 'Settings', icon: Settings },
      ];
    }

    if (user?.role === 'admin') {
      return [
        { id: 'overview' as DashboardTab, label: 'Overview', icon: LayoutDashboard },
        { id: 'pastors' as DashboardTab, label: 'Manage Pastors', icon: Users },
        { id: 'users' as DashboardTab, label: 'Manage Users', icon: Users },
        { id: 'bookings' as DashboardTab, label: 'Bookings', icon: Calendar },
        { id: 'reports' as DashboardTab, label: 'Reports', icon: BarChart3 },
        { id: 'settings' as DashboardTab, label: 'Settings', icon: Settings },
      ];
    }

    return commonItems;
  };

  const navItems = getUserNavItems();

  return (
    <aside className="w-64 bg-[#102a43] text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#334e68]">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#dc2626] rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">PastorCounsel</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-[#334e68]">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=dc2626&color=fff`}
            alt={user?.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#dc2626] text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#243b53]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="p-4 border-t border-[#334e68]">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#243b53]"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
