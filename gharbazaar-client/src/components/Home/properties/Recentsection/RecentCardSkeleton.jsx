// ==========================================
// RecentCardSkeleton.jsx
// Fully Responsive + Fixed Gap + No UI Glitch
// ==========================================

import React from "react";

const RecentCardSkeleton = () => {
  return (
    <div
      className="
        w-full
        h-full
        bg-white
        rounded-2xl
        overflow-hidden
        border border-slate-100
        shadow-sm
        flex
        flex-col
        animate-pulse
      "
    >
      {/* IMAGE */}
      <div className="relative w-full h-[220px] bg-slate-100 overflow-hidden">
        {/* SHIMMER */}
        <div
          className="
            absolute inset-0
            -translate-x-full
            animate-[shimmer_2s_infinite]
            bg-gradient-to-r
            from-transparent
            via-white/50
            to-transparent
          "
        />

        {/* STATUS */}
        <div className="absolute top-3 left-3 h-6 w-20 rounded-lg bg-white/70" />

        {/* BOOKMARK */}
        <div className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/80 shadow-sm" />

        {/* RATING */}
        <div className="absolute bottom-3 right-3 h-7 w-14 rounded-lg bg-white/80 shadow-sm" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-4">
        {/* TITLE */}
        <div className="space-y-2 mb-4">
          <div className="h-4 rounded-md bg-slate-200 w-[90%]" />
          <div className="h-4 rounded-md bg-slate-200 w-[60%]" />
        </div>

        {/* LOCATION */}
        <div className="flex items-center gap-2 mb-5">
          <div className="h-3 w-3 rounded-full bg-slate-200 shrink-0" />

          <div className="h-3 rounded bg-slate-200 w-[50%]" />
        </div>

        {/* PRICE + AREA */}
        <div className="border-t border-slate-100 pt-4 mb-5">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="h-3 rounded bg-slate-100 w-20" />

              <div className="h-6 rounded bg-slate-200 w-28" />
            </div>

            <div className="space-y-2 flex flex-col items-end">
              <div className="h-3 rounded bg-slate-100 w-10" />

              <div className="h-4 rounded bg-slate-200 w-16" />
            </div>
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="mt-auto flex gap-3">
          <div className="h-11 flex-1 rounded-xl bg-slate-100 border border-slate-200" />

          <div className="h-11 flex-1 rounded-xl bg-emerald-100 border border-emerald-200" />
        </div>
      </div>

      {/* SHIMMER KEYFRAMES */}
      <style>
        {`
          @keyframes shimmer {
            100% {
              transform: translateX(200%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default RecentCardSkeleton;