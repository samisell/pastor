'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  PhoneOff, 
  Video, 
  VideoOff, 
  X,
  PhoneCall
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface CallOverlayProps {
  type: 'incoming' | 'outgoing';
  callType: 'video' | 'audio';
  recipient: {
    id: string;
    name: string;
    avatar?: string;
    role: 'pastor' | 'user';
  };
  onAccept?: () => void;
  onDecline?: () => void;
  onCancel?: () => void;
}

export default function CallOverlay({
  type,
  callType,
  recipient,
  onAccept,
  onDecline,
  onCancel
}: CallOverlayProps) {
  const isIncoming = type === 'incoming';
  const isVideo = callType === 'video';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-[#102a43] to-[#0a1929] rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ 
              scale: isIncoming ? [1, 1.05, 1] : 1,
            }}
            transition={{ 
              duration: 1.5, 
              repeat: isIncoming ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <p className="text-white/60 text-sm uppercase tracking-wider mb-2">
              {isIncoming ? 'Incoming' : 'Outgoing'} {isVideo ? 'Video' : 'Audio'} Call
            </p>
          </motion.div>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Pulse rings for incoming call */}
            {isIncoming && (
              <>
                <motion.div
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 bg-[#dc2626]/30 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3],
                    opacity: [0.3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.3,
                  }}
                  className="absolute inset-0 bg-[#dc2626]/20 rounded-full"
                />
              </>
            )}
            
            <Avatar className="w-32 h-32 border-4 border-[#dc2626]/50 shadow-xl">
              <AvatarImage src={recipient.avatar} />
              <AvatarFallback className="bg-[#dc2626] text-white text-4xl">
                {recipient.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* Call type indicator */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#102a43] px-3 py-1 rounded-full border border-white/20">
              {isVideo ? (
                <Video size={16} className="text-white" />
              ) : (
                <Phone size={16} className="text-white rotate-45" />
              )}
            </div>
          </div>
        </div>

        {/* Recipient Info */}
        <div className="text-center mb-8">
          <h2 className="text-white text-2xl font-bold mb-1">{recipient.name}</h2>
          <p className="text-white/60 capitalize">{recipient.role}</p>
        </div>

        {/* Call Status */}
        <div className="text-center mb-8">
          {isIncoming ? (
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#dc2626] font-medium"
            >
              Calling...
            </motion.p>
          ) : (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center justify-center gap-2 text-white/60"
            >
              <PhoneCall size={18} />
              <span>Ringing...</span>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6">
          {isIncoming ? (
            <>
              {/* Decline Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDecline}
                className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg"
              >
                <PhoneOff size={28} />
              </motion.button>

              {/* Accept Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAccept}
                className="w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center text-white shadow-lg"
              >
                {isVideo ? (
                  <Video size={28} />
                ) : (
                  <Phone size={28} className="rotate-45" />
                )}
              </motion.button>
            </>
          ) : (
            <>
              {/* Cancel Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCancel}
                className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg"
              >
                <X size={28} />
              </motion.button>
            </>
          )}
        </div>

        {/* Quick Actions for Incoming */}
        {isIncoming && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex justify-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                <PhoneOff size={16} className="mr-2" />
                Decline with Message
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// Mini Call Notification Component (for when user is on another page)
export function CallNotification({
  callType,
  recipient,
  onAccept,
  onDecline,
}: {
  callType: 'video' | 'audio';
  recipient: {
    id: string;
    name: string;
    avatar?: string;
    role: 'pastor' | 'user';
  };
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#102a43] rounded-2xl shadow-2xl p-4 flex items-center gap-4 z-50 border border-white/10"
    >
      <div className="relative">
        <Avatar className="w-12 h-12 border-2 border-[#dc2626]">
          <AvatarImage src={recipient.avatar} />
          <AvatarFallback className="bg-[#dc2626] text-white">
            {recipient.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#102a43] animate-pulse" />
      </div>

      <div>
        <p className="text-white font-semibold">{recipient.name}</p>
        <p className="text-white/60 text-sm flex items-center gap-1">
          {callType === 'video' ? <Video size={12} /> : <Phone size={12} className="rotate-45" />}
          Incoming {callType} call...
        </p>
      </div>

      <div className="flex gap-2 ml-4">
        <Button
          size="sm"
          variant="ghost"
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={onDecline}
        >
          <PhoneOff size={16} />
        </Button>
        <Button
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={onAccept}
        >
          {callType === 'video' ? <Video size={16} /> : <Phone size={16} className="rotate-45" />}
        </Button>
      </div>
    </motion.div>
  );
}
