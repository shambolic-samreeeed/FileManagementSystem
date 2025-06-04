// components/DisplayAllFolders.tsx
import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa6";
import { fetchFolders } from "../../services/foldersService";
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
              className="bg-yellow-100 hover:bg-yellow-200 border p-4 rounded shadow-sm"
              title={`Created: ${new Date(folder.createdAt).toLocaleString()}`}
            >
              <Link
                to={`/folders/${folder._id}`}
                className="flex items-center gap-2 text-lg font-medium text-yellow-700 hover:underline"
              >
                <FaFolder className="text-yellow-600" />
                {folder.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayAllFolders;
