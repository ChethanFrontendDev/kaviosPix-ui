import axios from "axios";

export const api = axios.create({
  baseURL: "https://kavios-pix-apis.vercel.app/",
  withCredentials: true, 
});
