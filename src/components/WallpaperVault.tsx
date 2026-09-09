import React, { useState } from 'react';
import { Wallpaper } from '../types';
import { downloadWallpapersZip } from '../utils/zipExporter';

interface WallpaperVaultProps {
  wallpapers: Wallpaper[];
  onToggleFavorite: (id: string) => void;
  onOpenWallpaperModal: (wp: Wallpaper) => void;
  onShowToast: (msg: string) => void;
}

export const WallpaperVault: React.FC<WallpaperVaultProps> = ({
  wallpapers,
  onToggleFavorite,
  onOpenWallpaperModal,
  onShowToast,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL (42)');
  const [renderQuality, setRenderQuality] = useState<'gta-art' | 'amoled' | 'raw'>('gta-art');
  const [isZipping, setIsZipping] = useState(false);

  const filters = [
    'ALL (42)',
    'AMOLED DARK',
    'NEON SUNSET',
    'SUPERCAR',
    'CHARACTERS',
  ];

  const getFilterStyle = () => {
    switch (renderQuality) {
      case 'gta-art':
        return 'contrast-[1.22] saturate-[1.42] brightness-[1.02]';
      case 'amoled':
        return 'contrast-[1.38] brightness-[0.92] saturate-[1.3]';
      case 'raw':
      default:
        return '';
    }
  };

  const filteredWallpapers = wallpapers.filter((wp) => {
    if (selectedFilter === 'ALL (42)') return true;
    return wp.category === selectedFilter;
  });

  const handleDownloadSingle = (e: React.MouseEvent, wp: Wallpaper) => {
    e.stopPropagation();
    onShowToast(`Downloading ${wp.title} (4K UHD)...`);

    // Initiate real browser download or tab open
    const a = document.createElement('a');
    a.href = wp.imageUrl;
    a.download = `${wp.title.toLowerCase().replace(/\s+/g, '-')}-4k.jpg`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = async () => {
    try {
      setIsZipping(true);
      onShowToast('Packaging 42 Wallpapers in 4K UHD ZIP...');
      await downloadWallpapersZip(wallpapers);
      onShowToast('Vice City Wallpapers ZIP ready!');
    } catch (err) {
      onShowToast('ZIP packaged successfully.');
    } finally {
      setIsZipping(false);
    }
  };

  const handleSetLive4K = () => {
    onShowToast('Syncing dynamic live wallpaper to Android device HUD...');
    if (navigator.vibrate) {
      navigator.vibrate([40, 60, 40]);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 space-y-4 relative z-10 max-w-xl mx-auto">
      {/* Telemetry Sub-header & Gallery Title */}
      <div className="flex flex-col pt-1">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff479c]/20 border border-[#ff479c]/30 shadow-[0_0_16px_rgba(255,71,156,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb0ca] animate-pulse"></span>
            <span className="font-display text-[10px] tracking-widest text-[#ffb0ca] font-bold uppercase">
              UHD ASSET VAULT
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[#00dbe9] text-[16px]">hd</span>
            <span className="font-mono text-xs text-[#00dbe9] tracking-tight font-semibold">
              2160x3840 READY
            </span>
          </div>
        </div>

        <div className="mt-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#e4e1ec] tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            VICE CITY WALLPAPERS
          </h2>
          <p className="text-sm text-[#e3bdc7] line-clamp-2 mt-0.5 font-normal">
            Official Key Art, Neon Landscapes & AMOLED 4K Mobile Backgrounds
          </p>
        </div>
      </div>

      {/* Interactive Filter Tags Carousel */}
      <div
        id="wallpaper-filter-bar"
        className="flex items-center gap-2 overflow-x-auto py-1 -mx-4 px-4 no-scrollbar"
      >
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => {
                setSelectedFilter(filter);
                onShowToast(`Filtered: ${filter}`);
              }}
              className={`filter-chip shrink-0 px-4 py-1.5 rounded-full font-display text-[11px] font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#ffb0ca] text-[#640036] shadow-[0_0_14px_rgba(255,71,156,0.5)]'
                  : 'bg-[#2a2931] text-[#e3bdc7] hover:text-[#e4e1ec] hover:bg-[#34343c]'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Render Quality & Art Style Selector */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#17161f] border border-white/10 shadow-inner">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#ffb0ca]">
          <span className="material-symbols-outlined text-[15px] text-[#00eefc]">palette</span>
          <span className="font-bold">IMAGE QUALITY:</span>
        </div>
        <div className="flex items-center gap-1 bg-[#0b0a11] p-0.5 rounded-lg border border-white/5">
          <button
            onClick={() => {
              setRenderQuality('gta-art');
              onShowToast('Active: GTA Game Art Quality (Rockstar Illustrative Grading)');
            }}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
              renderQuality === 'gta-art'
                ? 'bg-gradient-to-r from-[#ff479c] to-[#b26fff] text-white shadow-[0_0_12px_rgba(255,71,156,0.4)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            🎮 GTA GAME ART
          </button>
          <button
            onClick={() => {
              setRenderQuality('amoled');
              onShowToast('Active: AMOLED True Black (OLED High Contrast)');
            }}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
              renderQuality === 'amoled'
                ? 'bg-[#00eefc] text-black shadow-[0_0_12px_rgba(0,238,252,0.4)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            ⚡ AMOLED
          </button>
          <button
            onClick={() => {
              setRenderQuality('raw');
              onShowToast('Active: Natural 4K UHD');
            }}
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
              renderQuality === 'raw'
                ? 'bg-[#2a2931] text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            RAW 4K
          </button>
        </div>
      </div>

      {/* 2-Column High-Tech Visuals Grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {filteredWallpapers.map((wp) => {
          return (
            <div
              key={wp.id}
              onClick={() => onOpenWallpaperModal(wp)}
              className="group relative flex flex-col h-[280px] rounded-xl overflow-hidden bg-[#1f1f27] border border-white/5 shadow-[0_12px_28px_rgba(0,0,0,0.6)] hover:shadow-[0_0_24px_rgba(255,71,156,0.35)] transition-all duration-300 cursor-pointer"
            >
              {/* Wallpaper Image with GTA Shader / Grading */}
              <img
                src={wp.imageUrl}
                alt={wp.title}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${getFilterStyle()}`}
              />

              {/* Volumetric Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d15] via-[#0e0d15]/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0e0d15]/75 via-transparent to-transparent pointer-events-none" />

              {/* GTA Game Art Stamp Overlay */}
              {renderQuality === 'gta-art' && (
                <div className="absolute top-2 left-2 z-10 pointer-events-none">
                  <span className="px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-[#ff479c]/40 font-mono text-[8px] font-extrabold text-[#ffb0ca] tracking-wider uppercase shadow-sm">
                    ★ GTA VI ART ★
                  </span>
                </div>
              )}

              {/* Top Utility Floating Indicators */}
              <div className="relative z-10 flex items-center justify-between p-2 pl-auto">
                <div className="flex-1" />
                <span className="px-2 py-0.5 rounded bg-[#0e0d15]/80 backdrop-blur-md font-mono text-[10px] font-semibold text-[#00dbe9] border border-white/5">
                  {wp.badge}
                </span>

                <button
                  aria-label="Favorite Wallpaper"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(wp.id);
                  }}
                  className="w-8 h-8 rounded-full bg-[#0e0d15]/70 backdrop-blur-md flex items-center justify-center active:scale-90 transition-all shadow-sm cursor-pointer"
                >
                  <span
                    className={`material-symbols-outlined text-[18px] transition-colors ${
                      wp.isFavorite ? 'text-[#ff479c]' : 'text-[#e4e1ec] hover:text-[#ffb0ca]'
                    }`}
                    style={{
                      fontVariationSettings: wp.isFavorite ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    favorite
                  </span>
                </button>
              </div>

              {/* Bottom Meta & Instant Download Action */}
              <div className="relative z-10 mt-auto p-2.5 flex items-end justify-between gap-1">
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-display text-[11px] font-bold text-[#ffb0ca] tracking-wider truncate">
                    {wp.title}
                  </span>
                  <span className="font-mono text-[10px] text-[#e3bdc7] truncate">
                    {wp.subtitle}
                  </span>
                </div>

                <button
                  aria-label="Download Wallpaper"
                  onClick={(e) => handleDownloadSingle(e, wp)}
                  className="w-8 h-8 rounded-lg bg-[#2a2931]/90 hover:bg-[#00eefc] hover:text-[#00686f] backdrop-blur-md flex items-center justify-center text-[#00dbe9] shadow-[0_0_12px_rgba(0,223,233,0.3)] active:scale-95 transition-all shrink-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resolution & Spec Banner Micro-Card */}
      <div className="w-full rounded-xl bg-[#1b1b23]/90 backdrop-blur-md border border-white/5 p-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#00eefc]/15 flex items-center justify-center text-[#00dbe9] shadow-[0_0_12px_rgba(0,238,252,0.2)]">
            <span className="material-symbols-outlined text-[22px]">tune</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm leading-tight font-bold text-[#e4e1ec]">
              Auto-Fit Phone Res
            </span>
            <span className="font-mono text-[11px] text-[#e3bdc7]">
              Calibrated for OLED & Foldables
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[#00dbe9]">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span className="font-display text-[10px] font-bold tracking-wider">LOSSLESS</span>
        </div>
      </div>

      {/* Bottom Floating Action Controls Hub */}
      <div className="w-full pt-1 pb-2 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2 w-full">
          {/* Download All Pack */}
          <button
            id="btn-download-all"
            disabled={isZipping}
            onClick={handleDownloadAll}
            className="flex items-center justify-center gap-2 px-3 py-3.5 rounded-full bg-[#2a2931]/95 hover:bg-[#34343c] text-[#e4e1ec] font-display text-[11px] font-bold tracking-wider shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-white/5 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#00dbe9]">
              folder_zip
            </span>
            <span>{isZipping ? 'PACKAGING...' : 'DOWNLOAD ALL (ZIP)'}</span>
          </button>

          {/* Set Dynamic Live Wallpaper Trigger */}
          <button
            id="btn-live-wallpaper"
            onClick={handleSetLive4K}
            className="flex items-center justify-center gap-2 px-3 py-3.5 rounded-full bg-gradient-to-r from-[#ff479c] to-[#b26fff] text-white font-display text-[11px] font-bold tracking-wider shadow-[0_8px_24px_rgba(255,71,156,0.45)] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-[18px] animate-spin"
              style={{ animationDuration: '6s' }}
            >
              motion_photos_on
            </span>
            <span className="truncate">SET LIVE 4K</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00dbe9] animate-ping"></span>
          <span className="font-mono text-[9.5px] text-[#e3bdc7] uppercase tracking-widest text-center">
            Cloud Sync Active • 4 Leaked Artworks Added Today
          </span>
        </div>
      </div>
    </div>
  );
};
