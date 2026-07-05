import React, { useState } from "react";
import { User, Mail, Phone, MapPin, CheckCircle, Calendar, Edit2 } from "lucide-react";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - replace with actual user data
  const profileData = {
    fullName: user?.fullName || "Ajay Sengar",
    email: user?.email || "Ajays@gmail.com",
    mobile: user?.mobile || "+91 7788990011",
    location: user?.location || "",
    kycVerified: true,
    kycId: "gb28050021",
    memberSince: "March 2026",
  };

  return (
    <div className="w-full min-h-screen bg-[#f0ede8] -m-4 lg:-m-8 p-3 sm:p-5 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">Profile</h1>
          <p className="text-sm text-gray-600">Manage your account's personal details</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 bg-[#1f9d55] hover:bg-[#178a48] text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors"
        >
          <Edit2 size={16} />
          Edit Profile
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-50 mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              Full Name
            </label>
            <div className="flex items-center gap-3 p-3.5 bg-[#f9f7f4] rounded-lg">
              <User size={18} className="text-gray-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-900">{profileData.fullName}</span>
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              Email Address
            </label>
            <div className="flex items-center gap-3 p-3.5 bg-[#f9f7f4] rounded-lg">
              <Mail size={18} className="text-gray-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-900">{profileData.email}</span>
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">
              Mobile Number
            </label>
            <div className="flex items-center gap-3 p-3.5 bg-[#f9f7f4] rounded-lg">
              <Phone size={18} className="text-gray-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-900">{profileData.mobile}</span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            Location
          </label>
          <div className="flex items-center gap-3 p-3.5 bg-[#f9f7f4] rounded-lg">
            <MapPin size={18} className="text-gray-500 flex-shrink-0" />
            {profileData.location ? (
              <span className="text-sm font-semibold text-gray-900">{profileData.location}</span>
            ) : (
              <button className="text-sm font-semibold text-[#1f9d55] hover:text-[#178a48] transition-colors">
                + Add Location
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Identity Verification */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-50 mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Identity Verification</h2>

        <div className="flex items-start gap-4 p-5 bg-green-50 border border-green-200 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-[#1f9d55] flex items-center justify-center flex-shrink-0">
            <CheckCircle size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold text-gray-900">Account Verified</h3>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Your KYC verification is complete. You can now access all partner features.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="px-4 py-2 bg-white border border-green-300 rounded-lg">
              <span className="text-xs font-bold text-gray-700">ID: {profileData.kycId}</span>
            </div>
          </div>
        </div>

        {/* Member Since */}
        <div className="flex items-center gap-2 mt-5 pt-5 border-t border-gray-100">
          <Calendar size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600">
            Member since <span className="font-semibold text-gray-900">{profileData.memberSince}</span>
          </span>
        </div>
      </div>

      {/* Additional Settings - Optional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Change Password */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#f9f7f4] flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1f9d55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-900 mb-1">Change Password</h3>
              <p className="text-xs text-gray-600">Update your password to keep your account secure</p>
            </div>
          </div>
          <button className="w-full bg-[#f9f7f4] hover:bg-[#f5f3e8] text-gray-900 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            Update Password
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#f9f7f4] flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1f9d55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-900 mb-1">Two-Factor Authentication</h3>
              <p className="text-xs text-gray-600">Add an extra layer of security to your account</p>
            </div>
          </div>
          <button className="w-full bg-[#f9f7f4] hover:bg-[#f5f3e8] text-gray-900 py-2.5 rounded-lg text-sm font-semibold transition-colors">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );
}
