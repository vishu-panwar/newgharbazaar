
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGetAdvertisementQuery } from "../../../store/HeroSectionQuery/getAdvertismentQuery";
import HeroShimmer from "./HeroShimmer";

export default function Hero() {
    const { data, isLoading, isError } = useGetAdvertisementQuery();

    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalRef = useRef(null);

    const slides = data?.advertisements ?? [];


    useEffect(() => {
        if (data) {
            console.log("ads loaded", data);
        }
    }, [data]);

    // 🔥 stable interval (no dependency on slides.length changes)
    useEffect(() => {
        if (!slides.length) return;

        // clear old interval before creating new one
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(intervalRef.current);
    }, [slides.length]);

    if (isLoading) {
        return <HeroShimmer />
    }

    if (isError || !slides.length) {
        return (
            <section className="w-full h-80 sm:h-96 md:h-[420px] lg:h-[520px] flex items-center justify-center">
                No advertisements found
            </section>
        );
    }

    return (
        <section className="relative w-full bg-gray-100">
            {/* Container for proper aspect ratio */}
            <div className="relative w-full" style={{ paddingBottom: '28%' }}>
                {/* Slides */}
                {slides.map((slide, index) => (
                    <Link
                        key={slide._id || index}
                        to={slide.link || "/"}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title || "Banner"}
                            className="w-full h-full object-cover"
                        />
                    </Link>
                ))}
                
                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                setCurrentSlide(index);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentSlide
                                    ? "w-8 bg-white"
                                    : "w-2 bg-white/60 hover:bg-white/80"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

