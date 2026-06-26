// ===============================
// PGSection.jsx
// ===============================

import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPropertiesQuery } from "../../../../store/propertyQuery/getPropertyQuery";
import RecentCard from "../Recentsection/RecentCard";
import RecentCardSkeleton from "../Recentsection/RecentCardSkeleton";

// ===============================
// MAIN SECTION
// ===============================
const PGSection = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetPropertiesQuery();

  const allProperties = Array.isArray(data) ? data : data?.data || [];

  const pgProperties = allProperties
    .filter((item) => {
      const type = item?.type?.toLowerCase()?.trim();
      return type === "pg/hostel" || type === "pg" || type === "hostel";
    })
    .slice(0, 5);

  const handleExploreMore = () => {
    navigate("/properties", {
      state: {
        title: "PG/Hostels",
        location: "all",
        propertyType: "PG/Hostel",
      },
    });
  };

  return (
    <section className="bg-[#ede8df] py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1600px] mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-900">
            PG & Hostels
          </h2>
          <button
            onClick={handleExploreMore}
            className="text-sm font-semibold text-gray-800 hover:underline"
          >
            Explore more →
          </button>
        </div>

        {/* CARDS */}
        {isError ? (
          <div className="bg-red-50 border border-red-100 text-red-600 p-6 text-center font-medium text-sm">
            Failed to load PG properties. Please refresh the page.
          </div>
        ) : (
          <>
            {/* DESKTOP GRID */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {isLoading
                ? [1, 2, 3, 4, 5].map((i) => (
                    <RecentCardSkeleton key={i} />
                  ))
                : pgProperties.map((property) => (
                    <RecentCard key={property._id} property={property} />
                  ))}
            </div>

            {/* MOBILE SLIDER */}
            <div className="block md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
              <div className="flex gap-3 pb-2">
                {isLoading
                  ? [1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex-shrink-0 w-[280px]">
                        <RecentCardSkeleton />
                      </div>
                    ))
                  : pgProperties.map((property) => (
                      <div key={property._id} className="flex-shrink-0 w-[280px]">
                        <RecentCard property={property} />
                      </div>
                    ))}
              </div>
            </div>
          </>
        )}

        {/* EMPTY */}
        {!isLoading && !isError && pgProperties.length === 0 && (
          <div className="bg-white border border-dashed border-gray-200 py-14 text-center w-full mt-2">
            <p className="text-gray-400 font-medium text-sm px-4">
              No PG/Hostel listings available at the moment.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default PGSection;