import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Mock advertisements
const mockAdvertisements = [
  {
    _id: "ad1",
    image: "/banner1.jpg",
    title: "Find Your Dream Home",
    link: "/properties"
  },
  {
    _id: "ad2",
    image: "/banner2.jpg",
    title: "Premium Properties",
    link: "/luxury-homes"
  },
  {
    _id: "ad3",
    image: "/banner3.jpg",
    title: "Commercial Spaces",
    link: "/commercial-properties"
  },
  {
    _id: "ad4",
    image: "/banner4.jpg",
    title: "Commercial Spaces",
    link: "/commercial-properties"
  }
];

const USE_MOCK_DATA = !import.meta.env.VITE_BASE_URL || 
                      import.meta.env.VITE_BASE_URL === 'http://localhost:3000';

const customBaseQuery = async (args, api, extraOptions) => {
  if (USE_MOCK_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: { advertisements: mockAdvertisements } };
  }
  
  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL
  });
  
  return baseQuery(args, api, extraOptions);
};

export const getAdvertisement = createApi({
  reducerPath: "getAdvertisement",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getAdvertisement: builder.query({
      query: () => `/getAdvertisement`,
    }),
  }),
});

export const { useGetAdvertisementQuery } = getAdvertisement;