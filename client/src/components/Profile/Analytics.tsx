import { useEffect, useState } from "react";
import { fetchAnalyticsSummary } from "../../services/fileUploadService";

const Analytics = () => {
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [totalStorage, setTotalStorage] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const response = await fetchAnalyticsSummary(); 
        setTotalFiles(response.data.totalFiles ?? 0);
        setTotalStorage(response.data.totalStorage ?? 0);
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics summary.");
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    if (bytes >= 1024) return (bytes / 1024).toFixed(2) + " KB";
    return bytes + " B";
  };

  return (
  <div className="p-4 w-full max-w-md mx-auto mt-6 bg-white shadow rounded-lg hover:shadow-md transition duration-300">
    <h1 className="text-xl font-bold text-center mb-4">Analytics Summary</h1>

    {loading ? (
      <p className="text-gray-600 text-center">Loading...</p>
    ) : error ? (
      <p className="text-red-500 text-center">{error}</p>
    ) : (
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-gray-700">Total Files</p>
          <p className="text-3xl font-bold">{totalFiles}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-700">Total Storage Used</p>
          <p className="text-2xl font-semibold">
            {formatSize(totalStorage)}
          </p>
        </div>
      </div>
    )}
  </div>
);
};

export default Analytics;
