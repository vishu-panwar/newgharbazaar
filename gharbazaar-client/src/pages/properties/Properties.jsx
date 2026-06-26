import {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  ChevronDown,
  ArrowLeft,
  RefreshCw,
  X,
} from "lucide-react";

import { useGetTopRatesPropertyByIdQuery } from "../../store/propertyQuery/getPropertyQuery";

import RecentCardSkeleton from "../../components/Home/properties/Recentsection/RecentCardSkeleton";
import RecentCard from "../../components/Home/properties/Recentsection/RecentCard";

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_LIMIT = 8;

const CITY_OPTIONS = [
  { value: "all", label: "All Cities" },
  { value: "Quantum University", label: "Quantum University" },
  { value: "Chhutmalpur", label: "Chhutmalpur" },
  { value: "Mandawar", label: "Mandawar" },
  { value: "Delhi", label: "Delhi" },
  { value: "Bangalore", label: "Bangalore" },
];

const TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "Villa", label: "Villa" },
  { value: "Apartment", label: "Apartment" },
  { value: "Home/House", label: "Home/House" },
  { value: "Independent House", label: "Independent House" },
  { value: "Plot/Land", label: "Plot/Land" },
  { value: "Commercial Space", label: "Commercial Space" },
  { value: "PG/Hostel", label: "PG/Hostel" },
  { value: "residential", label: "Residential" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border border-gray-200 p-2.5 pr-10 rounded-lg text-sm font-medium text-slate-800 appearance-none outline-none focus:border-[#063e23] focus:bg-white transition-all"
        >
          {options.map(({ value: v, label: l }) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
        />
      </div>
    </div>
  );
}

function EmptyState({ message = "No properties available at the moment." }) {
  return (
    <div className="bg-white border border-dashed border-gray-200 rounded-2xl py-14 text-center w-full">
      <p className="text-gray-400 font-medium text-sm px-4">{message}</p>
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="bg-white rounded-xl p-12 text-center border border-dashed border-red-200 shadow-sm">
      <p className="text-red-600 font-medium mb-4">
        Failed to load properties. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-semibold transition-colors"
      >
        <RefreshCw size={14} />
        Retry
      </button>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: PAGE_LIMIT }).map((_, i) => (
        <RecentCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function Properties() {
  const navigate = useNavigate();
  const locationData = useLocation();
  const loaderRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // ── Navigation state (passed via router) ──────────────────────────────────
  const { title, location, propertyType } = locationData.state || {};

  // ── UI state ──────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // ── Filter state ──────────────────────────────────────────────────────────
  const [selectedCity, setSelectedCity] = useState(location || "all");
  const [selectedType, setSelectedType] = useState(propertyType || "all");

  // ── Pagination & accumulation state ───────────────────────────────────────
  const [page, setPage] = useState(1);
  const [allProperties, setAllProperties] = useState([]);
  const [isFilterChanging, setIsFilterChanging] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // ── Derived: active filters indicator ─────────────────────────────────────
  const hasActiveFilters = selectedCity !== "all" || selectedType !== "all" || searchQuery.trim() !== "";

  // ── Query params (memoised to avoid spurious refetches) ───────────────────
  const queryParams = useMemo(
    () => ({
      type: selectedType === "all" ? "" : selectedType,
      city: selectedCity === "all" ? "" : selectedCity,
      page,
      limit: PAGE_LIMIT,
    }),
    [selectedType, selectedCity, page]
  );

  // ── RTK Query ─────────────────────────────────────────────────────────────
  const { data, isLoading, isFetching, isError, refetch } =
    useGetTopRatesPropertyByIdQuery(queryParams, {
      refetchOnMountOrArgChange: true,
      // Keeps previous data visible while the next page loads (no flicker)
      keepPreviousData: true,
    });

  // ── Reset when filters change ─────────────────────────────────────────────
  useEffect(() => {
    setIsFilterChanging(true);
    setPage(1);
    setAllProperties([]);
  }, [selectedCity, selectedType]);

  // ── Append / replace data ─────────────────────────────────────────────────
  useEffect(() => {
    if (!data?.data) return;

    setAllProperties((prev) => {
      if (page === 1) return [...data.data];

      // Deduplicate by _id when appending
      const merged = [...prev, ...data.data];
      return Array.from(
        new Map(merged.map((item) => [item._id, item])).values()
      );
    });

    setIsFilterChanging(false);
    setIsLoadingMore(false);
  }, [data, page]);

  // ── Sync loading-more flag ─────────────────────────────────────────────────
  useEffect(() => {
    if (!isFetching) setIsLoadingMore(false);
  }, [isFetching]);

  // ── Pagination ─────────────────────────────────────────────────────────────
  const hasMore =
    data?.hasNextPage || data?.pagination?.hasNextPage || false;

  // ── Infinite scroll observer ───────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasMore &&
          !isFetching &&
          !isLoading &&
          !isLoadingMore &&
          !isFilterChanging
        ) {
          setIsLoadingMore(true);
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "300px", threshold: 0 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [hasMore, isFetching, isLoading, isLoadingMore, isFilterChanging]);

  // ── Save scroll position before unmount (e.g. open detail page) ───────────
  useEffect(() => {
    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Client-side search filter (applied on top of server results) ───────────
  const filteredDisplay = useMemo(() => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return allProperties;
    return allProperties.filter(
      (p) =>
        p?.title?.toLowerCase().includes(term) ||
        p?.location?.toLowerCase().includes(term) ||
        p?.city?.toLowerCase().includes(term)
    );
  }, [searchQuery, allProperties]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleRefetch = useCallback(() => {
    setPage(1);
    setAllProperties([]);
    setIsFilterChanging(true);
    refetch();
  }, [refetch]);

  const handleClearFilters = useCallback(() => {
    setSelectedCity("all");
    setSelectedType("all");
    setSearchQuery("");
  }, []);

  const handleCityChange = useCallback((val) => setSelectedCity(val), []);
  const handleTypeChange = useCallback((val) => setSelectedType(val), []);

  // ── Render guards ─────────────────────────────────────────────────────────
  const showSkeleton =
    (isLoading || isFilterChanging) && allProperties.length === 0;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f7f3eb] font-sans antialiased px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-gray-200/60">

          {/* Left: back + title */}
          <div className="flex items-start gap-4">
            {/* Back button */}
            <button
              onClick={handleBack}
              aria-label="Go back"
              className="mt-1 p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-slate-600 shadow-sm transition-colors shrink-0"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Icon + heading */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B9E4B] to-[#147638] flex items-center justify-center shadow-md shadow-[#063e23]/10 shrink-0 mt-1">
                <TrendingUp size={22} className="text-white" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#063e23] bg-[#063e23]/5 px-2.5 py-1 rounded inline-block mb-2">
                  Premium Collection
                </span>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight leading-none">
                  {title || "Recently Added Properties"}
                </h1>
              </div>
            </div>
          </div>

          {/* Right: search + filter toggle + refetch */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-80">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by title, city..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm placeholder-gray-400 outline-none transition-all focus:border-[#063e23] focus:ring-1 focus:ring-[#063e23] shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              aria-label="Toggle filters"
              className={`relative p-2.5 rounded-lg border flex items-center justify-center transition-all duration-200 shadow-sm ${
                showFilters
                  ? "bg-gradient-to-br from-[#1B9E4B] to-[#147638] text-white border-transparent"
                  : "bg-white text-slate-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <SlidersHorizontal size={18} />
              {/* Dot badge when non-default filters are active */}
              {(selectedCity !== "all" || selectedType !== "all") && !showFilters && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#1B9E4B]" />
              )}
            </button>

            {/* Manual refetch */}
            <button
              onClick={handleRefetch}
              disabled={isFetching}
              aria-label="Refresh listings"
              title="Refresh listings"
              className="p-2.5 rounded-lg border border-gray-200 bg-white text-slate-700 hover:bg-gray-50 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                size={18}
                className={isFetching ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        {/* ── ACTIVE FILTER PILLS ── */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {selectedCity !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#063e23]/10 text-[#063e23] text-xs font-semibold rounded-full">
                City: {selectedCity}
                <button onClick={() => setSelectedCity("all")} aria-label="Remove city filter">
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedType !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#063e23]/10 text-[#063e23] text-xs font-semibold rounded-full">
                Type: {selectedType}
                <button onClick={() => setSelectedType("all")} aria-label="Remove type filter">
                  <X size={12} />
                </button>
              </span>
            )}
            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#063e23]/10 text-[#063e23] text-xs font-semibold rounded-full">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery("")} aria-label="Remove search filter">
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-2 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        {/* ── BODY ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── FILTER PANEL ── */}
          {showFilters && (
            <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-6">
              <div className="bg-white p-5 rounded-xl border border-gray-100 space-y-5 shadow-sm">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Filter Parameters
                  </h3>
                  <div className="h-px bg-gray-100 w-full" />
                </div>

                <FilterSelect
                  label="City Location"
                  value={selectedCity}
                  onChange={handleCityChange}
                  options={CITY_OPTIONS}
                />

                <FilterSelect
                  label="Property Type"
                  value={selectedType}
                  onChange={handleTypeChange}
                  options={TYPE_OPTIONS}
                />

                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="w-full text-xs font-semibold text-slate-500 hover:text-[#063e23] transition-colors text-center pt-1"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </aside>
          )}

          {/* ── GRID ── */}
          <main className="flex-1 min-w-0 w-full">
            {showSkeleton ? (
              <SkeletonGrid />
            ) : isError ? (
              <ErrorState onRetry={handleRefetch} />
            ) : filteredDisplay.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                  {filteredDisplay.map((property) => (
                    <RecentCard key={property._id} property={property} />
                  ))}
                </div>

                {/* Infinite scroll sentinel */}
                <div ref={loaderRef} className="flex justify-center items-center py-12 min-h-[1px]">
                  {isFetching && isLoadingMore && (
                    <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">
                      <div className="w-4 h-4 border-2 border-[#063e23] border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-semibold text-slate-600 tracking-wide">
                        Loading more listings…
                      </span>
                    </div>
                  )}
                  {!hasMore && allProperties.length > 0 && (
                    <p className="text-xs text-slate-400 font-medium">
                      All properties loaded
                    </p>
                  )}
                </div>
              </>
            ) : (
              <EmptyState
                message={
                  hasActiveFilters
                    ? "No properties match your filters. Try adjusting them."
                    : "No properties available at the moment."
                }
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Properties;