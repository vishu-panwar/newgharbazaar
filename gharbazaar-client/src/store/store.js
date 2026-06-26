import { configureStore } from "@reduxjs/toolkit";
import { getAdvertisement } from "./HeroSectionQuery/getAdvertismentQuery";
import { getProperty } from "./propertyQuery/getPropertyQuery";
import bookmarkSlice from "./bookmark/bookMarkSlice"
import { checkkyc } from "./kyc/kycQuery";
import filterSlice from "./filterSlice"
export const store = configureStore({
  reducer: {
    [getAdvertisement.reducerPath]:getAdvertisement.reducer,
    [getProperty.reducerPath]:getProperty.reducer,
    bookmark:bookmarkSlice,
    [checkkyc.reducerPath]:checkkyc.reducer,
    topRatedFilters:filterSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      getAdvertisement.middleware,
      getProperty.middleware,
      checkkyc.middleware
    ),
});
