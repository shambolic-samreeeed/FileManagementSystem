import { useEffect, useState } from "react";
import { FaFileImage, FaDownload } from "react-icons/fa6";
import Cookies from "js-cookie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { fetchFiles, downloadFileById } from "../../services/fileUploadService";

interface FileItem {
  _id: string;
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

  useEffect(() => {
    return () => {
      if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);
    };
  }, [previewImageUrl]);

  const isImage = (mimeType: string) => mimeType.startsWith("image/");

  const handleDownload = async (file: FileItem) => {
    try {
      const blob = await downloadFileById(file._id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert("Download failed: " + err.message);
    }
  };

  const handleFileClick = async (file: FileItem) => {
    if (file.googleDrive?.link) {
      window.open(file.googleDrive.link, "_blank");
      return;
    }

    if (isImage(file.mimeType)) {
      try {
        const token = Cookies.get("token");
        const url = `https://file-management-azlf.onrender.com/file/download/name/${encodeURIComponent(
          file.fileName
        )}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch image");
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

  if (error)
    return (
      <div className="flex flex-col items-center justify-center gap-4 mt-10 text-red-600">
        <div className="w-82 h-82">
          <DotLottieReact
            src="https://lottie.host/ab900c49-1275-43a1-8a43-e736f6b4fe65/BsAY9VpJY4.lottie"
            loop
            autoplay
          />
        </div>
        <p className="text-center text-lg font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-2xl font-semibold mb-6"> Recent Uploads</h2>

      {files.length === 0 ? (
        <p>No files found.</p>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-3 font-semibold text-gray-600 px-4 py-2 border-b">
            <span>File Name</span>
            <span className="text-right">Size</span>
            <span className="text-right">Uploaded</span>
          </div>

          {files.map((file) => (
            <div
              key={file._id}
              onClick={() => handleFileClick(file)}
              className="grid grid-cols-3 items-center px-4 py-3 bg-white shadow-sm hover:shadow-md rounded-lg cursor-pointer border border-gray-200 transition"
              title="Click to preview file"
            >
              <div className="flex flex-col gap-1 truncate">
                <div className="flex items-center gap-2">
                  <FaFileImage
                    className={`flex-shrink-0 text-lg ${
                      isImage(file.mimeType) ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                  <span className="truncate font-medium">{file.fileName}</span>
                </div>

                <div className="flex gap-2 mt-1 ml-6">
                  <button
                    className="text-blue-600 text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(file);
                    }}
                  >
                    <FaDownload />
                  </button>

                  {file.googleDrive?.link && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(file.googleDrive?.link, "_blank");
                      }}
                      className="text-green-600 text-sm underline cursor-pointer"
                    >
                      Drive Link
                    </button>
                  )}
                </div>
              </div>

              <span className="text-right text-sm text-gray-700">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </span>
              <span className="text-right text-sm text-gray-500">
                {new Date(file.uploadDate).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {previewImageUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg p-4 max-w-[90vw] max-h-[90vh] shadow-xl">
            <button
              onClick={() => setPreviewImageUrl("")}
              className="absolute top-2 right-3 text-2xl text-gray-700 hover:text-red-500"
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
