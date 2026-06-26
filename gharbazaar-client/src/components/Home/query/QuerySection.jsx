import React, { useState } from "react";
import axios from "axios";

import {
  User,
  Phone,
  Search,
  MapPin,
  ChevronDown,
  CheckCircle,
  Users,
  Clock,
  Home,
  Handshake,
  Headphones,
  Wrench,
} from "lucide-react";

export default function QuerySection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    lookingFor: "",
    location: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/enquery/create`,
        formData
      );
      if (res.data.success) {
        alert("Enquiry Submitted Successfully");
        setFormData({ name: "", phone: "", lookingFor: "", location: "", budget: "" });
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Home,       title: "150+ Properties",              desc: "Verified listings across multiple locations" },
    { icon: Users,      title: "Trusted by Students & Family", desc: "Safe and reliable housing solutions" },
    { icon: Handshake,  title: "100+ Verified Partners",       desc: "Trusted owners and service providers" },
    { icon: Headphones, title: "24/7 Support",                 desc: "Quick response from our team" },
    { icon: Wrench,     title: "Home Services",                desc: "From cleaning to repairs, we connect you with trusted experts" },
  ];

  return (
    <div className="w-full bg-[#f7f3eb] font-sans antialiased pb-10">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="w-full bg-gradient-to-b from-[#063e23] to-[#032c18] text-white px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* LEFT — desktop only */}
          <div className="hidden md:flex lg:col-span-4 flex-col space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#125835] border border-[#237049] text-[#7ee2ad] text-xs font-semibold px-3 py-1.5 w-fit">
              <Headphones className="w-3.5 h-3.5" />
              We're Here to Help
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Looking for the right property?
            </h1>
            <p className="text-sm text-gray-300">
              Tell us your requirements and our expert will help you find the best options.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { icon: CheckCircle, label: "Verified\nProperties" },
                { icon: Users,       label: "Trusted by\nThousands" },
                { icon: Clock,       label: "Quick\nResponse" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="bg-[#125835] p-2">
                    <Icon className="w-4 h-4 text-[#7ee2ad]" />
                  </div>
                  <span className="text-xs font-medium text-gray-200 whitespace-pre-line">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE heading */}
          <div className="md:hidden">
            <div className="inline-flex items-center gap-1.5 bg-[#125835] border border-[#237049] text-[#7ee2ad] text-[11px] font-semibold px-2.5 py-1 mb-3">
              <Headphones className="w-3 h-3" />
              We're Here to Help
            </div>
            <h1 className="text-xl font-bold tracking-tight leading-snug mb-1">
              Looking for the right property?
            </h1>
            <p className="text-xs text-gray-300 mb-1">
              Tell us your needs — our expert will find the best options.
            </p>
          </div>

          {/* FORM */}
          <div className="lg:col-span-6">
            <h2 className="text-lg font-semibold mb-4 tracking-wide">
              Send Your Enquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              {/* NAME + PHONE */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text" name="name" value={formData.name}
                    onChange={handleChange} placeholder="Your Name" required
                    className="w-full bg-[#04331c] border border-[#165134] px-3 py-3 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#237049]"
                  />
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel" name="phone" value={formData.phone}
                    onChange={handleChange} placeholder="Mobile Number" required
                    className="w-full bg-[#04331c] border border-[#165134] px-3 py-3 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#237049]"
                  />
                </div>
              </div>

              {/* LOOKING FOR */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Search className="w-4 h-4" />
                </span>
                <select
                  name="lookingFor" value={formData.lookingFor}
                  onChange={handleChange} required
                  className="w-full bg-[#04331c] border border-[#165134] px-3 py-3 pl-10 pr-10 text-sm text-gray-400 appearance-none focus:outline-none focus:border-[#237049]"
                >
                  <option value="">I'm looking for...</option>
                  <option value="Single Room">Single Room</option>
                  <option value="Shared Room">Shared Room</option>
                  <option value="1 RK">1 RK</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="Flat / Apartment">Flat / Apartment</option>
                  <option value="Commercial Space">Commercial Space</option>
                  <option value="PG">PG</option>
                  <option value="Other">Other</option>
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </div>

              {/* LOCATION + BUDGET */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <input
                    type="text" name="location" value={formData.location}
                    onChange={handleChange} placeholder="Preferred Location" required
                    className="w-full bg-[#04331c] border border-[#165134] px-3 py-3 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#237049]"
                  />
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 text-sm font-medium">
                    ₹
                  </span>
                  <select
                    name="budget" value={formData.budget}
                    onChange={handleChange} required
                    className="w-full bg-[#04331c] border border-[#165134] px-3 py-3 pl-8 pr-10 text-sm text-gray-400 appearance-none focus:outline-none focus:border-[#237049]"
                  >
                    <option value="">Budget Range</option>
                    <option value="Under 5 Thousands">Under ₹5K</option>
                    <option value="5 - 10 Thousands">₹5K – ₹10K</option>
                    <option value="10 Thousands - 20 Thousands">₹10K – ₹20K</option>
                    <option value="20 Thousands +">₹20K+</option>
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit" disabled={loading}
                className="w-full bg-white text-[#032c18] font-semibold text-sm py-3 tracking-wide hover:bg-gray-100 transition shadow"
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>

            </form>
          </div>

          {/* IMAGE — desktop only */}
          <div className="lg:col-span-2 hidden lg:flex justify-end items-center">
            <img
              src="/ghar.png" alt="GharBazaar Illustration"
              className="w-40 h-auto object-contain drop-shadow-md"
            />
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES
          Mobile:  2-col grid (2 + 2 + 1 centred)
          lg+:     5-col grid
      ═══════════════════════════════════════ */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 text-center">

        <h2 className="text-2xl sm:text-3xl font-bold text-[#063e23]">
          Why Choose GharBazaar?
        </h2>
        <p className="text-sm text-gray-600 mt-2 mb-8">
          India's trusted platform for Properties, Services and Renting.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={title}
              className={`bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center${
                idx === 4 ? " col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="bg-[#dcfce7] text-[#15803d] p-6 mb-4">
                <Icon className="w-12 h-12 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-bold text-gray-900 leading-snug mb-2">
                {title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}