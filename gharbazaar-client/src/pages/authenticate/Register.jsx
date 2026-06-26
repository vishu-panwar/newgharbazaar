import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  ArrowRight,
  Loader2,
  Shield,
  Users,
  Tag
} from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    subtitle: "Your data is protected"
  },
  {
    icon: Users,
    title: "Join 10,000+ Users",
    subtitle: "Trusted community"
  },
  {
    icon: Tag,
    title: "Transparent Pricing",
    subtitle: "No hidden charges"
  }
];

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);

  const [errors, setErrors] = useState({});

  // =========================
  // HANDLE INPUT
  // =========================

  const handle = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {

      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));

    }

  };

  // =========================
  // VALIDATION
  // =========================

  const validate = () => {

    const e = {};

    if (!formData.name) {
      e.name = "Full name is required";
    }

    if (!formData.email) {
      e.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      e.email = "Invalid email";
    }

    if (!formData.phone) {
      e.phone = "Phone is required";
    }

    if (!formData.password) {
      e.password = "Password is required";
    } else if (formData.password.length < 6) {
      e.password = "Minimum 6 characters required";
    }

    if (formData.password !== formData.confirmPassword) {
      e.confirmPassword = "Passwords don't match";
    }

    setErrors(e);

    return !Object.keys(e).length;

  };

  // =========================
  // SUCCESS LOGIN
  // =========================

  const onSuccess = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    if (token) localStorage.setItem("token", token);
    navigate("/dashboard", {
      replace: true
    });
  };

  // =========================
  // REGISTER SUBMIT
  // =========================

  const submit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/register`,
        {
          fullName: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          password: formData.password
        }
      );

      if (res.data.success) {

        navigate("/otpverify", {
          state: {
            email: formData.email
          }
        });

      }

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Server error"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#ede9e0] flex items-center justify-center p-4 font-sans">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-6xl overflow-hidden rounded-3xl border border-[#ddd8cf] shadow-[0_20px_60px_rgba(0,0,0,0.10)] bg-white flex flex-col lg:flex-row"
      >

        {/* LEFT SIDE */}

        <div className="lg:w-[38%] bg-gradient-to-br from-[#1e5437] to-[#0f2e1e] text-white p-8 flex flex-col justify-between gap-8">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">

              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M3 10.5L12 3L21 10.5V20a1 1 0 01-1 1h-5v-5H9v5H4a1 1 0 01-1-1V10.5z" />
              </svg>

            </div>

            <div>

              <h2 className="font-bold text-[15px]">
                GharBazaar.in
              </h2>

              <p className="text-[11px] text-white/50">
                India's Leading Property Platform
              </p>

            </div>

          </div>

          {/* HEADING */}

          <div>

            <h1 className="text-4xl font-bold leading-tight mb-4">
              Step into your
              <br />
              dream home.
            </h1>

            <p className="text-sm leading-7 text-white/70">
              Create your account and experience transparent
              property deals without brokers or hidden fees.
            </p>

          </div>

          {/* FEATURES */}

          <div className="hidden md:flex flex-col gap-3">

            {features.map((feature, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.09 }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-3"
              >

                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">

                  <feature.icon
                    size={15}
                    className="text-white/80"
                  />

                </div>

                <div>

                  <h3 className="text-sm font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-white/50">
                    {feature.subtitle}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

          {/* FOOTER */}

          <div className="hidden md:block border-t border-white/10 pt-4">

            <p className="text-xs italic leading-6 text-white/40">
              "Finding a house was never this easy —
              verified listings, zero brokerage."
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">

          <div className="w-full max-w-md">

            <div className="mb-6">

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome!
              </h2>

              <p className="text-sm text-gray-500">
                Create your account to get started.
              </p>

            </div>

            <form
              onSubmit={submit}
              className="space-y-4"
            >

              {/* FULL NAME */}

              <Field
                label="Full Name"
                error={errors.name}
                required
              >

                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">

                  <User size={16} />

                </div>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handle}
                  className={`w-full rounded-xl border bg-[#faf8f4] py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#1e5437] focus:bg-white focus:ring-4 focus:ring-[#1e5437]/10 ${
                    errors.name
                      ? "border-red-500"
                      : "border-[#d6cfc3]"
                  }`}
                />

              </Field>

              {/* EMAIL */}

              <Field
                label="Email Address"
                error={errors.email}
                required
              >

                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">

                  <Mail size={16} />

                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handle}
                  className={`w-full rounded-xl border bg-[#faf8f4] py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#1e5437] focus:bg-white focus:ring-4 focus:ring-[#1e5437]/10 ${
                    errors.email
                      ? "border-red-500"
                      : "border-[#d6cfc3]"
                  }`}
                />

              </Field>

              {/* PHONE */}

              <Field
                label="Phone Number"
                error={errors.phone}
                required
              >

                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">

                  <Phone size={16} />

                </div>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter 10 digit phone number"
                  value={formData.phone}
                  onChange={handle}
                  className={`w-full rounded-xl border bg-[#faf8f4] py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#1e5437] focus:bg-white focus:ring-4 focus:ring-[#1e5437]/10 ${
                    errors.phone
                      ? "border-red-500"
                      : "border-[#d6cfc3]"
                  }`}
                />

              </Field>

              {/* PASSWORDS */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <Field
                  label="Password"
                  error={errors.password}
                  required
                >

                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">

                    <Lock size={16} />

                  </div>

                  <input
                    type={showPw ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handle}
                    className={`w-full rounded-xl border bg-[#faf8f4] py-3 pl-10 pr-10 text-sm outline-none transition-all focus:border-[#1e5437] focus:bg-white focus:ring-4 focus:ring-[#1e5437]/10 ${
                      errors.password
                        ? "border-red-500"
                        : "border-[#d6cfc3]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >

                    {showPw ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}

                  </button>

                </Field>

                <Field
                  label="Confirm Password"
                  error={errors.confirmPassword}
                  required
                >

                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">

                    <Lock size={16} />

                  </div>

                  <input
                    type={showCpw ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm"
                    value={formData.confirmPassword}
                    onChange={handle}
                    className={`w-full rounded-xl border bg-[#faf8f4] py-3 pl-10 pr-10 text-sm outline-none transition-all focus:border-[#1e5437] focus:bg-white focus:ring-4 focus:ring-[#1e5437]/10 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-[#d6cfc3]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowCpw(!showCpw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >

                    {showCpw ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}

                  </button>

                </Field>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#1e5437] py-3 text-sm font-semibold text-white transition-all hover:bg-[#174530] hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >

                {loading ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <>
                    Get OTP
                    <ArrowRight size={16} />
                  </>
                )}

              </button>

              {/* DIVIDER */}

              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-gray-400">

                <div className="h-px flex-1 bg-gray-200"></div>

                or continue with

                <div className="h-px flex-1 bg-gray-200"></div>

              </div>

              {/* GOOGLE LOGIN */}

              <div className="flex justify-center">

                <GoogleLogin
                  onSuccess={async (cr) => {

                    try {

                      const res = await axios.post(
                        `${import.meta.env.VITE_BASE_URL}/google`,
                        {
                          credential: cr.credential
                        },
                        {
                          withCredentials: true
                        }
                      );

                      onSuccess(res.data.user, res.data.token);

                    } catch (err) {

                      console.error(err);

                    }

                  }}
                  onError={() =>
                    console.error("Google signup failed")
                  }
                  theme="outline"
                  shape="pill"
                  text="continue_with"
                  width="320"
                />

              </div>

              {/* LOGIN */}

              <p className="text-center text-sm text-gray-500">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="font-semibold text-[#1e5437]"
                >
                  Login here
                </Link>

              </p>

            </form>

          </div>

        </div>

      </motion.div>

    </div>

  );

}

function Field({
  label,
  children,
  error,
  required
}) {

  return (

    <div className="flex flex-col gap-1">

      <label className="text-[13px] font-semibold text-[#4a4035]">

        {label}

        {required && (
          <span className="text-red-500">
            {" "}*
          </span>
        )}

      </label>

      <div className="relative">
        {children}
      </div>

      <AnimatePresence mode="wait">

        {error && (

          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[11px] text-red-500"
          >
            {error}
          </motion.p>

        )}

      </AnimatePresence>

    </div>

  );

}