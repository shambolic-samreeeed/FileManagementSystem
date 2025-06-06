import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import ProfileDetails from "../components/Profile/ProfileDetails";

// Dummy content components
const AnalyticsContent = () => <div><h2 className="text-xl font-bold mb-4">Analytics</h2><p>Analytics data goes here.</p></div>;

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileDetails/>
      case "analytics":
        return <AnalyticsContent />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logged out");
  };

  return (
    <div>
      <NavBar />
      <div className="flex h-[calc(100vh-60px)]">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-100 p-4 flex flex-col gap-4 shadow-md">
          <button
            onClick={() => setActiveTab("profile")}
            className={`text-left px-4 py-2 rounded ${
              activeTab === "profile" ? "bg-blue-600 text-white" : "hover:bg-gray-200"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`text-left px-4 py-2 rounded ${
              activeTab === "analytics" ? "bg-blue-600 text-white" : "hover:bg-gray-200"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={handleLogout}
            className="text-left px-4 py-2 rounded text-red-600 hover:bg-red-100"
          >
            Logout
          </button>
        </div>

        {/* Content Area */}
        <div className="w-3/4 p-6 overflow-y-auto bg-white shadow-inner rounded">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
