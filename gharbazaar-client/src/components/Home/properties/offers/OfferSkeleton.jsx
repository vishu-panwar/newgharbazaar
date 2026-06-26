import React from 'react';

const OfferSkeleton = () => {
  return (
    <div className="min-w-[320px] md:min-w-[380px] flex-shrink-0 bg-white rounded-3xl p-4 border border-gray-100 shadow-sm overflow-hidden">
      {/* Category Tag Skeleton */}
      <div className="h-5 w-20 bg-green-100 rounded-full animate-pulse mb-4" />

      {/* Main Image Skeleton */}
      <div className="w-full aspect-video bg-gray-200 rounded-2xl animate-pulse mb-4" />

      {/* Title & Subtitle */}
      <div className="space-y-3 mb-6">
        <div className="h-6 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-4 w-1/2 bg-gray-100 rounded-md animate-pulse" />
      </div>

      {/* Thumbnails / Price Section Skeleton */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-10 h-10 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

export default OfferSkeleton;