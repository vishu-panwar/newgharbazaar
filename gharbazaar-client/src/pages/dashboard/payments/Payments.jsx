import React, { useState } from "react";
import { CreditCard, Calendar, Download, ArrowRight } from "lucide-react";

export default function Payments() {
  const [autoPayMonthlyRent, setAutoPayMonthlyRent] = useState(true);
  const [autoPayRecurringServices, setAutoPayRecurringServices] = useState(false);

  const upcomingPayments = [
    {
      id: 1,
      title: "Monthly Rent",
      dueDate: "Due on June 1, 2024",
      amount: 5000,
      icon: "🏠",
    },
    {
      id: 2,
      title: "Full Service Plan",
      dueDate: "Due on June 18, 2024",
      amount: 5750,
      icon: "⚙️",
    },
  ];

  const activePlan = {
    name: "Full Service Plan",
    price: "₹1,999",
    period: "/month",
    nextBilling: "10/8/2024",
    status: "Active",
  };

  const transactionHistory = [
    {
      id: 1,
      type: "Monthly Rent",
      date: "May 1, 2024",
      amount: 5000,
      status: "Completed",
      method: "UPI",
    },
    {
      id: 2,
      type: "Full Service Plan",
      date: "Apr 18, 2024",
      amount: 5750,
      status: "Completed",
      method: "Card",
    },
    {
      id: 3,
      type: "Monthly Rent",
      date: "Apr 1, 2024",
      amount: 5000,
      status: "Completed",
      method: "UPI",
    },
    {
      id: 4,
      type: "Property Listing Fee",
      date: "Mar 25, 2024",
      amount: 299,
      status: "Completed",
      method: "Net Banking",
    },
    {
      id: 5,
      type: "Full Service Plan",
      date: "Mar 18, 2024",
      amount: 5750,
      status: "Completed",
      method: "Card",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f0ede8] -m-4 lg:-m-8 p-3 sm:p-5 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">
          Payment & Billing
        </h1>
        <p className="text-sm text-gray-600">
          Manage your subscriptions, AutoPay settings and view transaction history
        </p>
      </div>

      {/* Upcoming Payments */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-50 mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Payments</h2>
        <div className="space-y-3">
          {upcomingPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 bg-[#f9f7f4] rounded-xl hover:bg-[#f5f3e8] transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-2xl flex-shrink-0">
                  {payment.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-900">{payment.title}</h3>
                  <p className="text-xs text-gray-600 mt-0.5">{payment.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-lg font-black text-gray-900">
                  ₹{payment.amount.toLocaleString()}
                </span>
                <button className="bg-[#1f9d55] hover:bg-[#178a48] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                  Pay Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Plans & AutoPay Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Your Active Plans */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-50">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Your Active Plans</h2>
          
          <div className="bg-[#f9f7f4] rounded-xl p-5 mb-4">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                <Calendar size={24} className="text-[#1f9d55]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 mb-1">{activePlan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-gray-900">{activePlan.price}</span>
                  <span className="text-xs text-gray-600">{activePlan.period}</span>
                </div>
              </div>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                {activePlan.status}
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Next Billing</p>
                <p className="text-sm font-bold text-gray-900">{activePlan.nextBilling}</p>
              </div>
              <button className="bg-[#1f9d55] hover:bg-[#178a48] text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors">
                Manage Subscription
              </button>
            </div>
          </div>
        </div>

        {/* AutoPay Settings */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-50">
          <h2 className="text-lg font-bold text-gray-900 mb-2">AutoPay Settings</h2>
          <p className="text-xs text-gray-600 mb-4">
            Never miss a payment. Set up automatic deductions for rent and recurring services.
          </p>

          <div className="space-y-4">
            {/* Monthly Rent AutoPay */}
            <div className="flex items-start gap-3 p-4 bg-[#f9f7f4] rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                <CreditCard size={20} className="text-[#1f9d55]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">Monthly Rent</h3>
                <p className="text-xs text-gray-600">Auto-pay rent on the 1st of every month</p>
              </div>
              <button
                onClick={() => setAutoPayMonthlyRent(!autoPayMonthlyRent)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                  autoPayMonthlyRent ? "bg-[#1f9d55]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoPayMonthlyRent ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Recurring Services AutoPay */}
            <div className="flex items-start gap-3 p-4 bg-[#f9f7f4] rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1f9d55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">Recurring Services</h3>
                <p className="text-xs text-gray-600">Auto-pay for scheduled maintenance</p>
              </div>
              <button
                onClick={() => setAutoPayRecurringServices(!autoPayRecurringServices)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                  autoPayRecurringServices ? "bg-[#1f9d55]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    autoPayRecurringServices ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Transaction History</h2>
          <button className="flex items-center gap-2 text-xs font-semibold text-[#1f9d55] hover:text-[#178a48] transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                  Transaction
                </th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                  Date
                </th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                  Amount
                </th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                  Method
                </th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                  Status
                </th>
                <th className="text-right text-xs font-bold text-gray-500 uppercase tracking-wider pb-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`${
                    index !== transactionHistory.length - 1 ? "border-b border-gray-100" : ""
                  } hover:bg-[#f9f7f4] transition-colors`}
                >
                  <td className="py-4 text-sm font-semibold text-gray-900">
                    {transaction.type}
                  </td>
                  <td className="py-4 text-sm text-gray-600">{transaction.date}</td>
                  <td className="py-4 text-sm font-bold text-gray-900">
                    ₹{transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-4 text-sm text-gray-600">{transaction.method}</td>
                  <td className="py-4">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-[#1f9d55] hover:text-[#178a48] text-xs font-semibold transition-colors flex items-center gap-1 ml-auto">
                      Invoice
                      <ArrowRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {transactionHistory.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 bg-[#f9f7f4] rounded-xl"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    {transaction.type}
                  </h3>
                  <p className="text-xs text-gray-600">{transaction.date}</p>
                </div>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  {transaction.status}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Amount</p>
                  <p className="text-sm font-black text-gray-900">
                    ₹{transaction.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Method</p>
                  <p className="text-sm font-semibold text-gray-700">
                    {transaction.method}
                  </p>
                </div>
                <button className="text-[#1f9d55] hover:text-[#178a48] text-xs font-semibold transition-colors flex items-center gap-1">
                  Invoice
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
