import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ title, subTitle, items }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-5 shadow-sm border border-gray-100 flex flex-col h-full">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-5">
        <div className="max-w-[75%]">
          <h3 className="text-[1.1rem] font-extrabold leading-tight text-gray-900">
            {title}{" "}
            <span className="font-normal text-gray-800">| {subTitle}</span>
          </h3>
        </div>

        <button
          className="text-[0.8rem] font-medium text-gray-700 hover:text-black flex items-center shrink-0 mt-1"
          onClick={() => navigate("/categoryProperty")}
        >
          Explore more <span className="ml-1 text-lg leading-none">→</span>
        </button>
      </div>

      {/* 2x2 Image Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            onClick={() => navigate(`/property/${item.id}`)}
            className="group cursor-pointer"
          >
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden bg-gray-100 mb-2 relative">
              <img
                src={item.imageUrl}
                alt={item.label}
                draggable="false"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Label */}
            <p className="text-[0.85rem] font-bold text-gray-900 leading-tight">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
