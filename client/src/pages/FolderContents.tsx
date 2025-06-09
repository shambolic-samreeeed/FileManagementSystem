import { useEffect, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import {
  fetchFilesInFolder,
  uploadFileToFolder,
} from "../services/foldersService";

interface FileItem {
  fileName: string;
  path: string;
  size: number;
  uploadDate: string;
  mimeType: string;
  folder: string;
  owner: string;
  sharedWith: string[];
  accessLevel: string;
  shareToken: string;
  shareTokenExpires: string;
  downloadCount: number;
  googleDrive?: {
    fileId: string;
    link: string;
    syncStatus: string;
  };
}

const FolderContentsPage = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const getFiles = async () => {
      if (!folderId) {
        setError("No folder ID provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetchFilesInFolder(folderId);
        console.log("Fetched files:", response);
        setFiles(response);
        setError("");
      } catch (err) {
        console.error("Error fetching folder contents:", err);
        setError("Failed to fetch folder contents.");
      } finally {
        setLoading(false);
      }
    };

    getFiles();
  }, [folderId]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !folderId) {
      setUploadError("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setUploadError("");

    try {
      await uploadFileToFolder(folderId, selectedFile);
      setSelectedFile(null);

      // Refresh file list after upload
      const updatedFiles = await fetchFilesInFolder(folderId);
      setFiles(updatedFiles);
    } catch (err) {
      console.error("Upload failed:", err);
      setUploadError("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading folder contents...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-500">{error}</p>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Folder Contents</h2>

      <div className="mb-6">
        <input
          type="file"
          onChange={handleFileChange}
          disabled={uploading}
          className="mb-2"
        />
        <button
          onClick={handleUpload}
          disabled={uploading || !selectedFile}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
        {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
      </div>

      {files.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file) => (
            <li
              key={file.fileName + file.uploadDate}
              className="bg-white border rounded p-4 shadow"
            >
              <p className="font-semibold">{file.fileName}</p>
              <p className="text-sm text-gray-600">
                {new Date(file.uploadDate).toLocaleString()}
              </p>
              <a
                href={file.googleDrive?.link || file.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 inline-block"
              >
                View File
              </a>
              <p className="text-sm mt-1 text-gray-500">
                {Math.round(file.size / 1024)} KB • {file.mimeType}
              </p>
              <p className="text-sm text-gray-500">
                Downloads: {file.downloadCount}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No files found in this folder.</p>
      )}
    </div>
  );
};

export default FolderContentsPage;
