import axios from "axios";

export const adminUrl = "http://localhost:5000/admin/";
export const userUrl = "http://localhost:5000";


// export const userRequest = axios.create({
//     baseURL: userUrl,
//     headers:{
//         "Content-Type": "application/json"
//     }
// })

// userRequest.interceptors.request.use(function (config){

//     config.headers['token'] = localStorage.getItem('usertoken') ;
//     config.headers['Access-Control-Allow-Origin'] = "http://localhost:5000";
//     config.headers['Content-Type']= 'application/json'
//     return config;
// })