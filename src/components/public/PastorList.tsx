'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  X,
  Star,
  MapPin,
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Calendar,
  Globe,
  Award,
  ChevronDown,
  CheckCircle,
  Video,
} from 'lucide-react';
import { pastors, categories } from '@/data/dummy';
import { PageState } from '@/types';

interface PastorListProps {
  onNavigate: (page: PageState, pastorId?: string) => void;
}

// Sample video URLs for hover effect (using nature/spiritual themed videos)
const sampleVideos = [
  'https://assets.mixkit.co/videos/preview/mixkit-woman-turning-off-the-camera-in-a-video-call-46413-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-man-in-front-of-a-computer-talking-on-a-video-call-46231-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-woman-making-a-video-call-on-her-laptop-46245-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-woman-talking-on-a-video-call-on-a-laptop-46241-large.mp4',
];

interface PastorCardWithVideoProps {
  pastor: typeof pastors[0];
  onViewProfile: (pastorId: string) => void;
  onBookSession: (pastorId: string) => void;
  videoIndex: number;
  layout?: 'grid' | 'list';
}

function PastorCardWithVideo({ pastor, onViewProfile, onBookSession, videoIndex, layout = 'grid' }: PastorCardWithVideoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const videoSrc = sampleVideos[videoIndex % sampleVideos.length];

  const handleMouseEnter = () => {
    setIsHovered(true);
    hoverTimeoutRef.current = setTimeout(() => {
      const video = videoRef.current;
      if (video) {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay blocked
        });
      }
    }, 300);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  if (layout === 'list') {
    return (
      <Card
        className="group hover:shadow-xl transition-all duration-300 border-none shadow-md overflow-hidden"
        data-aos="fade-up"
      >
        <CardContent className="p-0">
          <div className="flex">
            {/* Video/Image Section */}
            <div
              className="relative w-64 h-48 bg-gradient-to-br from-[#102a43] to-[#243b53] shrink-0 overflow-hidden cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => onViewProfile(pastor.id)}
            >
              {/* Static Image */}
              <img
                src={pastor.avatar}
                alt={pastor.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered && isPlaying ? 'opacity-0' : 'opacity-80'}`}
              />
              
              {/* Video Overlay */}
              <video
                ref={videoRef}
                src={videoSrc}
                muted={isMuted}
                playsInline
                loop
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered && isPlaying ? 'opacity-100' : 'opacity-0'}`}
              />
              
              {/* Play Indicator */}
              <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {isPlaying ? (
                    <Video className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-1" />
                  )}
                </div>
              </div>
              
              {/* Video Controls */}
              <div className={`absolute bottom-2 left-2 right-2 flex justify-between items-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <Badge className="bg-[#dc2626] text-white text-xs">Preview</Badge>
              </div>

              {/* Availability Badge */}
              <div className="absolute top-3 right-3">
                {pastor.isAvailable ? (
                  <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
                ) : (
                  <Badge variant="secondary">Busy</Badge>
                )}
              </div>

              {/* Save Button */}
              <button
                onClick={toggleSave}
                className={`absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 ${isSaved ? 'text-[#dc2626]' : 'text-gray-400'}`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#dc2626]' : ''}`} />
              </button>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-xl text-[#102a43] group-hover:text-[#dc2626] transition-colors">
                      {pastor.name}
                    </h3>
                    {pastor.isVerified && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {pastor.ministryName && (
                    <p className="text-gray-500">{pastor.ministryName}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 bg-[#f0f4f8] px-3 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-[#dc2626] text-[#dc2626]" />
                  <span className="font-semibold text-[#102a43]">{pastor.rating}</span>
                  <span className="text-gray-500 text-sm">({pastor.reviewCount})</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{pastor.bio}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {pastor.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="border-[#102a43]/30 text-[#102a43]">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-6 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{pastor.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{pastor.sessionCount} sessions</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>{pastor.languages.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-500">Starting from</p>
                  <p className="text-2xl font-bold text-[#102a43]">${pastor.hourlyRate}<span className="text-sm font-normal text-gray-500">/session</span></p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="border-[#102a43] text-[#102a43] hover:bg-[#102a43] hover:text-white"
                    onClick={() => onViewProfile(pastor.id)}
                  >
                    View Profile
                  </Button>
                  <Button
                    className="bg-[#dc2626] hover:bg-[#b91c1c] text-white"
                    onClick={() => onBookSession(pastor.id)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid layout
  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 border-none shadow-md overflow-hidden"
      data-aos="fade-up"
    >
      <CardContent className="p-0">
        {/* Video/Image Section */}
        <div
          className="relative h-64 bg-gradient-to-br from-[#102a43] to-[#243b53] overflow-hidden cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => onViewProfile(pastor.id)}
        >
          {/* Static Image */}
          <img
            src={pastor.avatar}
            alt={pastor.name}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isHovered && isPlaying ? 'opacity-0 scale-110' : 'opacity-80 scale-100'}`}
          />
          
          {/* Video Overlay */}
          <video
            ref={videoRef}
            src={videoSrc}
            muted={isMuted}
            playsInline
            loop
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isHovered && isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Play Indicator */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
              {isPlaying ? (
                <Video className="w-7 h-7 text-white" />
              ) : (
                <Play className="w-7 h-7 text-white ml-1" />
              )}
            </div>
          </div>
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <button
              onClick={toggleSave}
              className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 shadow-lg ${isSaved ? 'text-[#dc2626]' : 'text-gray-400 hover:text-[#dc2626]'}`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-[#dc2626]' : ''}`} />
            </button>
            <div className="flex flex-col gap-2">
              {pastor.isAvailable && (
                <Badge className="bg-green-500 hover:bg-green-600 shadow-lg">
                  <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                  Available Now
                </Badge>
              )}
              {pastor.isVerified && (
                <Badge className="bg-white/90 text-[#102a43] shadow-lg">
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
          
          {/* Video Controls */}
          <div className={`absolute bottom-3 left-3 right-3 flex justify-between items-center transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <button
              onClick={toggleMute}
              className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-2">
              {isPlaying && (
                <Badge className="bg-[#dc2626]/90 backdrop-blur-sm text-white text-xs animate-pulse">
                  <span className="w-1.5 h-1.5 bg-white rounded-full mr-1" />
                  Playing Preview
                </Badge>
              )}
            </div>
          </div>
          
          {/* Specialties Tags */}
          <div className="absolute bottom-16 left-3 right-3">
            <div className="flex flex-wrap gap-1">
              {pastor.specialties.slice(0, 2).map((specialty, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-black/40 backdrop-blur-sm text-white text-xs border-white/20"
                >
                  {specialty}
                </Badge>
              ))}
              {pastor.specialties.length > 2 && (
                <Badge variant="secondary" className="bg-black/40 backdrop-blur-sm text-white text-xs border-white/20">
                  +{pastor.specialties.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Name and Rating */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg text-[#102a43] group-hover:text-[#dc2626] transition-colors">
                {pastor.name}
              </h3>
              {pastor.ministryName && (
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {pastor.ministryName}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 bg-gradient-to-r from-[#dc2626]/10 to-[#dc2626]/5 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-[#dc2626] text-[#dc2626]" />
              <span className="font-semibold text-sm text-[#102a43]">{pastor.rating}</span>
              <span className="text-gray-400 text-xs">({pastor.reviewCount})</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pastor.bio}</p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-[#102a43]" />
              <span>{pastor.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-[#102a43]" />
              <span>{pastor.sessionCount} sessions</span>
            </div>
          </div>

          {/* Languages */}
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {pastor.languages.map((lang, index) => (
                <Badge key={index} variant="outline" className="text-xs py-0">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-xl font-bold text-[#102a43]">${pastor.hourlyRate}<span className="text-sm font-normal text-gray-500">/session</span></p>
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
                <Calendar className="w-4 h-4 mr-1" />
                Book
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PastorList({ onNavigate }: PastorListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [sortBy, setSortBy] = useState<string>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);

  const languages = ['English', 'Spanish', 'French', 'Portuguese', 'Korean'];

  const filteredPastors = useMemo(() => {
    let result = [...pastors];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (pastor) =>
          pastor.name.toLowerCase().includes(query) ||
          pastor.bio.toLowerCase().includes(query) ||
          pastor.specialties.some((s) => s.toLowerCase().includes(query)) ||
          pastor.ministryName?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((pastor) =>
        pastor.specialties.includes(selectedCategory)
      );
    }

    // Language filter
    if (selectedLanguage !== 'all') {
      result = result.filter((pastor) => pastor.languages.includes(selectedLanguage));
    }

    // Price range filter
    result = result.filter(
      (pastor) => (pastor.hourlyRate || 0) >= priceRange[0] && (pastor.hourlyRate || 0) <= priceRange[1]
    );

    // Availability filter
    if (onlyAvailable) {
      result = result.filter((pastor) => pastor.isAvailable);
    }

    // Verified filter
    if (onlyVerified) {
      result = result.filter((pastor) => pastor.isVerified);
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'sessions':
        result.sort((a, b) => b.sessionCount - a.sessionCount);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'price-low':
        result.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0));
        break;
      case 'experience':
        result.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedLanguage, priceRange, sortBy, onlyAvailable, onlyVerified]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLanguage('all');
    setPriceRange([0, 150]);
    setOnlyAvailable(false);
    setOnlyVerified(false);
  };

  const handleViewProfile = (pastorId: string) => {
    onNavigate('pastor-profile', pastorId);
  };

  const handleBookSession = (pastorId: string) => {
    onNavigate('pastor-profile', pastorId);
  };

  const activeFilterCount = [
    selectedCategory !== 'all' ? 1 : 0,
    selectedLanguage !== 'all' ? 1 : 0,
    onlyAvailable ? 1 : 0,
    onlyVerified ? 1 : 0,
    priceRange[0] > 0 || priceRange[1] < 150 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-white" id="browse-pastors">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#102a43] via-[#243b53] to-[#102a43] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Spiritual Guide
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Browse our community of verified pastors and counselors. Hover over any profile to watch their introduction video.
            </p>
            
            {/* Main Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search by name, specialty, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-4 h-14 text-lg rounded-full border-0 shadow-xl"
              />
            </div>

            {/* Quick Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Badge
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[#dc2626] hover:bg-[#b91c1c] text-white'
                    : 'bg-white/10 text-white hover:bg-white/20 border-white/30'
                }`}
                onClick={() => setSelectedCategory('all')}
              >
                All Specialties
              </Badge>
              {categories.slice(0, 5).map((cat) => (
                <Badge
                  key={cat.id}
                  variant={selectedCategory === cat.name ? 'default' : 'outline'}
                  className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                    selectedCategory === cat.name
                      ? 'bg-[#dc2626] hover:bg-[#b91c1c] text-white'
                      : 'bg-white/10 text-white hover:bg-white/20 border-white/30'
                  }`}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8" data-aos="fade-up">
          {/* Left - Filter Toggle & Results */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className={`gap-2 ${showFilters ? 'border-[#dc2626] text-[#dc2626]' : 'border-[#102a43] text-[#102a43]'}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-1 bg-[#dc2626] text-white px-2 py-0.5 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
            <p className="text-gray-600">
              <strong className="text-[#102a43]">{filteredPastors.length}</strong> pastors found
            </p>
          </div>

          {/* Right - Sort & View */}
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 border-[#102a43]/30">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="sessions">Most Sessions</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className={`rounded-none ${viewMode === 'grid' ? 'bg-[#102a43]' : 'text-[#102a43]'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                className={`rounded-none ${viewMode === 'list' ? 'bg-[#102a43]' : 'text-[#102a43]'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8" data-aos="fade-down">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg text-[#102a43]">Filter Pastors</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-[#dc2626]">
                Clear All Filters
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Specialty</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Language Filter */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={150}
                  step={5}
                  className="mt-3"
                />
              </div>

              {/* Toggle Filters */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="available" className="text-sm text-gray-700">Available Now</Label>
                  <Switch
                    id="available"
                    checked={onlyAvailable}
                    onCheckedChange={setOnlyAvailable}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="verified" className="text-sm text-gray-700">Verified Only</Label>
                  <Switch
                    id="verified"
                    checked={onlyVerified}
                    onCheckedChange={setOnlyVerified}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Tags */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6" data-aos="fade-up">
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="px-3 py-1 gap-1">
                Specialty: {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="ml-1 hover:text-[#dc2626]">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedLanguage !== 'all' && (
              <Badge variant="secondary" className="px-3 py-1 gap-1">
                Language: {selectedLanguage}
                <button onClick={() => setSelectedLanguage('all')} className="ml-1 hover:text-[#dc2626]">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {onlyAvailable && (
              <Badge variant="secondary" className="px-3 py-1 gap-1">
                Available Only
                <button onClick={() => setOnlyAvailable(false)} className="ml-1 hover:text-[#dc2626]">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {onlyVerified && (
              <Badge variant="secondary" className="px-3 py-1 gap-1">
                Verified Only
                <button onClick={() => setOnlyVerified(false)} className="ml-1 hover:text-[#dc2626]">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {(priceRange[0] > 0 || priceRange[1] < 150) && (
              <Badge variant="secondary" className="px-3 py-1 gap-1">
                ${priceRange[0]} - ${priceRange[1]}
                <button onClick={() => setPriceRange([0, 150])} className="ml-1 hover:text-[#dc2626]">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Pastors Grid/List */}
        {filteredPastors.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredPastors.map((pastor, index) => (
              <PastorCardWithVideo
                key={pastor.id}
                pastor={pastor}
                onViewProfile={handleViewProfile}
                onBookSession={handleBookSession}
                videoIndex={index}
                layout={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20" data-aos="fade-up">
            <div className="w-24 h-24 bg-[#f0f4f8] rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-[#102a43] mb-2">No pastors found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We couldn't find any pastors matching your criteria. Try adjusting your filters or search terms.
            </p>
            <Button onClick={clearFilters} className="bg-[#102a43] hover:bg-[#243b53]">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredPastors.length > 0 && (
          <div className="text-center mt-12" data-aos="fade-up">
            <Button variant="outline" className="border-[#102a43] text-[#102a43] hover:bg-[#102a43] hover:text-white px-8">
              Load More Pastors
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="bg-[#102a43] py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
            <p className="text-gray-300 mb-6">
              Our team is here to help you find the right spiritual guide for your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#dc2626] hover:bg-[#b91c1c] text-white">
                Contact Support
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Take a Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
