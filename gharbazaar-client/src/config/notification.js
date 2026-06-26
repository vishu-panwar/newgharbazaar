import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

export const requestNotificationPermission = async () => {
  // Skip if Firebase is not configured
  if (!messaging) {
    console.log("Firebase messaging not configured - notifications disabled");
    return null;
  }

  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    console.log("FCM TOKEN:", token);

    return token;
  } catch (error) {
    console.error("FCM Error:", error);
    return null;
  }
};
