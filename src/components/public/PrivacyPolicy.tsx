'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Shield,
  Lock,
  Eye,
  Database,
  Share2,
  Cookie,
  UserCheck,
  Clock,
  Globe,
  Bell,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  FileText,
  Server,
  Key,
  Fingerprint,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
  Users,
  Building,
  CreditCard,
  Video,
  MessageSquare,
  ChevronRight,
  Calendar,
  Download,
  Printer,
  ShieldCheck,
  ShieldAlert,
  FileSearch,
  Trash2,
  DownloadCloud,
  HandMetal,
  Baby,
  Plane,
  Scale,
  Heart,
} from 'lucide-react';
import { PageState } from '@/types';

interface PrivacyPolicyProps {
  onNavigate: (page: PageState) => void;
}

const tableOfContents = [
  { id: 'introduction', title: 'Introduction', icon: FileText },
  { id: 'information-collect', title: 'Information We Collect', icon: Database },
  { id: 'how-we-use', title: 'How We Use Information', icon: Eye },
  { id: 'information-share', title: 'Information Sharing', icon: Share2 },
  { id: 'cookies', title: 'Cookies & Tracking', icon: Cookie },
  { id: 'data-security', title: 'Data Security', icon: Lock },
  { id: 'session-privacy', title: 'Session Privacy', icon: Video },
  { id: 'user-rights', title: 'Your Privacy Rights', icon: UserCheck },
  { id: 'data-retention', title: 'Data Retention', icon: Clock },
  { id: 'children', title: "Children's Privacy", icon: Baby },
  { id: 'international', title: 'International Transfers', icon: Plane },
  { id: 'third-party', title: 'Third-Party Services', icon: Building },
  { id: 'your-choices', title: 'Your Choices', icon: HandMetal },
  { id: 'changes', title: 'Policy Changes', icon: Bell },
  { id: 'contact', title: 'Contact Us', icon: Mail },
];

const dataTypesCollected = [
  {
    category: 'Account Information',
    icon: UserCheck,
    color: 'bg-blue-100 text-blue-600',
    items: ['Full name', 'Email address', 'Phone number', 'Password (encrypted)', 'Profile photo'],
  },
  {
    category: 'Session Data',
    icon: Video,
    color: 'bg-green-100 text-green-600',
    items: ['Booking history', 'Session notes (optional)', 'Pastor feedback', 'Session duration'],
  },
  {
    category: 'Payment Information',
    icon: CreditCard,
    color: 'bg-yellow-100 text-yellow-600',
    items: ['Billing address', 'Payment method (last 4 digits)', 'Transaction history', 'Refund records'],
  },
  {
    category: 'Communication Data',
    icon: MessageSquare,
    color: 'bg-purple-100 text-purple-600',
    items: ['Chat messages (encrypted)', 'Support tickets', 'Email correspondence', 'Feedback submissions'],
  },
  {
    category: 'Device Information',
    icon: Server,
    color: 'bg-pink-100 text-pink-600',
    items: ['IP address', 'Browser type', 'Device type', 'Operating system'],
  },
  {
    category: 'Usage Data',
    icon: Eye,
    color: 'bg-cyan-100 text-cyan-600',
    items: ['Pages visited', 'Features used', 'Time spent', 'Search queries'],
  },
];

const userRights = [
  {
    right: 'Access',
    icon: Eye,
    description: 'Request a copy of all personal data we hold about you',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    right: 'Correction',
    icon: FileText,
    description: 'Update or correct any inaccurate personal information',
    color: 'bg-green-50 border-green-200',
  },
  {
    right: 'Deletion',
    icon: Trash2,
    description: 'Request deletion of your data (subject to legal requirements)',
    color: 'bg-red-50 border-red-200',
  },
  {
    right: 'Portability',
    icon: DownloadCloud,
    description: 'Export your data in a machine-readable format',
    color: 'bg-purple-50 border-purple-200',
  },
  {
    right: 'Objection',
    icon: HandMetal,
    description: 'Object to certain processing of your personal data',
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    right: 'Restriction',
    icon: Lock,
    description: 'Request restriction of processing in certain circumstances',
    color: 'bg-pink-50 border-pink-200',
  },
];

export function PrivacyPolicy({ onNavigate }: PrivacyPolicyProps) {
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
          <div className="absolute top-10 right-10 w-72 h-72 bg-[#dc2626] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#dc2626] rounded-full blur-[150px] opacity-15" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#dc2626]/20 text-[#fca5a5] border-[#dc2626]/30 px-4 py-2 text-sm mb-6" data-aos="fade-down">
              <Shield className="w-4 h-4 mr-2" />
              Your Privacy Matters
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-up">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 mb-6" data-aos="fade-up" data-aos-delay="100">
              We are committed to protecting your personal information and your right to privacy.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Last Updated: January 15, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                <span>Version 2.3</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Global Policy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary Banner */}
      <section className="bg-[#dc2626] text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span>End-to-End Encrypted Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span>No Session Recordings</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>Transparent Data Practices</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              <span>GDPR & CCPA Compliant</span>
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
                      <FileSearch className="w-4 h-4" />
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

              {/* Quick Contact */}
              <Card className="mt-4 border-none shadow-lg">
                <CardContent className="p-4 bg-[#f0f4f8]">
                  <p className="text-sm font-semibold text-[#102a43] mb-2">Privacy Questions?</p>
                  <p className="text-xs text-gray-600 mb-3">
                    Contact our Data Protection Officer for any privacy concerns.
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-[#dc2626] hover:bg-[#b91c1c]"
                    onClick={() => onNavigate('contact')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact DPO
                  </Button>
                </CardContent>
              </Card>
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
                          <FileText className="w-5 h-5 text-[#dc2626]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">1. Introduction</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          PastorCounsel ("we," "our," "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our counseling platform and related services.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-4">
                          We understand that seeking spiritual counseling often involves sharing deeply personal matters. We take this responsibility seriously and have designed our privacy practices to honor the trust you place in us.
                        </p>
                        <div className="bg-[#f0f4f8] rounded-xl p-4 mt-4">
                          <p className="text-sm text-gray-600 flex items-start gap-2">
                            <Shield className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                            <span>
                              <strong>Our Privacy Commitment:</strong> We will never sell your personal data, we will never record your counseling sessions, and we will always be transparent about how your information is used.
                            </span>
                          </p>
                        </div>
                        <p className="text-gray-600 leading-relaxed mt-4">
                          Please read this Privacy Policy carefully. By using our Services, you consent to the practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access or use the Services.
                        </p>
                      </div>
                    </section>

                    <Separator />

                    {/* Information We Collect */}
                    <section id="information-collect" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Database className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">2. Information We Collect</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          We collect information that you provide directly to us, as well as information that is collected automatically when you use our Services.
                        </p>
                        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                          {dataTypesCollected.map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                                <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mb-3`}>
                                  <Icon className="w-5 h-5" />
                                </div>
                                <h4 className="font-semibold text-[#102a43] mb-2">{item.category}</h4>
                                <ul className="space-y-1">
                                  {item.items.map((listItem, i) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                      <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                                      {listItem}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
                          <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Sensitive Information
                          </h4>
                          <p className="text-gray-600 text-sm">
                            During counseling sessions, you may share sensitive personal information. We treat this information with the highest level of confidentiality. Session content is not stored on our servers, and pastors are bound by strict confidentiality agreements.
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* How We Use Information */}
                    <section id="how-we-use" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Eye className="w-5 h-5 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">3. How We Use Your Information</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          We use the information we collect for the following purposes:
                        </p>
                        
                        <div className="space-y-4 mt-4">
                          <div className="bg-white border-l-4 border-[#dc2626] p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-[#102a43] mb-2">Service Delivery</h4>
                            <p className="text-gray-600 text-sm">
                              To provide, maintain, and improve our counseling services, including connecting you with pastors, processing payments, and managing your sessions.
                            </p>
                          </div>
                          
                          <div className="bg-white border-l-4 border-[#102a43] p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-[#102a43] mb-2">Communication</h4>
                            <p className="text-gray-600 text-sm">
                              To send you booking confirmations, session reminders, security alerts, and respond to your inquiries and support requests.
                            </p>
                          </div>
                          
                          <div className="bg-white border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-[#102a43] mb-2">Safety & Security</h4>
                            <p className="text-gray-600 text-sm">
                              To protect against fraudulent activity, ensure platform security, and maintain a safe environment for all users and pastors.
                            </p>
                          </div>
                          
                          <div className="bg-white border-l-4 border-purple-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-[#102a43] mb-2">Platform Improvement</h4>
                            <p className="text-gray-600 text-sm">
                              To analyze usage patterns, develop new features, and improve user experience while maintaining your privacy.
                            </p>
                          </div>
                          
                          <div className="bg-white border-l-4 border-yellow-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-[#102a43] mb-2">Legal Compliance</h4>
                            <p className="text-gray-600 text-sm">
                              To comply with applicable laws, regulations, legal processes, and enforce our agreements with users.
                            </p>
                          </div>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
                          <p className="text-sm text-green-800 flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <span>
                              <strong>We do NOT:</strong> Sell your personal data, use session content for advertising, share your information with third parties for marketing purposes, or profile you for discriminatory purposes.
                            </span>
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Information Sharing */}
                    <section id="information-share" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Share2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">4. Information Sharing</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          We respect your privacy and will only share your information in the following limited circumstances:
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </div>
                              <h4 className="font-semibold text-[#102a43]">With Your Consent</h4>
                            </div>
                            <p className="text-gray-600 text-sm">We share information with pastors you book sessions with to facilitate your counseling experience.</p>
                          </div>
                          
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Building className="w-4 h-4 text-blue-600" />
                              </div>
                              <h4 className="font-semibold text-[#102a43]">Service Providers</h4>
                            </div>
                            <p className="text-gray-600 text-sm">We use trusted third-party vendors for payment processing, cloud hosting, and customer support.</p>
                          </div>
                          
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Scale className="w-4 h-4 text-yellow-600" />
                              </div>
                              <h4 className="font-semibold text-[#102a43]">Legal Requirements</h4>
                            </div>
                            <p className="text-gray-600 text-sm">When required by law, court order, or to protect rights, safety, and property.</p>
                          </div>
                          
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Shield className="w-4 h-4 text-purple-600" />
                              </div>
                              <h4 className="font-semibold text-[#102a43]">Business Transfers</h4>
                            </div>
                            <p className="text-gray-600 text-sm">In connection with a merger, acquisition, or sale of assets, with commitment to honor your privacy.</p>
                          </div>
                        </div>

                        <div className="bg-[#102a43] text-white rounded-xl p-4 mt-4">
                          <p className="text-sm flex items-start gap-2">
                            <XCircle className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                            <span>
                              <strong>We will NEVER sell your personal information</strong> to third parties for marketing or any other purpose. Your data is not our product.
                            </span>
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Cookies & Tracking */}
                    <section id="cookies" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                          <Cookie className="w-5 h-5 text-amber-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">5. Cookies & Tracking Technologies</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          We use cookies and similar tracking technologies to collect and track information and to improve our Services. Here&apos;s how we use them:
                        </p>
                        
                        <div className="overflow-x-auto mt-4">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-[#102a43] text-white">
                                <th className="text-left p-3 rounded-tl-lg">Cookie Type</th>
                                <th className="text-left p-3">Purpose</th>
                                <th className="text-left p-3 rounded-tr-lg">Duration</th>
                              </tr>
                            </thead>
                            <tbody className="text-gray-600">
                              <tr className="border-b">
                                <td className="p-3 font-medium">Essential</td>
                                <td className="p-3">Authentication, security, core functionality</td>
                                <td className="p-3">Session</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3 font-medium">Functional</td>
                                <td className="p-3">Remember preferences, language settings</td>
                                <td className="p-3">1 year</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3 font-medium">Analytics</td>
                                <td className="p-3">Understand usage, improve services</td>
                                <td className="p-3">2 years</td>
                              </tr>
                              <tr>
                                <td className="p-3 font-medium">Marketing</td>
                                <td className="p-3">Relevant advertisements (opt-in only)</td>
                                <td className="p-3">90 days</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                          <h4 className="font-semibold text-blue-800 mb-2">Managing Cookies</h4>
                          <p className="text-gray-600 text-sm">
                            You can control cookies through your browser settings. Note that disabling certain cookies may affect your ability to use some features of our platform. You can also opt out of Google Analytics using the <a href="#" className="text-[#dc2626] hover:underline">Google Analytics Opt-out Browser Add-on</a>.
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Data Security */}
                    <section id="data-security" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <Lock className="w-5 h-5 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">6. Data Security</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          We implement robust security measures to protect your personal information:
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          <div className="bg-gradient-to-br from-[#102a43] to-[#243b53] text-white rounded-xl p-4">
                            <Key className="w-8 h-8 text-[#dc2626] mb-3" />
                            <h4 className="font-semibold mb-2">Encryption</h4>
                            <p className="text-sm text-gray-300">
                              All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.
                            </p>
                          </div>
                          
                          <div className="bg-gradient-to-br from-[#dc2626] to-[#b91c1c] text-white rounded-xl p-4">
                            <Fingerprint className="w-8 h-8 text-white mb-3" />
                            <h4 className="font-semibold mb-2">Access Control</h4>
                            <p className="text-sm text-red-100">
                              Strict role-based access controls limit who can access your data and why.
                            </p>
                          </div>
                          
                          <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl p-4">
                            <Server className="w-8 h-8 text-green-200 mb-3" />
                            <h4 className="font-semibold mb-2">Secure Infrastructure</h4>
                            <p className="text-sm text-green-100">
                              Hosted on SOC 2 Type II certified cloud infrastructure with regular audits.
                            </p>
                          </div>
                          
                          <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl p-4">
                            <ShieldCheck className="w-8 h-8 text-purple-200 mb-3" />
                            <h4 className="font-semibold mb-2">Regular Audits</h4>
                            <p className="text-sm text-purple-100">
                              Third-party security assessments and penetration testing quarterly.
                            </p>
                          </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                          <p className="text-sm text-amber-800 flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                            <span>
                              <strong>Important:</strong> While we implement strong security measures, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security, but we continuously work to protect your data.
                            </span>
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Session Privacy */}
                    <section id="session-privacy" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Video className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">7. Session Privacy & Confidentiality</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          Your counseling sessions are sacred. We have implemented special privacy protections:
                        </p>
                        
                        <div className="bg-gradient-to-r from-[#102a43] via-[#243b53] to-[#102a43] text-white rounded-xl p-6 mt-4">
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-[#dc2626]" />
                            Our Confidentiality Commitment
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#dc2626] rounded-lg flex items-center justify-center shrink-0">
                                <Video className="w-4 h-4" />
                              </div>
                              <span className="text-sm">No video session recordings</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#dc2626] rounded-lg flex items-center justify-center shrink-0">
                                <MessageSquare className="w-4 h-4" />
                              </div>
                              <span className="text-sm">End-to-end encrypted chat</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#dc2626] rounded-lg flex items-center justify-center shrink-0">
                                <Users className="w-4 h-4" />
                              </div>
                              <span className="text-sm">Pastor confidentiality agreements</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#dc2626] rounded-lg flex items-center justify-center shrink-0">
                                <Lock className="w-4 h-4" />
                              </div>
                              <span className="text-sm">No third-party session access</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mt-4">
                          <h4 className="font-semibold text-indigo-800 mb-2">Pastor Confidentiality</h4>
                          <p className="text-gray-600 text-sm">
                            All pastors on our platform are required to sign confidentiality agreements and adhere to strict ethical guidelines. They are prohibited from disclosing any session content without your explicit consent, except where required by law (e.g., imminent harm to self or others).
                          </p>
                        </div>

                        <div className="bg-[#f0f4f8] rounded-xl p-4 mt-4">
                          <h4 className="font-semibold text-[#102a43] mb-2">Session Data We DO NOT Collect:</h4>
                          <ul className="grid sm:grid-cols-2 gap-2 mt-2">
                            {[
                              'Video recordings of sessions',
                              'Audio recordings of sessions',
                              'Transcripts of conversations',
                              'Notes taken during sessions',
                              'Screen captures or screenshots',
                              'Biometric data',
                            ].map((item, index) => (
                              <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Your Privacy Rights */}
                    <section id="user-rights" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <UserCheck className="w-5 h-5 text-teal-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">8. Your Privacy Rights</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          Depending on your location, you may have certain rights regarding your personal information:
                        </p>
                        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                          {userRights.map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <div key={index} className={`${item.color} border rounded-xl p-4`}>
                                <Icon className="w-6 h-6 mb-2" />
                                <h4 className="font-semibold text-[#102a43] mb-1">{item.right}</h4>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                              </div>
                            );
                          })}
                        </div>

                        <div className="bg-[#102a43] text-white rounded-xl p-6 mt-4">
                          <h4 className="font-semibold mb-4">Regional Rights</h4>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-300 font-medium mb-2">GDPR (European Users)</p>
                              <ul className="text-sm text-gray-400 space-y-1">
                                <li>• Right to be informed</li>
                                <li>• Right of access</li>
                                <li>• Right to rectification</li>
                                <li>• Right to erasure</li>
                                <li>• Right to data portability</li>
                              </ul>
                            </div>
                            <div>
                              <p className="text-sm text-gray-300 font-medium mb-2">CCPA (California Users)</p>
                              <ul className="text-sm text-gray-400 space-y-1">
                                <li>• Right to know</li>
                                <li>• Right to delete</li>
                                <li>• Right to opt-out of sale</li>
                                <li>• Right to non-discrimination</li>
                                <li>• Right to equal service</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mt-4">
                          <h4 className="font-semibold text-teal-800 mb-2">How to Exercise Your Rights</h4>
                          <p className="text-gray-600 text-sm">
                            To exercise any of these rights, please contact us at <a href="mailto:privacy@pastorcounsel.org" className="text-[#dc2626] hover:underline">privacy@pastorcounsel.org</a> or through your account settings. We will respond within 30 days. You may also submit a request through our <Button variant="link" className="h-auto p-0 text-[#dc2626]" onClick={() => onNavigate('contact')}>contact form</Button>.
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Data Retention */}
                    <section id="data-retention" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-cyan-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">9. Data Retention</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          We retain your personal information for as long as necessary to provide our services and comply with legal obligations:
                        </p>
                        
                        <div className="overflow-x-auto mt-4">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-[#102a43] text-white">
                                <th className="text-left p-3 rounded-tl-lg">Data Type</th>
                                <th className="text-left p-3">Retention Period</th>
                                <th className="text-left p-3 rounded-tr-lg">Reason</th>
                              </tr>
                            </thead>
                            <tbody className="text-gray-600">
                              <tr className="border-b">
                                <td className="p-3">Account Information</td>
                                <td className="p-3">Duration of account + 3 years</td>
                                <td className="p-3">Account management, legal compliance</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3">Session History</td>
                                <td className="p-3">7 years</td>
                                <td className="p-3">Tax and legal requirements</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3">Payment Records</td>
                                <td className="p-3">7 years</td>
                                <td className="p-3">Financial regulations</td>
                              </tr>
                              <tr className="border-b">
                                <td className="p-3">Chat Messages</td>
                                <td className="p-3">30 days after session</td>
                                <td className="p-3">User convenience</td>
                              </tr>
                              <tr>
                                <td className="p-3">Usage Analytics</td>
                                <td className="p-3">2 years (anonymized after)</td>
                                <td className="p-3">Service improvement</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <p className="text-gray-600 leading-relaxed mt-4">
                          When you delete your account, we will delete or anonymize your personal information within 30 days, except where retention is required by law. Some data may be retained in backup systems for up to 90 days.
                        </p>
                      </div>
                    </section>

                    <Separator />

                    {/* Children's Privacy */}
                    <section id="children" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                          <Baby className="w-5 h-5 text-pink-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">10. Children&apos;s Privacy</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 mb-4">
                          <h4 className="font-semibold text-pink-800 mb-2">Age Requirements</h4>
                          <p className="text-gray-600 text-sm">
                            Our Services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                          </p>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed">
                          For users between 13 and 17 years old, we require parental or guardian consent before they can create an account or use our counseling services. We verify this consent through:
                        </p>
                        
                        <ul className="mt-4 space-y-2">
                          {[
                            'Parental email verification',
                            'Credit card verification (as proof of adult consent)',
                            'Parental consent form signed electronically',
                            'Right to request proof of consent at any time',
                          ].map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-600">
                              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                          <p className="text-sm text-amber-800 flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                            <span>
                              If you believe we have collected information from a child under 13, please contact us immediately at <a href="mailto:privacy@pastorcounsel.org" className="text-[#dc2626] hover:underline">privacy@pastorcounsel.org</a>. We will promptly delete such information.
                            </span>
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* International Transfers */}
                    <section id="international" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                          <Plane className="w-5 h-5 text-sky-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">11. International Data Transfers</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place:
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <Globe className="w-8 h-8 text-sky-600 mb-3" />
                            <h4 className="font-semibold text-[#102a43] mb-2">Data Transfer Mechanisms</h4>
                            <ul className="text-gray-600 text-sm space-y-1">
                              <li>• EU Standard Contractual Clauses</li>
                              <li>• EU-US Data Privacy Framework</li>
                              <li>• Adequacy decisions where applicable</li>
                              <li>• Binding Corporate Rules</li>
                            </ul>
                          </div>
                          
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <Shield className="w-8 h-8 text-green-600 mb-3" />
                            <h4 className="font-semibold text-[#102a43] mb-2">Protections Applied</h4>
                            <ul className="text-gray-600 text-sm space-y-1">
                              <li>• Same level of protection as home country</li>
                              <li>• Encrypted data transfer</li>
                              <li>• Regular compliance audits</li>
                              <li>• Transparent data location</li>
                            </ul>
                          </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed mt-4">
                          Our primary data processing locations are the United States. We maintain detailed records of where your data is processed and can provide this information upon request.
                        </p>
                      </div>
                    </section>

                    <Separator />

                    {/* Third-Party Services */}
                    <section id="third-party" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Building className="w-5 h-5 text-orange-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">12. Third-Party Services</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          We use trusted third-party services to operate our platform. These providers have access to limited personal information and are bound by strict confidentiality obligations:
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          {[
                            { name: 'Payment Processing', purpose: 'Stripe - Secure payment handling', data: 'Billing info, payment details' },
                            { name: 'Cloud Hosting', purpose: 'AWS - Secure infrastructure', data: 'All platform data (encrypted)' },
                            { name: 'Video Services', purpose: 'WebRTC - Real-time video', data: 'Video streams (not stored)' },
                            { name: 'Email Services', purpose: 'SendGrid - Transactional emails', data: 'Email address, email content' },
                            { name: 'Analytics', purpose: 'Google Analytics - Usage insights', data: 'Anonymized usage data' },
                            { name: 'Customer Support', purpose: 'Intercom - Support chat', data: 'Support conversations' },
                          ].map((item, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-xl p-4">
                              <h4 className="font-semibold text-[#102a43] mb-1">{item.name}</h4>
                              <p className="text-sm text-gray-600 mb-2">{item.purpose}</p>
                              <p className="text-xs text-gray-400">Data accessed: {item.data}</p>
                            </div>
                          ))}
                        </div>

                        <p className="text-gray-600 leading-relaxed mt-4">
                          We carefully vet all third-party providers and require them to maintain appropriate security measures. We do not share more information than necessary for each service.
                        </p>
                      </div>
                    </section>

                    <Separator />

                    {/* Your Choices */}
                    <section id="your-choices" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                          <HandMetal className="w-5 h-5 text-violet-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">13. Your Choices</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          You have control over your personal information and how it&apos;s used:
                        </p>
                        
                        <div className="space-y-4 mt-4">
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h4 className="font-semibold text-[#102a43] mb-2 flex items-center gap-2">
                              <Bell className="w-5 h-5 text-violet-600" />
                              Marketing Communications
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              You can opt out of marketing emails at any time by clicking the unsubscribe link or updating your preferences in your account settings.
                            </p>
                            <Button variant="outline" size="sm" className="border-[#102a43] text-[#102a43]">
                              Manage Email Preferences
                            </Button>
                          </div>
                          
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h4 className="font-semibold text-[#102a43] mb-2 flex items-center gap-2">
                              <Eye className="w-5 h-5 text-violet-600" />
                              Profile Visibility
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              Control what information is visible on your profile. You can hide your profile from search results or make it private.
                            </p>
                            <Button variant="outline" size="sm" className="border-[#102a43] text-[#102a43]">
                              Privacy Settings
                            </Button>
                          </div>
                          
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h4 className="font-semibold text-[#102a43] mb-2 flex items-center gap-2">
                              <Cookie className="w-5 h-5 text-violet-600" />
                              Cookie Preferences
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              Manage which cookies you accept. Essential cookies are required for the platform to function.
                            </p>
                            <Button variant="outline" size="sm" className="border-[#102a43] text-[#102a43]">
                              Cookie Settings
                            </Button>
                          </div>
                          
                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                            <h4 className="font-semibold text-[#102a43] mb-2 flex items-center gap-2">
                              <Trash2 className="w-5 h-5 text-red-600" />
                              Account Deletion
                            </h4>
                            <p className="text-gray-600 text-sm mb-3">
                              You can delete your account at any time. This will remove your personal information and session history.
                            </p>
                            <Button variant="destructive" size="sm">
                              Delete Account
                            </Button>
                          </div>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Policy Changes */}
                    <section id="changes" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-lime-100 rounded-lg flex items-center justify-center">
                          <Bell className="w-5 h-5 text-lime-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">14. Changes to This Policy</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          We may update this Privacy Policy from time to time. We will notify you of any changes by:
                        </p>
                        
                        <ul className="mt-4 space-y-2">
                          {[
                            'Posting the new Privacy Policy on this page',
                            'Updating the "Last Updated" date at the top',
                            'Sending you an email notification for material changes',
                            'Providing in-app notification for significant changes',
                          ].map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-600">
                              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="bg-lime-50 border border-lime-200 rounded-xl p-4 mt-4">
                          <h4 className="font-semibold text-lime-800 mb-2">Review Period</h4>
                          <p className="text-gray-600 text-sm">
                            For significant changes, we will provide at least 30 days notice before the new policy takes effect. Your continued use of our Services after the effective date constitutes acceptance of the updated policy.
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* Contact Us */}
                    <section id="contact" className="scroll-mt-24">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#dc2626]/10 rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5 text-[#dc2626]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#102a43]">15. Contact Us</h2>
                      </div>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-600 leading-relaxed">
                          If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-4 mt-4">
                          <Card className="border-none shadow-md">
                            <CardContent className="p-6 bg-gradient-to-br from-[#102a43] to-[#243b53] text-white">
                              <h4 className="font-semibold mb-4">Data Protection Officer</h4>
                              <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3">
                                  <Mail className="w-4 h-4 text-[#dc2626]" />
                                  <span>dpo@pastorcounsel.org</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Phone className="w-4 h-4 text-[#dc2626]" />
                                  <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <MapPin className="w-4 h-4 text-[#dc2626] mt-1" />
                                  <span>123 Ministry Way<br />Dallas, TX 75001</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-none shadow-md">
                            <CardContent className="p-6 bg-[#f0f4f8]">
                              <h4 className="font-semibold text-[#102a43] mb-4">General Inquiries</h4>
                              <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex items-center gap-3">
                                  <Mail className="w-4 h-4 text-[#dc2626]" />
                                  <span>privacy@pastorcounsel.org</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Phone className="w-4 h-4 text-[#dc2626]" />
                                  <span>+1 (555) 987-6543</span>
                                </div>
                                <div className="flex items-start gap-3">
                                  <Clock className="w-4 h-4 text-[#dc2626] mt-1" />
                                  <span>Mon-Fri: 9AM - 6PM CST<br />Response within 48 hours</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6 mt-4">
                          <h4 className="font-semibold text-[#102a43] mb-4">Submit a Privacy Request</h4>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <Button 
                              className="bg-[#102a43] hover:bg-[#243b53]"
                              onClick={() => onNavigate('contact')}
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Contact Form
                            </Button>
                            <Button 
                              variant="outline" 
                              className="border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626] hover:text-white"
                            >
                              <FileSearch className="w-4 h-4 mr-2" />
                              Data Access Request
                            </Button>
                          </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                          <h4 className="font-semibold text-amber-800 mb-2">Supervisory Authority</h4>
                          <p className="text-gray-600 text-sm">
                            EU residents have the right to lodge a complaint with their local supervisory authority. For a list of EU data protection authorities, visit the <a href="#" className="text-[#dc2626] hover:underline">European Data Protection Board website</a>.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Footer */}
                    <div className="pt-8 border-t">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="text-sm text-gray-500">
                          <p>© 2024 PastorCounsel. All rights reserved.</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Button 
                            variant="link" 
                            className="text-[#102a43] p-0 h-auto"
                            onClick={() => onNavigate('terms')}
                          >
                            Terms of Service
                          </Button>
                          <Button 
                            variant="link" 
                            className="text-[#102a43] p-0 h-auto"
                            onClick={() => onNavigate('contact')}
                          >
                            Contact Us
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Back to Top Button */}
            <div className="fixed bottom-8 right-8 z-50">
              <Button
                size="icon"
                className="rounded-full bg-[#dc2626] hover:bg-[#b91c1c] shadow-lg"
                onClick={scrollToTop}
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
