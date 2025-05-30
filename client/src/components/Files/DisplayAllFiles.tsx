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

        // Ensure response is always an array
        if (Array.isArray(response)) {
          setFiles(response);
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

  if (loading) return <p className="text-center mt-10">🔄 Loading files...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6"> Your Uploaded Files</h2>
      {files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        <ul className="space-y-4">
          {files.map((file, index) => (
            <li
              key={index}
              className="bg-white shadow p-4 rounded border border-gray-200"
            >
              <p>
                <strong> Name:</strong> {file.fileName}
              </p>
              <p>
                <strong> Type:</strong> {file.mimeType}
              </p>
              <p>
                <strong> Size:</strong> {(file.size / (1024 * 1024)).toFixed(2)}{" "}
                MB
              </p>
              <p>
                <strong> Uploaded:</strong>{" "}
                {new Date(file.uploadDate).toLocaleString()}
              </p>
              <a
                href={file.path}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-800 py-1 text-white rounded-sm px-4"
              >
                 Open File
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayAllFiles;
