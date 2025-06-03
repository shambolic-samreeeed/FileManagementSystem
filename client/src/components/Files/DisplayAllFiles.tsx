import { useEffect, useState } from "react";
import { FaFileImage } from "react-icons/fa6";
import Cookies from "js-cookie";
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
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");

  useEffect(() => {
    const getFiles = async () => {
      try {
        const fileResponse = await fetchFiles();

        if (Array.isArray(fileResponse)) {
          const sortedFiles = fileResponse.sort(
            (a, b) =>
              new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
          );
          setFiles(sortedFiles);
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

  // Clean up object URL on unmount or when previewImageUrl changes
  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  const isImage = (mimeType: string) => mimeType.startsWith("image/");

  const handleFileClick = async (file: FileItem) => {
    if (isImage(file.mimeType)) {
      try {
        const token = Cookies.get("token");
        const url = `http://localhost:5000/file/download/name/${encodeURIComponent(
          file.fileName
        )}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setPreviewImageUrl(imageUrl);
      } catch (err: any) {
        alert("Cannot preview image: " + err.message);
      }
    } else {
      alert("Preview not available for this file type.");
    }
  };

  if (loading) return <p className="text-center mt-10">🔄 Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">📄 Recent Uploads</h2>
      {files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        <ul className="space-y-4">
          {files.map((file, index) => (
            <li
              key={index}
              onClick={() => handleFileClick(file)}
              className="bg-white shadow p-4 rounded border hover:shadow-2xl cursor-pointer transition border-gray-200"
              title="Click to open file preview"
            >
              <div className="flex items-center gap-2 mb-2">
                {isImage(file.mimeType) ? (
                  <FaFileImage className="text-blue-500" />
                ) : (
                  <FaFileImage className="text-gray-400" />
                )}
                <span className="font-semibold">{file.fileName}</span>
              </div>
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

      {/* Image preview modal */}
      {previewImageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative bg-white rounded p-4 max-w-[90vw] max-h-[90vh]">
            <button
              onClick={() => setPreviewImageUrl("")}
              className="absolute top-1 right-2 text-black text-3xl font-bold hover:text-red-600"
              aria-label="Close preview"
            >
              &times;
            </button>
            <img
              src={previewImageUrl}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayAllFiles;
