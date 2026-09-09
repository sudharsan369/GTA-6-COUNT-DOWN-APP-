import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'HOME', icon: 'explore' },
    { id: 'news', label: 'NEWS', icon: 'feed' },
    { id: 'trailers', label: 'TRAILERS', icon: 'smart_display' },
    { id: 'wallpapers', label: 'PAPERS', icon: 'wallpaper' },
    { id: 'system', label: 'SYSTEM', icon: 'tune' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-40 pointer-events-none pb-3 pt-1">
      <div className="max-w-xl mx-auto px-4">
        <div className="pointer-events-auto h-16 rounded-full bg-[#1b1b23]/90 backdrop-blur-2xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.12)] flex items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center w-14 h-12 transition-all duration-200 group relative ${
                  isActive
                    ? 'text-[#00eefc] drop-shadow-[0_0_10px_rgba(0,238,252,0.7)]'
                    : 'text-[#e3bdc7]/65 hover:text-[#e4e1ec]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[22px] transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-display text-[10px] font-bold mt-1 tracking-wider">
                  {item.label}
                </span>

                {/* Active cyan dot indicator */}
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#00eefc] shadow-[0_0_6px_#00eefc]"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
