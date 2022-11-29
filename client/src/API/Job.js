import axios from "axios";

const API = axios.create({baseURL:'http://localhost:5000'})

export const DeleteJob = (id) => API.delete(`/deljob/${id}`)

export const rejectJob = (id,jobId) => API.put(`/rejectjob/${id}`,{jobId})