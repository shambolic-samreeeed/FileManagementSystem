import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa6";
import { fetchFolders } from "../../services/foldersService";

interface FolderItem {
    _id: string;
    name: string;
    createdAt: string;
}

const DisplayAllFolders = () => {
    const [folders, setFolders] = useState<FolderItem[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(()=>{
        const getFolders = async ()=>{
            try {
                const folderResponse = await fetchFolders();

                if(Array.isArray(folderResponse)){
                    const sortedFolders = folderResponse.sort(
                        (a,b)=>
                            new Date(b.createdAt).getTime()- new Date(a. createdAt).getTime()
                    );
                    setFolders(sortedFolders);
                    console.log(sortedFolders);
                }
            } catch (err) {
                console.error('Error fetching files', err)
                setError('Failed to fetch the folders, are you logged in?')
            }finally{
                setLoading(false)
            }
        };
        getFolders();
    },[])

    return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">📁 All Folders</h2>
      {folders.length === 0 ? (
        <p>No folders found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <li
              key={folder._id}
              className="bg-yellow-100 hover:bg-yellow-200 border p-4 rounded cursor-pointer shadow-sm"
              title={`Created: ${new Date(folder.createdAt).toLocaleString()}`}
            >
              <div className="flex items-center gap-2 text-lg font-medium">
                <FaFolder className="text-yellow-600" />
                {folder.name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DisplayAllFolders
