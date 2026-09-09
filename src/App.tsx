import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TabType, Wallpaper } from './types';
import { INITIAL_WALLPAPERS } from './data/wallpapers';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WallpaperVault } from './components/WallpaperVault';
import { WallpaperModal } from './components/WallpaperModal';
import { CountdownScreen } from './components/CountdownScreen';
import { NewsScreen } from './components/NewsScreen';
import { TrailersScreen } from './components/TrailersScreen';
import { SystemScreen } from './components/SystemScreen';
import { Toast } from './components/Toast';
import { FlutterExportModal } from './components/FlutterExportModal';
import { NotificationsModal } from './components/NotificationsModal';
import { ApkDownloadModal } from './components/ApkDownloadModal';
import { AndroidFrameWrapper } from './components/AndroidFrameWrapper';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('wallpapers');
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(INITIAL_WALLPAPERS);
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

  // Modals and drawers
  const [isApkModalOpen, setIsApkModalOpen] = useState(true);
  const [isFlutterModalOpen, setIsFlutterModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAndroidFrameActive, setIsAndroidFrameActive] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToastMessage(msg);
    setIsToastVisible(true);
    const timer = setTimeout(() => {
      setIsToastVisible(false);
    }, 2400);
    setToastTimer(timer);
  };

  const handleToggleFavorite = (id: string) => {
    setWallpapers((prev) =>
      prev.map((wp) => {
        if (wp.id === id) {
          const nextState = !wp.isFavorite;
          showToast(nextState ? `Saved ${wp.title} to Vice City favorites` : `Removed from favorites`);
          if (nextState) {
            confetti({
              particleCount: 35,
              spread: 60,
              origin: { y: 0.8 },
              colors: ['#ff479c', '#00eefc', '#dbb8ff'],
            });
          }
          return { ...wp, isFavorite: nextState };
        }
        return wp;
      })
    );

    if (selectedWallpaper && selectedWallpaper.id === id) {
      setSelectedWallpaper((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  const handleDownloadWallpaper = (wp: Wallpaper) => {
    showToast(`Downloading ${wp.title} in 4K UHD...`);
    const a = document.createElement('a');
    a.href = wp.imageUrl;
    a.download = `${wp.title.toLowerCase().replace(/\s+/g, '-')}-4k.jpg`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSetAsWallpaper = (wp: Wallpaper, type: 'both' | 'home' | 'lock') => {
    const targetLabel = type === 'both' ? 'Home & Lock Screen' : type === 'home' ? 'Home Screen' : 'Lock Screen';
    showToast(`Applied ${wp.title} to Android ${targetLabel}!`);
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00eefc', '#ff479c', '#ffffff'],
    });
  };

  return (
    <div className="min-h-screen bg-[#13131a] text-[#e4e1ec] font-sans antialiased relative selection:bg-[#ff479c] selection:text-white">
      <AndroidFrameWrapper isActive={isAndroidFrameActive}>
        {/* Dynamic Ambient Lighting Underlay */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-32 right-[-20%] w-[320px] h-[320px] rounded-full bg-[#ff479c]/15 blur-[120px]" />
          <div className="absolute top-1/3 left-[-25%] w-[280px] h-[280px] rounded-full bg-[#00eefc]/10 blur-[130px]" />
          <div className="absolute bottom-10 right-[-10%] w-[300px] h-[300px] rounded-full bg-[#b26fff]/10 blur-[140px]" />
        </div>

        {/* Top Header Bar */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onNotificationClick={() => setIsNotificationsOpen(true)}
          onToggleFlutterDrawer={() => setIsFlutterModalOpen(true)}
          onOpenApkModal={() => setIsApkModalOpen(true)}
        />

        {/* Quick Android APK Download Bar */}
        <div className="relative z-30 pt-16 px-3 bg-gradient-to-r from-[#171622] via-[#0d0c14] to-[#171622] border-b border-white/5">
          <div className="max-w-xl mx-auto py-1.5 flex items-center justify-between gap-2">
            <div
              onClick={() => setIsApkModalOpen(true)}
              className="flex items-center gap-2 min-w-0 cursor-pointer group"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00eefc] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00eefc]"></span>
              </span>
              <span className="font-mono text-[11px] text-white/90 group-hover:text-[#00eefc] transition-colors truncate">
                Android APK v1.0 Ready • <span className="text-[#ffb0ca] font-bold">GTA6_Leonida.apk</span>
              </span>
            </div>
            <button
              onClick={() => setIsApkModalOpen(true)}
              className="px-2.5 py-0.5 rounded-full bg-[#00eefc] hover:bg-[#00eefc]/90 text-black font-mono text-[10px] font-extrabold tracking-wider shrink-0 cursor-pointer shadow-[0_0_10px_rgba(0,238,252,0.4)]"
            >
              DOWNLOAD APK
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex flex-col relative w-full pt-1 min-h-screen bg-[#13131a] z-10">
          {activeTab === 'wallpapers' && (
            <WallpaperVault
              wallpapers={wallpapers}
              onToggleFavorite={handleToggleFavorite}
              onOpenWallpaperModal={(wp) => setSelectedWallpaper(wp)}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'home' && (
            <CountdownScreen
              onNavigateToPapers={() => setActiveTab('wallpapers')}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'news' && <NewsScreen onShowToast={showToast} />}

          {activeTab === 'trailers' && <TrailersScreen onShowToast={showToast} />}

          {activeTab === 'system' && (
            <SystemScreen
              onShowToast={showToast}
              isAndroidFrameActive={isAndroidFrameActive}
              onToggleAndroidFrame={() => {
                setIsAndroidFrameActive(!isAndroidFrameActive);
                showToast(!isAndroidFrameActive ? 'Android Frame View enabled' : 'Full width view enabled');
              }}
            />
          )}
        </main>

        {/* Bottom Floating Navigation Bar */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Fullscreen Wallpaper Modal & Android Simulator */}
        <WallpaperModal
          wallpaper={selectedWallpaper}
          onClose={() => setSelectedWallpaper(null)}
          onToggleFavorite={handleToggleFavorite}
          onDownload={handleDownloadWallpaper}
          onSetAsWallpaper={handleSetAsWallpaper}
        />

        {/* Dedicated Flutter & Dart Android Source Code Modal */}
        <FlutterExportModal
          isOpen={isFlutterModalOpen}
          onClose={() => setIsFlutterModalOpen(false)}
          onShowToast={showToast}
        />

        {/* Dedicated Android APK Download & Installation Modal */}
        <ApkDownloadModal
          isOpen={isApkModalOpen}
          onClose={() => setIsApkModalOpen(false)}
          onShowToast={showToast}
        />

        {/* System Notifications Modal */}
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onSelectPapers={() => {
            setActiveTab('wallpapers');
            setIsNotificationsOpen(false);
          }}
        />

        {/* Action Feedback Toast */}
        <Toast message={toastMessage} visible={isToastVisible} />
      </AndroidFrameWrapper>
    </div>
  );
}
