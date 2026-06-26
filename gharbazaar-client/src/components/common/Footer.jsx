import React from "react";
import { Phone } from "lucide-react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#052e16] text-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center p-2">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-2xl font-bold">
              Ghar<span className="text-[#1f9d55]">Bazaar</span>
              <span className="text-gray-300">.in</span>
            </span>
          </div>

          <p className="
          text-sm text-gray-300 leading-relaxed max-w-xs">
            India's most trusted real estate platform. Buy, sell, rent & discover
            premium properties with verified brokers.
          </p>

          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <div className="flex items-center gap-3">
  <Phone size={18} />
  <span>+91 9548283300</span>
</div>
            <div className="flex items-center gap-3">
              <FaEnvelope /> <span>contact@gharbazaar.in</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt /> <span>BP75, Saharanpur, UP Near Govt. ITI</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-2">
            <a href="https://www.instagram.com/gharbazaar.official" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:scale-110 transition cursor-pointer text-lg" />
            </a>
            <a href="https://www.facebook.com/share/1JZTnPoBXL/" target="_blank" rel="noreferrer">
              <FaFacebookF className="hover:scale-110 transition cursor-pointer text-lg" />
            </a>
            <a href="https://x.com/gharbazaar_in" target="_blank" rel="noreferrer">
              <div className="border border-white/80 rounded px-1 py-0.5 flex items-center justify-center hover:scale-110 transition cursor-pointer">
                <span className="text-[10px] font-bold italic">X</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/company/gharbazaar/?viewAsMember=true" target="_blank" rel="noreferrer">
              <FaLinkedinIn className="hover:scale-110 transition cursor-pointer text-lg" />
            </a>
            <a href="https://youtube.com/@gharbazaarprivatelimited?si=NArhOHfTGwhEBs3m" target="_blank" rel="noreferrer">
              <FaYoutube className="hover:scale-110 transition cursor-pointer text-lg" />
            </a>
          </div>
        </div>

        {/* Properties + Company — side by side on mobile, each in own column on desktop */}
        <div className="grid grid-cols-2 gap-8 md:contents">

          {/* Properties */}
          <div>
            <h4 className="text-lg font-medium mb-6">Properties</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer">Buy Property</li>
              <li className="hover:text-white cursor-pointer">Rent Property</li>
              <li className="hover:text-white cursor-pointer">Sell Property</li>
              <li className="hover:text-white cursor-pointer">Commercial Spaces</li>
              <li className="hover:text-white cursor-pointer">Plots & Land</li>
              <li className="hover:text-white cursor-pointer">Luxury Homes</li>
              <li className="hover:text-white cursor-pointer">New Projects</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-medium mb-6">Company</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer">About us</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Press & Media</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Partner with Us</li>
              <li className="hover:text-white cursor-pointer">Advertise</li>
              <li className="hover:text-white cursor-pointer">Sitemap</li>
            </ul>
          </div>

        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-6">
          <h4 className="text-lg font-bold uppercase tracking-wider">
            Stay In Touch
          </h4>
          <p className="text-sm text-gray-300">
            Subscribe to receive updates to exclusive deals, and more.
          </p>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="E-mail"
              className="bg-transparent border border-gray-600 rounded p-3 text-sm outline-none focus:border-white"
            />
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded uppercase tracking-widest text-sm">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-20 pt-6 border-t border-white/10 text-xs text-gray-400">
        <p>© 2026 GharBazaar Pvt. Ltd.</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;