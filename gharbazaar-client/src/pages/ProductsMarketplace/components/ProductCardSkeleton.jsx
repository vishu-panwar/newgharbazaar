export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200"></div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Brand */}
        <div className="h-3 bg-gray-200 rounded w-20"></div>

        {/* Product name */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Vendor */}
        <div className="h-3 bg-gray-200 rounded w-32"></div>

        {/* Location */}
        <div className="h-3 bg-gray-200 rounded w-28"></div>

        {/* Quantity */}
        <div className="h-3 bg-gray-200 rounded w-24"></div>

        {/* Rating */}
        <div className="h-3 bg-gray-200 rounded w-28"></div>

        {/* Buttons */}
        <div className="space-y-2 pt-2">
          <div className="h-9 bg-gray-200 rounded-lg"></div>
          <div className="h-9 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
