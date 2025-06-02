import React, { useState } from "react";
import { createFolder } from "../../services/foldersService";

const CreateFolder = () => {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    try {
      await createFolder(folderName);
      setFolderName(""); // Clear input after successful creation
    } catch (error) {
      console.error("Failed to create folder:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="Folder name"
        className="border rounded px-2 py-1"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
        Create Folder
      </button>
    </form>
  );
};

export default CreateFolder;
