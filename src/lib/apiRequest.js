import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nartechnique.onrender.com",
  withCredentials: true,
});

// İstek öncesi loglama (isteklerin doğru gidip gitmediğini kontrol etmek için)
apiRequest.interceptors.request.use((request) => {
  console.log("Request:", request);
  return request;
});

// Yanıt sonrası loglama
apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Response Error:", error.response);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Axios error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiRequest;
