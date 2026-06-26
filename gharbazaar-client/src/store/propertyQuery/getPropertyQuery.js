import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { mockAPI, mockProperties, mockCategories } from "../../utils/mockData";

// Use mock data if backend URL is not configured or is placeholder
const USE_MOCK_DATA = !import.meta.env.VITE_BASE_URL || 
                      import.meta.env.VITE_BASE_URL === 'http://localhost:3000';

const customBaseQuery = async (args, api, extraOptions) => {
  // If using mock data, return mock responses
  if (USE_MOCK_DATA) {
    const endpoint = typeof args === 'string' ? args : args.url;
    
    // Mock responses for different endpoints
    if (endpoint === '/top-rated') {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { data: mockProperties };
    }
    
    if (endpoint.startsWith('/category?type=')) {
      const type = new URLSearchParams(endpoint.split('?')[1]).get('type');
      await new Promise(resolve => setTimeout(resolve, 500));
      return { data: mockCategories[type] || [] };
    }
    
    if (endpoint.startsWith('/getPropertyById/')) {
      const id = endpoint.split('/').pop();
      await new Promise(resolve => setTimeout(resolve, 500));
      const property = mockProperties.find(p => p._id === id);
      return { data: { data: property, success: !!property } };
    }
    
    if (endpoint.includes('/getTopRateByType') || endpoint.includes('/getPropertyBycategory')) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Parse query params
      const urlParams = new URLSearchParams(endpoint.split('?')[1] || '');
      const type = urlParams.get('type');
      const city = urlParams.get('city');
      const page = parseInt(urlParams.get('page') || '1');
      const limit = parseInt(urlParams.get('limit') || '8');
      
      // Filter properties based on type and city
      let filtered = [...mockProperties];
      
      if (type && type !== 'all') {
        filtered = filtered.filter(p => {
          const propType = p.type?.toLowerCase() || p.propertyType?.toLowerCase() || '';
          const searchType = type.toLowerCase();
          return propType.includes(searchType) || searchType.includes(propType) || p.propertyType === type;
        });
      }
      
      if (city && city !== 'all') {
        filtered = filtered.filter(p => 
          p.city?.toLowerCase() === city.toLowerCase() ||
          p.location?.toLowerCase().includes(city.toLowerCase())
        );
      }
      
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = filtered.slice(startIndex, endIndex);
      const hasNextPage = endIndex < filtered.length;
      
      return { 
        data: paginatedData,
        hasNextPage,
        total: filtered.length,
        pagination: {
          hasNextPage,
          currentPage: page,
          totalPages: Math.ceil(filtered.length / limit)
        }
      };
    }
    
    // Default mock response
    return { data: [] };
  }
  
  // Use real API
  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
  
  return baseQuery(args, api, extraOptions);
};

export const getProperty = createApi({
  reducerPath: "getProperty",
  baseQuery: customBaseQuery,

  tagTypes: ["Bookmark", "Property", "view", "PropertyStatus","Bookmark1"],

  endpoints: (builder) => ({
    getProperties: builder.query({
      query: () => `/top-rated`,
      providesTags: ["Property", "Bookmark"],
    }),

    getPropertiesCategories: builder.query({
      query: ({ type }) => `/category?type=${type}`,
    }),

    getOffers: builder.query({
      query: () => `/offers`,
    }),

    getTopRatesPropertyById: builder.query({
      query: ({ type, city, page = 1 }) => {
        const params = new URLSearchParams({
          page,
          limit: 8,
        });
        if (type && type !== "all") params.append("type", type);
        if (city && city !== "all") params.append("city", city);
        return `/getTopRateByType?${params.toString()}`;
      },
      providesTags: ["Bookmark1"],
    }),

    getPropertiesByCategory: builder.query({
      query: ({ type, city, page = 1 }) =>
        `/getPropertyBycategory?type=${type}&city=${city}&page=${page}&limit=8`,

      serializeQueryArgs: ({ queryArgs }) => {
        const { type, city } = queryArgs;
        return { type, city };
      },

      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) return newItems;
        currentCache.data.push(...newItems.data);
        currentCache.hasNextPage = newItems.hasNextPage;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getPropertyById: builder.query({
      query: ({ id }) => `/getPropertyById/${id}`,
      providesTags: ["Property", "view", "Bookmark"],
    }),

    getBookmark: builder.query({
      query: () => ({
        url: "/getbookmark",
        method: "GET",
      }),
      providesTags: ["Bookmark"],
    }),

    // ✅ ONLY CHANGE: removed "Property" from invalidatesTags
    toggleBookmark: builder.mutation({
      query: (propertyId) => ({
        url: "/bookmark",
        method: "POST",
        body: { propertyId },
      }),
      invalidatesTags: ["Bookmark", "Bookmark1"],
    }),

    updateview: builder.mutation({
      query: (propertyId) => ({
        url: `/view/${propertyId}`,
        method: "POST",
      }),
      invalidatesTags: ["view"],
    }),
    getPendingProperty: builder.query({
      query: () => ({
        url: "/pendingProperty",
        method: "GET",
      }),

      providesTags: ["PropertyStatus"],
    }),

    updateStatusProperty: builder.mutation({
      query: ({ propertyId, status, rejectionReason }) => ({
        url: `/updateProperty/${propertyId}`,
        method: "PUT",

        body: {
          status,
          rejectionReason,
        },
      }),

      invalidatesTags: ["PropertyStatus"],
    }),
  }),
});

export const {
  useGetPropertyByIdQuery,
  useGetPropertiesQuery,
  useGetPropertiesCategoriesQuery,
  useGetOffersQuery,
  useGetTopRatesPropertyByIdQuery,
  useGetPropertiesByCategoryQuery,
  useToggleBookmarkMutation,
  useGetBookmarkQuery,
  useUpdateviewMutation,
  useGetPendingPropertyQuery,
  useUpdateStatusPropertyMutation,
} = getProperty;
