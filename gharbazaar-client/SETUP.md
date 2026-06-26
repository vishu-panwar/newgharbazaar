# GharBazaar Client Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd gharbazaarprivatelimited-main/gharbazaar-client
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will run at: **http://localhost:5173/**

---

## 📝 Configuration

### Environment Variables

Create a `.env` file in the `gharbazaar-client` directory with the following variables:

```env
# Backend API URL
VITE_BASE_URL=http://localhost:3000

# Google OAuth (Optional - for login functionality)
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here

# Firebase Configuration (Optional - for notifications)
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_FIREBASE_VAPID_KEY=your-vapid-key-here
```

---

## 🎭 Mock Data Mode

**Good News!** The app now supports **mock data mode** - so you can run the frontend **without a backend server!**

### How It Works

The app automatically detects if:
- `VITE_BASE_URL` is not set, OR
- `VITE_BASE_URL` is set to `http://localhost:3000` (and backend is not running)

In these cases, the app will use **mock data** instead of making real API calls.

### What's Included in Mock Data

✅ **12+ Sample Properties** including:
- Luxury apartments (Mumbai, Bangalore, Delhi)
- Villas and independent houses  
- Commercial spaces (Gurgaon, Delhi)
- Residential plots
- PG/Hostels (Bangalore)
- Luxury homes

✅ **Hero Banners** - 4 sample advertisements
✅ **Property Categories** - All major categories with sample images
✅ **Realistic Data** - Complete property details with images, amenities, broker info
✅ **Filtering Support** - Filter by city, property type
✅ **Pagination** - Proper pagination with 8 items per page
✅ **Search** - Client-side search by title, city, location

### Files Modified for Mock Data

1. **`src/utils/mockData.js`** - Central mock data repository
2. **`src/store/propertyQuery/getPropertyQuery.js`** - Property API with mock fallback
3. **`src/store/HeroSectionQuery/getAdvertismentQuery.js`** - Advertisements API with mock fallback

### Switching Between Mock and Real API

**To use MOCK data** (no backend needed):
```env
VITE_BASE_URL=http://localhost:3000
```

**To use REAL backend API**:
```env
VITE_BASE_URL=http://your-backend-url:port
```

---

## 🏗️ Project Structure

```
gharbazaar-client/
├── public/              # Static assets (images, banners, etc.)
├── src/
│   ├── components/      # React components
│   │   ├── common/      # Navbar, Footer, etc.
│   │   └── Home/        # Home page components
│   ├── pages/           # Page components
│   ├── store/           # Redux store & RTK Query
│   ├── utils/           # Utility functions & mock data
│   ├── App.jsx          # Main App component
│   └── main.jsx         # Entry point
├── .env                 # Environment variables
└── package.json         # Dependencies
```

---

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🐛 Troubleshooting

### White Screen Issue
If you see a white screen:

1. **Check Browser Console** (F12) for errors
2. **Verify `.env` file exists** with correct variables
3. **Restart dev server** after changing `.env`
4. **Clear browser cache** and hard reload (Ctrl+Shift+R)

### Mock Data Not Loading
- Ensure `VITE_BASE_URL` is set to `http://localhost:3000` or left empty
- Check browser console for any JavaScript errors
- Restart the development server

### Backend Connection Issues
- Ensure backend server is running on the correct port
- Update `VITE_BASE_URL` in `.env` to match backend URL
- Check CORS settings on backend

---

## 📦 Dependencies

### Core
- **React 19** - UI library
- **Vite 8** - Build tool
- **React Router v7** - Routing
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Additional
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **Firebase** - Push notifications
- **React Toastify** - Toast notifications

---

## 🎨 Features

✨ **Modern UI** with glassmorphism effects
✨ **Responsive Design** - Mobile, tablet, and desktop
✨ **Property Listings** - Browse, filter, and search
✨ **User Authentication** - Login/Register with Google OAuth
✨ **Dashboard** - List properties, manage listings
✨ **Real-time Notifications** - Socket.io & Firebase
✨ **Mock Data Support** - Run without backend

---

## 🔐 Security Notes

- Never commit `.env` file to version control
- Keep API keys and secrets secure
- Use environment variables for sensitive data
- Mock data is for development only

---

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

---

## 💡 Tips

1. **Hot Module Replacement (HMR)** is enabled - changes reflect instantly
2. Use **React DevTools** extension for debugging
3. Check **Network tab** to see API calls
4. Mock data auto-delays responses by 500ms to simulate real API

---

## 🤝 Need Help?

- Check browser console for errors
- Ensure all dependencies are installed
- Verify `.env` configuration
- Try clearing `node_modules` and reinstalling: `rm -rf node_modules && npm install`

---

**Happy Coding! 🚀**
