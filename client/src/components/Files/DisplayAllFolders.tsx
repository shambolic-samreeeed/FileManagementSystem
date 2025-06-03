import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa6";
import {
  fetchFolders,
  fetchFilesInFolder,
  uploadFileToFolder,
} from "../../services/foldersService";

interface FolderItem {
  _id: string;
  name: string;
  createdAt: string;
}

interface FileItem {
  _id: string;
  name: string;
  type: string;
  url: string;
}

const DisplayAllFolders = () => {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({});
  const [folderFiles, setFolderFiles] = useState<{ [key: string]: FileItem[] }>({});
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File | null }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getFolders = async () => {
      try {
        const folderResponse = await fetchFolders();
        if (Array.isArray(folderResponse)) {
          const sortedFolders = folderResponse.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setFolders(sortedFolders);
        }
      } catch (err) {
        console.error("Error fetching folders", err);
        setError("Failed to fetch the folders, are you logged in?");
      } finally {
        setLoading(false);
      }
    };

    getFolders();
  }, []);

  const toggleFolder = async (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));

    if (!folderFiles[folderId]) {
      try {
        const files = await fetchFilesInFolder(folderId);
        setFolderFiles((prev) => ({ ...prev, [folderId]: files }));
      } catch (err) {
        console.error("Failed to fetch files for folder", folderId);
      }
    }
  };

  const handleFileChange = (folderId: string, file: File | null) => {
    setSelectedFiles((prev) => ({ ...prev, [folderId]: file }));
  };

  const handleUpload = async (folderId: string) => {
    const file = selectedFiles[folderId];
    if (!file) return;

    try {
      await uploadFileToFolder(folderId, file);
      const updatedFiles = await fetchFilesInFolder(folderId);
      setFolderFiles((prev) => ({ ...prev, [folderId]: updatedFiles }));
      setSelectedFiles((prev) => ({ ...prev, [folderId]: null }));
    } catch (err) {
      console.error("Failed to upload file to folder", folderId, err);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">All Folders</h2>
      {folders.length === 0 ? (
        <p>No folders found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <li
              key={folder._id}
              className="bg-yellow-100 hover:bg-yellow-200 border p-4 rounded shadow-sm"
              title={`Created: ${new Date(folder.createdAt).toLocaleString()}`}
            >
              <div
                className="cursor-pointer flex items-center gap-2 text-lg font-medium"
                onClick={() => toggleFolder(folder._id)}
              >
                <FaFolder className="text-yellow-600" />
                {folder.name}
              </div>

              {expandedFolders[folder._id] && (
                <div className="mt-4 space-y-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(folder._id, e.target.files?.[0] || null)}
                    />
                    <button
                      onClick={() => handleUpload(folder._id)}
                      disabled={!selectedFiles[folder._id]}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Upload
                    </button>
                  </div>

                  <div className="mt-2">
                    <h4 className="text-sm font-semibold">Files:</h4>
                    {folderFiles[folder._id]?.length ? (
                      <ul className="space-y-1">
                        {folderFiles[folder._id].map((file) => (
                          <li key={file._id} className="bg-gray-100 p-2 rounded">
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              {file.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">No files found in this folder.</p>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayAllFolders;
