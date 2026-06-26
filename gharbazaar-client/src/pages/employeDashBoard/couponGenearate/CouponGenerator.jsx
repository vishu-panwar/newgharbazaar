import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Ticket,
  Loader2,
  Copy,
  Check,
  Gift,
  RefreshCw,
} from "lucide-react";

const CouponGenerator = () => {
  const API = import.meta.env.VITE_BASE_URL;

  const [name, setName] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCoupons, setFetchingCoupons] =
    useState(false);
  const [copiedCode, setCopiedCode] = useState("");

  // CREATE COUPON
  const generateCoupon = async () => {
    if (!name.trim()) return alert("Enter a name");

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API}/createCoupon`,
        { name },
        {withCredentials:true}
      );

      setCoupon(data.coupon);
      setName("");

      getCoupons();
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
          "Failed to generate coupon"
      );
    } finally {
      setLoading(false);
    }
  };

  // GET COUPONS
  const getCoupons = async () => {
    try {
      setFetchingCoupons(true);

      const { data } = await axios.get(
        `${API}/getCoupon`,{
            withCredentials:true
        }
      );

      setCoupons(data.coupons || []);
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingCoupons(false);
    }
  };

  // COPY
  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);

    setTimeout(() => {
      setCopiedCode("");
    }, 2000);
  };

  useEffect(() => {
    getCoupons();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="bg-white rounded-3xl  p-8 mb-8 border border-green-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-100 p-4 rounded-2xl">
              <Gift
                size={32}
                className="text-green-600"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Coupon Generator
              </h1>
              <p className="text-gray-500">
                Create and manage referral coupons
              </p>
            </div>
          </div>

          {/* INPUT */}
          <div className="grid md:grid-cols-[1fr_auto] gap-4">
            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter name..."
              className="w-full px-5 py-4 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-500 outline-none"
            />

            <button
              onClick={generateCoupon}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-semibold"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Generating...
                </>
              ) : (
                <>
                  <Ticket size={18} />
                  Generate
                </>
              )}
            </button>
          </div>

          {/* GENERATED */}
          {coupon && (
            <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-2xl">
              <p className="text-green-100">
                Coupon Created
              </p>

              <h2 className="text-4xl font-bold tracking-widest mt-2">
                {coupon.code}
              </h2>

              <p className="mt-2">
                For: {coupon.name}
              </p>

              <button
                onClick={() =>
                  copyCoupon(coupon.code)
                }
                className="mt-4 bg-white text-green-700 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                {copiedCode === coupon.code ? (
                  <>
                    <Check size={18} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* LIST */}
        <div className="bg-white rounded-3xl  p-8 border border-green-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              All Coupons
            </h2>

            <div className="flex items-center gap-3">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                {coupons.length} Coupons
              </span>

              <button
                onClick={getCoupons}
                className="p-2 bg-green-100 hover:bg-green-200 rounded-lg"
              >
                <RefreshCw size={18} />
              </button>
            </div>
          </div>

          {fetchingCoupons ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-green-600" />
            </div>
          ) : coupons.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No coupons found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left">
                      Code
                    </th>
                    <th className="p-4 text-left">
                      Name
                    </th>
                    <th className="p-4 text-left">
                      Used By
                    </th>
                    <th className="p-4 text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {coupons.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-green-50"
                    >
                      {/* CODE */}
                      <td className="p-4">
                        <span className="font-mono font-bold text-green-700 bg-green-50 px-3 py-1 rounded-lg">
                          {item.code}
                        </span>
                      </td>

                      {/* NAME */}
                      <td className="p-4">
                        {item.name}
                      </td>

                      {/* USED BY */}
                      <td className="p-4">
                        {item.usedBy?.length > 0 ? (
                          <div className="space-y-2">
                            {item.usedBy.map(
                              (user) => (
                                <div
                                  key={
                                    user._id
                                  }
                                  className="bg-green-50 p-2 rounded-lg"
                                >
                                  <p className="text-sm font-medium">
                                    {
                                      user.fullName
                                    }
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {
                                      user.email
                                    }
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">
                            Not used
                          </span>
                        )}
                      </td>

                      {/* ACTION */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() =>
                            copyCoupon(
                              item.code
                            )
                          }
                          className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg flex items-center gap-2 mx-auto"
                        >
                          {copiedCode ===
                          item.code ? (
                            <>
                              <Check size={16} />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={16} />
                              Copy
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl border border-green-100 ">
            <p className="text-gray-500">
              Total Coupons
            </p>
            <h3 className="text-3xl font-bold text-green-600">
              {coupons.length}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-green-100 ">
            <p className="text-gray-500">
              Used Coupons
            </p>
            <h3 className="text-3xl font-bold text-green-600">
              {
                coupons.filter(
                  (c) =>
                    c.usedBy?.length > 0
                ).length
              }
            </h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-green-100 ">
            <p className="text-gray-500">
              Total Users
            </p>
            <h3 className="text-3xl font-bold text-green-600">
              {coupons.reduce(
                (acc, c) =>
                  acc +
                  (c.usedBy?.length || 0),
                0
              )}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponGenerator;