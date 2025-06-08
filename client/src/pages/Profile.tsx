import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import ProfileDetails from "../components/Profile/ProfileDetails";
import Analytics from "../components/Profile/Analytics";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const nav = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileDetails/>
      case "analytics":
        return <Analytics/>
      default:
        return null;
    }
  };


    const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("email");
    nav('/login')
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
