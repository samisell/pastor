'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  FileText,
  ChevronRight,
  Calendar,
  Download,
  Printer,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Scale,
  Shield,
  Users,
  CreditCard,
  Gavel,
  Globe,
  Lock,
  Bell,
  RefreshCw,
  Mail,
  Phone,
  ArrowUp,
  BookOpen,
  Building,
  HandHeart,
} from 'lucide-react';
import { PageState } from '@/types';

interface TermsOfServiceProps {
  onNavigate: (page: PageState) => void;
}

const tableOfContents = [
  { id: 'introduction', title: 'Introduction', icon: BookOpen },
  { id: 'definitions', title: 'Definitions', icon: FileText },
  { id: 'eligibility', title: 'Eligibility', icon: Users },
  { id: 'account', title: 'Account Registration', icon: Shield },
  { id: 'services', title: 'Our Services', icon: HandHeart },
  { id: 'booking', title: 'Booking & Sessions', icon: Calendar },
  { id: 'payments', title: 'Payments & Refunds', icon: CreditCard },
  { id: 'conduct', title: 'User Conduct', icon: Scale },
  { id: 'pastors', title: 'Pastor Guidelines', icon: Building },
  { id: 'intellectual-property', title: 'Intellectual Property', icon: Lock },
  { id: 'privacy', title: 'Privacy & Confidentiality', icon: Shield },
  { id: 'disclaimers', title: 'Disclaimers', icon: AlertCircle },
  { id: 'limitation', title: 'Limitation of Liability', icon: Gavel },
  { id: 'termination', title: 'Termination', icon: RefreshCw },
  { id: 'disputes', title: 'Dispute Resolution', icon: Scale },
  { id: 'changes', title: 'Changes to Terms', icon: Bell },
  { id: 'contact', title: 'Contact Information', icon: Mail },
];

export function TermsOfService({ onNavigate }: TermsOfServiceProps) {
  const [activeSection, setActiveSection] = useState('introduction');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const sections = contentRef.current.querySelectorAll('section[id]');
      let currentSection = 'introduction';
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    const scrollContainer = contentRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && contentRef.current) {
      const offsetTop = element.offsetTop - 100;
      contentRef.current.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#102a43] via-[#243b53] to-[#102a43] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#dc2626] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#dc2626] rounded-full blur-[150px] opacity-15" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#dc2626]/20 text-[#fca5a5] border-[#dc2626]/30 px-4 py-2 text-sm mb-6" data-aos="fade-down">
              <FileText className="w-4 h-4 mr-2" />
              Legal Agreement
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300 mb-6" data-aos="fade-up" data-aos-delay="100">
              Please read these terms carefully before using our platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Last Updated: January 15, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                <span>Version 2.1</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <Card className="border-none shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-[#102a43] text-white p-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Table of Contents
                    </h3>
                  </div>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <nav className="p-2">
                      {tableOfContents.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-all ${
                              isActive
                                ? 'bg-[#102a43] text-white'
                                : 'text-gray-600 hover:bg-[#f0f4f8]'
                            }`}
                          >
                            <Icon className="w-4 h-4 shrink-0" />
                            <span className="truncate">{item.title}</span>
                            {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                          </button>
                        );
                      })}
                    </nav>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="mt-4 space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-[#102a43] text-[#102a43]"
                  onClick={() => window.print()}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Document
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-[#102a43] text-[#102a43]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Card className="border-none shadow-lg">
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-200px)]" ref={contentRef}>
                  <div className="p-8 space-y-8">
                    {/* Introduction */}
                    <section id="introduction" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#dc2626]/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-[#dc2626]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">1. Introduction</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          Welcome to PastorCounsel. These Terms of Service ("Terms") govern your access to and use of the PastorCounsel platform, including our website, mobile applications, and related services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-4">
                          PastorCounsel provides a platform connecting individuals seeking spiritual guidance with verified pastors and counselors. Our mission is to make faith-based counseling accessible to everyone, while maintaining the highest standards of professionalism, confidentiality, and care.
                        </p>
                        <div className="bg-[#f0f4f8] rounded-xl p-4 mt-4">
                          <p className="text-sm text-gray-600 flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                            <span>
                              <strong>Important:</strong> Please read these Terms carefully. If you do not agree to these Terms, you may not access or use our Services.
                            </span>
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Definitions */}
                    <section id="definitions" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">2. Definitions</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          For the purposes of these Terms, the following terms shall have the meanings set forth below:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          {[
                            { term: '"Platform"', definition: 'Refers to the PastorCounsel website, mobile applications, and all related services.' },
                            { term: '"User"', definition: 'Any individual who accesses or uses the Platform, including those seeking counseling services.' },
                            { term: '"Pastor"', definition: 'A verified spiritual counselor who offers services through the Platform.' },
                            { term: '"Session"', definition: 'A scheduled counseling meeting between a User and a Pastor, conducted via video or chat.' },
                            { term: '"Content"', definition: 'All text, graphics, images, audio, video, and other materials available on the Platform.' },
                            { term: '"Account"', definition: 'Your personal account on the Platform, created during registration.' },
                          ].map((item, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                              <p className="font-semibold text-[#102a43]">{item.term}</p>
                              <p className="text-gray-600 text-sm mt-1">{item.definition}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Eligibility */}
                    <section id="eligibility" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">3. Eligibility</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">To use our Services, you must:</p>
                        <ul className="mt-4 space-y-2">
                          {[
                            'Be at least 18 years of age, or have parental/guardian consent if between 13-17 years old',
                            'Have the legal capacity to enter into a binding agreement',
                            'Not be prohibited from using the Services under applicable law',
                            'Provide accurate and complete registration information',
                            'Maintain the security of your account credentials',
                          ].map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-600">
                              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-[#102a43] text-white rounded-xl p-4 mt-4">
                          <p className="text-sm flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                            <span>
                              We reserve the right to refuse service, terminate accounts, or cancel bookings at our sole discretion.
                            </span>
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Account Registration */}
                    <section id="account" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">4. Account Registration</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          Creating an account is required to access certain features of the Platform. You agree to:
                        </p>
                        <div className="space-y-4 mt-4">
                          <div className="bg-white border-l-4 border-[#dc2626] p-4 rounded-r-lg">
                            <h4 className="font-semibold text-[#102a43] mb-2">Account Security</h4>
                            <p className="text-gray-600 text-sm">
                              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use or security breach.
                            </p>
                          </div>
                          <div className="bg-white border-l-4 border-[#102a43] p-4 rounded-r-lg">
                            <h4 className="font-semibold text-[#102a43] mb-2">Accurate Information</h4>
                            <p className="text-gray-600 text-sm">
                              You must provide accurate, current, and complete information during registration and keep it updated. We may suspend or terminate accounts with false or misleading information.
                            </p>
                          </div>
                          <div className="bg-white border-l-4 border-blue-500 p-4 rounded-r-lg">
                            <h4 className="font-semibold text-[#102a43] mb-2">One Account Per User</h4>
                            <p className="text-gray-600 text-sm">
                              You may only create one account per person. Creating multiple accounts or impersonating others is prohibited.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Our Services */}
                    <section id="services" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <HandHeart className="w-5 h-5 text-orange-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">5. Our Services</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          PastorCounsel provides a platform for faith-based spiritual counseling. Our services include:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          {[
                            { title: 'Video Counseling', description: 'Secure, face-to-face video sessions with verified pastors' },
                            { title: 'Chat Support', description: 'Text-based communication with pastors' },
                            { title: 'Session Scheduling', description: 'Easy booking system with calendar integration' },
                            { title: 'Pastor Directory', description: 'Browse and search verified pastors by specialty' },
                            { title: 'Secure Messaging', description: 'Encrypted communication platform' },
                            { title: 'Session History', description: 'Access records of past sessions and notes' },
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-[#f0f4f8] rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium text-[#102a43]">{item.title}</p>
                                <p className="text-sm text-gray-600">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                          <p className="text-sm text-amber-800 flex items-start gap-2">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <span>
                              <strong>Important Notice:</strong> Our services provide spiritual counseling and guidance, not clinical mental health treatment. If you are experiencing a mental health crisis, please contact emergency services or a licensed mental health professional.
                            </span>
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Booking & Sessions */}
                    <section id="booking" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-cyan-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">6. Booking & Sessions</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-[#102a43] mb-2">Booking Process</h4>
                            <p className="text-gray-600">
                              Users can book sessions through our Platform by selecting an available pastor, choosing a time slot, and completing payment. Bookings are confirmed upon successful payment processing.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#102a43] mb-2">Cancellation Policy</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="bg-[#102a43] text-white">
                                    <th className="text-left p-3 rounded-tl-lg">Notice Period</th>
                                    <th className="text-left p-3">Refund Amount</th>
                                    <th className="text-left p-3 rounded-tr-lg">Notes</th>
                                  </tr>
                                </thead>
                                <tbody className="text-gray-600">
                                  <tr className="border-b">
                                    <td className="p-3">24+ hours before</td>
                                    <td className="p-3 text-green-600 font-medium">100% refund</td>
                                    <td className="p-3">Full refund to original payment method</td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="p-3">12-24 hours before</td>
                                    <td className="p-3 text-amber-600 font-medium">50% refund</td>
                                    <td className="p-3">Partial refund, 50% goes to pastor</td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="p-3">Less than 12 hours</td>
                                    <td className="p-3 text-red-600 font-medium">No refund</td>
                                    <td className="p-3">Full amount goes to pastor</td>
                                  </tr>
                                  <tr>
                                    <td className="p-3">No-show</td>
                                    <td className="p-3 text-red-600 font-medium">No refund</td>
                                    <td className="p-3">Session marked as completed</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#102a43] mb-2">Session Conduct</h4>
                            <p className="text-gray-600">
                              All sessions must be conducted through our Platform. Recording sessions without consent is prohibited. Users must ensure a private, quiet environment during video sessions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Payments & Refunds */}
                    <section id="payments" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-yellow-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">7. Payments & Refunds</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-[#102a43] mb-2">Pricing</h4>
                            <p className="text-gray-600">
                              Session fees are set by individual pastors and displayed on their profiles. All prices are in USD unless otherwise specified. Prices may be updated by pastors at any time, but changes do not affect existing bookings.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#102a43] mb-2">Payment Processing</h4>
                            <p className="text-gray-600">
                              We use secure third-party payment processors. By making a payment, you authorize us to charge your chosen payment method. All transactions are encrypted and secure.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#102a43] mb-2">Service Fees</h4>
                            <p className="text-gray-600">
                              PastorCounsel charges a service fee on each transaction. This fee supports platform maintenance, payment processing, and customer support. The fee is included in the displayed price.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#102a43] mb-2">Refund Process</h4>
                            <p className="text-gray-600">
                              Approved refunds are processed within 5-10 business days to the original payment method. If you experience issues with a session, please contact support within 48 hours.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* User Conduct */}
                    <section id="conduct" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <Scale className="w-5 h-5 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">8. User Conduct</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600">Users agree NOT to:</p>
                        <div className="grid sm:grid-cols-2 gap-3 mt-4">
                          {[
                            'Use the Platform for any unlawful purpose',
                            'Harass, abuse, or threaten any user or pastor',
                            'Impersonate another person or entity',
                            'Share inappropriate or offensive content',
                            'Record sessions without consent',
                            'Attempt to circumvent security measures',
                            'Share account credentials with others',
                            'Solicit personal contact information from pastors',
                            'Use automated tools to access the Platform',
                            'Violate any applicable laws or regulations',
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-2 text-gray-600 text-sm bg-red-50 p-3 rounded-lg">
                              <span className="text-red-500 font-bold">✕</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Pastor Guidelines */}
                    <section id="pastors" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Building className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">9. Pastor Guidelines</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600">Pastors using the Platform must:</p>
                        <div className="space-y-4 mt-4">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-700 mb-2">Verification Requirements</h4>
                            <ul className="space-y-1 text-gray-600 text-sm">
                              <li>• Provide valid ordination or ministry credentials</li>
                              <li>• Complete background verification</li>
                              <li>• Submit to our pastoral advisory review</li>
                              <li>• Maintain current contact information</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-700 mb-2">Professional Standards</h4>
                            <ul className="space-y-1 text-gray-600 text-sm">
                              <li>• Maintain confidentiality of all sessions</li>
                              <li>• Provide services within area of expertise</li>
                              <li>• Respond to booking requests within 24 hours</li>
                              <li>• Maintain accurate availability calendar</li>
                            </ul>
                          </div>
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-700 mb-2">Prohibited Activities</h4>
                            <ul className="space-y-1 text-gray-600 text-sm">
                              <li>• Soliciting users outside the Platform</li>
                              <li>• Sharing personal contact information</li>
                              <li>• Providing clinical mental health treatment</li>
                              <li>• Discriminating based on any protected characteristic</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Intellectual Property */}
                    <section id="intellectual-property" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                          <Lock className="w-5 h-5 text-pink-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">10. Intellectual Property</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          All content on the Platform, including text, graphics, logos, icons, and software, is the property of PastorCounsel or its content suppliers and is protected by intellectual property laws.
                        </p>
                        <div className="bg-[#f0f4f8] rounded-xl p-4 mt-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-[#102a43] mb-2">Our Rights</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Platform design and branding</li>
                                <li>• Original content and materials</li>
                                <li>• Software and technical implementations</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-[#102a43] mb-2">Your Rights</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Content you create during sessions</li>
                                <li>• Your profile information</li>
                                <li>• Reviews and feedback you submit</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Privacy */}
                    <section id="privacy" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-teal-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">11. Privacy & Confidentiality</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          We take your privacy seriously. Our Privacy Policy, incorporated by reference, describes how we collect, use, and protect your personal information.
                        </p>
                        <div className="bg-[#102a43] text-white rounded-xl p-6 mt-4">
                          <h4 className="font-semibold mb-4">Key Privacy Commitments</h4>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {[
                              { icon: Lock, text: 'End-to-end encryption for all sessions' },
                              { icon: Shield, text: 'No recording of video sessions' },
                              { icon: Users, text: 'Pastors bound by confidentiality agreements' },
                              { icon: Globe, text: 'GDPR and CCPA compliant' },
                            ].map((item, index) => {
                              const Icon = item.icon;
                              return (
                                <div key={index} className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-[#dc2626] rounded-lg flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <span className="text-sm">{item.text}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="mt-4 border-[#102a43] text-[#102a43]"
                          onClick={() => onNavigate('privacy')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Read Full Privacy Policy
                        </Button>
                      </div>
                    </section>

                    <Separator />

                    {/* Disclaimers */}
                    <section id="disclaimers" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-amber-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">12. Disclaimers</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <div className="space-y-4">
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <h4 className="font-semibold text-amber-800 mb-2">Not Professional Mental Health Services</h4>
                            <p className="text-gray-600 text-sm">
                              PastorCounsel provides spiritual counseling services, not clinical mental health treatment, therapy, or medical advice. Our services are not a substitute for professional mental health care.
                            </p>
                          </div>
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <h4 className="font-semibold text-amber-800 mb-2">No Guarantees</h4>
                            <p className="text-gray-600 text-sm">
                              We do not guarantee specific outcomes from counseling sessions. Results vary based on individual circumstances and participation.
                            </p>
                          </div>
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <h4 className="font-semibold text-amber-800 mb-2">Platform Availability</h4>
                            <p className="text-gray-600 text-sm">
                              We do not guarantee uninterrupted access to the Platform. Scheduled maintenance and unforeseen technical issues may cause temporary outages.
                            </p>
                          </div>
                          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <h4 className="font-semibold text-amber-800 mb-2">Third-Party Content</h4>
                            <p className="text-gray-600 text-sm">
                              We are not responsible for third-party content, links, or services that may be accessible through the Platform.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Limitation of Liability */}
                    <section id="limitation" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <Gavel className="w-5 h-5 text-slate-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">13. Limitation of Liability</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          To the fullest extent permitted by law, PastorCounsel and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses.
                        </p>
                        <div className="bg-[#f0f4f8] rounded-xl p-4 mt-4">
                          <p className="text-sm text-gray-600">
                            <strong>Maximum Liability:</strong> Our total liability for any claim arising from your use of the Platform shall not exceed the amount you paid to PastorCounsel in the twelve (12) months preceding the claim.
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Termination */}
                    <section id="termination" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                          <RefreshCw className="w-5 h-5 text-rose-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">14. Termination</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-[#102a43] mb-2">By You</h4>
                            <p className="text-gray-600">
                              You may terminate your account at any time through your account settings. Upon termination, you will lose access to your account, session history, and any saved information.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#102a43] mb-2">By Us</h4>
                            <p className="text-gray-600">
                              We may suspend or terminate your account at any time for violation of these Terms, fraudulent activity, or at our discretion. We will provide notice where possible.
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#102a43] mb-2">Effects of Termination</h4>
                            <p className="text-gray-600">
                              Upon termination, your right to use the Platform ceases immediately. Provisions that by their nature should survive termination shall remain in effect.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Dispute Resolution */}
                    <section id="disputes" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                          <Scale className="w-5 h-5 text-violet-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">15. Dispute Resolution</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <div className="space-y-4">
                          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                            <h4 className="font-semibold text-violet-700 mb-2">1. Informal Resolution</h4>
                            <p className="text-gray-600 text-sm">
                              In the event of a dispute, please contact our support team first. We will make good faith efforts to resolve the matter informally within 30 days.
                            </p>
                          </div>
                          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                            <h4 className="font-semibold text-violet-700 mb-2">2. Mediation</h4>
                            <p className="text-gray-600 text-sm">
                              If informal resolution fails, disputes shall be submitted to binding arbitration in accordance with the rules of the American Arbitration Association.
                            </p>
                          </div>
                          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                            <h4 className="font-semibold text-violet-700 mb-2">3. Governing Law</h4>
                            <p className="text-gray-600 text-sm">
                              These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Changes to Terms */}
                    <section id="changes" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                          <Bell className="w-5 h-5 text-sky-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">16. Changes to Terms</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the Platform. Your continued use after changes constitutes acceptance.
                        </p>
                        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 mt-4">
                          <p className="text-gray-600 text-sm flex items-start gap-2">
                            <Bell className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                            <span>
                              <strong>Notification:</strong> We will notify users of material changes via email and/or Platform notification at least 30 days before they take effect.
                            </span>
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Contact Information */}
                    <section id="contact" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#dc2626]/10 rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5 text-[#dc2626]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">17. Contact Information</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          If you have questions about these Terms, please contact us:
                        </p>
                        <div className="grid sm:grid-cols-3 gap-4 mt-4">
                          <Card className="border-none shadow-md">
                            <CardContent className="p-4 text-center">
                              <Mail className="w-8 h-8 text-[#dc2626] mx-auto mb-2" />
                              <p className="font-semibold text-[#102a43]">Email</p>
                              <a href="mailto:legal@pastorcounsel.org" className="text-[#dc2626] text-sm hover:underline">
                                legal@pastorcounsel.org
                              </a>
                            </CardContent>
                          </Card>
                          <Card className="border-none shadow-md">
                            <CardContent className="p-4 text-center">
                              <Phone className="w-8 h-8 text-[#102a43] mx-auto mb-2" />
                              <p className="font-semibold text-[#102a43]">Phone</p>
                              <a href="tel:+15551234567" className="text-[#dc2626] text-sm hover:underline">
                                +1 (555) 123-4567
                              </a>
                            </CardContent>
                          </Card>
                          <Card className="border-none shadow-md">
                            <CardContent className="p-4 text-center">
                              <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                              <p className="font-semibold text-[#102a43]">Address</p>
                              <p className="text-gray-600 text-sm">
                                123 Ministry Way<br />Dallas, TX 75001
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </section>

                    {/* Final Section - Acceptance */}
                    <div className="bg-gradient-to-r from-[#102a43] to-[#243b53] rounded-2xl p-8 text-white text-center mt-8">
                      <CheckCircle className="w-12 h-12 text-[#dc2626] mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Agreement Acceptance</h3>
                      <p className="text-gray-300 mb-4">
                        By using the PastorCounsel Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                      </p>
                      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
                        <span>Last Updated: January 15, 2024</span>
                        <span>•</span>
                        <span>Version 2.1</span>
                        <span>•</span>
                        <span>Effective Immediately</span>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Floating Scroll to Top */}
      <Button
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#102a43] hover:bg-[#243b53] text-white shadow-lg"
        onClick={scrollToTop}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>
  );
}
