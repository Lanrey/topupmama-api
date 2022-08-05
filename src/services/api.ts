import axios from "axios";

const api = axios.create({
    baseURL: process.env.EXTERNAL_BASE_API
});

export default api

