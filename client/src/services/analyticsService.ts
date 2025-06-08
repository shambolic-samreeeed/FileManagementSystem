import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export interface MostAccessedFile {
  fileName: string;
  path: string;
  size: number;
  uploadDate: string;
  mimeType: string;
  folder: string;
  owner: string;
  sharedWith: string[];
  accessLevel: string;
  shareToken: string;
  shareTokenExpires: string;
  downloadCount: number;
  googleDrive?: {
    fileId: string;
    link: string;
    syncStatus: string;
  };
}

export interface AnalyticsSummary {
  totalFiles: number;
  totalFolders: number;
  totalStorage: number;
  mostAccessedFiles: MostAccessedFile[];
}

export interface DetailedAnalytics {
  user: string;
  endpoint: string;
  hitCount: number;
  lastHit: string;
}

export const getAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const res = await axios.get(`${BASE_URL}/analytics/summary`); // fixed typo here
  return res.data;
};

export const getDetailedAnalytics = async (): Promise<DetailedAnalytics[]> => {
  const res = await axios.get(`${BASE_URL}/analytics/detailed`);

  if (!Array.isArray(res.data)) {
    console.error("Expected array but got:", res.data);
    return [];
  }

  return res.data;
};
