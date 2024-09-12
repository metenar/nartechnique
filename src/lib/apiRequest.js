import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nartechnique.onrender.com",
  withCredentials: true,
});

export default apiRequest;
