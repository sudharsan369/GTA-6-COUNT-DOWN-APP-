import React from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, visible }) => {
  return (
    <div
      id="action-toast"
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#393841]/95 backdrop-blur-xl text-[#e4e1ec] font-mono text-xs shadow-[0_12px_32px_rgba(0,0,0,0.8)] border border-white/10 flex items-center gap-2 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <span className="material-symbols-outlined text-[#00dbe9] text-[18px]">
        check_circle
      </span>
      <span id="toast-text" className="font-medium tracking-tight">
        {message}
      </span>
    </div>
  );
};
