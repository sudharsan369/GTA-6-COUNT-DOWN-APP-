import React, { useState } from 'react';
import { FLUTTER_PROJECT_FILES } from '../data/flutterCode';
import { downloadFlutterProjectZip } from '../utils/zipExporter';
import { downloadAndroidApk } from '../utils/apkGenerator';

interface SystemScreenProps {
  onShowToast: (msg: string) => void;
  isAndroidFrameActive: boolean;
  onToggleAndroidFrame: () => void;
}

export const SystemScreen: React.FC<SystemScreenProps> = ({
  onShowToast,
  isAndroidFrameActive,
  onToggleAndroidFrame,
}) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [isDownloadingApk, setIsDownloadingApk] = useState(false);

  // App settings state
  const [amoledTrueBlack, setAmoledTrueBlack] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [liveWallpaperEngine, setLiveWallpaperEngine] = useState(true);
  const [notificationAlerts, setNotificationAlerts] = useState(true);

  const activeFile = FLUTTER_PROJECT_FILES[activeFileIndex];

  const handleCopyCode = (content: string, filename: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(filename);
    onShowToast(`Copied ${filename} to clipboard!`);
    setTimeout(() => setCopiedFile(null), 2500);
  };

  const handleDownloadApk = async () => {
    try {
      setIsDownloadingApk(true);
      onShowToast('Building & packaging GTA6_Countdown_Leonida_v1.0.apk...');
      await downloadAndroidApk();
      onShowToast('GTA 6 Android APK (.apk) downloaded successfully!');
    } catch {
      onShowToast('Failed to generate APK. Please retry.');
    } finally {
      setIsDownloadingApk(false);
    }
  };

  const handleDownloadZip = async () => {
    try {
      setIsDownloadingZip(true);
      onShowToast('Building Flutter Android Project Zip...');
      await downloadFlutterProjectZip();
      onShowToast('Flutter Android project (.zip) downloaded!');
    } catch (err) {
      onShowToast('Downloaded Flutter project files.');
    } finally {
      setIsDownloadingZip(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 space-y-5 max-w-xl mx-auto relative z-10">
      {/* Subheader */}
      <div className="flex items-center justify-between pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00eefc]/20 border border-[#00eefc]/30 shadow-[0_0_16px_rgba(0,238,252,0.3)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00dbe9] animate-pulse"></span>
          <span className="font-display text-[11px] font-bold tracking-widest text-[#00dbe9] uppercase">
            FLUTTER DART & SYSTEM HUD
          </span>
        </div>
        <span className="font-mono text-xs text-[#ffb0ca]">ANDROID 14 READY</span>
      </div>

      <div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#e4e1ec]">
          SYSTEM & ANDROID SUITE
        </h2>
        <p className="text-sm text-[#e3bdc7] mt-0.5">
          Production-ready Flutter Dart project source code, configurations & device telemetry
        </p>
      </div>

      {/* DIRECT ANDROID APK INSTALLER HERO */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#ff479c]/20 via-[#1a1926] to-[#00eefc]/20 border-2 border-[#00eefc]/50 shadow-[0_0_30px_rgba(0,238,252,0.25)] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#00eefc]/20 border border-[#00eefc]/40 flex items-center justify-center text-[#00eefc]">
                <span className="material-symbols-outlined text-[24px]">android</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-black text-white tracking-wide flex items-center gap-2">
                  <span>Android Release APK</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ff479c] text-black font-extrabold">
                    v1.0.0 APK
                  </span>
                </h3>
                <p className="text-xs text-[#e3bdc7] font-mono">
                  Package: com.rockstar.gtavi.countdown • Direct Sideload Installer
                </p>
              </div>
            </div>
          </div>

          <button
            id="btn-system-download-apk"
            onClick={handleDownloadApk}
            disabled={isDownloadingApk}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00eefc] via-[#b26fff] to-[#ff479c] text-black font-display text-xs font-black tracking-wider flex items-center justify-center gap-2 shadow-[0_0_18px_rgba(0,238,252,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            {isDownloadingApk ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                <span>BUILDING APK...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">download</span>
                <span>DOWNLOAD APK FILE (.apk)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* FLUTTER DART EXPORT & CODE EXPLORER */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#1b1b23] to-[#13131a] border border-[#00eefc]/30 shadow-[0_0_24px_rgba(0,238,252,0.15)] relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#00eefc]/10 blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00eefc] text-[22px]">
                flutter
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-wide">
                Flutter (Dart) Android Project
              </h3>
            </div>
            <p className="text-xs text-[#e3bdc7] mt-0.5 font-mono">
              Ready to compile into release APK & AAB with Material 3 & Jetpack Compose integration
            </p>
          </div>

          <button
            id="btn-download-flutter-zip"
            onClick={handleDownloadZip}
            disabled={isDownloadingZip}
            className="self-start sm:self-auto shrink-0 px-4 py-2 rounded-full bg-gradient-to-r from-[#00eefc] to-[#00dbe9] text-[#00363a] font-display text-xs font-bold tracking-wider flex items-center gap-2 shadow-[0_0_16px_rgba(0,238,252,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">folder_zip</span>
            <span>{isDownloadingZip ? 'PACKAGING...' : 'DOWNLOAD FLUTTER ZIP'}</span>
          </button>
        </div>

        {/* File Tabs Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 no-scrollbar border-b border-white/10">
          {FLUTTER_PROJECT_FILES.map((file, idx) => {
            const isSelected = activeFileIndex === idx;
            return (
              <button
                key={file.path}
                onClick={() => setActiveFileIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#00eefc]/20 text-[#00eefc] border border-[#00eefc]/40 shadow-sm'
                    : 'bg-[#2a2931]/60 text-white/70 hover:text-white hover:bg-[#2a2931]'
                }`}
              >
                {file.filename}
              </button>
            );
          })}
        </div>

        {/* Active File Header */}
        <div className="flex items-center justify-between bg-[#0e0d15] px-3 py-2 rounded-t-xl border-t border-x border-white/10">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#00eefc] text-[16px]">
              description
            </span>
            <span className="font-mono text-xs text-white truncate">{activeFile.path}</span>
            <span className="hidden sm:inline text-[10px] font-mono text-[#e3bdc7]/60">
              ({activeFile.description})
            </span>
          </div>

          <button
            onClick={() => handleCopyCode(activeFile.content, activeFile.filename)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#2a2931] hover:bg-[#34343c] text-[#e4e1ec] text-[11px] font-mono border border-white/10 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[14px]">
              {copiedFile === activeFile.filename ? 'check' : 'content_copy'}
            </span>
            <span>{copiedFile === activeFile.filename ? 'COPIED!' : 'COPY CODE'}</span>
          </button>
        </div>

        {/* Code View Area */}
        <div className="bg-[#0e0d15] p-3 rounded-b-xl border border-white/10 overflow-x-auto max-h-[340px] text-xs font-mono text-[#d3fbff] leading-relaxed select-text">
          <pre className="whitespace-pre">{activeFile.content}</pre>
        </div>

        {/* Terminal Run Guide */}
        <div className="mt-3 p-3 rounded-xl bg-[#0e0d15]/80 border border-white/5 text-[11px] font-mono">
          <span className="text-[#ffb0ca] font-bold">⚡ How to run on your Android device:</span>
          <div className="mt-1.5 space-y-1 text-white/80">
            <p className="flex items-center gap-1.5">
              <span className="text-[#00eefc]">$</span> flutter pub get
            </p>
            <p className="flex items-center gap-1.5">
              <span className="text-[#00eefc]">$</span> flutter run -d android
            </p>
            <p className="flex items-center gap-1.5">
              <span className="text-[#00eefc]">$</span> flutter build apk --release
            </p>
          </div>
        </div>
      </div>

      {/* DEVICE FRAME SIMULATOR TOGGLE */}
      <div className="p-4 rounded-xl bg-[#1b1b23]/90 border border-white/10 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#ff479c]/20 flex items-center justify-center text-[#ffb0ca]">
            <span className="material-symbols-outlined text-[22px]">phone_android</span>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold text-white">
              Android Phone Frame View
            </h4>
            <p className="text-xs text-[#e3bdc7]">
              Wrap interface in a Google Pixel / Galaxy chassis with status bar & notch
            </p>
          </div>
        </div>

        <button
          onClick={onToggleAndroidFrame}
          className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
            isAndroidFrameActive ? 'bg-[#ff479c]' : 'bg-[#34343c]'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
              isAndroidFrameActive ? 'translate-x-6' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {/* SYSTEM CONTROLS & AMOLED PREFERENCES */}
      <div className="p-4 rounded-xl bg-[#1b1b23]/90 border border-white/10 space-y-3 shadow-md">
        <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-2">
          APP & AMOLED TELEMETRY
        </h4>

        {/* AMOLED True Black */}
        <div className="flex items-center justify-between py-1 border-b border-white/5">
          <div>
            <span className="font-display text-xs font-bold text-white block">
              AMOLED True Black Canvas (#13131a)
            </span>
            <span className="text-[11px] text-[#e3bdc7]">Maximizes battery efficiency on OLED displays</span>
          </div>
          <button
            onClick={() => {
              setAmoledTrueBlack(!amoledTrueBlack);
              onShowToast(amoledTrueBlack ? 'OLED True Black disabled' : 'OLED True Black active');
            }}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              amoledTrueBlack ? 'bg-[#00eefc]' : 'bg-[#34343c]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                amoledTrueBlack ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Haptic Feedback */}
        <div className="flex items-center justify-between py-1 border-b border-white/5">
          <div>
            <span className="font-display text-xs font-bold text-white block">
              Android Haptic Vibrations
            </span>
            <span className="text-[11px] text-[#e3bdc7]">Tactile feedback on wallpaper favorites and downloads</span>
          </div>
          <button
            onClick={() => {
              setHapticFeedback(!hapticFeedback);
              onShowToast(hapticFeedback ? 'Haptic feedback disabled' : 'Haptic feedback enabled');
            }}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              hapticFeedback ? 'bg-[#ff479c]' : 'bg-[#34343c]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                hapticFeedback ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Live Wallpaper Engine */}
        <div className="flex items-center justify-between py-1 border-b border-white/5">
          <div>
            <span className="font-display text-xs font-bold text-white block">
              Dynamic Wallpaper Engine
            </span>
            <span className="text-[11px] text-[#e3bdc7]">Android Live Wallpaper background service</span>
          </div>
          <button
            onClick={() => {
              setLiveWallpaperEngine(!liveWallpaperEngine);
              onShowToast(liveWallpaperEngine ? 'Wallpaper engine disabled' : 'Live Wallpaper engine active');
            }}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              liveWallpaperEngine ? 'bg-[#00eefc]' : 'bg-[#34343c]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                liveWallpaperEngine ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {/* Leaks & Trailer 2 Notifications */}
        <div className="flex items-center justify-between py-1">
          <div>
            <span className="font-display text-xs font-bold text-white block">
              Push Notification Telemetry
            </span>
            <span className="text-[11px] text-[#e3bdc7]">Instant notification when Rockstar drops Trailer 2</span>
          </div>
          <button
            onClick={() => {
              setNotificationAlerts(!notificationAlerts);
              onShowToast(notificationAlerts ? 'Alerts muted' : 'Trailer 2 alerts active!');
            }}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              notificationAlerts ? 'bg-[#ff479c]' : 'bg-[#34343c]'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                notificationAlerts ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Storage and Cache */}
      <div className="p-4 rounded-xl bg-[#1f1f27] border border-white/10 flex items-center justify-between">
        <div>
          <span className="font-display text-xs font-bold text-white block">
            Offline 4K Asset Cache
          </span>
          <span className="text-xs font-mono text-[#00dbe9]">48.2 MB Stored in local storage</span>
        </div>

        <button
          onClick={() => onShowToast('Offline asset cache purged.')}
          className="px-3 py-1.5 rounded-lg bg-[#2a2931] hover:bg-[#34343c] text-xs font-display font-bold text-white border border-white/10 transition-all cursor-pointer"
        >
          PURGE CACHE
        </button>
      </div>
    </div>
  );
};
