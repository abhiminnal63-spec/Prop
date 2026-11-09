import React from 'react';

interface WindowFrameProps {
  title: string;
  stepIndicator?: string;
  children: React.ReactNode;
  className?: string;
}

export function WindowFrame({
  title,
  stepIndicator = '>',
  children,
  className = '',
}: WindowFrameProps) {
  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Cute top binder clip tab */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 hidden xs:flex items-center justify-center">
        <div className="w-16 h-5 rounded-t-xl bg-[#F3A0B4] border-[2.5px] border-[#84364F] border-b-0 shadow-xs flex items-center justify-center">
          <div className="w-8 h-1 rounded-full bg-[#84364F]/30" />
        </div>
      </div>

      {/* Decorative left binder clip latches */}
      <div className="absolute top-16 -left-3 hidden md:block z-20">
        <div className="w-3.5 h-8 rounded-l-md bg-[#F3A0B4] border-[2px] border-[#84364F] border-r-0" />
      </div>
      <div className="absolute bottom-16 -left-3 hidden md:block z-20">
        <div className="w-3.5 h-8 rounded-l-md bg-[#F3A0B4] border-[2px] border-[#84364F] border-r-0" />
      </div>

      {/* Main Window Container */}
      <div className="relative rounded-[24px] bg-[#FFF8F0] border-[2.5px] border-[#84364F] shadow-kawaii overflow-hidden">
        {/* Window Title Bar */}
        <div className="bg-[#FAD5E0] border-b-[2.5px] border-[#84364F] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#84364F]">
            <span>{title}</span>
            <span className="text-[#84364F] text-xs">♡</span>
            <span className="text-[#84364F] text-xs font-mono">{stepIndicator}</span>
          </div>

          {/* Three cute window dots ○ ○ ○ */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full border-[2px] border-[#84364F] bg-transparent" />
            <span className="w-2.5 h-2.5 rounded-full border-[2px] border-[#84364F] bg-transparent" />
            <span className="w-2.5 h-2.5 rounded-full border-[2px] border-[#84364F] bg-transparent" />
          </div>
        </div>

        {/* Window Content Body */}
        <div className="p-4 sm:p-7 md:p-8 flex flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
