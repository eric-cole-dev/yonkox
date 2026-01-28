"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { EASING, DURATION } from "@/lib/animation-config";
import type { WorkshopVideo } from "@/lib/workshops-config";

interface WorkshopHeroProps {
  videos: {
    left?: WorkshopVideo;
    center: WorkshopVideo;
    right?: WorkshopVideo;
  };
  title: string;
  subtitle?: string;
}

type VideoPosition = 'left' | 'center' | 'right';

export default function WorkshopHero({ videos, title, subtitle }: WorkshopHeroProps) {
  const [expandedCard, setExpandedCard] = useState<VideoPosition>('center');
  const videoRefs = useRef<Record<string, HTMLIFrameElement | null>>({ left: null, center: null, right: null });

  const handleCardClick = (position: VideoPosition) => {
    setExpandedCard(position);
  };

  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const renderVideoCard = (position: VideoPosition, video?: WorkshopVideo) => {
    if (!video) return null;

    const isExpanded = expandedCard === position;
    const youtubeId = getYouTubeId(video.url);

    return (
      <motion.div
        key={position}
        onClick={() => handleCardClick(position)}
        className={`
          relative overflow-hidden cursor-pointer group
          transition-all duration-700 ease-in-out
          ${isExpanded ? 'flex-[2]' : 'flex-[0.5]'}
        `}
        style={{ minWidth: isExpanded ? '50%' : '20%' }}
      >
        {/* Video or Placeholder */}
        <div className="relative w-full h-full min-h-[600px] bg-black">
          {youtubeId ? (
            <iframe
              ref={(el) => { videoRefs.current[position] = el; }}
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${isExpanded && video.autoplay ? 1 : 0}&mute=1&loop=1&playlist=${youtubeId}&controls=1&modestbranding=1&rel=0`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // Placeholder if video URL is not set
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--foreground)]/10">
              <p className="text-[var(--foreground)] opacity-50 text-sm uppercase tracking-wider">
                Video Coming Soon
              </p>
            </div>
          )}

          {/* Overlay with Title (visible when collapsed or on hover) */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent
            flex items-end p-8 transition-opacity duration-500
            ${isExpanded ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}
          `}>
            <div>
              <h3 className="font-display font-bold text-2xl md:text-3xl uppercase text-white mb-2">
                {video.title}
              </h3>
              <p className="text-white/80 text-sm">{video.description}</p>
            </div>
          </div>

          {/* Click to Expand Hint (when collapsed) */}
          {!isExpanded && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary px-6 py-3">
              <p className="text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                Click to Expand
              </p>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative w-full">
      {/* Title Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-8 md:p-12">
        <div className="container mx-auto max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.heroReveal, ease: EASING.smooth }}
          >
            <h1 className="font-display font-bold text-5xl md:text-7xl uppercase text-white mb-3 tracking-tighter">
              {title}
            </h1>
            {subtitle && (
              <p className="text-white/90 font-display text-sm md:text-base uppercase tracking-widest">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Video Cards Container */}
      <div className="flex w-full">
        {renderVideoCard('left', videos.left)}
        {renderVideoCard('center', videos.center)}
        {renderVideoCard('right', videos.right)}
      </div>
    </section>
  );
}
