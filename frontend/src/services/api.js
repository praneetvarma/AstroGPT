import axios from "axios";

const api = axios.create({
  baseURL: "https://astrogpt-api.onrender.com",
  timeout: 120000,
});

export default api;