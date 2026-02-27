'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  MessageSquare,
  Users,
  Settings,
  Maximize,
  Minimize,
  ScreenShare,
  X,
  Send,
} from 'lucide-react';
import { PageState } from '@/types';

interface VideoInterfaceProps {
  onNavigate: (page: PageState) => void;
}

export function VideoInterface({ onNavigate }: VideoInterfaceProps) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'pastor', text: 'Hello! Welcome to our session today.', time: '10:00 AM' },
    { id: 2, sender: 'user', text: 'Hi Pastor, thank you for seeing me.', time: '10:01 AM' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: 'user', text: message, time: '10:02 AM' },
      ]);
      setMessage('');
    }
  };

  const endSession = () => {
    onNavigate('user-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0a1929] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#102a43] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold">Marriage Counseling Session</h1>
          <Badge className="bg-[#dc2626]">Live</Badge>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-mono">{formatTime(sessionTime)}</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex">
        {/* Video Grid */}
        <div className="flex-1 relative">
          {/* Main Video (Pastor) */}
          <div className="absolute inset-0 bg-gray-900">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop"
              alt="Pastor"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
              Pastor John Williams
            </div>
          </div>

          {/* Self Video (User) */}
          <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden shadow-xl border-2 border-white/20">
            {isVideoOn ? (
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=200&h=150&fit=crop"
                alt="You"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700">
                <VideoOff className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div className="absolute bottom-1 left-2 text-white text-xs">You</div>
          </div>
        </div>

        {/* Chat Panel */}
        {isChatOpen && (
          <div className="w-80 bg-[#102a43] border-l border-[#243b53] flex flex-col">
            <div className="p-4 border-b border-[#243b53] flex items-center justify-between">
              <h3 className="font-semibold text-white">Chat</h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
                onClick={() => setIsChatOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      msg.sender === 'user'
                        ? 'bg-[#dc2626] text-white'
                        : 'bg-[#243b53] text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs opacity-70">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-[#243b53]">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="bg-[#243b53] border-[#334e68] text-white"
                />
                <Button
                  size="icon"
                  className="bg-[#dc2626] hover:bg-[#b91c1c]"
                  onClick={handleSendMessage}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="bg-[#102a43] text-white px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          {/* Audio Control */}
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${isAudioOn ? 'bg-[#243b53] hover:bg-[#334e68]' : 'bg-[#dc2626] hover:bg-[#b91c1c]'}`}
            onClick={() => setIsAudioOn(!isAudioOn)}
          >
            {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>

          {/* Video Control */}
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${isVideoOn ? 'bg-[#243b53] hover:bg-[#334e68]' : 'bg-[#dc2626] hover:bg-[#b91c1c]'}`}
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </Button>

          {/* Screen Share */}
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-[#243b53] hover:bg-[#334e68]"
          >
            <ScreenShare className="w-5 h-5" />
          </Button>

          {/* Chat */}
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${isChatOpen ? 'bg-[#dc2626]' : 'bg-[#243b53] hover:bg-[#334e68]'}`}
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            <MessageSquare className="w-5 h-5" />
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-[#243b53] hover:bg-[#334e68]"
          >
            <Settings className="w-5 h-5" />
          </Button>

          {/* Divider */}
          <div className="w-px h-8 bg-[#334e68]" />

          {/* End Call */}
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-[#dc2626] hover:bg-[#b91c1c]"
            onClick={endSession}
          >
            <Phone className="w-5 h-5 rotate-[135deg]" />
          </Button>
        </div>
      </div>
    </div>
  );
}
