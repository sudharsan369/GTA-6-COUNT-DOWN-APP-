import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPapers: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onSelectPapers,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 0,
      tag: 'COUNTDOWN ACTIVE',
      tagColor: 'text-black bg-[#00eefc]',
      title: 'GTA VI Release Date Countdown Ticking',
      description: 'Real-time telemetry tracking official release window from today onwards. UHD assets ready in vault.',
      time: 'LIVE NOW',
      action: 'EXPLORE VAULT',
      onClick: onSelectPapers,
    },
    {
      id: 1,
      tag: 'NEW ASSETS',
      tagColor: 'text-[#ffb0ca] bg-[#ff479c]/20',
      title: '4 Leaked UHD Artworks Synced',
      description: 'Supercar Drift on Ocean Blvd and Neon Palms 4K now ready in your vault.',
      time: '12m ago',
      action: 'VIEW VAULT',
      onClick: onSelectPapers,
    },
    {
      id: 2,
      tag: 'NEWSWIRE',
      tagColor: 'text-[#00dbe9] bg-[#00eefc]/20',
      title: 'Take-Two Q1 Earnings Window Update',
      description: 'Fall 2025 confirmed as official launch target for GTA VI on PS5 & Xbox Series X|S.',
      time: '2h ago',
    },
    {
      id: 3,
      tag: 'TELEMETRY',
      tagColor: 'text-[#dbb8ff] bg-[#b26fff]/20',
      title: 'AMOLED True Black Activated',
      description: 'Device display calibrated for zero backlight bleed and extended battery life.',
      time: '1d ago',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#1b1b23] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#13131a]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff479c] text-[22px]">
              notifications_active
            </span>
            <h3 className="font-display text-base font-bold text-white tracking-wide">
              HUD NOTIFICATIONS
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3.5 rounded-xl bg-[#13131a]/80 border border-white/5 space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className={`px-2 py-0.5 rounded font-bold ${n.tagColor}`}>
                  {n.tag}
                </span>
                <span className="text-[#e3bdc7]/60">{n.time}</span>
              </div>
              <h4 className="font-display text-sm font-bold text-white">{n.title}</h4>
              <p className="text-xs text-[#e3bdc7] leading-relaxed">{n.description}</p>
              {n.action && (
                <button
                  onClick={() => {
                    onClose();
                    n.onClick?.();
                  }}
                  className="mt-1 text-[11px] font-display font-bold text-[#00dbe9] hover:underline flex items-center gap-1"
                >
                  <span>{n.action}</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#13131a] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#2a2931] hover:bg-[#34343c] text-xs font-display font-bold text-white transition-colors"
          >
            DISMISS ALL
          </button>
        </div>
      </div>
    </div>
  );
};
