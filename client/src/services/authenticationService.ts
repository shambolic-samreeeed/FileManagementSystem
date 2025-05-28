import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const register = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/user/register`, {
    email,
    password,
  });
  return response.data;
};

export const login = async (email: string, password: string) =>{
  const response= await axios.post(`${BASE_URL}/user/login`,{
    email,
    password,
  });

  if(response.data.success && response.data.data.token){
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('email', response.data.data.user.email)
  }
  return response.data;
}
