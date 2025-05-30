import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// Upload a file
export const uploadFile = async (file: File, folderId?: string) => {
  const formData = new FormData();
  formData.append("file", file);
  if (folderId) {
    formData.append("folder", folderId);
  }

  const token = localStorage.getItem("token");

  const response = await axios.post(`${BASE_URL}/file/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Fetch analytics summary
export const fetchAnalyticsSummary = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BASE_URL}/analytics/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const fetchFiles = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${BASE_URL}/file/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};
