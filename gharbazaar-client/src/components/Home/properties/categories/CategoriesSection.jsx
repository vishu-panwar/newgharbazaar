import React from "react";
import { useGetPropertiesCategoriesQuery } from "../../../../store/propertyQuery/getPropertyQuery";
import CategorySkeleton from "./CategorySkeleton";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  const categoriesToFetch = [
    {
      type: "residential",
      title: "Up to 30% off",
      subTitle: "Residential Properties | Top Brokers",
    },
    {
      type: "Commercial Space",
      title: "Commercial Spaces",
      subTitle: "Starting ₹50L | Premium Locations",
    },
    {
      type: "Plot/Land",
      title: "Plots & Land",
      subTitle: "Best Investment | Verified Titles",
    },
    {
      type: "Luxury Homes",
      title: "Luxury Homes",
      subTitle: "Premium Living | Exclusive Listings",
    },
  ];

  return (
    <section className="bg-[#ede8df] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">
            Categories
          </h2>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoriesToFetch.map((cat, idx) => (
            <DynamicCategoryCard
              key={idx}
              type={cat.type}
              displayTitle={cat.title}
              displaySubTitle={cat.subTitle}
            />
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="block md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-2">
            {categoriesToFetch.map((cat, idx) => (
              <div key={idx} className="flex-shrink-0 w-[320px]">
                <DynamicCategoryCard
                  type={cat.type}
                  displayTitle={cat.title}
                  displaySubTitle={cat.subTitle}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const DynamicCategoryCard = ({ type, displayTitle, displaySubTitle }) => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetPropertiesCategoriesQuery({ type });

  const properties = Array.isArray(data) ? data : data?.data || [];

  if (isLoading) return <CategorySkeleton />;

  // ==========================================
  // FALLBACK DATA
  // ==========================================
  const getDummyData = () => {
    const dummyMap = {
      residential: [
        {
          label: "Flat and Apartments",
          image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500",
        },
        {
          label: "Studio Apartments",
          image:
            "https://images.unsplash.com/photo-1494526585095-c41746248156?w=500",
        },
        {
          label: "Independent House",
          image:
            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=500",
        },
        {
          label: "Builder Floors",
          image:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500",
        },
      ],
      "Commercial Space": [
        {
          label: "Office Space",
          image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500",
        },
        {
          label: "Retail Shops",
          image:
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500",
        },
        {
          label: "Warehouses",
          image:
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500",
        },
        {
          label: "Co-working Spaces",
          image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500",
        },
      ],
      "Plot/Land": [
        {
          label: "Residential Plots",
          image:
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500",
        },
        {
          label: "Agriculture Land",
          image:
            "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500",
        },
        {
          label: "Industrial Plots",
          image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
        },
        {
          label: "Farm Houses",
          image:
            "https://images.unsplash.com/photo-1448630360428-65456885c650?w=500",
        },
      ],
      "Luxury Homes": [
        {
          label: "Penthouses",
          image:
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
        },
        {
          label: "Villas",
          image:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500",
        },
        {
          label: "Bungalows",
          image:
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500",
        },
        {
          label: "Sea Facing Flats",
          image:
            "https://images.unsplash.com/photo-1494526585095-c41746248156?w=500",
        },
      ],
    };

    return dummyMap[type] || [];
  };

  // ==========================================
  // CARD ITEMS
  // ==========================================
  const items =
    properties.length > 0
      ? properties.slice(0, 4).map((item) => ({
          id: item._id,
          label: item.title || "Property",
          image:
            item.images?.[0] ||
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
        }))
      : getDummyData();

  // ==========================================
  // NAVIGATION
  // ==========================================
  const handleCardClick = () => {
    let navigationData = {
      title: displayTitle,
      location: "all",
      propertyType: type,
    };

    if (type === "residential") {
      navigationData = {
        title: "Residential Properties",
        location: "all",
        propertyType: "residential",
      };
    }
    if (type === "Commercial Space") {
      navigationData = {
        title: "Commercial Spaces",
        location: "all",
        propertyType: "Commercial Space",
      };
    }
    if (type === "Plot/Land") {
      navigationData = {
        title: "Plots & Lands",
        location: "all",
        propertyType: "Plot/Land",
      };
    }
    if (type === "Luxury Homes") {
      navigationData = {
        title: "Luxury Homes",
        location: "all",
        propertyType: "Luxury Homes",
      };
    }

    navigate("/categoryProperty", { state: navigationData });
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      {/* Top */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-black text-gray-900 text-lg leading-tight">
            {displayTitle}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{displaySubTitle}</p>
        </div>

        <div className="flex items-center text-sm text-gray-500 group-hover:text-[#1f9d55] transition-colors whitespace-nowrap">
          Explore more
          <ArrowRight
            size={15}
            className="ml-1 group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {items.slice(0, 4).map((item, idx) => (
          <div key={idx} className="group/item">
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-[100px] object-cover transition-transform duration-500 group-hover/item:scale-110"
              />
            </div>
            <p className="text-[13px] font-semibold text-gray-800 mt-2 leading-tight">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;