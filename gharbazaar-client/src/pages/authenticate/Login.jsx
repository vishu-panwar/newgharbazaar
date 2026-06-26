import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
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

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const [showPw, setShowPw] = useState(false);

  const [errors, setErrors] = useState({});

  // =========================
  // INPUT CHANGE
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

    if (!formData.email) {
      e.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      e.email = "Invalid email";
    }

    if (!formData.password) {
      e.password = "Password is required";
    }

    setErrors(e);

    return !Object.keys(e).length;

  };

  // =========================
  // LOGIN SUCCESS
  // =========================

  const onSuccess = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    if(user?.role == 'client'){
      navigate('/dashboard')
    }else if(user?.role == 'employee' ){
      navigate('/employee')
    } else if (user?.role == "admin"){
            navigate("/admin");
          }else{
            navigate("/NotFound")
          }
  };

  // =========================
  // LOGIN SUBMIT
  // =========================

  const submit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        formData,
        {
          withCredentials: true
        }
      );

      onSuccess(res.data.user, res.data.token);

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Invalid credentials"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#ede9e0] flex items-center justify-center p-5 font-sans">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-[860px] min-h-[560px] bg-white rounded-[22px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.10)] border border-[#ddd8cf] flex flex-col md:flex-row"
      >

        {/* LEFT PANEL */}

        <div className="w-full md:w-[42%] bg-gradient-to-br from-[#1e5437] to-[#0f2e1e] text-white p-7 md:p-9 flex flex-col justify-between gap-7">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">

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

              <h2 className="text-[15px] font-bold">
                GharBazaar.in
              </h2>

              <p className="text-[11px] text-white/50 mt-0.5">
                India's Leading Property Platform
              </p>

            </div>

          </div>

          {/* HEADING */}

          <div>

            <h1 className="text-4xl font-bold leading-tight mb-3">
              Welcome <br />
              Back!
            </h1>

            <p className="text-sm text-white/65 leading-7">
              Sign in and experience transparent property
              deals without brokers or hidden fees.
            </p>

          </div>

          {/* FEATURES */}

          <div className="hidden md:flex flex-col gap-3">

            {features.map((feature, i) => (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.09 }}
                className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl p-3"
              >

                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">

                  <feature.icon
                    size={15}
                    className="text-white/90"
                  />

                </div>

                <div>

                  <h3 className="text-sm font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-[11px] text-white/50 mt-0.5">
                    {feature.subtitle}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

          {/* FOOTER */}

          <div className="border-t border-white/10 pt-5">

            <p className="text-xs italic leading-6 text-white/45">
              "The best property platform in India —
              transparent, fast, and reliable."
            </p>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="flex-1 bg-white flex items-center justify-center p-6 md:p-10">

          <div className="w-full max-w-[360px]">

            {/* HEADER */}

            <div className="mb-7">

              <h2 className="text-3xl font-bold text-gray-900 mb-1">
                Welcome!
              </h2>

              <p className="text-sm text-[#8a7e72]">
                Sign in to continue.
              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={submit}
              className="flex flex-col gap-4"
            >

              {/* EMAIL */}

              <Field
                label="Email Address"
                error={errors.email}
                required
              >

                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a09489]">

                  <Mail size={16} />

                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handle}
                  className={`w-full bg-[#faf8f4] border rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all ${
                    errors.email
                      ? "border-red-500"
                      : "border-[#d6cfc3] focus:border-[#1e5437] focus:ring-4 focus:ring-[#1e5437]/10"
                  }`}
                />

              </Field>

              {/* PASSWORD */}

              <Field
                label="Password"
                error={errors.password}
                required
              >

                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a09489]">

                  <Lock size={16} />

                </div>

                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handle}
                  className={`w-full bg-[#faf8f4] border rounded-xl pl-10 pr-11 py-3 text-sm outline-none transition-all ${
                    errors.password
                      ? "border-red-500"
                      : "border-[#d6cfc3] focus:border-[#1e5437] focus:ring-4 focus:ring-[#1e5437]/10"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a09489]"
                >

                  {showPw ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}

                </button>

              </Field>

              {/* FORGOT PASSWORD */}

              <div className="text-right -mt-1">

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#1e5437]"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1e5437] hover:bg-[#174530] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-[1px] hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0"
              >

                {loading ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <>
                    Log in
                    <ArrowRight size={16} />
                  </>
                )}

              </button>

              {/* DIVIDER */}

              <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-[#a09489]">

                <div className="flex-1 h-px bg-[#ddd8cf]" />

                or continue with

                <div className="flex-1 h-px bg-[#ddd8cf]" />

              </div>

              {/* GOOGLE */}

              <div className="flex justify-center">

                <button
                  type="button"
                  onClick={() => {
                    // Set demo user and redirect to dashboard
                    const demoUser = {
                      _id: "user123",
                      id: "user123",
                      fullName: "Demo User",
                      name: "Demo User",
                      email: "demo@gharbazaar.com",
                      role: "client",
                      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
                      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                    };
                    localStorage.setItem('user', JSON.stringify(demoUser));
                    navigate('/dashboard');
                  }}
                  className="flex items-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-full text-sm font-medium text-gray-700 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                    <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                  </svg>
                  Continue with Google
                </button>

              </div>

              {/* REGISTER */}

              <p className="text-center text-sm text-[#8a7e72]">

                New to GharBazaar?{" "}

                <Link
                  to="/register"
                  className="text-[#1e5437] font-semibold"
                >
                  Create Account
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

    <div className="flex flex-col gap-1.5">

      <label className="text-[13px] font-semibold text-[#4a4035]">

        {label}

        {required && (
          <span className="text-red-500"> *</span>
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