import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  // // baseURL: "http://3.110.143.13:5000/api",
  // baseURL: "/api",
  // baseURL: "http://13.201.63.42:5000/api",

  baseURL: "https://api.procubid.com/admin/api",
});

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;