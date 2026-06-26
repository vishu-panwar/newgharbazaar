import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useLocation,
} from "react-router-dom";

import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

import {
  useGetTopRatesPropertyByIdQuery,
} from "../../store/propertyQuery/getPropertyQuery";

import RecentCardSkeleton from "../../components/Home/properties/Recentsection/RecentCardSkeleton";
import RecentCard from "../../components/Home/properties/Recentsection/RecentCard";

function CategoriesPage() {
  const loaderRef = useRef(null);

  const locationData = useLocation();

  const {
    title = "Properties",
    location = "all",
    propertyType = "all",
  } = locationData.state || {};

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [selectedCity, setSelectedCity] =
    useState(location);

  const [selectedType, setSelectedType] =
    useState(propertyType);

  const [page, setPage] = useState(1);

  const [allProperties, setAllProperties] =
    useState([]);

  const [isFilterChanging, setIsFilterChanging] =
    useState(false);

  const [isLoadingMore, setIsLoadingMore] =
    useState(false);

  // ==========================================
  // QUERY PARAMS
  // ==========================================

  const queryParams = useMemo(
    () => ({
      type:
        selectedType === "all"
          ? ""
          : selectedType,

      city:
        selectedCity === "all"
          ? ""
          : selectedCity,

      page,
      limit: 8,
    }),
    [selectedType, selectedCity, page]
  );

  // ==========================================
  // API
  // ==========================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetTopRatesPropertyByIdQuery(
    queryParams,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // ==========================================
  // RESET DATA ON FILTER CHANGE
  // ==========================================

  useEffect(() => {
    setPage(1);
    setAllProperties([]);
    setIsFilterChanging(true);
  }, [selectedCity, selectedType]);

  // ==========================================
  // APPEND DATA
  // ==========================================

  useEffect(() => {
    if (!data?.data) return;

    setAllProperties((prev) => {
      if (page === 1) {
        return data.data;
      }

      const merged = [
        ...prev,
        ...data.data,
      ];

      return Array.from(
        new Map(
          merged.map((item) => [
            item._id,
            item,
          ])
        ).values()
      );
    });

    setIsFilterChanging(false);
  }, [data, page]);

  // ==========================================
  // LOADING MORE
  // ==========================================

  useEffect(() => {
    if (!isFetching) {
      setIsLoadingMore(false);
    }
  }, [isFetching]);

  const hasMore =
    data?.hasNextPage ||
    data?.pagination?.hasNextPage ||
    false;

  // ==========================================
  // INFINITE SCROLL
  // ==========================================

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          const first = entries[0];

          if (
            first.isIntersecting &&
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
        {
          rootMargin: "300px",
          threshold: 0,
        }
      );

    const currentLoader =
      loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [
    hasMore,
    isFetching,
    isLoading,
    isLoadingMore,
    isFilterChanging,
  ]);

  // ==========================================
  // SEARCH FILTER
  // ==========================================

  const filteredDisplay = useMemo(() => {
    const term =
      searchQuery.toLowerCase().trim();

    if (!term) return allProperties;

    return allProperties.filter(
      (p) =>
        p?.title
          ?.toLowerCase()
          .includes(term) ||
        p?.location
          ?.toLowerCase()
          .includes(term) ||
        p?.city
          ?.toLowerCase()
          .includes(term)
    );
  }, [searchQuery, allProperties]);

  return (
    <div className="min-h-screen bg-[#f7f3eb] px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-gray-200/60">

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B9E4B] to-[#147638] flex items-center justify-center shadow-md shrink-0 mt-1">
              <TrendingUp
                size={22}
                className="text-white"
              />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#063e23] bg-[#063e23]/5 px-2.5 py-1 rounded inline-block mb-2">
                Premium Collection
              </span>

              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950">
                {title}
              </h1>
            </div>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-3 w-full md:w-auto">

            <div className="relative flex-1 md:w-80">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />

              <input
                type="text"
                placeholder="Search by title, city..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#063e23] focus:ring-1 focus:ring-[#063e23]"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
              />
            </div>

            <button
              onClick={() =>
                setShowFilters(
                  !showFilters
                )
              }
              className={`p-2.5 rounded-lg border flex items-center justify-center transition-all ${
                showFilters
                  ? "bg-gradient-to-br from-[#1B9E4B] to-[#147638] text-white"
                  : "bg-white text-slate-700 border-gray-200"
              }`}
            >
              <SlidersHorizontal
                size={18}
              />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* FILTERS */}
          {showFilters && (
            <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-6">

              <div className="bg-white p-5 rounded-xl border border-gray-100 space-y-5 shadow-sm">

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Filter Parameters
                  </h3>

                  <div className="h-px bg-gray-100 w-full" />
                </div>

                {/* CITY */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    City Location
                  </label>

                  <div className="relative">
                    <select
                      value={selectedCity}
                      onChange={(e) =>
                        setSelectedCity(
                          e.target.value
                        )
                      }
                      className="w-full bg-slate-50 border border-gray-200 p-2.5 pr-10 rounded-lg text-sm font-medium appearance-none outline-none"
                    >
                      <option value="all">
                        All Cities
                      </option>

                      <option value="Delhi">
                        Delhi
                      </option>

                      <option value="Bangalore">
                        Bangalore
                      </option>

                      <option value="Mumbai">
                        Mumbai
                      </option>

                      <option value="Noida">
                        Noida
                      </option>
                    </select>

                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                  </div>
                </div>

                {/* TYPE */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    Property Type
                  </label>

                  <div className="relative">
                    <select
                      value={selectedType}
                      onChange={(e) =>
                        setSelectedType(
                          e.target.value
                        )
                      }
                      className="w-full bg-slate-50 border border-gray-200 p-2.5 pr-10 rounded-lg text-sm font-medium appearance-none outline-none"
                    >
                      <option value="all">
                        All Types
                      </option>

                      <option value="residential">
                        Residential
                      </option>

                      <option value="Plot/Land">
                        Plot/Land
                      </option>

                      <option value="Commercial Space">
                        Commercial Space
                      </option>
                    </select>

                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* GRID */}
          <main className="flex-1 min-w-0 w-full">

            {(isLoading ||
              isFilterChanging) &&
            allProperties.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {Array.from({
                  length: 8,
                }).map((_, i) => (
                  <RecentCardSkeleton
                    key={i}
                  />
                ))}
              </div>
            ) : isError ? (
              <div className="bg-white rounded-xl p-12 text-center border border-dashed border-red-200 text-red-600 font-medium shadow-sm">
                Failed to load
                properties.
              </div>
            ) : filteredDisplay.length >
              0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">

                  {filteredDisplay.map(
                    (property) => (
                      <RecentCard
                        key={
                          property._id
                        }
                        property={
                          property
                        }
                      />
                    )
                  )}
                </div>

                {/* LOADER */}
                {hasMore && (
                  <div
                    ref={loaderRef}
                    className="flex justify-center items-center py-12"
                  >
                    {isFetching && (
                      <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100">

                        <div className="w-4 h-4 border-2 border-[#063e23] border-t-transparent rounded-full animate-spin" />

                        <span className="text-xs font-semibold text-slate-600 tracking-wide">
                          Loading more
                          listings...
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white border border-dashed border-gray-200 rounded-2xl py-14 text-center">
                <p className="text-gray-400 font-medium text-sm px-4">
                  No properties
                  available at the
                  moment.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;