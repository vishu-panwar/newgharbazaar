import React, { useState, useRef } from "react";
import axios from "axios";
import {
  BadgeCheck,
  Gift,
  Lock,
  UploadCloud,
  X,
  ImageIcon,
  Loader2,
} from "lucide-react";

export default function StudentRewards() {
  const API = import.meta.env.VITE_BASE_URL;

  const [formData, setFormData] = useState({
    fullName: "",
    college: "",
    mobile: "",
    email: "",
    coupon: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ API CALL ONLY
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const { data } = await axios.post(
        `${API}/useCoupon`,
        {
          couponCode: formData.coupon,
          fullName: formData.fullName,
          collegeName: formData.college,
          mobile: formData.mobile,
          email: formData.email,
        },{
          withCredentials:true
        }
      );

      setMessage(data.message);

      setFormData({
        fullName: "",
        college: "",
        mobile: "",
        email: "",
        coupon: "",
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#ede8df] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        
        {/* White Container Wrapper */}
        <div className="bg-white p-6 sm:p-8 shadow-sm">

          {/* HEADER */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1 bg-[#BAEDCD] text-[#000000] px-3 py-1.5 text-xs font-semibold border border-emerald-100">
              Exclusive offers
            </div>

            <h2 className="text-2xl font-bold text-[#11452f] mt-3">
              Student Rewards
            </h2>

            <p className="text-gray-600 mt-1 text-sm">
              Share a story on Instagram, Upload proof & Unlock your PG
            </p>
          </div>

          {/* LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT CARD */}
            <div className="bg-[#eef0df] p-6 sm:p-8 relative overflow-hidden">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1f1f1f] leading-tight max-w-xs">
                You are just one step away from your discount!!!
              </h3>

              <div className="w-12 h-0.5 bg-[#2f855a] mt-4 mb-6" />

              <div className="space-y-5">
                {[
                  {
                    icon: <BadgeCheck className="text-white" size={16} />,
                    title: "Already have a Coupon?",
                    desc: "Verify it using your details & proof",
                  },
                  {
                    icon: <Gift className="text-white" size={16} />,
                    title: "Instant Discount",
                    desc: "Get discount on your bookings instantly after successful verification.",
                  },
                  {
                    icon: <Lock className="text-white" size={16} />,
                    title: "Secure and Private",
                    desc: "Your information is safe with us and will never be shared.",
                  },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-3 items-start">
                    <div className="w-10 h-10 bg-[#167d3e] flex items-center justify-center shrink-0">
                      {icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{title}</h4>
                      <p className="text-gray-600 text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Image */}
              <div className="mt-8">
                <img 
                  src="/coupon-front.png" 
                  alt="Coupon" 
                  className="w-64 h-auto drop-shadow-lg"
                />
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="bg-[#eef0df] p-6 sm:p-8">

              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 bg-[#167d3e] flex items-center justify-center shrink-0">
                  <BadgeCheck className="text-white" size={18} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1f1f1f]">
                    Verify Your Coupon
                  </h3>
                  <p className="text-gray-600 text-sm mt-0.5">
                    Fill the details below to verify your coupon.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <InputField
                    label="Full Name"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />

                  <InputField
                    label="College / Hostel Name"
                    name="college"
                    placeholder="Enter your college or Hostel name"
                    value={formData.college}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Mobile Number"
                    name="mobile"
                    placeholder="Enter your Mobile No."
                    value={formData.mobile}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Email ID"
                    name="email"
                    placeholder="Enter your Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Upload Section */}
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">
                    Upload Story screenshot
                  </label>
                  <div className="border-2 border-dashed border-gray-300 p-8 text-center bg-white/50">
                    <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      JPG, PNG (max 5 MB)
                    </p>
                  </div>
                </div>

                {/* STATUS */}
                {message && (
                  <p className="text-green-600 text-sm mt-3 font-medium">
                    {message}
                  </p>
                )}

                {error && (
                  <p className="text-red-600 text-sm mt-3 font-medium">
                    {error}
                  </p>
                )}

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#014421] hover:bg-[#01331a] active:scale-[0.98] transition-all mt-5 py-3 text-white font-semibold text-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Unlock Discount"
                  )}
                </button>
              </form>
            </div>

          </div>
        
        </div>
        {/* End White Container */}

      </div>
    </section>
  );
}

// INPUT
function InputField({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5 text-gray-700">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-700 bg-white placeholder-gray-400"
        required
      />
    </div>
  );
}