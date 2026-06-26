// EmployeeKYC.jsx
import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  FileText,
  UserCircle2,
  RefreshCw,
} from "lucide-react";
import {
  useGetkycPendingQuery,
  useUpdatekycMutation,
} from "../../../store/kyc/kycQuery";
import KycCardShimmer from "./KycCardShimmer";
import { socket } from "../../../socket/socket";



export default function EmployeeKYC() {
  // =====================================
  // STATES
  // =====================================
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedKycId, setSelectedKycId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // =====================================
  // GET PENDING KYC
  // =====================================
  const { data, isLoading, refetch } = useGetkycPendingQuery();

  // =====================================
  // UPDATE KYC
  // =====================================
  const [updatekyc, { isLoading: updating }] = useUpdatekycMutation();

  // =====================================
  // REQUESTS
  // =====================================
  const requests = data?.data || [];

  // =====================================
  // APPROVE
  // =====================================
  const handleApprove = async (id) => {
    try {
      await updatekyc({
        id,
        status: "Verified",
      }).unwrap();
      alert("KYC Approved Successfully");
    } catch (error) {
      console.log(error);
      alert(error?.data?.message || "Something went wrong");
    }
  };

  // =====================================
  // OPEN REJECT MODAL
  // =====================================
  const openRejectModal = (id) => {
    setSelectedKycId(id);
    setShowRejectModal(true);
  };

  useEffect(() => {
   if (localStorage.getItem("KYC Verification") === "KYC Verification") {
  localStorage.removeItem("KYC Verification");
}
    const handleNewEnquiry = async (data) => {
      console.log("New enquiry/contact:", data);
  
      if (data?.type === "KYC Verification") {
  
        await refetch();
      }
    };

    socket.on("newEnquiry", handleNewEnquiry);                              
  
    return () => {
      socket.off("newEnquiry", handleNewEnquiry);
    };
  }, []);

  // =====================================
  // SUBMIT REJECTION
  // =====================================
  const submitReject = async () => {
    if (!rejectionReason.trim()) {
      return alert("Rejection reason is required");
    }

    try {
      await updatekyc({
        id: selectedKycId,
        status: "Rejected",
        rejectionReason,
      }).unwrap();

      alert("KYC Rejected Successfully");
      setShowRejectModal(false);
      setRejectionReason("");
      setSelectedKycId(null);
    } catch (error) {
      console.log(error);
      alert(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-8 w-full">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            KYC Verification
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and verify user identification documents
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
          onClick={refetch}
          disabled={isLoading}
        >
          <RefreshCw size={16} className={`text-gray-500 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* GRID CONTAINER */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
        {isLoading ? (
          <>
            {/* Renders a grid pattern of skeleton elements during API processing */}
            <KycCardShimmer />
            <KycCardShimmer />
            <KycCardShimmer />
          </>
        ) : (
          <>
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:border-purple-300 transition-all duration-200 flex flex-col min-h-[400px]"
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <UserCircle2 size={24} />
                  </div>
                  <div className="px-2.5 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full tracking-wide uppercase shadow-sm">
                    Pending Review
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                    {request.fullName}
                  </h3>

                  <div className="mt-2 space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      Phone:
                      <span className="font-semibold ml-1">
                        {request.contactNumber}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600">
                      Aadhaar:
                      <span className="font-semibold ml-1">
                        XXXX-XXXX-{request.aadhaarNumber?.slice(-4)}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600">
                      Address:
                      <span className="font-semibold ml-1">
                        {request.currentAddress}
                      </span>
                    </p>
                  </div>

                  {/* DOCUMENTS */}
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-4">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Aadhaar Documents
                      </span>
                    </div>

                    {/* IMAGES */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* FRONT */}
                      <div className="space-y-1">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                          Front Side
                        </span>
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                          <img
                            src={request.aadhaarFront}
                            alt="Document Front"
                            className="w-full h-24 object-cover"
                          />
                        </div>
                      </div>

                      {/* BACK */}
                      <div className="space-y-1">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                          Back Side
                        </span>
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                          <img
                            src={request.aadhaarBack}
                            alt="Document Back"
                            className="w-full h-24 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="grid grid-cols-2 gap-3 pt-5 mt-auto border-t border-gray-100">
                  <button
                    disabled={updating}
                    onClick={() => handleApprove(request._id)}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm disabled:opacity-50"
                  >
                    <CheckCircle size={15} />
                    Approve
                  </button>

                  <button
                    disabled={updating}
                    onClick={() => openRejectModal(request._id)}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl border border-red-100 disabled:opacity-50"
                  >
                    <XCircle size={15} />
                    Reject
                  </button>
                </div>
              </div>
            ))}

            {/* EMPTY STATE */}
            {requests.length === 0 && (
              <div className="col-span-full bg-white border border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full shadow-sm my-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  All Caught Up!
                </h3>
                <p className="text-sm text-gray-500">
                  There are no pending KYC requests at the moment.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* REJECT MODAL */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reject KYC</h2>

            <textarea
              rows={5}
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-400 resize-none text-sm"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason("");
                }}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>

              <button
                disabled={updating}
                onClick={submitReject}
                className="px-4 py-2 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}