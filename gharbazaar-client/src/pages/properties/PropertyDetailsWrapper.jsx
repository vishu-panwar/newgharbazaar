// ===============================
// PropertyDetailsWrapper.jsx
// Responsive wrapper for Property Details
// ===============================

import React, { useState, useEffect } from "react";
import PropertyDetails from "./PropertyDetails";
import PropertyDetailsMobile from "./PropertyDetailsMobile";

export default function PropertyDetailsWrapper() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <PropertyDetailsMobile /> : <PropertyDetails />;
}
