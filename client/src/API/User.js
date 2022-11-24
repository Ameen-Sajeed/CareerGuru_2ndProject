import axios from "axios";

const API = axios.create({baseURL:'http://localhost:5000'})

export const getUser = (id) => API.get(`/getUser/${id}`)