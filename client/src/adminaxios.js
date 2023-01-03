import axios from "axios";
// const adminbaseURL = "http://localhost:5000/admin";

const adminbaseURL = "https://jobseeker.gq/api";

const admindefaultOptions = {
  baseURL: adminbaseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create admin instance
let adminInstance = axios.create(admindefaultOptions);

// set

adminInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.accesstoken = token;
  return config;
});

export default adminInstance;
