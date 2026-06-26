import { useState } from 'react';
import { Bell, Save, Trash2 } from 'lucide-react';

export default function DashboardSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    propertyAlerts: true,
    priceDrops: true,
    newListings: false,
  });

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveNotifications = () => {
    // TODO: call your API to save notification preferences
    alert('Notification preferences saved!');
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmed) {
      // TODO: call your delete account API
      alert('Account deleted.');
    }
  };

  const notificationItems = [
    {
      key: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Receive updates via email',
    },
    {
      key: 'smsNotifications',
      title: 'SMS Notifications',
      description: 'Receive updates via SMS',
    },
    {
      key: 'propertyAlerts',
      title: 'Property Alerts',
      description: 'Get notified about saved properties',
    },
    {
      key: 'priceDrops',
      title: 'Price Drops',
      description: 'Alert when property prices drop',
    },
    {
      key: 'newListings',
      title: 'New Listings',
      description: 'Get notified about new properties',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account preferences</p>
        </div>

        {/* Notifications Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Bell size={18} />
            </div>
            <h2 className="text-base font-semibold text-gray-800">Notification Preferences</h2>
          </div>

          <div className="divide-y divide-gray-50">
            {notificationItems.map(({ key, title, description }) => (
              <div key={key} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-800">{title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                </div>

                {/* Toggle */}
                <button
                  type="button"
                  onClick={() => handleNotificationChange(key)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                    notifications[key] ? 'bg-emerald-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ${
                      notifications[key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-gray-100">
            <button
              onClick={handleSaveNotifications}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
            >
              <Save size={16} />
              Save Preferences
            </button>
          </div>
        </div>

  

      </div>
    </div>
  );
}