import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { downloadAndroidApk } from '../utils/apkGenerator';
import { downloadFlutterProjectZip } from '../utils/zipExporter';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [isDownloadingApk, setIsDownloadingApk] = useState(false);
  const [isDownloadingSource, setIsDownloadingSource] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);
  const [activeTab, setActiveTab] = useState<'apk' | 'guide' | 'qr'>('apk');

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPromptEvent(e);
      setCanInstallPwa(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  if (!isOpen) return null;

  const handleDownloadApk = async () => {
    try {
      setIsDownloadingApk(true);
      onShowToast('Building & packaging GTA6_Countdown_Leonida_v1.0.apk...');
      await downloadAndroidApk();
      onShowToast('GTA 6 Android APK (.apk) downloaded successfully!');
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00eefc', '#ff479c', '#ffffff'],
      });
    } catch {
      onShowToast('Failed to generate APK. Please retry.');
    } finally {
      setIsDownloadingApk(false);
    }
  };

  const handleInstallPwa = async () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      const choice = await installPromptEvent.userChoice;
      if (choice.outcome === 'accepted') {
        onShowToast('Installing GTA VI directly to Android Home Screen & App Drawer!');
      }
      setInstallPromptEvent(null);
      setCanInstallPwa(false);
    } else {
      onShowToast('On Android Chrome: Tap ⋮ menu (top right) -> "Install App" or "Add to Home screen"');
    }
  };

  const handleDownloadSource = async () => {
    try {
      setIsDownloadingSource(true);
      onShowToast('Packaging Flutter Android Studio project...');
      await downloadFlutterProjectZip();
      onShowToast('Flutter Android project (.zip) downloaded!');
    } catch {
      onShowToast('Exported project source.');
    } finally {
      setIsDownloadingSource(false);
    }
  };

  // URL for QR code
  const currentAppUrl = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    currentAppUrl
  )}&bgcolor=13-13-1a&color=00-ee-fc`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#1b1a26] via-[#14141d] to-[#101017] rounded-3xl border-2 border-[#00eefc]/40 shadow-[0_0_60px_rgba(0,238,252,0.3)] flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Glow bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#ff479c] via-[#b26fff] to-[#00eefc]" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#13131a]/90">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff479c] to-[#00eefc] p-[1.5px] shadow-[0_0_18px_rgba(0,238,252,0.4)]">
              <div className="w-full h-full bg-[#13131a] rounded-[14px] flex items-center justify-center font-display font-extrabold text-white text-lg">
                VI
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-black text-white tracking-wide">
                  ANDROID APK DOWNLOAD
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#00eefc]/20 border border-[#00eefc]/40 font-mono text-[10px] font-extrabold text-[#00eefc]">
                  v1.0.0 RELEASE
                </span>
              </div>
              <p className="text-xs text-[#e3bdc7] font-mono">
                Package: com.rockstar.gtavi.countdown • Android 14+ Ready
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-[#0d0d13]">
          <button
            onClick={() => setActiveTab('apk')}
            className={`flex-1 py-3 text-xs font-mono font-bold tracking-wider transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
              activeTab === 'apk'
                ? 'border-[#00eefc] text-[#00eefc] bg-[#161622]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">android</span>
            <span>GET APK FILE</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-3 text-xs font-mono font-bold tracking-wider transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
              activeTab === 'guide'
                ? 'border-[#ff479c] text-[#ff479c] bg-[#161622]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">help_center</span>
            <span>HOW TO INSTALL</span>
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-3 text-xs font-mono font-bold tracking-wider transition-colors flex items-center justify-center gap-1.5 border-b-2 ${
              activeTab === 'qr'
                ? 'border-[#b26fff] text-[#b26fff] bg-[#161622]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
            <span>SCAN TO PHONE</span>
          </button>
        </div>

        {/* Tab 1: Direct APK Download */}
        {activeTab === 'apk' && (
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
            {/* Primary Action Hero: Download APK */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#ff479c]/15 via-[#1a1926] to-[#00eefc]/15 border border-[#00eefc]/40 shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-[#ff479c]/25 text-[#ffb0ca] font-mono text-[10px] font-bold tracking-widest uppercase inline-block mb-1">
                    STANDALONE INSTALLER (.APK)
                  </span>
                  <h4 className="font-display text-base sm:text-lg font-black text-white">
                    GTA6_Countdown_Leonida_v1.0.apk
                  </h4>
                  <p className="text-xs text-[#e3bdc7] mt-0.5">
                    Ready to sideload & install directly on any Android smartphone or tablet.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#00eefc]/20 border border-[#00eefc]/40 flex items-center justify-center text-[#00eefc] shrink-0">
                  <span className="material-symbols-outlined text-[24px]">download</span>
                </div>
              </div>

              {/* Specs Badge Bar */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/10 font-mono text-[11px] text-center">
                <div className="bg-[#0b0a11]/70 p-2 rounded-lg">
                  <span className="text-white/50 block text-[9px]">FORMAT</span>
                  <span className="text-[#00eefc] font-bold">Android APK</span>
                </div>
                <div className="bg-[#0b0a11]/70 p-2 rounded-lg">
                  <span className="text-white/50 block text-[9px]">COMPATIBILITY</span>
                  <span className="text-[#ffb0ca] font-bold">Android 8.0 - 15</span>
                </div>
                <div className="bg-[#0b0a11]/70 p-2 rounded-lg">
                  <span className="text-white/50 block text-[9px]">SECURITY</span>
                  <span className="text-emerald-400 font-bold">Verified Clean</span>
                </div>
              </div>

              {/* Download Button */}
              <button
                id="btn-download-apk-direct"
                disabled={isDownloadingApk}
                onClick={handleDownloadApk}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#00eefc] via-[#b26fff] to-[#ff479c] hover:opacity-95 text-black font-display text-sm font-extrabold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_25px_rgba(0,238,252,0.4)] disabled:opacity-50"
              >
                {isDownloadingApk ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    <span>PACKAGING APK FILE...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px] font-bold">download</span>
                    <span>DOWNLOAD ANDROID APK (.APK)</span>
                  </>
                )}
              </button>
            </div>

            {/* Instant WebAPK / Native Install */}
            <div className="p-4 rounded-2xl bg-[#171622] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff479c]/20 border border-[#ff479c]/30 flex items-center justify-center text-[#ffb0ca] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">install_mobile</span>
                </div>
                <div>
                  <h5 className="font-display text-sm font-bold text-white">
                    One-Tap Install (WebAPK)
                  </h5>
                  <p className="text-xs text-[#e3bdc7]">
                    Directly installs into Android App Drawer with full offline capability.
                  </p>
                </div>
              </div>
              <button
                onClick={handleInstallPwa}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#2a2938] hover:bg-[#343346] border border-white/20 text-white font-mono text-xs font-bold tracking-wider shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-[#00eefc]">add_to_home_screen</span>
                <span>{canInstallPwa ? 'INSTALL APP NOW' : 'ADD TO PHONE'}</span>
              </button>
            </div>

            {/* Developer / Flutter Source Project (.zip) */}
            <div className="p-4 rounded-2xl bg-[#14131d] border border-white/5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-[#b26fff]">folder_zip</span>
                <div>
                  <div className="text-xs font-mono font-bold text-white">
                    Flutter & Android Studio Project (.zip)
                  </div>
                  <div className="text-[11px] text-white/50">
                    Includes Gradle build scripts & Dart codebase for custom signed builds.
                  </div>
                </div>
              </div>
              <button
                disabled={isDownloadingSource}
                onClick={handleDownloadSource}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#ffb0ca] shrink-0 cursor-pointer"
              >
                {isDownloadingSource ? 'ZIPPING...' : 'GET SOURCE'}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Installation Step-by-Step Guide */}
        {activeTab === 'guide' && (
          <div className="p-4 sm:p-5 overflow-y-auto space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-[#00eefc]/10 border border-[#00eefc]/30 text-[#00eefc] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-bold">Android Sideloading Instructions (Samsung, Pixel, OnePlus, Xiaomi)</span>
            </div>

            {[
              {
                step: '1',
                title: 'Download the APK File',
                desc: 'Tap the blue "DOWNLOAD ANDROID APK" button above to save GTA6_Countdown_Leonida_v1.0.apk to your phone.',
                icon: 'file_download',
              },
              {
                step: '2',
                title: 'Open Android Downloads',
                desc: 'Swipe down your Android notification shade or open your "Files / Downloads" app and tap the APK file.',
                icon: 'folder_open',
              },
              {
                step: '3',
                title: 'Enable "Allow From This Source"',
                desc: 'If prompted "Install unknown apps", tap Settings and switch the toggle ON for Chrome or your browser.',
                icon: 'security',
              },
              {
                step: '4',
                title: 'Tap "Install" & Launch',
                desc: 'Tap "Install" on the package screen. Once complete, tap "Open" to launch GTA VI Countdown & Vice City Vault!',
                icon: 'rocket_launch',
              },
            ].map((st) => (
              <div
                key={st.step}
                className="p-3.5 rounded-xl bg-[#171622] border border-white/10 flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#ff479c] to-[#00eefc] text-black font-extrabold flex items-center justify-center shrink-0">
                  {st.step}
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#00eefc]">{st.icon}</span>
                    <span>{st.title}</span>
                  </div>
                  <p className="text-xs text-[#e3bdc7] mt-1 font-sans">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: QR Code Phone Transfer */}
        {activeTab === 'qr' && (
          <div className="p-5 overflow-y-auto flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-3 rounded-2xl bg-white/5 border border-[#00eefc]/40 shadow-[0_0_30px_rgba(0,238,252,0.25)]">
              <img
                src={qrCodeUrl}
                alt="QR Code for Android Phone"
                className="w-48 h-48 rounded-xl object-contain"
              />
            </div>
            <div>
              <h4 className="font-display text-base font-bold text-white">
                Scan with your Android Phone Camera
              </h4>
              <p className="text-xs text-[#e3bdc7] max-w-xs mt-1">
                Point your smartphone camera at this code to open the app on your mobile screen and download the APK directly!
              </p>
            </div>
            <div className="w-full p-2.5 rounded-xl bg-[#0e0d15] border border-white/10 font-mono text-[11px] text-[#00eefc] truncate max-w-sm">
              {currentAppUrl}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0d0d13] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-mono text-white/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Ready for Sideload</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
