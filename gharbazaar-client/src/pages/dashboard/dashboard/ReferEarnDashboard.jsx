import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";

// Icons
function CartIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function HeartIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function RupeeIcon({ size = 20, color = "currentColor" }) {
  return <FaIndianRupeeSign size={size} color={color} />;
}

function EyeIcon({ size = 20, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ArrowRightIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ReferEarnDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const referralCode = user?.referralCode || "GHAR2024XYZ";
  const referralLink = `https://gharbazaar.in/register?ref=${referralCode}`;
  const [copied, setCopied] = useState(false);

  // Mock data - replace with actual API data
  const totalReferrals = 32;
  const successfulReferrals = 28;
  const pendingReferrals = 4;
  const totalEarnings = 15750;
  const targetForNextTier = 50;
  const progressPercentage = (totalReferrals / targetForNextTier) * 100;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tiers = [
    { name: "Bronze", target: 1, color: "bg-[#8B6F47]", completed: true },
    { name: "Silver", target: 10, color: "bg-[#C0C0C0]", completed: true },
    { name: "Gold", target: 25, color: "bg-[#FFD700]", completed: true },
    { name: "Elite", target: 50, color: "bg-[#9333EA]", completed: false },
  ];

  const topReferrers = [
    { name: "Rajesh Kumar", referrals: 45, avatar: "RK" },
    { name: "Priya Sharma", referrals: 42, avatar: "PS" },
    { name: "Amit Patel", referrals: 38, avatar: "AP" },
    { name: "Sneha Gupta", referrals: 35, avatar: "SG" },
    { name: "Vikram Singh", referrals: 32, avatar: "VS" },
  ];

  const recentReferrals = [
    { name: "Rahul Verma", status: "Successful", date: "2 hours ago", amount: 250 },
    { name: "Anita Desai", status: "Pending", date: "5 hours ago", amount: 0 },
    { name: "Karan Mehta", status: "Successful", date: "1 day ago", amount: 250 },
    { name: "Neha Joshi", status: "Successful", date: "2 days ago", amount: 250 },
  ];

  const bonusRewards = [
    { milestone: "5 Referrals", reward: "₹500 Bonus", icon: "💰", achieved: true },
    { milestone: "10 Referrals", reward: "Smart Watch", icon: "⌚", achieved: true },
    { milestone: "20 Referrals", reward: "AirPods Pro", icon: "🎧", achieved: true },
    { milestone: "30 Referrals", reward: "Premium Laptop", icon: "💻", achieved: true },
    { milestone: "40 Referrals", reward: "iPhone 15", icon: "📱", achieved: false },
    { milestone: "50+ Referrals", reward: "Cruiser Bike", icon: "🏍️", achieved: false },
  ];

  const quickLinks = [
    { label: "My Referrals", icon: <EyeIcon size={20} />, to: "/dashboard/referrals" },
    { label: "Refer Friends", icon: <HeartIcon size={20} />, to: "/refer-earn" },
    { label: "Rewards Zone", icon: <RupeeIcon size={20} />, to: "/rewards" },
    { label: "How It Works", icon: <CartIcon size={20} />, to: "/refer-earn#how-it-works" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f0ede8] -m-4 lg:-m-8 p-3 sm:p-5 font-sans">
      <div className="space-y-4">
        {/* Header with Illustration */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#1f9d55] to-[#178a48] rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
              <polyline points="9 22 9 12 15 12 15 22" />
              <path d="M3 7v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
              <path d="M3 7l9-5 9 5" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-gray-900 mb-1">Progress Tracker</h2>
            <p className="text-sm text-gray-600">Track your referral journey and unlock exclusive rewards</p>
          </div>
        </div>

        {/* Elite Membership Progress */}
        <div className="bg-gradient-to-br from-[#f5f3e8] to-[#ebe7db] rounded-xl p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Elite Membership Progress</h3>
              <p className="text-xs text-gray-600 mt-1">
                {totalReferrals} of {targetForNextTier} successful referrals
              </p>
            </div>
            <div className="text-3xl font-black text-[#1f9d55]">{Math.round(progressPercentage)}%</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#1f9d55] to-[#178a48] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Tier Progress Tracker */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Tier Progress Tracker</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-lg p-4 border-2 transition-all ${
                  tier.completed 
                    ? 'border-[#1f9d55] bg-[#1f9d55]/5' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                {tier.completed && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#1f9d55] rounded-full flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
                <div className={`w-10 h-10 ${tier.color} rounded-lg mb-2 ${tier.completed ? 'opacity-100' : 'opacity-40'}`} />
                <div className="text-sm font-bold text-gray-900">{tier.name}</div>
                <div className="text-xs text-gray-600 mt-1">{tier.target} referrals</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referral Overview Stats & Wallet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Total Referrals */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs text-gray-500 font-medium">Total Referrals</p>
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 mb-1">{totalReferrals}</p>
          <div className="flex gap-3 text-xs mt-2">
            <span className="text-green-600 font-semibold">✓ {successfulReferrals} Successful</span>
            <span className="text-orange-600 font-semibold">⏳ {pendingReferrals} Pending</span>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs text-gray-500 font-medium">Total Earnings</p>
            <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
              <RupeeIcon size={18} color="#1f9d55" />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 mb-1">₹{totalEarnings.toLocaleString()}</p>
          <p className="text-xs text-gray-600 mt-2">From {successfulReferrals} successful referrals</p>
        </div>

        {/* My Rewards Wallet */}
        <div className="bg-gradient-to-br from-[#1f9d55] to-[#178a48] rounded-xl p-5 shadow-sm text-white">
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs text-white/80 font-medium">My Rewards Wallet</p>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-black mb-3">₹{totalEarnings.toLocaleString()}</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-white text-[#1f9d55] text-xs font-bold py-2 rounded hover:bg-gray-100 transition-colors">
              Withdraw
            </button>
            <button className="flex-1 bg-white/20 text-white text-xs font-bold py-2 rounded hover:bg-white/30 transition-colors">
              History
            </button>
          </div>
        </div>
      </div>

      {/* Top Referrers & Recent Referrals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Referrers */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">Top Referrers</h3>
            <span className="text-xs text-gray-500">This Month</span>
          </div>
          <div className="space-y-3">
            {topReferrers.map((referrer, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-[#F5F0E8] rounded-xl hover:bg-[#ebe7db] transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1f9d55] to-[#178a48] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {referrer.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{referrer.name}</p>
                  <p className="text-xs text-gray-600">{referrer.referrals} referrals</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFD700" stroke="#DAA520" strokeWidth="1">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="text-xs font-bold text-gray-700">#{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">Recent Referrals</h3>
            <Link to="/dashboard/referrals" className="text-xs text-[#1f9d55] font-semibold hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentReferrals.map((referral, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-[#F5F0E8] rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-gray-600">
                    {referral.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{referral.name}</p>
                  <p className="text-xs text-gray-600">{referral.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                    referral.status === 'Successful' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {referral.status}
                  </span>
                  {referral.amount > 0 && (
                    <p className="text-xs font-bold text-[#1f9d55] mt-1">+₹{referral.amount}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bonus Rewards */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#DAA520] rounded-lg flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
              <path d="M2 7h20v5H2z" />
              <path d="M12 22V7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Bonus Rewards</h3>
            <p className="text-xs text-gray-600">Unlock amazing prizes at each milestone</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {bonusRewards.map((reward, idx) => (
            <div
              key={idx}
              className={`relative rounded-lg border-2 p-4 text-center transition-all ${
                reward.achieved
                  ? 'border-[#1f9d55] bg-[#1f9d55]/5'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {reward.achieved && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#1f9d55] rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
              <div className="text-3xl mb-2">{reward.icon}</div>
              <div className="text-xs font-bold text-gray-600 mb-1">{reward.milestone}</div>
              <div className="text-xs font-black text-gray-900">{reward.reward}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50">
        <h3 className="text-base font-bold text-gray-900 mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="flex flex-col items-center justify-center gap-3 py-5 px-4 bg-[#F5F0E8] rounded-xl hover:bg-[#ebe7db] transition-all group"
            >
              <div className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                {link.icon}
              </div>
              <span className="text-xs font-bold text-gray-800 text-center">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-[#1f9d55] to-[#178a48] rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="flex-1 text-white">
            <h3 className="text-2xl font-black mb-2">Start Referring Today!</h3>
            <p className="text-sm text-white/90 mb-4">
              Share your unique referral link and start earning amazing rewards. The more you refer, the more you earn!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 bg-transparent text-white text-sm font-mono outline-none"
                />
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 bg-white text-[#1f9d55] px-4 py-2 rounded font-bold text-xs hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
              <Link
                to="/refer-earn"
                className="bg-white text-[#1f9d55] px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Learn More
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
                <path d="M2 7h20v5H2z" />
                <path d="M12 22V7" />
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
