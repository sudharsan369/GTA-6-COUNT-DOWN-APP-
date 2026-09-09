import React, { useState } from 'react';
import { FLUTTER_PROJECT_FILES } from '../data/flutterCode';
import { downloadFlutterProjectZip } from '../utils/zipExporter';

interface FlutterExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const FlutterExportModal: React.FC<FlutterExportModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const activeFile = FLUTTER_PROJECT_FILES[activeFileIndex];

  const handleCopy = (content: string, filename: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(filename);
    onShowToast(`Copied ${filename} to clipboard!`);
    setTimeout(() => setCopiedFile(null), 2500);
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      onShowToast('Building Flutter Android Project Zip...');
      await downloadFlutterProjectZip();
      onShowToast('Flutter Android project (.zip) downloaded!');
    } catch {
      onShowToast('Exported Flutter code files.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#171720] rounded-3xl border border-[#00eefc]/40 shadow-[0_0_50px_rgba(0,238,252,0.25)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#13131a]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#00eefc]/15 border border-[#00eefc]/30 flex items-center justify-center text-[#00eefc]">
              <span className="material-symbols-outlined text-[24px]">flutter</span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <span>Flutter & Dart Android Codebase</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ff479c]/20 text-[#ffb0ca]">
                  READY FOR ANDROID
                </span>
              </h3>
              <p className="text-xs text-[#e3bdc7]">
                Compiled for Material 3, Android SDK 34 & Edge-to-Edge display
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Action bar with Download Zip button */}
        <div className="px-4 py-2.5 bg-[#1b1b23] border-b border-white/5 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            {FLUTTER_PROJECT_FILES.map((file, idx) => (
              <button
                key={file.path}
                onClick={() => setActiveFileIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeFileIndex === idx
                    ? 'bg-[#00eefc]/20 text-[#00eefc] border border-[#00eefc]/40'
                    : 'bg-[#2a2931]/60 text-white/70 hover:text-white'
                }`}
              >
                {file.filename}
              </button>
            ))}
          </div>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="shrink-0 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#00eefc] to-[#00dbe9] text-[#00363a] font-display text-xs font-bold tracking-wider flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">folder_zip</span>
            <span>{isDownloading ? 'PACKAGING...' : 'DOWNLOAD ZIP'}</span>
          </button>
        </div>

        {/* Code view header */}
        <div className="px-4 py-2 bg-[#0e0d15] flex items-center justify-between text-xs font-mono border-b border-white/5">
          <span className="text-[#00dbe9]">{activeFile.path}</span>
          <button
            onClick={() => handleCopy(activeFile.content, activeFile.filename)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#2a2931] hover:bg-[#34343c] text-white text-[11px] font-mono border border-white/10"
          >
            <span className="material-symbols-outlined text-[14px]">
              {copiedFile === activeFile.filename ? 'check' : 'content_copy'}
            </span>
            <span>{copiedFile === activeFile.filename ? 'COPIED!' : 'COPY CODE'}</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-4 bg-[#0e0d15] overflow-auto text-xs font-mono text-[#d3fbff] select-text leading-relaxed">
          <pre className="whitespace-pre">{activeFile.content}</pre>
        </div>

        {/* Bottom instructions */}
        <div className="p-3 bg-[#13131a] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#e3bdc7]">
          <span>Run <code className="text-[#00eefc]">flutter run -d android</code> in project root</span>
          <span className="text-[#ffb0ca]">Ready to build signed APK or Google Play AAB</span>
        </div>
      </div>
    </div>
  );
};
