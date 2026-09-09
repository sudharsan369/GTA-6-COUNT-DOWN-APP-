import React from 'react';

interface AndroidFrameWrapperProps {
  children: React.ReactNode;
  isActive: boolean;
}

export const AndroidFrameWrapper: React.FC<AndroidFrameWrapperProps> = ({
  children,
  isActive,
}) => {
  if (!isActive) {
    return <div className="w-full min-h-screen relative">{children}</div>;
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] py-6 px-3 flex flex-col items-center justify-center">
      {/* Android Device Body */}
      <div className="relative w-full max-w-[420px] h-[92vh] max-h-[890px] rounded-[50px] bg-[#13131a] p-3 shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_0_4px_#2a2931,0_0_0_6px_#1b1b23] flex flex-col overflow-hidden border border-white/10">
        {/* Device Inner Screen Container */}
        <div className="relative w-full h-full rounded-[42px] overflow-hidden flex flex-col bg-[#13131a]">
          {/* Android Status Bar with Punch-Hole Camera */}
          <div className="relative z-50 h-7 w-full bg-[#13131a]/90 backdrop-blur-md px-6 flex items-center justify-between text-white/90 text-[11px] font-mono shrink-0 border-b border-white/5 select-none pointer-events-none">
            <span>09:41</span>

            {/* Front Camera Punch-Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-white/20 mx-auto shadow-inner" />

            <div className="flex items-center gap-1.5 text-[13px]">
              <span className="material-symbols-outlined text-[13px]">signal_cellular_4_bar</span>
              <span className="material-symbols-outlined text-[13px]">wifi</span>
              <span className="material-symbols-outlined text-[13px]">battery_full</span>
            </div>
          </div>

          {/* Device Scrollable Viewport */}
          <div className="relative flex-1 overflow-y-auto no-scrollbar">
            {children}
          </div>

          {/* Android Bottom Gesture Bar */}
          <div className="relative z-50 h-5 w-full bg-[#13131a]/80 backdrop-blur-md flex items-center justify-center shrink-0 pointer-events-none">
            <div className="w-32 h-1 rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
};
