import { useEffect, useState } from "react";
import { getDriveSyncStatus, updateDriveSync } from "../../services/driveService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        toast.error("Failed to fetch sync status");
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
      const successMsg = data.message || "Drive sync setting updated";
      setMessage(successMsg);
      toast.success(successMsg, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
      });
    } catch (err) {
      console.error("Failed to update drive sync", err);
      const errorMsg = "Failed to update sync setting";
      setError(errorMsg);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-4 text-left">Loading Drive sync status...</p>;
  if (error) return <p className="text-red-500 p-4 text-left">{error}</p>;

  return (
    <div className="p-6 rounded shadow max-w-md bg-white text-center">
      <h2 className="text-xl font-semibold mb-4">Google Drive Sync Settings</h2>

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

      {message && <p className="text-green-600 mt-3">{message}</p>}
      {error && <p className="text-red-500 mt-3">{error}</p>}

      {/* Render toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default DriveSyncSettings;
