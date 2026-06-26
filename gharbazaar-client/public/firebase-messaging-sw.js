importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAO8Q1Pd-XcxU9nwdyJ-kbLfSoYbSeWV0M",
  authDomain: "gharbazzar-f2793.firebaseapp.com",
  projectId: "gharbazzar-f2793",
  storageBucket: "gharbazzar-f2793.firebasestorage.app",
  messagingSenderId: "629336557945",
  appId: "1:629336557945:web:4a546cda8a797efedd87a8",
  measurementId: "G-6YJZ5G4S7X",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background Message:", payload);

  const title =
    payload.notification?.title || "New Notification";

  const options = {
    body: payload.notification?.body || "",
    icon: "/log.jpeg",
    badge: "/log.jpeg",
    data: payload.data || {},
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow("/")
  );
});