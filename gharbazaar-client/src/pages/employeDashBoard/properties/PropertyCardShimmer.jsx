import React from 'react'

const PropertyCardShimmer = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col min-h-[280px] w-full animate-pulse select-none">
         {/* TOP SECTION SHIMMER */}
         <div className="flex items-start justify-between gap-4 mb-4">
           <div className="w-11 h-11 rounded-xl bg-gray-200 shrink-0" />
           <div className="w-24 h-5 bg-gray-200 rounded-full" />
         </div>
   
         {/* METADATA INFO PANEL SHIMMER */}
         <div className="flex-1 flex flex-col">
           {/* Title */}
           <div className="h-5 bg-gray-200 rounded-md w-5/6 mb-3" />
           
           {/* Location Row */}
           <div className="flex items-center gap-1.5 mb-3">
             <div className="w-3.5 h-3.5 bg-gray-200 rounded" />
             <div className="h-3.5 bg-gray-200 rounded w-20" />
           </div>
   
           {/* Category Tag */}
           <div className="h-6 bg-gray-200 rounded-md w-16 mb-4" />
   
           {/* Pricing Segment */}
           <div className="h-6 bg-gray-200 rounded-md w-28" />
         </div>
   
         {/* BOTTOM BUTTONS SHIMMER */}
         <div className="grid grid-cols-2 gap-3 pt-5 mt-auto border-t border-gray-100">
           <div className="w-full h-9 bg-gray-200 rounded-xl" />
           <div className="w-full h-9 bg-gray-200 rounded-xl" />
         </div>
       </div>
  )
}

export default PropertyCardShimmer