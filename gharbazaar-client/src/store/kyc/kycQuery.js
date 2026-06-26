import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checkkyc = createApi({
  reducerPath: "checkkyc",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["KYC"],

  endpoints: (builder) => ({

    checkkyc: builder.query({

      query: () => ({
        url: "/kycverify",
        method: "GET",
      }),

    }),
     getkycPending: builder.query({

      query: () => ({
        url: "/kycpending",
        method: "GET",
      }),
      providesTags:["KYC"]
    }),
     updatekyc: builder.mutation({

      query: ({id,status,rejectionReason}) => ({
        url: `/update-status/${id}`,
        method: "PUT",
        body:{
          status,
          rejectionReason
        }
      }),

      invalidatesTags:["KYC"]

    }),
  }),
});

export const { useCheckkycQuery,useGetkycPendingQuery,useUpdatekycMutation } = checkkyc;