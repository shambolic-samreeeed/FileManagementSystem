import axios from 'axios';
import Cookies from 'js-cookie';

//base url being http://localhost:5000
const BASE_URL = import.meta.env.VITE_API_URL;

// Register function that takes email and password as paramenters and sends a POST request to the URL with a JSON Payload email and password and then it returns the response data.

export const register = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/user/register`, {
    email,
    password,
  });
  return response.data;
};

// Login function takes the email and password as parametes and sends a POST request to the URL and validates the credentials in the backend via the api /user/login. and if  the response is returned successfully and token exists, it stores the email and token to the local storage.
export const login = async (email: string, password: string) =>{
  const response= await axios.post(`${BASE_URL}/user/login`,{
    email,
    password,
  });

  //storing the data in Cookies
  if(response.data.success && response.data.data.token){
    Cookies.set('token', response.data.data.token);
    Cookies.set('email', response.data.data.user.email)
  }
  return response.data;
}
