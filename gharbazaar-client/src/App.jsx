import { Provider } from "react-redux";
import { store } from "./store/store";
import { CartProvider } from "./context/CartContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";
import AppContent from "./AppContent";

export default function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  return (
    <HelmetProvider>
      <GoogleOAuthProvider clientId={googleClientId}>
        <Provider store={store}>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </Provider>
      </GoogleOAuthProvider>
    </HelmetProvider>
  );
}