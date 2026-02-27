'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Monitor,
  MessageSquare,
  Users,
  Settings,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Camera,
  Circle,
  MoreVertical,
  X,
  Send,
  Smile,
  Paperclip,
  Image as ImageIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VideoConferenceProps {
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

// Control button component - defined outside to avoid recreating on each render
function ControlButton({ 
  icon: Icon, 
  label, 
  onClick, 
  isActive = true,
  danger = false,
  size = 'default'
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  danger?: boolean;
  size?: 'default' | 'lg';
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
        danger 
          ? 'bg-red-600 hover:bg-red-700 text-white' 
          : isActive 
            ? 'bg-white/20 hover:bg-white/30 text-white' 
            : 'bg-red-500/80 hover:bg-red-500 text-white'
      }`}
    >
      <Icon size={size === 'lg' ? 28 : 22} />
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
}

export default function VideoConference({
  recipient,
  onEndCall,
  onMinimize,
  isMinimized = false
}: VideoConferenceProps) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: 'them',
      message: 'Hello! I\'m ready for our session.',
      time: '10:00 AM'
    },
    {
      id: '2',
      sender: 'me',
      message: 'Great! Let me share my screen to show you some materials.',
      time: '10:01 AM'
    }
  ]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
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
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {formatDuration(callDuration)}
          </p>
        </div>

        <div className="flex gap-2 ml-4">
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => setIsAudioOn(!isAudioOn)}
          >
            {isAudioOn ? <Mic size={18} /> : <MicOff size={18} />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
          </Button>
          <Button
            size="icon"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onEndCall}
          >
            <PhoneOff size={18} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={onMinimize}
          >
            <Maximize2 size={18} />
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#0a1929] z-50 flex flex-col"
    >
      {/* Main Video Area */}
      <div className="flex-1 relative">
        {/* Remote Video (Full Screen) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#102a43] to-[#0a1929]">
          {/* Simulated video background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white/20">
                <AvatarImage src={recipient.avatar} />
                <AvatarFallback className="bg-[#dc2626] text-white text-4xl">
                  {recipient.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-white text-2xl font-semibold">{recipient.name}</h2>
              <p className="text-white/60 capitalize">{recipient.role}</p>
            </div>
          </div>
          
          {/* Video is off overlay */}
          {!isVideoOn && (
            <div className="absolute inset-0 bg-[#0a1929]/80 flex items-center justify-center">
              <div className="text-center">
                <VideoOff size={64} className="mx-auto text-white/40 mb-4" />
                <p className="text-white/60">Video is turned off</p>
              </div>
            </div>
          )}
        </div>

        {/* Self Video (Picture-in-Picture) */}
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className="absolute top-4 right-4 w-48 h-36 bg-gradient-to-br from-[#1e3a5f] to-[#102a43] rounded-xl overflow-hidden shadow-lg cursor-move border-2 border-white/20"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Camera size={32} className="mx-auto text-white/40" />
              <p className="text-white/60 text-sm mt-2">You</p>
            </div>
          </div>
          {!isVideoOn && (
            <div className="absolute inset-0 bg-[#0a1929] flex items-center justify-center">
              <VideoOff size={32} className="text-red-400" />
            </div>
          )}
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="bg-black/50 text-white text-xs">
              You
            </Badge>
          </div>
        </motion.div>

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-red-600/90 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">Live</span>
              </div>
              <div className="text-white">
                <span className="text-lg font-semibold">{formatDuration(callDuration)}</span>
              </div>
              {isRecording && (
                <div className="flex items-center gap-2 bg-red-600/90 px-3 py-1.5 rounded-full">
                  <Circle size={12} className="text-white fill-current" />
                  <span className="text-white text-sm font-medium">Recording</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsRecording(!isRecording)}
              >
                <Circle size={20} className={isRecording ? 'fill-red-500 text-red-500' : ''} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </Button>
              {onMinimize && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={onMinimize}
                >
                  <Minimize2 size={20} />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Screen Sharing Indicator */}
        {isScreenSharing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 bg-green-600/90 px-4 py-2 rounded-full"
          >
            <div className="flex items-center gap-2 text-white">
              <Monitor size={18} />
              <span className="font-medium">You are sharing your screen</span>
            </div>
          </motion.div>
        )}

        {/* Call Info */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl px-4 py-3">
            <p className="text-white font-semibold">{recipient.name}</p>
            <p className="text-green-400 text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Connected • {formatDuration(callDuration)}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-[#102a43]/95 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          <ControlButton
            icon={isAudioOn ? Mic : MicOff}
            label={isAudioOn ? 'Mute' : 'Unmute'}
            onClick={() => setIsAudioOn(!isAudioOn)}
            isActive={isAudioOn}
          />
          <ControlButton
            icon={isVideoOn ? Video : VideoOff}
            label={isVideoOn ? 'Stop Video' : 'Start Video'}
            onClick={() => setIsVideoOn(!isVideoOn)}
            isActive={isVideoOn}
          />
          <ControlButton
            icon={Monitor}
            label="Share"
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            isActive={isScreenSharing}
          />
          <ControlButton
            icon={MessageSquare}
            label="Chat"
            onClick={() => setShowChat(!showChat)}
            isActive={!showChat}
          />
          <ControlButton
            icon={Users}
            label="Participants"
            onClick={() => {}}
          />
          <ControlButton
            icon={PhoneOff}
            label="End"
            onClick={onEndCall}
            danger
            size="lg"
          />
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

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#102a43] rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-xl font-semibold">Settings</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10"
                  onClick={() => setShowSettings(false)}
                >
                  <X size={20} />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Camera */}
                <div>
                  <label className="text-white/80 text-sm font-medium mb-2 block">Camera</label>
                  <select className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white">
                    <option>Default Camera</option>
                    <option>External Webcam</option>
                  </select>
                </div>

                {/* Microphone */}
                <div>
                  <label className="text-white/80 text-sm font-medium mb-2 block">Microphone</label>
                  <select className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white">
                    <option>Default Microphone</option>
                    <option>External Microphone</option>
                  </select>
                </div>

                {/* Speaker */}
                <div>
                  <label className="text-white/80 text-sm font-medium mb-2 block">Speaker</label>
                  <select className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white">
                    <option>Default Speaker</option>
                    <option>External Speaker</option>
                  </select>
                </div>

                {/* Video Quality */}
                <div>
                  <label className="text-white/80 text-sm font-medium mb-2 block">Video Quality</label>
                  <select className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white">
                    <option>HD (720p)</option>
                    <option>Full HD (1080p)</option>
                    <option>Auto</option>
                  </select>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
