import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, IndianRupee, Home, Bed, Bath,
  Square, FileText, CheckCircle, Calendar, User,
  Phone, Mail, ChevronDown, Plus, Minus
} from 'lucide-react';

export default function PostRequirement() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lookingFor: 'Buy',
    propertyType: 'Apartment',
    budget: '',
    city: '',
    locality: '',
    bedrooms: '2',
    bathrooms: '2',
    minArea: '',
    maxArea: '',
    moveInDate: '',
    additionalRequirements: '',
    name: '',
    phone: '',
    email: '',
    preferredAmenities: [],
  });

  const [submitted, setSubmitted] = useState(false);

  const amenitiesList = [
    'Parking', 'Gym', 'Swimming Pool', 'Garden', 'Security', 'Power Backup',
    'Lift', 'Club House', 'Play Area', 'WiFi', 'Modular Kitchen', 'Balcony'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      preferredAmenities: prev.preferredAmenities.includes(amenity)
        ? prev.preferredAmenities.filter(a => a !== amenity)
        : [...prev.preferredAmenities, amenity]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Requirement Posted:', formData);
    setSubmitted(true);
    setTimeout(() => navigate('/'), 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={52} className="text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Requirement Posted!</h2>
          <p className="text-gray-500 leading-relaxed mb-2">
            Your property requirement has been received. Our verified brokers and owners will contact you with matching properties.
          </p>
          <p className="text-emerald-600 font-semibold text-sm mt-4">
            Expect suggestions within 24 hours · Redirecting...
          </p>
        </div>
      </div>
    );
  }

  const inputCls = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200";
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  const SectionHeader = ({ icon, title, subtitle }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-bold text-gray-800">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );

  const SelectWrapper = ({ children }) => (
    <div className="relative">
      {children}
      <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-28 px-4">
      <div className="max-w-3xl mx-auto">

        {/* PAGE HEADER */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200 mb-4">
            <Search size={12} />
            Property Requirement
          </span>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Tell us what you're<br />
            <span className="text-emerald-600">looking for</span>
          </h1>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
            Share your requirements and get matched with verified properties from trusted brokers and owners.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* LOOKING FOR */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
            <SectionHeader icon={<Search size={18} />} title="What are you looking for?" subtitle="Select your purpose and property type" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">I want to *</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Buy', 'Rent'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, lookingFor: opt }))}
                      className={`py-3 rounded-2xl text-sm font-semibold border-2 transition-all duration-200 ${
                        formData.lookingFor === opt
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-100'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Property Type *</label>
                <SelectWrapper>
                  <select name="propertyType" value={formData.propertyType} onChange={handleChange} className={selectCls} required>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="House">Independent House</option>
                    <option value="Plot">Plot/Land</option>
                    <option value="Commercial">Commercial Space</option>
                    <option value="PG">PG/Hostel</option>
                  </select>
                </SelectWrapper>
              </div>
            </div>
          </div>

          {/* BUDGET */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
            <SectionHeader icon={<IndianRupee size={18} />} title="Budget" subtitle="Set your maximum spending limit" />
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">
                {formData.lookingFor === 'Buy' ? 'Maximum Budget (₹) *' : 'Monthly Budget (₹) *'}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₹</span>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder={formData.lookingFor === 'Buy' ? '50,00,000' : '25,000'}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
            <SectionHeader icon={<MapPin size={18} />} title="Preferred Location" subtitle="Where do you want the property?" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g., Mumbai" className={inputCls} required />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Locality / Area</label>
                <input type="text" name="locality" value={formData.locality} onChange={handleChange} placeholder="e.g., Andheri West, Bandra" className={inputCls} />
              </div>
            </div>
          </div>

          {/* SPECIFICATIONS */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
            <SectionHeader icon={<Home size={18} />} title="Property Specifications" subtitle="Size, rooms, and area preferences" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1 block">
                  <Bed size={13} /> Bedrooms *
                </label>
                <SelectWrapper>
                  <select name="bedrooms" value={formData.bedrooms} onChange={handleChange} className={selectCls} required>
                    {['1','2','3','4','5+'].map(n => <option key={n} value={n}>{n} BHK</option>)}
                  </select>
                </SelectWrapper>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1 block">
                  <Bath size={13} /> Bathrooms *
                </label>
                <SelectWrapper>
                  <select name="bathrooms" value={formData.bathrooms} onChange={handleChange} className={selectCls} required>
                    {['1','2','3','4','5+'].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </SelectWrapper>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1 block">
                  <Square size={13} /> Min Area
                </label>
                <input type="number" name="minArea" value={formData.minArea} onChange={handleChange} placeholder="800 sq.ft" className={inputCls} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1 block">
                  <Square size={13} /> Max Area
                </label>
                <input type="number" name="maxArea" value={formData.maxArea} onChange={handleChange} placeholder="1500 sq.ft" className={inputCls} />
              </div>
            </div>

            {formData.lookingFor === 'Rent' && (
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1 block">
                  <Calendar size={13} /> Move-in Date
                </label>
                <input type="date" name="moveInDate" value={formData.moveInDate} onChange={handleChange} className={inputCls} />
              </div>
            )}
          </div>

          {/* AMENITIES */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
            <SectionHeader icon={<FileText size={18} />} title="Preferred Amenities" subtitle="Select all that matter to you" />
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map(amenity => {
                const active = formData.preferredAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border-2 transition-all duration-200 ${
                      active
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700'
                    }`}
                  >
                    {active ? <Minus size={11} /> : <Plus size={11} />}
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ADDITIONAL */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
            <SectionHeader icon={<FileText size={18} />} title="Additional Requirements" subtitle="Any specific needs or preferences?" />
            <textarea
              name="additionalRequirements"
              value={formData.additionalRequirements}
              onChange={handleChange}
              placeholder="e.g., Near metro station, pet-friendly, fully furnished, south-facing..."
              rows={4}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* CONTACT */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
            <SectionHeader icon={<User size={18} />} title="Your Contact Details" subtitle="We'll use these to share matched properties" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1 block">
                  <User size={12} /> Full Name *
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" className={inputCls} required />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1 block">
                  <Phone size={12} /> Phone Number *
                </label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile" className={inputCls} required />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1 block">
                  <Mail size={12} /> Email Address *
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className={inputCls} required />
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="text-center pt-2 pb-8">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-10 py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all duration-300 hover:-translate-y-1 text-sm"
            >
              <CheckCircle size={18} />
              Post Requirement
            </button>
            <p className="text-xs text-gray-400 mt-4 max-w-sm mx-auto">
              By submitting, you agree to be contacted by verified brokers and property owners with matching properties.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}