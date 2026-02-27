'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageSquare,
  Users,
  Minimize2,
  Maximize2,
  X,
  Send,
  Paperclip
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AudioCallProps {
  recipient: {
    id: string;
    name: string;
    avatar?: string;
    role: 'pastor' | 'user';
  };
  onEndCall: () => void;
  onMinimize?: () => void;
  isMinimized?: boolean;
}

// Audio wave animation component - defined outside to avoid recreating on each render
function AudioWave() {
  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-[#dc2626] rounded-full"
          animate={{
            height: [20, 40 + Math.random() * 20, 20],
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}

export default function AudioCall({
  recipient,
  onEndCall,
  onMinimize,
  isMinimized = false
}: AudioCallProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: 'them',
      message: 'I can hear you clearly.',
      time: '10:00 AM'
    }
  ]);

  // Call timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      sender: 'me' as const,
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage('');
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 bg-[#102a43] rounded-2xl shadow-2xl p-4 flex items-center gap-4 z-50"
      >
        <div className="relative">
          <Avatar className="w-12 h-12 border-2 border-green-500">
            <AvatarImage src={recipient.avatar} />
            <AvatarFallback className="bg-[#dc2626] text-white">
              {recipient.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#102a43]" />
        </div>
        
        <div>
          <p className="text-white font-semibold">{recipient.name}</p>
          <p className="text-green-400 text-sm flex items-center gap-1">
            <Phone size={12} className="rotate-45" />
            {formatDuration(callDuration)}
          </p>
        </div>

        <div className="flex gap-2 ml-4">
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
          </Button>
          <Button
            size="icon"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onEndCall}
          >
            <PhoneOff size={18} />
          </Button>
          {onMinimize && (
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={onMinimize}
            >
              <Maximize2 size={18} />
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-[#102a43] via-[#0a1929] to-[#051225] z-50 flex flex-col"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#dc2626]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#dc2626]/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-green-600/90 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-sm font-medium">Audio Call</span>
            </div>
            <div className="text-white text-lg font-semibold">
              {formatDuration(callDuration)}
            </div>
          </div>
        </div>

        {/* Avatar with Pulse Animation */}
        <div className="relative mb-8">
          {/* Outer Pulse Rings */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-[#dc2626]/30 rounded-full"
            style={{ transform: 'scale(1.5)' }}
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.05, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute inset-0 bg-[#dc2626]/20 rounded-full"
            style={{ transform: 'scale(1.3)' }}
          />
          
          <Avatar className="w-40 h-40 border-4 border-[#dc2626]/50 shadow-2xl">
            <AvatarImage src={recipient.avatar} />
            <AvatarFallback className="bg-[#dc2626] text-white text-5xl">
              {recipient.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          {/* Online Indicator */}
          <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#102a43] flex items-center justify-center">
            <Phone size={14} className="text-white rotate-45" />
          </div>
        </div>

        {/* Recipient Info */}
        <div className="text-center mb-8">
          <h2 className="text-white text-3xl font-bold mb-2">{recipient.name}</h2>
          <p className="text-white/60 capitalize mb-4">{recipient.role}</p>
          <div className="flex items-center justify-center gap-2 text-green-400">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-medium">Connected</span>
          </div>
        </div>

        {/* Audio Wave Visualization */}
        <div className="mb-12">
          <AudioWave />
        </div>

        {/* Call Status Messages */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 text-sm"
        >
          {isMuted ? 'You are muted' : 'Call in progress...'}
        </motion.div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-[#102a43]/50 backdrop-blur-sm px-6 py-8 relative z-10">
        <div className="flex items-center justify-center gap-6">
          {/* Mute Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMuted(!isMuted)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isMuted 
                ? 'bg-red-500 text-white' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
          </motion.button>

          {/* Speaker Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              !isSpeakerOn 
                ? 'bg-red-500 text-white' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {isSpeakerOn ? <Volume2 size={28} /> : <VolumeX size={28} />}
          </motion.button>

          {/* End Call Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEndCall}
            className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-600/30"
          >
            <PhoneOff size={32} />
          </motion.button>

          {/* Chat Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowChat(!showChat)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              showChat 
                ? 'bg-[#dc2626] text-white' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <MessageSquare size={28} />
          </motion.button>

          {/* Minimize Button */}
          {onMinimize && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMinimize}
              className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <Minimize2 size={28} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Chat Sidebar */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute right-0 top-0 bottom-0 w-80 bg-[#102a43] border-l border-white/10 flex flex-col"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-semibold">Chat</h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white hover:bg-white/10"
                onClick={() => setShowChat(false)}
              >
                <X size={20} />
              </Button>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-2 ${
                        msg.sender === 'me'
                          ? 'bg-[#dc2626] text-white'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs text-white/60 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-white/60 shrink-0">
                  <Paperclip size={18} />
                </Button>
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="bg-white/10 border-white/10 text-white placeholder:text-white/40"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#dc2626] hover:bg-[#b91c1c] shrink-0"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
