'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
  ChevronRight,
  BookOpen,
  CreditCard,
  Users,
  Shield,
  Video,
  Calendar,
  Clock,
  Star,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Globe,
  Lock,
  Heart,
  UserCheck,
  FileText,
  Settings,
  Bell,
} from 'lucide-react';
import { PageState } from '@/types';

interface FAQProps {
  onNavigate: (page: PageState) => void;
}

const faqCategories = [
  {
    id: 'general',
    name: 'General',
    icon: HelpCircle,
    description: 'Basic questions about our platform',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'booking',
    name: 'Booking & Sessions',
    icon: Calendar,
    description: 'Scheduling and session questions',
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 'payment',
    name: 'Payments',
    icon: CreditCard,
    description: 'Billing and payment inquiries',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 'pastors',
    name: 'Pastors',
    icon: Users,
    description: 'Questions about our pastors',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'technical',
    name: 'Technical',
    icon: Settings,
    description: 'Platform and technical support',
    color: 'bg-red-100 text-red-600',
  },
  {
    id: 'privacy',
    name: 'Privacy & Security',
    icon: Shield,
    description: 'Data protection questions',
    color: 'bg-indigo-100 text-indigo-600',
  },
];

const faqData = {
  general: [
    {
      question: 'What is PastorCounsel?',
      answer: 'PastorCounsel is a faith-based online counseling platform that connects individuals seeking spiritual guidance with verified pastors and counselors. We offer video counseling sessions, secure messaging, and a supportive community for those on their spiritual journey. Our platform makes quality spiritual care accessible to anyone, anywhere in the world.',
    },
    {
      question: 'How does online pastoral counseling work?',
      answer: 'Our platform makes it easy to connect with a pastor from anywhere. Simply create an account, browse our directory of verified pastors, and book a session at a time that works for you. All sessions are conducted via secure video conferencing directly on our platform—no additional software needed. You can also message your pastor before and after sessions.',
    },
    {
      question: 'Is PastorCounsel available worldwide?',
      answer: 'Yes! PastorCounsel is available globally. We have pastors from various countries who speak multiple languages. You can filter pastors by language and time zone to find someone who can serve you effectively. Our platform is accessible 24/7, allowing you to book sessions regardless of your location.',
    },
    {
      question: 'What types of counseling do you offer?',
      answer: 'We offer a wide range of faith-based counseling services including: Marriage Counseling, Family Counseling, Trauma & Healing, Deliverance Ministry, Prayer & Intercession, Youth Counseling, Grief & Loss, Addiction Recovery, Pre-marital Counseling, and Spiritual Direction. Each pastor specializes in specific areas, so you can find the right fit for your needs.',
    },
    {
      question: 'Is this a replacement for professional mental health treatment?',
      answer: 'No, PastorCounsel provides spiritual counseling and guidance, not clinical mental health treatment. While our pastors are trained in pastoral care, our services are not a substitute for professional therapy, psychiatry, or medical treatment. If you are experiencing a mental health crisis, please contact emergency services or a licensed mental health professional.',
    },
    {
      question: 'Do I need to be religious to use PastorCounsel?',
      answer: 'While our counseling is rooted in Christian faith and biblical principles, we welcome anyone seeking spiritual guidance or support. Our pastors are compassionate and non-judgmental, ready to help anyone who reaches out. You don\'t need to be affiliated with any particular denomination or church.',
    },
  ],
  booking: [
    {
      question: 'How do I book a session with a pastor?',
      answer: 'Booking a session is simple: 1) Create a free account, 2) Browse our pastor directory and view profiles, 3) Select a pastor whose specialty and approach aligns with your needs, 4) Choose an available time slot from their calendar, 5) Complete payment to confirm your booking. You\'ll receive a confirmation email with all the details.',
    },
    {
      question: 'Can I choose a specific pastor?',
      answer: 'Absolutely! You have full control over which pastor you book. Browse our directory, read profiles, watch introduction videos, and check reviews from other users. You can filter by specialty, language, location, and availability to find the perfect match for your needs.',
    },
    {
      question: 'How long are counseling sessions?',
      answer: 'Standard sessions are typically 45-60 minutes, depending on the pastor and the type of counseling. Some pastors offer extended sessions (90 minutes) for in-depth counseling or shorter sessions (30 minutes) for check-ins. Session duration is clearly displayed when booking.',
    },
    {
      question: 'Can I reschedule or cancel my appointment?',
      answer: 'Yes, you can reschedule or cancel your appointment through your dashboard. Cancellations made 24 hours or more before the scheduled time receive a full refund. Cancellations within 24 hours may be subject to a 50% fee. No-shows forfeit the session fee. To reschedule, simply cancel and book a new time slot.',
    },
    {
      question: 'What happens if my pastor needs to cancel?',
      answer: 'If a pastor needs to cancel or reschedule, you\'ll be notified immediately via email and push notification. You can choose to reschedule with the same pastor, book with a different pastor, or receive a full refund. We understand your time is valuable and aim to minimize disruptions.',
    },
    {
      question: 'How far in advance can I book a session?',
      answer: 'You can book sessions up to 30 days in advance, depending on the pastor\'s availability. Some pastors open their calendars further out. You can also set up recurring sessions for ongoing counseling relationships.',
    },
    {
      question: 'Is there a limit to how many sessions I can book?',
      answer: 'There\'s no limit to the number of sessions you can book. You can schedule regular weekly sessions, multiple sessions with different pastors, or occasional check-ins—whatever works best for your spiritual journey.',
    },
  ],
  payment: [
    {
      question: 'How much does a counseling session cost?',
      answer: 'Session rates vary by pastor, typically ranging from $40 to $100 per hour. Each pastor sets their own rates based on their experience, specialties, and demand. Prices are clearly displayed on each pastor\'s profile. We believe in transparent pricing with no hidden fees.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, and PayPal. In select regions, we also accept Apple Pay and Google Pay. All payments are processed securely through our PCI-compliant payment system.',
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Absolutely. We use industry-standard encryption (SSL/TLS) and work with trusted payment processors. We never store your full credit card details on our servers. Your payment information is protected with bank-level security.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes. Full refunds are issued for cancellations made 24+ hours before a session. If you\'re unsatisfied with a session, contact our support team within 48 hours, and we\'ll review your case. We want you to have a positive experience and will work with you to resolve any concerns.',
    },
    {
      question: 'Are there any subscription plans or packages?',
      answer: 'We offer flexible options: pay-per-session for occasional counseling, or discounted packages for ongoing support. Some pastors offer multi-session packages (4, 8, or 12 sessions) at reduced rates. Check individual pastor profiles for package options.',
    },
    {
      question: 'Do you accept insurance?',
      answer: 'Currently, we don\'t accept insurance as our services are classified as spiritual/pastoral counseling rather than clinical therapy. However, some pastors can provide receipts that you may submit to your insurance or Flexible Spending Account (FSA) provider. Check with your provider for eligibility.',
    },
    {
      question: 'Can I tip my pastor?',
      answer: 'Yes, after a session you have the option to leave a tip for your pastor as a gesture of appreciation. Tips are entirely optional and go directly to the pastor. You can tip any amount you\'re comfortable with.',
    },
  ],
  pastors: [
    {
      question: 'How are pastors verified on your platform?',
      answer: 'All pastors go through a rigorous verification process: 1) Identity verification with government ID, 2) Ministry credentials verification (ordination certificate, ministry license), 3) Background check, 4) Reference checks from ministry peers, 5) Interview with our pastoral advisory board. Only verified pastors can offer sessions on our platform.',
    },
    {
      question: 'What qualifications do the pastors have?',
      answer: 'Our pastors come from diverse backgrounds but all share these qualifications: Ordination or ministry licensure from a recognized denomination or ministry, formal theological education (many have Master of Divinity or equivalent), years of ministry experience (minimum 3 years), specialized training in pastoral counseling. Many also have additional certifications in marriage counseling, grief counseling, or other specialties.',
    },
    {
      question: 'Can I see reviews from other users?',
      answer: 'Yes! Each pastor\'s profile displays verified reviews from real users who have completed sessions. You can see overall ratings, read detailed feedback, and filter reviews by counseling type. Reviews help you make an informed decision when choosing a pastor.',
    },
    {
      question: 'What if I don\'t connect with my pastor?',
      answer: 'Not every match is perfect, and that\'s okay. If you feel your pastor isn\'t the right fit, you can: 1) End the session early (contact support for partial refund), 2) Switch to a different pastor for future sessions, 3) Provide feedback to help us improve matching. We encourage you to find the pastor who best supports your journey.',
    },
    {
      question: 'How do I become a pastor on the platform?',
      answer: 'If you\'re a licensed or ordained minister interested in joining our platform: 1) Apply through our "Join as Pastor" page, 2) Submit your credentials and ministry information, 3) Complete our verification process, 4) Set up your profile and availability calendar, 5) Start accepting sessions. Our team will guide you through each step.',
    },
    {
      question: 'Do pastors specialize in specific areas?',
      answer: 'Yes, pastors indicate their areas of specialization such as marriage counseling, trauma recovery, deliverance ministry, youth counseling, grief support, and more. When browsing, you can filter by specialty to find pastors with expertise in your area of need.',
    },
  ],
  technical: [
    {
      question: 'What equipment do I need for video sessions?',
      answer: 'You\'ll need: A device with a camera and microphone (computer, tablet, or smartphone), stable internet connection (minimum 1.5 Mbps), modern web browser (Chrome, Firefox, Safari, or Edge), and a quiet, private space. No software download required—all sessions run in your browser.',
    },
    {
      question: 'Can I use my phone for sessions?',
      answer: 'Absolutely! Our platform is fully responsive and works on iOS and Android devices. Use the web browser on your phone or tablet to join sessions. For the best experience, ensure you have a stable WiFi or cellular data connection.',
    },
    {
      question: 'What if I have technical issues during a session?',
      answer: 'If you experience technical difficulties: 1) Try refreshing your browser, 2) Check your internet connection, 3) Switch to a different browser or device, 4) Use the in-session chat to communicate with your pastor, 5) Contact our 24/7 support via the help button. We\'ll help resolve issues or reschedule if needed.',
    },
    {
      question: 'Do I need to download any software?',
      answer: 'No downloads required! Our video conferencing works directly in your web browser using WebRTC technology. Simply click the session link in your confirmation email or dashboard to join. This ensures maximum privacy and convenience.',
    },
    {
      question: 'How do I update my account information?',
      answer: 'Log into your account and navigate to Settings in your dashboard. From there, you can update your profile picture, personal information, notification preferences, payment methods, and privacy settings. Changes are saved instantly.',
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Currently, PastorCounsel is available as a mobile-optimized website that works beautifully on any device. Native iOS and Android apps are in development and will be available soon. Sign up for our newsletter to be notified when apps launch.',
    },
  ],
  privacy: [
    {
      question: 'Are my sessions confidential?',
      answer: 'Yes, confidentiality is paramount. All sessions are private between you and your pastor. We do not record video sessions. Pastors are bound by confidentiality agreements and ethical guidelines. Your conversations are protected and will not be shared with third parties.',
    },
    {
      question: 'Is my personal information secure?',
      answer: 'We take data security seriously. All personal data is encrypted using industry-standard protocols (AES-256). Our servers are hosted in secure, SOC 2 certified data centers. We never sell your personal information to third parties. Read our Privacy Policy for complete details.',
    },
    {
      question: 'Do you record video sessions?',
      answer: 'No. We do not record, store, or access your video sessions. Your conversations remain completely private between you and your pastor. This ensures the same level of confidentiality you would expect from an in-person counseling session.',
    },
    {
      question: 'Who can see my profile information?',
      answer: 'Your basic profile (name, avatar) is visible to pastors you book sessions with. Your session history and personal details are private and only accessible by you. Pastors cannot see your payment information or private notes. You control what information you share.',
    },
    {
      question: 'Can I delete my account?',
      answer: 'Yes, you have full control over your account. Go to Settings > Account > Delete Account to permanently remove your account and associated data. This action is irreversible. If you have upcoming sessions, please cancel them first. We\'ll delete your data in accordance with our Privacy Policy.',
    },
    {
      question: 'How do you protect against unauthorized access?',
      answer: 'We implement multiple security layers: Two-factor authentication (optional but recommended), encrypted data transmission and storage, regular security audits, automatic logout after inactivity, suspicious activity monitoring. We also recommend using strong, unique passwords.',
    },
  ],
};

const popularQuestions = [
  { question: 'How do I book a session?', category: 'booking' },
  { question: 'What are the payment options?', category: 'payment' },
  { question: 'Are sessions confidential?', category: 'privacy' },
  { question: 'How are pastors verified?', category: 'pastors' },
];

export function FAQ({ onNavigate }: FAQProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Search through all FAQs
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const query = searchQuery.toLowerCase();
    const results: { category: string; question: string; answer: string }[] = [];

    Object.entries(faqData).forEach(([category, faqs]) => {
      faqs.forEach((faq) => {
        if (
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
        ) {
          results.push({
            category,
            question: faq.question,
            answer: faq.answer,
          });
        }
      });
    });

    return results;
  }, [searchQuery]);

  const currentCategory = faqCategories.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#102a43] via-[#243b53] to-[#102a43] text-white py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#dc2626] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#dc2626] rounded-full blur-[150px] opacity-15" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-[#dc2626]/20 text-[#fca5a5] border-[#dc2626]/30 px-4 py-2 text-sm mb-6" data-aos="fade-down">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Center
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-aos="fade-up">
              Frequently Asked{' '}
              <span className="text-[#dc2626]">Questions</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Find answers to common questions about our platform, booking sessions, payments, and more.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-4 h-14 text-lg rounded-full border-0 shadow-xl bg-white text-gray-800"
              />
            </div>

            {/* Quick Search Tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-6" data-aos="fade-up" data-aos-delay="300">
              {popularQuestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(item.question);
                    setSelectedCategory(item.category);
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors"
                >
                  {item.question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#f0f4f8]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-none shadow-lg overflow-hidden" data-aos="fade-right">
                  <CardContent className="p-0">
                    <div className="bg-[#102a43] text-white p-4">
                      <h3 className="font-semibold">Categories</h3>
                    </div>
                    <div className="p-2">
                      {faqCategories.map((category) => {
                        const Icon = category.icon;
                        const isActive = selectedCategory === category.id;
                        return (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategory(category.id);
                              setSearchQuery('');
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                              isActive
                                ? 'bg-[#102a43] text-white'
                                : 'hover:bg-[#f0f4f8] text-gray-700'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#dc2626]' : category.color}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{category.name}</p>
                              <p className={`text-xs ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                                {faqData[category.id as keyof typeof faqData].length} questions
                              </p>
                            </div>
                            {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Support Card */}
                <Card className="border-none shadow-lg mt-6 overflow-hidden" data-aos="fade-right" data-aos-delay="100">
                  <CardContent className="p-6 bg-gradient-to-br from-[#dc2626] to-[#b91c1c] text-white">
                    <MessageSquare className="w-10 h-10 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Still need help?</h3>
                    <p className="text-white/80 text-sm mb-4">
                      Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <Button
                      className="w-full bg-white text-[#dc2626] hover:bg-gray-100"
                      onClick={() => onNavigate('contact')}
                    >
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              {/* Search Results or Category FAQs */}
              {searchResults ? (
                <div data-aos="fade-left">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#102a43]">
                      Search Results
                      <span className="text-lg font-normal text-gray-500 ml-2">
                        ({searchResults.length} found)
                      </span>
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={() => setSearchQuery('')}
                      className="text-[#dc2626]"
                    >
                      Clear Search
                    </Button>
                  </div>

                  {searchResults.length > 0 ? (
                    <Accordion type="single" collapsible className="space-y-3">
                      {searchResults.map((result, index) => {
                        const category = faqCategories.find((c) => c.id === result.category);
                        return (
                          <AccordionItem
                            key={index}
                            value={`search-${index}`}
                            className="bg-white rounded-xl shadow-md border-none overflow-hidden"
                          >
                            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                              <div className="flex items-start gap-4 text-left">
                                <Badge variant="outline" className={category?.color}>
                                  {category?.name}
                                </Badge>
                                <span className="font-semibold text-[#102a43]">{result.question}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                              {result.answer}
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  ) : (
                    <Card className="border-none shadow-lg">
                      <CardContent className="p-12 text-center">
                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-[#102a43] mb-2">No results found</h3>
                        <p className="text-gray-500 mb-6">
                          We couldn't find any questions matching "{searchQuery}"
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setSearchQuery('')}
                          className="border-[#102a43] text-[#102a43]"
                        >
                          Clear Search
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <div data-aos="fade-left">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${currentCategory?.color}`}>
                      {currentCategory && <currentCategory.icon className="w-7 h-7" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#102a43]">{currentCategory?.name}</h2>
                      <p className="text-gray-500">{currentCategory?.description}</p>
                    </div>
                  </div>

                  {/* FAQ Accordion */}
                  <Accordion type="single" collapsible className="space-y-3">
                    {faqData[selectedCategory as keyof typeof faqData].map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="bg-white rounded-xl shadow-md border-none overflow-hidden"
                      >
                        <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 group">
                          <div className="flex items-center gap-4 text-left">
                            <div className="w-8 h-8 bg-[#dc2626]/10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#dc2626]/20 transition-colors">
                              <HelpCircle className="w-4 h-4 text-[#dc2626]" />
                            </div>
                            <span className="font-semibold text-[#102a43] group-hover:text-[#dc2626] transition-colors">
                              {faq.question}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-5 pt-0">
                          <div className="pl-12 text-gray-600 leading-relaxed border-l-2 border-[#dc2626]/20 ml-4">
                            {faq.answer}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {/* Helpful Section */}
                  <Card className="border-none shadow-lg mt-8 bg-gradient-to-r from-[#102a43] to-[#243b53] text-white">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-[#dc2626] rounded-xl flex items-center justify-center">
                            <Sparkles className="w-7 h-7" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Was this helpful?</h3>
                            <p className="text-gray-300 text-sm">Let us know how we can improve</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="outline" className="border-white text-white hover:bg-white/10">
                            👍 Yes, thanks!
                          </Button>
                          <Button variant="outline" className="border-white text-white hover:bg-white/10">
                            👎 Need more help
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-[#102a43] mb-4">Need More Help?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our support team is available to assist you with any questions or concerns.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Email Support */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="100">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#dc2626]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#dc2626]" />
                </div>
                <h3 className="font-semibold text-[#102a43] mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-4">Get a response within 24 hours</p>
                <a href="mailto:support@pastorcounsel.org" className="text-[#dc2626] font-medium hover:underline">
                  support@pastorcounsel.org
                </a>
              </CardContent>
            </Card>

            {/* Phone Support */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#102a43]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-[#102a43]" />
                </div>
                <h3 className="font-semibold text-[#102a43] mb-2">Phone Support</h3>
                <p className="text-gray-600 text-sm mb-4">Mon-Fri, 9AM-6PM EST</p>
                <a href="tel:+15551234567" className="text-[#dc2626] font-medium hover:underline">
                  +1 (555) 123-4567
                </a>
              </CardContent>
            </Card>

            {/* Live Chat */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay="300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-[#102a43] mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm mb-4">Available 24/7 for urgent issues</p>
                <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-[#f0f4f8]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#102a43] mb-8 text-center" data-aos="fade-up">
              Related Resources
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: BookOpen, title: 'How It Works', description: 'Learn about our platform features', page: 'how-it-works' as PageState },
                { icon: Shield, title: 'Privacy Policy', description: 'Understand how we protect your data', page: 'privacy' as PageState },
                { icon: FileText, title: 'Terms of Service', description: 'Read our terms and conditions', page: 'terms' as PageState },
                { icon: Users, title: 'Browse Pastors', description: 'Find the right pastor for you', page: 'browse-pastors' as PageState },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={index}
                    className="border-none shadow-md hover:shadow-lg transition-all cursor-pointer group"
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                    onClick={() => onNavigate(item.page)}
                  >
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#102a43] rounded-xl flex items-center justify-center group-hover:bg-[#dc2626] transition-colors">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#102a43] group-hover:text-[#dc2626] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#dc2626] group-hover:translate-x-1 transition-all" />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
