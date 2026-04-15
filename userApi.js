import axios from "axios";

const UserAPI = axios.create({
  baseURL: "https://api.procubid.com/api",
});

UserAPI.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default UserAPI;