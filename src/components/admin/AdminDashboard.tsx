'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '../dashboard/StatsCard';
import { adminStats, pastors, users, sessions } from '@/data/dummy';
import {
  Users,
  UserCheck,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { DashboardTab } from '@/types';

interface AdminDashboardProps {
  onTabChange: (tab: DashboardTab) => void;
}

export function AdminDashboard({ onTabChange }: AdminDashboardProps) {
  const pendingPastors = pastors.filter((p) => !p.isApproved);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#102a43] to-[#243b53] rounded-2xl p-8 text-white" data-aos="fade-up">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-300">Manage your platform, users, and pastors.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value={adminStats.totalUsers}
          icon={Users}
          iconColor="text-[#102a43]"
          iconBgColor="bg-[#102a43]/10"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Total Pastors"
          value={adminStats.totalPastors}
          icon={UserCheck}
          iconColor="text-[#dc2626]"
          iconBgColor="bg-[#dc2626]/10"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Total Sessions"
          value={adminStats.totalSessions}
          icon={Calendar}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          trend={{ value: 23, isPositive: true }}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${adminStats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          iconColor="text-yellow-500"
          iconBgColor="bg-yellow-100"
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Pastor Approvals */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#102a43] flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#dc2626]" />
                Pending Approvals
              </CardTitle>
              <Badge variant="destructive">{adminStats.pendingPastors}</Badge>
            </CardHeader>
            <CardContent>
              {pendingPastors.length > 0 ? (
                <div className="space-y-4">
                  {pendingPastors.map((pastor) => (
                    <div key={pastor.id} className="flex items-center justify-between p-4 bg-[#f0f4f8] rounded-lg">
                      <div className="flex items-center gap-4">
                        <img
                          src={pastor.avatar}
                          alt={pastor.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold text-[#102a43]">{pastor.name}</h4>
                          <p className="text-sm text-gray-500">{pastor.ministryName}</p>
                          <div className="flex gap-1 mt-1">
                            {pastor.specialties.slice(0, 2).map((s, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{s}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-500">All pending pastors have been reviewed</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-none shadow-md mt-6">
            <CardHeader>
              <CardTitle className="text-[#102a43]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-600">New user registration: Jane Smith</span>
                  <span className="text-gray-400 ml-auto">5 min ago</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-2 h-2 bg-[#dc2626] rounded-full" />
                  <span className="text-gray-600">Session completed: Pastor John Williams</span>
                  <span className="text-gray-400 ml-auto">15 min ago</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-gray-600">New pastor application: Dr. Michael Brown</span>
                  <span className="text-gray-400 ml-auto">1 hour ago</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-gray-600">Payment processed: $75.00</span>
                  <span className="text-gray-400 ml-auto">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-[#102a43]">Platform Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Sessions</span>
                <Badge className="bg-green-500">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Online Pastors</span>
                <Badge className="bg-[#102a43]">24</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Support Tickets</span>
                <Badge variant="destructive">3</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">System Status</span>
                <Badge className="bg-green-500">Healthy</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Growth Chart Placeholder */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-[#102a43]">Monthly Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#dc2626] mb-1">
                  +{adminStats.monthlyGrowth}%
                </div>
                <p className="text-gray-500 text-sm">vs last month</p>
                <div className="mt-4 flex items-end justify-center gap-1 h-20">
                  {[40, 55, 45, 60, 50, 75, 80].map((h, i) => (
                    <div
                      key={i}
                      className="w-6 bg-[#dc2626] rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-[#102a43]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start border-[#102a43] text-[#102a43]"
                onClick={() => onTabChange('pastors')}
              >
                <Users className="w-4 h-4 mr-2" />
                Manage Pastors
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-[#102a43] text-[#102a43]"
                onClick={() => onTabChange('users')}
              >
                <UserCheck className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-[#102a43] text-[#102a43]"
                onClick={() => onTabChange('reports')}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
