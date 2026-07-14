// import axios from "axios";

// export const api = axios.create({
//   baseURL:
//     process.env.NEXT_PUBLIC_API_URL || "",
//   timeout: 15000,
// });
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: 15000,
});

console.log("API INSTANCE", api.defaults.baseURL);

api.interceptors.request.use((config) => {
  console.log("REQUEST =>", {
    baseURL: config.baseURL,
    url: config.url,
    full: `${config.baseURL}${config.url}`,
  });

  return config;
});