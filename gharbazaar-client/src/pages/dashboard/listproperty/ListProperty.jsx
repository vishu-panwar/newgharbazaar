import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Building2,
  MapPin,
  IndianRupee,
  Home,
  FileText,
  CheckCircle,
  Upload,
  Phone,
  ImagePlus,
  Plus,
  Trash2,
} from "lucide-react";

export default function ListProperty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "Apartment",
    location: "",
    price: "",
    propertySpecifications: {},
    amenities: [],
    phoneNumber: "",
    description: "",
    listingType: "Rent",
    city: "",
  });

  // Dynamic specification inputs
  const [specifications, setSpecifications] = useState([
    {
      key: "",
      value: "",
    },
  ]);

  // Dynamic amenities input
  const [amenityInput, setAmenityInput] = useState("");

  // Images
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SPECIFICATIONS
  // =========================

  const handleSpecificationChange = (
    index,
    field,
    value
  ) => {
    const updatedSpecifications = [...specifications];

    updatedSpecifications[index][field] = value;

    setSpecifications(updatedSpecifications);
  };

  const addSpecificationField = () => {
    setSpecifications((prev) => [
      ...prev,
      {
        key: "",
        value: "",
      },
    ]);
  };

  const removeSpecificationField = (index) => {
    const updatedSpecifications =
      specifications.filter((_, i) => i !== index);

    setSpecifications(updatedSpecifications);
  };

  // =========================
  // AMENITIES
  // =========================

  const addAmenity = () => {
    if (
      amenityInput.trim() &&
      !formData.amenities.includes(
        amenityInput.trim()
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        amenities: [
          ...prev.amenities,
          amenityInput.trim(),
        ],
      }));

      setAmenityInput("");
    }
  };

  const removeAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter(
        (item) => item !== amenity
      ),
    }));
  };

  // =========================
  // IMAGES
  // =========================

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(
      e.target.files
    );

    setImages((prevImages) => {
      // Prevent duplicate images
      const newImages = selectedFiles.filter(
        (file) =>
          !prevImages.some(
            (img) =>
              img.name === file.name &&
              img.size === file.size
          )
      );

      return [...prevImages, ...newImages];
    });
  };

  const removeImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter(
        (_, index) => index !== indexToRemove
      )
    );
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const submitData = new FormData();

      // Convert specifications array to object
      const specificationsObject = {};

      specifications.forEach((spec) => {
        if (
          spec.key.trim() &&
          spec.value.trim()
        ) {
          specificationsObject[spec.key] =
            spec.value;
        }
      });

      // Append fields
      submitData.append("title", formData.title);
      submitData.append("type", formData.type);
      submitData.append(
        "location",
        formData.location
      );
      submitData.append("price", formData.price);

      submitData.append(
        "propertySpecifications",
        JSON.stringify(specificationsObject)
      );

      submitData.append(
        "amenities",
        JSON.stringify(formData.amenities)
      );

      submitData.append(
        "phoneNumber",
        formData.phoneNumber
      );

      submitData.append(
        "description",
        formData.description
      );

      submitData.append(
        "listingType",
        formData.listingType
      );

      submitData.append("city", formData.city);

      // Multiple Images
      images.forEach((image) => {
        submitData.append("images", image);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/createProperty`,
        submitData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
          withCredentials:true
        }
      );

      console.log(response.data);

      setSubmitted(true);

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SUCCESS UI
  // =========================

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5">
        <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-10 text-center">
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
            <CheckCircle
              size={50}
              className="text-emerald-600"
            />
          </div>

          <h2 className="text-4xl font-bold text-emerald-600 mt-6">
            Property Added!
          </h2>

          <p className="text-gray-600 mt-4 leading-7">
            Your property has been submitted
            successfully.
          </p>

          <p className="text-emerald-600 font-medium mt-3">
            Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-28 px-4">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900">
            List Your Property
          </h1>

          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Add complete property details and
            upload images to attract buyers and
            tenants quickly.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* PROPERTY DETAILS */}
          <div className="p-8 border-b border-gray-100">
            <SectionTitle
              title="Property Details"
              icon={<Building2 size={22} />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <FormGroup label="Property Title *">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Single Room"
                  className={inputClass}
                  required
                />
              </FormGroup>

              <FormGroup label="Property Type *">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Home/House">Home/House</option>
                  <option value="Independent House">Independent House</option>
                  <option value="Plot/Land">Plot/Land</option>
                  <option value="Commercial Space">Commercial Space</option>
                  <option value="PG/Hostel">PG/Hostel</option>
                </select>
              </FormGroup>

              <FormGroup label="Listing Type *">
                <select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Rent">Rent</option>
                  <option value="Sale">Sale</option>
                </select>
              </FormGroup>

              <FormGroup label="Price *">
                <div className="relative">
                  <IndianRupee
                    size={18}
                    className="absolute left-4 top-4 text-gray-400"
                  />

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="6000"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500"
                    required
                  />
                </div>
              </FormGroup>
            </div>

            <div className="mt-6">
              <FormGroup label="Description *">
                <textarea
                  rows="5"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Fully-furnished rental property..."
                  className={`${inputClass} resize-none`}
                  required
                />
              </FormGroup>
            </div>
          </div>

          {/* LOCATION */}
          <div className="p-8 border-b border-gray-100">
            <SectionTitle
              title="Location"
              icon={<MapPin size={22} />}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <FormGroup label="Location *">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Near Quantum University"
                  className={inputClass}
                  required
                />
              </FormGroup>

              <FormGroup label="City *">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Mandawar"
                  className={inputClass}
                  required
                />
              </FormGroup>
            </div>
          </div>

          {/* SPECIFICATIONS */}
          <div className="p-8 border-b border-gray-100">
            <SectionTitle
              title="Property Specifications"
              icon={<Home size={22} />}
            />

            <div className="mt-8 space-y-4">
              {specifications.map(
                (specification, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-5 gap-4"
                  >
                    <input
                      type="text"
                      placeholder="Specification Name"
                      value={specification.key}
                      onChange={(e) =>
                        handleSpecificationChange(
                          index,
                          "key",
                          e.target.value
                        )
                      }
                      className={inputClass}
                    />

                    <input
                      type="text"
                      placeholder="Specification Value"
                      value={specification.value}
                      onChange={(e) =>
                        handleSpecificationChange(
                          index,
                          "value",
                          e.target.value
                        )
                      }
                      className="md:col-span-3 w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200 bg-white"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeSpecificationField(
                          index
                        )
                      }
                      className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl px-4 py-3 transition"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                )
              )}

              <button
                type="button"
                onClick={addSpecificationField}
                className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-6 py-3 rounded-2xl transition"
              >
                <Plus size={18} />
                Add Specification
              </button>
            </div>
          </div>

          {/* AMENITIES */}
          <div className="p-8 border-b border-gray-100">
            <SectionTitle
              title="Amenities"
              icon={<FileText size={22} />}
            />

            <div className="mt-8">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Add amenity"
                  value={amenityInput}
                  onChange={(e) =>
                    setAmenityInput(
                      e.target.value
                    )
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500"
                />

                <button
                  type="button"
                  onClick={addAmenity}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold transition flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>

              {/* Amenities List */}
              <div className="flex flex-wrap gap-3 mt-6">
                {formData.amenities.map(
                  (amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full"
                    >
                      <span>{amenity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          removeAmenity(amenity)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* IMAGES */}
          <div className="p-8 border-b border-gray-100">
            <SectionTitle
              title="Property Images"
              icon={<ImagePlus size={22} />}
            />

            <div className="mt-8">
              <label className="border-2 border-dashed border-emerald-300 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 transition">
                <Upload
                  size={40}
                  className="text-emerald-500 mb-4"
                />

                <p className="text-lg font-semibold text-gray-700">
                  Upload Property Images
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  You can select multiple images
                </p>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* IMAGE PREVIEW */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative rounded-2xl overflow-hidden border bg-white shadow-sm"
                    >
                      <img
                        src={URL.createObjectURL(
                          image
                        )}
                        alt={`preview-${index}`}
                        className="w-full h-44 object-cover"
                      />

                      {/* REMOVE BUTTON */}
                      <button
                        type="button"
                        onClick={() =>
                          removeImage(index)
                        }
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition"
                      >
                        <Trash2 size={16} />
                      </button>

                      {/* FILE NAME */}
                      <div className="p-2 text-xs text-gray-600 truncate">
                        {image.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CONTACT */}
          <div className="p-8">
            <SectionTitle
              title="Contact Details"
              icon={<Phone size={22} />}
            />

            <div className="mt-8">
              <FormGroup label="Phone Number *">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="1212121212"
                  className={inputClass}
                  required
                />
              </FormGroup>
            </div>

            <div className="text-center mt-12">
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-10 py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50"
              >
                {loading
                  ? "Submitting..."
                  : "Create Property"}
              </button>

              <p className="text-sm text-gray-500 mt-5">
                Your property will be reviewed
                before publishing.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// =========================
// SECTION TITLE
// =========================

function SectionTitle({ title, icon }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        {title}
      </h2>
    </div>
  );
}

// =========================
// FORM GROUP
// =========================

function FormGroup({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>

      {children}
    </div>
  );
}

// =========================
// INPUT STYLE
// =========================

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all duration-200 bg-white";