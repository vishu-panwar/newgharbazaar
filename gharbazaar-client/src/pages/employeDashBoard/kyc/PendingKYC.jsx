import React from "react";

import {
  RefreshCw,
  FileWarning,
  Phone,
  Mail,
  UserCircle2,
} from "lucide-react";

import { useGetkycPendingQuery } from "../../../store/kyc/kycQuery";

export default function PendingKYC() {

  // =====================================
  // GET PENDING KYC
  // =====================================

  const {
    data,
    isLoading,
    refetch,
  } = useGetkycPendingQuery();

  const users = data?.data || [];

  // =====================================
  // REMINDER
  // =====================================

  const handleRemind = (id) => {
    alert(`Reminder sent to user ${id}`);
  };

  // =====================================
  // LOADING
  // =====================================

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 font-sans">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

        <div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Pending KYC
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Clients who have pending KYC verification
          </p>

        </div>

        <button
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
          onClick={refetch}
        >
          <RefreshCw size={16} className="text-gray-500" />
          <span>Refresh</span>
        </button>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {users.map((user) => (

          <div
            key={user._id}
            className="bg-white rounded-2xl border-t-4 border-red-500 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col p-5 border border-gray-100"
          >

            {/* TOP */}

            <div className="flex items-center justify-between gap-4 mb-4">

              <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                <UserCircle2 size={24} />
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full tracking-wide uppercase">

                <FileWarning size={12} />

                {user.status}

              </div>
            </div>

            {/* USER INFO */}

            <div className="mb-4">

              <h3 className="text-lg font-bold text-gray-900 leading-snug">
                {user.fullName}
              </h3>

              <div className="mt-1.5">

                <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-gray-200">
                  Pending Verification
                </span>

              </div>
            </div>

            {/* DETAILS */}

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 space-y-2.5 mb-5">

              {/* PHONE */}

              <div className="flex items-center gap-2.5 text-sm">

                <Phone
                  size={16}
                  className="text-gray-400 shrink-0"
                />

                <span className="text-gray-500 font-medium w-12">
                  Phone:
                </span>

                <span className="text-gray-900 font-semibold truncate">
                  {user.contactNumber}
                </span>

              </div>

              {/* ADDRESS */}

              <div className="flex items-start gap-2.5 text-sm">

                <Mail
                  size={16}
                  className="text-gray-400 shrink-0 mt-0.5"
                />

                <span className="text-gray-500 font-medium w-12">
                  Address:
                </span>

                <span className="text-gray-900 font-semibold">
                  {user.currentAddress}
                </span>

              </div>

              {/* AADHAAR */}

              <div className="mt-3 py-2 px-3 bg-red-50 border border-dashed border-red-200 rounded-lg text-center">

                <span className="text-xs text-red-700 font-bold tracking-tight">

                  Aadhaar:
                  {" "}
                  XXXX-XXXX-
                  {user.aadhaarNumber?.slice(-4)}

                </span>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="mt-auto flex items-center gap-3 w-full">

              <button
                onClick={() => handleRemind(user._id)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-sm transition duration-150"
              >
                <Mail size={16} />
                Send Reminder
              </button>

              <button
                onClick={() =>
                  alert(`Calling ${user.contactNumber}...`)
                }
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-bold rounded-xl transition duration-150"
              >
                <Phone size={16} />
                Call Client
              </button>

            </div>

          </div>
        ))}

        {/* EMPTY STATE */}

        {users.length === 0 && (

          <div className="col-span-full bg-white border border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full shadow-sm my-4">

            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner mb-4">

              <FileWarning size={32} />

            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1">
              No Pending KYC
            </h3>

            <p className="text-sm text-gray-500">
              All KYC requests are processed.
            </p>

          </div>
        )}
      </div>
    </div>
  );
}