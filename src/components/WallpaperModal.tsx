import React, { useState } from 'react';
import { Wallpaper } from '../types';

interface WallpaperModalProps {
  wallpaper: Wallpaper | null;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  onDownload: (wp: Wallpaper) => void;
  onSetAsWallpaper: (wp: Wallpaper, type: 'both' | 'home' | 'lock') => void;
}

export const WallpaperModal: React.FC<WallpaperModalProps> = ({
  wallpaper,
  onClose,
  onToggleFavorite,
  onDownload,
  onSetAsWallpaper,
}) => {
  const [overlayMode, setOverlayMode] = useState<'clean' | 'lock' | 'home'>('clean');
  const [renderMode, setRenderMode] = useState<'gta-art' | 'amoled' | 'raw'>('gta-art');
  const [showApplyMenu, setShowApplyMenu] = useState(false);

  if (!wallpaper) return null;

  const getFilterClass = () => {
    switch (renderMode) {
      case 'gta-art':
        return 'contrast-[1.24] saturate-[1.45] brightness-[1.02]';
      case 'amoled':
        return 'contrast-[1.38] brightness-[0.92] saturate-[1.3]';
      case 'raw':
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      {/* Phone container */}
      <div className="relative w-full max-w-sm h-[90vh] max-h-[820px] rounded-[38px] overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col bg-[#13131a]">
        {/* Full Image */}
        <div className="absolute inset-0">
          <img
            src={wallpaper.imageUrl}
            alt={wallpaper.title}
            className={`w-full h-full object-cover transition-all duration-300 ${getFilterClass()}`}
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

          {/* GTA VI Art Watermark */}
          {renderMode === 'gta-art' && (
            <div className="absolute top-16 left-4 z-20 pointer-events-none">
              <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-[#ff479c]/50 font-mono text-[9px] font-extrabold text-[#ffb0ca] tracking-wider uppercase shadow-md">
                ★ GRAND THEFT AUTO VI ART ★
              </span>
            </div>
          )}
        </div>

        {/* Android Punch Hole & Status Bar */}
        <div className="relative z-20 pt-3 px-6 flex items-center justify-between text-white/90 text-xs font-mono">
          <span>09:41</span>
          <div className="w-4 h-4 rounded-full bg-black border border-white/20 mx-auto" />
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px]">signal_cellular_4_bar</span>
            <span className="material-symbols-outlined text-[15px]">wifi</span>
            <span className="material-symbols-outlined text-[15px]">battery_full</span>
          </div>
        </div>

        {/* Overlay Simulator: Android Lock Screen */}
        {overlayMode === 'lock' && (
          <div className="relative z-20 flex-1 flex flex-col items-center justify-start pt-16 px-6 pointer-events-none">
            <span className="text-6xl font-bold font-display tracking-tight text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              09:41
            </span>
            <span className="text-sm font-medium text-white/80 mt-1 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
              Wednesday, September 9 • Vice City, Leonida
            </span>

            {/* Lock Screen Notification */}
            <div className="mt-8 w-full p-3.5 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 text-white shadow-lg">
              <div className="flex items-center justify-between text-[11px] text-white/70">
                <span className="flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#ff479c]" /> ROCKSTAR GAMES
                </span>
                <span>Just now</span>
              </div>
              <p className="text-xs font-semibold mt-1">Vice City Telemetry Live</p>
              <p className="text-[11px] text-white/80">GTA VI Trailer 2 announcement window active.</p>
            </div>
          </div>
        )}

        {/* Overlay Simulator: Android Home Screen */}
        {overlayMode === 'home' && (
          <div className="relative z-20 flex-1 flex flex-col justify-end pb-24 px-6 pointer-events-none">
            {/* Search widget */}
            <div className="w-full h-11 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 px-4 flex items-center justify-between text-white/80 mb-6">
              <span className="text-xs font-mono">Search Vice City...</span>
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </div>

            {/* App icons row */}
            <div className="grid grid-cols-4 gap-4">
              {['Phone', 'Messages', 'Camera', 'GTA VI'].map((app, i) => (
                <div key={app} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/30 flex items-center justify-center text-white shadow-md">
                    <span className="material-symbols-outlined text-[24px]">
                      {i === 0 ? 'call' : i === 1 ? 'chat' : i === 2 ? 'photo_camera' : 'sports_esports'}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/90 drop-shadow">{app}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Control Bar */}
        <div className="relative z-30 mt-2 px-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/10">
            <button
              onClick={() => setOverlayMode('clean')}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                overlayMode === 'clean' ? 'bg-[#ff479c] text-white font-bold' : 'text-white/70'
              }`}
            >
              CLEAN
            </button>
            <button
              onClick={() => setOverlayMode('lock')}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                overlayMode === 'lock' ? 'bg-[#ff479c] text-white font-bold' : 'text-white/70'
              }`}
            >
              LOCK
            </button>
            <button
              onClick={() => setOverlayMode('home')}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                overlayMode === 'home' ? 'bg-[#ff479c] text-white font-bold' : 'text-white/70'
              }`}
            >
              HOME
            </button>
          </div>

          <button
            onClick={() => onToggleFavorite(wallpaper.id)}
            className={`w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center transition-all ${
              wallpaper.isFavorite ? 'text-[#ff479c]' : 'text-white hover:text-[#ff479c]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{
                fontVariationSettings: wallpaper.isFavorite ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              favorite
            </span>
          </button>
        </div>

        {/* Bottom Actions & Metadata */}
        <div className="relative z-30 mt-auto p-5 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#00eefc]">
                {wallpaper.badge} • {wallpaper.category}
              </span>
              <h3 className="text-xl font-bold font-display text-white">{wallpaper.title}</h3>
            </div>
            <span className="text-xs font-mono px-2 py-1 rounded bg-white/10 text-white/80">
              {wallpaper.resolution}
            </span>
          </div>

          {/* Quick Render Quality Selector */}
          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-black/60 border border-white/10 mb-3">
            <span className="text-[10px] font-mono text-[#ffb0ca] font-bold">ART ENGINE:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setRenderMode('gta-art')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                  renderMode === 'gta-art' ? 'bg-[#ff479c] text-white font-bold' : 'text-white/60'
                }`}
              >
                GTA ART
              </button>
              <button
                onClick={() => setRenderMode('amoled')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                  renderMode === 'amoled' ? 'bg-[#00eefc] text-black font-bold' : 'text-white/60'
                }`}
              >
                AMOLED
              </button>
              <button
                onClick={() => setRenderMode('raw')}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                  renderMode === 'raw' ? 'bg-[#2a2931] text-white font-bold' : 'text-white/60'
                }`}
              >
                RAW
              </button>
            </div>
          </div>

          <p className="text-xs text-[#e3bdc7] mb-4 line-clamp-2">{wallpaper.description}</p>

          {/* Apply Wallpaper Options Popup */}
          {showApplyMenu ? (
            <div className="grid grid-cols-3 gap-2 mb-3 bg-[#1f1f27]/95 p-2 rounded-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-2">
              <button
                onClick={() => {
                  onSetAsWallpaper(wallpaper, 'home');
                  setShowApplyMenu(false);
                }}
                className="py-2.5 px-2 rounded-xl bg-[#2a2931] hover:bg-[#34343c] text-white text-[11px] font-bold font-display flex flex-col items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px] text-[#00eefc]">home</span>
                <span>HOME SCREEN</span>
              </button>
              <button
                onClick={() => {
                  onSetAsWallpaper(wallpaper, 'lock');
                  setShowApplyMenu(false);
                }}
                className="py-2.5 px-2 rounded-xl bg-[#2a2931] hover:bg-[#34343c] text-white text-[11px] font-bold font-display flex flex-col items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px] text-[#ff479c]">lock</span>
                <span>LOCK SCREEN</span>
              </button>
              <button
                onClick={() => {
                  onSetAsWallpaper(wallpaper, 'both');
                  setShowApplyMenu(false);
                }}
                className="py-2.5 px-2 rounded-xl bg-gradient-to-br from-[#ff479c] to-[#b26fff] text-white text-[11px] font-bold font-display flex flex-col items-center gap-1"
              >
                <span className="material-symbols-outlined text-[18px]">smartphone</span>
                <span>BOTH</span>
              </button>
            </div>
          ) : null}

          {/* Main Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onDownload(wallpaper)}
              className="py-3 px-4 rounded-full bg-[#2a2931] hover:bg-[#34343c] text-white font-bold font-display text-xs tracking-wider flex items-center justify-center gap-2 border border-white/10 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#00eefc]">download</span>
              <span>DOWNLOAD 4K</span>
            </button>

            <button
              onClick={() => setShowApplyMenu(!showApplyMenu)}
              className="py-3 px-4 rounded-full bg-gradient-to-r from-[#ff479c] to-[#b26fff] text-white font-bold font-display text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,71,156,0.4)] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">wallpaper</span>
              <span>SET WALLPAPER</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
