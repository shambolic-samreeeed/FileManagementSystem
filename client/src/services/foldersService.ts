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

    return response.data.folders ?? [];
};