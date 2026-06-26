import React from "react";

export default function HeroShimmer() {
  return (
    <section className="relative w-full bg-gray-100">
      {/* Container with 28% padding for aspect ratio matching Hero */}
      <div className="relative w-full" style={{ paddingBottom: '28%' }}>
        
        {/* Base Layer: Soft Greenish Tint */}
        <div className="absolute inset-0 bg-[#f8faf9]" />

        {/* Subtle Pattern Layer (Dots or Grid) */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `radial-gradient(#22c55e 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
        />

        {/* Content Placeholders for a Hero look */}
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center">
          {/* Badge Placeholder */}
          <div className="h-6 w-32 bg-green-500/10 rounded-full animate-pulse mb-6" />
          
          {/* Main Heading Placeholder */}
          <div className="h-10 md:h-14 w-2/3 md:w-1/2 bg-gray-200 rounded-2xl animate-pulse mb-4" />
          <div className="h-10 md:h-14 w-1/2 md:w-1/3 bg-gray-200 rounded-2xl animate-pulse mb-8" />

          {/* Button Placeholder */}
          <div className="h-12 w-44 bg-green-500/20 rounded-xl animate-pulse" />
        </div>

        {/* High-End Shimmer Layer */}
        <div 
          className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(34, 197, 94, 0.05) 50%, transparent 100%)',
            transform: 'skewX(-20deg)',
          }}
        />

        {/* Animated Shine Streak (The "Cool" Factor) */}
        <div 
          className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] delay-75"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
            width: '20%',
            filter: 'blur(40px)',
            transform: 'skewX(-20deg)',
          }}
        />
      </div>
    </section>
  );
}