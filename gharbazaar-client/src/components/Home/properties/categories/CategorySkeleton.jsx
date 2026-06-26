import React from 'react';

const CategorySkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Title Skeleton */}
      <div className="h-7 w-3/4 bg-gray-200 rounded-lg animate-pulse mb-2" />
      {/* Subtitle Skeleton */}
      <div className="h-4 w-1/2 bg-gray-100 rounded-md animate-pulse mb-6" />

      {/* Grid of 4 Images (Matching your items.slice(0, 4) logic) */}
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            {/* Image Placeholder */}
            <div className="aspect-[4/3] w-full bg-gray-200 rounded-xl animate-pulse" />
            {/* Label Placeholder */}
            <div className="h-3 w-2/3 bg-gray-100 rounded-md animate-pulse mx-auto" />
          </div>
        ))}
      </div>

      {/* Footer Link Skeleton */}
      <div className="mt-6 h-4 w-24 bg-green-100 rounded animate-pulse" />
    </div>
  );
};

export default CategorySkeleton;