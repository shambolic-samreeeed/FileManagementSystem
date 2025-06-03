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

export const fetchFilesInFolder = async (folderId: string) => {
  const token = Cookies.get("token");

  try {
    const response = await axios.get(`${BASE_URL}/file/list?folder=${folderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw new Error("Failed to load files in folder.");
  }
};

// Upload a file into a specific folder
export const uploadFileToFolder = async (folderId: string, file: File) => {
  const token = Cookies.get("token");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folderId);

  try {
    const response = await axios.post(`${BASE_URL}/file/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("File upload failed.");
  }
};

