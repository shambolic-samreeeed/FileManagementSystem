// components/DisplayAllFolders.tsx
import { useEffect, useState } from "react";
import { FaFolder, FaTrash, FaPen } from "react-icons/fa6";
import { fetchFolders, deleteFolder, renameFolder } from "../../services/foldersService";
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
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameInput, setRenameInput] = useState("");

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
      await deleteFolder(folderId);
      setFolders((prev) => prev.filter((folder) => folder._id !== folderId));
    } catch (err) {
      console.error("Delete API failed:", err);
      alert("Failed to delete folder. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleRename = async (folderId: string) => {
    if (!renameInput.trim()) return alert("Folder name cannot be empty.");

    try {
      await renameFolder(folderId, renameInput.trim());
      setFolders((prev) =>
        prev.map((folder) =>
          folder._id === folderId ? { ...folder, name: renameInput.trim() } : folder
        )
      );
      setRenamingId(null);
      setRenameInput("");
    } catch (err) {
      console.error("Rename API failed:", err);
      alert("Failed to rename folder.");
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
              className="bg-yellow-100 border p-4 rounded shadow-sm hover:bg-yellow-200 flex flex-col gap-2 transition-all duration-200"
              title={`Created: ${new Date(folder.createdAt).toLocaleString()}`}
            >
              <div className="flex justify-between items-center">
                {renamingId === folder._id ? (
                  <>
                    <input
                      type="text"
                      value={renameInput}
                      onChange={(e) => setRenameInput(e.target.value)}
                      className="border px-2 py-1 rounded w-full mr-2"
                    />
                    <button
                      onClick={() => handleRename(folder._id)}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setRenamingId(null);
                        setRenameInput("");
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/folders/${folder._id}`}
                      className="flex items-center gap-2 text-lg font-medium text-yellow-700 hover:underline"
                    >
                      <FaFolder className="text-yellow-600" />
                      {folder.name}
                    </Link>
                    <div className="flex gap-3 text-lg">
                      <button
                        onClick={() => {
                          setRenamingId(folder._id);
                          setRenameInput(folder.name);
                        }}
                        title="Rename"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaPen />
                      </button>
                      <button
                        onClick={() => handleDelete(folder._id)}
                        disabled={deletingId === folder._id}
                        title="Delete"
                        className="text-red-600 hover:text-red-800"
                      >
                        {deletingId === folder._id ? "..." : <FaTrash />}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayAllFolders;
