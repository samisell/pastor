'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Clock, Heart, MessageSquare, Video } from 'lucide-react';
import { Pastor } from '@/types';

interface PastorCardProps {
  pastor: Pastor;
  onViewProfile: (pastorId: string) => void;
  onBookSession: (pastorId: string) => void;
}

export function PastorCard({ pastor, onViewProfile, onBookSession }: PastorCardProps) {
  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 border-none shadow-md overflow-hidden"
      data-aos="fade-up"
    >
      <CardContent className="p-0">
        {/* Top Section with Image */}
        <div className="relative h-48 bg-gradient-to-br from-[#102a43] to-[#243b53]">
          <img
            src={pastor.avatar}
            alt={pastor.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute top-3 right-3">
            {pastor.isAvailable ? (
              <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
            ) : (
              <Badge variant="secondary">Busy</Badge>
            )}
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex flex-wrap gap-1">
              {pastor.specialties.slice(0, 2).map((specialty, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/20 text-white text-xs"
                >
                  {specialty}
                </Badge>
              ))}
              {pastor.specialties.length > 2 && (
                <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                  +{pastor.specialties.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Name and Rating */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg text-[#102a43] group-hover:text-[#dc2626] transition-colors">
                {pastor.name}
              </h3>
              {pastor.ministryName && (
                <p className="text-sm text-gray-500">{pastor.ministryName}</p>
              )}
            </div>
            <div className="flex items-center gap-1 bg-[#f0f4f8] px-2 py-1 rounded">
              <Star className="w-4 h-4 fill-[#dc2626] text-[#dc2626]" />
              <span className="text-sm font-medium text-[#102a43]">{pastor.rating}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pastor.bio}</p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{pastor.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{pastor.sessionCount} sessions</span>
            </div>
          </div>

          {/* Languages */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-500">Languages:</span>
            {pastor.languages.map((lang, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="text-xs text-gray-500">Session from</p>
              <p className="text-xl font-bold text-[#102a43]">${pastor.hourlyRate}<span className="text-sm font-normal text-gray-500">/hr</span></p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[#102a43] text-[#102a43] hover:bg-[#102a43] hover:text-white"
                onClick={() => onViewProfile(pastor.id)}
              >
                View Profile
              </Button>
              <Button
                size="sm"
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                onClick={() => onBookSession(pastor.id)}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
