// src/services/driveService.ts
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getDriveSyncStatus = async () => {
  const token = Cookies.get("token");

  const response = await axios.get(`${BASE_URL}/user/setting/drive`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateDriveSync = async (enabled: boolean) => {
  const token = Cookies.get("token");

  const response = await axios.patch(
    `${BASE_URL}/user/setting/drive`,
    { enabled },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data; // { status: 'success', message: '', data: { syncEnabled: true } }
};
