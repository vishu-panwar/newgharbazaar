import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ShieldCheck, ArrowLeft, Loader2, CheckCircle2, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .gb-otp-root {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 24px; background: #ede9e0; font-family: 'DM Sans', sans-serif;
  }

  .gb-otp-back {
    position: fixed; top: 20px; left: 20px;
    display: flex; align-items: center; gap: 6px;
    background: #1e5437; color: #fff; border: none; border-radius: 10px;
    padding: 8px 14px; font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 500; cursor: pointer;
    transition: all 0.2s;
  }
  .gb-otp-back:hover { background: #174530; transform: translateX(-2px); }

  .gb-otp-card {
    background: #fff; border-radius: 24px; border: 1.5px solid #ddd8cf;
    padding: 44px 40px; width: 100%; max-width: 460px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.06);
  }

  .gb-otp-icon-wrap {
    width: 64px; height: 64px; margin: 0 auto 24px;
    background: linear-gradient(135deg, #e8f5ee 0%, #d1ead9 100%);
    border-radius: 18px; display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(30,84,55,0.15);
  }

  .gb-otp-digit {
    width: 100%; aspect-ratio: 1;
    text-align: center; font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 700; color: #1a1a1a;
    background: #faf8f4; border: 1.5px solid #d6cfc3;
    border-radius: 12px; outline: none; transition: all 0.2s;
    caret-color: #1e5437;
  }
  .gb-otp-digit:focus { border-color: #1e5437; background: #fff; box-shadow: 0 0 0 3px rgba(30,84,55,0.1); }
  .gb-otp-digit.filled { border-color: #1e5437; background: #f0f9f4; }

  .gb-btn-verify {
    width: 100%; padding: 14px; background: #1e5437; color: #fff;
    border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    margin-top: 4px;
  }
  .gb-btn-verify:hover:not(:disabled) { background: #174530; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,84,55,0.22); }
  .gb-btn-verify:disabled { background: #d6cfc3; color: #a09489; cursor: not-allowed; transform: none; }

  .gb-timer-bar-track { height: 4px; background: #ede9e0; border-radius: 999px; margin: 12px 0 0; overflow: hidden; }
  .gb-timer-bar { height: 100%; border-radius: 999px; transition: width 1s linear, background 1s; }

  @keyframes gb-spin { to { transform: rotate(360deg); } }
  .gb-spin { animation: gb-spin 1s linear infinite; }
`;

export default function OtpVerify() {
  const location = useLocation();
  const navigate  = useNavigate();
  const email     = location.state?.email || "your email";
  const TOTAL     = 300; // 5 min

  const [otp, setOtp]         = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTime]   = useState(TOTAL);
  const [status, setStatus]   = useState({ type: "", message: "" });
  const refs = useRef([]);

  useEffect(() => { refs.current[0]?.focus(); }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTime((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  const pct  = (timeLeft / TOTAL) * 100;
  const barColor = timeLeft < 60 ? "#dc2626" : timeLeft < 120 ? "#f59e0b" : "#1e5437";

  const handleChange = (el, i) => {
    if (isNaN(el.value)) return;
    const next = [...otp]; next[i] = el.value; setOtp(next);
    if (el.value && i < 5) refs.current[i+1]?.focus();
  };

  const handleKey = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i-1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g,"").slice(0,6).split("");
    const next = [...otp];
    paste.forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    refs.current[Math.min(paste.length, 5)]?.focus();
  };

  const verify = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) return;
    if (timeLeft <= 0) { setStatus({ type:"error", message:"OTP expired. Request a new one." }); return; }
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/verifyotp`, { email, otp: code });
      setStatus({ type:"success", message: res.data.message || "Verified successfully!" });
      if (res.data.success) setTimeout(() => navigate("/login", { replace:true }), 1500);
    } catch (err) {
      setStatus({ type:"error", message: err.response?.data?.message || "Invalid code" });
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="gb-otp-root">

        <button className="gb-otp-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={14}/> Back
        </button>

        <motion.div className="gb-otp-card"
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}>

          {/* Icon */}
          <div className="gb-otp-icon-wrap">
            <ShieldCheck size={28} color="#1e5437" />
          </div>

          {/* Heading */}
          <div style={{ textAlign:"center", marginBottom:24 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:"#1a1a1a", marginBottom:6 }}>
              Verify Identity
            </h2>
            <p style={{ fontSize:14, color:"#8a7e72", lineHeight:1.55 }}>
              We've sent a 6-digit code to{" "}
              <span style={{ color:"#1e5437", fontWeight:600 }}>{email}</span>
            </p>

            {/* Timer */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:10 }}>
              <Clock size={13} color={barColor} />
              <span style={{ fontSize:13, fontWeight:600, color: barColor, fontFamily:"'DM Sans',sans-serif" }}>
                {timeLeft > 0 ? `Expires in ${fmt(timeLeft)}` : "OTP Expired"}
              </span>
            </div>
            <div className="gb-timer-bar-track">
              <div className="gb-timer-bar" style={{ width:`${pct}%`, background: barColor }} />
            </div>
          </div>

          <form onSubmit={verify} style={{ display:"flex", flexDirection:"column", gap:20 }}>

            {/* OTP Inputs */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10 }}>
              {otp.map((val, i) => (
                <input
                  key={i} type="text" maxLength={1}
                  ref={(el) => (refs.current[i] = el)}
                  value={val}
                  onChange={(e) => handleChange(e.target, i)}
                  onKeyDown={(e) => handleKey(e, i)}
                  onPaste={i === 0 ? handlePaste : undefined}
                  className={`gb-otp-digit${val ? " filled" : ""}`}
                />
              ))}
            </div>

            {/* Status */}
            <AnimatePresence mode="wait">
              {status.message && (
                <motion.div
                  initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  style={{
                    display:"flex", alignItems:"center", gap:8, padding:"12px 14px",
                    borderRadius:12, fontSize:13, fontWeight:500,
                    background: status.type==="success" ? "#f0f9f4" : "#fef2f2",
                    color:       status.type==="success" ? "#1e5437"  : "#c0392b",
                    border:      `1px solid ${status.type==="success" ? "#c6e8d2" : "#fecaca"}`,
                  }}>
                  {status.type==="success" && <CheckCircle2 size={15}/>}
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading || otp.includes("") || timeLeft <= 0}
              className="gb-btn-verify">
              {loading
                ? <Loader2 size={17} className="gb-spin"/>
                : "Verify OTP"
              }
            </button>

          </form>

          <p style={{ textAlign:"center", fontSize:13, color:"#8a7e72", marginTop:20 }}>
            Didn't receive the code?{" "}
            <button
              onClick={() => { setTime(TOTAL); setOtp(new Array(6).fill("")); setStatus({ type:"", message:"" }); }}
              style={{ background:"none", border:"none", color:"#1e5437", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:13, padding:0 }}>
              Resend OTP
            </button>
          </p>
        </motion.div>
      </div>
    </>
  );
}