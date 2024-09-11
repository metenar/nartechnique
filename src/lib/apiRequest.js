import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nartechnique.onrender.com:8801",
  withCredentials: true,
});
export default apiRequest;
