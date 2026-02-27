'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { PageState } from '@/types';

interface FooterProps {
  onNavigate: (page: PageState) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', page: 'about' as PageState },
      { label: 'How It Works', page: 'how-it-works' as PageState },
      { label: 'Contact', page: 'contact' as PageState },
      { label: 'FAQ', page: 'faq' as PageState },
    ],
    services: [
      { label: 'Marriage Counseling', page: 'browse-pastors' as PageState },
      { label: 'Trauma & Healing', page: 'browse-pastors' as PageState },
      { label: 'Deliverance Ministry', page: 'browse-pastors' as PageState },
      { label: 'Prayer & Intercession', page: 'browse-pastors' as PageState },
    ],
    legal: [
      { label: 'Privacy Policy', page: 'privacy' as PageState },
      { label: 'Terms of Service', page: 'terms' as PageState },
    ],
  };

  return (
    <footer className="bg-[#102a43] text-white">
      {/* Newsletter Section */}
      <div className="bg-[#dc2626] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Subscribe to Our Newsletter</h3>
              <p className="text-white/80">Get updates on new pastors, spiritual resources, and more.</p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button className="bg-[#102a43] hover:bg-[#243b53] text-white shrink-0">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#dc2626] rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">PastorCounsel</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-sm">
              Connecting hearts with spiritual guidance. Our platform provides access to verified pastors and counselors who offer faith-based support for life's challenges.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#243b53] hover:bg-[#dc2626] flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#243b53] hover:bg-[#dc2626] flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#243b53] hover:bg-[#dc2626] flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#243b53] hover:bg-[#dc2626] flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5 text-[#dc2626]" />
                <span>support@pastorcounsel.org</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-5 h-5 text-[#dc2626]" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-5 h-5 text-[#dc2626] shrink-0 mt-0.5" />
                <span>123 Ministry Way, Dallas, TX 75001</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-[#334e68]" />

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>&copy; {currentYear} PastorCounsel. All rights reserved.</p>
          <div className="flex gap-4">
            {footerLinks.legal.map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.page)}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
