import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://file-management-azlf.onrender.com";

// Upload a file
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/file/upload`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });

  if (!response.ok) throw new Error("Upload failed");

  return response.json();
};

// Fetch analytics summary
export const fetchAnalyticsSummary = async () => {
  const token = Cookies.get("token");

  const response = await axios.get(`${BASE_URL}/analytics/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Fetch all files
export const fetchFiles = async () => {
  const token = Cookies.get("token");

  const response = await axios.get(`${BASE_URL}/file/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

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
    throw new Error("Download by file name failed");
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
    throw new Error("Download by file ID failed");
  }

  return response.blob();
};
