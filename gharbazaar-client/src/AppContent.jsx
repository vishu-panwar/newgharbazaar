import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { Suspense, lazy, useMemo, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

import { socket } from "./socket/socket";
/* ───────── COMMON COMPONENTS (LAZY) ───────── */

const Navbar = lazy(() => import("./components/common/Navbar"));
const Footer = lazy(() => import("./components/common/Footer"));
const ScrollToTop = lazy(() => import("./components/common/ScrollToTop"));

/* ───────── TOAST ───────── */

import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./pages/authenticate/ProtectedRoute";
import AdminLayout from "./pages/adminDashboard/AdminLayout";
import AdminDashboard from "./pages/adminDashboard/dashboard/AdminDashboard";
import { requestNotificationPermission } from "./config/notification";
import axios from "axios";
import CouponGenerator from "./pages/employeDashBoard/couponGenearate/CouponGenerator";

/* ───────── MAIN PAGES ───────── */

const Home = lazy(() => import("./pages/Home/Home"));
const Services = lazy(() => import("./pages/Services"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const Pricing = lazy(() => import("./pages/pricing/Pricing"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/authenticate/Login"));
const Register = lazy(() => import("./pages/authenticate/Register"));
const OtpVerify = lazy(() => import("./pages/authenticate/OtpVerify"));
const Favorites = lazy(() => import("./pages/favourite/Favorites"));
const PropertyDetails = lazy(
  () => import("./pages/properties/PropertyDetailsWrapper"),
);
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const AllProperties = lazy(() => import("./pages/AllProperties"));
const Properties = lazy(() => import("./pages/properties/Properties"));
const PGHostels = lazy(() => import("./pages/PGHostels"));
const TrendingProperties = lazy(() => import("./pages/TrendingProperties"));
const BrokerProfile = lazy(() => import("./pages/BrokerProfile"));
const PostRequirement = lazy(() => import("./pages/PostRequirement"));
const ResidentialProperties = lazy(
  () => import("./pages/ResidentialProperties"),
);
const CommercialProperties = lazy(() => import("./pages/CommercialProperties"));
const PlotsLand = lazy(() => import("./pages/PlotsLand"));
const LuxuryHomes = lazy(() => import("./pages/LuxuryHomes"));
const CallPlans = lazy(() => import("./pages/CallPlans"));
const CategoriesPage = lazy(() => import("./pages/properties/CategoriesPage"));
const NotFoundPage = lazy(() => import("./pages/Not Found/Not404"));

/* ───────── DASHBOARD ───────── */

const DashboardLayout = lazy(() => import("./pages/dashboard/DashboardLayout"));

const Dashboard = lazy(() => import("./pages/dashboard/dashboard/Dashboard"));

const ListProperty = lazy(
  () => import("./pages/dashboard/listproperty/ListProperty"),
);

const MyListings = lazy(
  () => import("./pages/dashboard/listproperty/MyListings"),
);

const DashboardPayments = lazy(() => import("./pages/DashboardPayments"));

const DashboardSettings = lazy(() => import("./pages/DashboardSettings"));

const KYCVerification = lazy(
  () => import("./pages/dashboard/kyc/KYCVerification"),
);

const MyProposals = lazy(() => import("./pages/MyProposals"));

const ProposalDetails = lazy(() => import("./pages/ProposalDetails"));

const Messages = lazy(() => import("./pages/employeDashBoard/messages/Messages"));

/* ───────── SELLER ───────── */

const SellerLogin = lazy(() => import("./pages/seller/SellerLogin"));

const SellerRegister = lazy(() => import("./pages/seller/SellerRegister"));

const SellerLayout = lazy(() => import("./components/SellerLayout"));

const PropertyDashboard = lazy(
  () => import("./pages/seller/PropertyDashboard"),
);

const ServiceDashboard = lazy(() => import("./pages/seller/ServiceDashboard"));

const ProductDashboard = lazy(() => import("./pages/seller/ProductDashboard"));

/* ───────── EMPLOYEE ───────── */

const EmployeeLayout = lazy(
  () => import("./pages/employeDashBoard/EmployeeLayout"),
);

const EmployeeDashboard = lazy(
  () => import("./pages/employeDashBoard/dashboard/EmployeeDashboard"),
);

const PendingKYC = lazy(
  () => import("./pages/employeDashBoard/kyc/PendingKYC"),
);

const EmployeeKYC = lazy(
  () => import("./pages/employeDashBoard/kyc/EmployeeKYC"),
);

const ManageProperties = lazy(
  () => import("./pages/employeDashBoard/properties/ManageProperties"),
);

const ListingControl = lazy(
  () =>
    import("./pages/employeDashBoard/Property Listing Control Centre/ListingControl"),
);

export default function AppContent() {
  const location = useLocation();

  const hideFooterRoutes = useMemo(
    () => ["/login", "/register", "/properties"],
    [],
  );

  const isInternalLayout = useMemo(() => {
    return (
      location.pathname.startsWith("/dashboard") ||
      location.pathname.startsWith("/seller/dashboard") ||
      location.pathname.startsWith("/employee")||
      location.pathname.startsWith("/admin")
    );
  }, [location.pathname]);

 const user = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
  const joinRoom = () => {
    if (!user?.id) return;

    socket.emit("join", {
      userId: user.id,
      role: user.role,
    });

    console.log("Joined room:", user.id);
  };

  if (socket.connected) {
    joinRoom();
  }

  socket.on("connect", joinRoom);

  return () => {
    socket.off("connect", joinRoom);
  };
}, [user?.id]);

useEffect(() => {
  const syncFCM = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;
    console.log("user show",user)

    const newToken = await requestNotificationPermission();
    if (!newToken) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/save-fcm-token`,
        { token: newToken },
        { withCredentials: true }
      );

      const updatedUser = {
        ...user,
        fcmToken: newToken,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error(error);
    }
  };

  syncFCM();
}, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        newestOnTop
      />

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen font-bold text-green-600">
            Loading...
          </div>
        }
      >
        {!isInternalLayout && <Navbar />}

        <ScrollToTop />

        <Routes>
          {/* MAIN ROUTES */}

          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpverify" element={<OtpVerify />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categoryProperty" element={<CategoriesPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/services" element={<Services />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/all-properties" element={<AllProperties />} />
          <Route path="/pg-hostels" element={<PGHostels />} />
          <Route path="/trending-properties" element={<TrendingProperties />} />
          <Route path="/broker-profile/:id" element={<BrokerProfile />} />
          <Route path="/post-requirement" element={<PostRequirement />} />
          <Route
            path="/residential-properties"
            element={<ResidentialProperties />}
          />
          <Route
            path="/commercial-properties"
            element={<CommercialProperties />}
          />
          <Route path="/plots-land" element={<PlotsLand />} />
          <Route path="/luxury-homes" element={<LuxuryHomes />} />
          <Route path="/call-plans" element={<CallPlans />} />

          {/* DASHBOARD */}

          <Route
            element={
              // ✅ Fixed: was ["user", "admin"] — "user" role doesn't exist
              <ProtectedRoute allowedRoles={["client", "admin"]} />
            }
          >
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="list-property" element={<ListProperty />} />
              <Route path="my-listings" element={<MyListings />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="cart" element={<Cart />} />
              <Route path="payments" element={<DashboardPayments />} />
              <Route path="kyc-verification" element={<KYCVerification />} />
              <Route path="proposals" element={<MyProposals />} />
              <Route path="proposals/:id" element={<ProposalDetails />} />
              <Route path="messages" element={<Messages />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>
          </Route>

          {/* SELLER */}

          <Route path="/seller/login" element={<SellerLogin />} />

          <Route path="/seller/register" element={<SellerRegister />} />

          <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
            <Route path="/seller/dashboard" element={<SellerLayout />}>
              <Route index element={<Navigate to="property" replace />} />

              <Route path="property" element={<PropertyDashboard />} />

              <Route path="service" element={<ServiceDashboard />} />

              <Route path="product" element={<ProductDashboard />} />
            </Route>
          </Route>

          {/* EMPLOYEE */}

          <Route
            element={<ProtectedRoute allowedRoles={["employee", "admin"]} />}
          >
            <Route path="/employee" element={<EmployeeLayout />}>
              <Route index element={<EmployeeDashboard />} />

              <Route path="pending-kyc" element={<PendingKYC />} />

              <Route path="kyc-verification" element={<EmployeeKYC />} />
              <Route path="messages" element={<Messages />} />
              <Route path="coupon-generate" element={<CouponGenerator />} />
              <Route
                path="property-verification"
                element={<ManageProperties />}
              />

              <Route path="EmployeeListingPanel" element={<ListingControl />} />
            </Route>
          </Route>

           {/* admin */}

          <Route
            element={<ProtectedRoute allowedRoles={["admin"]} />}
          >
            <Route path="/admin" element={<AdminLayout/>}>
              <Route index element={<AdminDashboard/>} />
              <Route path="pending-kyc" element={<PendingKYC />} />
            </Route>
          </Route>

          {/* 404 */}

          <Route path="/NotFound" element={<NotFoundPage />} />

          <Route path="*" element={<Navigate to="/NotFound" replace />} />
        </Routes>

        {!isInternalLayout && !hideFooterRoutes.includes(location.pathname) && (
          <Footer />
        )}
      </Suspense>
    </>
  );
}
