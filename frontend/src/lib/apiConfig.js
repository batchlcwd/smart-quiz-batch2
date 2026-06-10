import axios from "axios";

export const BACKEND_BASE_URL='http://localhost:4000/api/v1'

export const axiosClient = axios.create({
    baseURL: BACKEND_BASE_URL,
    contentType: 'application/json'
})