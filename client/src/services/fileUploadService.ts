import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_URL;

// uploadFile function is an async function  takes the file name annd folder id as optional
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:5000/file/upload", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  if (!response.ok) throw new Error("Upload failed");

  return response.json(); // This should include googleDrive.link
};


export const fetchAnalyticsSummary = async () => {
  const token = Cookies.get("token");

  const response = await axios.get(`${BASE_URL}/analytics/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const fetchFiles = async () => {
  const token = Cookies.get("token");

  const response = await axios.get(`${BASE_URL}/file/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

//deleting a file

// export const deleteFile = async(fileId:string)=>{
//   const token = Cookies.get('token');

//   const response = await axios.delete(`${BASE_URL}/`)
// }