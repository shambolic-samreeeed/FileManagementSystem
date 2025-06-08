// components/DisplayAllFolders.tsx
import { useEffect, useState } from "react";
import { FaFolder, FaTrash } from "react-icons/fa6";
import { fetchFolders, deleteFolder } from "../../services/foldersService";
import { Link } from "react-router-dom";

interface FolderItem {
  _id: string;
  name: string;
  createdAt: string;
}

const DisplayAllFolders = () => {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const getFolders = async () => {
      try {
        const folderResponse = await fetchFolders();
        if (Array.isArray(folderResponse)) {
          const sorted = folderResponse.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setFolders(sorted);
        }
      } catch (err) {
        console.error("Error fetching folders", err);
        setError("Failed to fetch folders.");
      } finally {
        setLoading(false);
      }
    };

    getFolders();
  }, []);

  const handleDelete = async (folderId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this folder?");
    if (!confirmDelete) return;

    try {
      setDeletingId(folderId);
      const result = await deleteFolder(folderId);
      console.log("Delete API success:", result);
      setFolders((prev) => prev.filter((folder) => folder._id !== folderId));
    } catch (err) {
      console.error("Delete API failed:", err);
      alert("Failed to delete folder. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">All Folders</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading folders...</p>
      ) : folders.length === 0 ? (
        <p>No folders found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <li
              key={folder._id}
              className="bg-yellow-100 border p-4 rounded shadow-sm flex items-center justify-between hover:bg-yellow-200 transition-all duration-200"
              title={`Created: ${new Date(folder.createdAt).toLocaleString()}`}
            >
              <Link
                to={`/folders/${folder._id}`}
                className="flex items-center gap-2 text-lg font-medium text-yellow-700 hover:underline"
              >
                <FaFolder className="text-yellow-600" />
                {folder.name}
              </Link>

              <button
                onClick={() => handleDelete(folder._id)}
                disabled={deletingId === folder._id}
                title="Delete Folder"
                className="ml-4 text-red-600 hover:text-red-800"
              >
                {deletingId === folder._id ? "Deleting..." : <FaTrash />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayAllFolders;
