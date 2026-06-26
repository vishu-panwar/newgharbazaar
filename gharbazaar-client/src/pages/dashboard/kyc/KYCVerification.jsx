import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, CheckCircle, User, Phone, MapPin, FileText, X, Shield, Clock, BadgeCheck, AlertCircle } from "lucide-react";
import axios from "axios";

// ⚠️ Update logo path if needed
import logo from "../../../../public/logo.jpeg";

const BASE = import.meta.env.VITE_BASE_URL;

// ================================
// CONSTANTS
// ================================

const STEPS = [
  { number: 1, label: "Personal Details" },
  { number: 2, label: "Aadhaar Upload" },
  { number: 3, label: "Review & Submit" },
];

// ================================
// SHARED SUB-COMPONENTS
// ================================

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                current > step.number
                  ? "bg-[#034A1F] text-white"
                  : current === step.number
                  ? "bg-[#034A1F] text-white ring-4 ring-[#034A1F]/20"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {current > step.number ? <CheckCircle size={18} /> : step.number}
            </div>
            <span
              className={`text-[11px] mt-1 font-medium whitespace-nowrap ${
                current === step.number ? "text-[#034A1F]" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`w-16 h-0.5 mb-5 mx-1 transition-all ${
                current > step.number ? "bg-[#034A1F]" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function FormField({ label, required, children }) {
  return (
    <div className="mb-4">
      <label className="text-[14px] font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function SecurityBadge() {
  return (
    <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 text-xs">
      <Shield size={13} />
      Your data is encrypted and secure
    </div>
  );
}

function NavButtons({ onBack, onNext, nextLabel = "Next Step →", disabled = false, loading = false }) {
  return (
    <div className="flex gap-3 mt-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="w-1/3 border border-gray-300 text-gray-600 py-4 rounded-full text-[15px] font-medium hover:bg-gray-50 transition"
        >
          ← Back
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={disabled || loading}
        className="flex-1 bg-[#034A1F] text-white py-4 rounded-full text-[15px] font-medium hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : nextLabel}
      </button>
    </div>
  );
}

// ================================
// STATUS SCREENS
// ================================

function PendingScreen() {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center">
        <Clock size={40} className="text-yellow-500" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mt-6">KYC Under Review</h2>
      <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-xs">
        Your documents have been submitted and are currently under review. This usually takes up to 24 hours.
      </p>
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-2xl px-5 py-3 w-full">
        <p className="text-yellow-700 text-sm font-medium">Status: Pending</p>
        <p className="text-yellow-600 text-xs mt-0.5">We'll notify you once verified.</p>
      </div>
    </div>
  );
}

function VerifiedScreen() {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
        <BadgeCheck size={40} className="text-emerald-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mt-6">KYC Verified!</h2>
      <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-xs">
        Your identity has been successfully verified. You can now access all features.
      </p>
      <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3 w-full">
        <p className="text-emerald-700 text-sm font-medium">Status: Verified </p>
      </div>
    </div>
  );
}

function RejectedBanner({ reason }) {
  return (
    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-3 mb-6">
      <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-red-700 text-sm font-semibold">KYC Rejected — Please Resubmit</p>
        <p className="text-red-600 text-xs mt-0.5">{reason || "Your previous submission was rejected. Please re-upload your documents."}</p>
      </div>
    </div>
  );
}

function SuccessScreen({ onGoHome }) {
  return (
    <div className="flex flex-col items-center text-center py-6">
      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
        <CheckCircle size={40} className="text-emerald-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mt-6">KYC Submitted!</h2>
      <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-xs">
        Your documents are under review. We'll notify you once verification is complete — usually within 24 hours.
      </p>
      <button
        onClick={onGoHome}
        className="mt-8 w-full bg-[#034A1F] text-white py-3.5 rounded-full text-[15px] font-medium hover:opacity-90 transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

// ================================
// STEP 1 — Personal Details
// ================================

function Step1({ data, onChange, onNext }) {
  const isValid =
    data.fullName.trim() &&
    /^[6-9]\d{9}$/.test(data.contactNumber) &&
    data.currentAddress.trim();

  return (
    <>
      <p className="text-center text-[15px] text-gray-500 mb-8">
        Fill in your personal details as they appear on your Aadhaar card.
      </p>

      <FormField label="Full Name (as per Aadhaar)" required>
        <div className="relative">
          <User size={16} className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            placeholder="Enter your full name"
            onChange={onChange}
            className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-3 outline-none bg-transparent focus:border-[#034A1F] transition text-sm"
          />
        </div>
      </FormField>

      <FormField label="Contact Number" required>
        <div className="relative">
          <Phone size={16} className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="tel"
            name="contactNumber"
            value={data.contactNumber}
            placeholder="10-digit mobile number"
            maxLength={10}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-3 outline-none bg-transparent focus:border-[#034A1F] transition text-sm"
          />
        </div>
        {data.contactNumber && !/^[6-9]\d{9}$/.test(data.contactNumber) && (
          <p className="text-red-500 text-xs mt-1 ml-2">Enter a valid 10-digit mobile number</p>
        )}
      </FormField>

      <FormField label="Current Address" required>
        <div className="relative">
          <MapPin size={16} className="absolute left-4 top-3.5 text-gray-400" />
          <textarea
            rows={4}
            name="currentAddress"
            value={data.currentAddress}
            placeholder="Enter your complete permanent address"
            onChange={onChange}
            className="w-full border border-gray-300 rounded-3xl pl-10 pr-4 py-3 outline-none bg-transparent focus:border-[#034A1F] transition resize-none text-sm"
          />
        </div>
      </FormField>

      <NavButtons onNext={onNext} disabled={!isValid} />
    </>
  );
}

// ================================
// STEP 2 — Aadhaar Upload
// ================================

function UploadBox({ label, file, onUpload, onRemove }) {
  return (
    <div className="mb-4">
      <p className="text-[13px] font-medium text-gray-600 mb-2">{label}</p>
      {file ? (
        <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            <FileText size={18} className="text-emerald-600 shrink-0" />
            <span className="text-sm text-emerald-700 font-medium truncate max-w-[200px]">
              {file.name}
            </span>
          </div>
          <button type="button" onClick={onRemove} className="text-gray-400 hover:text-red-500 transition">
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl py-6 cursor-pointer hover:border-[#034A1F] hover:bg-[#034A1F]/5 transition group">
          <Upload size={22} className="text-gray-300 group-hover:text-[#034A1F] transition mb-2" />
          <span className="text-sm text-gray-400 group-hover:text-[#034A1F] transition">Click to upload</span>
          <span className="text-xs text-gray-300 mt-0.5">JPG, PNG or PDF — max 5MB</span>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
          />
        </label>
      )}
    </div>
  );
}

function Step2({ data, onChange, onFileUpload, onFileRemove, onNext, onBack }) {
  const isValid =
    /^\d{12}$/.test(data.aadhaarNumber) &&
    data.aadhaarFront &&
    data.aadhaarBack;

  return (
    <>
      <p className="text-center text-[15px] text-gray-500 mb-8">
        Enter your Aadhaar number and upload both sides.
      </p>

      <FormField label="Aadhaar Number" required>
        <input
          type="text"
          name="aadhaarNumber"
          value={data.aadhaarNumber}
          placeholder="12-digit Aadhaar number"
          maxLength={12}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-full px-4 py-3 outline-none bg-transparent focus:border-[#034A1F] transition text-sm tracking-widest"
        />
        {data.aadhaarNumber && !/^\d{12}$/.test(data.aadhaarNumber) && (
          <p className="text-red-500 text-xs mt-1 ml-2">Aadhaar must be exactly 12 digits</p>
        )}
      </FormField>

      <UploadBox
        label="Aadhaar Card — Front Side"
        file={data.aadhaarFront}
        onUpload={(file) => onFileUpload("aadhaarFront", file)}
        onRemove={() => onFileRemove("aadhaarFront")}
      />

      <UploadBox
        label="Aadhaar Card — Back Side"
        file={data.aadhaarBack}
        onUpload={(file) => onFileUpload("aadhaarBack", file)}
        onRemove={() => onFileRemove("aadhaarBack")}
      />

      <NavButtons onBack={onBack} onNext={onNext} disabled={!isValid} />
    </>
  );
}

// ================================
// STEP 3 — Review & Submit
// ================================

function ReviewRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 rounded-full bg-[#034A1F]/10 flex items-center justify-center text-[#034A1F] shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[12px] text-gray-400 font-medium">{label}</p>
        <p className="text-[14px] text-gray-800 font-medium mt-0.5 break-words">{value || "—"}</p>
      </div>
    </div>
  );
}

function Step3({ step1, step2, onBack, onSubmit, loading }) {
  return (
    <>
      <p className="text-center text-[15px] text-gray-500 mb-6">
        Review your details before submitting.
      </p>

      <div className="bg-gray-50 rounded-2xl px-5 py-2 mb-4">
        <p className="text-[11px] font-semibold text-[#034A1F] uppercase tracking-wider pt-3 pb-1">
          Personal Details
        </p>
        <ReviewRow icon={<User size={14} />} label="Full Name" value={step1.fullName} />
        <ReviewRow icon={<Phone size={14} />} label="Contact Number" value={step1.contactNumber} />
        <ReviewRow icon={<MapPin size={14} />} label="Address" value={step1.currentAddress} />
      </div>

      <div className="bg-gray-50 rounded-2xl px-5 py-2 mb-6">
        <p className="text-[11px] font-semibold text-[#034A1F] uppercase tracking-wider pt-3 pb-1">
          Aadhaar Details
        </p>
        <ReviewRow
          icon={<FileText size={14} />}
          label="Aadhaar Number"
          value={`XXXX XXXX ${step2.aadhaarNumber.slice(-4)}`}
        />
        <ReviewRow icon={<Upload size={14} />} label="Front Side" value={step2.aadhaarFront?.name} />
        <ReviewRow icon={<Upload size={14} />} label="Back Side" value={step2.aadhaarBack?.name} />
      </div>

      <NavButtons
        onBack={onBack}
        onNext={onSubmit}
        nextLabel="Submit KYC "
        loading={loading}
      />
    </>
  );
}

// ================================
// MAIN EXPORT
// ================================

export default function KYCVerification() {
  const navigate = useNavigate();

  // pageStatus: loading | form | pending | verified | rejected | submitted
  const [pageStatus, setPageStatus] = useState("loading");
  const [rejectionReason, setRejectionReason] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [step1Data, setStep1Data] = useState({
    fullName: "",
    contactNumber: "",
    currentAddress: "",
  });

  const [step2Data, setStep2Data] = useState({
    aadhaarNumber: "",
    aadhaarFront: null,  // matches backend upload.fields name
    aadhaarBack: null,   // matches backend upload.fields name
  });

  // ================================
  // CHECK KYC STATUS ON MOUNT
  // ================================

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axios.get(`${BASE}/kycverify`, {
          withCredentials: true,
        });

        const { submitted, verified, status, data } = res.data;

        if (verified || status === "Verified") {
          setPageStatus("verified");
        } else if (submitted || status === "Pending") {
          setPageStatus("pending");
        } else if (status === "Rejected") {
          setRejectionReason(data?.rejectionReason || "");
          // Prefill with old data so user doesn't retype everything
          if (data) {
            setStep1Data({
              fullName: data.fullName || "",
              contactNumber: data.contactNumber || "",
              currentAddress: data.currentAddress || "",
            });
            setStep2Data({
              aadhaarNumber: data.aadhaarNumber || "",
              aadhaarFront: null,
              aadhaarBack: null,
            });
          }
          setPageStatus("rejected");
        } else {
          setPageStatus("form");
        }
      } catch (err) {
        if (err?.response?.status === 401) {
          navigate("/login", {
            state: { from: { pathname: "/dashboard/kyc-verification" } },
          });
        } else {
          setPageStatus("form");
        }
      }
    };

    checkStatus();
  }, []);

  // ================================
  // HANDLERS
  // ================================

  const handleStep1Change = (e) => {
    setStep1Data((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStep2Change = (e) => {
    setStep2Data((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (field, file) => {
    setStep2Data((prev) => ({ ...prev, [field]: file }));
  };

  const handleFileRemove = (field) => {
    setStep2Data((prev) => ({ ...prev, [field]: null }));
  };

  // ================================
  // SUBMIT — field names match backend exactly
  // ================================

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("fullName", step1Data.fullName);
      payload.append("contactNumber", step1Data.contactNumber);
      payload.append("currentAddress", step1Data.currentAddress);
      payload.append("aadhaarNumber", step2Data.aadhaarNumber);
      if (step2Data.aadhaarFront) payload.append("aadhaarFront", step2Data.aadhaarFront);
      if (step2Data.aadhaarBack) payload.append("aadhaarBack", step2Data.aadhaarBack);

      await axios.post(`${BASE}/submit`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setPageStatus("submitted");
    } catch (error) {
      alert(error?.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // RENDER
  // ================================

  if (pageStatus === "loading") {
    return (
      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center">
        <p className="text-gray-400 text-sm animate-pulse">Checking KYC status...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center px-5 py-16">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-lg">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="w-[140px]" />
        </div>

        {/* Pure status screens */}
        {pageStatus === "pending"   && <PendingScreen />}
        {pageStatus === "verified"  && <VerifiedScreen />}
        {pageStatus === "submitted" && <SuccessScreen onGoHome={() => navigate("/dashboard")} />}

        {/* Form — fresh or rejected resubmission */}
        {(pageStatus === "form" || pageStatus === "rejected") && (
          <>
            {pageStatus === "rejected" && <RejectedBanner reason={rejectionReason} />}

            <h1 className="text-center text-4xl font-light leading-none mb-1">
              Step {currentStep}/3
            </h1>
            <StepIndicator current={currentStep} />

            {currentStep === 1 && (
              <Step1
                data={step1Data}
                onChange={handleStep1Change}
                onNext={() => setCurrentStep(2)}
              />
            )}
            {currentStep === 2 && (
              <Step2
                data={step2Data}
                onChange={handleStep2Change}
                onFileUpload={handleFileUpload}
                onFileRemove={handleFileRemove}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 3 && (
              <Step3
                step1={step1Data}
                step2={step2Data}
                onBack={() => setCurrentStep(2)}
                onSubmit={handleSubmit}
                loading={loading}
              />
            )}

            <SecurityBadge />
          </>
        )}

      </div>
    </div>
  );
}