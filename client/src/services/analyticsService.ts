import axios from "axios";

// Types
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

// API calls
export const getAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const res = await axios.get("/analytics/summary");
  return res.data;
};

export const getDetailedAnalytics = async (): Promise<DetailedAnalytics[]> => {
  const res = await axios.get("/analytics/detailed");
  console.log("Detailed analytics API response:", res.data);

  // Defensive: return array or empty array if not
  return Array.isArray(res.data) ? res.data : [];
};
