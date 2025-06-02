import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_API_URL;

// uploadFile function is an async function  takes the file name annd folder id as optional
export const uploadFile = async (file: File, folderId?: string) => {

  //creating a new FormData object to hold file and optional folder data
  const formData = new FormData();
  // Append the file to the formData with the key 'file'
  formData.append("file", file);
  // If a folderId is provided, append it to the formData with the key 'folder'
  if (folderId) {
    formData.append("folder", folderId);
  }

  // Get the token from cookies (used for user authentication)
  const token = Cookies.get("token");

  // Send a POST request to the /file/upload endpoint with formData as body
  const response = await axios.post(`${BASE_URL}/file/upload`, formData, {
    headers: {
      // Specify that the request is sending multipart form data (required for file uploads)
      "Content-Type": "multipart/form-data",
      // Include the token in the Authorization header for backend verification
      Authorization: `Bearer ${token}`,
    },
  });

    // Return the response data from the backend
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

//deleting a file

// export const deleteFile = async(fileId:string)=>{
//   const token = Cookies.get('token');

//   const response = await axios.delete(`${BASE_URL}/`)
// }