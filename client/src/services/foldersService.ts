import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createFolder = async (name: string)=>{
    const token = Cookies.get('token');

    const response = await axios.post(`${BASE_URL}/folder/create`,{name},{
        headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json",
        },
    })
    return response.data;
};

export const fetchFolders = async () =>{
    const token = Cookies.get('token');

    const response = await axios.get(`${BASE_URL}/folder/list`,{
        headers:{
            Authorization:`Bearer ${token}`,
        },
    });

    return response.data.data ?? [];
};

// Fetch files in a folder
export const fetchFilesInFolder = async (folderId: string): Promise<any[]> => {
  const token = Cookies.get("token");

  try {
    const response = await axios.get(`${BASE_URL}/folder/list/files/${folderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API response for files:", response.data);

    // If API wraps files inside `data` property
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }

    // If API returns array directly
    if (Array.isArray(response.data)) {
      return response.data;
    }

    throw new Error("Unexpected response format: expected an array");
  } catch (error) {
    console.error("fetchFilesInFolder error:", error);
    throw error;
  }
};

// Upload file to a folder
export async function uploadFileToFolder(folderId: string, file: File) {
  const token = Cookies.get("token");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folderId); // important: send folderId in 'folder' field as API expects

  try {
    const response = await axios.post(`${BASE_URL}/file/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload response:", response.data);
    return response.data;
  } catch (error) {
    console.error("uploadFileToFolder error:", error);
    throw error;
  }
}

export const deleteFolder = async (folderId: string) => {
  const token = Cookies.get("token");

  const response = await axios.delete(`${BASE_URL}/folder/delete/${folderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const renameFolder = async (folderId: string, newName: string) => {
  const token = Cookies.get("token");

  const response = await axios.post(
    `${BASE_URL}/folder/rename/${folderId}`,
    { name: newName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}; 