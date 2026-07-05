import { useState } from "react";
import {
  Gift, Users, Award, Copy, CheckCircle, IndianRupee,
  Smartphone, Laptop, Home as HomeIcon, Bike, Watch, Crown,
  ArrowRight, HelpCircle, Star,
} from "lucide-react";

export default function ReferAndEarn() {
  const [copied, setCopied] = useState(false);
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const referralCode = user?.referralCode || "GHAR2024XYZ";
  const referralLink = `https://gharbazaar.in/register?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#ede8df]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#f5f3e8] via-[#f0ede3] to-[#ebe7db] px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            
            {/* LEFT CONTENT */}
            <div className="flex-1 space-y-6">
              {/* Badge */}
              <div className="inline-block bg-[#1f9d55] text-white text-xs font-bold px-4 py-1.5 uppercase tracking-wide">
                EXCLUSIVE PROGRAM
              </div>

              {/* Heading */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-black mb-2">
                  Refer Friends.
                </h1>
                <h2 className="text-4xl lg:text-5xl font-black text-[#1f9d55] mb-3">
                  Earn Big.
                </h2>
                <p className="text-2xl text-gray-700 italic font-semibold mb-4">
                  Unlock Premium Rewards!
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-base leading-relaxed max-w-xl">
                Invite friends, help them find their perfect property and earn
                exciting rewards, bonuses and premium benefits. Join India's
                most rewarding real estate network.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#1f9d55] hover:bg-[#178a48] text-white px-6 py-3 font-bold text-sm flex items-center gap-2 transition-all shadow-sm">
                  Start Referring Now <ArrowRight size={18} />
                </button>
                <button className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 font-bold text-sm flex items-center gap-2 border-2 border-gray-300 transition-all">
                  <HelpCircle size={18} /> How It Works
                </button>
              </div>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-6 pt-4">
                {[
                  { icon: CheckCircle, label: "Verified\nProperties" },
                  { icon: Users, label: "Trusted by\nThousands" },
                  { icon: Award, label: "Quick\nResponse" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#1f9d55]/10 flex items-center justify-center">
                      <Icon size={16} className="text-[#1f9d55]" />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 whitespace-pre-line">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT CONTENT - Stats + Image */}
            <div className="flex-1 space-y-4">
              {/* Stats Cards */}
              <div className="flex gap-4">
                <div className="flex-1 bg-white shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={18} className="text-[#1f9d55]" />
                    <span className="text-xs font-semibold text-gray-600">Active Referrers</span>
                  </div>
                  <div className="text-2xl font-black">10,000+</div>
                </div>
                <div className="flex-1 bg-white shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee size={18} className="text-[#1f9d55]" />
                    <span className="text-xs font-semibold text-gray-600">Rewards Distributed</span>
                  </div>
                  <div className="text-2xl font-black">₹2.5Cr+</div>
                </div>
              </div>

              {/* Rewards Image */}
              <div className="bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-200 p-8">
                <div className="relative">
                  {/* Gift boxes and confetti illustration */}
                  <div className="flex justify-center items-end gap-4 mb-4">
                    <Gift size={60} className="text-[#d4af37]" strokeWidth={1.5} />
                    <Gift size={80} className="text-[#1f9d55]" strokeWidth={1.5} />
                    <Gift size={60} className="text-[#d4af37]" strokeWidth={1.5} />
                  </div>
                  
                  {/* Product icons */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-4 shadow-sm border border-gray-200 flex items-center justify-center">
                      <Smartphone size={32} className="text-gray-700" />
                    </div>
                    <div className="bg-white p-4 shadow-sm border border-gray-200 flex items-center justify-center">
                      <Laptop size={32} className="text-gray-700" />
                    </div>
                    <div className="bg-white p-4 shadow-sm border border-gray-200 flex items-center justify-center">
                      <Watch size={32} className="text-gray-700" />
                    </div>
                  </div>

                  {/* Refer & Earn badge */}
                  <div className="text-center">
                    <div className="inline-block bg-[#1f9d55] text-white px-6 py-2 font-black text-sm">
                      Refer & Earn
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Membership Tiers Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block border-t-2 border-gray-300 w-24 mb-4"></div>
            <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">
              MEMBERSHIP TIERS
            </h2>
            <p className="text-gray-600 text-sm">
              The more you refer, the more exclusive your benefits!
            </p>
          </div>

          {/* Tier Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* BRONZE */}
            <TierCard
              name="BRONZE"
              icon={<HomeIcon size={32} />}
              color="from-[#8B6F47] to-[#6B5839]"
              requirement="Unlock at"
              requirementValue="1 Successful Referrals"
              earnings="₹100"
              benefits={[
                "Referral Link & Dashboard",
                "All Bronze Benefits",
                "Track Referrals & Earnings",
                "Earn Cashback",
              ]}
            />

            {/* SILVER */}
            <TierCard
              name="SILVER"
              icon={<Users size={32} />}
              color="from-[#C0C0C0] to-[#999999]"
              requirement="Unlock at"
              requirementValue="10 Successful Referrals"
              earnings="₹150"
              benefits={[
                "All Bronze Benefits",
                "Higher Cashback",
                "Priority Support",
              ]}
            />

            {/* GOLD */}
            <TierCard
              name="GOLD"
              icon={<Award size={32} />}
              color="from-[#FFD700] to-[#DAA520]"
              requirement="Unlock at"
              requirementValue="25 Successful Referrals"
              earnings="₹250"
              benefits={[
                "All Silver Benefits",
                "VIP Support",
                "Exclusive Event Invite",
              ]}
            />

            {/* ELITE */}
            <TierCard
              name="ELITE"
              icon={<Crown size={32} />}
              color="from-[#9333EA] to-[#7C3AED]"
              requirement="Unlock at"
              requirementValue="50 Successful Referrals"
              earnings="₹500"
              benefits={[
                "Dedicated Relationship Manager",
                "Elite Community Access",
                "Max Cashback & Rewards",
              ]}
            />
          </div>
        </div>
      </div>

      {/* Bonus Rewards Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-gradient-to-br from-white to-[#f9f9f9] shadow-lg border border-gray-200 p-8 lg:p-12">
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-[#1f9d55] flex items-center justify-center shrink-0">
                <Gift size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black mb-2 uppercase">
                  AMAZING BONUS REWARDS
                </h2>
                <p className="text-gray-600 text-sm">
                  Unlock guaranteed high-value prizes as you hit major referral milestones.
                  Each target you achieve brings you one step closer to winning bigger rewards!
                </p>
              </div>
            </div>

            {/* Rewards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {[
                { count: "5 Referrals", reward: "₹500 Bonus", image: "💰" },
                { count: "10 Referrals", reward: "Smart Watch", image: "⌚" },
                { count: "20 Referrals", reward: "AirPods Pro", image: "🎧" },
                { count: "30 Referrals", reward: "Premium Laptop", image: "💻" },
                { count: "40 Referrals", reward: "iPhone 15", image: "📱" },
                { count: "50+ Referrals", reward: "Cruiser Bike", image: "🏍️" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-200 p-4 text-center hover:shadow-md transition-all">
                  <div className="w-full aspect-square bg-gray-50 flex items-center justify-center mb-3 text-4xl">
                    {item.image}
                  </div>
                  <div className="text-xs font-bold text-gray-600 mb-1">
                    {item.count}
                  </div>
                  <div className="text-sm font-black text-gray-900">
                    {item.reward}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button className="bg-[#1f9d55] hover:bg-[#178a48] text-white px-8 py-3 font-bold text-sm flex items-center gap-2 transition-all shadow-sm">
                Start Referring Now <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tier Card Component
function TierCard({ name, icon, color, requirement, requirementValue, earnings, benefits }) {
  return (
    <div className="bg-white shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-br ${color} p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-90">
              Member
            </div>
            <h3 className="text-2xl font-black uppercase">{name}</h3>
          </div>
          <div className="w-12 h-12 bg-white/20 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Requirement */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="text-xs font-semibold text-gray-500 mb-1 uppercase">
            {requirement}
          </div>
          <div className="text-sm font-bold text-gray-900">
            {requirementValue}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="text-xs font-semibold text-gray-500 mb-2 uppercase">
            Benefits
          </div>
          <div className="space-y-2">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle size={14} className="text-[#1f9d55] shrink-0 mt-0.5" />
                <span className="text-xs text-gray-700 leading-tight">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings */}
        <div>
          <div className="text-xs font-semibold text-gray-500 mb-1 uppercase">
            Earning per Referral
          </div>
          <div className="text-3xl font-black text-[#1f9d55]">{earnings}</div>
        </div>
      </div>
    </div>
  );
}
