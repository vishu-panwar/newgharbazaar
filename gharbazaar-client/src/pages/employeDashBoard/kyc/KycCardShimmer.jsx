// KycCardShimmer.jsx
import React from 'react';

export default function KycCardShimmer() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col min-h-[400px] w-full animate-pulse select-none">
      
      {/* TOP BADGE AREA SHIMMER */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-11 h-11 rounded-xl bg-gray-200 shrink-0" />
        <div className="w-24 h-5 bg-gray-200 rounded-full" />
      </div>

      {/* CONTENT METADATA SHIMMER */}
      <div className="flex-1 flex flex-col">
        {/* Name Title */}
        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-3" />

        {/* User Info Fields */}
        <div className="mt-2 space-y-3 mb-4">
          {/* Phone */}
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-12" />
            <div className="h-4 bg-gray-200 rounded w-28" />
          </div>
          {/* Document ID Label */}
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-14" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
          {/* Address */}
          <div className="space-y-1.5">
            <div className="h-4 bg-gray-200 rounded w-14" />
            <div className="h-3.5 bg-gray-200 rounded w-full" />
            <div className="h-3.5 bg-gray-200 rounded w-5/6" />
          </div>
        </div>

        {/* DOCUMENTS CONTAINER SHIMMER */}
        <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="h-3 bg-gray-200 rounded w-28" />
          </div>

          {/* Document Images Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Front Image Layout */}
            <div className="space-y-1.5">
              <div className="h-3 bg-gray-200 rounded w-12" />
              <div className="w-full h-24 bg-gray-200 rounded-lg border border-gray-100" />
            </div>
            {/* Back Image Layout */}
            <div className="space-y-1.5">
              <div className="h-3 bg-gray-200 rounded w-12" />
              <div className="w-full h-24 bg-gray-200 rounded-lg border border-gray-100" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BUTTON ACTIONS SHIMMER */}
      <div className="grid grid-cols-2 gap-3 pt-5 mt-auto border-t border-gray-100">
        <div className="w-full h-9 bg-gray-200 rounded-xl" />
        <div className="w-full h-9 bg-gray-200 rounded-xl" />
      </div>

    </div>
  );
}