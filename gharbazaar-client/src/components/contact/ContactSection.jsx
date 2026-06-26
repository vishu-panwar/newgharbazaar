import { useState } from "react";
import { Sparkles, CheckCircle, Plus, Minus } from "lucide-react";

// ── Social icons ──
const FbIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const IgIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const YtIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16a2 2 0 0 1 .5.92z" />
  </svg>
);
const MailIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const GlobeIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const MapPinIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

// ── WhatsApp helper ──
const WHATSAPP_NUMBER = "919548283300";
const openWhatsApp = (property = {}, action = "Enquiry") => {
  const message = property.title
    ? `Hi GharBazaar! 👋\n\nI'm interested in this property:\n\n🏠 *${property.title}*\n📍 *Location:* ${property.location || property.city || "N/A"}\n💰 *Price:* ${property.price ? `₹${property.price}` : "N/A"}\n🏷️ *Type:* ${property.type || "N/A"}\n📋 *Action:* ${action}\n🆔 *Property ID:* ${property._id || property.id || "N/A"}\n\nPlease share more details. Thank you!`
    : `Hi GharBazaar! 👋\n\nI'd like to get in touch with your team. Please share more details about your services. Thank you!`;
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
};

const SOCIALS = [
  {
    icon: <IgIcon />,
    label: "Instagram",
    href: "https://www.instagram.com/gharbazaar.official",
  },
  {
    icon: <FbIcon />,
    label: "Facebook",
    href: "https://www.facebook.com/share/1JZTnPoBXL/",
  },
  { icon: <XIcon />, label: "X", href: "https://x.com/gharbazaar_in" },
  {
    icon: <LinkedInIcon />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/gharbazaar/",
  },
  {
    icon: <YtIcon />,
    label: "YouTube",
    href: "https://youtube.com/@gharbazaarprivatelimited",
  },
];

const FAQS = [
  {
    q: "Is searching for properties free??",
    a: "Yes! Searching for properties on GharBazaar is completely free. You can browse thousands of listings without any charges.",
  },
  {
    q: "Is property listing really free??",
    a: "Absolutely. Basic property listings are free for all sellers. Premium features are available for enhanced visibility.",
  },
  {
    q: "Are all listings verified??",
    a: "We verify listings to ensure authenticity. Our team reviews each submission and marks verified properties with a badge.",
  },
  {
    q: "How do I contact a property owner?",
    a: "You can contact property owners directly through the inquiry form on each listing page, or via phone/email if provided.",
  },
];

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  role: "",
  subject: "",
  message: "",
};

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
      >
        <span>{q}</span>
        <span className="ml-4 shrink-0 text-gray-400">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      {open && (
        <p className="pb-4 text-sm text-gray-500 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiReply, setAiReply] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          role: form.role,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await response.json();

      // ✅ Handle 429 separately
      if (!response.ok) {
        if (response.status === 429) {
          setAiReply(
            "Today's limit is over. We will get back to you tomorrow.",
          );
          setSubmitted(true);
          return;
        }

        throw new Error(data.message || "Failed to send message");
      }

      setAiReply(
        data.message ||
          "Thank you for contacting GharBazaar. Our team will contact you shortly.",
      );

      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (error) {
      setAiReply(error.message || "Something went wrong. Please try again.");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setAiReply("");
    setForm(EMPTY_FORM);
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Outfit', sans-serif",
        background: "#ede8df",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .inp {
          width: 100%; background: #fff; border: 1.5px solid #e5e5e0; border-radius: 0px;
          padding: 10px 12px; font-size: 13px; color: #1a1a1a; outline: none;
          transition: border 0.15s, box-shadow 0.15s; font-family: inherit; min-height: 42px;
        }
        .inp::placeholder { color: #b0b0a8; }
        .inp:focus { border-color: #2e7d32; box-shadow: 0 0 0 3px rgba(46,125,50,0.08); }
        @media (hover: hover) { .inp:hover:not(:focus) { border-color: #d0d0c8; } }
        .lbl { font-size: 12px; font-weight: 600; color: #000; margin-bottom: 6px; display: block; letter-spacing: 0.01em; }
        .card-contact {
          background: #fff; border: 1.5px solid #d1d5db; border-radius: 0px;
          padding: 20px 22px; display: flex; align-items: flex-start; gap: 16px;
          transition: box-shadow 0.18s, transform 0.18s;
        }
        @media (hover: hover) { .card-contact:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.07); transform: translateY(-2px); } }
        .card-wa {
          background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 0px;
          padding: 16px 18px; display: flex; align-items: center; gap: 14px;
          transition: box-shadow 0.18s, transform 0.18s, border-color 0.18s;
          cursor: pointer; text-decoration: none; width: 100%; font-family: inherit;
        }
        @media (hover: hover) { .card-wa:hover { box-shadow: 0 4px 16px rgba(37,211,102,0.18); transform: translateY(-2px); border-color: #86efac; } }
        .card-wa:active { transform: translateY(0); }
        .ic-wrap {
          width: 46px; height: 46px; border-radius: 0px; background: #f0f7f1;
          display: flex; align-items: center; justify-content: center; color: #2e7d32; flex-shrink: 0;
        }
        .ic-wrap-wa {
          width: 44px; height: 44px; border-radius: 0px; background: #25D366;
          display: flex; align-items: center; justify-content: center; color: #fff;
          flex-shrink: 0; box-shadow: 0 2px 10px rgba(37,211,102,0.35);
        }
        .send-btn {
          width: 100%; background: #2e7d32; color: #fff; border: none; border-radius: 0px;
          padding: 14px 0; font-size: 14px; font-weight: 700; letter-spacing: 0.02em;
          cursor: pointer; transition: background 0.15s, transform 0.1s; font-family: inherit;
          min-height: 48px; display: flex; align-items: center; justify-content: center;
          -webkit-tap-highlight-color: transparent;
        }
        @media (hover: hover) { .send-btn:hover:not(:disabled) { background: #1b5e20; transform: translateY(-1px); } }
        .send-btn:active:not(:disabled) { background: #1b5e20; transform: translateY(0); }
        .send-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .tag-pill {
          display: inline-flex; align-items: center; gap: 5px;
          background: #e8f5e9; color: #2e7d32; border: 1.5px solid #c8e6c9;
          border-radius: 100px; padding: 5px 14px; font-size: 12px; font-weight: 600;
        }
        .social-btn {
          width: 40px; height: 40px; border-radius: 0px; background: #f2f2ed;
          border: 1.5px solid #e5e5e0; display: flex; align-items: center; justify-content: center;
          color: #555; text-decoration: none; transition: background 0.15s, color 0.15s, transform 0.15s;
          -webkit-tap-highlight-color: transparent; min-width: 40px; min-height: 40px;
        }
        @media (hover: hover) { .social-btn:hover { background: #2e7d32; color: #fff; transform: translateY(-2px); } }
        .social-btn:active { background: #1b5e20; color: #fff; }
        .wa-online {
          display: inline-flex; align-items: center; gap: 4px; background: #dcfce7;
          color: #16a34a; border-radius: 100px; padding: 2px 8px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.03em;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease both; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .form-grid-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        @media (max-width: 640px) { .form-grid-2col { grid-template-columns: 1fr; } }
        .contact-section { display: grid; grid-template-columns: 1fr 320px; gap: 16px; align-items: start; }
        @media (max-width: 1024px) { .contact-section { grid-template-columns: 1fr; } }
        .faq-section { display: grid; grid-template-columns: 1fr 320px; gap: 16px; margin-top: 16px; }
        @media (max-width: 1024px) { .faq-section { grid-template-columns: 1fr; } }
        .contact-card { background: #fff; border-radius: 0px; border: 1.5px solid #e8e8e2; padding: 28px 24px; }
        @media (max-width: 640px) { .contact-card { padding: 20px 18px; } }
      `}</style>

      <main
        style={{
          maxWidth: 1600,
          margin: "0 auto",
          padding: "clamp(16px, 3vw, 24px) clamp(14px, 3vw, 24px)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "clamp(16px, 3vw, 24px)" }}>
          <div className="tag-pill" style={{ marginBottom: 10 }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <circle cx="5" cy="5" r="5" />
            </svg>
            We are here to help
          </div>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(28px, 5vw, 36px)",
              fontWeight: 800,
              color: "#0C3A1D",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Get in Touch with Us
          </h1>
          <p
            style={{
              color: "#888",
              fontSize: "clamp(13px, 2.2vw, 14px)",
              marginTop: 8,
              maxWidth: 600,
            }}
          >
            Have a question, feedback, or need help? Our team is ready to assist
            you.
          </p>
        </div>

        {/* Top row: Form + Contact Cards */}
        <div className="contact-section">
          {/* Form Card */}
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #d1d5db",
              borderRadius: 0,
              padding: "clamp(16px, 2.5vw, 22px)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(16px, 3.5vw, 18px)",
                fontWeight: 700,
                color: "#111",
                margin: "0 0 14px",
              }}
            >
              Send Us a Message
            </h2>

            {submitted ? (
              <div
                className="fade-up"
                style={{
                  textAlign: "center",
                  padding: "clamp(16px, 2.5vw, 24px) 0",
                }}
              >
                <CheckCircle
                  size={48}
                  color="#2e7d32"
                  style={{ margin: "0 auto 10px" }}
                />
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(16px, 3vw, 20px)",
                    color: "#111",
                    marginBottom: 4,
                  }}
                >
                  Message Sent!
                </h3>
                <p
                  style={{
                    color: "#888",
                    fontSize: "clamp(12px, 1.8vw, 13px)",
                    marginBottom: 16,
                  }}
                >
                  Thanks for reaching out. We'll get back to you within 24
                  hours.
                </p>
                {aiReply && (
                  <div
                    style={{
                      background: "#f0f7f1",
                      border: "1.5px solid #c8e6c9",
                      borderRadius: 0,
                      padding: "clamp(10px, 1.5vw, 14px)",
                      textAlign: "left",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#2e7d32",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 6,
                      }}
                    >
                      <Sparkles size={10} /> Auto-reply sent to {form.email}
                    </div>
                    <p
                      style={{
                        fontSize: 12.5,
                        color: "#2d4a2d",
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {aiReply}
                    </p>
                  </div>
                )}
                <button
                  onClick={handleReset}
                  className="send-btn"
                  style={{ maxWidth: 160, marginTop: 12 }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-grid-2col" style={{ marginBottom: 14 }}>
                  <div>
                    <label className="lbl">Full Name</label>
                    <input
                      className="inp"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="lbl">Phone Number</label>
                    <input
                      className="inp"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter 10 digit phone number"
                      type="tel"
                    />
                  </div>
                </div>
                <div className="form-grid-2col" style={{ marginBottom: 14 }}>
                  <div>
                    <label className="lbl">Email</label>
                    <input
                      className="inp"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email ID"
                      required
                    />
                  </div>
                  <div>
                    <label className="lbl">I Am A</label>
                    <select
                      className="inp"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                    >
                      <option value="">
                        Buyer / Seller / Renter / Investor
                      </option>
                      <option>Buyer</option>
                      <option>Seller</option>
                      <option>Renter</option>
                      <option>Investor</option>
                      <option>Broker</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label className="lbl">Subject</label>
                  <input
                    className="inp"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Write your subject"
                    required
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label className="lbl">Message</label>
                  <textarea
                    className="inp"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your Message"
                    rows={4}
                    required
                    style={{ resize: "none" }}
                  />
                </div>
                <button type="submit" disabled={loading} className="send-btn">
                  {loading ? (
                    <span
                      style={{
                        display: "inline-block",
                        width: 16,
                        height: 16,
                        border: "2.5px solid rgba(255,255,255,0.4)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                        marginRight: 8,
                      }}
                    />
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info Cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(10px, 1.5vw, 12px)",
            }}
          >
            {/* Call Us */}
            <div
              className="card-contact"
              style={{ padding: "clamp(14px, 1.8vw, 19px)" }}
            >
              <div className="ic-wrap">
                <PhoneIcon />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#0F592A",
                    marginBottom: 2,
                  }}
                >
                  Call Us
                </div>
                {/* <div style={{ fontSize: 'clamp(12px, 2.2vw, 14px)', fontWeight: 700, color: '#111' }}>+91 9548283300</div> */}
                <div
                  style={{
                    fontSize: 11,
                    color: "#2e7d32",
                    marginTop: 1,
                    fontWeight: 500,
                  }}
                >
                  Mon–Sat, 9am–7pm
                </div>
              </div>
            </div>

            {/* Email Us */}
            <div
              className="card-contact"
              style={{ padding: "clamp(14px, 1.8vw, 18px)" }}
            >
              <div className="ic-wrap">
                <MailIcon />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#0F592A",
                    marginBottom: 2,
                  }}
                >
                  Email Us
                </div>
                <div
                  style={{
                    fontSize: "clamp(11px, 2vw, 13px)",
                    fontWeight: 700,
                    color: "#111",
                    wordBreak: "break-all",
                  }}
                >
                  contact@gharbazaar.in
                </div>
              </div>
            </div>

            {/* WhatsApp — clickable */}
            <button
              onClick={() => openWhatsApp()}
              className="card-wa"
              style={{ border: "none", textAlign: "left" }}
            >
              <div className="ic-wrap-wa">
                <WhatsAppIcon />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 2,
                  }}
                >
                  <span
                    style={{ fontSize: 11, fontWeight: 600, color: "#15803d" }}
                  >
                    WhatsApp Us
                  </span>
                  <span className="wa-online">
                    <svg
                      width="6"
                      height="6"
                      viewBox="0 0 10 10"
                      fill="currentColor"
                    >
                      <circle cx="5" cy="5" r="5" />
                    </svg>
                    Online
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "clamp(11px, 2vw, 13px)",
                    fontWeight: 700,
                    color: "#111",
                  }}
                >
                  +91 9548283300
                </div>
                <div
                  style={{
                    fontSize: 10.5,
                    color: "#16a34a",
                    marginTop: 1,
                    fontWeight: 500,
                  }}
                >
                  Tap to chat instantly
                </div>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#25D366"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Visit Us */}
            <div
              className="card-contact"
              style={{ padding: "clamp(14px, 1.8vw, 18px)" }}
            >
              <div className="ic-wrap">
                <MapPinIcon />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#0F592A",
                    marginBottom: 2,
                  }}
                >
                  Visit Us
                </div>
                <div
                  style={{
                    fontSize: "clamp(11px, 2vw, 12.5px)",
                    fontWeight: 700,
                    color: "#111",
                    lineHeight: 1.4,
                  }}
                >
                  Bp75 Bharampuri Colony, Near Govt. ITI, Delhi Rd, Saharanpur,
                  UP — 247001
                </div>
              </div>
            </div>

            {/* Follow us */}
            <div
              style={{
                background: "#fff",
                border: "1.5px solid #d1d5db",
                borderRadius: 0,
                padding: "clamp(14px, 1.8vw, 18px)",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(12px, 1.8vw, 13px)",
                  fontWeight: 700,
                  color: "#111",
                  marginBottom: 8,
                }}
              >
                Follow Us
              </div>
              <p style={{ fontSize: 10, color: "#888", margin: "0 0 12px", lineHeight: 1.4 }}>
                Stay connected on social media.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="social-btn"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: FAQ + Map */}
        <div className="faq-section">
          {/* FAQ */}
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #d1d5db",
              borderRadius: 0,
              padding: "clamp(16px, 2.5vw, 22px)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(14px, 3.5vw, 18px)",
                fontWeight: 700,
                color: "#111",
                margin: "0 0 16px",
              }}
            >
              Frequently Asked Questions
            </h2>
            {FAQS.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>

          {/* Map */}
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #d1d5db",
              borderRadius: 0,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              minHeight: "clamp(240px, 35vh, 300px)",
            }}
          >
            <div style={{ flex: 1, minHeight: 180 }}>
              <iframe
                title="GharBazaar Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.2636324624837!2d77.52896031120007!3d29.931394723813764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e954acd5fe119%3A0x445bf847545c5554!2sGovt%20ITI%20SAHARANPUR!5e1!3m2!1sen!2sin!4v1780041753520!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: 180 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div
              style={{
                padding: "clamp(12px, 1.5vw, 16px)",
                borderTop: "1.5px solid #f0f0ea",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <MapPinIcon />
                <p
                  style={{
                    fontSize: "clamp(10px, 1.8vw, 12px)",
                    color: "#555",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  Bp75 Bharampuri Colony, Near Govt. ITI, Delhi Rd, Saharanpur,
                  UP — 247001
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Govt+ITI+Saharanpur"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#2e7d32",
                  color: "#fff",
                  borderRadius: 0,
                  padding: "clamp(8px, 1.5vw, 10px) 0",
                  fontSize: "clamp(11px, 1.8vw, 12.5px)",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "background 0.15s, transform 0.1s",
                  minHeight: 40,
                }}
              >
                View on map
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
