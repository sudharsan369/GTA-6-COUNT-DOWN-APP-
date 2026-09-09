import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { viceCityAudio } from '../utils/audioSynth';

interface CountdownScreenProps {
  onNavigateToPapers: () => void;
  onShowToast: (msg: string) => void;
}

interface TargetPreset {
  id: string;
  name: string;
  dateStr: string;
  label: string;
  description: string;
}

export const CountdownScreen: React.FC<CountdownScreenProps> = ({
  onNavigateToPapers,
  onShowToast,
}) => {
  // Preset targets from today onwards (simulated current year: 2026)
  const presets: TargetPreset[] = [
    {
      id: 'fall2026',
      name: 'Fall 2026 (Official Target)',
      dateStr: '2026-11-17T00:00:00Z',
      label: 'NOV 17, 2026',
      description: 'Official Take-Two & Rockstar Games primary release window.',
    },
    {
      id: 'holiday2026',
      name: 'Holiday 2026',
      dateStr: '2026-12-15T00:00:00Z',
      label: 'DEC 15, 2026',
      description: 'Worldwide holiday retail & digital store launch.',
    },
    {
      id: 'spring2027',
      name: 'Spring 2027 Window',
      dateStr: '2027-04-20T00:00:00Z',
      label: 'APR 20, 2027',
      description: 'Extended development polish & PC release estimate.',
    },
  ];

  const [selectedPresetId, setSelectedPresetId] = useState<string>('fall2026');
  const [customDate, setCustomDate] = useState<string>('2026-11-17');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Compute active target timestamp in milliseconds
  const getTargetTimestamp = (): number => {
    if (isCustomMode) {
      const parsed = new Date(`${customDate}T00:00:00Z`).getTime();
      return isNaN(parsed) ? new Date('2026-11-17T00:00:00Z').getTime() : parsed;
    }
    const preset = presets.find((p) => p.id === selectedPresetId);
    return preset ? new Date(preset.dateStr).getTime() : new Date('2026-11-17T00:00:00Z').getTime();
  };

  const [targetTimestamp, setTargetTimestamp] = useState<number>(getTargetTimestamp);

  // Real-time ticking time remaining
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  // Current real-time clock
  const [currentRealTime, setCurrentRealTime] = useState({
    localTime: '',
    localDate: '',
    leonidaTime: '',
  });

  const [activeRadio, setActiveRadio] = useState<string | null>(null);

  // Synchronize targetTimestamp when preset or custom date changes
  useEffect(() => {
    setTargetTimestamp(getTargetTimestamp());
  }, [selectedPresetId, customDate, isCustomMode]);

  // Main real-time clock & countdown loop (ticks every second)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Formatted real-time strings
      const localTimeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      const localDateStr = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      // Leonida (Miami / Eastern Time UTC-4)
      const leonidaTimeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      setCurrentRealTime({
        localTime: localTimeStr,
        localDate: localDateStr,
        leonidaTime: leonidaTimeStr,
      });

      // Real-time countdown calculation
      const nowMs = now.getTime();
      const diff = targetTimestamp - nowMs;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isExpired: false,
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  const handlePresetSelect = (presetId: string) => {
    setIsCustomMode(false);
    setSelectedPresetId(presetId);
    const found = presets.find((p) => p.id === presetId);
    if (found) {
      onShowToast(`Target set to ${found.name}`);
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#00eefc', '#ff479c'],
      });
    }
  };

  const handleTuneRadio = (stationName: string) => {
    if (activeRadio === stationName) {
      viceCityAudio.stop();
      setActiveRadio(null);
      onShowToast(`Muted radio`);
    } else {
      viceCityAudio.stop();
      viceCityAudio.start();
      setActiveRadio(stationName);
      onShowToast(`Tuned in to ${stationName} (Vice City FM)`);
    }
  };

  const handleSetReminder = () => {
    const targetDateObj = new Date(targetTimestamp);
    onShowToast(`Reminder registered for ${targetDateObj.toDateString()}!`);
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ff479c', '#00eefc', '#dbb8ff'],
    });
  };

  const radioStations = [
    { name: 'Wave 103', genre: 'Synthwave & 80s Electro', color: '#ff479c' },
    { name: 'Flash FM', genre: 'Vice City Pop Classics', color: '#00eefc' },
    { name: 'Fever 105', genre: 'Soul, Funk & Disco', color: '#dbb8ff' },
    { name: 'Radio Espantoso', genre: 'Latin Jazz & Salsa', color: '#ffb0ca' },
  ];

  const activePreset = presets.find((p) => p.id === selectedPresetId);

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 space-y-4 max-w-xl mx-auto relative z-10">
      {/* Real-time Status Badge & Atomic Clock */}
      <div className="flex items-center justify-between pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00eefc]/15 border border-[#00eefc]/40 shadow-[0_0_16px_rgba(0,238,252,0.3)]">
          <span className="w-2 h-2 rounded-full bg-[#00eefc] animate-ping" />
          <span className="font-display text-[11px] font-extrabold tracking-widest text-[#00eefc] uppercase">
            LIVE COUNTDOWN FROM TODAY
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs text-[#ffb0ca] tracking-tight">
          <span className="material-symbols-outlined text-[15px] animate-pulse text-[#00eefc]">schedule</span>
          <span>{currentRealTime.localTime || 'LIVE'}</span>
          <span className="text-white/40">|</span>
          <span className="text-white/80">{currentRealTime.localDate}</span>
        </div>
      </div>

      {/* Main Countdown Hero Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#1c1b26] via-[#16151f] to-[#121118] border-2 border-[#00eefc]/40 shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_24px_rgba(0,238,252,0.15)] relative overflow-hidden">
        {/* Glow Underlays */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#ff479c]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#00eefc]/15 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-4">
          <span className="px-2.5 py-0.5 rounded-full bg-[#ff479c]/20 text-[#ffb0ca] font-mono text-[10px] font-bold tracking-widest uppercase border border-[#ff479c]/30 inline-block mb-2">
            TARGET RELEASE DATE • {isCustomMode ? 'CUSTOM DATE' : activePreset?.label}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-wider text-white drop-shadow-[0_0_16px_rgba(0,238,252,0.4)]">
            GRAND THEFT AUTO VI
          </h2>
          <p className="text-xs font-mono text-[#00eefc] tracking-wider uppercase mt-1">
            REAL-TIME RELEASE COUNTDOWN
          </p>
        </div>

        {/* 4-Box Digital Countdown Grid */}
        <div className="grid grid-cols-4 gap-2 text-center my-3">
          {[
            { label: 'DAYS', val: timeLeft.days, color: '#00eefc' },
            { label: 'HOURS', val: timeLeft.hours, color: '#ffb0ca' },
            { label: 'MINUTES', val: timeLeft.minutes, color: '#dbb8ff' },
            { label: 'SECONDS', val: timeLeft.seconds, color: '#ff479c' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-xl bg-[#0b0a11]/90 border border-white/10 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] relative overflow-hidden group"
            >
              {/* Highlight accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
                style={{ backgroundColor: item.color }}
              />

              <span
                className="font-mono text-3xl sm:text-4xl font-black tracking-tight drop-shadow-md"
                style={{ color: item.color }}
              >
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="font-display text-[9px] sm:text-[10px] font-bold text-white/70 tracking-widest mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Real-Time Live Ticker Sub-bar */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-[#00eefc]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00eefc] animate-ping" />
            <span>Ticking Live Every Second</span>
          </div>
          <span className="text-white/60">
            Leonida Time: <span className="text-white font-bold">{currentRealTime.leonidaTime}</span>
          </span>
        </div>

        {/* Development Polish Progress Bar */}
        <div className="mt-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#e3bdc7]">
            <span>Development Timeline Completion</span>
            <span className="text-[#ffb0ca] font-bold">92% Final Polish</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00eefc] via-[#b26fff] to-[#ff479c] w-[92%]" />
          </div>
        </div>

        {/* Action Button: Set Reminder */}
        <div className="mt-4 pt-2">
          <button
            onClick={handleSetReminder}
            id="btn-set-reminder"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ff479c]/20 to-[#00eefc]/20 hover:from-[#ff479c]/30 hover:to-[#00eefc]/30 border border-[#ff479c]/40 text-white font-display text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(255,71,156,0.2)]"
          >
            <span className="material-symbols-outlined text-[17px] text-[#ff479c]">notifications_active</span>
            <span>SET RELEASE DAY REMINDER ALARM</span>
          </button>
        </div>
      </div>

      {/* Target Release Window Switcher & Custom Date Picker */}
      <div className="p-4 rounded-xl bg-[#1b1b23]/90 border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00eefc] text-[20px]">calendar_month</span>
            <span className="font-display text-sm font-bold text-white tracking-wide">
              RELEASE DATE WINDOW FROM TODAY
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#ffb0ca]">SELECT TARGET</span>
        </div>

        {/* Presets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {presets.map((p) => {
            const isSelected = !isCustomMode && selectedPresetId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handlePresetSelect(p.id)}
                className={`p-2.5 rounded-lg text-left transition-all border ${
                  isSelected
                    ? 'bg-[#2a2931] border-[#00eefc] shadow-[0_0_14px_rgba(0,238,252,0.3)]'
                    : 'bg-[#0e0d15]/70 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-bold text-white">{p.name}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#00eefc] animate-ping" />}
                </div>
                <span className="font-mono text-[10px] text-[#00eefc] block font-semibold mt-0.5">
                  {p.label}
                </span>
                <span className="text-[10px] text-white/50 block line-clamp-1 mt-0.5">
                  {p.description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom Target Date Input */}
        <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs font-mono text-[#e3bdc7] self-start sm:self-center">
            Or pick your own date from today onwards:
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="date"
              value={customDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                setCustomDate(e.target.value);
                setIsCustomMode(true);
                onShowToast(`Countdown updated to ${e.target.value}`);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#0e0d15] border border-white/20 text-xs font-mono text-[#00eefc] focus:outline-none focus:border-[#00eefc] w-full sm:w-auto"
            />
            {isCustomMode && (
              <button
                onClick={() => handlePresetSelect('fall2026')}
                className="px-2.5 py-1.5 rounded-lg bg-[#2a2931] text-[11px] font-mono text-white/70 hover:text-white shrink-0"
              >
                RESET
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Action: Open 4K Wallpapers */}
      <div
        onClick={onNavigateToPapers}
        className="w-full p-4 rounded-xl bg-[#1b1b23]/90 border border-white/10 flex items-center justify-between hover:border-[#ff479c]/50 transition-all cursor-pointer shadow-md group"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-[#ff479c]/20 flex items-center justify-center text-[#ffb0ca]">
            <span className="material-symbols-outlined text-[24px]">wallpaper</span>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold text-white group-hover:text-[#ffb0ca] transition-colors">
              Explore 4K AMOLED Wallpapers
            </h4>
            <p className="text-xs text-[#e3bdc7]">
              42 High-Res Backgrounds ready for Android Phone & Lock Screen
            </p>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#00eefc] group-hover:translate-x-1 transition-transform">
          arrow_forward
        </span>
      </div>

      {/* Vice City Interactive Radio Station Selector with Audio Synth */}
      <div className="p-4 rounded-xl bg-[#1b1b23]/90 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff479c] text-[20px]">radio</span>
            <span className="font-display text-sm font-bold text-white tracking-wide">
              VICE CITY FM RADIO TUNER
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#00eefc] px-2 py-0.5 rounded bg-white/5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00eefc] animate-pulse" />
            {activeRadio ? 'BROADCASTING NOW' : 'TAP TO LISTEN'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {radioStations.map((st) => {
            const isSelected = activeRadio === st.name;
            return (
              <button
                key={st.name}
                onClick={() => handleTuneRadio(st.name)}
                className={`p-3 rounded-lg text-left transition-all border ${
                  isSelected
                    ? 'bg-[#2a2931] border-[#ff479c] shadow-[0_0_12px_rgba(255,71,156,0.3)]'
                    : 'bg-[#0e0d15]/60 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-bold text-white">{st.name}</span>
                  {isSelected ? (
                    <div className="flex items-center gap-0.5 h-3">
                      <span className="w-1 h-3 bg-[#00eefc] animate-pulse" />
                      <span className="w-1 h-2 bg-[#ff479c] animate-bounce" />
                      <span className="w-1 h-3.5 bg-[#00eefc] animate-pulse" />
                    </div>
                  ) : (
                    <span className="material-symbols-outlined text-[14px] text-white/40">play_arrow</span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-[#e3bdc7] block mt-0.5 truncate">
                  {st.genre}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lucia & Jason Criminal Dossier */}
      <div className="p-4 rounded-xl bg-[#1f1f27] border border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-[#00eefc] uppercase tracking-wider">
            LEONIDA CRIMINAL REGISTER
          </span>
          <span className="text-xs font-mono text-[#ffb0ca]">CO-OP MECHANICS</span>
        </div>
        <h3 className="font-display text-base font-bold text-white">
          Lucia Caminos & Jason Duval
        </h3>
        <p className="text-xs text-[#e3bdc7] mt-1 leading-relaxed">
          Inspired by Bonnie & Clyde, players dynamically switch between Lucia's tactical
          agility and Jason's heavy weapons expertise. Features shared bankrolls and trust levels.
        </p>
      </div>
    </div>
  );
};
