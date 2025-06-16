import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import ProfileDetails from "../components/Profile/ProfileDetails";
import Analytics from "../components/Profile/Analytics";

const LogoutConfirmation = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "white",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        zIndex: 1000,
        width: "90%",
        maxWidth: "300px",
      }}
    >
      <p className="mb-4 text-center">Are you sure you want to logout?</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-3 py-1 rounded border border-gray-400 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const nav = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileDetails />;
      case "analytics":
        return <Analytics />;
      default:
        return null;
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    Cookies.remove("token");
    Cookies.remove("email");
    nav("/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-col md:flex-row flex-1 h-[calc(100vh-60px)]">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-100 p-4 flex flex-row md:flex-col gap-2 md:gap-4 shadow-md overflow-x-auto md:overflow-x-visible">
          {/* Buttons container is horizontal scroll on mobile */}
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-shrink-0 md:flex-shrink md:block text-center md:text-left px-4 py-2 rounded ${
              activeTab === "profile"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex-shrink-0 md:flex-shrink md:block text-center md:text-left px-4 py-2 rounded ${
              activeTab === "analytics"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={handleLogoutClick}
            className="flex-shrink-0 md:flex-shrink md:block text-center md:text-left px-4 py-2 rounded text-red-600 hover:bg-red-100"
          >
            Logout
          </button>
        </div>

        {/* Content Area */}
        <div className="w-full md:w-3/4 p-4 md:p-6 overflow-y-auto bg-white shadow-inner rounded mt-4 md:mt-0">
          {renderContent()}
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <LogoutConfirmation
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </div>
  );
};

export default ProfilePage;
