'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { LoginForm } from '@/components/auth/LoginForm';
import { UserLoginForm } from '@/components/auth/UserLoginForm';
import { PastorLoginForm } from '@/components/auth/PastorLoginForm';
import { UserRegisterForm } from '@/components/auth/UserRegisterForm';
import { PastorRegisterForm } from '@/components/auth/PastorRegisterForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { Hero } from '@/components/public/Hero';
import { Features } from '@/components/public/Features';
import { HowItWorks } from '@/components/public/HowItWorks';
import { PastorList } from '@/components/public/PastorList';
import { PastorProfile } from '@/components/public/PastorProfile';
import { Testimonials } from '@/components/public/Testimonials';
import { Contact } from '@/components/public/Contact';
import { FAQ } from '@/components/public/FAQ';
import { About } from '@/components/public/About';
import { PrivacyPolicy } from '@/components/public/PrivacyPolicy';
import { TermsOfService } from '@/components/public/TermsOfService';
import { NotFound } from '@/components/public/NotFound';
import { GetStartedPopup } from '@/components/public/GetStartedPopup';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { PastorDashboard } from '@/components/dashboard/PastorDashboard';
import { VideoInterface } from '@/components/video/VideoInterface';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { PageState, DashboardTab, User as UserType } from '@/types';
import { users } from '@/data/dummy';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Custom hook for client-side detection
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageState>('home');
  const [selectedPastorId, setSelectedPastorId] = useState<string | null>(null);
  const [activeDashboardTab, setActiveDashboardTab] = useState<DashboardTab>('overview');
  const [user, setUser] = useState<UserType | null>(null);
  const isClient = useIsClient();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const handleNavigate = (page: PageState, pastorId?: string) => {
    setCurrentPage(page);
    if (pastorId) {
      setSelectedPastorId(pastorId);
    }
    window.scrollTo(0, 0);
  };

  const handleLogin = (email: string, password: string) => {
    // Simulate login - in real app, this would call API
    const foundUser = users.find((u) => u.email === email) || users[0];
    setUser(foundUser);
    
    if (foundUser.role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else if (foundUser.role === 'pastor') {
      setCurrentPage('pastor-dashboard');
    } else {
      setCurrentPage('user-dashboard');
    }
  };

  const handleRegister = (data: Record<string, unknown>) => {
    // Simulate registration
    const newUser: UserType = {
      id: 'new-user',
      email: data.email as string,
      name: data.name as string,
      role: data.role as 'user' | 'pastor',
      createdAt: new Date().toISOString(),
      isVerified: false,
    };
    setUser(newUser);
    
    if (data.role === 'pastor') {
      setCurrentPage('pastor-dashboard');
    } else {
      setCurrentPage('user-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleTabChange = (tab: DashboardTab) => {
    setActiveDashboardTab(tab);
  };

  // Pages that don't need header/footer
  const isAuthPage = ['login', 'user-login', 'pastor-login', 'register-pastor', 'register-user', 'forgot-password', 'reset-password'].includes(currentPage);
  const isVideoPage = currentPage === 'video-session';
  const isDashboardPage = ['user-dashboard', 'pastor-dashboard', 'admin-dashboard'].includes(currentPage);

  // Render auth pages
  if (isAuthPage) {
    if (!isClient) return null;
    
    switch (currentPage) {
      case 'login':
        return <LoginForm onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'user-login':
        return <UserLoginForm onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'pastor-login':
        return <PastorLoginForm onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'register-pastor':
        return <PastorRegisterForm onNavigate={handleNavigate} onRegister={handleRegister} />;
      case 'register-user':
        return <UserRegisterForm onNavigate={handleNavigate} onRegister={handleRegister} />;
      case 'forgot-password':
        return <ForgotPasswordForm onNavigate={handleNavigate} />;
      case 'reset-password':
        return <ResetPasswordForm onNavigate={handleNavigate} />;
    }
  }

  // Render video interface
  if (isVideoPage) {
    if (!isClient) return null;
    return <VideoInterface onNavigate={handleNavigate} />;
  }

  // Render dashboard pages
  if (isDashboardPage && user) {
    return (
      <div className="flex min-h-screen bg-[#f0f4f8]">
        <Sidebar
          user={user}
          activeTab={activeDashboardTab}
          onTabChange={handleTabChange}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-6 overflow-auto">
          {currentPage === 'admin-dashboard' && <AdminDashboard onTabChange={handleTabChange} />}
          {currentPage === 'pastor-dashboard' && user.role === 'pastor' && (
            <PastorDashboard user={user} onTabChange={handleTabChange} />
          )}
          {currentPage === 'user-dashboard' && user.role === 'user' && (
            <UserDashboard
              user={user}
              onTabChange={handleTabChange}
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>
    );
  }

  // Render public pages with header and footer
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <Features />
            <HowItWorks onNavigate={handleNavigate} />
            <PastorList onNavigate={handleNavigate} />
            <Testimonials />
            <Contact />
            <GetStartedPopup onNavigate={handleNavigate} />
          </>
        );
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'how-it-works':
        return <HowItWorks onNavigate={handleNavigate} />;
      case 'browse-pastors':
        return <PastorList onNavigate={handleNavigate} />;
      case 'pastor-profile':
        return (
          <PastorProfile
            pastorId={selectedPastorId}
            onNavigate={handleNavigate}
            onBookSession={(id) => {
              setSelectedPastorId(id);
              // Would open booking modal
            }}
          />
        );
      case 'contact':
        return <Contact />;
      case 'faq':
        return <FAQ />;
      case 'privacy':
        return <PrivacyPolicy onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsOfService onNavigate={handleNavigate} />;
      case 'not-found':
        return <NotFound onNavigate={handleNavigate} />;
      default:
        return <NotFound onNavigate={handleNavigate} />;
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
