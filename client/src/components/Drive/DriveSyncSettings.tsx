import { useEffect, useState } from "react";
import { getDriveSyncStatus, updateDriveSync } from "../../services/driveService";

const DriveSyncSettings = () => {
  // State to track if Drive sync is enabled
  const [syncEnabled, setSyncEnabled] = useState(false);

  // State to track if the app is connected to Google Drive
  const [isConnected, setIsConnected] = useState(false);

  // State for loading indicator during initial fetch
  const [loading, setLoading] = useState(true);

  // State for loading indicator during update
  const [updating, setUpdating] = useState(false);

  // Error and success messages
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch initial sync status when component mounts
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

  // Handle toggling the Drive sync setting
  const handleToggle = async () => {
    setUpdating(true);
    setError("");
    setMessage("");

    try {
      // Update the sync setting on the server
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

  // Show loading message while fetching status
  if (loading) return <p className="p-4 text-left">Loading Drive sync status...</p>;

  // Show error if failed to fetch
  if (error) return <p className="text-red-500 p-4 text-left">{error}</p>;

  return (
    <div className="p-6 rounded shadow max-w-md bg-white text-left">
      <h2 className="text-xl font-semibold mb-4">Google Drive Sync Settings</h2>

      {/* Display current connection and sync status */}
      <div className="mb-3">
        <p>
          Status:{" "}
          <span className={isConnected ? "text-green-600" : "text-red-600"}>
            {isConnected ? "Connected ✅" : "Not Connected ❌"}
          </span>
        </p>
        <p>
          Drive Sync:{" "}
          <span className={syncEnabled ? "text-green-600" : "text-gray-600"}>
            {syncEnabled ? "Enabled" : "Disabled"}
          </span>
        </p>
      </div>

      {/* Button to enable/disable sync */}
      <button
        onClick={handleToggle}
        disabled={updating || !isConnected}
        className={`px-5 py-2 rounded text-white transition-colors duration-300 ${
          syncEnabled
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
        } disabled:opacity-50`}
      >
        {updating
          ? "Updating..."
          : syncEnabled
          ? "Disable Drive Sync"
          : "Enable Drive Sync"}
      </button>

      {/* Display success or error message after update */}
      {message && <p className="text-green-600 mt-3">{message}</p>}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default DriveSyncSettings;
