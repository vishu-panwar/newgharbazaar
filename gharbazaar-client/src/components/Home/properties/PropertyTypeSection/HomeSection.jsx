// ===============================
// HomeSection.jsx — matches RecentCard UI exactly
// ===============================

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetPropertiesQuery,
} from "../../../../store/propertyQuery/getPropertyQuery";
import RecentCard from "../Recentsection/RecentCard";
import RecentCardSkeleton from "../Recentsection/RecentCardSkeleton";

// ===============================
// MAIN SECTION
// ===============================
const HomeSection = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetPropertiesQuery();

  const allProperties = Array.isArray(data) ? data : data?.data || [];

  const homeProperties = allProperties
    .filter((item) => {
      const type = item?.type?.toLowerCase()?.trim();
      return (
        type === "home/house" ||
        type === "independent house" ||
        type === "villa" ||
        type === "apartment"
      );
    })
    .slice(0, 5);

  const propertiesToRender = homeProperties;

  const handleExploreMore = () => {
    navigate("/properties", {
      state: {
        title: "Houses/Homes",
        location: "all",
        propertyType: "Home/House",
      },
    });
  };

  return (
    
    <section className="bg-[#ede8df] py-3 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1600px] mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Homes & Houses
          </h2>
          <button
            onClick={handleExploreMore}
            className="text-sm font-semibold text-gray-800 hover:underline flex items-center gap-1 transition-all"
          >
            Explore more →
          </button>
        </div>

        {/* CARDS - DESKTOP */}
        {isError ? (
          <div className="bg-red-50 border border-red-100 text-red-600 p-6 text-center font-medium text-sm">
            Failed to load home properties. Please refresh the page.
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {isLoading
                ? [1, 2, 3, 4, 5].map((i) => (
                    <RecentCardSkeleton key={i} />
                  ))
                : propertiesToRender.map((property) => (
                    <RecentCard key={property?._id} property={property} />
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
                  : propertiesToRender.map((property) => (
                      <div key={property?._id} className="flex-shrink-0 w-[280px]">
                        <RecentCard property={property} />
                      </div>
                    ))}
              </div>
            </div>
          </>
        )}

        {/* EMPTY */}
        {!isLoading && !isError && propertiesToRender.length === 0 && (
          <div className="bg-white border border-dashed border-gray-200 py-14 text-center w-full mt-2">
            <p className="text-gray-400 font-medium text-sm px-4">
              No Home/House listings available at the moment.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default HomeSection;