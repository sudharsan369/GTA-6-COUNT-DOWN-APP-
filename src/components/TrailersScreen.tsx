import React, { useState } from 'react';
import { TRAILERS_DATA } from '../data/trailers';

interface TrailersScreenProps {
  onShowToast: (msg: string) => void;
}

export const TrailersScreen: React.FC<TrailersScreenProps> = ({ onShowToast }) => {
  const [isPlayingTrailer1, setIsPlayingTrailer1] = useState(false);

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 space-y-4 max-w-xl mx-auto relative z-10">
      {/* Subheader */}
      <div className="flex items-center justify-between pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff479c]/20 border border-[#ff479c]/30 shadow-[0_0_16px_rgba(255,71,156,0.3)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb0ca] animate-pulse"></span>
          <span className="font-display text-[11px] font-bold tracking-widest text-[#ffb0ca] uppercase">
            OFFICIAL CINEMATICS
          </span>
        </div>
        <span className="font-mono text-xs text-[#00dbe9]">4K 60FPS MASTER</span>
      </div>

      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#e4e1ec]">
          TRAILER BREAKDOWN
        </h2>
        <p className="text-sm text-[#e3bdc7] mt-0.5">
          Frame-by-frame analysis, Easter eggs, and verified vehicle registers
        </p>
      </div>

      {/* Main Trailer 1 Card with Embedded Player */}
      <div className="rounded-2xl overflow-hidden bg-[#1b1b23] border border-white/10 shadow-xl">
        <div className="relative aspect-video w-full bg-black">
          {isPlayingTrailer1 ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/QdBZY2fkU-0?autoplay=1&modestbranding=1&rel=0"
              title="GTA VI Official Trailer 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div
              onClick={() => {
                setIsPlayingTrailer1(true);
                onShowToast('Playing Trailer 1 in 4K UHD...');
              }}
              className="relative w-full h-full cursor-pointer group"
            >
              <img
                src={TRAILERS_DATA[0].thumbnail}
                alt="Trailer 1 Thumbnail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#ff479c] flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,71,156,0.8)] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[36px] ml-1">play_arrow</span>
                </div>
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 font-mono text-xs text-white">
                {TRAILERS_DATA[0].duration} • 4K UHD
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#00dbe9]">
            <span>{TRAILERS_DATA[0].releaseDate}</span>
            <span>{TRAILERS_DATA[0].views}</span>
          </div>
          <h3 className="font-display text-lg font-bold text-white mt-1">
            {TRAILERS_DATA[0].title}
          </h3>

          <div className="mt-4 pt-3 border-t border-white/10">
            <h4 className="font-display text-xs font-bold text-[#ffb0ca] uppercase tracking-wider mb-2">
              KEYFRAME HIGHLIGHTS & EASTER EGGS
            </h4>
            <div className="space-y-1.5">
              {TRAILERS_DATA[0].highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#e3bdc7]">
                  <span className="material-symbols-outlined text-[#00dbe9] text-[15px] mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer 2 Speculation Card */}
      <div className="p-4 rounded-xl bg-[#1f1f27] border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-[#00dbe9]">ANTICIPATED ANNOUNCEMENT</span>
          <span className="font-mono text-xs text-[#ff479c]">TRAILER 2</span>
        </div>
        <h4 className="font-display text-base font-bold text-white">
          Gameplay Deep-Dive & Pre-Order Window
        </h4>
        <p className="text-xs text-[#e3bdc7] mt-1 leading-relaxed">
          Historical Rockstar marketing schedules suggest Trailer 2 will premiere alongside
          PlayStation 5 Pro enhancements showcase, highlighting 60 FPS Ray Tracing and dynamic AI interactions.
        </p>
      </div>
    </div>
  );
};
