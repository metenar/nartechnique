import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://nartechnique.onrender.com:8801",
  withCredentials: true,
});
export default apiRequest;
