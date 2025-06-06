import React, { useEffect, useState } from "react";
import { getDetailedAnalytics, getAnalyticsSummary  } from "../../services/analyticsService";

const Analytics = () => {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [detailed, setDetailed] = useState<DetailedAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [summaryRes, detailedRes] = await Promise.all([
          getAnalyticsSummary(),
          getDetailedAnalytics(),
        ]);

        setSummary(summaryRes);
        setDetailed(detailedRes);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
  };

  if (loading) return <p className="p-6">Loading analytics...</p>;

  if (!summary) return <p className="p-6 text-red-600">Failed to load analytics summary.</p>;

  return (
    <div className="p-6 space-y-8">
      {/* Summary Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Analytics Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h3 className="font-semibold">Total Files</h3>
            <p>{summary.totalFiles}</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h3 className="font-semibold">Total Folders</h3>
            <p>{summary.totalFolders}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded shadow">
            <h3 className="font-semibold">Total Storage</h3>
            <p>{formatBytes(summary.totalStorage)}</p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-2">Most Accessed Files</h3>
        <div className="space-y-3">
          {summary.mostAccessedFiles && summary.mostAccessedFiles.length > 0 ? (
            summary.mostAccessedFiles.map((file, idx) => (
              <div key={idx} className="p-4 bg-white border rounded shadow">
                <p><strong>Name:</strong> {file.fileName}</p>
                <p><strong>Downloads:</strong> {file.downloadCount}</p>
                <p><strong>Uploaded:</strong> {new Date(file.uploadDate).toLocaleString()}</p>
                <p><strong>Access:</strong> {file.accessLevel}</p>
                {file.googleDrive?.link && (
                  <a
                    href={file.googleDrive.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View on Google Drive
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="italic text-gray-500">No accessed files available.</p>
          )}
        </div>
      </div>

      {/* Detailed Logs Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Detailed Endpoint Hits</h2>
        {Array.isArray(detailed) && detailed.length > 0 ? (
          <table className="w-full table-auto border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">User</th>
                <th className="border px-4 py-2 text-left">Endpoint</th>
                <th className="border px-4 py-2 text-left">Hit Count</th>
                <th className="border px-4 py-2 text-left">Last Access</th>
              </tr>
            </thead>
            <tbody>
              {detailed.map((log, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{log.user}</td>
                  <td className="border px-4 py-2">{log.endpoint}</td>
                  <td className="border px-4 py-2">{log.hitCount}</td>
                  <td className="border px-4 py-2">{new Date(log.lastHit).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="italic text-gray-500">No detailed logs available.</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;
