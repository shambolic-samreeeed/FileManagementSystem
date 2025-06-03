import { useState } from "react";
import { createFolder } from "../../services/foldersService";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CreateFolder = () => {
  const [folderName, setFolderName] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: false, error: "", success: "" });

    if (!folderName.trim()) {
      return setStatus({ loading: false, error: "Folder name cannot be empty", success: "" });
    }

    setStatus({ loading: true, error: "", success: "" });

    try {
      await createFolder(folderName);
      setFolderName("");
      setStatus({ loading: false, error: "", success: "Folder created successfully!" });
      nav('/folders')
    } catch (error) {
      console.error("Failed to create folder:", error);
      setStatus({ loading: false, error: "Failed to create folder. Try again.", success: "" });
    }
  };

  return (
    <div className="p-4 w-full max-w-md mt-6 bg-white shadow rounded-lg hover:shadow-md transition duration-300">
      <h1 className="text-xl font-bold text-center mb-3">Create a Folder</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <label htmlFor="folder-name" className="flex items-center w-full bg-gray-100 p-2 rounded hover:bg-gray-200 transition">
          <div className="rounded-full w-10 h-10 flex justify-center items-center">
            <AiOutlineFolderAdd size={24} />
          </div>
          <input
            id="folder-name"
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Enter folder name"
            className="ml-2 bg-transparent outline-none w-full text-black"
          />
        </label>

        {status.error && <p className="text-red-500">{status.error}</p>}
        {status.success && <p className="text-green-600">{status.success}</p>}

        <button
          type="submit"
          disabled={status.loading}
          className="h-9 w-32 bg-blue-800 text-white font-semibold rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {status.loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateFolder;
