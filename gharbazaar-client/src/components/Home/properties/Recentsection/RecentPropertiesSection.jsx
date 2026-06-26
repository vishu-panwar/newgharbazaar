// ===============================
// RecentPropertiesSection.jsx
// Optimized Version
// ===============================

import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  TrendingUp,
} from "lucide-react";

import {
  useGetPropertiesQuery,
} from "../../../../store/propertyQuery/getPropertyQuery";

import RecentCard from "./RecentCard";
import RecentCardSkeleton from "./RecentCardSkeleton";

// ===============================
// MAIN SECTION
// ===============================
const RecentPropertiesSection = () => {

  const navigate = useNavigate();

  // ===============================
  // API
  // ===============================
  const {
    data,
    isLoading,
    isError,
  } = useGetPropertiesQuery(
    undefined,
    {
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      refetchOnFocus: false,
    }
  );

  // ===============================
  // SAFE DATA
  // ===============================
  const properties = useMemo(() => {

    const allProperties =
      Array.isArray(data)
        ? data
        : data?.data || [];

    return allProperties.slice(0, 5);

  }, [data]);

  // ===============================
  // NAVIGATION
  // ===============================
  const handleExploreMore = () => {

    navigate("/properties", {
      state: {
        title:
          "Recent Apartment Properties",
        location: "all",
        propertyType: "all",
      },
    });
  };

  // ===============================
  // JSX
  // ===============================
  return (
    <section className="bg-[#ede8df] py-6 px-4 sm:px-6 lg:px-8">

      <div className="w-full max-w-[1600px] mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Recently Listed Properties
            </h2>
          </div>

          <button
            onClick={handleExploreMore}
            className="text-sm font-semibold text-gray-800 hover:underline flex items-center gap-1 transition-all whitespace-nowrap"
          >
            Explore more →
          </button>

        </div>

        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

          {isLoading ? (

            [1, 2, 3, 4, 5].map((item) => (
              <RecentCardSkeleton key={item} />
            ))

          ) : isError ? (

            <div className="col-span-full bg-red-50 border border-red-100 text-red-600 p-6 text-center font-medium text-sm w-full">
              Failed to load properties.
              Please refresh the page.
            </div>

          ) : properties.length > 0 ? (

            properties.map((property) => (
              <RecentCard key={property?._id} property={property} />
            ))

          ) : (

            <div className="col-span-full bg-white border border-dashed border-gray-200 py-14 text-center w-full">

              <p className="text-gray-400 font-medium text-sm px-4">
                No properties available
                at the moment.
              </p>

            </div>

          )}

        </div>

        {/* MOBILE SLIDER */}
        <div className="block md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-3 pb-2">

            {isLoading ? (

              [1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex-shrink-0 w-[280px]">
                  <RecentCardSkeleton />
                </div>
              ))

            ) : isError ? (

              <div className="w-full bg-red-50 border border-red-100 text-red-600 p-6 text-center font-medium text-sm">
                Failed to load properties.
                Please refresh the page.
              </div>

            ) : properties.length > 0 ? (

              properties.map((property) => (
                <div key={property?._id} className="flex-shrink-0 w-[280px]">
                  <RecentCard property={property} />
                </div>
              ))

            ) : (

              <div className="w-full bg-white border border-dashed border-gray-200 py-14 text-center">
                <p className="text-gray-400 font-medium text-sm px-4">
                  No properties available
                  at the moment.
                </p>
              </div>

            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(
  RecentPropertiesSection
);