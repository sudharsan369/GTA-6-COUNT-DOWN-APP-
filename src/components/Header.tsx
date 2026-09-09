import React, { useState } from 'react';
import { TabType } from '../types';
import { viceCityAudio } from '../utils/audioSynth';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onNotificationClick: () => void;
  onToggleFlutterDrawer?: () => void;
  onOpenApkModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  setActiveTab,
  onNotificationClick,
  onToggleFlutterDrawer,
  onOpenApkModal,
}) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const toggleSynthMusic = () => {
    if (isPlayingSound) {
      viceCityAudio.stop();
      setIsPlayingSound(false);
    } else {
      viceCityAudio.start();
      setIsPlayingSound(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-[#13131a]/85 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      <div className="max-w-xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand */}
        <div
          className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer select-none"
          onClick={() => setActiveTab('home')}
        >
          <div className="relative shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff479c] via-[#b26fff] to-[#00eefc] p-[1.5px] shadow-[0_0_14px_rgba(255,71,156,0.4)]">
            <div className="w-full h-full bg-[#13131a] rounded-[7px] flex items-center justify-center font-bold font-display text-[15px] tracking-tight text-white">
              VI
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-[17px] font-bold tracking-wider text-[#e4e1ec] truncate drop-shadow-[0_0_12px_rgba(255,176,202,0.45)]">
                GTA VI COUNTDOWN
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono font-extrabold rounded bg-[#00eefc] text-black tracking-wider animate-pulse">
                REAL-TIME
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9.5px] font-semibold text-[#ffb0ca] uppercase tracking-widest truncate">
                LIVE COUNTDOWN FROM TODAY ONWARDS
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Direct Android APK download button */}
          <button
            id="btn-header-get-apk"
            onClick={onOpenApkModal || (() => setActiveTab('system'))}
            aria-label="Download Android APK"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#00eefc]/25 to-[#ff479c]/25 border border-[#00eefc]/50 text-white hover:border-[#00eefc] transition-all text-xs font-mono font-extrabold shadow-[0_0_12px_rgba(0,238,252,0.3)] cursor-pointer"
            title="Download & Install Android APK (.apk)"
          >
            <span className="material-symbols-outlined text-[15px] text-[#00eefc]">android</span>
            <span className="hidden xs:inline text-[#00eefc]">APK</span>
          </button>

          {/* Quick Flutter / Android source code pill */}
          <button
            id="btn-flutter-code"
            onClick={onToggleFlutterDrawer || (() => setActiveTab('system'))}
            aria-label="Flutter Dart Source Code"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00eefc]/15 border border-[#00eefc]/30 text-[#00eefc] hover:bg-[#00eefc]/25 transition-all text-xs font-mono font-bold"
            title="View Flutter & Dart Android Source Code"
          >
            <span className="material-symbols-outlined text-[15px]">code</span>
            <span>FLUTTER</span>
          </button>

          {/* Audio radio ambient toggle */}
          <button
            onClick={toggleSynthMusic}
            aria-label="Toggle Vice City Radio Synth"
            className={`w-9 h-9 rounded-full bg-[#2a2931]/70 backdrop-blur-md flex items-center justify-center transition-all ${
              isPlayingSound ? 'text-[#ff479c] shadow-[0_0_10px_#ff479c]' : 'text-[#e4e1ec] hover:text-[#ffb0ca]'
            }`}
            title={isPlayingSound ? 'Pause Vice Synth' : 'Play Vice City Ambient Beat'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPlayingSound ? 'volume_up' : 'volume_off'}
            </span>
          </button>

          {/* Notifications button */}
          <button
            id="header-notification-btn"
            onClick={onNotificationClick}
            aria-label="Notifications"
            className="relative w-9 h-9 rounded-full bg-[#2a2931]/70 backdrop-blur-md flex items-center justify-center text-[#e4e1ec] hover:text-[#ffb0ca] transition-colors"
          >
            <span className="material-symbols-outlined text-[19px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff479c] shadow-[0_0_8px_#ff479c]"></span>
          </button>

          {/* Settings button */}
          <button
            id="header-settings-btn"
            onClick={() => setActiveTab('system')}
            aria-label="Settings Console"
            className="w-9 h-9 rounded-full bg-[#2a2931]/70 backdrop-blur-md flex items-center justify-center text-[#e4e1ec] hover:text-[#00dbe9] transition-colors"
          >
            <span className="material-symbols-outlined text-[19px]">settings</span>
          </button>

          {/* User profile avatar */}
          <div className="w-8 h-8 rounded-full bg-[#ffb0ca] flex items-center justify-center shadow-[0_0_12px_rgba(255,176,202,0.3)]">
            <span className="material-symbols-outlined text-[#640036] text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
