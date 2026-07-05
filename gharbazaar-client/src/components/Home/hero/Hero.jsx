
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGetAdvertisementQuery } from "../../../store/HeroSectionQuery/getAdvertismentQuery";
import HeroShimmer from "./HeroShimmer";

// Import desktop hero images for property page
import desktopHeroImage1 from "../../../assets/Screenshot 2026-07-05 210124.png";
import desktopHeroImage2 from "../../../assets/Screenshot 2026-07-05 210133.png";
import desktopHeroImage3 from "../../../assets/Screenshot 2026-07-05 210144.png";
import desktopHeroImage4 from "../../../assets/Screenshot 2026-07-05 210154.png";

// Import mobile hero images for property page
import mobileHeroImage1 from "../../../assets/Screenshot 2026-07-05 205516.png";
import mobileHeroImage2 from "../../../assets/Screenshot 2026-07-05 205535.png";
import mobileHeroImage3 from "../../../assets/Screenshot 2026-07-05 205548.png";
import mobileHeroImage4 from "../../../assets/Screenshot 2026-07-05 205558.png";

export default function Hero() {
    const { data, isLoading, isError } = useGetAdvertisementQuery();

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const intervalRef = useRef(null);

    // Desktop slides with local images (fallback to API if needed)
    const localDesktopSlides = [
        { _id: 'desktop1', image: desktopHeroImage1, title: 'Find Your Perfect Home', link: '/properties' },
        { _id: 'desktop2', image: desktopHeroImage2, title: 'PG & Hostels', link: '/properties' },
        { _id: 'desktop3', image: desktopHeroImage3, title: 'List Your Property', link: '/dashboard/list-property' },
        { _id: 'desktop4', image: desktopHeroImage4, title: 'Post Requirements', link: '/post-requirement' },
    ];

    const desktopSlides = data?.advertisements?.length ? data.advertisements : localDesktopSlides;
    
    // Mobile slides with local images
    const mobileSlides = [
        { _id: 'mobile1', image: mobileHeroImage1, title: 'Find Your Perfect Home', link: '/properties' },
        { _id: 'mobile2', image: mobileHeroImage2, title: 'PG & Hostels', link: '/properties' },
        { _id: 'mobile3', image: mobileHeroImage3, title: 'List Your Property', link: '/dashboard/list-property' },
        { _id: 'mobile4', image: mobileHeroImage4, title: 'Post Requirements', link: '/post-requirement' },
    ];

    // Use mobile slides on mobile, desktop slides on desktop
    const slides = isMobile ? mobileSlides : desktopSlides;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


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

    if (isError || (!isMobile && !slides.length)) {
        return (
            <section className="w-full h-80 sm:h-96 md:h-[420px] lg:h-[520px] flex items-center justify-center">
                No advertisements found
            </section>
        );
    }

    return (
        <section className="relative w-full bg-gray-100">
            {/* Desktop Carousel - API Images */}
            <div className="hidden md:block relative w-full" style={{ paddingBottom: '28%' }}>
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

            {/* Mobile Carousel - Natural Height like Products Page */}
            <div className="md:hidden relative w-full">
                {/* Slides */}
                {slides.map((slide, index) => (
                    <Link
                        key={slide._id || index}
                        to={slide.link || "/"}
                        className={`block transition-opacity duration-700 ${
                            index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"
                        }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title || "Banner"}
                            className="w-full h-auto object-contain"
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

