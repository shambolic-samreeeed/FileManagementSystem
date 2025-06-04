import { useEffect, useState } from "react";
import { FaFileImage } from "react-icons/fa6";
import Cookies from "js-cookie";
import { fetchFiles } from "../../services/fileUploadService";

interface FileItem {
  _id: string; // add this for stable keys
  fileName: string;
  path: string;
  size: number;
  uploadDate: string;
  mimeType: string;
  googleDrive?: {
    fileId: string;
    link: string; 
    syncStatus: string;
  };
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
        console.log("full file response", fileResponse);

        if (Array.isArray(fileResponse)) {
          const sortedFiles = fileResponse.sort(
            (a, b) =>
              new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
          );
          setFiles(sortedFiles);

          sortedFiles.forEach((file) => {
            if (file.googleDrive?.link) {
              console.log(`Drive link for ${file.fileName}: ${file.googleDrive.link}`);
            }
          });
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

  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  const isImage = (mimeType: string) => mimeType.startsWith("image/");

  const handleFileClick = async (file: FileItem) => {
    if (file.googleDrive?.link) {
      // Open Google Drive link in new tab
      window.open(file.googleDrive.link, "_blank");
      return; // stop further processing
    }

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
      <h2 className="text-2xl font-semibold mb-6">Recent Uploads</h2>

      {files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-3 font-semibold text-gray-600 px-4 py-2 border-b">
            <span>File Name</span>
            <span className="text-right">Size</span>
            <span className="text-right">Uploaded</span>
          </div>

          {files.map((file) => (
            <div
              key={file._id} // use stable key here
              onClick={() => handleFileClick(file)}
              className="grid grid-cols-3 items-center px-4 py-3 bg-white shadow rounded cursor-pointer transition hover:shadow-2xl border border-gray-200"
              title="Click to open file preview"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FaFileImage
                    className={`flex-shrink-0 ${
                      isImage(file.mimeType) ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                  <span className="truncate">{file.fileName}</span>
                </div>

                {/* Google Drive link */}
                {file.googleDrive?.link && (
                  <a
                    href={file.googleDrive.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent triggering parent click
                    }}
                  >
                    View on Drive
                  </a>
                )}
              </div>

              <span className="text-right">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </span>
              <span className="text-right">
                {new Date(file.uploadDate).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

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
