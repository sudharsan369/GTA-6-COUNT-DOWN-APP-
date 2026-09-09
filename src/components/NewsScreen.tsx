import React, { useState } from 'react';
import { NEWS_ITEMS } from '../data/news';
import { NewsItem } from '../types';

interface NewsScreenProps {
  onShowToast: (msg: string) => void;
}

export const NewsScreen: React.FC<NewsScreenProps> = ({ onShowToast }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 space-y-4 max-w-xl mx-auto relative z-10">
      {/* Subheader */}
      <div className="flex items-center justify-between pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff479c]/20 border border-[#ff479c]/30 shadow-[0_0_16px_rgba(255,71,156,0.3)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb0ca] animate-pulse"></span>
          <span className="font-display text-[11px] font-bold tracking-widest text-[#ffb0ca] uppercase">
            ROCKSTAR NEWSWIRE & LEAKS
          </span>
        </div>
        <span className="font-mono text-xs text-[#00dbe9]">COMMUNITY VERIFIED</span>
      </div>

      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#e4e1ec]">
          LEONIDA BULLETIN
        </h2>
        <p className="text-sm text-[#e3bdc7] mt-0.5">
          Confirmed gameplay leaks, financial reports, and development updates
        </p>
      </div>

      {/* News Cards */}
      <div className="space-y-3">
        {NEWS_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setSelectedNews(item);
              onShowToast(`Opened: ${item.tag}`);
            }}
            className="p-4 rounded-xl bg-[#1b1b23]/90 border border-white/10 hover:border-[#ff479c]/40 transition-all shadow-md cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[11px] font-mono mb-2">
              <span className="px-2 py-0.5 rounded bg-[#ff479c]/20 text-[#ffb0ca] font-bold">
                {item.tag}
              </span>
              <span className="text-[#e3bdc7]/70">{item.date}</span>
            </div>

            <h3 className="font-display text-base font-bold text-white group-hover:text-[#ffb0ca] transition-colors leading-snug">
              {item.title}
            </h3>

            <p className="text-xs text-[#e3bdc7] mt-2 line-clamp-2 leading-relaxed">
              {item.summary}
            </p>

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#00dbe9]">
              <span>Source: {item.source}</span>
              <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Read Report <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full read */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#1b1b23] rounded-2xl border border-white/20 p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <span className="px-2.5 py-1 rounded-full bg-[#ff479c]/20 text-[#ffb0ca] text-xs font-mono font-bold">
              {selectedNews.tag}
            </span>

            <h2 className="font-display text-xl font-bold text-white mt-3 leading-snug">
              {selectedNews.title}
            </h2>

            <div className="flex items-center gap-3 text-xs font-mono text-[#00dbe9] mt-2">
              <span>{selectedNews.date}</span>
              <span>•</span>
              <span>{selectedNews.readTime}</span>
              <span>•</span>
              <span>{selectedNews.source}</span>
            </div>

            <p className="text-sm text-[#e3bdc7] mt-4 leading-relaxed whitespace-pre-line">
              {selectedNews.summary}
              {'\n\n'}
              Key takeaways analyzed from the latest development leaks suggest Rockstar Games is prioritizing systemic fidelity over map density alone.
              The AI pedestrian system features over 1,200 unique daily routines, procedural conversational awareness, and adaptive reactions to weapon handling.
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-5 py-2.5 rounded-full bg-[#ff479c] text-white text-xs font-display font-bold tracking-wider"
              >
                CLOSE DISPATCH
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
