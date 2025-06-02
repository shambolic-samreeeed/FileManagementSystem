import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_URL;


export const uploadFile = async (file: File, folderId?: string) => {
  const formData = new FormData();
  formData.append("file", file);
  if (folderId) {
    formData.append("folder", folderId);
  }

  const token = Cookies.get("token");

  const response = await axios.post(`${BASE_URL}/file/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
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
