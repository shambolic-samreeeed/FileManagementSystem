import { useEffect, useState } from "react";
import { fetchFiles } from "../../services/fileUploadService";

interface FileItem {
  fileName: string;
  path: string;
  size: number;
  uploadDate: string;
  mimeType: string;
}

const DisplayAllFiles = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await fetchFiles();
        console.log("API response:", response);

        if (Array.isArray(response)) {
          const sortedFiles = response.sort(
            (a, b) =>
              new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
          );
          setFiles(sortedFiles);
        } else {
          console.error("Unexpected response:", response);
          setError("Failed to load files. Try again later.");
        }
      } catch (err) {
        console.error("Error fetching files:", err);
        setError("Failed to fetch files. Are you logged in?");
      } finally {
        setLoading(false);
      }
    };

    getFiles();
  }, []);

  const isImage = (mimeType: string) => mimeType.startsWith("image/");

  const handleFileClick = (file: FileItem) => {
    if (file.path) {
      const fileUrl = `http://localhost:5000/${file.path.replace(/\\/g, "/")}`;
      window.open(fileUrl, "_blank");
    } else {
      alert("File path is missing. Cannot open file.");
    }
  };

  if (loading) return <p className="text-center mt-10">🔄 Loading files...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Recent Uploads</h2>
      {files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        <ul className="space-y-4">
          {files.map((file, index) => (
            <li
              key={index}
              onClick={() => handleFileClick(file)}
              className="bg-white shadow p-4 rounded border hover:shadow-2xl cursor-pointer transition border-gray-200"
              title="Click to open file in new tab"
            >
              <p>
                <strong>Name:</strong> {file.fileName}
              </p>
              <p>
                <strong>Type:</strong> {file.mimeType}
              </p>
              <p>
                <strong>Size:</strong> {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <p>
                <strong>Uploaded:</strong> {new Date(file.uploadDate).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayAllFiles;
