import { useEffect } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

export default function Toast({
  type = "success",
  message = "",
  show,
  onClose,
  duration = 3000,
}) {

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const styles = {
    success: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-700",
      icon: <CheckCircle size={22} />,
    },

    error: {
      bg: "bg-red-100",
      border: "border-red-500",
      text: "text-red-700",
      icon: <XCircle size={22} />,
    },

    info: {
      bg: "bg-blue-100",
      border: "border-blue-500",
      text: "text-blue-700",
      icon: <Info size={22} />,
    },
  };

  const current = styles[type];

  return (
    <div className="fixed top-5 right-5 z-50 animate-in slide-in-from-right duration-300">
      <div
        className={`min-w-[320px] max-w-sm px-4 py-3 rounded-xl shadow-lg border-l-4 flex items-start gap-3 ${current.bg} ${current.border}`}
      >

        <div className={current.text}>
          {current.icon}
        </div>

        <div className="flex-1">
          <p className={`font-semibold ${current.text}`}>
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className={`${current.text} hover:opacity-70`}
        >
          <X size={18} />
        </button>

      </div>
    </div>
  );
}