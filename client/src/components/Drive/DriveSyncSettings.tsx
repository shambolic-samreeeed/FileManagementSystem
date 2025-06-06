import { useEffect, useState } from "react";
import { getDriveSyncStatus, updateDriveSync } from "../../services/driveService";

const DriveSyncSettings = () => {
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getDriveSyncStatus();
        setSyncEnabled(data.syncEnabled);
        setIsConnected(data.isConnected);
        setError("");
      } catch (err) {
        console.error("Failed to fetch drive sync status", err);
        setError("Failed to fetch sync status");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const handleToggle = async () => {
    setUpdating(true);
    setError("");
    setMessage("");

    try {
      const data = await updateDriveSync(!syncEnabled);
      setSyncEnabled(data.data.syncEnabled);
      setMessage(data.message || "Drive sync setting updated");
    } catch (err) {
      console.error("Failed to update drive sync", err);
      setError("Failed to update sync setting");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-4">Loading Drive sync status...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="p-6  rounded shadow  max-w-md">
      <h2 className="text-xl font-semibold mb-4">Google Drive Sync Settings</h2>
      <p className="mb-2">Status: {isConnected ? "Connected ✅" : "Not Connected ❌"}</p>
      <p className="mb-4">Drive Sync: {syncEnabled ? "Enabled" : "Disabled"}</p>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={syncEnabled}
          onChange={handleToggle}
          disabled={updating || !isConnected}
        />
        <div
          className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ${
            (syncEnabled && isConnected) ? "bg-blue-600" : ""
          } ${!isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
              syncEnabled ? "translate-x-5" : ""
            }`}
          ></div>
        </div>
        <span className="ml-3 text-sm">
          {updating
            ? "Updating..."
            : syncEnabled
            ? "Disable Drive Sync"
            : "Enable Drive Sync"}
        </span>
      </label>

      {message && <p className="text-green-600 mt-3">{message}</p>}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default DriveSyncSettings;
