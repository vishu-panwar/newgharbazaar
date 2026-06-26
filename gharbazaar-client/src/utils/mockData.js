// Mock Data for GharBazaar
// Use this when backend is not available

// Auto-login mock user for development
if (typeof window !== 'undefined' && !localStorage.getItem('user')) {
  const mockUser = {
    _id: "user123",
    id: "user123",
    fullName: "Demo User",
    name: "Demo User",
    email: "demo@gharbazaar.com",
    role: "client",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
  };
  localStorage.setItem('user', JSON.stringify(mockUser));
}

export const mockProperties = [
  {
    _id: "1",
    title: "Luxury 3BHK Apartment in Bandra",
    description: "Spacious 3BHK apartment with modern amenities and sea view",
    price: 25000000,
    propertyType: "residential",
    type: "apartment",
    bhkType: "3 BHK",
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    area: 1450,
    propertySpecifications: {
      bedroom: "03",
      bathroom: "03",
      area: "1450 sq.ft"
    },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
    ],
    amenities: ["Parking", "Swimming Pool", "Gym", "24/7 Security", "Sea View", "Balcony"],
    status: "Available",
    views: 245,
    forSale: true,
    forRent: false,
    broker: {
      _id: "b1",
      fullName: "Rajesh Kumar",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      phone: "+91 98765 43210"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "2",
    title: "Modern 2BHK in Koramangala",
    description: "Well-maintained apartment in prime location with all facilities",
    price: 15000000,
    propertyType: "residential",
    type: "apartment",
    bhkType: "2 BHK",
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    area: 1200,
    propertySpecifications: {
      bedroom: "02",
      bathroom: "02",
      area: "1200 sq.ft"
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
    ],
    amenities: ["Parking", "Power Backup", "Lift", "Security", "Balcony", "Modular Kitchen"],
    status: "Available",
    views: 125,
    forSale: true,
    forRent: true,
    rentAmount: 35000,
    broker: {
      _id: "b2",
      fullName: "Priya Sharma",
      profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      phone: "+91 98765 43211"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "3",
    title: "Spacious 4BHK Villa in Whitefield",
    description: "Independent villa with garden and parking space",
    price: 45000000,
    propertyType: "residential",
    type: "villa",
    bhkType: "4 BHK",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    area: 2800,
    propertySpecifications: {
      bedroom: "04",
      bathroom: "04",
      area: "2800 sq.ft"
    },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800"
    ],
    amenities: ["Garden", "Parking", "Gym", "Swimming Pool", "Club House", "Kids Play Area"],
    status: "Available",
    views: 189,
    forSale: true,
    forRent: false,
    broker: {
      _id: "b3",
      fullName: "Amit Patel",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      phone: "+91 98765 43212"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "7",
    title: "Beautiful Independent House in Pune",
    description: "3 storey independent house with modern amenities",
    price: 32000000,
    propertyType: "residential",
    type: "independent house",
    bhkType: "4 BHK",
    location: "Koregaon Park, Pune",
    city: "Pune",
    area: 2200,
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"
    ],
    amenities: ["Parking", "Garden", "Terrace", "Water Tank"],
    status: "verified",
    forSale: true,
    forRent: false,
    broker: {
      _id: "b7",
      fullName: "Anita Desai",
      profilePicture: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
      phone: "+91 98765 43216"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "8",
    title: "Modern PG for Boys in HSR Layout",
    description: "Fully furnished PG with AC rooms, WiFi, and meals included",
    price: 12000,
    propertyType: "PG/Hostel",
    type: "pg/hostel",
    location: "HSR Layout, Bangalore",
    city: "Bangalore",
    area: 150,
    propertySpecifications: {
      bedroom: "01",
      bathroom: "01",
      area: "150 sq.ft"
    },
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"
    ],
    amenities: ["WiFi", "Meals", "AC", "Laundry", "Parking", "Hot Water"],
    status: "Available",
    views: 98,
    forSale: false,
    forRent: true,
    rentAmount: 12000,
    broker: {
      _id: "b8",
      fullName: "Karthik Reddy",
      profilePicture: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
      phone: "+91 98765 43217"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "9",
    title: "Premium Girls Hostel in Indiranagar",
    description: "Safe and comfortable hostel for working women and students",
    price: 15000,
    propertyType: "PG/Hostel",
    type: "hostel",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    area: 120,
    propertySpecifications: {
      bedroom: "01",
      bathroom: "01",
      area: "120 sq.ft"
    },
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800"
    ],
    amenities: ["WiFi", "Meals", "AC", "Security", "Gym", "Common Area", "CCTV"],
    status: "Available",
    views: 156,
    forSale: false,
    forRent: true,
    rentAmount: 15000,
    broker: {
      _id: "b9",
      fullName: "Meera Nair",
      profilePicture: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400",
      phone: "+91 98765 43218"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "10",
    title: "Affordable PG Near Electronic City",
    description: "Budget-friendly PG with basic amenities for students",
    price: 8000,
    propertyType: "PG/Hostel",
    type: "pg",
    location: "Electronic City, Bangalore",
    city: "Bangalore",
    area: 100,
    propertySpecifications: {
      bedroom: "01",
      bathroom: "01",
      area: "100 sq.ft"
    },
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800"
    ],
    amenities: ["WiFi", "Meals", "Laundry", "Common Kitchen", "Hot Water", "Geyser"],
    status: "Available",
    views: 67,
    forSale: false,
    forRent: true,
    rentAmount: 8000,
    broker: {
      _id: "b10",
      fullName: "Ramesh Kumar",
      profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      phone: "+91 98765 43219"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "13",
    title: "Luxury PG with Gym in Marathahalli",
    description: "Premium PG facility with gym, swimming pool, and 24/7 security",
    price: 18000,
    propertyType: "PG/Hostel",
    type: "pg/hostel",
    location: "Marathahalli, Bangalore",
    city: "Bangalore",
    area: 180,
    propertySpecifications: {
      bedroom: "01",
      bathroom: "01",
      area: "180 sq.ft"
    },
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"
    ],
    amenities: ["WiFi", "Meals", "AC", "Gym", "Swimming Pool", "Parking", "Security", "Power Backup"],
    status: "Available",
    views: 203,
    forSale: false,
    forRent: true,
    rentAmount: 18000,
    broker: {
      _id: "b13",
      fullName: "Arjun Sharma",
      profilePicture: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
      phone: "+91 98765 43222"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "14",
    title: "Comfortable Hostel in BTM Layout",
    description: "Well-maintained hostel for students with study room and library",
    price: 10000,
    propertyType: "PG/Hostel",
    type: "hostel",
    location: "BTM Layout, Bangalore",
    city: "Bangalore",
    area: 130,
    propertySpecifications: {
      bedroom: "01",
      bathroom: "01",
      area: "130 sq.ft"
    },
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=800",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800"
    ],
    amenities: ["WiFi", "Meals", "Study Room", "Library", "Laundry", "Common Area", "Hot Water"],
    status: "Available",
    views: 87,
    forSale: false,
    forRent: true,
    rentAmount: 10000,
    broker: {
      _id: "b14",
      fullName: "Deepa Iyer",
      profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      phone: "+91 98765 43223"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "4",
    title: "Commercial Office Space in Cyber City",
    description: "Premium office space with modern infrastructure",
    price: 35000000,
    propertyType: "Commercial Space",
    type: "Commercial Space",
    location: "Cyber City, Gurgaon",
    city: "Gurgaon",
    area: 2000,
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"
    ],
    amenities: ["AC", "Lift", "Parking", "Conference Room", "Cafeteria"],
    status: "verified",
    forSale: true,
    forRent: true,
    rentAmount: 150000,
    broker: {
      _id: "b4",
      fullName: "Neha Verma",
      profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      phone: "+91 98765 43213"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "5",
    title: "Residential Plot in Sector 21",
    description: "Prime residential plot ready for construction",
    price: 18000000,
    propertyType: "Plot/Land",
    type: "Plot/Land",
    location: "Sector 21, Noida",
    city: "Noida",
    area: 3000,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800"
    ],
    amenities: ["Clear Title", "Water Connection", "Electricity"],
    status: "verified",
    forSale: true,
    forRent: false,
    broker: {
      _id: "b5",
      fullName: "Suresh Reddy",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      phone: "+91 98765 43214"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "6",
    title: "Luxury Penthouse in Lower Parel",
    description: "Stunning penthouse with panoramic city views",
    price: 85000000,
    propertyType: "Luxury Homes",
    type: "Luxury Homes",
    bhkType: "5 BHK",
    location: "Lower Parel, Mumbai",
    city: "Mumbai",
    area: 4500,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
    ],
    amenities: ["Private Pool", "Terrace Garden", "Home Theater", "Smart Home", "Concierge"],
    status: "verified",
    forSale: true,
    forRent: false,
    broker: {
      _id: "b6",
      fullName: "Vikram Singh",
      profilePicture: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
      phone: "+91 98765 43215"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "11",
    title: "Cozy 1BHK in Malad",
    description: "Perfect for singles or couples, well-connected area",
    price: 8500000,
    propertyType: "residential",
    type: "apartment",
    bhkType: "1 BHK",
    location: "Malad West, Mumbai",
    city: "Mumbai",
    area: 650,
    images: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
    ],
    amenities: ["Parking", "Lift", "Security"],
    status: "verified",
    forSale: true,
    forRent: true,
    rentAmount: 18000,
    broker: {
      _id: "b11",
      fullName: "Ravi Joshi",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      phone: "+91 98765 43220"
    },
    createdAt: new Date().toISOString()
  },
  {
    _id: "12",
    title: "Premium Office in Connaught Place",
    description: "Prime location office space in heart of Delhi",
    price: 55000000,
    propertyType: "Commercial Space",
    type: "Commercial Space",
    location: "Connaught Place, Delhi",
    city: "Delhi",
    area: 2500,
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800"
    ],
    amenities: ["AC", "Lift", "Conference Room", "Parking", "Cafeteria"],
    status: "verified",
    forSale: true,
    forRent: true,
    rentAmount: 250000,
    broker: {
      _id: "b12",
      fullName: "Sanjay Gupta",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      phone: "+91 98765 43221"
    },
    createdAt: new Date().toISOString()
  }
];


export const mockCategories = {
  residential: [
    {
      _id: "c1",
      title: "Flat and Apartments",
      images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500"]
    },
    {
      _id: "c2",
      title: "Studio Apartments",
      images: ["https://images.unsplash.com/photo-1494526585095-c41746248156?w=500"]
    },
    {
      _id: "c3",
      title: "Independent House",
      images: ["https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=500"]
    },
    {
      _id: "c4",
      title: "Builder Floors",
      images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500"]
    }
  ],
  "Commercial Space": [
    {
      _id: "c5",
      title: "Office Space",
      images: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500"]
    },
    {
      _id: "c6",
      title: "Retail Shops",
      images: ["https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500"]
    }
  ]
};

export const mockUser = {
  _id: "user123",
  id: "user123",
  fullName: "Demo User",
  name: "Demo User",
  email: "demo@gharbazaar.com",
  role: "client",
  profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
};

export const mockAdvertisements = [
  {
    _id: "ad1",
    image: "/banner1.jpg",
    title: "Find Your Dream Home",
    link: "/properties"
  },
  {
    _id: "ad2",
    image: "/banner2.jpg",
    title: "Premium Properties",
    link: "/luxury-homes"
  },
  {
    _id: "ad3",
    image: "/banner3.jpg",
    title: "Commercial Spaces",
    link: "/commercial-properties"
  }
];

// Helper function to simulate API delay
export const simulateDelay = (ms = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockAPI = {
  getProperties: async () => {
    await simulateDelay();
    return { data: mockProperties, success: true };
  },
  
  getPropertyById: async (id) => {
    await simulateDelay();
    const property = mockProperties.find(p => p._id === id);
    return { data: property, success: !!property };
  },
  
  getCategories: async (type) => {
    await simulateDelay();
    return { 
      data: mockCategories[type] || [], 
      success: true 
    };
  },
  
  getAdvertisements: async () => {
    await simulateDelay();
    return { data: mockAdvertisements, success: true };
  }
};
