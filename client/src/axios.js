import axios from "axios";
const baseURL = "https://jobseeker.gq/api";

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create  user instance
let userinstance = axios.create(defaultOptions);

// Set the AUTH token for any request
userinstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("usertoken");
  config.headers.accesstoken = token;
  return config;
});

export default userinstance;
