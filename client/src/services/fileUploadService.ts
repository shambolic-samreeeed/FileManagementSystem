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

  return response.json(); 
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


export const downloadByFileName = async (filename: string)=>{
  const token = Cookies.get('token');
  const url = `${BASE_URL}/file/download/name/${encodeURIComponent(filename)}`;

  const response = await fetch(url,{
    method:'GET',
    headers:{
      Authorization: `Bearer ${token}`,
    },
  });

  if(!response.ok){
    throw new Error("download failed");
  }

  return response.blob();
}

// Download by file name
export const downloadFileByName = async (fileName: string) => {
  const token = Cookies.get("token");
  const url = `${BASE_URL}/file/download/name/${encodeURIComponent(fileName)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Download failed");
  }

  return response.blob();
};

// Download by file ID
export const downloadFileById = async (id: string) => {
  const token = Cookies.get("token");
  const url = `${BASE_URL}/file/download/id/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Download failed");
  }

  return response.blob();
};
