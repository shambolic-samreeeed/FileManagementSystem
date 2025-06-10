import { useEffect, useState } from "react";
import { fetchAnalyticsSummary } from "../../services/fileUploadService";
import { useNavigate } from "react-router-dom";

const DisplayFiles = () => {
  const [totalFiles, setTotalFiles] = useState("0");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const response = await fetchAnalyticsSummary();
        setTotalFiles(response.data.totalFiles);
      } catch (err) {
        setError("Failed to load file count");
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);

  return (
    <div className="p-4 w-full max-w-md mt-6 bg-white shadow rounded-lg hover:shadow-md transition duration-300">
      <h1 className="text-xl font-bold text-center mb-3">Your Files</h1>

      <div className="flex flex-col gap-4 items-center">
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="text-center">
            <p className="text-gray-700">Total Files</p>
            <p className="text-3xl font-bold">{totalFiles}</p>
          </div>
        )}

        <button
          className="h-9 w-32 bg-blue-800 text-white font-semibold rounded hover:bg-blue-700 transition"
          onClick={() => nav("/files")}
        >
          View Files
        </button>
      </div>
    </div>
  );
};

export default DisplayFiles;
