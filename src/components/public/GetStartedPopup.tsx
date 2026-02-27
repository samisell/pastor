'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { PageState } from '@/types';

interface GetStartedPopupProps {
  onNavigate: (page: PageState) => void;
}

export function GetStartedPopup({ onNavigate }: GetStartedPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Check if dismissed on initial render
  const isDismissed = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('popupDismissed') === 'true';
  }, []);

  useEffect(() => {
    // Don't show if already dismissed
    if (isDismissed) return;

    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('popupDismissed', 'true');
  };

  const handleGetStarted = () => {
    setIsVisible(false);
    onNavigate('register-user');
  };

  // Don't render if dismissed
  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={handleDismiss}
          />

          {/* Popup Card */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-sm"
          >
            <div className="bg-gradient-to-br from-[#102a43] via-[#243b53] to-[#102a43] rounded-2xl shadow-2xl overflow-hidden border border-white/10">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#dc2626]/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#dc2626]/10 rounded-full blur-2xl" />

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="relative p-6">
                {/* Icon */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#dc2626] to-[#b91c1c] rounded-2xl flex items-center justify-center shadow-lg shadow-[#dc2626]/30"
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.div>

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center mb-3"
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#dc2626]/20 rounded-full text-[#fca5a5] text-xs font-medium">
                    <Sparkles className="w-3 h-3" />
                    Start Your Journey Today
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-bold text-white text-center mb-2"
                >
                  Find Spiritual Guidance
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-300 text-center text-sm mb-6"
                >
                  Connect with verified pastors for faith-based counseling. Start your healing journey now.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <Button
                    className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white h-12 text-base font-semibold shadow-lg shadow-[#dc2626]/30"
                    onClick={handleGetStarted}
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-white hover:bg-white/10"
                    onClick={handleDismiss}
                  >
                    Maybe Later
                  </Button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/10"
                >
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm">500+</p>
                    <p className="text-gray-400 text-xs">Pastors</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm">10K+</p>
                    <p className="text-gray-400 text-xs">Sessions</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm">4.9</p>
                    <p className="text-gray-400 text-xs">Rating</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
