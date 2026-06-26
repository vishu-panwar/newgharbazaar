// ManageProperties.jsx

import React, { useEffect, useState } from "react";

import {
  Building,
  MapPin,
  CheckCircle,
  XCircle,
  RefreshCw,
  Bath,
  BedDouble,
  IndianRupee,
  Eye,
  Calendar,
  Phone,
  Home,
  Sofa,
  Maximize,
  Wifi,
} from "lucide-react";

import PropertyCardShimmer from "./PropertyCardShimmer";

import {
  useGetPendingPropertyQuery,
  useUpdateStatusPropertyMutation,
} from "../../../store/propertyQuery/getPropertyQuery";
import { socket } from "../../../socket/socket";

export default function ManageProperties() {
  // =====================================================
  // API
  // =====================================================
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetPendingPropertyQuery();

  const [updateStatusProperty, { isLoading: updating }] =
    useUpdateStatusPropertyMutation();

  // =====================================================
  // STATES
  // =====================================================
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [rejectModal, setRejectModal] = useState(false);

  const [rejectionReason, setRejectionReason] = useState("");

  // ✅ IMPORTANT
  const [propertyId, setPropertyId] = useState(null);

  const properties = data?.data || [];

  // =====================================================
  // APPROVE PROPERTY
  // =====================================================
  const handleApprove = async (propertyId) => {
    try {
      await updateStatusProperty({
        propertyId,
        status: "Approved",
      }).unwrap();

      alert("Property Approved Successfully");

      setSelectedProperty(null);
    } catch (err) {
      console.log(err);

      alert("Failed to approve property");
    }
  };

  // =====================================================
  // OPEN REJECT MODAL
  // =====================================================
  const openRejectModal = (propertyId) => {
    setPropertyId(propertyId);

    setRejectModal(true);
  };

   useEffect(() => {
      if (localStorage.getItem("Property Verification") === "Property Verification") {
    localStorage.removeItem("Property Verification");
  }
     
      const handleNewEnquiry = async (data) => {
        console.log("New enquiry/contact:", data);
    
        if (data?.type === "Property Verification") {
    
          await refetch();
        }
      };
  
      socket.on("newEnquiry", handleNewEnquiry);                              
    
      return () => {
        socket.off("newEnquiry", handleNewEnquiry);
      };
    }, []);

  // =====================================================
  // REJECT PROPERTY
  // =====================================================
  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      return alert("Please enter rejection reason");
    }

    try {
      await updateStatusProperty({
        propertyId,
        status: "Rejected",
        rejectionReason,
      }).unwrap();

      alert("Property Rejected Successfully");

      setRejectModal(false);

      setRejectionReason("");

      setSelectedProperty(null);

      setPropertyId(null);
    } catch (err) {
      console.log(err);

      alert("Failed to reject property");
    }
  };

  // =====================================================
  // LOADING
  // =====================================================
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <PropertyCardShimmer />
        <PropertyCardShimmer />
        <PropertyCardShimmer />
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================
  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-red-600">
            Failed to load properties
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            {error?.data?.message || "Something went wrong"}
          </p>

          <button
            onClick={refetch}
            className="mt-4 px-5 py-2 bg-red-600 text-white rounded-xl"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Property Verification
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Review and approve pending listings
          </p>
        </div>

        <button
          onClick={refetch}
          disabled={isFetching}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl shadow-sm"
        >
          <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ===================================================== */}
      {/* EMPTY STATE */}
      {/* ===================================================== */}
      {properties.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed p-16 text-center">
          <CheckCircle size={40} className="mx-auto text-emerald-500" />

          <h2 className="mt-4 text-xl font-bold">No Pending Properties</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {properties.map((prop) => (
            <div
              key={prop._id}
              onClick={() => setSelectedProperty(prop)}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative h-52">
                <img
                  src={prop.images?.[0]}
                  alt={prop.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                  Pending
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {prop.title}
                </h2>

                <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                  <MapPin size={14} />

                  {prop.city}
                </div>

                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-semibold">
                    {prop.type}
                  </span>

                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold">
                    {prop.listingType}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-1 text-2xl font-extrabold">
                  <IndianRupee size={20} />

                  {prop.price?.toLocaleString("en-IN")}
                </div>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-3 mt-5 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <BedDouble size={15} />

                    {prop.propertySpecifications?.beds}
                  </div>

                  <div className="flex items-center gap-1 text-gray-600">
                    <Bath size={15} />

                    {prop.propertySpecifications?.bathrooms}
                  </div>

                  <div className="flex items-center gap-1 text-gray-600">
                    <Eye size={15} />

                    {prop.views}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===================================================== */}
      {/* PROPERTY DETAILS MODAL */}
      {/* ===================================================== */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden max-h-[95vh] overflow-y-auto">
            {/* IMAGE */}
            <div className="relative h-80">
              <img
                src={selectedProperty.images?.[0]}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-5 right-5 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg text-xl"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="p-7">
              {/* TITLE */}
              <div className="flex justify-between items-start gap-5">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900">
                    {selectedProperty.title}
                  </h1>

                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <MapPin size={16} />
                    {selectedProperty.location}, {selectedProperty.city}
                  </div>
                </div>

                <div className="text-3xl font-extrabold text-emerald-600">
                  ₹{selectedProperty.price?.toLocaleString("en-IN")}
                </div>
              </div>
              {/* DESCRIPTION */}
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-3">Description</h2>

                <p className="text-gray-600 leading-7">
                  {selectedProperty.description}
                </p>
              </div>
              {/* IMAGES */}
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Property Images</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedProperty.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="property"
                      className="h-44 w-full object-cover rounded-2xl"
                    />
                  ))}
                </div>
              </div>
              {/* SPECIFICATIONS */}
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-5">
                  Property Specifications
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {Object.entries(
                    selectedProperty.propertySpecifications || {},
                  ).map(([key, value]) => (
                    <SpecCard key={key} title={key} value={value} />
                  ))}
                </div>
              </div>
              {/* AMENITIES */}
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-5">Amenities</h2>

                <div className="flex flex-wrap gap-3">
                  {selectedProperty.amenities?.map((item, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-5">Property Details</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  <SpecCard
                    title="Phone"
                    value={selectedProperty.phoneNumber}
                  />

                  <SpecCard title="Views" value={selectedProperty.views} />

                  <SpecCard
                    title="Created"
                    value={new Date(
                      selectedProperty.createdAt,
                    ).toLocaleDateString()}
                  />

                  <SpecCard title="Status" value={selectedProperty.status} />
                </div>
              </div>
              {/* OWNER DETAILS */}
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-5">Owner Details</h2>

                <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">
                  <div className="flex items-center gap-4">
                    {/* OWNER IMAGE */}
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                      <img
                        src={
                          selectedProperty.ownBy?.profilePic ||
                          "https://ui-avatars.com/api/?name=User"
                        }
                        alt="owner"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* OWNER INFO */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {selectedProperty.ownBy?.fullName || "N/A"}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {selectedProperty.ownBy?.email || "No Email"}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {selectedProperty.ownBy?.phoneNumber ||
                          selectedProperty.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* ACTION BUTTONS */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                {/* APPROVE */}
                <button
                  onClick={() => handleApprove(selectedProperty._id)}
                  disabled={updating}
                  className="flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold"
                >
                  <CheckCircle size={18} />

                  {updating ? "Processing..." : "Approve"}
                </button>

                {/* REJECT */}
                <button
                  onClick={() => openRejectModal(selectedProperty._id)}
                  disabled={updating}
                  className="flex items-center justify-center gap-2 py-4 bg-red-50 border border-red-100 hover:bg-red-100 text-red-600 rounded-2xl font-bold"
                >
                  <XCircle size={18} />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* REJECT MODAL */}
      {/* ===================================================== */}
      {rejectModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Reject Property
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Please provide rejection reason
            </p>

            <textarea
              rows={5}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full mt-5 border border-gray-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-red-400"
            />

            <div className="grid grid-cols-2 gap-4 mt-6">
              {/* CANCEL */}
              <button
                onClick={() => {
                  setRejectModal(false);

                  setRejectionReason("");

                  setPropertyId(null);
                }}
                className="py-3 rounded-2xl border border-gray-300 font-semibold"
              >
                Cancel
              </button>

              {/* REJECT */}
              <button
                onClick={handleReject}
                disabled={updating}
                className="py-3 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700"
              >
                {updating ? "Rejecting..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================
// SPEC CARD
// =====================================================
function SpecCard({ title, value }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
      <p className="text-sm text-gray-500 capitalize">{title}</p>

      <h3 className="mt-2 text-lg font-bold text-gray-900">{value || "N/A"}</h3>
    </div>
  );
}
