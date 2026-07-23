import axios from "axios";

const api = axios.create({
    baseURL: "https://astrogpt-api.onrender.com",
});

export default api;